import { useEffect, useState } from 'react'
import './DarkHeader.css'
import logoSrc from '../assets/logo.png'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'About Us', href: '#about' },
] as const

function DarkHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`dh-wrapper ${scrolled ? 'dh-scrolled' : ''}`}
      role="banner"
    >
      <div className="dh-inner">
        <a href="#home" className="dh-logo" aria-label="Constantflow Procurement home">
          <span className="dh-logo-mark" aria-hidden="true">
            <img
              className="dh-logo-image"
              src={logoSrc}
              alt=""
              aria-hidden="true"
            />
          </span>
          <span className="dh-logo-text">
            <span className="dh-logo-brand">Constant-flow</span>
            <span className="dh-logo-sub">Procurement</span>
          </span>
        </a>

        <button
          type="button"
          className={`dh-burger ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="dh-mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="dh-burger-line" aria-hidden="true" />
          <span className="dh-burger-line" aria-hidden="true" />
          <span className="dh-burger-line" aria-hidden="true" />
        </button>

        <nav className="dh-nav" aria-label="Primary">
          <ul className="dh-nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="dh-nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="dh-cta-wrap">
          <a href="#request-rfq" className="dh-cta-btn">
            Request an RFQ
          </a>
        </div>
      </div>

      <div
        id="dh-mobile-menu"
        className={`dh-mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul className="dh-mobile-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="dh-mobile-link" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="dh-mobile-cta">
            <a
              href="#request-rfq"
              className="dh-cta-btn dh-cta-btn--block"
              onClick={() => setMenuOpen(false)}
            >
              Request an RFQ
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default DarkHeader
