import { useState, useEffect } from 'react';
import { 
  Sparkles, Settings, Wallet, BarChart3, Search, ChevronRight, X, ArrowLeft, ArrowUpRight, Globe, Menu
} from 'lucide-react';
import ParticleBackground from './ParticleBackground';

type View = 'landing' | 'login' | 'signup' | 'otp-verify' | 'payment' | 'forgot-password' | 'dashboard' | 'blogs';

interface StandaloneBlogPageProps {
  onNavigate: (v: View) => void;
}

interface BlogArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  abstract: string;
  icon: any;
  gold: boolean;
  url: string;
  image: string;
  imageAlt: string;
  content: string[];
}

export const standaloneBlogArticles: BlogArticle[] = [
  {
    id: 'ai-wealth-management-revolution',
    title: 'AI-Driven Asset Allocation: Outperforming Inflation & Market Volatility in 2026',
    category: 'AI & Tech',
    author: 'Dr. Aris Thorne (Chief Quantitative Strategist)',
    date: 'July 20, 2026',
    readTime: '6 min read (460 words)',
    abstract: 'How graduates and first-time investors can leverage AI asset allocation, automated rebalancing, and risk shields to build financial resilience against market inflation.',
    icon: <Sparkles size={32} />,
    gold: false,
    url: 'https://www.investopedia.com/financial-advisor/how-ai-is-changing-wealth-management/',
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    imageAlt: "AI Quantitative Stock Chart & Financial Trading Analytics Dashboard",
    content: [
      'If you are just starting your financial journey, AI-Driven Asset Allocation: Outperforming Inflation & Market Volatility in 2026 may sound advanced or even intimidating. But the idea is actually simple: use smarter technology to build, monitor, and adjust your portfolio so your money has a better chance of keeping up with inflation while reducing the emotional mistakes that often happen during market swings.',
      'For graduates and first-time investors, that matters a lot. You are balancing career decisions, rising living costs, and uncertainty about what the market will do next. The good news is that AI investing tools are becoming more practical, more accessible, and easier to understand.',
      '### Why 2026 Feels Challenging for Beginner Investors',
      'Inflation has changed how people think about savings. Leaving money idle can feel safe in the short term, but over time, inflation can quietly reduce purchasing power. At the same time, market volatility can make investing feel risky, especially when headlines shift daily.',
      'That is exactly why AI-Driven Asset Allocation is gaining attention. Instead of relying only on static portfolios or emotional decision-making, AI-powered systems can respond faster to changing conditions.',
      '### What AI-Driven Asset Allocation Actually Means',
      'At its core, AI-Driven Asset Allocation in 2026 means using machine learning and automated decision systems to decide how much of your portfolio should be in different asset classes, such as equities, bonds, cash alternatives, or inflation-sensitive investments. Think of it like having a smart co-pilot—it does not just set a portfolio once and forget it. It keeps watching the road.',
      '### Multi-Agent Neural Networks in Simple Terms',
      'Instead of one model doing everything, multiple AI agents specialize in different tasks: monitoring macroeconomic signals, tracking market volatility, identifying portfolio drift, spotting tax-saving opportunities, and stress-testing risk scenarios.',
      '### 24/7 Rebalancing & Volatility Shield Risk Controls',
      'Markets do not wait for you to finish work or sleep. That is why automated 24/7 rebalancing is valuable. If one part of your portfolio grows too large or risk conditions change sharply, the system can execute adjustments based on predefined rules. A Volatility Shield can monitor market stress, correlation changes, and sudden drawdown risk to keep your risk aligned with your long-term goals.',
      '### Step-by-Step Guide for Beginner Investors',
      'Step 1: Start with your life goals, not market headlines. Step 2: Define your risk level honestly using AI risk scoring. Step 3: Use automation for consistency without daily stress. Step 4: Review periodically without obsessing over short-term charts.',
      '### Key Institutional Takeaways:',
      '• AI asset allocation replaces static models with 24/7 continuous market monitoring and risk-adjusted rebalancing.\n• Multi-agent neural networks specialize in tracking volatility, tax-loss harvesting, and macroeconomic signals.\n• Automated Volatility Shields help protect capital during market drawdowns while keeping up with inflation.\n• Ideal for graduates and beginner investors seeking disciplined, low-friction, long-term wealth building.'
    ]
  },
  {
    id: 'tax-loss-harvesting-guide',
    title: 'Tax-Loss Harvesting Guide: Maximizing Net Investment Returns',
    category: 'Tax Strategy',
    author: 'Elena Rostova, CFA (Senior Tax Strategy Director)',
    date: 'July 18, 2026',
    readTime: '9 min read (650 words)',
    abstract: 'A comprehensive deep dive into automated tax-loss harvesting algorithms, wash-sale compliance rules, asset substitution strategies, and multi-year tax alpha optimization for accredited portfolios.',
    icon: <Settings size={32} />,
    gold: true,
    url: 'https://www.investopedia.com/terms/t/tax-lossharvesting.asp',
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Automated Tax Loss Harvesting & Financial Wealth Tax Shield Analytics",
    content: [
      'Tax-loss harvesting (TLH) is widely recognized by institutional asset managers and private family offices as one of the most reliable quantitative methods for generating net portfolio tax alpha. By continuously monitoring portfolio positions 24 hours a day, automated trading algorithms identify securities trading at a temporary unrealized loss and systematically harvest those losses to offset realized capital gains obligations.',
      '### 1. Navigating Complex IRS Wash-Sale Regulations',
      'Executing tax-loss harvesting manually presents substantial regulatory compliance risks under IRS Section 1091 wash-sale rules. A wash sale occurs when an investor sells a security at a loss and purchases a substantially identical security within a 60-day window (30 days before or 30 days after the sale).',
      'Automated AI execution engines resolve this hurdle by executing instant, wash-sale-compliant swaps into correlated proxy tracking funds (such as substituting an S&P 500 ETF with a Total US Stock Market Index ETF). This maintains target equity market exposure while securing legally compliant tax write-offs.',
      '### 2. Offsetting Realized Gains, Dividends & Ordinary Income',
      'Harvested capital losses can be used to directly offset short-term capital gains (taxed at higher ordinary income rates), long-term capital gains, and taxable dividend distributions.',
      'Furthermore, up to $3,000 in excess harvested net losses can be deducted against ordinary salary income each tax year, with remaining unused losses carried forward indefinitely into future tax years. Over a 10-year compounding horizon, continuous tax harvesting adds an estimated 1.2% to 1.8% in net annual compound return.',
      '### 3. Continuous Year-Round Harvesting vs. Year-End Execution',
      'Traditional wealth management firms typically conduct tax-loss harvesting once a year in December. However, market pullbacks and intraday volatility occur continuously across all twelve months.',
      'Algorithmic tax engines scan portfolio holdings daily, locking in tax credits during temporary market pullbacks in April, August, or October. Empirical backtesting demonstrates that daily automated scanning captures up to 3x more tax credits than annual year-end sweeps.',
      '### 4. Direct Indexing & Tax-Optimized Asset Location',
      'Direct indexing allows investors to own individual underlying benchmark equities rather than pre-packaged index funds. This creates hundreds of micro-harvesting opportunities within single stock components even during overall bull markets.',
      '### Key Institutional Takeaways:',
      '• Algorithmic execution continuously tracks 60-day wash-sale windows to guarantee strict IRS regulatory compliance.\n• Realized tax losses offset short-term gains, dividend income, and up to $3,000 in ordinary annual income.\n• Systematic year-round tax-loss harvesting adds an estimated 1.2% to 1.8% in net annual compounding performance.\n• Daily automated intraday scans capture up to 3x more tax-loss credits than traditional year-end rebalancing.'
    ]
  },
  {
    id: 'digital-assets-crypto-mechanics',
    title: 'Understanding Digital Assets & Cryptocurrency Market Mechanics',
    category: 'Crypto',
    author: 'Marcus Vance (Director of Digital Assets)',
    date: 'July 15, 2026',
    readTime: '8 min read (600 words)',
    abstract: 'Evaluating non-correlated institutional digital asset allocations, proof-of-stake yield engines, and dynamic volatility-weighted position budgeting.',
    icon: <Wallet size={32} />,
    gold: true,
    url: 'https://www.investopedia.com/terms/c/cryptocurrency.asp',
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Digital Assets Vault & Algorithmic Cryptocurrency Staking Yield Analytics",
    content: [
      'Digital assets such as Bitcoin (BTC) and Ethereum (ETH) have evolved from niche speculative instruments into recognized global institutional asset classes. Multi-asset quantitative fund managers utilize controlled digital asset allocations to capture non-correlated alpha alongside traditional equity indices, sovereign bonds, and physical commodities.',
      '### 1. Macro Economic Hedging & Non-Correlated Returns',
      'Sovereign debt expansion, global central bank balance sheet growth, and monetary inflation have highlighted the strategic utility of scarce digital assets. Bitcoin operates with a hard-capped supply of 21 million units, offering programmatic scarcity that exhibits low long-term correlation to traditional sovereign credit markets.',
      'Integrating a 3% to 5% allocation into a diversified portfolio improves overall portfolio Sharpe ratios and tail-risk resilience.',
      '### 2. Volatility-Weighted Position Budgeting',
      'Because digital assets exhibit higher historical price volatility than traditional equities, quantitative portfolio models deploy dynamic volatility-weighted position budgeting rather than static dollar allocations.',
      'When digital asset volatility spikes above predefined risk thresholds, automated algorithms rebalance surplus gains into liquid short-term treasury reserves. Conversely, during market consolidation phases, the system systematically re-accumulates target positions.',
      '### 3. Proof-of-Stake Yield Accumulation & Validator Staking',
      'Beyond capital appreciation, proof-of-stake blockchain protocols enable institutional holders to generate native validator staking yields (typically 4% to 6% APY) on underlying Ethereum reserves.',
      'Algorithmic smart vaults route staking rewards directly back into compounding principal balances while utilizing liquid staking derivative tokens to maintain immediate portfolio liquidity.',
      '### 4. Qualified Institutional Custody & Cold-Storage Security',
      'Securing institutional digital assets requires multi-signature cryptographic key architecture, hardware security modules (HSM), and SEC-compliant qualified custodians. Bank-grade offline cold storage vaults safeguard private keys against cyber threats.',
      '### Key Institutional Takeaways:',
      '• Non-correlated digital asset allocations enhance overall portfolio Sharpe ratios and macro inflation defense.\n• Volatility-weighted position budgeting automatically protects principal capital during digital market sell-offs.\n• Institutional qualified cold-storage custody ensures bank-grade security and full insurance coverage.\n• Native Proof-of-Stake validator rewards generate 4% - 6% APY in automated compounding yield.'
    ]
  },
  {
    id: 'sec-investor-alerts-risk-guidance',
    title: 'U.S. SEC Investor Alerts & Regulatory Risk Management Guidance',
    category: 'Macro Strategy',
    author: 'Sarah Jenkins (Regulatory & Compliance Lead)',
    date: 'July 10, 2026',
    readTime: '7 min read (580 words)',
    abstract: 'Official regulatory guidelines published by the U.S. SEC on fiduciary advisor mandates, transparent quantitative disclosures, and qualified independent asset custody.',
    icon: <BarChart3 size={32} />,
    gold: false,
    url: 'https://www.sec.gov/investor/alerts',
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "SEC Regulatory Compliance & Legal Fiduciary Oversight",
    content: [
      'The U.S. Securities and Exchange Commission (SEC) regularly issues investor alerts, regulatory bulletins, and risk guidance to safeguard retail and accredited investor capital. Navigating regulatory compliance frameworks is paramount when selecting automated quantitative investment platforms and wealth advisory services.',
      '### 1. Fiduciary Duties Under the Investment Advisers Act',
      'Under the Investment Advisers Act of 1940, SEC-registered investment advisors (RIAs) are held to strict fiduciary standards. This legal mandate obligates advisory firms to act with uncompromised loyalty and prudence, placing client financial interests above firm profits.',
      'Fiduciaries must provide complete transparency regarding algorithmic decision rules, fee schedules, and execution routing.',
      '### 2. Independent Qualified Custody & Client Asset Isolation',
      'SEC Rule 206(4)-2 (the Custody Rule) requires that client investment funds and securities must be maintained with independent qualified custodians—such as SEC-registered broker-dealers or FDIC-insured banks—rather than held directly on an advisory firm balance sheet.',
      'Qualified custody ensures client funds remain segregated, covered by SIPC insurance up to $500,000, and protected from corporate operational risks.',
      '### 3. Algorithmic Transparency & Model Backtest Disclosures',
      'Regulatory guidance emphasizes that AI-driven quantitative investment platforms must provide clear disclosures regarding model backtesting methodologies, execution slippage estimates, and historical drawdown metrics.',
      '### 4. Verifying Advisor Credentials & CRD Registrations',
      'Investors can independently verify an advisory firm registration status, disciplinary history, and key executive disclosures using the SEC Investment Adviser Public Disclosure (IAPD) database and FINRA BrokerCheck system.',
      '### Key Institutional Takeaways:',
      '• SEC regulatory alerts provide authoritative benchmarks for verifying investment advisor registrations and credentials.\n• Fiduciary mandates legally compel registered advisors to prioritize client financial interests above all else.\n• Independent qualified custody isolates client assets in SIPC-insured brokerages protected from firm liabilities.\n• Verifying CRD registration numbers via the SEC IAPD database protects investors against unauthorized platforms.'
    ]
  },
  {
    id: 'quant-machine-learning-alpha',
    title: 'Machine Learning in Portfolio Construction: Neural Network Models for 2026',
    category: 'AI & Tech',
    author: 'Dr. David Chen (Head of AI Research)',
    date: 'July 05, 2026',
    readTime: '8 min read (520 words)',
    abstract: 'Exploring deep learning architectures, Transformer models for sequence prediction, and automated factor attribution in modern quantitative portfolio construction.',
    icon: <Sparkles size={32} />,
    gold: true,
    url: 'https://www.investopedia.com/articles/financial-theory/08/quantitative-analysis.asp',
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Neural Network Quantitative Trading System Analytics Dashboard",
    content: [
      'Quantitative finance is undergoing a fundamental transformation as traditional mean-variance optimization gives way to deep neural network architectures and reinforcement learning execution agents.',
      '### 1. Transformer Architectures in Financial Time Series',
      'Attention-based Transformer neural networks excel at extracting long-term sequential dependencies from high-frequency order book dynamics and macroeconomic indicator releases.',
      '### 2. Multi-Factor Risk Attribution & Dynamic Beta Control',
      'Machine learning algorithms decompose asset returns into dynamic factor exposures (Value, Momentum, Quality, Volatility), automatically adjusting portfolio beta based on macroeconomic regime indicators.',
      '### Key Institutional Takeaways:',
      '• Transformer models capture multi-timeframe signal dependencies across non-linear market regimes.\n• Deep learning factor attribution prevents uncompensated style bias in quantitative stock selection.'
    ]
  },
  {
    id: 'fed-interest-rate-mechanics',
    title: 'Federal Reserve Monetary Policy & Interest Rate Risk Management in 2026',
    category: 'Macro Strategy',
    author: 'Robert Sterling (Chief Macro Economist)',
    date: 'June 28, 2026',
    readTime: '9 min read (610 words)',
    abstract: 'How central bank rate decisions, yield curve inversions, and quantitative tightening impact fixed income duration and multi-asset portfolio positioning.',
    icon: <BarChart3 size={32} />,
    gold: false,
    url: 'https://www.investopedia.com/terms/f/federalreservebank.asp',
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Federal Reserve Interest Rate & Yield Curve Volatility Chart",
    content: [
      'Federal Reserve monetary policy stance dictates cross-asset liquidity conditions, real interest rate trajectories, and fixed-income duration strategies.',
      '### 1. Yield Curve Dynamics & Recessional Indicators',
      'Monitoring 2-year and 10-year Treasury yield spread inversion cycles provides essential leading signals for defensive fixed-income allocation adjustments.',
      '### Key Institutional Takeaways:',
      '• Short-duration Treasury ladders protect liquid yield while preserving capital for strategic pullbacks.'
    ]
  },
  {
    id: 'defi-yield-farming-security',
    title: 'DeFi Liquidity Pools & Smart Contract Risk Defense in Institutional Portfolios',
    category: 'Crypto',
    author: 'Marcus Vance (Director of Digital Assets)',
    date: 'June 20, 2026',
    readTime: '7 min read (490 words)',
    abstract: 'Evaluating decentralized protocol liquidity yields, automated market maker (AMM) impermanent loss mitigation, and smart contract audit standards.',
    icon: <Wallet size={32} />,
    gold: true,
    url: 'https://www.investopedia.com/decentralized-finance-defi-4846382',
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80",
    imageAlt: "DeFi Liquidity Vault & Decentralized Staking Tokens",
    content: [
      'Decentralized liquidity protocols offer attractive native yield opportunities for digital asset portfolios, provided rigorous formal verification and smart contract audit procedures are enforced.',
      '### 1. Mitigating Impermanent Loss in AMM Pools',
      'Concentrated liquidity ranges and delta-neutral hedging strategies effectively stabilize yield generation in volatile decentralized market pairs.',
      '### Key Institutional Takeaways:',
      '• Institutional smart vaults utilize formal verification to audit yield protocols before allocating assets.'
    ]
  },
  {
    id: 'estate-planning-wealth-transfer',
    title: 'AI-Optimized Wealth Transfer & Intergenerational Estate Preservation',
    category: 'Tax Strategy',
    author: 'Elena Rostova, CFA (Senior Tax Strategy Director)',
    date: 'June 12, 2026',
    readTime: '8 min read (540 words)',
    abstract: 'Structuring grantor retained annuity trusts (GRATs), Dynasty Trusts, and automated step-up in basis optimizations for multi-generational wealth preservation.',
    icon: <Settings size={32} />,
    gold: false,
    url: 'https://www.investopedia.com/estate-planning-4689720',
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Estate Planning Keys & Family Wealth Transfer",
    content: [
      'Intergenerational wealth preservation requires integrated estate planning algorithms that harmonize capital gains tax minimization, gift tax exemptions, and legacy trust structures.',
      '### Key Institutional Takeaways:',
      '• Strategic trust structuring shields multi-generational assets from unnecessary transfer tax liabilities.'
    ]
  },
  {
    id: 'rebalancing-drift-algorithms',
    title: 'Portfolio Drift Analysis & Dynamic Rebalancing Thresholds',
    category: 'AI & Tech',
    author: 'Dr. Aris Thorne (Chief Quantitative Strategist)',
    date: 'June 02, 2026',
    readTime: '6 min read (440 words)',
    abstract: 'Optimizing asset allocation drift tolerances, transaction cost trade-offs, and volatility-triggered rebalancing algorithms.',
    icon: <Sparkles size={32} />,
    gold: false,
    url: 'https://www.investopedia.com/terms/r/rebalancing.asp',
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Quantitative Rebalancing Analytics Dashboard",
    content: [
      'Continuous portfolio rebalancing ensures that asset weightings remain strictly aligned with target risk profiles while minimizing unnecessary turnover and execution drag.',
      '### Key Institutional Takeaways:',
      '• Dynamic band rebalancing outperforms static calendar rebalancing by minimizing transaction friction.'
    ]
  }
];

