path = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.css'
with open(path, 'r', encoding='utf-8') as f:
    css = f.read()

# Blend the neon lime (#d4f60b) with luxury royal purple (#7C3AED / #8b5cf6 / #090a0f)
# Keep lime as the vibrant action & status color, but give canvas and borders the luxury purple vibe
css = css.replace('--bg: #090a09;', '--bg: #07060c;')
css = css.replace('--bg2: #0d0f0d;', '--bg2: #0d0a17;')
css = css.replace('--panel: #111411;', '--panel: #120e20;')
css = css.replace('--panel2: #171a17;', '--panel2: #181329;')
css = css.replace('--edge: rgba(212, 246, 11, 0.5);', '--edge: rgba(212, 246, 11, 0.6); --purple: #7C3AED; --purple-wash: rgba(124, 58, 237, 0.15);')

with open(path, 'w', encoding='utf-8') as f:
    f.write(css)

print('Updated shell.css colors with luxury purple canvas + neon lime accent!')
