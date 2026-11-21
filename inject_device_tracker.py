path = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\src\app\layout.tsx'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";', 'import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";\nimport DeviceTracker from "@/components/DeviceTracker";')
text = text.replace('<PwaInstallPrompt />', '<PwaInstallPrompt />\n        <DeviceTracker />')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Injected DeviceTracker cleanly into layout.tsx!')
