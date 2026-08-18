import { useEffect, useState } from 'react'
import './PageSplash.css'
import logoGifSrc from '../assets/logo.gif'

export default function PageSplash() {
  const [hidden, setHidden] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>
    let removeTimer: ReturnType<typeof setTimeout>

    const dismiss = () => {
      setHidden(true)
      removeTimer = setTimeout(() => setRemoved(true), 480)
    }

    const onLoaded = () => {
      fadeTimer = setTimeout(dismiss, 1800)
    }

    if (document.readyState === 'complete') {
      onLoaded()
    } else {
      window.addEventListener('load', onLoaded, { once: true, passive: true })
      fadeTimer = setTimeout(dismiss, 3000)
    }

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      window.removeEventListener('load', onLoaded)
    }
  }, [])

  if (removed) return null

  return (
    <div
      className={`ps-overlay ${hidden ? 'is-hidden' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Constantflow Procurement is loading"
    >
      <div className="ps-inner">
        <img
          className="ps-logo"
          src={logoGifSrc}
          alt="Constantflow Procurement"
          draggable={false}
        />
      </div>
    </div>
  )
}
