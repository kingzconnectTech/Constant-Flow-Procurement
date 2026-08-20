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

  useEffect(() => {
    if (!menuOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
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
      </header>

      <div
        id="dh-mobile-menu"
        className={`dh-mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div
          className="dh-mobile-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <div
          className="dh-mobile-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <div className="dh-mobile-head">
            <a
              href="#home"
              className="dh-mobile-head-logo"
              onClick={() => setMenuOpen(false)}
              aria-label="Constantflow Procurement home"
            >
              <span className="dh-mobile-head-mark" aria-hidden="true">
                <img src={logoSrc} alt="" aria-hidden="true" />
              </span>
              <span className="dh-mobile-head-text">
                <span className="dh-mobile-head-brand">Constant-flow</span>
                <span className="dh-mobile-head-sub">Procurement</span>
              </span>
            </a>
            <button
              type="button"
              className="dh-mobile-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          <div className="dh-mobile-body">
            <nav aria-label="Mobile">
              <ul className="dh-mobile-list">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="dh-mobile-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="dh-mobile-link-label">
                        <span className="dh-mobile-link-index">{`0${i + 1}`}</span>
                        <span className="dh-mobile-link-text">{item.label}</span>
                      </span>
                      <svg
                        className="dh-mobile-link-chevron"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="dh-mobile-trust" aria-hidden="true">
              <div className="dh-mobile-trust-item">
                <span className="dh-mobile-trust-k">4</span>
                <span className="dh-mobile-trust-v">Hubs</span>
              </div>
              <div className="dh-mobile-trust-item">
                <span className="dh-mobile-trust-k">97%</span>
                <span className="dh-mobile-trust-v">On-time</span>
              </div>
              <div className="dh-mobile-trust-item">
                <span className="dh-mobile-trust-k">ISO</span>
                <span className="dh-mobile-trust-v">Certified</span>
              </div>
            </div>
          </div>

          <div className="dh-mobile-foot">
            <div className="dh-mobile-cta-sub">
              <span>Ready to procure?</span>
              <span className="dh-mobile-cta-dot">
                <span>Sourcing live</span>
              </span>
            </div>
            <div className="dh-mobile-cta">
              <a
                href="#request-rfq"
                className="dh-cta-btn dh-cta-btn--block"
                onClick={() => setMenuOpen(false)}
              >
                Request an RFQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DarkHeader
