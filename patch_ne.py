path = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Make sure D (#phone) always has src and loading is dismissed reliably
# te(D,`/app/?v=${Date.now()}${e?`#${e}`:""}`,"#phoneLoading",2500)
old_ne = 'function ne(e){Y(d,"trainee"),te(D,`/app/?v=${Date.now()}${e?`#${e}`:""}`,"#phoneLoading",2500)}'
new_ne = 'function ne(e){Y(d,"trainee");let url=`/app/?v=${Date.now()}${e?`#${e}`:""}`;te(D,url,"#phoneLoading",800);setTimeout(()=>{c("#phoneLoading")?.classList.add("is-done")},1200);}'

if old_ne in text:
    text = text.replace(old_ne, new_ne)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)
    print('Successfully patched ne function for instant phone loading!')
else:
    print('old_ne not exact match')
