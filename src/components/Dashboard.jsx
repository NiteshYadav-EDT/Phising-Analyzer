import { motion } from 'framer-motion'
import { Shield, Globe, Bug, TrendingUp } from 'lucide-react'

const stats = [
  { 
    value: '2.4M', 
    label: 'Threats Blocked', 
    change: '+12.4%', 
    changeType: 'text-success', 
    icon: Shield, 
    colorVar: 'var(--cyber)' 
  },
  { 
    value: '184K', 
    label: 'Domains Scanned', 
    change: '+8.1%', 
    changeType: 'text-success', 
    icon: Globe, 
    colorVar: 'var(--cyber-glow)' 
  },
  { 
    value: '342', 
    label: 'Active Campaigns', 
    change: '−3.7%', 
    changeType: 'text-danger', 
    icon: Bug, 
    colorVar: 'var(--danger)' 
  },
  { 
    value: '99.7%', 
    label: 'Detection Rate', 
    change: '+0.2%', 
    changeType: 'text-success', 
    icon: TrendingUp, 
    colorVar: 'var(--success)' 
  },
]

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
      <section className="mb-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-xl glass p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--cyber)]/30"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div 
                    className="flex size-8 items-center justify-center rounded-lg"
                    style={{
                      background: `color-mix(in oklab, ${stat.colorVar} 14%, transparent)`,
                      color: stat.colorVar
                    }}
                  >
                    <Icon className="size-4" />
                  </div>
                  <span className={`font-mono text-[10px] ${stat.changeType}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="font-mono text-2xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
                {/* Hover Glow Line */}
                <div className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--cyber)]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </motion.div>
            )
          })}

        </div>
      </section>
    </main>
  )
}
