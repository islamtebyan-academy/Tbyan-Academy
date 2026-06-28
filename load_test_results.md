# Tebyan Load Testing & Stress Report

Generated at: 6/28/2026, 3:54:46 AM
Target URL: `https://islamtebyan.com`

## Test Configuration
- **Duration**: 15.10 seconds
- **Concurrency (VUs)**: 100 simultaneous users
- **Method**: `GET` request loop

## Executive Summary
| Metric | Value | Details |
| :--- | :--- | :--- |
| **Requests/Sec (RPS)** | **1.59** | Higher is better. Indicates database & server capacity. |
| **Total Requests** | **24** | Total queries processed. |
| **Success Rate** | **41.7%** | Target is 100%. Shows if server crashes under load. |
| **Failed Requests** | **14** | Network timeouts or server HTTP 500 errors. |
| **Total Throughput** | **10.59 MB** | Total page data transfer size. |

## Latency Profile (Response Time)
The response time represents how long it takes for a user to fetch the page under load:
- ⚡ **Minimum Latency**: `6887.0 ms`
- 📊 **Average Latency**: `8077.0 ms`
- 👥 **Median (p50)**: `7906.1 ms` (50% of users get response below this)
- 🚀 **90th Percentile (p90)**: `12719.0 ms` (90% of users get response below this)
- ⚠️ **95th Percentile (p95)**: `12719.0 ms`
- 🔴 **99th Percentile (p99)**: `12719.0 ms` (Worst case performance under pressure)
- 🐢 **Maximum Latency**: `12719.0 ms`


## Error log
The following errors were returned by the gateway or application server:
- **socket hang up**: 14 counts

