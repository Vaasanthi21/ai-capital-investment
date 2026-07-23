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
    titleEn: "How Artificial Intelligence is Revolutionizing Wealth Management",
    titleHi: "आर्टिफिशियल इंटेलिजेंस धन प्रबंधन में कैसे क्रांति ला रहा है",
    category: "AI Wealth",
    date: "July 20, 2026",
    readTime: "4 min read (185 words)",
    author: "Investopedia Financial Research Team",
    url: "https://www.investopedia.com/financial-advisor/how-ai-is-changing-wealth-management/",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    imageAltEn: "AI Quantitative Stock Chart & Financial Trading Analytics Dashboard",
    imageAltHi: "एआई मात्रात्मक स्टॉक चार्ट और वित्तीय व्यापार विश्लेषण डैशबोर्ड",
    excerptEn: "Traditional wealth management relies heavily on manual quarterly rebalancing and human advisors. By deploying AI algorithms trained on decades of global market indicators, automated systems optimize risk-adjusted returns and execute trades without emotional slippage.",
    excerptHi: "पारंपरिक धन प्रबंधन मुख्य रूप से मैन्युअल रीबैलेंसिंग पर निर्भर करता है। दशकों के बाजार आंकड़ों पर प्रशिक्षित AI सिस्टम जोखिम-समायोजित रिटर्न को स्वचालित रूप से अनुकूलित करते हैं।",
    contentEn: `Artificial Intelligence is fundamentally restructuring the wealth management sector. For decades, retail and accredited investors relied exclusively on human advisors who rebalanced portfolios annually or quarterly. However, manual processes often introduced emotional bias and execution delays during market turbulence.

Modern quantitative AI platforms deploy machine learning models that continuously scan global credit spreads, equity valuations, and interest rate yield curves 24/7. When volatility spikes occur, automated algorithms execute rebalancing trades instantly to lock in profit gains and allocate funds into short-term treasury reserves.

Key Global Takeaways:
1. Continuous 24/7 algorithmic monitoring eliminates human cognitive bias during market sell-offs.
2. Automated rebalancing reduces maximum portfolio drawdowns compared to static 60/40 allocation models.
3. Institutional-grade yield optimization strategies are now accessible to retail investors automatically.`,
    contentHi: `आर्टिफिशियल इंटेलिजेंस धन प्रबंधन क्षेत्र का पुनर्गठन कर रहा है। दशकों से निवेशक मानव सलाहकारों पर निर्भर थे। आधुनिक AI प्लेटफॉर्म 24/7 वैश्विक बाजार संकेतकों की निगरानी करते हैं और बाजार में उतार-चढ़ाव के दौरान तुरंत ट्रेड निष्पादित करते हैं।

मुख्य बातें:
1. निरंतर 24/7 एल्गोरिथम निगरानी बाजार की गिरावट के दौरान मानवीय पूर्वाग्रह को समाप्त करती है।
2. स्वचालित रीबैलेंसिंग स्थिर 60/40 मॉडल की तुलना में पोर्टफोलियो जोखिम को कम करती है।`
  },
  {
    id: "tax-loss-harvesting-guide",
    titleEn: "Tax-Loss Harvesting Guide: Maximizing Net Investment Returns",
    titleHi: "टैक्स-लॉस हार्वेस्टिंग गाइड: शुद्ध निवेश रिटर्न को अधिकतम करना",
    category: "Tax Strategy",
    date: "July 18, 2026",
    readTime: "5 min read (190 words)",
    author: "Investopedia Wealth Preservation Insights",
    url: "https://www.investopedia.com/terms/t/tax-lossharvesting.asp",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    imageAltEn: "Automated Tax Loss Harvesting & Financial Wealth Tax Shield Analytics",
    imageAltHi: "स्वचालित टैक्स-लॉस हार्वेस्टिंग और वित्तीय धन कर शील्ड विश्लेषण",
    excerptEn: "Tax-loss harvesting (TLH) involves selling declining assets at a loss to offset capital gains tax liabilities. Automated quantitative algorithms perform daily TLH scans, replacing harvested positions with correlated tracking funds without violating wash-sale rules.",
    excerptHi: "टैक्स-लॉस हार्वेस्टिंग में पूंजीगत लाभ कर देनदारियों को कम करने के लिए गिरती परिसंपत्तियों को नुकसान पर बेचना शामिल है। स्वचालित एल्गोरिदम वॉश-सेल नियमों का उल्लंघन किए बिना दैनिक स्कैन करते हैं।",
    contentEn: `Tax-loss harvesting is one of the most effective wealth preservation strategies for high net worth investors. By realizing losses on declining assets, investors offset capital gains tax obligations from profitable investments, preserving net compound returns.

Executing tax-loss harvesting manually is complex due to regulatory wash-sale restrictions, which disallow tax deductions if identical securities are repurchased within 30 days. Automated AI trading algorithms resolve this by instantly swapping harvested assets into correlated proxy index funds, maintaining targeted market exposure while securing tax write-offs.

Key Global Takeaways:
1. Harvested capital losses offset taxable dividend income and realized capital gains.
2. Algorithmic execution guarantees compliance with IRS and international wash-sale rules.
3. Automated tax harvesting adds an estimated 1.2% to 1.8% in net annual compounding performance.`,
    contentHi: `टैक्स-लॉस हार्वेस्टिंग निवेशकों के लिए सबसे प्रभावी धन संरक्षण रणनीतियों में से एक है। गिरती परिसंपत्तियों पर नुकसान दर्ज करके, निवेशक लाभ पर कर देनदारियों को कम करते हैं।

मुख्य बातें:
1. दर्ज किए गए नुकसान कर योग्य लाभांश और पूंजीगत लाभ को संतुलित करते हैं।
2. एल्गोरिथम निष्पादन वॉश-सेल नियमों का अनुपालन सुनिश्चित करता है।`
  },
  {
    id: "digital-assets-crypto-mechanics",
    titleEn: "Understanding Digital Assets & Cryptocurrency Market Mechanics",
    titleHi: "डिजिटल परिसंपत्तियों और क्रिप्टोकरेंसी बाजार तंत्र को समझना",
    category: "Crypto Yields",
    date: "July 15, 2026",
    readTime: "6 min read (180 words)",
    author: "Investopedia Digital Assets Research",
    url: "https://www.investopedia.com/terms/c/cryptocurrency.asp",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    imageAltEn: "Digital Assets Vault & Algorithmic Cryptocurrency Staking Yield Analytics",
    imageAltHi: "डिजिटल संपत्ति वॉल्ट और एल्गोरिथम क्रिप्टोकरेंसी स्टेकिंग लाभ विश्लेषण",
    excerptEn: "Digital assets like Bitcoin and Ethereum have evolved into established institutional asset classes. Strategic risk-weighted allocations provide low correlation to traditional fixed-income bonds, serving as digital gold hedges during monetary expansion cycles.",
    excerptHi: "बिटकॉइन और एथेरियम जैसी डिजिटल परिसंपत्तियां संस्थागत परिसंपत्ति वर्गों के रूप में विकसित हुई हैं। रणनीतिक आवंटन पारंपरिक बॉन्ड के साथ कम संबंध प्रदान करते हैं।",
    contentEn: `Cryptocurrencies and decentralized networks have matured from speculative instruments into recognized global asset classes. Institutional investors utilize controlled allocations to capture non-correlated alpha alongside traditional equities and fixed-income reserves.

Because digital assets experience higher historical volatility, risk management models utilize volatility-weighted position budgeting. During market expansion phases, position sizing is optimized, whereas during liquidity contractions, trailing risk controls scale back exposure into treasury cash reserves.

Key Global Takeaways:
1. Low correlation to traditional bonds enhances portfolio diversification against fiat inflation.
2. Volatility-weighted position budgeting shields principal capital during crypto market pullbacks.
3. Institutional cold-storage custody ensures bank-grade asset security.`,
    contentHi: `क्रिप्टोकरेंसी और विकेंद्रीकृत नेटवर्क वैश्विक परिसंपत्ति वर्गों में परिपक्व हुए हैं। संस्थागत निवेशक पारंपरिक बॉन्ड के साथ विविधता प्राप्त करने के लिए नियंत्रित आवंटन का उपयोग करते हैं।

मुख्य बातें:
1. पारंपरिक बॉन्ड के साथ कम संबंध मुद्रास्फीति के खिलाफ सुरक्षा प्रदान करता है।
2. वोलेटिलिटी-भारित आवंटन बाजार की गिरावट के दौरान मूल पूंजी की रक्षा करता है।`
  },
  {
    id: "sec-investor-alerts-risk-guidance",
    titleEn: "U.S. Securities & Exchange Commission Investor Alerts & Risk Guidance",
    titleHi: "अमेरिकी प्रतिभूति और विनिमय आयोग निवेशक अलर्ट और जोखिम मार्गदर्शन",
    category: "Risk Management",
    date: "July 10, 2026",
    readTime: "4 min read (185 words)",
    author: "U.S. SEC Regulatory Office",
    url: "https://www.sec.gov/investor/alerts",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    imageAltEn: "AI Volatility Shield & Risk Hedging Market Liquidity Defense Graph",
    imageAltHi: "एआई वोलेटिलिटी शील्ड और जोखिम हेजिंग बाजार तरलता रक्षा ग्राफ",
    excerptEn: "Official regulatory alerts and risk management guidelines published by the U.S. Securities and Exchange Commission (SEC) to educate investors on capital protection, automated trading compliance, and financial fraud prevention.",
    excerptHi: "निवेशकों को पूंजी सुरक्षा, स्वचालित ट्रेडिंग अनुपालन और वित्तीय धोखाधड़ी रोकथाम पर शिक्षित करने के लिए SEC द्वारा प्रकाशित आधिकारिक नियामक अलर्ट।",
    contentEn: `The U.S. Securities and Exchange Commission (SEC) issues regulatory alerts and bulletins to protect individual investors and maintain fair, orderly capital markets. Understanding regulatory guidelines is critical when evaluating automated quantitative trading platforms and investment advisors.

Key compliance requirements mandate transparent disclosures regarding risk factors, fee structures, and regulatory registration status under the Investment Advisers Act. Regulated entities must adhere to strict fiduciary standards, ensuring client assets are held with qualified independent custodians.

Key Global Takeaways:
1. SEC alerts provide guidance on evaluating investment advisory credentials and registration.
2. Fiduciary standards mandate that advisory recommendations must prioritize client best interests.
3. Qualified independent custodians safeguard client funds against operational risks.`,
    contentHi: `अमेरिकी प्रतिभूति और विनिमय आयोग (SEC) व्यक्तिगत निवेशकों की सुरक्षा के लिए नियामक अलर्ट जारी करता है। स्वचालित प्लेटफॉर्म का मूल्यांकन करते समय नियामक दिशानिर्देशों को समझना महत्वपूर्ण है।

मुख्य बातें:
1. SEC अलर्ट सलाहकार साख का मूल्यांकन करने के लिए मार्गदर्शन प्रदान करते हैं।
2. योग्य स्वतंत्र कस्टोडियन ग्राहक निधि की रक्षा करते हैं।`
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
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [copiedBlogUrl, setCopiedBlogUrl] = useState<any | null>(null);
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
    if (path.includes('/blogs/')) {
      const slug = path.split('/blogs/')[1];
      const match = blogsData.find(b => b.url.includes(slug) || b.id.toString() === slug);
      if (match) setSelectedBlog(match);
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
              {['home', 'about', 'services', 'investment', 'blogs', 'pricing'].map((id, idx) => (
                <li key={id} onClick={() => setMobileMenuOpen(false)}>
                  <a href={`#${id}`}>{t.nav[idx]}</a>
                </li>
              ))}
              <li className="mobile-only-nav-item" style={{ marginTop: '10px', gap: '10px', width: '100%', justifyContent: 'center' }}>
                <button className="btn btn-green-outline" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => { setMobileMenuOpen(false); onNavigate('login'); }}>{t.signIn}</button>
                <button className="btn btn-gold" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => { setMobileMenuOpen(false); onNavigate('signup'); }}>{t.getStarted}</button>
              </li>
            </ul>
          </nav>

          <div className="lp-header-actions">
            {/* Language Switcher Pill */}
            <button
              onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
              className="btn btn-green-outline"
              style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Globe size={13} /> {language === 'en' ? 'हिंदी' : 'English'}
            </button>
            
            <button className="btn btn-green-outline desktop-signin" onClick={() => onNavigate('login')}>{t.signIn}</button>
            <button className="btn btn-gold" style={{ fontSize: '0.78rem', padding: '5px 12px' }} onClick={() => onNavigate('signup')}>{t.getStarted}</button>
            
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
                        setSelectedBlog(b);
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

      {/* ── Interactive Blog Modal Overlay ───────────────────────── */}
      {selectedBlog && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(2, 8, 4, 0.85)', backdropFilter: 'blur(12px)',
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            maxWidth: '720px', width: '100%', maxHeight: '88vh', overflowY: 'auto',
            padding: '28px', position: 'relative', border: '1px solid rgba(212, 175, 55, 0.3)',
            background: 'rgba(6, 18, 10, 0.96)', boxShadow: '0 0 50px rgba(212, 175, 55, 0.15)',
            borderRadius: '16px'
          }}>
            <button
              onClick={() => {
                setSelectedBlog(null);
                if (window.location.pathname !== '/') {
                  window.history.pushState(null, '', '/');
                }
              }}
              style={{
                position: 'absolute', top: '20px', right: '20px', zIndex: 10,
                background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff',
                borderRadius: '50%', width: '36px', height: '36px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '220px', marginBottom: '20px' }}>
              <img 
                src={selectedBlog.image} 
                alt={language === 'en' ? selectedBlog.imageAltEn : selectedBlog.imageAltHi}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <span className="blog-badge" style={{ marginBottom: '8px' }}>{selectedBlog.category}</span>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: '10px' }}>
                {language === 'en' ? selectedBlog.titleEn : selectedBlog.titleHi}
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span>✍️ {selectedBlog.author}</span>
                <span>📅 {selectedBlog.date}</span>
                <span>⏱️ {selectedBlog.readTime}</span>
              </div>
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px', padding: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)',
              lineHeight: 1.7, whiteSpace: 'pre-line'
            }}>
              {language === 'en' ? selectedBlog.contentEn : selectedBlog.contentHi}
            </div>

            {/* Canonical Source URL Box */}
            <div style={{
              marginTop: '16px', padding: '14px 18px', background: 'rgba(0, 230, 118, 0.05)',
              border: '1px solid rgba(0, 230, 118, 0.22)', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#00e676', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '2px' }}>
                  🌐 Canonical Article Source URL
                </div>
                <div style={{ fontSize: '0.8rem', color: '#ffffff', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {selectedBlog.url}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a 
                  href={selectedBlog.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-green-outline"
                  style={{ fontSize: '0.78rem', padding: '7px 16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                >
                  Read Source Article ↗
                </a>
                <button 
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedBlog.url);
                    setCopiedBlogUrl(selectedBlog.id);
                    setTimeout(() => setCopiedBlogUrl(null), 2500);
                  }}
                  className="btn btn-green-outline"
                  style={{ fontSize: '0.78rem', padding: '7px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                >
                  {copiedBlogUrl === selectedBlog.id ? '✓ Link Copied!' : '📋 Copy URL'}
                </button>
              </div>
            </div>

            {/* YMYL Disclaimer */}
            <div style={{
              marginTop: '14px', padding: '12px 16px', background: 'rgba(212, 175, 55, 0.05)',
              borderLeft: '3px solid var(--color-gold)', borderRadius: '6px', fontSize: '0.74rem',
              color: 'var(--text-muted)', lineHeight: 1.5
            }}>
              <strong>Regulatory Notice & YMYL Disclaimer:</strong> AI Capital Investment LLC provides automated quantitative portfolio management. Past performance does not guarantee future results. Market insights are for informational purposes and do not constitute individualized financial, tax, or legal advice. Certified SEBI & SEC registered advisors are available for 1-on-1 consultations.
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontFamily: 'monospace' }}>
                {selectedBlog.url}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedBlog(null);
                  if (window.location.pathname !== '/') {
                    window.history.pushState(null, '', '/');
                  }
                }}
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
