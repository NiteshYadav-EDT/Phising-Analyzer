import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Link2, AlertTriangle, ShieldCheck, AlertCircle, Loader2, Terminal as TerminalIcon, Copy, RotateCcw } from 'lucide-react'

const quickTests = [
  'auth-security-verify.micr0s0ft.net',
  'login.google.com',
  'paypal-security-check.top/account/unlock',
  'github.com/lovable/lovable',
]

function generateMockResult(url) {
  const hasHttp = url.startsWith('http')
  const domain = hasHttp ? new URL(url).hostname : url.split('/')[0]
  const tld = domain.substring(domain.lastIndexOf('.'))
  const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(domain)
  const hasSuspiciousKeywords = /(secure|login|verify|account|auth|update|unlock)/i.test(url)
  const isShortener = /(bit\.ly|tinyurl|t\.co|goo\.gl)/i.test(domain)
  const isKnownPhishing = /(micr0s0ft|paypal-security|verify-access|office365-update)/i.test(domain)
  const riskyTLDs = ['.xyz', '.tk', '.ml', '.ga', '.cf', '.top', '.club', '.ru']
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
    checks.push({ id: 'keywords', name: 'Suspicious Keywords', status: 'warning', message: 'URL contains phishing-typical keywords (login, verify, secure...).' })
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
    checks.push({ id: 'length', name: 'URL Length', status: 'warning', message: 'URL is unusually long, possible obfuscation.' })
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
    domain: domain,
    riskScore: score,
    riskLevel: level,
    checks,
    timestamp: new Date().toLocaleTimeString(),
  }
}

const scanSteps = [
  'Initializing threat engine v4.2.1...',
  'Resolving DNS records → A, AAAA, MX, TXT',
  'Fetching TLS certificate chain',
  'Querying threat intelligence feeds',
  'Running heuristic vectors [1/14]...',
  'Neural analysis complete',
]

