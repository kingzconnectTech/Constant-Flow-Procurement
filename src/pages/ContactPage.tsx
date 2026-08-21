import DarkHeader from '../components/DarkHeader'
import ContactUs from '../components/ui/ContactUs'
import Footer from '../components/ui/Footer'

export default function ContactPage() {
  return (
    <div className="app-shell">
      <DarkHeader />
      <main>
        <ContactUs />
      </main>
      <Footer />
    </div>
  )
}