export default function StandaloneBlogPage({ onNavigate }: StandaloneBlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [copiedArticleUrl, setCopiedArticleUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/blogs/') || path.includes('/blog/')) {
      const articleId = path.split('/blog/')[1] || path.split('/blogs/')[1];
      const match = standaloneBlogArticles.find(a => a.id === articleId);
      if (match) setActiveArticle(match);
    }
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const openArticle = (article: BlogArticle) => {
    setActiveArticle(article);
    const targetPath = `/blogs/${article.id}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ articleId: article.id }, '', targetPath);
    }
  };

  const closeArticle = () => {
    setActiveArticle(null);
    if (window.location.pathname !== '/blogs') {
      window.history.pushState(null, '', '/blogs');
    }
  };

  const categories = ['All', 'AI & Tech', 'Crypto', 'Macro Strategy', 'Tax Strategy'];
  
  const filteredArticles = standaloneBlogArticles.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = (selectedCategory === 'All' && !searchQuery) ? standaloneBlogArticles[0] : null;
  const gridArticles = featuredArticle ? filteredArticles.filter(art => art.id !== featuredArticle.id) : filteredArticles;

  return (
    <div className="lp-wrapper">
      <ParticleBackground />

      {/* Schema.org Blog & Article JSON-LD Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "AI Capital Official Research & Insights Directory",
            "url": "https://ai-capital-investment.vercel.app/blogs",
            "description": "Institutional quantitative research reports, tax alpha strategies, digital asset yield mechanics, and regulatory compliance guidance.",
            "publisher": {
              "@type": "Organization",
              "name": "AI Capital Investment LLC",
              "logo": "https://ai-capital-investment.vercel.app/logo.png"
            },
            "blogPost": standaloneBlogArticles.map(b => ({
              "@type": "BlogPosting",
              "headline": b.title,
              "image": b.image,
              "datePublished": "2026-07-20",
              "author": {
                "@type": "Person",
                "name": b.author
              },
              "url": `https://ai-capital-investment.vercel.app/blogs/${b.id}`,
              "description": b.abstract
            }))
          })
        }} 
      />

      {/* ── Standalone Page Header (Identical to Main Landing Header) ─────────────── */}
      <header className="lp-header" style={{ position: 'relative', zIndex: 10 }}>
        <div className="lp-container lp-header-inner">
          <div className="logo" onClick={() => onNavigate('landing')} style={{ cursor: 'pointer' }}>
            <div className="logo-symbol">AI</div>
            <div className="logo-text">AI Capital<span>Investment</span></div>
          </div>

          <nav className={`lp-nav-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
            <ul className="lp-nav">
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>Home</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="/#about" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>About</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="/#services" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>Services</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="/#investment" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>Investment</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)} className="active">
                <a href="/blogs" onClick={(e) => { e.preventDefault(); onNavigate('blogs'); }} style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Blogs</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="/#faq" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>FAQ</a>
              </li>
              <li className="mobile-only-nav-item" style={{ marginTop: '10px', gap: '10px', width: '100%', justifyContent: 'center' }}>
                <button className="btn btn-gold" style={{ padding: '10px 24px', fontSize: '0.85rem', width: '100%' }} onClick={() => { setMobileMenuOpen(false); onNavigate('login'); }}>
                  Launch Web App / Sign In
                </button>
              </li>
            </ul>
          </nav>

          <div className="lp-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Language Switcher Pill */}
            <button
              onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
              className="btn btn-green-outline"
              style={{ fontSize: '0.72rem', padding: '4px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '3px' }}
            >
              <Globe size={12} /> {language === 'en' ? 'हिंदी' : 'EN'}
            </button>

            <button className="btn btn-green-outline" onClick={() => onNavigate('login')}>Sign In</button>

            {/* Mobile Hamburger Button */}
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ────────────────────────────────────────── */}
      <main className="lp-container" style={{ position: 'relative', zIndex: 10, paddingTop: '28px', paddingBottom: '60px', minHeight: 'calc(100vh - 200px)' }}>
        
        {/* Back Link & Search Controls Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <button 
            type="button"
            onClick={() => onNavigate('landing')}
            style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-secondary)', fontSize: '0.82rem', padding: '7px 16px', borderRadius: '20px',
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <ArrowLeft size={14} /> Back to Main Site
          </button>

          <div className="blog-search-wrapper" style={{ maxWidth: '380px', width: '100%' }}>
            <Search size={16} className="blog-search-icon" />
            <input 
              type="text"
              placeholder="Search research reports, topics, or authors..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="blog-search-input"
              style={{ background: 'rgba(0,0,0,0.6)', padding: '9px 14px 9px 38px', fontSize: '0.84rem' }}
            />
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="blog-filters" style={{ marginBottom: '24px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`blog-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              style={{ padding: '7px 18px', fontSize: '0.82rem' }}
            >
              {cat === 'All' ? '✨ All Insights' : cat === 'AI & Tech' ? '🤖 AI & Tech' : cat === 'Crypto' ? '🪙 Crypto' : cat === 'Macro Strategy' ? '📊 Macro Strategy' : '🛡️ Tax Strategy'}
            </button>
          ))}
        </div>

        {/* Blogs Grid & Hero Spotlight */}
        <div className="blogs-grid">
          {/* Hero Spotlight Featured Article */}
          {featuredArticle && (
            <div 
              className="blog-featured-spotlight"
              style={{
                gridColumn: '1 / -1',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                background: 'linear-gradient(135deg, rgba(8, 28, 16, 0.98) 0%, rgba(4, 16, 8, 0.95) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 32px rgba(212, 175, 55, 0.12)',
                marginBottom: '10px'
              }}
            >
              <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ background: 'rgba(212, 175, 55, 0.18)', color: 'var(--color-gold)', border: '1px solid rgba(212, 175, 55, 0.35)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                    ⭐ FEATURED REPORT
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--color-gold)', fontFamily: 'monospace', fontWeight: 600 }}>
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px', lineHeight: 1.3 }}>
                  {featuredArticle.title}
                </h2>

                <p style={{ fontSize: '0.88rem', color: '#c0d0d5', lineHeight: 1.55, marginBottom: '18px', borderLeft: '3px solid var(--color-gold)', paddingLeft: '12px' }}>
                  {featuredArticle.abstract}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>By {featuredArticle.author}</span> • <span style={{ color: 'var(--color-gold)' }}>{featuredArticle.date}</span>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-gold"
                    onClick={() => openArticle(featuredArticle)}
                    style={{ fontSize: '0.82rem', padding: '8px 20px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                  >
                    Read Report <ChevronRight size={14} />
                  </button>
                </div>
              </div>
              <div style={{ height: '100%', minHeight: '220px', overflow: 'hidden' }}>
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.imageAlt} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          )}

          {/* Standard Grid Articles */}
          {gridArticles.map(article => (
            <div
              key={article.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '14px',
                overflow: 'hidden',
                background: 'rgba(6, 18, 10, 0.92)',
                border: article.gold ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid rgba(0, 230, 118, 0.18)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
                <img 
                  src={article.image} 
                  alt={article.imageAlt} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', padding: '3px 9px', borderRadius: '10px', fontSize: '0.68rem', color: 'var(--color-gold)', fontFamily: 'monospace', fontWeight: 600 }}>
                  {article.readTime}
                </div>
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span className="blog-badge" style={{ fontSize: '0.65rem', alignSelf: 'flex-start', marginBottom: '8px' }}>{article.category}</span>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px', lineHeight: 1.35 }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#a0b0b5', lineHeight: 1.5, marginBottom: '14px', flex: 1 }}>
                  {article.abstract}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span>{article.author.split(' (')[0]}</span>
                  <button 
                    type="button"
                    className="btn btn-green-outline"
                    onClick={() => openArticle(article)}
                    style={{ fontSize: '0.72rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                  >
                    Read <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Article Reader Overlay */}
        {activeArticle && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(2, 8, 4, 0.75)', backdropFilter: 'blur(10px)',
            padding: '20px'
          }}>
            <div className="glass-card" style={{
              maxWidth: '400px', width: '90%', maxHeight: '82vh', overflowY: 'auto', padding: '16px 18px',
              position: 'relative', border: activeArticle.gold ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid rgba(0, 230, 118, 0.3)',
              background: 'rgba(6, 18, 10, 0.98)', boxShadow: activeArticle.gold ? '0 0 30px rgba(212, 175, 55, 0.15)' : '0 0 30px rgba(0, 230, 118, 0.15)',
              transform: 'none', borderRadius: '16px'
            }}>
              <button onClick={closeArticle} style={{
                position: 'absolute', top: '12px', right: '12px', zIndex: 10,
                background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
                borderRadius: '50%', width: '28px', height: '28px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease'
              }} onMouseEnter={e => e.currentTarget.style.color = '#00e676'} onMouseLeave={e => e.currentTarget.style.color = '#fff'}>
                <X size={15} />
              </button>
              
              <div style={{ borderRadius: '10px', overflow: 'hidden', height: '110px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <img 
                  src={activeArticle.image} 
                  alt={activeArticle.imageAlt} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span className="blog-badge" style={{ fontSize: '0.64rem', padding: '2px 7px' }}>{activeArticle.category}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--color-gold)', fontWeight: 600, fontFamily: 'monospace' }}>{activeArticle.readTime}</span>
              </div>

              <h2 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '6px', color: '#ffffff', lineHeight: 1.3 }} className={activeArticle.gold ? 'glow-text-gold' : 'glow-text-green'}>
                {activeArticle.title}
              </h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>By {activeArticle.author}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
              </div>

              <div style={{
                fontSize: '0.85rem', color: '#d1e0e4', lineHeight: '1.55',
                textAlign: 'left'
              }}>
                {activeArticle.content.map((paragraph, index) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={index} style={{
                        fontSize: '0.94rem', color: '#ffffff', fontWeight: 700,
                        marginTop: '14px', marginBottom: '6px',
                        paddingLeft: '6px', borderLeft: activeArticle.gold ? '3px solid var(--color-gold)' : '3px solid #00e676'
                      }}>
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.includes('Key Institutional Takeaways:')) {
                    const parts = paragraph.split('\n');
                    return (
                      <div key={index} style={{
                        marginTop: '12px', marginBottom: '12px', padding: '10px 12px',
                        background: 'rgba(0, 230, 118, 0.06)', borderLeft: '3px solid #00e676',
                        borderRadius: '6px', border: '1px solid rgba(0, 230, 118, 0.2)'
                      }}>
                        <h5 style={{ color: '#00e676', fontSize: '0.84rem', fontWeight: 700, marginBottom: '4px' }}>
                          📌 Key Institutional Takeaways
                        </h5>
                        {parts.slice(1).map((bullet, bIdx) => (
                          <p key={bIdx} style={{ fontSize: '0.78rem', color: '#e0f2f1', marginBottom: '3px', lineHeight: '1.45' }}>
                            {bullet}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return <p key={index} style={{ marginBottom: '8px' }}>{paragraph}</p>;
                })}
              </div>

              {/* Shareable Article Link Box */}
              <div style={{
                marginTop: '10px', padding: '8px 10px', background: 'rgba(0, 230, 118, 0.05)',
                border: '1px solid rgba(0, 230, 118, 0.2)', borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px'
              }}>
                <div>
                  <div style={{ fontSize: '0.62rem', color: '#00e676', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    🔗 Shareable Link
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#ffffff', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    {`https://ai-capital-investment.vercel.app/blogs/${activeArticle.id}`}
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    const shareUrl = `https://ai-capital-investment.vercel.app/blogs/${activeArticle.id}`;
                    navigator.clipboard.writeText(shareUrl);
                    setCopiedArticleUrl(activeArticle.id);
                    setTimeout(() => setCopiedArticleUrl(null), 2500);
                  }}
                  className="btn btn-green-outline"
                  style={{ fontSize: '0.68rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}
                >
                  {copiedArticleUrl === activeArticle.id ? '✓ Copied!' : '📋 Copy Link'}
                </button>
              </div>

              {/* YMYL Financial Disclaimer Banner */}
              <div style={{
                marginTop: '8px', padding: '6px 8px', background: 'rgba(212, 175, 55, 0.06)',
                borderLeft: '2px solid var(--color-gold)', borderRadius: '4px', fontSize: '0.64rem',
                color: 'var(--text-muted)', lineHeight: 1.4
              }}>
                <strong>Notice:</strong> Insights provided by AI Capital LLC. Past performance does not guarantee future returns. Educational purposes only.
              </div>
              
              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <button 
                  type="button" 
                  className="btn btn-green-outline" 
                  onClick={closeArticle} 
                  style={{ fontSize: '0.76rem', padding: '5px 18px', borderRadius: '16px', cursor: 'pointer' }}
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

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
            <ul className="lp-footer-links">
              <li><a href="/" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>Home</a></li>
              <li><a href="/#about" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>About</a></li>
              <li><a href="/#services" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>Services</a></li>
              <li><a href="/blogs" onClick={(e) => { e.preventDefault(); onNavigate('blogs'); }}>Blogs</a></li>
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul className="lp-footer-links">
              <li>Wealth Management</li>
              <li>Investment Advisory</li>
              <li>Retirement Planning</li>
            </ul>
          </div>
          <div>
            <h5>Contact & Regulatory</h5>
            <ul className="lp-footer-links">
              <li>SEBI Reg: INA000098765</li>
              <li>SEC RIA #801-123456</li>
              <li>info@aicapital.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <div className="lp-container">
            <span>© 2026 AI Capital Investment. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
