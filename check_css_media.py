with open(r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Let's inspect @media (max-width: 980px)
idx = css.find('@media (max-width: 980px)')
print('Media query max-width 980px:\n', css[idx:idx+1200])
