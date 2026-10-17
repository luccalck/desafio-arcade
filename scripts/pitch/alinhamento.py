"""Confronte palavras reconhecidas com o roteiro e gere blocos de legenda auditáveis."""
import argparse
import difflib
import json
from pathlib import Path
import re
import unicodedata


def normalized(text):
    text = ''.join(c for c in unicodedata.normalize('NFD', text.lower()) if unicodedata.category(c) != 'Mn')
    text = re.sub(r'[^a-z0-9]', '', text)
    return 'cinco' if text == '5' else text


def align(asr, reference, groups):
    actual = asr['words']
    source = reference.split()
    words = [None]*len(source)
    matcher = difflib.SequenceMatcher(None, [normalized(w) for w in source], [normalized(w['word']) for w in actual], autojunk=False)
    for op, a, b, c, d in matcher.get_opcodes():
        if op == 'equal':
            for i, j in zip(range(a,b),range(c,d)):
                words[i] = {'text': source[i], 'start': actual[j]['start'], 'end': actual[j]['end'],
                            'probability': actual[j]['probability'], 'asrIndices': [j]}
        elif op == 'replace' and b-a == 1 and ''.join(normalized(w['word']) for w in actual[c:d]) == normalized(source[a]):
            words[a] = {'text': source[a], 'start': actual[c]['start'], 'end': actual[d-1]['end'],
                        'probability': min(w['probability'] for w in actual[c:d]), 'asrIndices': list(range(c,d)),
                        'normalization': 'Agrupamento ortográfico de mini-jogo para minijogo.'}
        else:
            raise ValueError(f'Divergência de transcrição: {op}: {source[a:b]} / {actual[c:d]}')
    assert all(words)
    assert [normalized(w) for w in ' '.join(groups).split()] == [normalized(w) for w in source]
    cues = []
    index = 0
    for number, text in enumerate(groups, 1):
        count = len(text.split())
        end_index = index+count
        selected = words[index:end_index]
        assert len(text.splitlines()) <= 2 and max(map(len,text.splitlines())) <= 36, text
        start = max(0,selected[0]['start']-0.03)
        end = selected[-1]['end']+0.12
        if end_index < len(words):
            end = min(end,words[end_index]['start']-0.03)
        assert end > start
        if cues:
            assert start >= cues[-1]['end']-0.001
        cues.append({'id':number,'start':round(start,3),'end':round(end,3),'text':text,
                     'wordStartIndex':index,'wordEndIndex':end_index,
                     'charactersPerSecond':round(len(text.replace('\n',' '))/(end-start),2)})
        index = end_index
    return {'schema':1,'referenceWords':len(source),'asrWords':len(actual),'allReferenceWordsMatched':True,
            'normalizations':['cinco reconhecido como5','mini-jogo agrupado como minijogo'],
            'timingMethod':'Tempos por palavra de faster-whisper-base, confronto textual integral e margens de30/120ms limitadas pelo próximo bloco.',
            'words':words,'cues':cues}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--asr',required=True)
    parser.add_argument('--reference',required=True)
    parser.add_argument('--groups',required=True)
    parser.add_argument('--output',required=True)
    args = parser.parse_args()
    result = align(json.loads(Path(args.asr).read_text(encoding='utf-8')),
                   Path(args.reference).read_text(encoding='utf-8'),
                   json.loads(Path(args.groups).read_text(encoding='utf-8')))
    Path(args.output).write_bytes(json.dumps(result,ensure_ascii=False,indent=2).encode())
    print(f'{result["referenceWords"]} palavras, {len(result["cues"])} blocos; todos conferidos.')
