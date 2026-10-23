"""Extract the complete supplied brochure into responsive assets and exact text.

Requires pypdf, pdfplumber, Pillow, and Poppler. The source is never modified.
Usage: python scripts/prepare-complete-brochure.py /path/to/web-complete.pdf
Optional second argument: directory of 1680px-wide pdftoppm page-NN.png renders.
"""
from collections import Counter, defaultdict
from hashlib import sha256
from pathlib import Path
import json
import re
import subprocess
import sys
import tempfile

import pdfplumber
from PIL import Image
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ContentStream

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'brochure' / 'complete'
DATA = ROOT / 'src' / 'app' / 'brochure-data.json'
OUT.mkdir(parents=True, exist_ok=True)
(OUT / 'fonts').mkdir(exist_ok=True)
SOURCE = Path(sys.argv[1]).resolve()
reader = PdfReader(SOURCE)
assert len(reader.pages) == 24, 'Expected the supplied 24-page complete brochure.'

# Build small web-font families from the original embedded subsets. Each Unicode
# character is assigned once, so browsers fetch only the subsets they need.
font_candidates = defaultdict(dict)

def unicode_characters(font):
    cmap = font['/ToUnicode'].get_data().decode('latin1')
    result = set()
    for block in re.findall(r'beginbfchar(.*?)endbfchar', cmap, re.S):
        for _, value in re.findall(r'<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>', block):
            result.update(bytes.fromhex(value).decode('utf-16-be'))
    for block in re.findall(r'beginbfrange(.*?)endbfrange', cmap, re.S):
        for first, last, dest in re.findall(r'<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>', block):
            result.update(chr(int(dest, 16) + n) for n in range(int(last,16)-int(first,16)+1))
    return result

def collect_fonts(obj):
    resources = obj.get('/Resources', {}).get_object()
    for reference in resources.get('/Font', {}).values():
        font = reference.get_object()
        if '/DescendantFonts' not in font or '/ToUnicode' not in font:
            continue
        descriptor = font['/DescendantFonts'][0].get_object()['/FontDescriptor']
        if '/FontFile2' not in descriptor:
            raise ValueError(f'Unsupported font: {font["/BaseFont"]}')
        binary = descriptor['/FontFile2'].get_data()
        family = str(font['/BaseFont']).split('+')[-1]
        digest = sha256(binary).hexdigest()[:12]
        font_candidates[family][digest] = (binary, unicode_characters(font))
    for reference in resources.get('/XObject', {}).values():
        child = reference.get_object()
        if child.get('/Subtype') == '/Form':
            collect_fonts(child)

for page in reader.pages[1:]:
    collect_fonts(page)

font_css = []
for family, candidates in font_candidates.items():
    assigned = set()
    for digest, (binary, chars) in sorted(candidates.items(), key=lambda entry: -len(entry[1][1])):
        needed = chars - assigned
        if not needed:
            continue
        assigned.update(needed)
        name = f'{family.lower()}-{digest}.ttf'
        (OUT / 'fonts' / name).write_bytes(binary)
        unicode_range = ','.join(f'U+{ord(char):X}' for char in sorted(needed))
        font_css.append(f'@font-face{{font-family:"Brochure-{family}";src:url("/brochure/complete/fonts/{name}") format("truetype");font-display:swap;unicode-range:{unicode_range};}}')
(ROOT / 'src' / 'app' / 'brochure-fonts.css').write_text('\n'.join(font_css)+'\n')

pdf = pdfplumber.open(SOURCE)
# White placeholder characters under drop caps and repeated overprints are not
# visible printed content. Keep all visible words, including source repetitions.
clean_pages = [page.dedupe_chars().filter(lambda item:
    item.get('object_type') != 'char' or item.get('non_stroking_color') != (1, 1, 1)
) for page in pdf.pages]


def lines(n, top=0, bottom=572, left=0, right=418, dropcaps=False):
    page = clean_pages[n-1].filter(lambda item:
        item.get('object_type') == 'char'
        and top <= item['top'] < bottom
        and left <= (item['x0'] + item['x1']) / 2 < right
        and (dropcaps or not ('AnastasiaScript' in item['fontname'] and item['size'] > 45))
    )
    return page.extract_text_lines(x_tolerance=1, y_tolerance=2)


def text(n, top, bottom, left=0, right=418):
    return ' '.join(line['text'].strip() for line in lines(n,top,bottom,left,right)).strip()


def paragraph(n, top, bottom, *, drop=False, **extra):
    value = text(n,top,bottom)
    if drop:
        initials = [c for c in clean_pages[n-1].chars if top <= c['top'] < bottom and 'AnastasiaScript' in c['fontname'] and c['size'] > 45]
        assert len(initials) == 1, (n,initials)
        value = initials[0]['text'] + value
    result = dict(kind='paragraph', text=value, **extra)
    if drop:
        result['dropcap'] = True
    # Preserve emphases actually printed in the source.
    emphasis = []
    for line in lines(n,top,bottom):
        chars = [c for c in line['chars'] if 'Bold' in c['fontname']]
        if chars:
            emphasis.append(''.join(c['text'] for c in sorted(chars,key=lambda c:c['x0'])).strip())
    if emphasis:
        result['emphasis'] = emphasis
    return result


