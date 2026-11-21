with open(r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect step 0 in g array
idx = text.find('var g=[')
print(text[idx:idx+800])
