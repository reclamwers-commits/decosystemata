const IconFacebook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const IconInstagram = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

const IconWWW = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const IconEmail = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-inner">

        {/* ── Lewa kolumna: zdjęcie + bio + loga ── */}
        <div className="footer-left">
          <div className="footer-about">
            <div className="footer-photo">
              <img src="/images/portrait.jpg" alt="Portret artystki" />
            </div>
            <div className="footer-text">
              <h2 className="footer-name">Agata Konarska</h2>
              <p className="footer-bio">
                Artystka wizualna, której działania artystyczne opierają się na
                wykorzystaniu różnych mediów, takich jak wideo, dźwięk i
                performans, za pomocą których tworzy sytuacje interaktywne oraz
                kreuje rzeczywistości wirtualne.
              </p>
            </div>
          </div>

        </div>

        {/* ── Prawa kolumna: sociale ── */}
        <div className="footer-social" aria-label="Social media i kontakt">
          <a
            href="https://www.facebook.com/agata.konarska"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            <IconFacebook />
            <span>facebook.com/agata.konarska</span>
          </a>
          <a
            href="https://www.instagram.com/_konarska_/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            <IconInstagram />
            <span>instagram.com/_konarska_</span>
          </a>
          <a
            href="https://konarskaagata.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            <IconWWW />
            <span>konarskaagata.pl</span>
          </a>
          <a
            href="mailto:agatakonarska9@gmail.com"
            className="footer-social-link"
          >
            <IconEmail />
            <span>agatakonarska9@gmail.com</span>
          </a>
        </div>

      </div>

      {/* Loga finansowań — wyśrodkowane na pełną szerokość */}
      <div className="footer-funding-wrap">
        <p className="footer-funding-text">Projekt sfinansowany ze środków programu Krajowy Plan Odbudowy</p>
        <img
          src="/images/photo.jpg"
          alt="Loga finansowania projektu"
          className="footer-funding"
        />
      </div>
    </footer>
  )
}
