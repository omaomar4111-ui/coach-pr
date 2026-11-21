path = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\sw.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('https://gymrate.pro/c/tamer', '/coach/tamer')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Cleaned profile link in sw.js!")
