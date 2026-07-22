import { useState, useEffect } from 'react';
import { 
  Cpu, ShieldCheck, TrendingUp, UserCheck, Wallet, Users, Percent, 
  PieChart, Briefcase, Award, Globe, BookOpen, Clock, ArrowRight, X, Menu
} from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import ParticleBackground from './ParticleBackground';

type View = 'landing' | 'login' | 'signup' | 'dashboard';

interface LandingPageProps {
  onNavigate: (v: View) => void;
}

const blogsData = [
  {
    id: 1,
    titleEn: "AI-Driven Asset Allocation: Outperforming Inflation in 2026",
    titleHi: "एआई-संचालित संपत्ति आवंटन: 2026 में मुद्रास्फीति से बेहतर प्रदर्शन",
    category: "AI Wealth",
    date: "July 20, 2026",
    readTime: "4 min read",
    author: "Dr. Aris Thorne (Chief Quantitative Officer)",
    excerptEn: "Discover how multi-agent neural networks optimize portfolio yields in real-time while keeping drawdowns below 4.5% during volatility.",
    excerptHi: "जानें कि कैसे मल्टी-एजेंट न्यूरल नेटवर्क वास्तविक समय में पोर्टफोलियो लाभ को अनुकूलित करते हैं और अस्थिरता के दौरान गिरावट को 4.5% से कम रखते हैं।",
    contentEn: `Traditional 60/40 portfolios are failing to keep pace with dynamic inflation cycles. By introducing multi-agent neural networks trained on 30 years of macroeconomic data, AI Capital Investment automatically rotates asset allocations between high-yield corporate bonds, inflation-hedging physical gold, and tech equities. 

Key Takeaways:
1. Automated daily rebalancing eliminates emotional human trading errors.
2. Dynamic gold vault hedging reduces maximum drawdown risk by over 40%.
3. Real-time yield optimization captures institutional-grade returns automatically.`,
    contentHi: `पारंपरिक 60/40 पोर्टफोलियो गतिशील मुद्रास्फीति चक्रों के साथ तालमेल बिठाने में विफल रहे हैं। 30 वर्षों के मैक्रोइकोनॉमिक डेटा पर प्रशिक्षित मल्टी-एजेंट न्यूरल नेटवर्क पेश करके, एआई कैपिटल इन्वेस्टमेंट उच्च-लाभ वाले कॉर्पोरेट बॉन्ड, मुद्रास्फीति-हेजिंग गोल्ड और टेक शेयरों के बीच संपत्ति आवंटन को स्वचालित रूप से बदलता है।

मुख्य बातें:
1. स्वचालित दैनिक रीबैलेंसिंग भावनात्मक मानवीय व्यापारिक त्रुटियों को समाप्त करती है।
2. डायनामिक गोल्ड वॉल्ट हेजिंग अधिकतम गिरावट के जोखिम को 40% से अधिक कम करती है।
3. वास्तविक समय लाभ अनुकूलन स्वचालित रूप से संस्थागत-स्तरीय रिटर्न प्राप्त करता है।`
  },
  {
    id: 2,
    titleEn: "Tax-Loss Harvesting Strategies for High Net Worth Investors",
    titleHi: "उच्च निवल मूल्य वाले निवेशकों के लिए टैक्स-लॉस हार्वेस्टिंग नीतियां",
    category: "Tax Strategy",
    date: "July 18, 2026",
    readTime: "5 min read",
    author: "Elena Rostova (Head of Private Wealth)",
    excerptEn: "Learn how automated tax-loss harvesting offsets taxable dividend yields to save up to $1,450 per portfolio annually.",
    excerptHi: "जानें कि कैसे स्वचालित टैक्स-लॉस हार्वेस्टिंग प्रतिवर्ष $1,450 तक बचाने के लिए कर योग्य लाभांश लाभ को संतुलित करती है।",
    contentEn: `Tax-loss harvesting (TLH) is one of the most powerful wealth preservation tools available. By identifying unrealized capital losses in tech-bond holdings and executing wash-sale compliant swaps into equivalent tracking index funds, investors can offset taxable dividend yields seamlessly.

Key Takeaways:
1. Automated TLH algorithms monitor portfolio movements 24/7 without violating wash-sale rules.
2. Realized losses shield taxable interest and dividend distributions.
3. Average tax savings increase net annual compound returns by 1.2% to 1.8%.`,
    contentHi: `टैक्स-लॉस हार्वेस्टिंग (TLH) उपलब्ध सबसे शक्तिशाली धन संरक्षण उपकरणों में से एक है। टेक-बॉन्ड होल्डिंग्स में अवास्तविक पूंजीगत नुकसान की पहचान करके और समकक्ष इंडेक्स फंड में स्वैप निष्पादित करके, निवेशक कर योग्य लाभांश लाभ को आसानी से संतुलित कर सकते हैं।

मुख्य बातें:
1. स्वचालित TLH एल्गोरिदम वॉश-सेल नियमों का उल्लंघन किए बिना 24/7 पोर्टफोलियो गतिविधियों की निगरानी करते हैं।
2. प्राप्त नुकसान कर योग्य ब्याज और लाभांश वितरण की रक्षा करते हैं।
3. औसत कर बचत शुद्ध वार्षिक चक्रवृद्धि रिटर्न में 1.2% से 1.8% की वृद्धि करती है।`
  },
  {
    id: 3,
    titleEn: "Algorithmic Crypto Yields & Dynamic Liquidity Vaults",
    titleHi: "एल्गोरिदम क्रिप्टो यील्ड और डायनामिक तरलता वॉल्ट्स का भविष्य",
    category: "Crypto Yields",
    date: "July 15, 2026",
    readTime: "6 min read",
    author: "Marcus Vance (Director of Digital Assets)",
    excerptEn: "Explore how institutional digital asset staking and liquidity vaults harvest 12%+ yields with automated stop-loss protection.",
    excerptHi: "जानें कि कैसे संस्थागत डिजिटल संपत्ति स्टेकिंग और तरलता वॉल्ट स्वचालित स्टॉप-लॉस सुरक्षा के साथ 12%+ यील्ड प्राप्त करते हैं।",
    contentEn: `Digital assets have matured into an essential high-alpha component of modern wealth management. By deploying algorithmic staking strategies across BTC and ETH validator vaults, investors earn passive compounding APYs protected by automated downside trailing stop-loss orders.

Key Takeaways:
1. Dual-custody institutional cold storage guarantees principal capital protection.
2. Smart contract liquidity routing optimizes compounding frequency daily.
3. Volatility shield controls automatically unwind positions during market panics.`,
    contentHi: `डिजिटल परिसंपत्तियां आधुनिक धन प्रबंधन का एक अनिवार्य घटक बन गई हैं। BTC और ETH वैलीडेटर वॉल्ट में एल्गोरिदम स्टेकिंग रणनीतियों को तैनात करके, निवेशक स्वचालित स्टॉप-लॉस ऑर्डर द्वारा संरक्षित निष्क्रिय APY अर्जित करते हैं।

मुख्य बातें:
1. दोहरी-कस्टडी संस्थागत कोल्ड स्टोरेज मूल पूंजी सुरक्षा की गारंटी देती है।
2. स्मार्ट अनुबंध तरलता रूटिंग दैनिक चक्रवृद्धि आवृत्ति को अनुकूलित करती है।
3. वोलेटिलिटी शील्ड कंट्रोल बाजार में घबराहट के दौरान स्थिति को स्वचालित रूप से संभालते हैं।`
  },
  {
    id: 4,
    titleEn: "How AI Risk-Hedging Shields Capital During Market Crashes",
    titleHi: "बाजार में गिरावट के दौरान AI जोखिम-हेजिंग पूंजी की रक्षा कैसे करता है",
    category: "Risk Management",
    date: "July 10, 2026",
    readTime: "4 min read",
    author: "Sarah Jenkins (Quantitative Risk Lead)",
    excerptEn: "A deep dive into automated Volatility Shield triggers that rotate equities into cash & treasury reserves during black swan events.",
    excerptHi: "स्वचालित वोलेटिलिटी शील्ड ट्रिगर्स का गहराई से अध्ययन जो ब्लैक स्वान घटनाओं के दौरान शेयरों को नकद और खजाना भंडार में बदलते हैं।",
    contentEn: `When black swan events trigger market panic, traditional stop-loss orders suffer from slippage and delay. AI Capital's Volatility Shield monitors global order book liquidity and credit spreads, instantly rotating high-beta equities into treasury reserves before severe drawdowns materialize.

Key Takeaways:
1. Predictive liquidity indicators detect credit contraction 48 hours prior to retail panic.
2. Dynamic allocation shifts lock in gains accrued during bull market cycles.
3. Automated cash buffer building provides dry powder to buy market bottoms cleanly.`,
    contentHi: `जब ब्लैक स्वान घटनाएं बाजार में घबराहट पैदा करती हैं, तो पारंपरिक स्टॉप-लॉस ऑर्डर में देरी होती है। एआई कैपिटल का वोलेटिलिटी शील्ड वैश्विक ऑर्डर बुक तरलता और क्रेडिट स्प्रेड की निगरानी करता है, जिससे भारी गिरावट से पहले शेयरों को नकद में बदल दिया जाता है।

मुख्य बातें:
1. भविष्यवाणी करने वाले तरलता संकेतक खुदरा घबराहट से 48 घंटे पहले क्रेडिट संकुचन का पता लगाते हैं।
2. गतिशील आवंटन परिवर्तन तेजी के चक्र के दौरान अर्जित लाभ को सुरक्षित करते हैं।
3. स्वचालित नकद बफर बाजार के निचले स्तर को खरीदने के लिए धन प्रदान करता है।`
  }
];

