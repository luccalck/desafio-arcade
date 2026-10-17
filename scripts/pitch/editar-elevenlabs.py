"""Monte as cenas reais conforme a voz fornecida e incorpore legendas por palavras."""
import argparse
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import subprocess

from PIL import Image, ImageDraw, ImageFont

BG = '#07111e'
CYAN = '#5ce2e2'
MUTED = '#9bb2c7'


def run(command):
    r = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if r.returncode:
        raise RuntimeError(r.stderr.decode('utf-8', errors='replace'))
    return r


def stamp(seconds, ass=False):
    ms = round(seconds*1000)
    if ass:
        return f'{ms//3600000}:{ms//60000%60:02}:{ms//1000%60:02}.{ms%1000//10:02}'
    return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def font(size, bold=False):
    return ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf' if bold else 'C:/Windows/Fonts/segoeui.ttf',size)


def frame(path, title, offline=False):
    im = Image.new('RGBA',(1920,1080),BG)
    d = ImageDraw.Draw(im)
    d.rectangle((192,56,1727,919),fill=(0,0,0,0))
    d.line((192,54,1728,54),fill=CYAN,width=2)
    d.line((192,924,1728,924),fill='#244054',width=2)
    d.text((192,10),title.upper(),font=font(26,True),fill=CYAN)
    d.text((1728,12),'ROTA DO CÓDIGO / AURA 67',font=font(21),fill=MUTED,anchor='ra')
    label = 'HTML EXPORTADO · REDE DESATIVADA' if offline else 'PRODUÇÃO v0.7.0 · e9dd28c'
    d.text((192,1058),label,font=font(15),fill=MUTED)
    d.text((1728,1058),'CAPTURA REAL · VOZ SINTÉTICA FORNECIDA PELO SQUAD',font=font(15),fill=MUTED,anchor='ra')
    im.save(path)


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--capture',required=True)
    p.add_argument('--alignment',required=True)
    p.add_argument('--audio',required=True)
    p.add_argument('--work',default='.contexto/elevenlabs/edicao')
    p.add_argument('--output',default='docs/pitch/pitch.mp4')
    args = p.parse_args()
    capture_dir = Path(args.capture)
    capture = json.loads((capture_dir/'captura.json').read_text(encoding='utf-8'))
    alignment = json.loads(Path(args.alignment).read_text(encoding='utf-8'))
    assert capture['completed'] and not capture['errors'] and alignment['allReferenceWordsMatched']
    words = alignment['words']
    audio_info = json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',args.audio]).stdout)
    seconds = float(audio_info['format']['duration'])
    duration = math.ceil(seconds*25)/25
    assert duration <= 90
    def midpoint(left,right):
        return round(((words[left]['end']+words[right]['start'])/2)*25)/25
    # Índices auditados do roteiro integral; cortes são subordinados à fala, não ao antigoMP4.
    edges = [0,midpoint(6,7),midpoint(28,29),midpoint(51,52),midpoint(87,88),
             midpoint(93,94),midpoint(95,96),midpoint(98,100),midpoint(114,115),
             midpoint(138,139),midpoint(155,156),midpoint(169,170),duration]
    names = ['intro','menu','falha','correcao','missao-2','missao-3','missao-4','missao-5','final','exportacao','offline','outro']
    titles = ['', '01 / Aprender construindo','02 / Um problema que você pode observar',
              '03 / Seu código muda o jogo','04 / Movimento e operações','05 / Comparações e colisões',
              '06 / Condições e pontuação','07 / Repetições e listas','08 / Seu projeto em ação',
              '09 / Leve o que você construiu','10 / Continue explorando offline','']
    work = Path(args.work)
    work.mkdir(parents=True,exist_ok=True)
    spec = importlib.util.spec_from_file_location('cartelas_pitch',Path(__file__).with_name('editar.py'))
    cards = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(cards)
    timeline=[]
    parts=[]
    for i,name in enumerate(names):
        start,end = edges[i],edges[i+1]
        length = round(end-start,6)
        image = work/f'{i:02}-{name}.png'
        output = work/f'{i:02}-{name}.mp4'
        static = name in ('intro','outro')
        source_start = None
        if static:
            cards.card(image,name=='outro')
            im = Image.open(image).convert('RGB')
            d = ImageDraw.Draw(im)
            d.rectangle((0,920,1919,1079),fill=BG)
            d.line((192,924,1728,924),fill='#244054',width=2)
            d.text((192,1058),'ROTA DO CÓDIGO · AURA 67',font=font(15),fill=MUTED)
            d.text((1728,1058),'NARRAÇÃO SINTÉTICA · ÁUDIO ELEVENLABS FORNECIDO PELO SQUAD',font=font(15),fill=MUTED,anchor='ra')
            im.save(image)
            inputs=['-loop','1','-framerate','25','-i',str(image)]
            filters=['-vf','format=yuv420p']
        else:
            clip = capture['clips'][name]
            source_start = clip['start']+0.04
            if name=='correcao':
                # A cena anterior conserva os300mscontíguos de transição para o editor.
                source_start = clip['start']+0.40
            if name in ('final','missao-3','missao-4'):
                source_start = clip['end']-length-0.06
            source = capture['offlineVideo'] if name=='offline' else capture['mainVideo']
            source_duration=float(json.loads(run(['ffprobe','-v','error','-show_entries','format=duration','-of','json',source]).stdout)['format']['duration'])
            assert source_start>=0 and source_start+length<=source_duration
            frame(image,titles[i],name=='offline')
            inputs=['-ss',str(source_start),'-i',source,'-loop','1','-framerate','25','-i',str(image)]
            filters=['-filter_complex','[0:v]setpts=PTS-STARTPTS,fps=25,scale=1536:864:flags=lanczos,pad=1920:1080:192:56:color=0x07111e[game];[game][1:v]overlay=0:0:format=auto,format=yuv420p[v]','-map','[v]']
        print(f'Montando {name}: {start:.2f}–{end:.2f}s',flush=True)
        run(['ffmpeg','-y','-hide_banner','-v','error',*inputs,*filters,'-an','-t',str(length),
             '-c:v','libx264','-preset','fast','-crf','19','-threads','4','-r','25','-pix_fmt','yuv420p',
             '-video_track_timescale','12800',str(output)])
        parts.append(output.resolve())
        timeline.append({'section':name,'start':start,'end':end,'duration':length,'sourceStart':source_start,
                         'source':'cartela editorial' if static else 'captura real offline' if name=='offline' else 'captura real de produção',
                         'playbackRate':1.0})
    listing=work/'concat.txt'
    listing.write_bytes(''.join(f"file '{part.as_posix()}'\n" for part in parts).encode())
    clean=work/'montagem-sem-legendas-sem-audio.mp4'
    run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(listing),'-c','copy','-an',str(clean)])
    ass=['[Script Info]','ScriptType: v4.00+','PlayResX: 1920','PlayResY: 1080','WrapStyle: 2',
         '[V4+ Styles]',
         'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
         'Style: Default,Segoe UI,52,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,1.6,1,2,192,192,36,1',
         '[Events]','Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text']
    srt=[]
    for cue in alignment['cues']:
        assert 0<=cue['start']<cue['end']<=duration
        ass.append(f'Dialogue: 0,{stamp(cue["start"],True)},{stamp(cue["end"],True)},Default,,0,0,0,,{cue["text"].replace(chr(10),chr(92)+"N")}')
        srt.append(f'{cue["id"]}\n{stamp(cue["start"])} --> {stamp(cue["end"])}\n{cue["text"]}')
    assfile=work/'legendas-bold.ass'
    assfile.write_bytes(('\n'.join(ass)+'\n').encode())
    subtitle_output = Path(args.output).parent/'pitch-elevenlabs.srt'
    subtitle_output.parent.mkdir(parents=True,exist_ok=True)
    subtitle_output.write_bytes(('\n\n'.join(srt)+'\n').encode())
    run(['ffmpeg','-y','-hide_banner','-v','error','-i',str(clean),'-i',args.audio,
         '-map','0:v:0','-map','1:a:0','-vf',f'subtitles=filename={assfile.as_posix()}',
         '-af',f'aresample=48000,apad=whole_dur={duration},atrim=end_sample={round(duration*48000)}',
         '-c:v','libx264','-preset','fast','-crf','19','-threads','4','-pix_fmt','yuv420p',
         '-c:a','aac','-b:a','192k','-ar','48000','-ac','1','-t',str(duration),'-movflags','+faststart',
         '-metadata','title=Rota do Código — pitch com narração fornecida',
         '-metadata','comment=Áudio ElevenLabs fornecido pelo squad; legendas bold sincronizadas por palavras; gameplay real v0.7.0/e9dd28c; sem áudio ou legendas das edições anteriores.',args.output])
    report={'schema':1,'duration':duration,'audioOriginalDuration':seconds,'audioOriginalSha256':digest(args.audio),
            'videoSha256':digest(args.output),'videoBytes':Path(args.output).stat().st_size,
            'productionSha':capture['productionSha'],'timeline':timeline,'audioRate':1.0,'videoRate':1.0,
            'subtitleStyle':{'font':'Segoe UI','bold':True,'sizeAt1080p':52,'maxLines':2,'maxCharactersPerLine':36,'playArea':{'x':192,'y':56,'width':1536,'height':864},'outsidePlayArea':True},
            'subtitleCues':len(alignment['cues']),'referenceWords':alignment['referenceWords'],
            'oldNarrationUsed':False,'oldSubtitleUsed':False,'soleAudioSource':'MP3 fornecido pelo solicitante',
            'humanReviewClaimed':False}
    (work/'edicao.json').write_bytes(json.dumps(report,ensure_ascii=False,indent=2).encode())
    print(json.dumps({'completed':True,'duration':duration,'sha256':report['videoSha256']},ensure_ascii=True),flush=True)


if __name__ == '__main__':
    main()
