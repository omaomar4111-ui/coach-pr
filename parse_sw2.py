import re
import os

filepath = 'gymrate_sw.js'
if not os.path.exists(filepath):
    filepath = r'C:\Users\DELL\AppData\Local\Programs\antigravity\gymrate_sw.js'

with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

routes = re.findall(r'on\("([A-Z]+\s+[^"]+)"', text)
outpath = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\extracted_endpoints.txt'
with open(outpath, 'w', encoding='utf-8') as out:
    for r in sorted(set(routes)):
        out.write(r + '\n')

print(f"Extracted {len(set(routes))} endpoints.")
