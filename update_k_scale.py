path = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Inspect function K() in shell.js
# let n=c("#phonewrap").getBoundingClientRect(),a=Math.min((n.width-8)/390,(n.height-8)/844,1);
# c("#phoneBody").style.transform=t?"none":`translate(-50%, -50%) scale(${a})`
# Let's ensure 'a' scales down on smaller screens or laptop heights without cutting off the phone!
old_k_scale = 'let n=c("#phonewrap").getBoundingClientRect(),a=Math.min((n.width-8)/390,(n.height-8)/844,1);c("#phoneBody").style.transform=t?"none":`translate(-50%, -50%) scale(${a})`'

new_k_scale = 'let n=c("#phonewrap").getBoundingClientRect(),availH=Math.max(300,n.height-24),availW=Math.max(200,n.width-16),a=Math.min(availW/390,availH/844,1);c("#phoneBody").style.transform=t?"none":`translate(-50%, -50%) scale(${Math.max(0.4,a)})`'

if old_k_scale in text:
    text = text.replace(old_k_scale, new_k_scale)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Successfully enhanced shell.js dynamic phone scaling for all screen sizes!")
else:
    print("old_k_scale not exact match, let us search for similar")
    idx = text.find('phonewrap')
    print(text[idx:idx+200])
