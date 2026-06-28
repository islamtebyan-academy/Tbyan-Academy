# Tebyan Load Testing & Stress Report

Generated at: 6/28/2026, 4:25:31 AM
Target URL: `https://islamtebyan.com/ar`

## Test Configuration
- **Duration**: 15.10 seconds
- **Concurrency (VUs)**: 100 simultaneous users
- **Method**: `GET` request loop

## Executive Summary
| Metric | Value | Details |
| :--- | :--- | :--- |
| **Requests/Sec (RPS)** | **2.85** | Higher is better. Indicates database & server capacity. |
| **Total Requests** | **43** | Total queries processed. |
| **Success Rate** | **69.8%** | Target is 100%. Shows if server crashes under load. |
| **Failed Requests** | **13** | Network timeouts or server HTTP 500 errors. |
| **Total Throughput** | **16.26 MB** | Total page data transfer size. |

## Latency Profile (Response Time)
The response time represents how long it takes for a user to fetch the page under load:
- ⚡ **Minimum Latency**: `2438.8 ms`
- 📊 **Average Latency**: `9541.0 ms`
- 👥 **Median (p50)**: `9634.9 ms` (50% of users get response below this)
- 🚀 **90th Percentile (p90)**: `14168.6 ms` (90% of users get response below this)
- ⚠️ **95th Percentile (p95)**: `14339.8 ms`
- 🔴 **99th Percentile (p99)**: `14340.1 ms` (Worst case performance under pressure)
- 🐢 **Maximum Latency**: `14340.1 ms`


## Error log
The following errors were returned by the gateway or application server:
- **socket hang up**: 13 counts

