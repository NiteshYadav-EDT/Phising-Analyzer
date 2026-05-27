import { motion } from 'framer-motion'
import { Globe, AlertTriangle, Search, Link2, Shield, Fingerprint, Radio, Zap, ArrowRight } from 'lucide-react'

const intelCategories = [
  {
    icon: AlertTriangle,
    title: 'Known Phishing Domains',
    description: 'Real-time malicious domain database',
    color: 'text-cyber-red',
    bg: 'bg-cyber-red/10',
    border: 'border-cyber-red/20',
    examples: ['paypal-verification-secure.com', 'google-account-security-update.net', 'apple-id-confirmation-login.org'],
    update: 'Updated every 5 minutes',
  },
  {
    icon: Search,
    title: 'Suspicious Keywords',
    description: 'Urgency & legitimacy indicators',
    color: 'text-cyber-yellow',
    bg: 'bg-cyber-yellow/10',
    border: 'border-cyber-yellow/20',
    tags: ['login', 'secure', 'verify', 'account', 'banking', 'urgent'],
    update: '+5–35 risk points',
  },
  {
    icon: Globe,
    title: 'Risky TLDs',
    description: 'Abused top-level domains',
    color: 'text-cyber-orange',
    bg: 'bg-cyber-yellow/10',
    border: 'border-cyber-yellow/20',
    tlds: [
      { tld: '.tk', risk: 'Critical' },
      { tld: '.ml', risk: 'Critical' },
      { tld: '.zip', risk: 'High' },
      { tld: '.xyz', risk: 'High' },
      { tld: '.top', risk: 'High' },
      { tld: '.ru', risk: 'High' },
    ],
    update: '25+ monitored TLDs',
  },
  {
    icon: Link2,
    title: 'URL Shorteners',
    description: 'Redirect service detection',
    color: 'text-cyber-blue',
    bg: 'bg-cyber-blue/10',
    border: 'border-cyber-blue/20',
    services: ['bit.ly', 'tinyurl.com', 't.co', 'ow.ly', 'is.gd'],
    update: 'Chain analysis enabled',
  },
  {
    icon: Shield,
    title: 'Brand Protection',
    description: 'Impersonation detection',
    color: 'text-cyber-purple',
    bg: 'bg-cyber-purple/10',
    border: 'border-cyber-purple/20',
    brands: ['Technology', 'Financial'],
    brandExamples: ['Google, Microsoft, Apple', 'PayPal, Chase, Bank of America'],
    update: '30+ protected brands',
  },
  {
    icon: Fingerprint,
    title: 'Advanced Threats',
    description: 'Homograph & redirect attacks',
    color: 'text-cyber-green',
    bg: 'bg-cyber-green/10',
    border: 'border-cyber-green/20',
    threats: ['Homograph', 'Redirects'],
    threatExamples: ['аррӏе.com → apple.com', 'Multi-stage chain analysis'],
    update: 'Unicode detection active',
  },
]

function IntelCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`card-cyber border ${category.border} hover:${category.border.replace('/20', '/40')}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className={`p-3 rounded-xl ${category.bg}`}>
          <category.icon className={`w-5 h-5 ${category.color}`} />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-white">{category.title}</h3>
          <p className="text-xs text-cyber-muted mt-0.5">{category.description}</p>
        </div>
      </div>

      {category.examples && (
        <div className="space-y-1.5 mb-3">
          {category.examples.map((ex, i) => (
            <div key={i} className="bg-cyber-black/40 rounded-lg px-3 py-2 font-mono text-[10px] sm:text-xs text-cyber-text/70 truncate">
              {ex}
            </div>
          ))}
        </div>
      )}

      {category.tags && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {category.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded bg-cyber-black/40 text-[10px] sm:text-xs font-mono text-cyber-text/60">
              {tag}
            </span>
          ))}
        </div>
      )}

      {category.tlds && (
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {category.tlds.map((item) => (
            <div key={item.tld} className="bg-cyber-black/40 rounded-lg px-2 py-2 text-center">
              <div className={`text-xs font-mono font-bold ${item.risk === 'Critical' ? 'text-cyber-red' : 'text-cyber-yellow'}`}>
                {item.tld}
              </div>
              <div className="text-[10px] text-cyber-muted/60">{item.risk}</div>
            </div>
          ))}
        </div>
      )}

      {category.services && (
        <div className="space-y-1.5 mb-3">
          {category.services.map((svc) => (
            <div key={svc} className="flex items-center gap-2 bg-cyber-black/40 rounded-lg px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
              <span className="font-mono text-xs text-cyber-text/70">{svc}</span>
            </div>
          ))}
        </div>
      )}

      {category.brands && (
        <div className="space-y-1.5 mb-3">
          {category.brands.map((brand, i) => (
            <div key={brand} className="bg-cyber-black/40 rounded-lg px-3 py-2">
              <div className="text-[10px] font-semibold text-cyber-muted mb-0.5">{brand}</div>
              <div className="font-mono text-[10px] sm:text-xs text-cyber-text/60">{category.brandExamples[i]}</div>
            </div>
          ))}
        </div>
      )}

      {category.threats && (
        <div className="space-y-1.5 mb-3">
          {category.threats.map((threat, i) => (
            <div key={threat} className="bg-cyber-black/40 rounded-lg px-3 py-2">
              <div className="text-[10px] font-semibold text-cyber-muted mb-0.5">{threat}</div>
              <div className="font-mono text-[10px] sm:text-xs text-cyber-text/60">{category.threatExamples[i]}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono" style={{ color: category.color.replace('text-', '') }}>
        <Radio className="w-3 h-3" />
        {category.update}
      </div>
    </motion.div>
  )
}

export default function ThreatIntel() {
  return (
    <section id="threat-intel" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-white">Threat Intelligence </span>
            <span className="text-gradient">Engine</span>
          </h2>
          <p className="text-sm text-cyber-muted mt-3 max-w-2xl mx-auto">
            Advanced detection combining curated datasets with real-time pattern analysis
            to identify phishing URLs and malicious domains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {intelCategories.map((category, i) => (
            <IntelCard key={category.title} category={category} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 glass p-6 sm:p-8 bg-gradient-to-r from-cyber-blue/5 via-cyber-purple/5 to-cyber-blue/5 border-cyber-blue/20"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-cyber-blue" />
              <div>
                <h3 className="font-bold text-lg text-white">Real-Time Intelligence Updates</h3>
                <p className="text-xs text-cyber-muted mt-1">Automated feeds · Machine learning · Expert curation</p>
              </div>
            </div>
            <a href="docs.html" className="btn-cyber-primary px-6 py-2.5 text-xs whitespace-nowrap flex items-center gap-2">
              Explore Documentation
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
