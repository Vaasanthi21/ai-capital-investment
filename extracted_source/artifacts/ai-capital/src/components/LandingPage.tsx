import { useEffect } from 'react';
import { Cpu, ShieldCheck, TrendingUp, UserCheck, Wallet, Users, Percent, PieChart, Briefcase, Award } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import ParticleBackground from './ParticleBackground';

type View = 'landing' | 'login' | 'signup' | 'dashboard';

interface LandingPageProps {
  onNavigate: (v: View) => void;
}

const LandingPage = ({ onNavigate }: LandingPageProps) => {
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
          <nav>
            <ul className="lp-nav">
              {['Home','About','Services','Investment','Pricing','Resources'].map(n => (
                <li key={n}><a href={`#${n.toLowerCase()}`}>{n}</a></li>
              ))}
            </ul>
          </nav>
          <div className="lp-header-actions">
            <button className="btn btn-green-outline" onClick={() => onNavigate('login')}>Login</button>
            <button className="btn btn-gold"          onClick={() => onNavigate('signup')}>Sign Up</button>
          </div>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="lp-hero" id="home">
        <div className="lp-container lp-hero-inner">
          <div className="lp-hero-text fade-in-section">
            <h1 className="lp-hero-title">
              Intelligent Wealth Management<br />for the Modern Investor
            </h1>
            <p className="lp-hero-sub">
              Harness AI-driven algorithms, real-time market insights, and personalized
              strategies to grow your portfolio with confidence.
            </p>
            <div className="lp-hero-cta-row">
              <button className="btn btn-gradient-started" onClick={() => onNavigate('signup')}>
                Get Started
              </button>
              <button className="btn btn-green-outline" onClick={() => onNavigate('login')}>
                Sign In
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
          <h2 className="lp-section-title">Why Choose AI Capital Investment?</h2>
          <p className="lp-section-sub">Smarter Investing, Powered by AI</p>
          <div className="lp-features-grid">
            {[
              { Icon: Cpu,        label: 'AI Portfolio Optimization', desc: 'Advanced algorithms to maximize returns and minimize risk based on real-time market dynamics.',        gold: true  },
              { Icon: ShieldCheck,label: 'Risk Management',           desc: 'Real-time risk assessment and automated balancing to protect your investments at every step.',          gold: false },
              { Icon: TrendingUp, label: 'Real-time Analytics',       desc: 'Live market data streams, predictive analytics, and instant portfolio insights at your fingertips.',   gold: true  },
              { Icon: UserCheck,  label: 'Personalized Strategies',   desc: 'Custom investment portfolios tailored exactly to your financial goals and personal timeline.',          gold: false },
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
            { Icon: Wallet,  val: '$2.5Q+', label: 'Assets Managed',   gold: true  },
            { Icon: Users,   val: '50K+',   label: 'Active Investors',  gold: false },
            { Icon: Percent, val: '15%+',   label: 'Average Returns',   gold: true  },
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
          <h2 className="lp-section-title">Our Services</h2>
          <p className="lp-section-sub">Comprehensive Wealth Solutions</p>
          <div className="lp-services-grid">
            {[
              { Icon: PieChart,   label: 'Wealth Management',   desc: 'Holistic portfolio management to grow and preserve your wealth for generations.',         gold: true  },
              { Icon: Briefcase,  label: 'Investment Advisory', desc: 'Expert AI-guided advisory services tailored to your unique investment profile.',           gold: false },
              { Icon: Award,      label: 'Retirement Planning', desc: 'Secure your retirement lifestyle with intelligent, AI-powered long-term strategies.',      gold: false },
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

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer-grid">
          <div className="lp-footer-brand">
            <div className="logo">
              <div className="logo-symbol">AI</div>
              <div className="logo-text">AI Capital<span>Investment</span></div>
            </div>
            <p>Next-generation financial solutions leveraging intelligent systems to grow your wealth.</p>
          </div>
          <div>
            <h5>Quick Links</h5>
            <ul className="lp-footer-links"><li>Home</li><li>About</li><li>Investment</li><li>Pricing</li></ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul className="lp-footer-links"><li>Wealth Management</li><li>Investment Advisory</li><li>Retirement Planning</li><li>Tax Optimization</li></ul>
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
            <span>© 2026 AI Capital Investment. All rights reserved.</span>
            <div className="lp-footer-bottom-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
