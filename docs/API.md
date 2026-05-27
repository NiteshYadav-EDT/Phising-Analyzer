# API Documentation - CyberEDT Phishing Analyzer

## Overview

The CyberEDT Phishing Analyzer API provides programmatic access to our advanced phishing detection capabilities. This RESTful API allows developers to integrate phishing analysis into their applications, security tools, and workflows.

## Base URL

```
https://phishing-analyzer.cyberedt.com
```

## Authentication

Currently, the API uses rate limiting for abuse prevention. API key authentication will be available in future versions.

## Endpoints

### POST /api/scan

Analyzes a URL for phishing threats and returns a comprehensive security report.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| url | string | Yes | The URL to be analyzed |

#### Request Example

```bash
curl -X POST https://phishing-analyzer.cyberedt.com/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

```javascript
const response = await fetch('https://phishing-analyzer.cyberedt.com/api/scan', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com'
  })
});

const result = await response.json();
```

#### Response Format

```json
{
  "riskScore": 75,
  "riskLevel": "Dangerous",
  "url": "https://example.com",
  "checks": [
    {
      "name": "HTTPS Encryption",
      "status": "pass",
      "message": "Valid SSL certificate detected",
      "icon": "shield-check"
    },
    {
      "name": "Brand Impersonation",
      "status": "fail",
      "message": "Potential Microsoft impersonation detected",
      "icon": "shield-alert"
    },
    {
      "name": "IP Address Detection",
      "status": "pass",
      "message": "No IP address detected in URL",
      "icon": "check-circle"
    }
  ],
  "domainInfo": {
    "domain": "example.com",
    "registrar": "GoDaddy",
    "country": "United States",
    "created": "2020-01-01",
    "securityLevel": "Medium",
    "hosting": "Cloudflare"
  },
  "timestamp": "2026-03-14T13:08:00.000Z"
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| riskScore | number | Overall risk score (0-100) |
| riskLevel | string | Risk classification (Safe/Suspicious/Dangerous) |
| url | string | The analyzed URL |
| checks | array | Array of security check results |
| domainInfo | object | Domain intelligence information |
| timestamp | string | Analysis timestamp (ISO 8601) |

#### Security Check Object

| Field | Type | Description |
|-------|------|-------------|
| name | string | Name of the security check |
| status | string | Status of the check (pass/warning/fail) |
| message | string | Detailed explanation of the result |
| icon | string | Icon identifier for UI display |

#### Domain Info Object

| Field | Type | Description |
|-------|------|-------------|
| domain | string | Analyzed domain name |
| registrar | string | Domain registrar information |
| country | string | Hosting country |
| created | string | Domain creation date |
| securityLevel | string | Overall security level |
| hosting | string | Hosting provider |

## Rate Limiting

The API implements rate limiting to ensure fair usage and prevent abuse:

- **5 requests per minute** per IP address
- **Automatic cleanup** of expired rate limit data
- **429 HTTP status** for exceeded limits

### Rate Limit Response

```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 45
}
```

### Rate Limit Headers

| Header | Description |
|--------|-------------|
| X-RateLimit-Limit | Maximum requests per window |
| X-RateLimit-Remaining | Remaining requests in current window |
| X-RateLimit-Reset | Time when rate limit resets (Unix timestamp) |

## Error Handling

### HTTP Status Codes

| Status | Description |
|--------|-------------|
| 200 | Success - Analysis completed |
| 400 | Bad Request - Invalid URL or parameters |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Service unavailable |

### Error Response Format

```json
{
  "error": "Invalid URL format",
  "code": "INVALID_URL",
  "message": "Please provide a valid URL including protocol (http:// or https://)"
}
```

### Error Codes

| Code | Description |
|------|-------------|
| INVALID_URL | Invalid URL format provided |
| MISSING_URL | URL parameter is required |
| RATE_LIMIT | Rate limit exceeded |
| INTERNAL_ERROR | Internal server error |

## Security Checks Reference

### 1. HTTPS Encryption Check
- **Purpose**: Validates SSL/TLS certificate presence
- **Risk Factors**: Missing SSL, expired certificates, self-signed certs
- **Weight**: 15% of total score

### 2. IP Address Detection
- **Purpose**: Identifies direct IP usage instead of domain names
- **Risk Factors**: Direct IP addresses, suspicious port numbers
- **Weight**: 10% of total score

### 3. Risky TLD Detection
- **Purpose**: Analyzes top-level domains for suspicious patterns
- **Risk Factors**: Risky TLDs (.tk, .ml, .ga), country code abuse
- **Weight**: 8% of total score

### 4. Homograph Attack Detection
- **Purpose**: Detects Unicode character spoofing
- **Risk Factors**: Lookalike characters, IDN abuse
- **Weight**: 12% of total score

### 5. Brand Impersonation Analysis
- **Purpose**: Identifies unauthorized brand usage
- **Risk Factors**: Major brand names, typosquatting
- **Weight**: 15% of total score

### 6. Suspicious Keyword Detection
- **Purpose**: Finds phishing-related keywords
- **Risk Factors**: Security terms, urgency words
- **Weight**: 8% of total score

### 7. URL Shortener Detection
- **Purpose**: Flags URL shortening services
- **Risk Factors**: Known shorteners, redirect chains
- **Weight**: 5% of total score

### 8. URL Length Analysis
- **Purpose**: Detects abnormally long URLs
- **Risk Factors**: Length > 75 characters, obfuscation
- **Weight**: 5% of total score

### 9. Suspicious Port Detection
- **Purpose**: Identifies non-standard ports
- **Risk Factors**: Ports 8080, 8443, 3000, etc.
- **Weight**: 5% of total score

### 10. File Extension Analysis
- **Purpose**: Scans for malicious file extensions
- **Risk Factors**: .exe, .zip, .scr, .js files
- **Weight**: 7% of total score

### 11. Authentication Bypass Detection
- **Purpose**: Identifies auth bypass patterns
- **Risk Factors**: Admin URLs, bypass attempts
- **Weight**: 5% of total score

### 12. Domain Reputation Scoring
- **Purpose**: Calculates domain reputation
- **Risk Factors**: New domains, suspicious registrars
- **Weight**: 10% of total score

### 13. Redirect Analysis
- **Purpose**: Analyzes redirect chains
- **Risk Factors**: Multiple redirects, suspicious destinations
- **Weight**: 5% of total score

### 14. Subdomain Pattern Analysis
- **Purpose**: Examines subdomain structures
- **Risk Factors**: Suspicious subdomains, brand abuse
- **Weight**: 5% of total score

## Integration Examples

### Python Integration

```python
import requests
import json

def analyze_url(url):
    """Analyze a URL using the CyberEDT Phishing Analyzer API"""
    
    api_url = "https://phishing-analyzer.cyberedt.com/api/scan"
    
    try:
        response = requests.post(
            api_url,
            json={"url": url},
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 429:
            retry_after = response.json().get('retryAfter', 60)
            print(f"Rate limit exceeded. Retry after {retry_after} seconds")
            return None
        else:
            print(f"Error: {response.status_code} - {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

# Usage example
result = analyze_url("https://example.com")
if result:
    print(f"Risk Score: {result['riskScore']}")
    print(f"Risk Level: {result['riskLevel']}")
```

### Node.js Integration

```javascript
const https = require('https');
const { URL } = require('url');

class PhishingAnalyzer {
    constructor(apiUrl = 'https://phishing-analyzer.cyberedt.com/api/scan') {
        this.apiUrl = apiUrl;
    }
    
    async analyzeUrl(url) {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({ url });
            
            const options = {
                hostname: new URL(this.apiUrl).hostname,
                path: new URL(this.apiUrl).pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            };
            
            const req = https.request(options, (res) => {
                let responseData = '';
                
                res.on('data', (chunk) => {
                    responseData += chunk;
                });
                
                res.on('end', () => {
                    try {
                        const result = JSON.parse(responseData);
                        
                        if (res.statusCode === 200) {
                            resolve(result);
                        } else if (res.statusCode === 429) {
                            reject(new Error(`Rate limit exceeded. Retry after ${result.retryAfter} seconds`));
                        } else {
                            reject(new Error(`API Error: ${result.error || 'Unknown error'}`));
                        }
                    } catch (error) {
                        reject(new Error(`JSON parsing error: ${error.message}`));
                    }
                });
            });
            
            req.on('error', (error) => {
                reject(error);
            });
            
            req.write(data);
            req.end();
        });
    }
}

// Usage example
const analyzer = new PhishingAnalyzer();

analyzer.analyzeUrl('https://example.com')
    .then(result => {
        console.log(`Risk Score: ${result.riskScore}`);
        console.log(`Risk Level: ${result.riskLevel}`);
    })
    .catch(error => {
        console.error(`Analysis failed: ${error.message}`);
    });
```

### Webhook Integration

```javascript
// Express.js webhook handler
app.post('/webhook/phishing-check', async (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    
    try {
        const result = await analyzeUrl(url);
        
        // Process result based on risk level
        if (result.riskLevel === 'Dangerous') {
            // Block access, send alert, etc.
            await sendSecurityAlert(url, result);
            return res.json({ 
                action: 'block',
                reason: 'High phishing risk detected',
                details: result
            });
        } else if (result.riskLevel === 'Suspicious') {
            // Require additional verification
            return res.json({ 
                action: 'verify',
                reason: 'Suspicious URL detected',
                details: result
            });
        } else {
            // Allow access
            return res.json({ 
                action: 'allow',
                reason: 'URL appears safe',
                details: result
            });
        }
        
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ error: 'Analysis failed' });
    }
});
```

## SDK Libraries

### JavaScript/TypeScript SDK

```bash
npm install @cyberedt/phishing-analyzer
```

```typescript
import { PhishingAnalyzer } from '@cyberedt/phishing-analyzer';

const analyzer = new PhishingAnalyzer({
    apiKey: 'your-api-key', // Future feature
    timeout: 10000
});

const result = await analyzer.analyze('https://example.com');
console.log(result.riskScore);
```

### Python SDK

```bash
pip install cyberedt-phishing-analyzer
```

```python
from cyberedt_phishing_analyzer import PhishingAnalyzer

analyzer = PhishingAnalyzer(api_key='your-api-key')  # Future feature
result = analyzer.analyze('https://example.com')
print(f"Risk Score: {result.risk_score}")
```

## Support

For API support and questions:

- **Documentation**: docs.cyberedt.com
- **Support Portal**: support.cyberedt.com
- **API Status**: status.cyberedt.com
- **Email**: api-support@cyberedt.com

## Changelog

### v1.0.0 (2026-03-14)
- Initial API release
- 14 comprehensive security checks
- Rate limiting implementation
- JSON response format
- Error handling and status codes
