const url = require('url');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// Configuration from CLI args
const targetUrl = process.argv[2] || 'https://islamtebyan.com';
const durationMs = (parseInt(process.argv[3]) || 10) * 1000;
const concurrency = parseInt(process.argv[4]) || 20;

console.log(`\n=============================================`);
console.log(`Starting load test on: ${targetUrl}`);
console.log(`Duration: ${durationMs / 1000} seconds`);
console.log(`Concurrency (Virtual Users): ${concurrency}`);
console.log(`=============================================\n`);

const parsedUrl = url.parse(targetUrl);
const requester = parsedUrl.protocol === 'https:' ? https : http;

let totalRequests = 0;
let successfulRequests = 0;
let failedRequests = 0;
const latencies = [];
const errors = {};
let totalBytesReceived = 0;

const startTime = performance.now();
let testActive = true;

// Active connections counter
let activeConnections = 0;

function runWorker() {
  if (!testActive) return;

  activeConnections++;
  const reqStartTime = performance.now();
  
  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
    path: parsedUrl.path,
    method: 'GET',
    headers: {
      'User-Agent': 'TebyanLoadTester/2.0 (NextJS Load Benchmarker)',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'identity', // prevent gzip parsing overhead in test script
    },
    timeout: 5000 // 5 second request timeout
  };

  const req = requester.request(options, (res) => {
    let dataLength = 0;
    res.on('data', (chunk) => {
      dataLength += chunk.length;
      totalBytesReceived += chunk.length;
    });

    res.on('end', () => {
      const elapsed = performance.now() - reqStartTime;
      totalRequests++;
      activeConnections--;
      
      if (res.statusCode >= 200 && res.statusCode < 300) {
        successfulRequests++;
        latencies.push(elapsed);
      } else {
        failedRequests++;
        const statusKey = `HTTP Status ${res.statusCode}`;
        errors[statusKey] = (errors[statusKey] || 0) + 1;
      }
      
      // Run next request
      if (testActive) {
        setImmediate(runWorker);
      }
    });
  });

  req.on('error', (err) => {
    totalRequests++;
    activeConnections--;
    failedRequests++;
    const errMsg = err.message || 'Connection Error';
    errors[errMsg] = (errors[errMsg] || 0) + 1;

    // Run next request
    if (testActive) {
      setTimeout(runWorker, 100); // Wait 100ms on error to prevent CPU lockup loop
    }
  });

  req.on('timeout', () => {
    req.destroy();
  });

  req.end();
}

// Start the virtual users
for (let i = 0; i < concurrency; i++) {
  runWorker();
}

// Progress display
const progressInterval = setInterval(() => {
  const elapsedSec = ((performance.now() - startTime) / 1000).toFixed(0);
  const rps = (totalRequests / (elapsedSec || 1)).toFixed(1);
  console.log(`[Progress] Elapsed: ${elapsedSec}s | Req Sent: ${totalRequests} | Actives: ${activeConnections} | Est. RPS: ${rps}`);
}, 2000);

// Stop test after duration
setTimeout(() => {
  testActive = false;
  clearInterval(progressInterval);
  const actualDuration = (performance.now() - startTime) / 1000;
  
  console.log('\nGenerating performance metrics report...');
  generateReport(actualDuration);
}, durationMs);

