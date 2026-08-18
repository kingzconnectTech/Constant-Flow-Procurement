import DarkHeader from './components/DarkHeader'
import PageSplash from './components/PageSplash'
import GlassmorphismTrustHero from './components/ui/glassmorphism-trust-hero'
import './App.css'

function App() {
  return (
    <>
      <PageSplash />
      <div className="app-shell">
        <DarkHeader />
        <GlassmorphismTrustHero />
      </div>
    </>
  )
}

export default App
