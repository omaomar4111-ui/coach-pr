with open(r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect J function (service worker register)
idx = text.find('async function J(')
print('Function J:', text[idx:idx+350])
