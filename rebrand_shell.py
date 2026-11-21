import os

path = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace('GymRate', 'CoachPR')
code = code.replace('جيم ريت', 'كوتش بي آر')
code = code.replace('جيمريت', 'كوتش بي آر')
code = code.replace('te(h,"/",', 'te(h,"/dashboard",')

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)

print('Successfully updated shell.js with CoachPR brand and /dashboard target!')
