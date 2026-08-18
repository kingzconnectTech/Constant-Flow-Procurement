import { useState, useEffect } from 'react'
import './Header.css'
import logoSrc from '../assets/logo.png'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'About Us', href: '#about' },
] as const

const HUBS = [
  { name: 'EUROPE', zone: 'CET', tz: 'Europe/Berlin' },
  { name: 'ASIA', zone: 'SGT', tz: 'Asia/Singapore' },
  { name: 'USA', zone: 'EST', tz: 'America/New_York' },
  { name: 'NIGERIA', zone: 'WAT', tz: 'Africa/Lagos' },
] as const

function formatTime(tz: string): string {
  const now = new Date()
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now)
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [times, setTimes] = useState<Record<string, string>>(() =>
    HUBS.reduce((acc, h) => ({ ...acc, [h.zone]: formatTime(h.tz) }), {})
  )

  useEffect(() => {
    const id = setInterval(() => {
      setTimes(HUBS.reduce((acc, h) => ({ ...acc, [h.zone]: formatTime(h.tz) }), {}))
    }, 15000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="cf-header-wrapper">
      <div className="cf-global-strip">
        <div className="cf-global-inner">
          <span className="cf-global-label">Global Procurement Hubs</span>
          <ul className="cf-hubs-list" aria-label="Global office hours">
            {HUBS.map((hub) => (
              <li key={hub.zone} className="cf-hub-item">
                <span className="cf-hub-name">{hub.name}</span>
                <span className="cf-hub-sep">—</span>
                <span className="cf-hub-zone">{hub.zone}</span>
                <time className="cf-hub-time" dateTime={new Date().toISOString()}>
                  {times[hub.zone]}
                </time>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="cf-header">
        <div className="cf-header-inner">
          <a href="#home" className="cf-logo" aria-label="Constantflow Procurement home">
            <span className="cf-logo-mark" aria-hidden="true">
              <img
                className="cf-logo-image"
                src={logoSrc}
                alt=""
                aria-hidden="true"
              />
            </span>
            <span className="cf-logo-text">
              <span className="cf-logo-brand">Constant-flow</span>
              <span className="cf-logo-sub">Procurement</span>
            </span>
          </a>

          <nav className="cf-nav" aria-label="Primary">
            <ul className="cf-nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="cf-nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="cf-cta-wrap">
            <a href="#request-rfq" className="cf-cta-btn">
              Request an RFQ
            </a>
          </div>

          <button
            type="button"
            className={`cf-burger ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="cf-mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="cf-burger-line" aria-hidden="true" />
            <span className="cf-burger-line" aria-hidden="true" />
            <span className="cf-burger-line" aria-hidden="true" />
          </button>
        </div>

        <div
          id="cf-mobile-menu"
          className={`cf-mobile-menu ${menuOpen ? 'is-open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <nav aria-label="Mobile">
            <ul className="cf-mobile-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="cf-mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="cf-mobile-cta">
              <a
                href="#request-rfq"
                className="cf-cta-btn cf-cta-btn--block"
                onClick={() => setMenuOpen(false)}
              >
                Request an RFQ
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
