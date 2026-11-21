with open(r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect O(e) function
idx = text.find('function O(')
print('Function O:', text[idx:idx+350])
