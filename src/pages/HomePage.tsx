import DarkHeader from '../components/DarkHeader'
import PageSplash from '../components/PageSplash'
import GlassmorphismTrustHero from '../components/ui/glassmorphism-trust-hero'
import ServicesCategories from '../components/ui/ServicesCategories'
import ProcurementFeatureGrid from '../components/ui/ProcurementFeatureGrid'
import ProcurementProcessSteps from '../components/ui/ProcurementProcessSteps'
import GlobalPresence from '../components/ui/globe-feature-section'
import AboutConstantflow from '../components/ui/AboutConstantflow'
import Newsletter from '../components/ui/Newsletter'
import Footer from '../components/ui/Footer'

export default function HomePage() {
  return (
    <>
      <PageSplash />
      <div className="app-shell">
        <DarkHeader />
        <GlassmorphismTrustHero />
        <ServicesCategories />
        <ProcurementFeatureGrid />
        <ProcurementProcessSteps />
        <GlobalPresence />
        <AboutConstantflow />
        <Newsletter />
        <Footer />
      </div>
    </>
  )
}
