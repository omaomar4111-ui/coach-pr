path = r'C:\Users\DELL\.gemini\antigravity\scratch\coach-pr\public\tour\shell.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Make J resilient: if Service Worker registration fails or hangs, resolve gracefully and load dashboard & phone anyway!
old_J = 'async function J(e){let t=await navigator.serviceWorker.register("/sw.js",{scope:"/"});await navigator.serviceWorker.ready;let n=t.active??navigator.serviceWorker.controller;if(!n)throw new Error("service worker unavailable");await new Promise(a=>{let r=new MessageChannel;r.port1.onmessage=()=>a(),n.postMessage({type:"reset",lang:e},[r.port2])})}'

new_J = 'async function J(e){try{if("serviceWorker" in navigator){let t=await navigator.serviceWorker.register("/sw.js",{scope:"/"});await navigator.serviceWorker.ready;let n=t.active??navigator.serviceWorker.controller;if(n){await new Promise(a=>{let r=new MessageChannel;r.port1.onmessage=()=>a(),n.postMessage({type:"reset",lang:e},[r.port2]);setTimeout(a,500);});}}}catch(err){console.warn("[tour sw fallback]",err);}}'

if old_J in text:
    text = text.replace(old_J, new_J)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)
    print('Successfully patched J function for instant guaranteed iframe loading!')
else:
    print('old_J not exact match, let us inspect')
