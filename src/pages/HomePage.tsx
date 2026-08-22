import DarkHeader from '../components/DarkHeader'
import PageSplash from '../components/PageSplash'
import GlassmorphismTrustHero from '../components/ui/glassmorphism-trust-hero'
import ServicesCategories from '../components/ui/ServicesCategories'
import ProcurementFeatureGrid from '../components/ui/ProcurementFeatureGrid'
import ProcurementProcessSteps from '../components/ui/ProcurementProcessSteps'
import GlobalPresence from '../components/ui/globe-feature-section'
import AboutConstantflow from '../components/ui/AboutConstantflow'
import ContactUs from '../components/ui/ContactUs'
import Newsletter from '../components/ui/Newsletter'
import Footer from '../components/ui/Footer'
import { useSEO } from '../hooks/useSEO'

export default function HomePage() {
  useSEO({
    title: 'Constantflow Procurement | Industrial Equipment & Procurement Services Nigeria',
    description:
      'Constantflow Procurement sources and supplies critical industrial equipment across Nigeria and West Africa — valves, pumps, compressors, piping, instrumentation, heavy machinery, and oil & gas process packages. Request a quote today.',
    canonical: 'https://constantflow-procurement.com/',
    ogTitle: 'Constantflow Procurement | Industrial Equipment Nigeria',
    ogDescription:
      "Nigeria's trusted procurement partner for oil & gas, heavy machinery, valves, pumps, piping, instrumentation, and process packages. Global sourcing, competitive pricing.",
  })

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
        <ContactUs />
        <Newsletter />
        <Footer />
      </div>
    </>
  )
}
