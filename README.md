# CyberEDT Phishing Analyzer - Technical Documentation

## Overview

The **CyberEDT Phishing Analyzer** is an enterprise-grade cybersecurity tool designed to detect and analyze phishing URLs, malicious domains, and suspicious web patterns. The system combines advanced heuristic analysis with real-time threat intelligence to provide comprehensive security assessments of web links.

The analyzer addresses the critical need for rapid identification of phishing threats in an increasingly complex digital landscape. By leveraging multiple detection algorithms and threat intelligence feeds, the tool provides users with actionable insights about potential security risks before they can cause harm.

## System Architecture

### Frontend

The client-side application is built using modern web technologies optimized for performance and user experience:

- **Vite 7.3.1**: High-performance build tool providing fast development and optimized production builds
- **Vanilla JavaScript**: Lightweight, dependency-free implementation for maximum security and performance
- **TailwindCSS 3.4.19**: Utility-first CSS framework enabling responsive design and consistent theming
- **Lucide SVG Icons**: Custom icon implementation for scalable, theme-aware visual elements
- **Light/Dark Theme System**: Professional dual-theme interface with persistent user preferences

### Backend

The serverless backend provides secure API endpoints with enterprise-grade protection:

- **Vercel Serverless Functions**: Scalable, cost-effective serverless architecture
- **Endpoint**: `/api/scan` - Primary analysis endpoint handling URL scanning requests
- **Rate Limiting**: 5 requests per minute per IP address to prevent abuse and ensure service availability
- **Environment Variable Configuration**: Secure API key management and configuration

### Infrastructure

Production deployment optimized for global performance and reliability:

- **Vercel Deployment**: Global CDN with automatic scaling and zero-downtime deployments
- **Optimized Assets**: Compressed and minified resources for maximum performance
- **DNS Prefetch and Performance Optimization**: Preloading critical resources for reduced latency

## Security Analysis Pipeline

The analyzer performs **14 comprehensive security checks** to identify potential threats:

### 1. HTTPS Encryption Check
Validates SSL/TLS certificate presence and configuration. Unencrypted connections are flagged as higher risk due to potential man-in-the-middle attacks.

### 2. IP Address Detection
Identifies URLs using direct IP addresses instead of domain names, commonly used in phishing to bypass domain-based security measures.

### 3. Risky TLD Detection
Analyzes top-level domains against a database of suspicious TLDs frequently abused by attackers, including country codes and new gTLDs.

### 4. Homograph Attack Detection
Detects Internationalized Domain Name (IDN) spoofing attacks using visually similar Unicode characters to impersonate legitimate domains.

### 5. Brand Impersonation Analysis
Scans for unauthorized use of major brand names (Microsoft, Apple, Google, etc.) commonly exploited in phishing campaigns.

### 6. Suspicious Keyword Detection
Identifies phishing-related keywords (secure, login, verify, account, etc.) frequently used in malicious URLs to create urgency or legitimacy.

### 7. URL Shortener Detection
Flags URLs using URL shortening services, which can mask the final destination and are commonly used in phishing attacks.

### 8. URL Length Analysis
Detects abnormally long URLs, which may indicate obfuscation techniques or payload injection attempts.

### 9. Suspicious Port Detection
Identifies non-standard port numbers that may indicate unauthorized services or bypass attempts.

### 10. File Extension Analysis
Scans for suspicious file extensions (.exe, .zip, .scr, etc.) commonly used to deliver malware.

### 11. Authentication Bypass Pattern Detection
Identifies URL patterns associated with authentication bypass vulnerabilities and session hijacking attempts.

### 12. Domain Reputation Scoring
Calculates reputation scores based on domain age, registration patterns, and historical threat intelligence.

### 13. Redirect Analysis
Analyzes multi-level redirect chains that may obscure the final destination or indicate malicious redirection.

### 14. Subdomain Pattern Analysis
Examines subdomain structures for suspicious patterns commonly used in phishing attacks.

## Risk Scoring System

The analyzer generates a comprehensive risk score based on the weighted results of all security checks:

| Score Range | Risk Level | Description |
|------------|------------|-------------|
| 0–30 | Safe | Low risk indicators, likely legitimate |
| 31–60 | Suspicious | Moderate risk, requires caution |
| 61–100 | Dangerous | High risk indicators, likely malicious |

Each security check contributes to the overall score based on its severity and relevance to modern phishing techniques.

## Output Report Structure

After scanning a URL, users receive a comprehensive security report containing:

### Risk Score
- **Numeric Score**: 0-100 scale indicating overall risk level
- **Risk Classification**: Safe, Suspicious, or Dangerous categorization
- **Visual Indicators**: Color-coded risk assessment for quick identification

### Threat Indicators
- **Security Check Results**: Detailed results for all 14 analysis components
- **Warning Messages**: Specific security concerns and recommendations
- **Pattern Matches**: Identified suspicious patterns and their implications

### Domain Intelligence
- **Registration Information**: Simulated WHOIS data including registration date and registrar
- **Hosting Details**: Hosting provider and geographic location information
- **Security Level**: Overall domain security assessment
- **Country Analysis**: Geographic risk assessment based on hosting location

### Security Warnings
- **Specific Threats**: Detailed explanation of identified threats
- **Recommendations**: Actionable advice for user protection
- **Risk Factors**: Explanation of elements contributing to risk score

## User Interface Features

The application provides a professional, intuitive interface optimized for security analysis:

### Responsive UI
- **Mobile-First Design**: Fully responsive layout supporting all device sizes
- **Touch-Friendly**: Optimized for mobile and tablet interaction
- **Accessibility**: WCAG-compliant design with proper semantic HTML

