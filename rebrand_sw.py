path = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\sw.js'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace('GymRate', 'CoachPR')
code = code.replace('جيم ريت', 'كوتش بي آر')
code = code.replace('جيمريت', 'كوتش بي آر')

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)

print('Successfully rebranded sw.js to CoachPR!')
