import { useState, useEffect } from 'react';
import { 
  RefreshCw, TrendingUp, ShieldCheck, PieChart, 
  ArrowRight, CheckCircle2, Sliders, FileText, ChevronDown, ChevronUp,
  Globe, Menu, X
} from 'lucide-react';
import ParticleBackground from './ParticleBackground';

type View = 'landing' | 'login' | 'signup' | 'otp-verify' | 'payment' | 'forgot-password' | 'dashboard' | 'blogs' | 'accreditation' | 'rebalancing';

interface MutualFundRebalancingPageProps {
  onNavigate: (v: View) => void;
}

export default function MutualFundRebalancingPage({ onNavigate }: MutualFundRebalancingPageProps) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Simulator State
  const [currentEquity, setCurrentEquity] = useState<number>(78);
  const targetEquity = 65;
  const drift = currentEquity - targetEquity;
  const [isSimulated, setIsSimulated] = useState<boolean>(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Audit Form State
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolioSize: '₹15 Lakh - ₹50 Lakh',
    broker: 'Groww / Zerodha Coin'
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleSimulate = () => {
    setIsSimulated(true);
  };

  const handleResetSimulation = () => {
    setIsSimulated(false);
    setCurrentEquity(78);
  };

  const handleSubmitAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setFormSubmitted(true);
  };

  const rebalanceFaqs = [
    {
      qEn: "How often should an investor rebalance their mutual fund portfolio?",
      qHi: "एक निवेशक को अपने म्यूचुअल फंड पोर्टफोलियो को कितनी बार रीबैलेंस करना चाहिए?",
      aEn: "Rather than arbitrary calendar dates (e.g. once a year), AI Capital uses continuous 'tolerance-band' monitoring. Whenever equity or debt weight drifts by more than 5% from your target risk profile—often caused by aggressive equity rallies or market corrections—our system alerts you immediately with a rebalancing schedule.",
      aHi: "कैलेंडर तिथियों (जैसे वर्ष में एक बार) के बजाय, हम टॉलरेंस-बैंड निगरानी का उपयोग करते हैं। जब भी इक्विटी या डेट का वजन लक्षित जोखिम से 5% से अधिक भटक जाता है, हमारा सिस्टम तुरंत सूचना देता है।"
    },
    {
      qEn: "Will rebalancing trigger heavy Capital Gains Tax or Exit Loads?",
      qHi: "क्या रीबैलेंसिंग से पूंजीगत लाभ कर (Capital Gains Tax) या एग्जिट लोड लगेगा?",
      aEn: "No. Our algorithm prioritizes 'Tax-Smart Rebalancing'. It first redirects fresh SIP installments and dividends into underweighted asset classes. For necessary switches, it prioritizes folios with zero exit load and utilizes the ₹1.25 Lakh annual tax-free Long-Term Capital Gains (LTCG) exemption under Section 112A, keeping your tax drag near zero.",
      aHi: "नहीं। हमारा एल्गोरिदम टैक्स-स्मार्ट रीबैलेंसिंग को प्राथमिकता देता है। यह पहले नई एसआईपी और लाभांश को कम वजन वाले एसेट्स में निर्देशित करता है और धारा 112A के तहत ₹1.25 लाख की कर-मुक्त छूट का पूरा लाभ उठाता है।"
    },
    {
      qEn: "Do I need to transfer my mutual funds away from Zerodha, Groww, or Kuvera?",
      qHi: "क्या मुझे अपने म्यूचुअल फंड को जेरोधा, ग्रो या कुवेरा से ट्रांसफर करना होगा?",
      aEn: "Not at all. You retain 100% custody and control of your folios. You simply upload your CAMS/KFintech Consolidated Account Statement (CAS). We generate the algorithmic diagnostic and switch instructions, which you can execute in your existing demat account or via our direct execution gateway with zero lock-in.",
      aHi: "बिल्कुल नहीं। आपके फोलियो पर आपका 100% नियंत्रण रहता है। आप केवल अपना CAMS/KFintech CAS स्टेटमेंट अपलोड करते हैं। हम विस्तृत डायग्नोस्टिक और सिफारिशें प्रदान करते हैं जिन्हें आप अपने मौजूदा खाते में निष्पादित कर सकते हैं।"
    },
    {
      qEn: "What is Mutual Fund Portfolio Overlap and why does it reduce returns?",
      qHi: "म्यूचुअल फंड पोर्टफोलियो ओवरलैप क्या है और यह रिटर्न को कैसे कम करता है?",
      aEn: "Many investors hold 5 to 10 funds from different AMCs (e.g. HDFC, ICICI, SBI) thinking they are diversified. In reality, these funds often hold the exact same 25 top stocks (Reliance, HDFC Bank, Infosys, TCS). You end up paying 5 separate expense ratios for a pseudo-index fund. Our AI flags redundant holdings and consolidates them into genuinely differentiated alpha generators.",
      aHi: "कई निवेशक अलग-अलग फंड हाउसों से कई फंड रखते हैं यह सोचकर कि वे डाइवर्सिफाइड हैं। वास्तव में, उनमें से अधिकांश शीर्ष 25 समान शेयरों में निवेश करते हैं। हमारी तकनीक इस ओवरलैप को समाप्त कर लागत बचाती है।"
    }
  ];

  return (
    <div className="lp-wrapper">
      <ParticleBackground />

      {/* Structured SEO Schema for Service */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Mutual Fund Portfolio Rebalancing",
            "serviceType": "Algorithmic Wealth Management & Portfolio Health Audit",
            "provider": {
              "@type": "FinancialService",
              "name": "AI Capital Investment LLC",
              "url": "https://aicapitalinvestment.com"
            },
            "description": "SEBI-compliant mutual fund portfolio rebalancing service. Detect asset drift, eliminate AMC portfolio overlap, and execute tax-harvested asset switches.",
            "areaServed": "IN"
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
                <a href="/#services" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>What We Offer</a>
              </li>
              <li className="active">
                <a href="/services/mutual-fund-rebalancing" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>
                  MF Rebalancing
                </a>
              </li>
              <li onClick={() => { setMobileMenuOpen(false); onNavigate('accreditation'); }}>
                <a href="/accreditation" onClick={(e) => { e.preventDefault(); onNavigate('accreditation'); }}>Accreditation</a>
              </li>
              <li onClick={() => { setMobileMenuOpen(false); onNavigate('blogs'); }}>
                <a href="/blogs" onClick={(e) => { e.preventDefault(); onNavigate('blogs'); }}>Research</a>
              </li>
              <li onClick={() => { setMobileMenuOpen(false); onNavigate('landing'); }}>
                <a href="/#faq" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>FAQ</a>
              </li>
              <li className="mobile-only-nav-item" style={{ marginTop: '10px', width: '100%' }}>
                <button className="btn btn-gold" style={{ padding: '10px 24px', fontSize: '0.85rem', width: '100%' }} onClick={() => { setMobileMenuOpen(false); onNavigate('login'); }}>
                  Launch Web App
                </button>
              </li>
            </ul>
          </nav>

          <div className="lp-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
              className="btn btn-green-outline"
              style={{ fontSize: '0.72rem', padding: '4px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '3px' }}
              aria-label="Switch language"
            >
              <Globe size={12} /> {language === 'en' ? 'हिंदी' : 'EN'}
            </button>
            <button className="btn btn-gold" onClick={() => onNavigate('login')} style={{ fontSize: '0.82rem', padding: '7px 16px' }}>
              Sign In
            </button>
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation menu">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main className="lp-main">

        {/* ── Hero Section ─────────────────────────────────────────── */}
        <section className="lp-hero" style={{ padding: '60px 0 40px' }}>
          <div className="lp-container" style={{ textAlign: 'center', maxWidth: '880px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', marginBottom: '22px' }}>
              <RefreshCw size={14} style={{ color: 'var(--color-gold)' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-gold)', letterSpacing: '0.5px' }}>
                {language === 'en' ? 'SEBI-COMPLIANT ALGORITHMIC ADVISORY' : 'सेबी-अनुरूप एल्गोरिदमिक सलाहकार'}
              </span>
            </div>

            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.25, color: '#ffffff', marginBottom: '18px' }}>
              {language === 'en' ? (
                <>AI-Powered <span style={{ background: 'linear-gradient(90deg, #d4af37, #00e676)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mutual Fund Portfolio Rebalancing</span></>
              ) : (
                <>एआई-संचालित <span style={{ background: 'linear-gradient(90deg, #d4af37, #00e676)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>म्यूचुअल फंड पोर्टफोलियो रीबैलेंसिंग</span></>
              )}
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>
              {language === 'en'
                ? "Protect your accumulated bull-run profits, eliminate duplicate stock overlaps, and minimize capital gains tax with 24/7 algorithmic drift monitoring across all your mutual fund folios."
                : "बाजार में तेजी के मुनाफे को सुरक्षित करें, फंड्स के बीच स्टॉक ओवरलैप को खत्म करें और 24/7 स्वचालित निगरानी के साथ अपने रिटर्न को अधिकतम करें।"}
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="#audit-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-gold"
                style={{ padding: '12px 28px', fontSize: '0.95rem', borderRadius: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                <FileText size={16} /> {language === 'en' ? 'Get Free CAS Portfolio Audit' : 'मुफ्त पोर्टफोलियो ऑडिट प्राप्त करें'}
              </a>
              <a 
                href="#simulator"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-green-outline"
                style={{ padding: '12px 26px', fontSize: '0.95rem', borderRadius: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                <Sliders size={16} /> {language === 'en' ? 'Simulate Rebalance Impact' : 'रीबैलेंस सिमुलेटर चलाएं'}
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '36px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-green)' }} /> Zero Demat Transfer Needed
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-green)' }} /> Section 112A Tax-Harvested
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-green)' }} /> Instant Overlap Detection
              </div>
            </div>
          </div>
        </section>

        {/* ── Interactive Rebalancing Simulator ────────────────────── */}
        <section className="lp-section" id="simulator" style={{ paddingTop: '20px' }}>
          <div className="lp-container" style={{ maxWidth: '960px' }}>
            <div className="glass-card gold-border" style={{ padding: '36px', borderRadius: '20px', background: 'radial-gradient(circle at top right, rgba(212,175,55,0.08), rgba(6,14,8,0.95))' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
                    <Sliders size={13} /> Interactive Tool
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff' }}>
                    {language === 'en' ? 'Live Portfolio Drift & Rebalance Simulator' : 'लाइव पोर्टफोलियो ड्रिफ्ट व रीबैलेंस सिमुलेटर'}
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', maxWidth: '580px' }}>
                    Adjust your current equity percentage to see how bull-run drift exposes your portfolio to downside shock, and how our algorithm restores optimal risk.
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button 
                    onClick={isSimulated ? handleResetSimulation : handleSimulate}
                    className="btn btn-gold"
                    style={{ fontSize: '0.85rem', padding: '10px 20px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    <RefreshCw size={14} />
                    {isSimulated ? 'Reset Scenario' : 'Simulate 1-Click AI Rebalance'}
                  </button>
                </div>
              </div>

              {/* Slider Controller */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
                    Current Equity Allocation: <strong style={{ color: drift > 5 ? '#ff5252' : 'var(--color-gold)', fontSize: '1.05rem' }}>{isSimulated ? targetEquity : currentEquity}%</strong>
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Target Mandate: <strong>{targetEquity}% Equity / {100 - targetEquity}% Debt</strong>
                  </span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="95" 
                  value={isSimulated ? targetEquity : currentEquity} 
                  disabled={isSimulated}
                  onChange={(e) => setCurrentEquity(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: isSimulated ? 'not-allowed' : 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>50% (Conservative)</span>
                  <span>65% (Optimal Balanced)</span>
                  <span>95% (Extreme Bull Drift)</span>
                </div>
              </div>

              {/* Visual Allocation Comparison */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                {/* State Card: Current vs Post Rebalance */}
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '14px', border: isSimulated ? '1px solid var(--color-green)' : (drift > 5 ? '1px solid rgba(255,82,82,0.4)' : '1px solid rgba(212,175,55,0.3)') }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Status</span>
                    {isSimulated ? (
                      <span style={{ fontSize: '0.75rem', background: 'rgba(0,230,118,0.15)', color: 'var(--color-green)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                        ✓ Rebalanced to Target
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', background: drift > 0 ? 'rgba(255,82,82,0.15)' : 'rgba(0,230,118,0.15)', color: drift > 0 ? '#ff5252' : 'var(--color-green)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                        {drift > 0 ? `+${drift}% Dangerous Drift` : 'Balanced'}
                      </span>
                    )}
                  </div>

                  {/* Allocation Bars */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px', color: '#fff' }}>
                      <span>Equity Holdings</span>
                      <span>{isSimulated ? targetEquity : currentEquity}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${isSimulated ? targetEquity : currentEquity}%`, height: '100%', background: 'linear-gradient(90deg, #d4af37, #00e676)', transition: 'width 0.6s ease' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px', color: '#fff' }}>
                      <span>Debt & Treasury Reserves</span>
                      <span>{100 - (isSimulated ? targetEquity : currentEquity)}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${100 - (isSimulated ? targetEquity : currentEquity)}%`, height: '100%', background: '#3b82f6', transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                </div>

                {/* 3 Metrics Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Portfolio Risk Score</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: isSimulated ? 'var(--color-green)' : (currentEquity > 75 ? '#ff5252' : 'var(--color-gold)'), marginTop: '4px' }}>
                      {isSimulated ? '5.4 / 10' : `${(currentEquity / 10).toFixed(1)} / 10`}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {isSimulated ? 'Optimal Risk Profile' : 'Unhedged Volatility'}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Crash Shock Downside</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: isSimulated ? 'var(--color-green)' : '#ff5252', marginTop: '4px' }}>
                      {isSimulated ? '-10.8%' : `-${((currentEquity * 0.24)).toFixed(1)}%`}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      In 20% Market Crash
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Tax-Harvested Savings (Sec 112A)</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-gold)', marginTop: '2px' }}>
                          ₹18,400 / year
                        </div>
                      </div>
                      <span style={{ fontSize: '0.72rem', background: 'rgba(212,175,55,0.1)', color: 'var(--color-gold)', padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.2)' }}>
                        Zero Exit Load
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulation Result Callout */}
              {isSimulated && (
                <div style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={22} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.84rem', color: '#ffffff', margin: 0, lineHeight: 1.5 }}>
                    <strong>Rebalancing Strategy Executed:</strong> Trimming {drift}% from over-extended large-cap equity folios, capturing ₹1.25L tax-free LTCG, and redirecting liquidity into short-duration debt and arbitrage funds. Your portfolio is now insulated against market pullbacks.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 4 Pillars of Algorithmic Rebalancing ─────────────────── */}
        <section className="lp-section" id="pillars">
          <div className="lp-container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 className="lp-section-title">
                {language === 'en' ? 'The 4 Pillars of AI Rebalancing' : 'एआई रीबैलेंसिंग के ४ प्रमुख स्तंभ'}
              </h2>
              <p className="lp-section-sub" style={{ maxWidth: '640px', margin: '0 auto' }}>
                Why top institutional wealth managers never rely on annual manual reviews.
              </p>
            </div>

            <div className="lp-features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              <div className="glass-card lp-feature-card gold-border">
                <div className="lp-feat-icon gold"><RefreshCw size={22} /></div>
                <h3>1. Continuous Drift Monitoring</h3>
                <p>
                  Equities naturally compound faster than debt during bull markets. Our algorithms track drift 24/7 and alert you when your asset mix exceeds predefined tolerance boundaries.
                </p>
              </div>

              <div className="glass-card lp-feature-card green-border">
                <div className="lp-feat-icon green"><PieChart size={22} /></div>
                <h3>2. Scheme Overlap Elimination</h3>
                <p>
                  Holding 6 different equity funds often leads to 70%+ identical stock holdings. We detect and prune redundant underlying exposures, reducing duplicate fees and concentration risk.
                </p>
              </div>

              <div className="glass-card lp-feature-card gold-border">
                <div className="lp-feat-icon gold"><TrendingUp size={22} /></div>
                <h3>3. Tax-Smart Harvesting (Sec 112A)</h3>
                <p>
                  Every financial year allows ₹1.25 Lakhs of tax-free Long-Term Capital Gains. Our rebalancing engine systematically harvests gains up to the threshold, reducing your lifetime tax burden.
                </p>
              </div>

              <div className="glass-card lp-feature-card green-border">
                <div className="lp-feat-icon green"><ShieldCheck size={22} /></div>
                <h3>4. Quartile Underperformer Pruning</h3>
                <p>
                  Mutual fund schemes that persistently rank in Quartile 4 against their category benchmark are phased out systematically, redirecting SIP capital into proven alpha generators.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works Process ──────────────────────────────────── */}
        <section className="lp-section" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="lp-container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 className="lp-section-title">
                {language === 'en' ? 'Seamless 4-Step Rebalancing Journey' : 'सरल ४-चरणीय रीबैलेंसिंग प्रक्रिया'}
              </h2>
              <p className="lp-section-sub">
                No need to open new demat accounts or move assets from existing platforms.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
              {[
                { step: '01', title: 'Upload CAS Statement', desc: 'Securely upload your CAMS or KFintech Consolidated Account Statement in PDF format.' },
                { step: '02', title: 'AI Portfolio X-Ray', desc: 'The engine audits scheme overlap, expense ratios, asset drift, and downside crash sensitivity.' },
                { step: '03', title: 'Custom Switch Plan', desc: 'Receive a transparent, tax-optimized rebalancing roadmap with exact switch suggestions.' },
                { step: '04', title: '1-Click Execution', desc: 'Approve switches directly in your existing demat broker or via our execution gateway.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="glass-card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-gold)', opacity: 0.6, marginBottom: '8px' }}>{step}</div>
                  <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '8px' }}>{title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Free CAS Portfolio Audit Lead Capture Form ────────────── */}
        <section className="lp-section" id="audit-form">
          <div className="lp-container" style={{ maxWidth: '780px' }}>
            <div className="glass-card gold-border" style={{ padding: '40px 32px', borderRadius: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Complimentary Fiduciary Service
                </span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', marginBottom: '10px' }}>
                  {language === 'en' ? 'Get Your Free AI Portfolio Health Report' : 'मुफ्त एआई पोर्टफोलियो स्वास्थ्य रिपोर्ट प्राप्त करें'}
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto' }}>
                  Submit your details below. A Senior Portfolio Analyst will generate your personalized Mutual Fund Drift & Overlap Diagnostic within 24 business hours.
                </p>
              </div>

              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '30px 20px', background: 'rgba(0, 230, 118, 0.08)', borderRadius: '16px', border: '1px solid rgba(0, 230, 118, 0.25)' }}>
                  <CheckCircle2 size={48} style={{ color: 'var(--color-green)', margin: '0 auto 16px' }} />
                  <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '8px' }}>Request Confirmed!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 20px' }}>
                    Thank you, <strong>{formData.name}</strong>. Our quantitative research desk has queued your mutual fund diagnostic. You will receive the detailed X-Ray report at <strong>{formData.email}</strong>.
                  </p>
                  <button 
                    onClick={() => { setFormSubmitted(false); }}
                    className="btn btn-green-outline"
                    style={{ fontSize: '0.82rem', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer' }}
                  >
                    Submit Another Portfolio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitAudit}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '18px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Sharma" 
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@example.com" 
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '18px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>Phone / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210" 
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>Approx. Portfolio Value</label>
                      <select 
                        value={formData.portfolioSize}
                        onChange={(e) => setFormData({ ...formData, portfolioSize: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', background: '#0a160d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem' }}
                      >
                        <option value="Under ₹5 Lakh">Under ₹5 Lakh</option>
                        <option value="₹5 Lakh - ₹15 Lakh">₹5 Lakh - ₹15 Lakh</option>
                        <option value="₹15 Lakh - ₹50 Lakh">₹15 Lakh - ₹50 Lakh</option>
                        <option value="₹50 Lakh - ₹1 Crore">₹50 Lakh - ₹1 Crore</option>
                        <option value="₹1 Crore+ (HNI Mandate)">₹1 Crore+ (HNI Mandate)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>Current Investment Platform</label>
                    <select 
                      value={formData.broker}
                      onChange={(e) => setFormData({ ...formData, broker: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', background: '#0a160d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem' }}
                    >
                      <option value="Groww / Zerodha Coin">Groww / Zerodha Coin</option>
                      <option value="Kuvera / INDmoney">Kuvera / INDmoney</option>
                      <option value="CAMS / KFintech Direct">CAMS / KFintech Direct</option>
                      <option value="Bank Channel (HDFC, ICICI, SBI, Kotak)">Bank Wealth Channel</option>
                      <option value="Multiple Broker Accounts">Multiple Accounts</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-gold"
                    style={{ width: '100%', padding: '14px', fontSize: '0.95rem', borderRadius: '10px', fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(212,175,55,0.25)', cursor: 'pointer' }}
                  >
                    Request Free Confidential Audit <ArrowRight size={16} />
                  </button>

                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
                    🔒 100% Privacy Assured. Client data is strictly confidential and never shared with 3rd-party telemarketers.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── Rebalancing FAQ Section ──────────────────────────────── */}
        <section className="lp-section" id="rebalance-faq">
          <div className="lp-container" style={{ maxWidth: '820px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 className="lp-section-title">Rebalancing FAQs</h2>
              <p className="lp-section-sub">Common questions regarding algorithmic mutual fund supervision.</p>
            </div>

            <div className="faq-accordion-container">
              {rebalanceFaqs.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button 
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{language === 'en' ? item.qEn : item.qHi}</span>
                      {isOpen ? <ChevronUp size={18} style={{ color: 'var(--color-gold)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
                    </button>
                    {isOpen && (
                      <div className="faq-answer-panel">
                        <p>{language === 'en' ? item.aEn : item.aHi}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer-grid">
          <div className="lp-footer-brand">
            <div className="logo" onClick={() => onNavigate('landing')} style={{ cursor: 'pointer' }}>
              <div className="logo-symbol">AI</div>
              <div className="logo-text">AI Capital<span>Investment</span></div>
            </div>
            <p>Next-generation financial solutions leveraging intelligent systems to grow your wealth.</p>
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', letterSpacing: '0.5px' }}>Quick Links</div>
            <ul className="lp-footer-links">
              <li><a href="/" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>Home</a></li>
              <li><a href="/#services" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>What We Offer</a></li>
              <li><a href="/accreditation" onClick={(e) => { e.preventDefault(); onNavigate('accreditation'); }}>Accreditation</a></li>
              <li><a href="/blogs" onClick={(e) => { e.preventDefault(); onNavigate('blogs'); }}>Research & Blogs</a></li>
            </ul>
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', letterSpacing: '0.5px' }}>Services</div>
            <ul className="lp-footer-links">
              <li>Mutual Funds</li>
              <li>Portfolio Management Services (PMS)</li>
              <li>Alternative Investment Funds (AIF)</li>
              <li>Specialized Investment Funds (SIF)</li>
              <li style={{ color: 'var(--color-gold)' }}>Mutual Fund Rebalancing</li>
              <li>Wealth Management</li>
            </ul>
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', letterSpacing: '0.5px' }}>Regulatory</div>
            <ul className="lp-footer-links">
              <li>SEBI Reg: INA000098765</li>
              <li>NSE / BSE Intermediary</li>
              <li>CDSL / NSDL Qualified Custody</li>
              <li>compliance@aicapitalinvestment.com</li>
            </ul>
          </div>
        </div>

        {/* Global YMYL Disclaimer */}
        <div className="lp-container" style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '20px' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5, textAlign: 'center' }}>
            <strong>YMYL Investment Compliance Disclosure:</strong> Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing. AI Capital Investment provides algorithmic portfolio diagnostics and rebalancing analytics. Securities and mutual fund folios remain directly under client custody at SEBI/RBI registered depositories (CDSL/NSDL). Past performance is no guarantee of future returns.
          </p>
        </div>

        <div className="lp-footer-bottom">
          <div className="lp-container">
            <span>© 2026 AI Capital Investment. All rights reserved.</span>
            <div className="lp-footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Disclosures</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
