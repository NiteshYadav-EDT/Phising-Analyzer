import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal as TerminalIcon } from 'lucide-react'

const initialLines = [
  { text: 'ThreatSpy Intelligence Platform — SOC Terminal v4.2.1', type: 'header' },
  { text: 'Copyright © 2026 CyberEDT. All rights reserved.', type: 'muted' },
  { text: 'Type "help" for available commands.', type: 'muted' },
  { text: '', type: 'spacer' },
]

const commands = {
  help: [
    { text: 'Available commands:', type: 'header' },
    { text: '  help        — Show this help message', type: 'text' },
    { text: '  status      — Show system status', type: 'text' },
    { text: '  threats     — List active threat campaigns', type: 'text' },
    { text: '  scan <url>  — Scan a URL', type: 'text' },
    { text: '  clear       — Clear terminal', type: 'text' },
    { text: '', type: 'spacer' },
  ],
  status: [
    { text: 'SYSTEM STATUS — All systems nominal', type: 'header' },
    { text: '  Engine:        ThreatSpy v4.2.1 (running)', type: 'text' },
    { text: '  Uptime:        14d 7h 32m', type: 'text' },
    { text: '  Threats/24h:   2,847', type: 'text' },
    { text: '  Detection:     99.7%', type: 'text' },
    { text: '  Latency:       14ms avg', type: 'text' },
    { text: '', type: 'spacer' },
  ],
  threats: [
    { text: 'ACTIVE THREAT CAMPAIGNS', type: 'header' },
    { text: '  ┌────────────────────────────────────────────────────────┐', type: 'muted' },
    { text: '  │ CRITICAL: Microsoft 365 credential harvest (active)    │', type: 'danger' },
    { text: '  │ HIGH:     PayPal invoice scam (active)                │', type: 'warning' },
    { text: '  │ HIGH:     AWS console phishing (active)               │', type: 'warning' },
    { text: '  │ MEDIUM:   Crypto wallet drainer (monitoring)          │', type: 'muted' },
    { text: '  │ MEDIUM:   Tax refund lure (monitoring)                │', type: 'muted' },
    { text: '  └────────────────────────────────────────────────────────┘', type: 'muted' },
    { text: '', type: 'spacer' },
  ],
}

export default function Terminal() {
  const [lines, setLines] = useState(initialLines)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const terminalRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    setHistory((prev) => [...prev, trimmed])
    setHistoryIdx(-1)

    const newLines = [
      { text: `$ ${cmd}`, type: 'input' },
    ]

    if (trimmed === 'clear') {
      setLines([])
      return
    }

    if (trimmed.startsWith('scan ')) {
      const url = cmd.slice(5).trim()
      newLines.push({ text: `Initiating scan of ${url}...`, type: 'text' })
      newLines.push({ text: 'Scan complete — threat level: PENDING', type: 'warning' })
    } else if (trimmed === 'help') {
      newLines.push(...commands.help)
    } else if (trimmed === 'status') {
      newLines.push(...commands.status)
    } else if (trimmed === 'threats') {
      newLines.push(...commands.threats)
    } else {
      newLines.push({ text: `Command not found: "${cmd}". Type "help" for available commands.`, type: 'error' })
    }

    setLines((prev) => [...prev, ...newLines])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    processCommand(input)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1)
        setHistoryIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx !== -1) {
        const idx = historyIdx + 1
        if (idx >= history.length) {
          setHistoryIdx(-1)
          setInput('')
        } else {
          setHistoryIdx(idx)
          setInput(history[idx])
        }
      }
    }
  }

  return (
    <section id="terminal" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-white">SOC </span>
            <span className="text-gradient">Terminal</span>
          </h2>
          <p className="text-sm text-cyber-muted mt-3 max-w-xl mx-auto">
            Interactive command interface for advanced threat operations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-cyber-black/40 border-b border-cyber-border/30">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-cyber-blue" />
              <span className="text-xs font-mono text-cyber-muted">threatspy-terminal — x86_64</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-red/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-yellow/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/60" />
            </div>
          </div>

          <div
            ref={terminalRef}
            className="p-4 sm:p-5 font-mono text-xs leading-relaxed max-h-[400px] overflow-y-auto space-y-0.5"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => {
              const base = 'whitespace-pre-wrap break-all'
              if (line.type === 'header') return <div key={i} className={`${base} text-cyber-blue font-semibold`}>{line.text}</div>
              if (line.type === 'muted') return <div key={i} className={`${base} text-cyber-muted/50`}>{line.text}</div>
              if (line.type === 'danger') return <div key={i} className={`${base} text-cyber-red`}>{line.text}</div>
              if (line.type === 'warning') return <div key={i} className={`${base} text-cyber-yellow`}>{line.text}</div>
              if (line.type === 'error') return <div key={i} className={`${base} text-cyber-red`}>{line.text}</div>
              if (line.type === 'input') return <div key={i} className={`${base} text-cyber-green`}>{line.text}</div>
              if (line.type === 'spacer') return <div key={i} className="h-2" />
              return <div key={i} className={`${base} text-cyber-text/70`}>{line.text}</div>
            })}

            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
              <span className="text-cyber-green shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-cyber-text/90 font-mono text-xs placeholder-cyber-muted/30"
                placeholder="Type help..."
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
