import DarkHeader from './components/DarkHeader'
import PageSplash from './components/PageSplash'
import GlassmorphismTrustHero from './components/ui/glassmorphism-trust-hero'
import ServicesCategories from './components/ui/ServicesCategories'
import ProcurementFeatureGrid from './components/ui/ProcurementFeatureGrid'
import ProcurementProcessSteps from './components/ui/ProcurementProcessSteps'
import './App.css'

function App() {
  return (
    <>
      <PageSplash />
      <div className="app-shell">
        <DarkHeader />
        <GlassmorphismTrustHero />
        <ServicesCategories />
        <ProcurementFeatureGrid />
        <ProcurementProcessSteps />
      </div>
    </>
  )
}

export default App
