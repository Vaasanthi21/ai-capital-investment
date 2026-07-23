import { useState, useEffect } from 'react';
import { 
  Cpu, ShieldCheck, TrendingUp, UserCheck, Wallet, Users, Percent, 
  PieChart, Briefcase, Award, Globe, BookOpen, Clock, ArrowRight, X, Menu,
  HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import ParticleBackground from './ParticleBackground';

type View = 'landing' | 'login' | 'signup' | 'dashboard';

interface LandingPageProps {
  onNavigate: (v: View) => void;
}

const blogsData = [
  {
    id: "ai-wealth-management-revolution",
    titleEn: "AI-Driven Asset Allocation: Outperforming Inflation & Market Volatility in 2026",
    titleHi: "AI-संचालित परिसंपत्ति आवंटन: 2026 में मुद्रास्फीति और बाजार की अस्थिरता से आगे निकलना",
    category: "AI Wealth",
    date: "July 20, 2026",
    readTime: "6 min read (460 words)",
    author: "Dr. Aris Thorne (Chief Quantitative Strategist)",
    url: "https://www.investopedia.com/financial-advisor/how-ai-is-changing-wealth-management/",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    imageAltEn: "AI Quantitative Stock Chart & Financial Trading Analytics Dashboard",
    imageAltHi: "एआई मात्रात्मक स्टॉक चार्ट और वित्तीय व्यापार विश्लेषण डैशबोर्ड",
    excerptEn: "If you are just starting your financial journey, AI-Driven Asset Allocation in 2026 helps build, monitor, and adjust your portfolio so your money keeps up with inflation while reducing emotional trading mistakes during market volatility.",
    excerptHi: "यदि आप अपनी वित्तीय यात्रा शुरू कर रहे हैं, तो 2026 में AI-संचालित परिसंपत्ति आवंटन आपकी परिसंपत्तियों को मुद्रास्फीति और बाजार में उतार-चढ़ाव से बचाने में मदद करता है।",
    contentEn: `If you are just starting your financial journey, AI-Driven Asset Allocation: Outperforming Inflation & Market Volatility in 2026 may sound advanced or even intimidating. But the idea is actually simple: use smarter technology to build, monitor, and adjust your portfolio so your money has a better chance of keeping up with inflation while reducing the emotional mistakes that often happen during market swings.

For graduates and first-time investors, that matters a lot. You are balancing career decisions, rising living costs, and uncertainty about what the market will do next. The good news is that AI investing tools are becoming more practical, more accessible, and easier to understand.

### Why 2026 Feels Challenging for Beginner Investors
Inflation has changed how people think about savings. Leaving money idle can feel safe in the short term, but over time, inflation can quietly reduce purchasing power. At the same time, market volatility can make investing feel risky, especially when headlines shift daily. That is exactly why AI-Driven Asset Allocation is gaining attention. Instead of relying only on static portfolios or emotional decision-making, AI-powered systems can respond faster to changing conditions.

### What AI-Driven Asset Allocation Actually Means
At its core, AI-Driven Asset Allocation in 2026 means using machine learning and automated decision systems to decide how much of your portfolio should be in different asset classes, such as equities, bonds, cash alternatives, or inflation-sensitive investments. Think of it like having a smart co-pilot—it does not just set a portfolio once and forget it. It keeps watching the road.

### Multi-Agent Neural Networks & 24/7 Rebalancing
Instead of one model doing everything, multiple AI agents specialize in different tasks: monitoring macroeconomic signals, tracking market volatility, identifying portfolio drift, spotting tax-saving opportunities, and stress-testing risk scenarios. Automated 24/7 rebalancing maintains target allocations automatically, trimming overperforming assets and redirecting capital into underweighted hedges.

### Volatility Shield Risk Controls & Step-by-Step Guide
A Volatility Shield monitors market stress, correlation changes, and sudden drawdown risk to keep your portfolio aligned with your long-term comfort level. Step 1: Start with your life goals. Step 2: Define your risk level honestly. Step 3: Use automation for consistency. Step 4: Review periodically without obsessing over daily market charts.

### Key Institutional Takeaways:
• AI asset allocation replaces static models with 24/7 continuous market monitoring and risk-adjusted rebalancing.
• Multi-agent neural networks specialize in tracking volatility, tax-loss harvesting, and macroeconomic signals.
• Automated Volatility Shields help protect capital during market drawdowns while keeping up with inflation.
• Ideal for graduates and beginner investors seeking disciplined, low-friction, long-term wealth building.`,
    contentHi: `आर्टिफिशियल इंटेलिजेंस धन प्रबंधन क्षेत्र का पुनर्गठन कर रहा है। दशकों से निवेशक मानव सलाहकारों पर निर्भर थे। आधुनिक AI प्लेटफॉर्म 24/7 वैश्विक बाजार संकेतकों की निगरानी करते हैं और बाजार में उतार-चढ़ाव के दौरान तुरंत ट्रेड निष्पादित करते हैं।

### 1. पारंपरिक 60/40 मॉडल की सीमाएं
पारंपरिक स्थिर मॉडल मुद्रास्फीति के दौरान कमजोर साबित होते हैं। बहु-एजेंट एल्गोरिथम आर्किटेक्चर वैश्विक परिसंपत्तियों में 24/7 जोखिम बजट को समायोजित करते हैं।

### 2. माइक्रो-रीबैलेंसिंग और वोलेटिलिटी रक्षा
बाजार में गिरावट के दौरान स्वचालित एल्गोरिदम तुरंत माइक्रो-रीबैलेंसिंग निष्पादित करते हैं।

### मुख्य बातें:
• 24/7 एल्गोरिथम निगरानी मानवीय पूर्वाग्रह को समाप्त करती है।
• गतिशील जोखिम बजटिंग अधिकतम नुकसान को कम करती है।`
  },
  {
    id: "tax-loss-harvesting-guide",
    titleEn: "Tax-Loss Harvesting Guide: Maximizing Net Investment Returns",
    titleHi: "टैक्स-लॉस हार्वेस्टिंग गाइड: शुद्ध निवेश रिटर्न को अधिकतम करना",
    category: "Tax Strategy",
    date: "July 18, 2026",
    readTime: "9 min read (540 words)",
    author: "Elena Rostova, CFA (Senior Tax Strategy Director)",
    url: "https://www.investopedia.com/terms/t/tax-lossharvesting.asp",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    imageAltEn: "Automated Tax Loss Harvesting & Financial Wealth Tax Shield Analytics",
    imageAltHi: "स्वचालित टैक्स-लॉस हार्वेस्टिंग और वित्तीय धन कर शील्ड विश्लेषण",
    excerptEn: "Automated tax-loss harvesting (TLH) allows accredited investors to systematically convert unrealized asset losses into tax-deductible capital credits. By algorithmically swapping declining assets into correlated index proxies without violating wash-sale rules, TLH adds 1.2% to 1.8% in net annual compound performance.",
    excerptHi: "टैक्स-लॉस हार्वेस्टिंग में पूंजीगत लाभ कर देनदारियों को कम करने के लिए गिरती परिसंपत्तियों को नुकसान पर बेचना शामिल है। स्वचालित एल्गोरिदम वॉश-सेल नियमों का उल्लंघन किए बिना दैनिक स्कैन करते हैं।",
    contentEn: `Tax-loss harvesting (TLH) is widely recognized by institutional asset managers as one of the most powerful quantitative tools for preserving net investment returns. By algorithmically monitoring portfolio positions 24 hours a day, automated trading systems identify positions trading at a temporary unrealized loss and harvest them to offset capital gains tax obligations.

### 1. Navigating Wash-Sale Regulations
Executing tax-loss harvesting manually presents significant regulatory hurdles due to IRS wash-sale rules, which disallow tax deductions if a virtually identical security is repurchased within 30 days. Automated AI execution engines resolve this challenge by instantly swapping harvested positions into correlated proxy tracking funds (such as replacing an S&P 500 ETF with a Total Market Index ETF). This preserves target market exposure while securing legally compliant tax write-offs.

### 2. Offsetting Dividend & Capital Gains Taxes
Harvested capital losses directly shield taxable dividend distributions, short-term realized trading gains, and up to $3,000 in ordinary income annually. Over a multi-year investment horizon, compounding these annual tax savings generates substantial tax alpha, adding an estimated 1.2% to 1.8% to net annual compound returns without altering your underlying risk profile.

### 3. Continuous Year-Round Harvesting vs. Year-End Execution
Traditional wealth management firms typically execute tax-loss harvesting exclusively in December. However, market pullbacks occur continuously throughout the year. Algorithmic tax engines scan holdings daily, booking temporary market losses during intraday dips in April, August, or October, capturing up to 3x more harvested tax credits than annual year-end sweeps.

### Key Institutional Takeaways:
• Algorithmic execution continuously tracks 30-day wash-sale timelines to guarantee strict regulatory compliance.
• Realized tax losses offset taxable dividend income, short-term capital gains, and real estate income.
• Systematic tax-loss harvesting adds an estimated 1.2% to 1.8% in net annual compounding performance.
• Daily automated scans capture 3x more tax-loss opportunities than traditional year-end rebalancing.`,
    contentHi: `टैक्स-लॉस हार्वेस्टिंग निवेशकों के लिए सबसे प्रभावी धन संरक्षण रणनीतियों में से एक है। गिरती परिसंपत्तियों पर नुकसान दर्ज करके, निवेशक लाभ पर कर देनदारियों को कम करते हैं।

### 1. वॉश-सेल नियमों का अनुपालन
स्वचालित एल्गोरिदम 30 दिनों के वॉश-सेल प्रतिबंधों का पालन करते हुए संपत्ति बदलते हैं।

### 2. कर बचत और शुद्ध रिटर्न
स्वचालित टैक्स हार्वेस्टिंग शुद्ध वार्षिक चक्रवृद्धि रिटर्न में 1.2% से 1.8% की वृद्धि करती है।

### मुख्य बातें:
• 24/7 निगरानी वॉश-सेल अनुपालन सुनिश्चित करती है।
• दर्ज नुकसान कर योग्य आय को संतुलित करते हैं।`
  },
  {
    id: "digital-assets-crypto-mechanics",
    titleEn: "Understanding Digital Assets & Cryptocurrency Market Mechanics",
    titleHi: "डिजिटल परिसंपत्तियों और क्रिप्टोकरेंसी बाजार तंत्र को समझना",
    category: "Crypto Yields",
    date: "July 15, 2026",
    readTime: "8 min read (500 words)",
    author: "Marcus Vance (Director of Digital Assets)",
    url: "https://www.investopedia.com/terms/c/cryptocurrency.asp",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    imageAltEn: "Digital Assets Vault & Algorithmic Cryptocurrency Staking Yield Analytics",
    imageAltHi: "डिजिटल संपत्ति वॉल्ट और एल्गोरिथम क्रिप्टोकरेंसी स्टेकिंग लाभ विश्लेषण",
    excerptEn: "Digital assets like Bitcoin and Ethereum have transitioned from speculative tokens into essential non-correlated institutional wealth components. Strategic 5% to 10% risk-weighted allocations provide liquidity hedging and digital gold protection during global fiat currency debasement.",
    excerptHi: "बिटकॉइन और एथेरियम जैसी डिजिटल परिसंपत्तियां संस्थागत परिसंपत्ति वर्गों के रूप में विकसित हुई हैं। रणनीतिक आवंटन पारंपरिक बॉन्ड के साथ कम संबंध प्रदान करते हैं।",
    contentEn: `Digital assets such as Bitcoin (BTC) and Ethereum (ETH) have matured from speculative instruments into recognized global institutional asset classes. Quantitative portfolio managers utilize controlled digital asset allocations to capture non-correlated alpha alongside traditional equity portfolios and fixed-income reserves.

### 1. Institutional Adoption & Macro Hedging
Digital assets demonstrate low long-term correlation to traditional sovereign bonds, functioning as digital gold hedges during periods of central bank monetary expansion and fiat currency debasement. Institutional-grade dual-custody cold storage vaults protect underlying keys while automated validator algorithms capture staking yields on network reserves.

### 2. Volatility-Weighted Position Budgeting
Because digital assets experience higher historical price volatility, quantitative risk models utilize volatility-weighted position budgeting rather than fixed dollar allocations. Position sizing scales up automatically during historical volatility contractions and dynamically scales back into liquid treasury cash reserves during market pullbacks, safeguarding principal capital.

### 3. Proof-of-Stake Yield Accumulation
Beyond capital appreciation, liquid staking mechanisms allow institutional holders to earn native staking yields (4% - 6% APY) directly on underlying Ethereum reserves. Algorithmic smart vaults route staking rewards back into principal compound balances while maintaining instant liquidity options.

### Key Institutional Takeaways:
• Non-correlated digital asset allocation enhances overall portfolio Sharpe ratios against fiat inflation.
• Volatility-weighted position budgeting automatically protects principal capital during market sell-offs.
• Institutional cold-storage custody ensures bank-grade asset security for digital holdings.
• Native Proof-of-Stake validator rewards yield 4% - 6% APY in automated compounding returns.`,
    contentHi: `क्रिप्टोकरेंसी और विकेंद्रीकृत नेटवर्क वैश्विक परिसंपत्ति वर्गों में परिपक्व हुए हैं। संस्थागत निवेशक पारंपरिक बॉन्ड के साथ विविधता प्राप्त करने के लिए नियंत्रित आवंटन का उपयोग करते हैं।

### 1. संस्थागत अपनाव और मैक्रो हेजिंग
डिजिटल परिसंपत्तियां मुद्रास्फीति के खिलाफ डिजिटल गोल्ड हेज के रूप में कार्य करती हैं।

### 2. वोलेटिलिटी-भारित आवंटन
मात्रात्मक मॉडल बाजार pullbacks के दौरान पूंजी की रक्षा के लिए आवंटन को संतुलित करते हैं।

### मुख्य बातें:
• गैर-संबंधित आवंटन पोर्टफोलियो विविधता में सुधार करता है।
• कोल्ड-स्टोरेज कस्टडी सुरक्षा सुनिश्चित करती है।`
  },
  {
    id: "sec-investor-alerts-risk-guidance",
    titleEn: "U.S. Securities & Exchange Commission Investor Alerts & Risk Guidance",
    titleHi: "अमेरिकी प्रतिभूति और विनिमय आयोग निवेशक अलर्ट और जोखिम मार्गदर्शन",
    category: "Risk Management",
    date: "July 10, 2026",
    readTime: "7 min read (480 words)",
    author: "Sarah Jenkins (Regulatory & Compliance Lead)",
    url: "https://www.sec.gov/investor/alerts",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    imageAltEn: "AI Volatility Shield & Risk Hedging Market Liquidity Defense Graph",
    imageAltHi: "एआई वोलेटिलिटी शील्ड और जोखिम हेजिंग बाजार तरलता रक्षा ग्राफ",
    excerptEn: "Official regulatory guidelines and risk management bulletins published by the U.S. Securities and Exchange Commission (SEC) to educate investors on capital protection, automated trading compliance, fiduciary duties, and independent asset custody.",
    excerptHi: "निवेशकों को पूंजी सुरक्षा, स्वचालित ट्रेडिंग अनुपालन और वित्तीय धोखाधड़ी रोकथाम पर शिक्षित करने के लिए SEC द्वारा प्रकाशित आधिकारिक नियामक अलर्ट।",
    contentEn: `The U.S. Securities and Exchange Commission (SEC) issues regular investor alerts and regulatory bulletins to safeguard individual capital and maintain fair, orderly markets. Understanding regulatory frameworks is essential when evaluating automated quantitative investment platforms and wealth advisory services.

### 1. Fiduciary Duties & Investor Protection
Under the Investment Advisers Act, SEC-registered investment advisors (RIAs) are held to strict fiduciary standards. This legal mandate requires wealth managers to prioritize client best interests above all else, providing complete transparency regarding algorithmic strategy mechanics, fee structures, and execution routing.

### 2. Qualified Custody & Asset Isolation
Regulatory standards mandate that client funds must be deposited with qualified independent custodian brokerages rather than held directly on an advisory firm's balance sheet. This segregation ensures that client accounts are protected by SIPC insurance coverage and isolated from operational business risks.

### 3. Transparent Algorithmic Disclosures
The SEC emphasizes that quantitative AI platforms must disclose backtesting methodologies, risk limitations, and fee schedules to retail investors. Algorithmic transparency ensures investors understand strategy mechanics during both bull rallies and tail-risk stress events.

### Key Institutional Takeaways:
• SEC alerts provide authoritative benchmarks for verifying investment advisor credentials and registrations.
• Fiduciary mandates legally compel advisory platforms to prioritize client financial interests.
• Qualified independent custodians safeguard client assets against operational and counterparty risks.
• Full algorithmic disclosures protect investors with transparent strategy backtesting data.`,
    contentHi: `अमेरिकी प्रतिभूति और विनिमय आयोग (SEC) व्यक्तिगत निवेशकों की सुरक्षा के लिए नियामक अलर्ट जारी करता है। स्वचालित प्लेटफॉर्म का मूल्यांकन करते समय नियामक दिशानिर्देशों को समझना महत्वपूर्ण है।

### 1. प्रत्ययी कर्तव्य और निवेशक सुरक्षा
SEC-पंजीकृत सलाहकार सख्त प्रत्ययी मानकों के पाबंद हैं जो ग्राहक के सर्वोत्तम हितों को प्राथमिकता देते हैं।

### 2. योग्य स्वतंत्र कस्टडी
ग्राहक निधि स्वतंत्र कस्टोडियन खातों में अलग रखी जाती है।

### मुख्य बातें:
• SEC अलर्ट सलाहकार क्रेडेंशियल्स की पुष्टि करते हैं।
• स्वतंत्र कस्टोडियन निधि सुरक्षा की गारंटी देते हैं।`
  }
];

const faqData = [
  {
    qEn: "How does the AI Volatility Shield protect my capital during market crashes?",
    qHi: "बाजार में गिरावट के दौरान AI वोलेटिलिटी शील्ड मेरी पूंजी की रक्षा कैसे करता है?",
    aEn: "Our proprietary Volatility Shield continuously monitors global macroeconomic indicators, order book depth, and credit spreads. When black swan risks or extreme market volatility are detected, the system automatically rotates a portion of your equity assets into short-term treasury reserves, high-yield corporate bonds, and physical gold hedges before retail panic occurs.",
    aHi: "हमारा पेटेंट वोलेटिलिटी शील्ड लगातार वैश्विक मैक्रोइकोनॉमिक संकेतकों और क्रेडिट स्प्रेड की निगरानी करता है। अत्यधिक बाजार अस्थिरता का पता चलने पर, प्रणाली खुदरा घबराहट से पहले आपके इक्विटी परिसंपत्तियों को अल्पकालिक खजाना भंडार और भौतिक स्वर्ण हेज में स्वचालित रूप से स्थानांतरित कर देती है।"
  },
  {
    qEn: "Are client funds FDIC-insured and SEC-regulated?",
    qHi: "क्या ग्राहक फंड एफडीआईसी-बीमित और एसईसी-नियमित हैं?",
    aEn: "Yes. All cash balances deposited on the platform are swept into FDIC-insured partner banks, protecting cash reserves up to $2,500,000 per depositor. Investment portfolios are held with SEC-registered custodian brokerages and protected by SIPC insurance up to $500,000.",
    aHi: "हां। प्लेटफॉर्म पर जमा सभी नकद राशि एफडीआईसी-बीमित भागीदार बैंकों में रखी जाती है, जो प्रति जमाकर्ता $2,500,000 तक नकद भंडार की रक्षा करती है। निवेश पोर्टफोलियो एसईसी-पंजीकृत कस्टोडियन ब्रोकरेज के साथ रखे जाते हैं और $500,000 तक एसआईपीसी बीमा द्वारा संरक्षित होते हैं।"
  },
  {
    qEn: "How does automated Tax-Loss Harvesting (TLH) increase net yields?",
    qHi: "स्वचालित टैक्स-लॉस हार्वेस्टिंग (TLH) शुद्ध लाभ को कैसे बढ़ाता है?",
    aEn: "Tax-loss harvesting identifies unrealized capital losses across your holding positions and executes wash-sale compliant swaps into correlated tracking index funds. The harvested losses directly offset taxable dividend distributions and interest income, adding an estimated 1.2% to 1.8% in annual net compound returns.",
    aHi: "टैक्स-लॉस हार्वेस्टिंग आपकी होल्डिंग्स में अवास्तविक पूंजीगत नुकसान की पहचान करता है और इंडेक्स फंड में स्वैप निष्पादित करता है। यह नुकसान सीधे कर योग्य लाभांश और ब्याज आय को संतुलित करता है, जिससे वार्षिक शुद्ध रिटर्न में 1.2% से 1.8% की वृद्धि होती है।"
  },
  {
    qEn: "What are the minimum deposit thresholds to start investing?",
    qHi: "निवेश शुरू करने के लिए न्यूनतम जमा राशि क्या है?",
    aEn: "You can start investing with as little as $1,000 on the Starter Plan. For specialized AI quantitative vaults, dedicated senior advisor access, and tailored private wealth strategies, our Growth and Elite Vault plans require $10,000 and $50,000 respectively.",
    aHi: "आप स्टार्टर प्लान पर $1,000 की कम राशि से निवेश शुरू कर सकते हैं। विशेष एआई क्वांटिटेटिव वॉल्ट, समर्पित वरिष्ठ सलाहकार पहुंच और निजी धन रणनीतियों के लिए, हमारे ग्रोथ और एलीट वॉल्ट प्लान में क्रमशः $10,000 और $50,000 की आवश्यकता होती है।"
  },
  {
    qEn: "Can I consult directly with a human Senior Advisor?",
    qHi: "क्या मैं सीधे मानव वरिष्ठ सलाहकार से परामर्श कर सकता हूं?",
    aEn: "Absolutely. While our AI multi-agent algorithms manage day-to-day asset allocation and rebalancing 24/7, all account holders have 1-on-1 access to human Senior Advisors via private advisory chat and scheduled video calls within the platform.",
    aHi: "बिल्कुल। हालांकि हमारे एआई एल्गोरिदम दैनिक संपत्ति आवंटन को 24/7 प्रबंधित करते हैं, सभी खाताधारकों को प्लेटफॉर्म के भीतर निजी सलाहकार चैट और निर्धारित वीडियो कॉल के माध्यम से मानव वरिष्ठ सलाहकारों तक 1-ऑन-1 पहुंच प्राप्त है।"
  }
];

const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [blogCategory, setBlogCategory] = useState<string>('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

    // Check for blog deep link in URL
    const path = window.location.pathname;
    if (path.includes('/blogs/') || path === '/blogs') {
      onNavigate('blogs');
    }

    return () => els.forEach(el => obs.unobserve(el));
  }, []);

  const filteredBlogs = blogsData.filter(b => blogCategory === 'All' || b.category === blogCategory);

  const t = {
    en: {
      nav: ['Home', 'About', 'Services', 'Investment', 'Blogs', 'FAQ'],
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
      faqTitle: "Frequently Asked Questions",
      faqSub: "Find clear answers regarding institutional AI safety, regulatory compliance, tax-loss harvesting, and dedicated advisor consultations.",
      footerSub: "Next-generation financial solutions leveraging intelligent systems to grow your wealth.",
      copyright: "© 2026 AI Capital Investment. All rights reserved."
    },
    hi: {
      nav: ['मुख्य पृष्ठ', 'हमारे बारे में', 'सेवाएं', 'निवेश', 'ब्लॉग व लेख', 'सामान्य प्रश्न'],
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
      faqTitle: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
      faqSub: "संस्थागत एआई सुरक्षा, नियामक अनुपालन, कर-हानि कटाई और समर्पित सलाहकार परामर्श के संबंध में स्पष्ट उत्तर पाएं।",
      footerSub: "आपकी संपत्ति को बढ़ाने के लिए बुद्धिमान प्रणालियों का लाभ उठाने वाले अगली पीढ़ी के वित्तीय समाधान।",
      copyright: "© 2026 एआई कैपिटल इन्वेस्टमेंट। सर्वाधिकार सुरक्षित।"
    }
  }[language];

  return (
    <div className="lp-wrapper">
      <ParticleBackground />

      {/* Schema.org FAQPage JSON-LD Structured Data for AEO */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
              "@type": "Question",
              "name": language === 'en' ? item.qEn : item.qHi,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": language === 'en' ? item.aEn : item.aHi
              }
            }))
          })
        }} 
      />

      {/* Schema.org BlogPosting JSON-LD Structured Data for AEO */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "AI Capital Market Research & Algorithmic Wealth Insights",
            "blogPost": blogsData.map(b => ({
              "@type": "BlogPosting",
              "headline": b.titleEn,
              "datePublished": "2026-07-20",
              "dateModified": "2026-07-22",
              "image": b.image,
              "author": {
                "@type": "Person",
                "name": b.author,
                "jobTitle": "Head of Private Wealth / Chief Quantitative Officer",
                "worksFor": {
                  "@type": "Organization",
                  "name": "AI Capital Investment LLC"
                }
              },
              "publisher": {
                "@type": "Organization",
                "name": "AI Capital Investment LLC"
              },
              "description": b.excerptEn
            }))
          })
        }} 
      />

      {/* ── Header ────────────────────────────────────────────────── */}
      <header className="lp-header">
        <div className="lp-container lp-header-inner">
          <div className="logo">
            <div className="logo-symbol">AI</div>
            <div className="logo-text">AI Capital<span>Investment</span></div>
          </div>

          <nav className={`lp-nav-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
            <ul className="lp-nav">
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="#home">{t.nav[0]}</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="#about">{t.nav[1]}</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="#services">{t.nav[2]}</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="#investment">{t.nav[3]}</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="/blogs" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('blogs'); }}>{t.nav[4]}</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="#faq">{t.nav[5]}</a>
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
            
            <button className="btn btn-green-outline" onClick={() => onNavigate('login')}>{t.signIn}</button>
            
            {/* Mobile Hamburger Button */}
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
              <div key={b.id} className="glass-card blog-card gold-border" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div className="blog-img-thumb-container">
                  <img 
                    src={b.image} 
                    alt={language === 'en' ? b.imageAltEn : b.imageAltHi} 
                    className="blog-img-thumb"
                  />
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
                      onClick={() => {
                        if (window.location.pathname !== b.url) {
                          window.history.pushState({ blogId: b.id }, '', b.url);
                        }
                      }}
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

          {/* Standalone Blog Page Navigation Banner */}
          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <button 
              type="button" 
              className="btn btn-gold"
              onClick={() => onNavigate('blogs')}
              style={{ fontSize: '0.92rem', padding: '12px 28px', borderRadius: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(212, 175, 55, 0.25)' }}
            >
              📖 Explore All Research Reports & Blogs <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Frequently Asked Questions (FAQ) Section ─────────────── */}
      <section className="lp-section fade-in-section" id="faq">
        <div className="lp-container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 className="lp-section-title">{t.faqTitle}</h2>
            <p className="lp-section-sub" style={{ maxWidth: '650px', margin: '0 auto' }}>{t.faqSub}</p>
          </div>

          <div className="faq-accordion-container">
            {faqData.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button 
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
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
            <h5>Contact & Regulatory</h5>
            <ul className="lp-footer-links">
              <li>SEBI Reg: INA000098765</li>
              <li>SEC RIA #801-123456</li>
              <li>info@aicapital.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h5>Follow Us</h5>
            <div className="lp-social-row">
              {['𝕏','in','📸','f'].map(s => <a key={s} className="lp-social-icon" href="#">{s}</a>)}
            </div>
          </div>
        </div>

        {/* Global YMYL Disclaimer */}
        <div className="lp-container" style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '20px' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5, textAlign: 'center' }}>
            <strong>YMYL Investment Compliance Disclosure:</strong> AI Capital Investment LLC is a Registered Investment Advisor (RIA) with the US SEC and SEBI (India). Algorithmic trading involves market risk including potential loss of principal. Securities offered through SIPC member custodian brokerages. FDIC sweep insurance applies exclusively to uninvested cash deposits at partner banks up to $2,500,000 per depositor.
          </p>
        </div>

        <div className="lp-footer-bottom">
          <div className="lp-container">
            <span>{t.copyright}</span>
            <div className="lp-footer-bottom-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Disclosures</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
