# Složí web/src/* do jednoho souboru app/src/main/assets/index.html (spouští se i v GitHub Actions)
import pathlib
d = pathlib.Path(__file__).parent
css = (d/'src/style.css').read_text(encoding='utf-8')
js = (d/'src/lessons.js').read_text(encoding='utf-8') + '\n' + (d/'src/texts.js').read_text(encoding='utf-8') + '\n' + (d/'src/app.js').read_text(encoding='utf-8')
html = f'''<!DOCTYPE html>
<html lang="cs"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#c8102e">
<title>Español – španělština od nuly</title>
<style>{css}</style></head>
<body><div id="app"></div>
<script>{js}</script></body></html>'''
out = d.parent/'app/src/main/assets'
out.mkdir(parents=True, exist_ok=True)
(out/'index.html').write_text(html, encoding='utf-8')
print('index.html', len(html), 'B')
