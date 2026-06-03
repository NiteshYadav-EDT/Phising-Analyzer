import { useState, useEffect } from 'react'

const scanSteps = [
  'Initializing threat engine v4.2.1...',
  'Resolving DNS records → A, AAAA, MX, TXT',
  'Fetching TLS certificate chain',
  'Querying threat intelligence feeds',
  'Running heuristic vectors [1/14]...',
  'Neural analysis complete',
]

function generateResult(url) {
  const hasHttp = url.startsWith('http')
  const domain = hasHttp ? new URL(url).hostname : url.split('/')[0]
  const tld = domain.substring(domain.lastIndexOf('.'))
  const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(domain)
  const hasSuspiciousKeywords = /(secure|login|verify|account|auth|update|unlock|confirm)/i.test(url)
  const isShortener = /(bit\.ly|tinyurl|t\.co|goo\.gl)/i.test(domain)
  const isKnownPhishing = /(micr0s0ft|paypal-security|verify-access|office365-update)/i.test(domain)
  const riskyTLDs = ['.xyz', '.tk', '.ml', '.ga', '.cf', '.top', '.club', '.ru', '.biz']
  const isRiskyTLD = riskyTLDs.includes(tld)
  const isSafe = ['google.com', 'github.com', 'stackoverflow.com', 'linkedin.com'].some(s => domain.includes(s))

  let score = 0
  const checks = []

  if (isKnownPhishing) {
    score += 70
    checks.push({ id: 'known', name: 'Known Phishing Domain', status: 'danger', message: 'Domain matches known phishing patterns in active threat feeds.' })
  }

  if (isRiskyTLD) {
    score += 20
    checks.push({ id: 'tld', name: 'Top-Level Domain', status: 'warning', message: `TLD "${tld}" is frequently abused in phishing campaigns.` })
  }

  if (isIP) {
    score += 60
    checks.push({ id: 'ip', name: 'Domain Type', status: 'danger', message: 'URL uses a raw IP address, bypassing domain reputation filters.' })
  }

  if (hasSuspiciousKeywords) {
    score += 25
    checks.push({ id: 'keywords', name: 'Suspicious Keywords', status: 'warning', message: 'URL contains phishing-typical keywords (login, verify, secure, etc.).' })
  }

  if (isShortener) {
    score += 25
    checks.push({ id: 'shortener', name: 'URL Shortener', status: 'warning', message: 'Shortened URLs can mask malicious destinations.' })
  }

  if (!hasHttp || !url.startsWith('https')) {
    score += 25
    checks.push({ id: 'ssl', name: 'HTTPS Encryption', status: 'danger', message: 'No valid SSL/TLS encryption detected.' })
  } else {
    checks.push({ id: 'ssl', name: 'HTTPS Encryption', status: 'safe', message: 'Valid TLS certificate chain verified.' })
  }

  if (isSafe) {
    score = Math.min(score, 15)
    checks.push({ id: 'reputation', name: 'Domain Reputation', status: 'safe', message: 'Domain has strong reputation and historical trust signals.' })
  } else {
    score += 15
    checks.push({ id: 'reputation', name: 'Domain Reputation', status: 'warning', message: 'Domain reputation is unverified or recently registered.' })
  }

  if (url.length > 80) {
    score += 10
    checks.push({ id: 'length', name: 'URL Length', status: 'warning', message: 'URL is unusually long, suggesting possible obfuscation.' })
  }

  const subdomains = domain.split('.').length
  if (subdomains > 3) {
    score += 10
    checks.push({ id: 'subdomain', name: 'Subdomain Analysis', status: 'warning', message: `Excessive subdomain depth (${subdomains} levels).` })
  }

  const suspiciousExtensions = ['.exe', '.zip', '.scr', '.js', '.php']
  const hasSuspiciousExt = suspiciousExtensions.some(ext => url.toLowerCase().includes(ext))
  if (hasSuspiciousExt) {
    score += 40
    checks.push({ id: 'extension', name: 'File Extension', status: 'danger', message: 'URL references a potentially dangerous file type.' })
  }

  score = Math.min(score, 100)
  const level = score >= 70 ? 'High Risk' : score >= 40 ? 'Suspicious' : 'Safe'

  return {
    url,
    domain,
    riskScore: score,
    riskLevel: level,
    checks,
    timestamp: new Date().toLocaleTimeString(),
  }
}

export function useScanner() {
  const [url, setUrl] = useState('https://auth-security-verify.micr0s0ft.net/login/confirm?id=9421')
  const [scanning, setScanning] = useState(false)
  const [scanStep, setScanStep] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [recentScans, setRecentScans] = useState([])

  // Handle fake scan progress animation
  useEffect(() => {
    if (!scanning) return
    if (scanStep >= scanSteps.length) return

    // Add staggered timing for realism
    const timeToWait = scanSteps[scanStep].includes('...') ? 600 : 400
    const timer = setTimeout(() => setScanStep(s => s + 1), timeToWait)
    return () => clearTimeout(timer)
  }, [scanning, scanStep])

  const startScan = async (inputUrl) => {
    const target = inputUrl || url
    if (!target.trim()) {
      setError('Please enter a URL to scan')
      return
    }
    
    // Add http:// if missing just for internal parsing safety
    const formatTarget = target.startsWith('http') ? target : `http://${target}`

    try {
      new URL(formatTarget)
    } catch (e) {
      setError('Please enter a valid URL')
      return
    }

    if (inputUrl) setUrl(inputUrl)
    setError('')
    setResult(null)
    setScanStep(0)
    setScanning(true)

    // Simulate network delay
    await new Promise(r => setTimeout(r, 2800))
    
    const res = generateResult(target)
    setResult(res)
    setScanning(false)
    setScanStep(0)

    setRecentScans(prev => {
      // Avoid duplicate recent scans at the top
      if (prev.length > 0 && prev[0].url === res.url) return prev
      const updated = [{ 
        url: res.url, 
        domain: res.domain, 
        score: res.riskScore, 
        level: res.riskLevel, 
        time: res.timestamp 
      }, ...prev]
      return updated.slice(0, 10) // Keep last 10
    })
  }

  const resetScanner = () => {
    setResult(null)
    setUrl('')
    setError('')
  }

  return {
    url,
    setUrl,
    scanning,
    scanStep,
    scanSteps,
    result,
    error,
    recentScans,
    startScan,
    resetScanner
  }
}
