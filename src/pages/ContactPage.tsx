import DarkHeader from '../components/DarkHeader'
import ContactUs from '../components/ui/ContactUs'
import Footer from '../components/ui/Footer'
import { useSEO } from '../hooks/useSEO'

export default function ContactPage() {
  useSEO({
    title: 'Contact Constantflow Procurement | Get an Industrial Equipment Quote — Global',
    description:
      'Contact Constantflow Procurement for industrial equipment inquiries, RFQ submissions, and procurement support. Email: Mgt@constantflow-procurement.com | Phone: 08108386859. Serving clients globally.',
    canonical: 'https://constantflow-procurement.com/contact',
    ogTitle: 'Contact Constantflow Procurement | Global Industrial Equipment Quote',
    ogDescription:
      'Reach Constantflow Procurement for valves, pumps, piping, instrumentation, and heavy machinery inquiries. Fast response, competitive quotes worldwide.',
  })

  return (
    <div className="app-shell">
      <DarkHeader />
      <main>
        <ContactUs showBanner={true} />
      </main>
      <Footer />
    </div>
  )
}
