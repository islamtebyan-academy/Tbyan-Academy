const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split('\n');
  console.log('Available environment keys:');
  for (const line of lines) {
    const match = line.match(/^\s*([\w.-]+)\s*=/);
    if (match) {
      console.log(`- ${match[1]}`);
    }
  }
} else {
  console.log('.env file not found');
}
