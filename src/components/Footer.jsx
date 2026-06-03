import { Shield, Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        
        {/* Brand Section */}
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--cyber)] to-[var(--cyber-glow)] glow-cyber">
              <Shield className="size-3.5 text-primary-foreground" strokeWidth={2.8} />
            </div>
            <span className="text-sm font-bold">CyberEDT</span>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Enterprise threat intelligence and forensic URL analysis for modern SOC teams.
          </p>
        </div>

        {/* Links: Platform */}
        <div>
          <h4 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground">Analyzer</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground">Threat Feed</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground">API</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground">Status</a></li>
          </ul>
        </div>

        {/* Links: Company */}
        <div>
          <h4 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground">Security</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span className="font-mono">© {new Date().getFullYear()} CyberEDT · All systems nominal</span>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="GitHub" className="hover:text-foreground transition-colors">
              <Github className="size-4" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors">
              <Twitter className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