def listing(n, spans):
    return dict(kind='list',items=[text(n,a,b) for a,b in spans])


def photo(name, side='full'):
    return dict(kind='image',name=name,side=side)


def prose(n, ranges, title=None, quote=None, subtitle=None):
    result=dict(number=n,label=str(n-1),id=f'page-{n}',kind='prose',blocks=[])
    if title:
        result['title']=text(n,*title)
    if quote:
        result['quote']=text(n,*quote)
    if subtitle:
        result['subtitle']=text(n,*subtitle)
    for item in ranges:
        if isinstance(item,dict):
            result['blocks'].append(item)
        else:
            a,b,*drop=item
            result['blocks'].append(paragraph(n,a,b,drop=bool(drop)))
    return result

pages=[]
# Service columns are read independently to preserve their actual sequence.
service=dict(number=2,label='1',id='order-of-service',kind='service',title=text(2,0,55),blocks=[],columns=[])
service['blocks']=[dict(kind='heading',text=text(2,55,80)),dict(kind='lines',items=[l['text'] for l in lines(2,80,150)]),dict(kind='heading',text=text(2,150,185)),dict(kind='lines',items=[l['text'] for l in lines(2,185,225)])]
for left,right in [(0,225),(225,418)]:
    service['columns'].append([dict(kind='heading',text=text(2,225,255,left,right)),dict(kind='lines',items=[l['text'] for l in lines(2,255,565,left,right)])])
pages.append(service)
pages.append(prose(3,[(90,145,True),photo('biography-1','right'),(145,245),(245,375),photo('biography-2','left'),(375,512),(512,572)],title=(0,50),quote=(50,80)))
pages[-1]['id']='biography'
pages.append(prose(4,[(0,105),(105,140),listing(4,[(140,170),(170,200),(200,230)]),photo('biography-3','right'),(230,380),photo('biography-4','left'),(380,572)]))
pages.append(prose(5,[(0,65),photo('biography-5','right'),listing(5,[(65,100),(100,145),(145,175),(175,225)]),(225,275),paragraph(5,275,355,clear=True),photo('biography-6','left'),(355,445),(445,572)]))
pages.append(prose(6,[(0,60),(60,110),(110,140),photo('biography-7')]))
pages.append(prose(7,[(120,200,True),photo('wife','right'),(200,380),(380,440),(440,572)],title=(0,48),subtitle=(48,70),quote=(70,105)))
pages[-1]['id']='tribute-wife'
pages.append(prose(8,[(0,105),(105,145),(145,195),(195,225),paragraph(8,225,572,italic=True)]))
pages.append(prose(9,[(95,178,True),(178,250),(250,375),(375,430),(430,572)],title=(0,50),quote=(50,80)))
pages[-1]['id']='tribute-children'
pages.append(prose(10,[(0,105),(105,165),(165,240),(240,300),(300,330),paragraph(10,330,572,italic=True)]))
pages.append(prose(11,[(110,170,True),(170,215),(215,275),(275,309),(309,572)],title=(0,55),quote=(55,100)))
pages[-1]['id']='tribute-grandchildren'
pages.append(prose(12,[(90,150,True),(150,240),(240,315),(315,337),(337,352),(352,572)],title=(0,50),quote=(50,85)))
pages[-1]['id']='tribute-family'
pages.append(prose(13,[(95,140,True),(140,200),(200,275),(275,292),(292,572)],title=(0,50),quote=(50,85)))
pages[-1]['id']='tribute-in-laws'
pages.append(prose(14,[(75,94,True),(94,150),(150,225),(225,245),(245,300),(300,330),(330,390),(390,410),(410,425),(425,450),(450,470),(470,485),(485,572)],title=(0,70)))
pages[-1]['id']='tribute-dzita'

for n in range(15,21):
    page_lines=lines(n)
    pages.append(dict(number=n,label=str(n-1),id='gallery' if n==15 else f'page-{n}',kind='gallery',title=page_lines[0]['text'],subtitle=page_lines[1]['text'],blocks=[photo(f'gallery-{n}')]))

for n in range(21,24):
    cols=[]
    for left,right in [(0,215),(215,418)]:
        blocks=[]
        for line in lines(n,65,570,left,right):
            value=line['text']
            if re.fullmatch(r'(MHB|PHB) \d+',value):
                blocks.append(dict(kind='hymn',title=value,verses=[]))
            else:
                assert blocks, (n,value)
                verses=blocks[-1]['verses']
                if not verses or re.match(r'^\d[ .]',value) or value=='Refrain:' or value.startswith('(At sea'):
                    verses.append(value)
                else:
                    verses[-1]+='\n'+value
        if blocks:
            cols.append(blocks)
    pages.append(dict(number=n,label=str(n-1),id='hymns' if n==21 else f'page-{n}',kind='hymns',title=text(n,0,60),blocks=[],columns=cols))

