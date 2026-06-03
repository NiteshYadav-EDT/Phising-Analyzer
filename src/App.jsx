import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Ticker from './components/Ticker'

export default function App() {
  return (
    <div className="min-h-screen pb-20 font-sans text-foreground selection:bg-[var(--cyber)]/30 selection:text-foreground">
      <Navbar />
      <Hero />
      <Dashboard />
      <Footer />
      <Ticker />
    </div>
  )
}
