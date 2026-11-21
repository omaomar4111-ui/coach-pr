path = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace GymRate URLs with CoachPR URLs
text = text.replace('https://gymrate.pro/en', '/')
text = text.replace('https://gymrate.pro/', '/')
text = text.replace('https://gymrate.pro', '/')

# Also let's inspect the brand href directly
text = text.replace('href="${N}"', 'href="/"')
text = text.replace('href="${N}#pricing"', 'href="/#pricing"')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Cleaned all external gymrate links in shell.js!")
