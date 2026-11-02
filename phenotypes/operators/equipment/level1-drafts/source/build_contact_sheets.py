from PIL import Image,ImageDraw,ImageFont
import json
from pathlib import Path
p=Path(__file__).resolve().parent.parent; a=json.loads((p/'asset_manifest.json').read_text())['assets']
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',17)
for mode in ['hero','front','back']:
 s=Image.new('RGB',(1800,840),'#121820'); d=ImageDraw.Draw(s)
 for i,x in enumerate(a):
  im=Image.open(p/'previews'/f'{x["id"]}_{mode}.png').convert('RGB');im.thumbnail((300,225))
  cx=(i%6)*300;cy=(i//6)*280;s.paste(im,(cx,cy));d.text((cx+8,cy+228),x['id']+' '+x['title'],font=f,fill='white');d.text((cx+8,cy+251),'LEVEL 1 / '+mode.upper(),font=f,fill='#9baaba')
 s.save(p/'previews'/f'contact_{mode}.jpg',quality=92)
