import { useState, useEffect } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import Accreditation from './accreditation/Accreditation';

type View = 'landing' | 'login' | 'signup' | 'otp-verify' | 'payment' | 'forgot-password' | 'dashboard' | 'blogs' | 'accreditation' | 'rebalancing';

interface StandaloneAccreditationPageProps {
  onNavigate: (v: View) => void;
}

const StandaloneAccreditationPage = ({ onNavigate }: StandaloneAccreditationPageProps) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="lp-wrapper">
      <ParticleBackground />

      {/* Structured SEO Data for Accreditations */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "AI Capital Investment Regulatory Accreditation & Fiduciary Credentials",
            "description": "Official SEBI-compliant and NISM-certified wealth manager accreditations for PMS, Research Analysis, Derivatives, and Mutual Funds.",
            "provider": {
              "@type": "Organization",
              "name": "AI Capital Investment LLC"
            },
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Professional Certification",
                "name": "NISM-Series-XXI-A: Portfolio Management Services (PMS) Distributors",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Securities and Exchange Board of India (SEBI)"
                }
              },
              {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Professional Certification",
                "name": "NISM-Series-XV: Research Analyst Certification",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "National Institute of Securities Markets (NISM)"
                }
              }
            ]
          })
        }} 
      />

      {/* ── Top Header Bar ─────────────────────────────────────────── */}
      <header className="lp-header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="lp-container lp-header-inner">
          <div className="logo" onClick={() => onNavigate('landing')} style={{ cursor: 'pointer' }}>
            <div className="logo-symbol">AI</div>
            <div className="logo-text">AI Capital<span>Investment</span></div>
          </div>

          <nav className={`lp-nav-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
            <ul className="lp-nav">
              <li onClick={() => { setMobileMenuOpen(false); onNavigate('landing'); }}>
                <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>Home</a>
              </li>
              <li onClick={() => { setMobileMenuOpen(false); onNavigate('landing'); }}>
                <a href="/#about" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>About</a>
              </li>
              <li onClick={() => { setMobileMenuOpen(false); onNavigate('landing'); }}>
                <a href="/#services" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>Services</a>
              </li>
              <li onClick={() => { setMobileMenuOpen(false); onNavigate('landing'); }}>
                <a href="/#investment" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>Investment</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)} className="active">
                <a href="/accreditation" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Accreditation</a>
              </li>
              <li onClick={() => { setMobileMenuOpen(false); onNavigate('blogs'); }}>
                <a href="/blogs" onClick={(e) => { e.preventDefault(); onNavigate('blogs'); }}>Market Research</a>
              </li>
              <li onClick={() => { setMobileMenuOpen(false); onNavigate('landing'); }}>
                <a href="/#faq" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>FAQ</a>
              </li>
              <li className="mobile-only-nav-item" style={{ marginTop: '10px', gap: '10px', width: '100%', justifyContent: 'center' }}>
                <button className="btn btn-gold" style={{ padding: '10px 24px', fontSize: '0.85rem', width: '100%' }} onClick={() => { setMobileMenuOpen(false); onNavigate('login'); }}>
                  Launch Web App / Sign In
                </button>
              </li>
            </ul>
          </nav>

          <div className="lp-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
              className="btn btn-green-outline"
              style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Globe size={12} /> {language === 'en' ? 'हिंदी' : 'EN'}
            </button>
            
            <button className="btn btn-gradient-started" style={{ padding: '8px 18px', fontSize: '0.82rem' }} onClick={() => onNavigate('login')}>
              Sign In
            </button>
            
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content Container ───────────────────────────────────── */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Accreditation />
      </main>
    </div>
  );
};

export default StandaloneAccreditationPage;
