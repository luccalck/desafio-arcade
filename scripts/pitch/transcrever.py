"""Transcreva localmente um áudio por palavra, usando FFmpeg para a decodificação."""
import argparse
import json
from pathlib import Path
import subprocess

import numpy as np
from faster_whisper import WhisperModel


if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--audio',required=True)
    p.add_argument('--model',required=True)
    p.add_argument('--output',required=True)
    args = p.parse_args()
    # Evita dependência da APIav.open(metadata_errors), removida em PyAV19.
    decoded = subprocess.run(['ffmpeg','-v','error','-i',args.audio,'-f','f32le','-ac','1','-ar','16000','pipe:1'],
                             stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=True)
    audio = np.frombuffer(decoded.stdout,dtype='<f4')
    model = WhisperModel(args.model,device='cpu',compute_type='int8',cpu_threads=4)
    segments,info = model.transcribe(audio,language='pt',beam_size=5,word_timestamps=True,
                                     condition_on_previous_text=False,
                                     initial_prompt='Rota do Código, Python, HTML, minijogo, pontuação, navegador.')
    result = {'schema':1,'decoder':'FFmpeg PCMfloat32/16kHz','language':info.language,
              'duration':info.duration,'segments':[],'words':[]}
    for s in segments:
        words = [{'word':w.word,'start':w.start,'end':w.end,'probability':w.probability} for w in s.words]
        result['segments'].append({'start':s.start,'end':s.end,'text':s.text,'words':words})
        result['words'] += words
        print(f'{s.start:.2f}-{s.end:.2f}: {s.text}',flush=True)
    Path(args.output).write_bytes(json.dumps(result,ensure_ascii=False,indent=2).encode())
