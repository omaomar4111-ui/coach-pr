with open(r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'https?://[a-zA-Z0-9\.\-_/:]+', text)
for m in set(matches):
    print('Found URL:', m)

# Let's inspect variable N in shell.js
idx = text.find('brand" href="${N}"')
if idx != -1:
    print('N snippet:', text[idx-100:idx+100])

idx_n = text.find('N=')
if idx_n != -1:
    print('N definition:', text[idx_n-50:idx_n+100])
