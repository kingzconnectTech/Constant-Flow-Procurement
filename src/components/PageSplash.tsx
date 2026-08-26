import { useEffect, useState } from 'react'
import './PageSplash.css'

export default function PageSplash() {
  const [hidden, setHidden] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>
    let removeTimer: ReturnType<typeof setTimeout>

    const dismiss = () => {
      setHidden(true)
      removeTimer = setTimeout(() => setRemoved(true), 500)
    }

    // Allow the complete logo animation sequence to unfold (~2.4s) before fading out
    const onLoaded = () => {
      fadeTimer = setTimeout(dismiss, 2400)
    }

    if (document.readyState === 'complete') {
      onLoaded()
    } else {
      window.addEventListener('load', onLoaded, { once: true, passive: true })
      fadeTimer = setTimeout(dismiss, 3200)
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
      <div className="ps-ambient-glow" />

      <div className="ps-container">
        <div className="ps-logo-box" id="logoBox">
          <svg
            id="logoSvg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 300"
            className="ps-svg"
            role="img"
            aria-label="Constant-flow Procurement logo animation"
          >
            <defs>
              <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B">
                  <animate
                    attributeName="stop-color"
                    values="#F59E0B;#FBBF24;#F59E0B"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor="#FBBF24">
                  <animate
                    attributeName="stop-color"
                    values="#FBBF24;#F59E0B;#FBBF24"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#F59E0B">
                  <animate
                    attributeName="stop-color"
                    values="#F59E0B;#FBBF24;#F59E0B"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>

            {/* LEFT HEXAGON */}
            <g filter="url(#glow)">
              <path
                d="M95 75 L165 35 L235 75 L235 155 L165 195 L95 155 Z"
                fill="none"
                stroke="url(#blueGrad)"
                strokeWidth="13"
                strokeLinejoin="round"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset="100"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="100"
                  to="0"
                  dur="1.05s"
                  begin="0.15s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
                <animate
                  attributeName="fill"
                  values="transparent;url(#blueGrad)"
                  begin="0.95s"
                  dur="0.35s"
                  fill="freeze"
                />
                <animate
                  attributeName="fill-opacity"
                  from="0"
                  to="0.18"
                  begin="0.95s"
                  dur="0.35s"
                  fill="freeze"
                />
              </path>
            </g>

            {/* RIGHT HEXAGON */}
            <g filter="url(#glow)">
              <path
                d="M175 95 L245 55 L315 95 L315 175 L245 215 L175 175 Z"
                fill="none"
                stroke="url(#orangeGrad)"
                strokeWidth="13"
                strokeLinejoin="round"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset="100"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="100"
                  to="0"
                  dur="1.05s"
                  begin="0.3s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
                <animate
                  attributeName="fill"
                  values="transparent;url(#orangeGrad)"
                  begin="1.1s"
                  dur="0.35s"
                  fill="freeze"
                />
                <animate
                  attributeName="fill-opacity"
                  from="0"
                  to="0.18"
                  begin="1.1s"
                  dur="0.35s"
                  fill="freeze"
                />
              </path>
            </g>

            {/* FLOW WAVE */}
            <g filter="url(#glow)">
              <path
                d="M140 135 C165 118, 185 118, 205 135 S245 152, 270 135"
                fill="none"
                stroke="url(#flowGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset="100"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="100"
                  to="0"
                  dur="0.85s"
                  begin="0.95s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.25 0.1 0.25 1"
                />
              </path>

              {/* Continuous flow after reveal */}
              <path
                d="M140 135 C165 118, 185 118, 205 135 S245 152, 270 135"
                fill="none"
                stroke="url(#flowGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0"
                pathLength="100"
                strokeDasharray="28 72"
              >
                <animate
                  attributeName="opacity"
                  from="0"
                  to="0.65"
                  begin="1.85s"
                  dur="0.35s"
                  fill="freeze"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-100"
                  begin="1.85s"
                  dur="2.1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </svg>
        </div>

        <div className="ps-brand-info">
          <h2 className="ps-brand-title">CONSTANTFLOW</h2>
          <p className="ps-brand-sub">PROCUREMENT &amp; SUPPLY SOLUTIONS</p>
          <div className="ps-loading-bar">
            <div className="ps-loading-progress" />
          </div>
        </div>
      </div>
    </div>
  )
}
