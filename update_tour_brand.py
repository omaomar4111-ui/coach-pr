import os

path = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the GymRate SVG logo (pe) with the CoachPR "PR" emblem
# pe='<svg viewBox="-4.31 -0.88 132.31 106.87" aria-hidden="true">...</svg>'
pr_logo_svg = '<span class="pr-emblem-badge" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#7C3AED,#a855f7);color:#fff;font-weight:900;font-size:14px;box-shadow:0 0 12px rgba(124,58,237,0.5);margin-left:6px;letter-spacing:-0.5px;">PR</span>'

# Find pe=... and replace its value or replace the brand link inside innerHTML
old_brand = '<a class="brand" href="${N}">${pe}<span>CoachPR</span></a>'
new_brand = '<a class="brand" href="${N}" style="display:inline-flex;align-items:center;gap:6px;"><span class="pr-emblem" style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#7C3AED,#a855f7);display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:14px;box-shadow:0 0 12px rgba(124,58,237,0.5);">PR</span><span style="font-weight:900;letter-spacing:1px;font-size:16px;color:#fff;">Coach<span style="color:#d4f60b;">PR</span></span></a>'

code = code.replace(old_brand, new_brand)

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)

print('Updated shell.js with official PR emblem logo!')
