const fs = require('fs');
const filePath = 'C:/Users/DELL/.gemini/antigravity/scratch/coach-pr/src/app/rawContent.ts';
let file = fs.readFileSync(filePath, 'utf8');

const targetHeader = '<a class=\\"brand\\" href=\\"#top\\" aria-label=\\"CoachPR\\"><svg viewBox=\\"-4.31 -0.88 132.31 106.87\\" aria-hidden=\\"true\\"><use href=\\"#mk\\"></use></svg><span>CoachPR</span></a>';
const newHeader = '<a class=\\"brand\\" href=\\"#top\\" aria-label=\\"CoachPR\\"><img src=\\"/pr-logo.png\\" alt=\\"PR\\" style=\\"height:34px;width:auto;margin-left:8px;object-fit:contain;vertical-align:middle;display:inline-block;filter:drop-shadow(0 0 8px rgba(167,139,250,0.5))\\" /><span>CoachPR</span></a>';

const targetFooter = '<a class=\\"brand\\" href=\\"#top\\"><svg viewBox=\\"-4.31 -0.88 132.31 106.87\\" aria-hidden=\\"true\\"><use href=\\"#mk\\"></use></svg>CoachPR</a>';
const newFooter = '<a class=\\"brand\\" href=\\"#top\\"><img src=\\"/pr-logo.png\\" alt=\\"PR\\" style=\\"height:34px;width:auto;margin-left:8px;object-fit:contain;vertical-align:middle;display:inline-block;filter:drop-shadow(0 0 8px rgba(167,139,250,0.5))\\" />CoachPR</a>';

let c = 0;
if (file.includes(targetHeader)) {
  file = file.replace(targetHeader, newHeader);
  c++;
}
if (file.includes(targetFooter)) {
  file = file.replace(targetFooter, newFooter);
  c++;
}

fs.writeFileSync(filePath, file, 'utf8');
console.log('REPLACED PR LOGO COUNT:', c);