pages.append(dict(number=24,id='appreciation',kind='appreciation',title=text(24,220,275),blocks=[paragraph(24,275,300),paragraph(24,300,320,bold=True),paragraph(24,320,365),paragraph(24,365,390,bold=True)]))

# Assert that every visible PDF character is represented exactly once. Whitespace
# and line wrapping may change; punctuation, numbers, names, and repetitions may not.
def content_strings(page):
    values=[]
    for key in ('title','subtitle','quote','label'):
        if page.get(key):values.append(page[key])
    def block_strings(block):
        return [block[k] for k in ('text','title') if k in block]+block.get('items',[])+block.get('verses',[])
    for block in page['blocks']:values+=block_strings(block)
    for column in page.get('columns',[]):
        for block in column:values+=block_strings(block)
    return values

audit=[]
for page in pages:
    original=Counter(c['text'] for c in clean_pages[page['number']-1].chars if not c['text'].isspace())
    actual=Counter(c for c in ''.join(content_strings(page)) if not c.isspace())
    assert original==actual, (page['number'],'missing',original-actual,'extra',actual-original)
    audit.append(dict(page=page['number'],visibleCharacters=sum(original.values()),matched=True))

with tempfile.TemporaryDirectory(prefix='complete-brochure-') as temporary:
    work=Path(temporary)
    if len(sys.argv)>2:
        renders=Path(sys.argv[2])
    else:
        renders=work
        subprocess.run(['pdftoppm','-scale-to-x','1680','-scale-to-y','-1','-png',str(SOURCE),str(renders/'page')],check=True)

    def image_variants(name,image,widths=(480,840,1260)):
        image=image.convert('RGB')
        for width in widths:
            resized=image.resize((width,round(image.height*width/image.width)),Image.Resampling.LANCZOS)
            resized.save(OUT/f'{name}-{width}.avif',quality=70,speed=6)
            resized.save(OUT/f'{name}-{width}.webp',quality=87,method=6)
        return dict(width=image.width,height=image.height)

    # Crop bounds were verified against the PDF at a 699 x 1000 preview scale.
    crops={
        'biography-1':(3,(448,232,666,555)),
        'biography-2':(3,(30,652,218,957)),
        'biography-3':(4,(479,410,664,671)),
        'biography-4':(4,(31,648,233,930)),
        'biography-5':(5,(458,175,670,473)),
        'biography-6':(5,(31,615,310,817)),
        'biography-7':(6,(34,279,655,614)),
        'wife':(7,(337,367,669,604)),
    }
    for n in range(15,21):
        # Include the complete montage, preserving its original crops and order.
        top=160 if n in (15,16) else (220 if n==17 else 180)
        crops[f'gallery-{n}']=(n,(16,top,680,960))
    dimensions={}
    for name,(n,box) in crops.items():
        source=Image.open(renders/f'page-{n:02}.png')
        scaled=tuple(round(v*(source.width/699 if i%2==0 else source.height/1000)) for i,v in enumerate(box))
        dimensions[name]=image_variants(name,source.crop(scaled))

    # Original floral detail as a small decorative asset, without any text.
    decoration=Image.open(renders/'page-02.png').crop((1475,0,1680,415))
    decoration.save(OUT/'floral.webp',quality=90,method=6)

    # Remove only the text operators from the appreciation page; retain the
    # original black background, light flare, and gold ornament beneath HTML copy.
    def remove_text(obj):
        resources=obj.get('/Resources',{}).get_object()
        for reference in resources.get('/XObject',{}).values():
            child=reference.get_object()
            if child.get('/Subtype')=='/Form':
                remove_text(child)
                stream=ContentStream(child,reader);filtered=[];inside=False
                for operands,operator in stream.operations:
                    if operator==b'BT':inside=True
                    if not inside:filtered.append((operands,operator))
                    if operator==b'ET':inside=False
                stream.operations=filtered;child.set_data(stream.get_data())
    remove_text(reader.pages[23])
    writer=PdfWriter();writer.add_page(reader.pages[23])
    path=work/'appreciation.pdf'
    with path.open('wb') as stream:writer.write(stream)
    subprocess.run(['pdftoppm','-scale-to-x','1260','-scale-to-y','-1','-singlefile','-png',str(path),str(work/'appreciation')],check=True)
    dimensions['appreciation']=image_variants('appreciation',Image.open(work/'appreciation.png'))
    # The supplied complete file is the source of truth for the cover as well.
    writer=PdfWriter();writer.add_page(reader.pages[0])
    cover=work/'cover.pdf'
    with cover.open('wb') as stream:writer.write(stream)
    subprocess.run([sys.executable,str(ROOT/'scripts'/'prepare-brochure.py'),str(cover)],check=True)

for page in pages:
    for block in page['blocks']:
        if block['kind']=='image':block.update(dimensions[block['name']])
DATA.write_text(json.dumps(pages,ensure_ascii=False,indent=2)+'\n')
(OUT/'source-audit.json').write_text(json.dumps(dict(sourceSHA256=sha256(SOURCE.read_bytes()).hexdigest(),pageCount=24,pages=audit),indent=2)+'\n')
print(f'Extracted {len(pages)+1} pages. Every visible interior-page character matches the source.')
