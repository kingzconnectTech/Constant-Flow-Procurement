import './IndustrialHero.css'
import heroBg from '../assets/wave bg.png'

const WAVE_OPEN =
  'M0 100 ' +
  'C 4 92 8 82 12 77 ' +
  'C 17 72 20 84 24 88 ' +
  'C 29 92 30 60 36 56 ' +
  'C 40 52 42 77 49 83 ' +
  'C 53 86 55 57 62 52 ' +
  'C 65 48 68 65 71 70 ' +
  'C 75 75 78 28 83 24 ' +
  'C 88 20 92 58 94 61 ' +
  'C 97 63 98 64 100 65'

const WAVE_CLOSED = WAVE_OPEN + ' L100 100 L0 100 Z'

function scaleToBB(s: string): string {
  return s
    .replace(/([MLC])\s*/g, (_, k) => k + ' ')
    .replace(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/g, (_m, x, y) => `${(+x) / 100} ${(+y) / 100}`)
}

const WAVE_CLOSED_BB = scaleToBB(WAVE_CLOSED)

export default function IndustrialHero() {
  return (
    <section className="ih-section" id="home" aria-labelledby="ih-title">
      <div className="ih-bg" aria-hidden="true">
        <div className="ih-bg-base" />
        <div className="ih-bg-texture" />
        <div className="ih-bg-radial" />
      </div>

      <div className="ih-wave" aria-hidden="true">
        <svg
          className="ih-wave-assets"
          width="0"
          height="0"
          style={{ position: 'absolute' }}
          aria-hidden="true"
        >
          <defs>
            <clipPath id="ih-wave-clip-bb" clipPathUnits="objectBoundingBox">
              <path d={WAVE_CLOSED_BB} />
            </clipPath>

            <linearGradient id="ih-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(130,210,202,0)" />
              <stop offset="10%" stopColor="rgba(130,210,202,0.55)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.92)" />
              <stop offset="50%" stopColor="rgba(255,255,255,1)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="88%" stopColor="rgba(130,210,202,0.5)" />
              <stop offset="100%" stopColor="rgba(130,210,202,0)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="ih-wave-img-wrap">
          <img className="ih-wave-image" src={heroBg} alt="" aria-hidden="true" />
          <div className="ih-wave-overlay ih-wave-overlay--tint" />
          <div className="ih-wave-overlay ih-wave-overlay--lift" />
          <div className="ih-wave-overlay ih-wave-overlay--v" />
          <div className="ih-wave-overlay ih-wave-overlay--h" />
        </div>

        <svg
          className="ih-wave-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="ih-wave-edge"
            d={WAVE_OPEN}
            fill="none"
            stroke="url(#ih-line-gradient)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="ih-content">
        <div className="ih-inner">
          <div className="ih-copy">
            <h1 id="ih-title" className="ih-title">
              The Right Equipment. The Right Source. The Right Price.
            </h1>

            <p className="ih-sub">
              Constantflow simplifies complex industrial procurement by sourcing critical oil &amp; gas equipment, heavy machinery and technical supplies from vetted suppliers worldwide.
            </p>

            <div className="ih-actions">
              <a href="#request-rfq" className="ih-btn ih-btn--primary">
                Start Your Procurement
              </a>
              <a href="#services" className="ih-btn ih-btn--ghost">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
