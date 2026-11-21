path = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.css'
with open(path, 'r', encoding='utf-8') as f:
    css = f.read()

# Let's inspect .phonewrap and .phone in shell.css
# We want the phone to scale smoothly with clamp() and min() so it fits ANY laptop, tablet, mobile or ultra-wide screen!
# Replace fixed dimensions with fluid responsive design
old_phone_block = """.phonewrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.phone {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 390px;
  height: 844px;
  border-radius: 54px;
  background: #050605;
  padding: 11px;
  box-shadow:
    0 0 0 1px var(--line2),
    0 0 0 2px #050605,
    0 40px 90px -30px rgba(0, 0, 0, 0.9);
  transform: translate(-50%, -50%);
  transform-origin: center center;
}
.phone__screen {
  position: relative;
  width: 368px;
  height: 822px;
  border-radius: 44px;
  overflow: hidden;
  background: #000;
}"""

new_phone_block = """.phonewrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.phone {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 390px;
  height: 844px;
  max-width: 95%;
  border-radius: 54px;
  background: #050605;
  padding: 11px;
  box-shadow:
    0 0 0 1px var(--line2),
    0 0 0 2px #050605,
    0 0 25px rgba(212, 246, 11, 0.12),
    0 40px 90px -30px rgba(0, 0, 0, 0.95);
  transform: translate(-50%, -50%);
  transform-origin: center center;
  transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.2, 1);
}
.phone__screen {
  position: relative;
  width: 368px;
  height: 822px;
  border-radius: 44px;
  overflow: hidden;
  background: #000;
}"""

if old_phone_block in css:
    css = css.replace(old_phone_block, new_phone_block)
    print("Replaced phone block cleanly")
else:
    print("Old phone block not exact match, let us do targeted replacement")
    # Replace .phone properties
    css = css.replace("width: 390px;\n  height: 844px;\n  border-radius: 54px;", "width: 390px;\n  height: 844px;\n  max-width: 95%;\n  border-radius: 54px;")

with open(path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Updated shell.css phone responsiveness!")
