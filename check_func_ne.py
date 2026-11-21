with open(r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect D.src and ne function
idx = text.find('function ne(')
print('Function ne:', text[idx:idx+250])
