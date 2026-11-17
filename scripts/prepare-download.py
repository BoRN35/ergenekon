"""Build the downloadable project ZIP and hosting-safe parts, excluding parts themselves."""
import hashlib,json,subprocess,tempfile,zipfile
from pathlib import Path

root=Path(__file__).resolve().parent.parent
output=root/'public'/'downloads';output.mkdir(exist_ok=True)
paths=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard','-z'],cwd=root).decode().split('\0')
def include(name):
    path=Path(name)
    return bool(name and not name.startswith(('public/downloads/','dist/client/downloads/')) and path.name not in ('.env','.env.local','.env.production') and (root/path).is_file())
paths=sorted({name for name in paths if include(name)})
source=subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()
with tempfile.TemporaryDirectory(prefix='ergenekon-download-') as temporary:
    archive=Path(temporary)/'ergenekon-proje.zip'
    with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as zipped:
        for name in paths:zipped.write(root/name,'ergenekon/'+name)
    with zipfile.ZipFile(archive) as zipped:
        assert zipped.testzip() is None
        assert not any('/downloads/project-' in name or '/hesap-yedegi/' in name for name in zipped.namelist())
    for stale in output.glob('project-*.part'):stale.unlink()
    parts=[];total=archive.stat().st_size;whole=hashlib.sha256()
    with archive.open('rb') as stream:
        index=1
        while block:=stream.read(18*1024*1024):
            name=f'project-{index:02}.part';(output/name).write_bytes(block);whole.update(block)
            parts.append({'file':name,'bytes':len(block),'sha256':hashlib.sha256(block).hexdigest()});index+=1
    manifest={'format':'ergenekon-project-parts-v1','sourceCommit':source,'bytes':total,'sha256':whole.hexdigest(),'parts':parts,'containsPersonalSave':False}
    (output/'project-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps({'bytes':total,'parts':len(parts),'files':len(paths),'largestPartBytes':max(p['bytes'] for p in parts),'containsPersonalSave':False}))
