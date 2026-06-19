const fs = require('fs');

const content = fs.readFileSync('app/[locale]/(public)/programs/page.tsx', 'utf8');

// Find the start and end of ACADEMIC_DATABASE
const startMarker = 'const ACADEMIC_DATABASE: Record<string, Record<string, TrackData>> = {';
const startIndex = content.indexOf(startMarker);

if (startIndex === -1) {
  console.error('Could not find ACADEMIC_DATABASE start');
  process.exit(1);
}

// Find matching closing brace for the object
let braceCount = 1;
let currentIndex = startIndex + startMarker.length;
while (braceCount > 0 && currentIndex < content.length) {
  if (content[currentIndex] === '{') {
    braceCount++;
  } else if (content[currentIndex] === '}') {
    braceCount--;
  }
  currentIndex++;
}

const dbText = content.substring(startIndex, currentIndex);
console.log('Extracted block length:', dbText.length);

// Write to a temporary file in scratch directory
fs.writeFileSync('check_extracted_db.js', 'module.exports = ' + dbText.replace('const ACADEMIC_DATABASE: Record<string, Record<string, TrackData>> = ', '') + ';');
console.log('Saved extracted database to check_extracted_db.js');
