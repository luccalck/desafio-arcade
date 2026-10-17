"""Sintetize falas separadas e alinhe-as a janelas reais do pitch, sem alterar o jogo."""
import argparse
import hashlib
import importlib.metadata
import json
from pathlib import Path
import subprocess
import textwrap
import wave

import numpy as np
from piper import PiperVoice, SynthesisConfig


def run(args):
    result = subprocess.run(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode:
        raise RuntimeError(result.stderr.decode('utf-8', errors='replace'))
    return result


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def stamp(seconds, ass=False):
    ms = round(seconds * 1000)
    if ass:
        return f'{ms//3600000}:{ms//60000%60:02}:{ms//1000%60:02}.{ms%1000//10:02}'
    return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'


def wav_write(path, samples, rate):
    with wave.open(str(path), 'wb') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(rate)
        f.writeframes(samples.astype('<i2').tobytes())


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--model', required=True)
    parser.add_argument('--source', required=True)
    parser.add_argument('--output', default='docs/pitch/pitch.mp4')
    parser.add_argument('--work', default='.contexto/narracao')
    parser.add_argument('--script', default='docs/pitch/narracao-roteiro.json')
    args = parser.parse_args()
    work = Path(args.work)
    work.mkdir(parents=True, exist_ok=True)
    clips = work/'falas'
    clips.mkdir(exist_ok=True)
    spec = json.loads(Path(args.script).read_text(encoding='utf-8'))
    meta = json.loads(Path('docs/pitch/pitch-producao.json').read_text(encoding='utf-8'))
    duration = spec['duration']
    rate = 48000
    total = round(duration*rate)
    full = np.zeros(total, dtype=np.int16)
    voice = PiperVoice.load(args.model)
    records = []
    previous_end = 0
    for cue in spec['cues']:
        start, end = cue['start'], cue['end']
        assert start >= previous_end and end <= duration
        previous_end = end
        scene = next(s for s in meta['timeline'] if s['section'] == cue['section'])
        assert scene['start'] <= start < end <= scene['end']
        raw = clips/f'{cue["id"]:02}-original.wav'
        with wave.open(str(raw), 'wb') as f:
            voice.synthesize_wav(cue['text'], f, syn_config=SynthesisConfig(volume=0.9))
        with wave.open(str(raw), 'rb') as f:
            sr = f.getframerate()
            assert f.getnchannels() == 1 and f.getsampwidth() == 2
            data = np.frombuffer(f.readframes(f.getnframes()), dtype='<i2')
        active = np.flatnonzero(np.abs(data.astype(np.int32)) > 32)
        assert len(active), 'Fala vazia.'
        # Preserva bordas de50ms; não remove pausas dentro da frase.
        a = max(0, int(active[0])-round(sr*0.05))
        b = min(len(data), int(active[-1])+round(sr*0.05)+1)
        trimmed = clips/f'{cue["id"]:02}-sem-silencio-externo.wav'
        wav_write(trimmed, data[a:b], sr)
        available = end-start-0.08
        natural = (b-a)/sr
        tempo = max(1.0, natural/available)
        if tempo > 1.28:
            raise ValueError(f'Fala {cue["id"]} exigiria aceleração excessiva ({tempo:.3f}); encurte o texto.')
        adjusted = clips/f'{cue["id"]:02}-alinhada.wav'
        run(['ffmpeg','-y','-v','error','-i',str(trimmed),'-af',f'atempo={tempo:.9f},aresample={rate}',
             '-ar',str(rate),'-ac','1','-c:a','pcm_s16le',str(adjusted)])
        with wave.open(str(adjusted), 'rb') as f:
            samples = np.frombuffer(f.readframes(f.getnframes()), dtype='<i2')
        offset = round(start*rate)
        stop = offset+len(samples)
        assert stop <= round(end*rate), f'Fala {cue["id"]} ultrapassa sua janela.'
        full[offset:stop] = samples
        record = {**cue,'naturalDuration':round(natural,6),'tempo':round(tempo,9),
                  'sampleStart':offset,'sampleEnd':stop,'speechEnd':round(stop/rate,6),
                  'actualDuration':len(samples)/rate,'withinScene':True,'clipped':False,
                  'rawSha256':sha(raw),'alignedSha256':sha(adjusted)}
        records.append(record)
        print(json.dumps({'id':cue['id'],'start':start,'end':record['speechEnd'],'tempo':record['tempo']},ensure_ascii=True),flush=True)
    track = Path('docs/pitch/narracao.wav')
    wav_write(track, full, rate)
    assert len(full) == total
    srt=[]
    ass=['[Script Info]','ScriptType: v4.00+','PlayResX: 1920','PlayResY: 1080','WrapStyle: 2',
         '[V4+ Styles]',
         'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
         'Style: Default,Segoe UI,30,&H00FFFFFF,&H00FFFFFF,&H001E1107,&H001E1107,0,0,0,0,100,100,0,0,1,0,0,2,160,160,29,1',
         'Style: Footer,Segoe UI,17,&H00C7B29B,&H00C7B29B,&H001E1107,&H001E1107,0,0,0,0,100,100,0,0,1,0,0,7,0,0,0,1',
         '[Events]','Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text']
    for i,r in enumerate(records):
        caption='\n'.join(textwrap.wrap(r['text'],width=64))
        assert len(caption.splitlines()) <= 2
        # A legenda aparece na entrada e permanece até o fim da janela; cobre toda a fala.
        srt.append(f'{i+1}\n{stamp(r["start"])} --> {stamp(r["end"])}\n{caption}')
        ass.append(f'Dialogue: 0,{stamp(r["start"],True)},{stamp(r["end"],True)},Default,,0,0,0,,{caption.replace(chr(10),chr(92)+"N")}')
    captions = Path('docs/pitch/pitch-narracao.srt')
    captions.write_bytes(('\n\n'.join(srt)+'\n').encode())
    ass.append(f'Dialogue: 1,0:00:00.00,{stamp(duration,True)},Footer,,0,0,0,,{{\\an7\\pos(160,1055)}}Produção v0.7.0 · e9dd28c  |  Voz sintética: Piper / faber  |  Captura automatizada · cortes')
    ass_path = work/'legendas.ass'
    ass_path.write_bytes(('\n'.join(ass)+'\n').encode())
    # A faixa editorial fica fora da captura: não desenha interface ou resultado de jogo.
    filters=(f'drawbox=x=0:y=975:w=iw:h=105:color=0x07111e:t=fill,'
             f'subtitles=filename={ass_path.as_posix()}')
    run(['ffmpeg','-y','-hide_banner','-v','error','-i',args.source,'-i',str(track),
         '-map','0:v:0','-map','1:a:0','-vf',filters,
         '-af',f'loudnorm=I=-18:TP=-2:LRA=7,aresample={rate},atrim=end_sample={total}',
         '-c:v','libx264','-preset','fast','-crf','20','-threads','4','-pix_fmt','yuv420p',
         '-r','25','-c:a','aac','-b:a','192k','-ar',str(rate),'-ac','1','-t',str(duration),
         '-movflags','+faststart','-metadata','title=Rota do Código — pitch narrado',
         '-metadata','comment=Voz sintética pt-BR/Piper/faber; gameplay real de produção v0.7.0/e9dd28c; legendas transcritas; captura automatizada com cortes.',args.output])
    result={'schema':1,'sampleRate':rate,'totalSamples':total,'duration':duration,
            'voice':'pt_BR-faber-medium','engine':'piper-tts','engineVersion':importlib.metadata.version('piper-tts'),
            'modelSha256':sha(args.model),'scriptSha256':sha(args.script),'sourceVideoSha256':sha(args.source),
            'narrationSha256':sha(track),'videoSha256':sha(args.output),'records':records,
            'allCuesWithinScene':all(r['withinScene'] for r in records),'allCuesUnclipped':True,
            'silenceBetweenCues':True,'humanVoiceRecording':False,'humanApproval':False}
    Path('docs/pitch/narracao-sincronia.json').write_bytes(json.dumps(result,ensure_ascii=False,indent=2).encode())
    print(json.dumps({'completed':True,'cues':len(records),'duration':duration,'videoSha256':result['videoSha256']},ensure_ascii=True),flush=True)


if __name__ == '__main__':
    main()
