with open(r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('<main class="stage"')
print('Main element:', text[idx:idx+150])

# Check tabs
idx2 = text.find('<nav class="tabs"')
print('Tabs element:', text[idx2:idx2+250])
