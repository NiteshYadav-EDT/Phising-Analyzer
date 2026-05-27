const feedItems = [
  { time: '14:21:02', url: 'micr0s0ft-auth.biz', status: 'Dangerous', score: '92', typeClass: 'text-danger' },
  { time: '14:20:55', url: 'secure-bank-login.top', status: 'Dangerous', score: '87', typeClass: 'text-danger' },
  { time: '14:20:12', url: 'google.com', status: 'Safe', score: '2', typeClass: 'text-success' },
  { time: '14:19:48', url: 'aws-console.verify-access.io', status: 'Suspicious', score: '54', typeClass: 'text-warning' },
  { time: '14:19:21', url: 'paypal-security.xyz', status: 'Dangerous', score: '89', typeClass: 'text-danger' },
  { time: '14:18:55', url: 'github.com', status: 'Safe', score: '4', typeClass: 'text-success' },
  { time: '14:18:11', url: 'bit.ly/3x8Kjs', status: 'Suspicious', score: '48', typeClass: 'text-warning' },
  { time: '14:17:30', url: 'office365-update.ru', status: 'Dangerous', score: '96', typeClass: 'text-danger' },
]

export default function Ticker() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 glass-strong">
      <div className="mx-auto flex h-11 max-w-full items-center gap-4 overflow-hidden px-4 sm:px-6">
        
        {/* Status Indicator */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-warning"></span>
            <span className="relative inline-flex size-2 rounded-full bg-warning"></span>
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground">
            Initializing
          </span>
        </div>

        {/* Scrolling Ticker */}
        <div className="relative flex flex-1 overflow-hidden">
          <div className="flex animate-ticker shrink-0 items-center gap-8 whitespace-nowrap pr-8">
            {/* Render items twice for seamless loop */}
            {[...feedItems, ...feedItems].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="font-mono text-muted-foreground">{item.time}</span>
                <span className={`size-1.5 rounded-full bg-current ${item.typeClass}`}></span>
                <span className="font-mono text-foreground">{item.url}</span>
                <span className={`font-mono ${item.typeClass}`}>
                  {item.status} · {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
