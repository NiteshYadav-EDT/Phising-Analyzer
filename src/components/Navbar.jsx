import { Shield, ChevronDown } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass-strong">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--cyber)] to-[var(--cyber-glow)] glow-cyber">
            <Shield className="size-4 text-primary-foreground" strokeWidth={2.8} />
            <span className="absolute -inset-1 rounded-xl bg-[var(--cyber)]/30 blur-md -z-10"></span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">CyberEDT</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Threat Intelligence</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <a href="#" className="relative rounded-md px-3 py-1.5 text-sm transition-colors text-foreground">
            <span className="absolute inset-0 rounded-md bg-[var(--cyber)]/10 ring-1 ring-[var(--cyber)]/30"></span>
            <span className="relative">Analyzer</span>
          </a>
          <a href="#" className="relative rounded-md px-3 py-1.5 text-sm transition-colors text-muted-foreground hover:text-foreground">
            <span className="relative">Threat Intel</span>
          </a>
          <a href="#" className="relative rounded-md px-3 py-1.5 text-sm transition-colors text-muted-foreground hover:text-foreground">
            <span className="relative">Dashboard</span>
          </a>
          <a href="#" className="relative rounded-md px-3 py-1.5 text-sm transition-colors text-muted-foreground hover:text-foreground">
            <span className="relative">API</span>
          </a>
          <a href="#" className="relative rounded-md px-3 py-1.5 text-sm transition-colors text-muted-foreground hover:text-foreground">
            <span className="relative">Docs</span>
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden h-9 items-center gap-2 rounded-lg border border-[var(--cyber)]/30 bg-[var(--cyber)]/5 px-3 sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-success"></span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-success">SOC Online</span>
          </div>
          <button className="hidden rounded-lg bg-gradient-to-r from-[var(--cyber)] to-[var(--cyber-glow)] px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 sm:inline-flex">
            Launch Console
          </button>
          <button className="rounded-md border border-border bg-surface p-2 lg:hidden">
            <ChevronDown className="size-4 transition-transform" />
          </button>
        </div>

      </div>
    </header>
  )
}