### Light/Dark Mode
- **Theme Persistence**: User preference saved across sessions
- **System Integration**: Respects operating system theme preferences
- **Smooth Transitions**: Animated theme switching with consistent visual hierarchy

### Loading Indicators
- **Professional Loading States**: Animated indicators during analysis
- **Progress Feedback**: Real-time status updates during scanning process
- **Error Handling**: User-friendly error messages and recovery options

### Real-Time Threat Ticker
- **Live Feed**: Continuous display of recent scan results
- **Threat Intelligence**: Real-time updates on emerging threats
- **Educational Value**: Examples of safe and malicious URLs

### Clickable Results
- **Interactive Reports**: Clickable URLs for further investigation
- **New Tab Opening**: Safe external link handling
- **Export Options**: Results sharing and documentation capabilities

## Performance & Security Features

### Serverless Architecture
- **Scalability**: Automatic scaling based on demand
- **Reliability**: Built-in redundancy and fault tolerance
- **Cost Efficiency**: Pay-per-use pricing model
- **Global Distribution**: Low-latency access worldwide

### Rate Limiting
- **Abuse Prevention**: 5 requests per minute per IP address
- **Service Protection**: Ensures availability for all users
- **Memory Management**: Automatic cleanup of rate limit data
- **Fair Usage**: Balanced resource allocation

### Security Headers
- **Content Security Policy**: Comprehensive XSS and injection protection
- **HSTS**: HTTP Strict Transport Security for encrypted connections
- **Cross-Origin Policies**: COOP, COEP, CORP for enhanced isolation
- **Permissions Policy**: Granular control over browser features

### CSP Protection
- **Default Restrictions**: Whitelist-based resource loading
- **Script Protection**: Prevents unauthorized code execution
- **Style Isolation**: CSS injection prevention
- **Asset Control**: Controlled loading of images, fonts, and media

### Optimized Build System (Vite)
- **Fast Development**: Hot module replacement and instant updates
- **Production Optimization**: Code splitting and tree shaking
- **Asset Compression**: Minified and gzipped resources
- **Bundle Analysis**: Optimized dependency management

## API Reference

### Scan Endpoint

**POST** `/api/scan`

Analyzes a URL for phishing threats and returns a comprehensive security report.

#### Request Body
```json
{
  "url": "https://example.com"
}
```

#### Response
```json
{
  "riskScore": 75,
  "riskLevel": "Dangerous",
  "checks": [
    {
      "name": "HTTPS Encryption",
      "status": "pass",
      "message": "Valid SSL certificate detected"
    },
    {
      "name": "Brand Impersonation",
      "status": "fail",
      "message": "Potential Microsoft impersonation detected"
    }
  ],
  "domainInfo": {
    "domain": "example.com",
    "registrar": "GoDaddy",
    "country": "United States",
    "created": "2020-01-01",
    "securityLevel": "Medium"
  }
}
```

#### Rate Limits
- **5 requests per minute** per IP address
- **Automatic cleanup** of expired rate limit data
- **429 HTTP status** for exceeded limits with retry-after header

## Installation & Deployment

### Local Development
```bash
# Clone repository
git clone https://github.com/cyberedt/phishing-analyzer.git
cd phishing-analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Environment Variables
```env
# API Keys for external services
VIRUSTOTAL_API_KEY=your_virustotal_key
GOOGLE_SAFE_BROWSING_KEY=your_google_key

# Rate limiting configuration
RATE_LIMIT_WINDOW=60000
MAX_REQUESTS_PER_WINDOW=5
```

## Troubleshooting

### Common Issues

#### 1. High Memory Usage
- **Cause**: Rate limiting map not cleaned up properly
- **Solution**: Verify cleanup interval is running correctly
- **Monitoring**: Check Vercel function logs for memory warnings

#### 2. CORS Errors
- **Cause**: Missing or incorrect CORS headers
- **Solution**: Verify API endpoint configuration
- **Testing**: Use browser developer tools to check request headers

#### 3. Build Failures
- **Cause**: Missing dependencies or syntax errors
- **Solution**: Run `npm install` and check for syntax issues
- **Verification**: Test build locally before deployment

### Performance Optimization

#### 1. Bundle Size Reduction
- **Code Splitting**: Implement dynamic imports for large modules
- **Tree Shaking**: Remove unused code and dependencies
- **Asset Optimization**: Compress images and fonts

#### 2. API Response Time
- **Caching**: Implement response caching for repeated requests
- **Connection Pooling**: Reuse HTTP connections for API calls
- **Timeout Handling**: Set appropriate timeouts for external API calls

## Version Information

**CyberEDT Phishing Analyzer**  
Version: 1.0  
Release: 2026  
Platform: CyberEDT Security Suite  
Documentation Version: 1.0  
Last Updated: March 2026  

---

*This documentation is part of the CyberEDT Security Platform and is intended for security professionals, IT administrators, and organizations implementing phishing detection solutions.*

## Licensing & Support

### License
This software is released under the CyberEDT Enterprise License. See LICENSE file for detailed terms and conditions.

### Support
- **Documentation**: Available at docs.cyberedt.com
- **Support Portal**: support.cyberedt.com
- **Security Issues**: security@cyberedt.com
- **Community Forum**: community.cyberedt.com

### Contributing
Contributions are welcome from the cybersecurity community. Please see CONTRIBUTING.md for guidelines on submitting pull requests and reporting issues.

### Changelog
See CHANGELOG.md for detailed version history and update information.
