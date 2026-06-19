const http = require('http');

function checkURL(url, expectedContent = null) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (expectedContent) {
            if (data.includes(expectedContent)) {
              console.log(`[PASS] ${url} matches expected content.`);
              resolve(true);
            } else {
              console.error(`[FAIL] ${url} did NOT contain: "${expectedContent}"`);
              resolve(false);
            }
          } else {
            console.log(`[PASS] ${url} returned status ${res.statusCode}`);
            resolve(true);
          }
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
          console.log(`[REDIRECT] ${url} redirected to ${res.headers.location} (${res.statusCode})`);
          resolve(true);
        } else {
          console.error(`[FAIL] ${url} returned status ${res.statusCode}`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.error(`[FAIL] Connection error to ${url}:`, err.message);
      resolve(false);
    });
  });
}

async function runTests() {
  console.log('Starting verification tests on http://localhost:3001...');
  
  const tests = [
    // 1. English homepage check (Root)
    checkURL('http://localhost:3001/', 'Traditional Isnad'),
    // 2. English redirect check
    checkURL('http://localhost:3001/en'),
    // 3. Arabic homepage check
    checkURL('http://localhost:3001/ar', 'رصانة الإسناد'),
    // 4. Programs listing check
    checkURL('http://localhost:3001/programs', 'Quran &amp; Tajweed'),
    // 5. Booking page check
    checkURL('http://localhost:3001/book', 'Free Academic Assessment'),
    // 6. Pricing check
    checkURL('http://localhost:3001/pricing', 'Academic Membership Plans'),
  ];

  const results = await Promise.all(tests);
  const allPassed = results.every(r => r === true);
  
  if (allPassed) {
    console.log('\nAll verification tests PASSED successfully!');
    process.exit(0);
  } else {
    console.error('\nSome verification tests FAILED. Please inspect the outputs.');
    process.exit(1);
  }
}

runTests();