export default function Scanner() {
  const [url, setUrl] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanStep, setScanStep] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [recentScans, setRecentScans] = useState([])
  const scanLineRef = useRef(null)

  useEffect(() => {
    if (!scanning) return
    if (scanStep >= scanSteps.length) return

    const timer = setTimeout(() => setScanStep(s => s + 1), scanSteps[scanStep].includes('...') ? 600 : 400)
    return () => clearTimeout(timer)
  }, [scanning, scanStep])

  const startScan = async (inputUrl) => {
    const target = inputUrl || url
    if (!target.trim()) {
      setError('Please enter a URL to scan')
      return
    }
    setError('')
    setResult(null)
    setScanStep(0)
    setScanning(true)

    await new Promise(r => setTimeout(r, 2800))
    const res = generateMockResult(target)
    setResult(res)
    setScanning(false)
    setScanStep(0)

    setRecentScans(prev => {
      const updated = [{ domain: res.domain, score: res.riskScore, level: res.riskLevel, time: res.timestamp }, ...prev]
      return updated.slice(0, 10)
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !scanning) startScan()
  }

  const copyReport = () => {
    if (!result) return
    const text = `ThreatSpy Scan Report\nURL: ${result.url}\nRisk Score: ${result.riskScore}/100\nRisk Level: ${result.riskLevel}\nTimestamp: ${result.timestamp}\n\nGenerated by ThreatSpy Intelligence Platform`
    navigator.clipboard.writeText(text)
  }

  const levelColors = {
    'High Risk': 'text-cyber-red',
    'Suspicious': 'text-cyber-yellow',
    'Safe': 'text-cyber-green',
  }

  const borderColors = {
    'High Risk': 'border-cyber-red/50',
    'Suspicious': 'border-cyber-yellow/50',
    'Safe': 'border-cyber-green/50',
  }

  const glowColors = {
    'High Risk': 'shadow-glow-red',
    'Suspicious': 'shadow-[0_0_20px_rgba(255,189,46,0.2)]',
    'Safe': 'shadow-glow-green',
  }

  const statusIcons = {
    danger: AlertTriangle,
    warning: AlertCircle,
    safe: ShieldCheck,
  }

  return (
    <section id="analyzer" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-white">Threat </span>
            <span className="text-gradient">Scanner</span>
          </h2>
          <p className="text-sm text-cyber-muted mt-3 max-w-xl mx-auto">
            Submit a URL for real-time forensic analysis across 14 detection vectors
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass p-1.5 sm:p-2 rounded-2xl relative overflow-hidden">
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 sm:p-3">
              <div className="flex-1 relative">
                <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted/60" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter domain or URL (e.g., suspicious-login.xyz)"
                  className="input-cyber pl-10 pr-4 py-3.5 text-sm"
                  disabled={scanning}
                />
              </div>
              <button
                onClick={() => startScan()}
                disabled={scanning}
                className="btn-cyber-primary px-6 py-3.5 text-xs whitespace-nowrap w-full sm:w-auto flex items-center justify-center gap-2"
              >
                {scanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Scanning
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Analyze URL
                  </>
                )}
              </button>
            </div>

            {scanning && (
              <div className="px-4 sm:px-5 pb-4">
                <div className="glow-line mb-3" />
                <div className="space-y-1.5">
                  {scanSteps.slice(0, scanStep + 1).map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      {scanStep === i && scanStep < scanSteps.length - 1 ? (
                        <Loader2 className="w-3 h-3 text-cyber-blue animate-spin shrink-0" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-cyber-green shrink-0" />
                      )}
                      <span className={`text-xs font-mono ${scanStep === i && scanStep < scanSteps.length - 1 ? 'text-cyber-blue' : 'text-cyber-muted'}`}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-cyber-red text-xs font-mono mt-2 text-center"
            >
              {error}
            </motion.p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-[10px] sm:text-xs text-cyber-muted font-mono">Quick test:</span>
            {quickTests.map((test) => (
              <button
                key={test}
                onClick={() => { setUrl(test); setError('') }}
                disabled={scanning}
                className="px-2.5 py-1 text-[10px] sm:text-xs font-mono text-cyber-muted/70 hover:text-cyber-blue bg-cyber-card/50 hover:bg-cyber-blue/10 rounded-md border border-cyber-border/30 hover:border-cyber-blue/30 transition-all truncate max-w-[180px] sm:max-w-none"
              >
                {test}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.url}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-4xl mx-auto mt-10 sm:mt-12"
            >
              <div className={`glass p-6 sm:p-8 border-l-4 ${borderColors[result.riskLevel]} ${glowColors[result.riskLevel]}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white">Scan Complete</h3>
                      <span className="text-[10px] text-cyber-muted font-mono">{result.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-cyber-muted font-mono truncate">{result.url}</p>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className={`text-3xl sm:text-4xl font-black tracking-tight ${levelColors[result.riskLevel]}`}>
                        {result.riskScore}
                      </div>
                      <div className="text-[10px] text-cyber-muted uppercase tracking-wider mt-0.5">Risk Score</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg sm:text-xl font-bold ${levelColors[result.riskLevel]}`}>
                        {result.riskLevel}
                      </div>
                      <div className="text-[10px] text-cyber-muted uppercase tracking-wider mt-0.5">Verdict</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                {result.checks.map((check) => {
                  const Icon = statusIcons[check.status] || ShieldCheck
                  const colorClasses = {
                    danger: 'border-cyber-red/30 bg-cyber-red/5',
                    warning: 'border-cyber-yellow/30 bg-cyber-yellow/5',
                    safe: 'border-cyber-green/30 bg-cyber-green/5',
                  }
                  const iconColors = {
                    danger: 'text-cyber-red',
                    warning: 'text-cyber-yellow',
                    safe: 'text-cyber-green',
                  }

                  return (
                    <motion.div
                      key={check.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                      className={`rounded-xl border p-4 sm:p-5 ${colorClasses[check.status]} hover:bg-opacity-80 transition-colors`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Icon className={`w-5 h-5 ${iconColors[check.status]}`} />
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${iconColors[check.status]} border-current/30`}>
                          {check.status === 'safe' ? 'PASS' : 'RISK'}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-white mb-1.5">{check.name}</h4>
                      <p className="text-xs text-cyber-muted/80 leading-relaxed">{check.message}</p>
                    </motion.div>
                  )
                })}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button onClick={() => { setResult(null); setUrl('') }} className="btn-cyber px-5 py-2.5 text-xs flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" />
                  New Scan
                </button>
                <button onClick={copyReport} className="btn-cyber px-5 py-2.5 text-xs flex items-center gap-1.5">
                  <Copy className="w-3.5 h-3.5" />
                  Copy Report
                </button>
                <a href="#terminal" className="btn-cyber px-5 py-2.5 text-xs flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5" />
                  View Logs
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {recentScans.length > 0 && !result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto mt-10"
          >
            <div className="text-xs text-cyber-muted font-mono mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              Recent Scans
            </div>
            <div className="glass divide-y divide-cyber-border/30">
              {recentScans.map((scan, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 text-xs font-mono hover:bg-cyber-blue/5 transition-colors">
                  <span className="text-cyber-muted/60 w-16 shrink-0">{scan.time}</span>
                  <span className="flex-1 truncate px-2 text-cyber-text/80">{scan.domain}</span>
                  <span className={`font-semibold ${levelColors[scan.level]} shrink-0`}>
                    {scan.level} · {scan.score}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
