import { useState, useEffect } from 'react';
import { 
  Award, ShieldCheck, ArrowLeft, Globe, Menu, X, CheckCircle2, 
  Building2, FileText, ExternalLink, Scale, Lock, BookmarkCheck
} from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import WealthManagerCertificates from './WealthManagerCertificates';
import LeadCaptureForm from './LeadCaptureForm';

type View = 'landing' | 'login' | 'signup' | 'otp-verify' | 'payment' | 'forgot-password' | 'dashboard' | 'blogs' | 'accreditation';

interface StandaloneAccreditationPageProps {
  onNavigate: (v: View) => void;
}

const StandaloneAccreditationPage = ({ onNavigate }: StandaloneAccreditationPageProps) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const els = document.querySelectorAll('.fade-in-section');
    els.forEach(el => el.classList.add('is-visible'));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); }
      });
    }, { threshold: 0.05 });
    els.forEach(el => obs.observe(el));
    return () => els.forEach(el => obs.unobserve(el));
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
      <header className="lp-header">
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
      <main style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <WealthManagerCertificates />

        {/* Regulatory Governance Framework Section */}
        <section className="lp-section" style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '60px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div className="lp-container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                Regulatory Compliance & Fiduciary Safeguards
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', maxWidth: '650px', margin: '0 auto' }}>
                How SEBI and international regulatory frameworks protect investor capital, mandate asset segregation, and enforce advisor accountability.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {[
                {
                  Icon: Scale,
                  title: 'Fiduciary Duty & Client Priority',
                  desc: 'Under SEBI Investment Advisers Regulations and the Investment Advisers Act, accredited advisors are legally obligated to prioritize client financial interests above all firm operations.'
                },
                {
                  Icon: Building2,
                  title: 'Qualified Independent Custody',
                  desc: 'Client funds and securities are never held directly on our balance sheet. All assets remain securely deposited with qualified, independent custodian brokerages.'
                },
                {
                  Icon: Lock,
                  title: '24/7 Algorithmic Disclosures',
                  desc: 'Quantitative strategy backtests, risk parameters, and fee structures are fully disclosed to clients to ensure total operational transparency.'
                }
              ].map(({ Icon, title, desc }, idx) => (
                <div key={idx} className="glass-card green-border" style={{ padding: '24px', borderRadius: '16px', background: 'rgba(6, 20, 12, 0.7)' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0, 230, 118, 0.12)', border: '1px solid rgba(0, 230, 118, 0.3)', color: '#00e676', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Capture Consultation */}
        <section className="lp-section" style={{ padding: '60px 0' }}>
          <div className="lp-container" style={{ maxWidth: '850px' }}>
            <LeadCaptureForm language={language} />
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer style={{ background: '#020804', padding: '40px 0 24px 0', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.82rem', color: '#64748b' }}>
        <div className="lp-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="logo-symbol" style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}>AI</div>
            <strong style={{ color: '#ffffff', fontSize: '1rem' }}>AI Capital Investment LLC</strong>
          </div>
          <p style={{ maxWidth: '750px', margin: 0, lineHeight: 1.6 }}>
            Official regulatory accreditation page. Certifications issued by the National Institute of Securities Markets (NISM) under Securities and Exchange Board of India (SEBI) Regulations, 2007.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} style={{ color: '#00e676', textDecoration: 'none' }}>Home</a>
            <a href="/blogs" onClick={(e) => { e.preventDefault(); onNavigate('blogs'); }} style={{ color: '#00e676', textDecoration: 'none' }}>Market Research</a>
            <a href="/login" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} style={{ color: '#00e676', textDecoration: 'none' }}>Sign In</a>
          </div>
          <div style={{ color: '#475569', fontSize: '0.75rem', marginTop: '10px' }}>
            © {new Date().getFullYear()} AI Capital Investment LLC. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StandaloneAccreditationPage;
