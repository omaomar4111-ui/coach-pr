with open(r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect se function which initializes the tour
idx = text.find('async function se(')
print('Function se:', text[idx:idx+350])