function generateReport(duration) {
  // Sort latencies to compute percentiles
  latencies.sort((a, b) => a - b);
  
  const total = latencies.length;
  const rps = (totalRequests / duration).toFixed(2);
  
  const min = total > 0 ? latencies[0] : 0;
  const max = total > 0 ? latencies[total - 1] : 0;
  const avg = total > 0 ? (latencies.reduce((sum, val) => sum + val, 0) / total) : 0;
  
  const p50 = total > 0 ? latencies[Math.floor(total * 0.5)] : 0;
  const p90 = total > 0 ? latencies[Math.floor(total * 0.9)] : 0;
  const p95 = total > 0 ? latencies[Math.floor(total * 0.95)] : 0;
  const p99 = total > 0 ? latencies[Math.floor(total * 0.99)] : 0;
  
  const throughputMb = (totalBytesReceived / (1024 * 1024)).toFixed(2);
  const successRate = ((successfulRequests / totalRequests) * 100 || 0).toFixed(1);
  const errorRate = ((failedRequests / totalRequests) * 100 || 0).toFixed(1);

  // Terminal Console Report
  console.log('\n==================================================');
  console.log('               PERFORMANCE STRESS REPORT          ');
  console.log('==================================================');
  console.log(`Target Address:    ${targetUrl}`);
  console.log(`Test Duration:     ${duration.toFixed(2)} sec`);
  console.log(`Simulated Users:   ${concurrency} concurrent VUs`);
  console.log('--------------------------------------------------');
  console.log(`Total Requests:    ${totalRequests}`);
  console.log(`Success Rate:      ${successRate}% (${successfulRequests} reqs)`);
  console.log(`Error Rate:        ${errorRate}% (${failedRequests} reqs)`);
  console.log(`RPS (Throughput):  ${rps} req/sec`);
  console.log(`Bytes Transferred: ${throughputMb} MB`);
  console.log('--------------------------------------------------');
  console.log('Latency Statistics (Round Trip Time):');
  console.log(`  Minimum response:  ${min.toFixed(1)} ms`);
  console.log(`  Average response:  ${avg.toFixed(1)} ms`);
  console.log(`  Median (p50):      ${p50.toFixed(1)} ms`);
  console.log(`  90th percentile:   ${p90.toFixed(1)} ms`);
  console.log(`  95th percentile:   ${p95.toFixed(1)} ms`);
  console.log(`  99th percentile:   ${p99.toFixed(1)} ms`);
  console.log(`  Maximum response:  ${max.toFixed(1)} ms`);
  
  if (Object.keys(errors).length > 0) {
    console.log('--------------------------------------------------');
    console.log('Error Breakdown:');
    for (const [err, count] of Object.entries(errors)) {
      console.log(`  ${err}: ${count} occurrences`);
    }
  }
  console.log('==================================================\n');

  // Build Markdown Report
  const mdReport = `# Tebyan Load Testing & Stress Report

Generated at: ${new Date().toLocaleString()}
Target URL: \`${targetUrl}\`

## Test Configuration
- **Duration**: ${duration.toFixed(2)} seconds
- **Concurrency (VUs)**: ${concurrency} simultaneous users
- **Method**: \`GET\` request loop

## Executive Summary
| Metric | Value | Details |
| :--- | :--- | :--- |
| **Requests/Sec (RPS)** | **${rps}** | Higher is better. Indicates database & server capacity. |
| **Total Requests** | **${totalRequests}** | Total queries processed. |
| **Success Rate** | **${successRate}%** | Target is 100%. Shows if server crashes under load. |
| **Failed Requests** | **${failedRequests}** | Network timeouts or server HTTP 500 errors. |
| **Total Throughput** | **${throughputMb} MB** | Total page data transfer size. |

## Latency Profile (Response Time)
The response time represents how long it takes for a user to fetch the page under load:
- ⚡ **Minimum Latency**: \`${min.toFixed(1)} ms\`
- 📊 **Average Latency**: \`${avg.toFixed(1)} ms\`
- 👥 **Median (p50)**: \`${p50.toFixed(1)} ms\` (50% of users get response below this)
- 🚀 **90th Percentile (p90)**: \`${p90.toFixed(1)} ms\` (90% of users get response below this)
- ⚠️ **95th Percentile (p95)**: \`${p95.toFixed(1)} ms\`
- 🔴 **99th Percentile (p99)**: \`${p99.toFixed(1)} ms\` (Worst case performance under pressure)
- 🐢 **Maximum Latency**: \`${max.toFixed(1)} ms\`

${Object.keys(errors).length > 0 ? `
## Error log
The following errors were returned by the gateway or application server:
${Object.entries(errors).map(([err, count]) => `- **${err}**: ${count} counts`).join('\n')}
` : `
## Verdict
✅ **No Errors Detected**: The server handled all concurrent connections successfully with 100% request integrity.
`}
`;

  // Write markdown report to workspace
  fs.writeFileSync(path.join(process.cwd(), 'load_test_results.md'), mdReport);
  console.log(`Markdown report generated and saved to: ${path.join(process.cwd(), 'load_test_results.md')}\n`);
}
