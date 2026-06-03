import { motion } from 'framer-motion'

const threats = [
  { time: '14:21:02', domain: 'micr0s0ft-auth.biz', status: 'danger', score: 92 },
  { time: '14:20:55', domain: 'secure-bank-login.top', status: 'danger', score: 87 },
  { time: '14:20:12', domain: 'google.com', status: 'safe', score: 2 },
  { time: '14:19:48', domain: 'aws-console.verify-access.io', status: 'warning', score: 54 },
  { time: '14:19:21', domain: 'paypal-security.xyz', status: 'danger', score: 89 },
  { time: '14:18:55', domain: 'github.com', status: 'safe', score: 4 },
  { time: '14:18:11', domain: 'bit.ly/3x8KjsS', status: 'warning', score: 48 },
  { time: '14:17:30', domain: 'office365-update.ru', status: 'danger', score: 96 },
]

function ThreatItem({ threat, index }) {
  const statusColors = {
    danger: 'text-cyber-red',
    warning: 'text-cyber-yellow',
    safe: 'text-cyber-green',
  }

  const statusLabels = {
    danger: 'Dangerous',
    warning: 'Suspicious',
    safe: 'Safe',
  }

  return (
    <motion.span
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="ticker-item inline-flex items-center gap-3 px-6 text-xs font-mono"
    >
      <span className="text-cyber-muted">{threat.time}</span>
      <span className="text-cyber-text/80">{threat.domain}</span>
      <span className={`${statusColors[threat.status]} font-semibold`}>
        {statusLabels[threat.status]}
      </span>
      <span className={`${statusColors[threat.status]}`}>· {threat.score}</span>
    </motion.span>
  )
}

export default function LiveFeed() {
  const doubleThreats = [...threats, ...threats]

  return (
    <div className="fixed top-16 lg:top-20 left-0 right-0 z-40 overflow-hidden border-b border-cyber-border/30 bg-cyber-black/60 backdrop-blur-sm">
      <div className="flex whitespace-nowrap py-2">
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          {doubleThreats.map((threat, i) => (
            <ThreatItem key={i} threat={threat} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
