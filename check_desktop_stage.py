with open(r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Let's inspect .stage on desktop
idx = css.find('.stage {')
print('Desktop .stage definition:\n', css[idx:idx+500])