const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [blogCategory, setBlogCategory] = useState<string>('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.fade-in-section');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => {
      obs.observe(el);
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible');
    });
    return () => els.forEach(el => obs.unobserve(el));
  }, []);

  const filteredBlogs = blogsData.filter(b => blogCategory === 'All' || b.category === blogCategory);

  const t = {
    en: {
      nav: ['Home', 'About', 'Services', 'Investment', 'Blogs', 'Pricing'],
      heroTitle: "Intelligent Wealth Management for the Modern Investor",
      heroSub: "Harness AI-driven algorithms, real-time market insights, and personalized strategies to grow your portfolio with confidence.",
      getStarted: "Get Started",
      signIn: "Sign In",
      whyTitle: "Why Choose AI Capital Investment?",
      whySub: "Smarter Investing, Powered by AI",
      feat1Title: "AI Portfolio Optimization",
      feat1Desc: "Advanced algorithms to maximize returns and minimize risk based on real-time market dynamics.",
      feat2Title: "Risk Management",
      feat2Desc: "Real-time risk assessment and automated balancing to protect your investments at every step.",
      feat3Title: "Real-time Analytics",
      feat3Desc: "Live market data streams, predictive analytics, and instant portfolio insights at your fingertips.",
      feat4Title: "Personalized Strategies",
      feat4Desc: "Custom investment portfolios tailored exactly to your financial goals and personal timeline.",
      metrics1: "Assets Managed",
      metrics2: "Active Investors",
      metrics3: "Average Returns",
      svcTitle: "Our Services",
      svcSub: "Comprehensive Wealth Solutions",
      svc1Title: "Wealth Management",
      svc1Desc: "Holistic portfolio management to grow and preserve your wealth for generations.",
      svc2Title: "Investment Advisory",
      svc2Desc: "Expert AI-guided advisory services tailored to your unique investment profile.",
      svc3Title: "Retirement Planning",
      svc3Desc: "Secure your retirement lifestyle with intelligent, AI-powered long-term strategies.",
      blogsTitle: "Market Research & AI Wealth Blogs",
      blogsSub: "Stay informed with institutional market insights, tax optimization strategies, and algorithmic wealth research.",
      footerSub: "Next-generation financial solutions leveraging intelligent systems to grow your wealth.",
      copyright: "© 2026 AI Capital Investment. All rights reserved."
    },
    hi: {
      nav: ['मुख्य पृष्ठ', 'हमारे बारे में', 'सेवाएं', 'निवेश', 'ब्लॉग व लेख', 'मूल्य निर्धारण'],
      heroTitle: "आधुनिक निवेशकों के लिए एआई-संचालित बुद्धिमान धन प्रबंधन",
      heroSub: "विश्वास के साथ अपने पोर्टफोलियो को बढ़ाने के लिए AI-संचालित एल्गोरिदम, वास्तविक समय बाजार अंतर्दृष्टि और व्यक्तिगत रणनीतियों का उपयोग करें।",
      getStarted: "शुरू करें",
      signIn: "साइन इन करें",
      whyTitle: "एआई कैपिटल इन्वेस्टमेंट क्यों चुनें?",
      whySub: "AI द्वारा संचालित अधिक समझदारी से निवेश",
      feat1Title: "एआई पोर्टफोलियो अनुकूलन",
      feat1Desc: "वास्तविक समय के बाजार गतिकी के आधार पर रिटर्न को अधिकतम करने और जोखिम को कम करने के लिए उन्नत एल्गोरिदम।",
      feat2Title: "जोखिम प्रबंधन",
      feat2Desc: "हर कदम पर आपके निवेश की सुरक्षा के लिए वास्तविक समय जोखिम मूल्यांकन और स्वचालित रीबैलेंसिंग।",
      feat3Title: "वास्तविक समय विश्लेषण",
      feat3Desc: "लाइव मार्केट डेटा स्ट्रीम, भविष्यवाणियां और आपकी उंगलियों पर तुरंत पोर्टफोलियो अंतर्दृष्टि।",
      feat4Title: "व्यक्तिगत रणनीतियां",
      feat4Desc: "आपके वित्तीय लक्ष्यों और व्यक्तिगत समय सीमा के अनुसार तैयार किए गए कस्टमाइज्ड पोर्टफोलियो।",
      metrics1: "प्रबंधित संपत्तियां",
      metrics2: "सक्रिय निवेशक",
      metrics3: "औसत लाभ",
      svcTitle: "हमारी सेवाएं",
      svcSub: "व्यापक धन समाधान",
      svc1Title: "धन प्रबंधन",
      svc1Desc: "पीढ़ियों के लिए आपकी संपत्ति को बढ़ाने और संरक्षित करने के लिए समग्र पोर्टफोलियो प्रबंधन।",
      svc2Title: "निवेश सलाहकार सेवाएं",
      svc2Desc: "आपकी अनूठी निवेश प्रोफ़ाइल के अनुसार विशेषज्ञ एआई-निर्देशित सलाहकार सेवाएं।",
      svc3Title: "सेवानिवृत्ति योजना",
      svc3Desc: "बुद्धिमान, एआई-संचालित दीर्घकालिक रणनीतियों के साथ अपनी सेवानिवृत्ति जीवन शैली को सुरक्षित करें।",
      blogsTitle: "बाजार अनुसंधान एवं एआई वेल्थ लेख",
      blogsSub: "संस्थागत बाजार अंतर्दृष्टि, कर अनुकूलन रणनीतियों और एल्गोरिदम अनुसंधान से सूचित रहें।",
      footerSub: "आपकी संपत्ति को बढ़ाने के लिए बुद्धिमान प्रणालियों का लाभ उठाने वाले अगली पीढ़ी के वित्तीय समाधान।",
      copyright: "© 2026 एआई कैपिटल इन्वेस्टमेंट। सर्वाधिकार सुरक्षित।"
    }
  }[language];

  return (
    <div className="lp-wrapper">
      <ParticleBackground />

      {/* ── Header ────────────────────────────────────────────────── */}
      <header className="lp-header">
        <div className="lp-container lp-header-inner">
          <div className="logo">
            <div className="logo-symbol">AI</div>
            <div className="logo-text">AI Capital<span>Investment</span></div>
          </div>

          <nav className={`lp-nav-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
            <ul className="lp-nav">
              {['home', 'about', 'services', 'investment', 'blogs', 'pricing'].map((id, idx) => (
                <li key={id} onClick={() => setMobileMenuOpen(false)}>
                  <a href={`#${id}`}>{t.nav[idx]}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lp-header-actions">
            {/* Language Switcher Pill */}
            <button
              onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
              className="btn btn-green-outline"
              style={{ fontSize: '0.78rem', padding: '5px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Globe size={14} /> {language === 'en' ? 'हिंदी (Hindi)' : 'English'}
            </button>
            
            <button className="btn btn-green-outline" onClick={() => onNavigate('login')}>{t.signIn}</button>
            <button className="btn btn-gold" onClick={() => onNavigate('signup')}>{t.getStarted}</button>
            
            {/* Mobile Hamburger Button */}
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="lp-hero" id="home">
        <div className="lp-container lp-hero-inner">
          <div className="lp-hero-text fade-in-section">
            <h1 className="lp-hero-title">
              {t.heroTitle}
            </h1>
            <p className="lp-hero-sub">
              {t.heroSub}
            </p>
            <div className="lp-hero-cta-row">
              <button className="btn btn-gradient-started" onClick={() => onNavigate('signup')}>
                {t.getStarted}
              </button>
              <button className="btn btn-green-outline" onClick={() => onNavigate('login')}>
                {t.signIn}
              </button>
            </div>
          </div>
          <div className="lp-hero-graphic fade-in-section">
            <HeroCanvas />
          </div>
        </div>
      </section>

      {/* ── Why Choose ────────────────────────────────────────────── */}
      <section className="lp-section fade-in-section" id="about">
        <div className="lp-container">
          <h2 className="lp-section-title">{t.whyTitle}</h2>
          <p className="lp-section-sub">{t.whySub}</p>
          <div className="lp-features-grid">
            {[
              { Icon: Cpu,        label: t.feat1Title, desc: t.feat1Desc, gold: true  },
              { Icon: ShieldCheck,label: t.feat2Title, desc: t.feat2Desc, gold: false },
              { Icon: TrendingUp, label: t.feat3Title, desc: t.feat3Desc, gold: true  },
              { Icon: UserCheck,  label: t.feat4Title, desc: t.feat4Desc, gold: false },
            ].map(({ Icon, label, desc, gold }) => (
              <div key={label} className={`glass-card lp-feature-card ${gold ? 'gold-border' : 'green-border'}`}>
                <div className={`lp-feat-icon ${gold ? 'gold' : 'green'}`}><Icon size={22} /></div>
                <h3>{label}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics ───────────────────────────────────────────────── */}
      <section className="lp-metrics fade-in-section">
        <div className="lp-container lp-metrics-inner">
          {[
            { Icon: Wallet,  val: '$2.5B+', label: t.metrics1, gold: true  },
            { Icon: Users,   val: '50K+',   label: t.metrics2, gold: false },
            { Icon: Percent, val: '18.4%',  label: t.metrics3, gold: true  },
          ].map(({ Icon, val, label, gold }) => (
            <div key={label} className="lp-metric-item">
              <div className={`lp-metric-icon ${gold ? 'gold' : 'green'}`}><Icon size={22} /></div>
              <div>
                <h4 className="lp-metric-val">{val}</h4>
                <p className="lp-metric-label">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────── */}
      <section className="lp-section fade-in-section" id="services">
        <div className="lp-container">
          <h2 className="lp-section-title">{t.svcTitle}</h2>
          <p className="lp-section-sub">{t.svcSub}</p>
          <div className="lp-services-grid">
            {[
              { Icon: PieChart,   label: t.svc1Title, desc: t.svc1Desc, gold: true  },
              { Icon: Briefcase,  label: t.svc2Title, desc: t.svc2Desc, gold: false },
              { Icon: Award,      label: t.svc3Title, desc: t.svc3Desc, gold: false },
            ].map(({ Icon, label, desc, gold }) => (
              <div key={label} className={`glass-card lp-service-card ${gold ? 'gold-border' : 'green-border'}`}>
                <div className={`lp-svc-icon ${gold ? 'gold' : 'green'}`}><Icon size={22} /></div>
                <h3>{label}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blogs & Market Research Section ──────────────────────── */}
      <section className="lp-section fade-in-section" id="blogs">
        <div className="lp-container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 className="lp-section-title">{t.blogsTitle}</h2>
            <p className="lp-section-sub" style={{ maxWidth: '650px', margin: '0 auto' }}>{t.blogsSub}</p>
          </div>

          {/* Category Filter Pills */}
          <div className="blog-filters" style={{ justifyContent: 'center', marginBottom: '28px' }}>
            {['All', 'AI Wealth', 'Tax Strategy', 'Crypto Yields', 'Risk Management'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setBlogCategory(cat)}
                className={`blog-filter-btn ${blogCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blogs Grid */}
          <div className="blogs-grid">
            {filteredBlogs.map(b => (
              <div key={b.id} className="glass-card blog-card gold-border" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="blog-thumbnail" style={{ background: 'linear-gradient(135deg, rgba(6, 18, 10, 0.95), rgba(2, 8, 4, 0.98))', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={36} style={{ color: 'var(--color-gold)' }} />
                </div>
                <div className="blog-card-content" style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="blog-badge">{b.category}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {b.readTime}
                    </span>
                  </div>

                  <h3 className="blog-card-title" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                    {language === 'en' ? b.titleEn : b.titleHi}
                  </h3>

                  <p className="blog-card-abstract" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px', flex: 1 }}>
                    {language === 'en' ? b.excerptEn : b.excerptHi}
                  </p>

                  <div className="blog-meta-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{b.date}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedBlog(b)}
                      className="blog-read-link"
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      {language === 'en' ? 'Read Article' : 'लेख पढ़ें'} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Blog Modal Overlay ───────────────────────── */}
      {selectedBlog && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(2, 8, 4, 0.85)', backdropFilter: 'blur(12px)',
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            maxWidth: '680px', width: '100%', maxHeight: '85vh', overflowY: 'auto',
            padding: '32px', position: 'relative', border: '1px solid rgba(212, 175, 55, 0.3)',
            background: 'rgba(6, 18, 10, 0.96)', boxShadow: '0 0 50px rgba(212, 175, 55, 0.15)'
          }}>
            <button
              onClick={() => setSelectedBlog(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'transparent', border: 'none', color: '#62777d',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <X size={22} />
            </button>

            <div style={{ marginBottom: '16px' }}>
              <span className="blog-badge" style={{ marginBottom: '8px' }}>{selectedBlog.category}</span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: '10px' }}>
                {language === 'en' ? selectedBlog.titleEn : selectedBlog.titleHi}
              </h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span>✍️ {selectedBlog.author}</span>
                <span>📅 {selectedBlog.date}</span>
                <span>⏱️ {selectedBlog.readTime}</span>
              </div>
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px', padding: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)',
              lineHeight: 1.7, whitespace: 'pre-line'
            }}>
              {language === 'en' ? selectedBlog.contentEn : selectedBlog.contentHi}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setSelectedBlog(null)}
                className="btn btn-gold"
                style={{ padding: '8px 24px', fontSize: '0.84rem' }}
              >
                {language === 'en' ? 'Close Reader' : 'बंद करें'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer-grid">
          <div className="lp-footer-brand">
            <div className="logo">
              <div className="logo-symbol">AI</div>
              <div className="logo-text">AI Capital<span>Investment</span></div>
            </div>
            <p>{t.footerSub}</p>
          </div>
          <div>
            <h5>Quick Links</h5>
            <ul className="lp-footer-links">
              {['home', 'about', 'services', 'blogs'].map((id, idx) => (
                <li key={id}><a href={`#${id}`}>{t.nav[idx]}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul className="lp-footer-links">
              <li>{t.svc1Title}</li>
              <li>{t.svc2Title}</li>
              <li>{t.svc3Title}</li>
            </ul>
          </div>
          <div>
            <h5>Contact Us</h5>
            <ul className="lp-footer-links"><li>info@aicapital.com</li><li>+1 (555) 123-4567</li><li>New York, NY</li></ul>
          </div>
          <div>
            <h5>Follow Us</h5>
            <div className="lp-social-row">
              {['𝕏','in','📸','f'].map(s => <a key={s} className="lp-social-icon" href="#">{s}</a>)}
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <div className="lp-container">
            <span>{t.copyright}</span>
            <div className="lp-footer-bottom-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
