import re

with open('gymrate_sw.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

routes = re.findall(r'on\("([A-Z]+\s+[^"]+)"', text)
with open('extracted_endpoints.txt', 'w', encoding='utf-8') as out:
    for r in sorted(set(routes)):
        out.write(r + '\n')

print(f"Extracted {len(set(routes))} endpoints.")
