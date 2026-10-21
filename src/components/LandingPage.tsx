import { useState, useEffect } from 'react';
import { 
  Cpu, ShieldCheck, TrendingUp, UserCheck, Wallet, Users, Percent, 
  PieChart, Briefcase, Award, Globe, BookOpen, Clock, ArrowRight, X, Menu,
  RefreshCw, ChevronDown, ChevronUp, Calculator, Calendar, Landmark, Heart, Activity,
  Lock, BarChart3, Target, Phone, MessageCircle, CheckCircle2, GraduationCap, Sun, FileText, Sparkles,
  UserPlus, LogIn
} from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import ParticleBackground from './ParticleBackground';
import LeadCaptureForm from './LeadCaptureForm';
import WealthManagerCertificates from './WealthManagerCertificates';
import SipCalculator from './SipCalculator';

type View = 'landing' | 'login' | 'signup' | 'otp-verify' | 'payment' | 'forgot-password' | 'dashboard' | 'blogs' | 'accreditation' | 'rebalancing';

interface LandingPageProps {
  onNavigate: (v: View) => void;
}

const blogsData = [
  {
    id: "ai-wealth-management-revolution",
    titleEn: "Goal-Based Wealth Planning: Outperforming Inflation & Market Volatility in 2026",
    titleHi: "लक्ष्य-आधारित धन योजना: 2026 में मुद्रास्फीति और बाजार की अस्थिरता से आगे निकलना",
    category: "Mutual Funds",
    date: "July 20, 2026",
    readTime: "6 min read (460 words)",
    author: "Ankush Jain (Mutual Fund Distributor)",
    url: "https://www.investopedia.com/financial-advisor/how-ai-is-changing-wealth-management/",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=75",
    imageAltEn: "Disciplined Investment and Goal-Based SIP Financial Planning",
    imageAltHi: "अनुशासित निवेश और लक्ष्य-आधारित एसआईपी वित्तीय योजना",
    excerptEn: "If you are starting your financial journey, goal-based asset allocation helps build, monitor, and adjust your portfolio so your money keeps up with inflation while reducing emotional trading mistakes.",
    excerptHi: "यदि आप अपनी वित्तीय यात्रा शुरू कर रहे हैं, तो लक्ष्य-आधारित परिसंपत्ति आवंटन आपकी परिसंपत्तियों को मुद्रास्फीति और बाजार में उतार-चढ़ाव से बचाने में मदद करता है।",
    contentEn: `Successful investing begins with clear goals, informed decisions, and a disciplined approach. With experience in financial services since 2005, Shubh Nivesh helps individuals and families explore investment solutions for wealth creation, retirement, children's future, and tax planning.`,
    contentHi: `सफल निवेश की शुरुआत स्पष्ट लक्ष्यों, सूचित निर्णयों और अनुशासित दृष्टिकोण के साथ होती है। 2005 से वित्तीय सेवाओं में अनुभव के साथ, शुभ निवेश धन निर्माण, सेवानिवृत्ति, बच्चों के भविष्य और कर योजना के लिए समाधान प्रदान करता है।`
  }
];

const faqData = [
  {
    qEn: "How does Shubh Nivesh help in Goal-Based Planning?",
    qHi: "शुभ निवेश लक्ष्य-आधारित योजना में कैसे मदद करता है?",
    aEn: "We map your investments to specific life milestones—such as a child's higher education, purchasing a home, or creating a retirement corpus. By structuring asset allocation across equity, debt, and hybrid mutual funds based on time horizons and risk profiles, we ensure you stay on course regardless of short-term market noise.",
    aHi: "हम आपके निवेश को विशिष्ट जीवन मील के पत्थरों से जोड़ते हैं—जैसे बच्चे की उच्च शिक्षा, घर खरीदना, या सेवानिवृत्ति कोष बनाना। हम समय सीमा और जोखिम प्रोफ़ाइल के आधार पर परिसंपत्ति आवंटन की संरचना करते हैं।"
  },
  {
    qEn: "How does Mutual Fund Portfolio Rebalancing work?",
    qHi: "म्यूचुअल फंड पोर्टफोलियो रीबैलेंसिंग कैसे काम करती है?",
    aEn: "Our algorithmic review continuously monitors your existing mutual fund schemes for asset drift, sector concentration, and scheme overlap across AMCs. When allocations deviate from your target tolerance bands, recommendations are generated to restore the target mix in a tax-smart manner.",
    aHi: "हमारा रीबैलेंसिंग विश्लेषण परिसंपत्ति विचलन (ड्रिफ्ट), सेक्टर एकाग्रता और ओवरलैप के लिए आपकी मौजूदा म्यूचुअल फंड योजनाओं की जांच करता है और कर-अनुकूलित रीबैलेंसिंग सिफारिशें तैयार करता है।"
  },
  {
    qEn: "Can I start small with a Systematic Investment Plan (SIP)?",
    qHi: "क्या मैं एक व्यवस्थित निवेश योजना (SIP) के साथ छोटी शुरुआत कर सकता हूं?",
    aEn: "Yes! You can start disciplined SIP investing with as little as ₹500 to ₹1,000 per month in top-rated equity or index mutual funds. Regular monthly investing leverages rupee cost averaging and compounds significantly over 10 to 20 years.",
    aHi: "हां! आप शीर्ष रेटेड म्यूचुअल फंड में मात्र ₹500 से ₹1,000 प्रति माह से अनुशासित एसआईपी शुरू कर सकते हैं। नियमित मासिक निवेश रुपये की लागत औसत का लाभ उठाता है और दीर्घकाल में बढ़ता है।"
  },
  {
    qEn: "What products and services does Shubh Nivesh offer?",
    qHi: "शुभ निवेश कौन से उत्पाद और सेवाएं प्रदान करता है?",
    aEn: "We offer end-to-end investment and protection solutions: Mutual Funds, SIPs, National Pension System (NPS), Portfolio Management Services (PMS), Alternative Investment Funds (AIFs), Specialised Investment Funds (SIFs), Life & Health Insurance, Fixed Deposits, Stock Broking, NCDs & Bonds, and Portfolio Rebalancing.",
    aHi: "हम संपूर्ण समाधान प्रदान करते हैं: म्यूचुअल फंड, एसआईपी, एनपीएस (NPS), पीएमएस (PMS), एआईएफ (AIF), एसआईएफ (SIF), जीवन और स्वास्थ्य बीमा, फिक्स्ड डिपॉजिट, स्टॉक ब्रोकिंग, बॉन्ड और रीबैलेंसिंग।"
  },
  {
    qEn: "How do I consult directly with Ankush Jain?",
    qHi: "क्या मैं सीधे अंकुश जैन से परामर्श कर सकता हूं?",
    aEn: "You can book a 1-on-1 consultation directly through our website booking form, request a callback, or reach out instantly via WhatsApp. With experience in financial services since 2005, Ankush Jain personally reviews your portfolio and financial goals.",
    aHi: "आप हमारी वेबसाइट फॉर्म के माध्यम से सीधे 1-ऑन-1 परामर्श बुक कर सकते हैं या व्हाट्सएप पर तुरंत संपर्क कर सकते हैं। 2005 से वित्तीय सेवाओं में अनुभव के साथ, अंकुश जैन व्यक्तिगत रूप से आपके पोर्टफोलियो की समीक्षा करते हैं।"
  }
];

const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const els = document.querySelectorAll('.fade-in-section');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => obs.observe(el));

    // Fallback timer to ensure elements are visible
    const timer = setTimeout(() => {
      els.forEach(el => el.classList.add('is-visible'));
    }, 300);

    return () => {
      clearTimeout(timer);
      els.forEach(el => obs.unobserve(el));
    };
  }, []);

  const t = {
    en: {
      brandName: "SHUBH NIVESH",
      tagline: "YOUR WEALTH. YOUR GOALS. OUR GUIDANCE.",
      distributorBadge: "MUTUAL FUND DISTRIBUTOR • ANKUSH JAIN (EXPERIENCE SINCE 2005)",
      nav: ['About Us', 'Products', 'Specialisations', 'SIP Calculator', 'Certifications', 'Contact'],
      signIn: "Sign In",
      signUp: "Sign Up",
      getStarted: "Get Started",
      bookConsultation: "Book a Consultation",
      calculateSip: "SIP Calculator",
      whatsappUs: "WhatsApp Us",
      metric1Val: "Since 2005",
      metric1Label: "Experience in Financial Services",
      metric2Val: "1,500+",
      metric2Label: "Clients & Families Guided",
      metric3Val: "Goal-Based",
      metric3Label: "Disciplined Investment Planning",
      introTitle: "1. Introduction",
      introBody: "At Shubh Nivesh, we believe successful investing begins with clear goals, informed decisions, and a disciplined approach. With experience in financial services since 2005, we help individuals and families explore investment solutions for wealth creation, retirement, children's future, and tax planning.",
      aboutTitle: "2. About Us",
      aboutBody: "Ankush Jain is a Mutual Fund Distributor with experience in financial services since 2005. Through Shubh Nivesh, he focuses on helping individuals and families understand investment options and plan for important financial milestones, including asset allocation, wealth creation, retirement, children's future, tax planning, and goal-based investment planning.",
      svcTitle: "3. Products & Services",
      svcSub: "Comprehensive investment options and financial solutions tailored to your life stage and risk tolerance.",
      specialisationsTitle: "4. Our Specialisations",
      specialisationsSub: "Structuring your investments across life's most essential financial milestones.",
      credentialsTitle: "5. Certifications & Qualifications",
      credentialsSub: "Professional credentials supplied for the website: NISM Series V-D, NISM Series V-A, NISM Series XX-A, NISM Series XV, NISM Series VIII, and IRDAI-related insurance qualification/authorisation as applicable.",
      whyTitle: "7. Why Choose Shubh Nivesh?",
      whySub: "Experience since 2005 • 1,500+ clients • Personalised guidance • Goal-based planning • Long-term investment perspective",
      contactTitle: "8. Contact & Call to Action",
      contactSub: "Let's plan your financial future. Whether you are starting your first SIP, planning your child's education, preparing for retirement, or building long-term wealth, contact Shubh Nivesh to discuss your goals.",
      faqTitle: "Frequently Asked Questions",
      faqSub: "Common questions about mutual funds, SIPs, and goal-based investing with Shubh Nivesh",
      footerDisclosures: "Mutual fund investments are subject to market risks. SIP calculator outputs are illustrative only; assumed returns are not guaranteed. NPS is subject to applicable NPS rules and tax provisions. SIFs, AIFs, PMS, stocks, bonds, and other products carry different risks and eligibility requirements. Insurance products are subject to policy terms. Product availability and distribution must be consistent with applicable registrations, authorisations, and distribution arrangements. Verify credentials and product permissions before publication.",
      copyright: "© 2026 Shubh Nivesh - Ankush Jain (Mutual Fund Distributor). All rights reserved."
    },
    hi: {
      brandName: "शुभ निवेश (SHUBH NIVESH)",
      tagline: "आपकी संपत्ति। आपके लक्ष्य। हमारा मार्गदर्शन।",
      distributorBadge: "म्यूचुअल फंड वितरक • अंकुश जैन (2005 से अनुभव)",
      nav: ['हमारे बारे में', 'उत्पाद व सेवाएं', 'विशेषज्ञताएं', 'एसआईपी कैलकुलेटर', 'प्रमाणपत्र', 'संपर्क करें'],
      signIn: "लॉग इन",
      signUp: "साइन अप",
      getStarted: "शुरू करें",
      bookConsultation: "परामर्श बुक करें",
      calculateSip: "एसआईपी कैलकुलेटर",
      whatsappUs: "व्हाट्सएप करें",
      metric1Val: "2005 से",
      metric1Label: "वित्तीय सेवाओं में अनुभव",
      metric2Val: "1,500+",
      metric2Label: "संतुष्ट परिवार व निवेशक",
      metric3Val: "लक्ष्य-आधारित",
      metric3Label: "अनुशासित वित्तीय योजना",
      introTitle: "1. परिचय (Introduction)",
      introBody: "शुभ निवेश में, हमारा मानना है कि सफल निवेश की शुरुआत स्पष्ट लक्ष्यों, सूचित निर्णयों और अनुशासित दृष्टिकोण के साथ होती है। 2005 से वित्तीय सेवाओं में अनुभव के साथ, हम व्यक्तियों और परिवारों को धन निर्माण, सेवानिवृत्ति, बच्चों के भविष्य और कर योजना के लिए समाधान तलाशने में मदद करते हैं।",
      aboutTitle: "2. हमारे बारे में (About Us)",
      aboutBody: "अंकुश जैन 2005 से वित्तीय सेवाओं में अनुभव रखने वाले एक म्यूचुअल फंड वितरक हैं। शुभ निवेश के माध्यम से, वे व्यक्तियों और परिवारों को निवेश विकल्पों को समझने और महत्वपूर्ण वित्तीय मील के पत्थरों की योजना बनाने में मदद करने पर ध्यान केंद्रित करते हैं, जिसमें परिसंपत्ति आवंटन, धन निर्माण, सेवानिवृत्ति, बच्चों का भविष्य, कर योजना और लक्ष्य-आधारित निवेश शामिल हैं।",
      svcTitle: "3. उत्पाद व सेवाएं (Products & Services)",
      svcSub: "आपकी जीवन प्राथमिकताओं और जोखिम क्षमता के अनुरूप संपूर्ण वित्तीय समाधान।",
      specialisationsTitle: "4. हमारी विशेषज्ञताएं (Our Specialisations)",
      specialisationsSub: "जीवन के सबसे महत्वपूर्ण मील के पत्थरों के लिए संरचित निवेश।",
      credentialsTitle: "5. प्रमाणपत्र व योग्यताएं (Certifications & Qualifications)",
      credentialsSub: "वेबसाइट के लिए आपूर्ति किए गए क्रेडेंशियल: NISM सीरीज V-D, V-A, XX-A, XV, VIII, और IRDAI-संबंधित बीमा योग्यता।",
      whyTitle: "7. शुभ निवेश क्यों चुनें? (Why Choose Shubh Nivesh?)",
      whySub: "2005 से अनुभव • 1,500+ ग्राहक • व्यक्तिगत मार्गदर्शन • लक्ष्य-आधारित योजना • दीर्घकालिक निवेश दृष्टिकोण",
      contactTitle: "8. संपर्क व कॉल टू एक्शन (Contact & Call to Action)",
      contactSub: "आइए आपके वित्तीय भविष्य की योजना बनाएं। चाहे आप अपना पहला एसआईपी शुरू कर रहे हों, बच्चे की शिक्षा, सेवानिवृत्ति या धन निर्माण की योजना बना रहे हों, शुभ निवेश से संपर्क करें।",
      faqTitle: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
      faqSub: "म्यूचुअल फंड, एसआईपी और लक्ष्य-आधारित निवेश के बारे में सामान्य प्रश्न",
      footerDisclosures: "म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं। एसआईपी कैलकुलेटर आउटपुट केवल उदाहरणात्मक हैं; अपेक्षित रिटर्न की गारंटी नहीं है। एनपीएस लागू एनपीएस नियमों और कर प्रावधानों के अधीन है। एसआईएफ, एआईएफ, पीएमएस, स्टॉक, बॉन्ड अलग-अलग जोखिम और पात्रता आवश्यकताएं रखते हैं। बीमा उत्पाद पॉलिसी शर्तों के अधीन हैं।",
      copyright: "© 2026 शुभ निवेश - अंकुश जैन (म्यूचुअल फंड वितरक)। सर्वाधिकार सुरक्षित।"
    }
  }[language];

  // 11 Products from Section 3 Table + Rebalancing
  const productsList = [
    {
      id: 'mf',
      title: language === 'en' ? 'Mutual Funds' : 'म्यूचुअल फंड्स',
      badge: 'Core Investment',
      desc: language === 'en' 
        ? 'Investment options across equity, debt, hybrid, index, and other categories.'
        : 'इक्विटी, डेट, हाइब्रिड, इंडेक्स और अन्य श्रेणियों में निवेश विकल्प।',
      Icon: PieChart,
      gold: true
    },
    {
      id: 'sip',
      title: language === 'en' ? 'Systematic Investment Plans (SIP)' : 'व्यवस्थित निवेश योजना (SIP)',
      badge: 'Disciplined Growth',
      desc: language === 'en'
        ? 'Regular investing to support disciplined, long-term goal planning.'
        : 'अनुशासित, दीर्घकालिक लक्ष्य योजना का समर्थन करने के लिए नियमित निवेश।',
      Icon: TrendingUp,
      gold: true
    },
    {
      id: 'nps',
      title: language === 'en' ? 'National Pension System (NPS)' : 'राष्ट्रीय पेंशन प्रणाली (NPS)',
      badge: 'Retirement Corpus',
      desc: language === 'en'
        ? 'A regulated retirement-focused savings scheme designed to help build a retirement corpus, subject to NPS rules and applicable tax provisions.'
        : 'एक विनियमित सेवानिवृत्ति-केंद्रित बचत योजना जो सेवानिवृत्ति कोष बनाने में मदद करती है।',
      Icon: Landmark,
      gold: false
    },
    {
      id: 'sif',
      title: language === 'en' ? 'Specialised Investment Funds (SIFs)' : 'विशिष्ट निवेश फंड (SIFs)',
      badge: 'Subject to Rules',
      desc: language === 'en'
        ? 'Specialised strategies for eligible investors, subject to applicable rules.'
        : 'पात्र निवेशकों के लिए विशिष्ट रणनीतियां, लागू नियमों के अधीन।',
      Icon: Cpu,
      gold: false
    },
    {
      id: 'aif',
      title: language === 'en' ? 'Alternative Investment Funds (AIFs)' : 'वैकल्पिक निवेश फंड (AIFs)',
      badge: 'Eligible Investors',
      desc: language === 'en'
        ? 'Alternative investment strategies for eligible investors.'
        : 'पात्र निवेशकों के लिए वैकल्पिक निवेश रणनीतियां।',
      Icon: Briefcase,
      gold: true
    },
    {
      id: 'pms',
      title: language === 'en' ? 'Portfolio Management Services (PMS)' : 'पोर्टफोलियो प्रबंधन सेवाएं (PMS)',
      badge: 'Subject to Eligibility',
      desc: language === 'en'
        ? 'Professionally managed portfolio solutions, subject to eligibility.'
        : 'पेशेवर रूप से प्रबंधित पोर्टफोलियो समाधान, पात्रता के अधीन।',
      Icon: UserCheck,
      gold: false
    },
    {
      id: 'life-ins',
      title: language === 'en' ? 'Life Insurance' : 'जीवन बीमा',
      badge: 'Family Protection',
      desc: language === 'en'
        ? 'Financial protection options to help safeguard family needs.'
        : 'पारिवारिक जरूरतों की सुरक्षा में मदद के लिए वित्तीय सुरक्षा विकल्प।',
      Icon: Heart,
      gold: true
    },
    {
      id: 'health-ins',
      title: language === 'en' ? 'Health Insurance' : 'स्वास्थ्य बीमा',
      badge: 'Medical Coverage',
      desc: language === 'en'
        ? 'Coverage options for eligible medical expenses, subject to policy terms.'
        : 'पात्र चिकित्सा व्यय के लिए कवरेज विकल्प, पॉलिसी शर्तों के अधीन।',
      Icon: Activity,
      gold: false
    },
    {
      id: 'fd',
      title: language === 'en' ? 'Fixed Deposits' : 'फिक्स्ड डिपॉजिट (FD)',
      badge: 'Issuer Terms',
      desc: language === 'en'
        ? 'Fixed-income options subject to issuer terms and conditions.'
        : 'जारीकर्ता के नियमों और शर्तों के अधीन निश्चित आय विकल्प।',
      Icon: Lock,
      gold: false
    },
    {
      id: 'broking',
      title: language === 'en' ? 'Stock Broking' : 'स्टॉक ब्रोकिंग',
      badge: 'Registered Intermediaries',
      desc: language === 'en'
        ? 'Equity investing and trading services through applicable registered intermediaries.'
        : 'लागू पंजीकृत मध्यस्थों के माध्यम से इक्विटी निवेश और व्यापार सेवाएं।',
      Icon: BarChart3,
      gold: true
    },
    {
      id: 'bonds',
      title: language === 'en' ? 'NCDs & Bonds' : 'एनसीडी और बॉन्ड (Bonds)',
      badge: 'Fixed-Income',
      desc: language === 'en'
        ? 'Fixed-income securities to consider with attention to credit, interest-rate, and liquidity risks.'
        : 'क्रेडिट, ब्याज दर और तरलता जोखिमों पर ध्यान देते हुए निश्चित आय प्रतिभूतियां।',
      Icon: FileText,
      gold: false
    },
    {
      id: 'rebalance',
      title: language === 'en' ? 'Mutual Fund Portfolio Rebalancing' : 'म्यूचुअल फंड रीबैलेंसिंग',
      badge: 'Algorithmic Drift Audit',
      desc: language === 'en'
        ? 'Continuous monitoring of your mutual fund schemes to prune asset drift and eliminate duplicate stock overlap.'
        : 'एसेट ड्रिफ्ट को कम करने और ओवरलैप को खत्म करने के लिए निरंतर पोर्टफोलियो निगरानी।',
      Icon: RefreshCw,
      gold: true
    }
  ];

  // 6 Specialisations from Section 4
  const specialisationsList = [
    {
      title: language === 'en' ? 'Asset Allocation' : 'परिसंपत्ति आवंटन',
      desc: language === 'en'
        ? 'Structure investments across asset classes based on objectives, time horizon, and risk tolerance.'
        : 'उद्देश्यों, समय सीमा और जोखिम सहनशीलता के आधार पर परिसंपत्ति वर्गों में निवेश की संरचना।',
      Icon: PieChart,
      gold: true
    },
    {
      title: language === 'en' ? "Children's Future Planning" : 'बच्चों के भविष्य की योजना',
      desc: language === 'en'
        ? 'Plan for education and other milestones through disciplined investing.'
        : 'अनुशासित निवेश के माध्यम से शिक्षा और अन्य मील के पत्थरों की योजना बनाएं।',
      Icon: GraduationCap,
      gold: false
    },
    {
      title: language === 'en' ? 'Retirement Planning' : 'सेवानिवृत्ति योजना',
      desc: language === 'en'
        ? 'Build a long-term plan for retirement needs and financial independence.'
        : 'सेवानिवृत्ति की जरूरतों और वित्तीय स्वतंत्रता के लिए एक दीर्घकालिक योजना बनाएं।',
      Icon: Sun,
      gold: true
    },
    {
      title: language === 'en' ? 'Tax Planning' : 'कर योजना (Tax Planning)',
      desc: language === 'en'
        ? 'Explore suitable tax-planning options in line with prevailing tax laws.'
        : 'प्रचलित कर कानूनों के अनुरूप उपयुक्त कर-योजना विकल्पों का अन्वेषण करें।',
      Icon: Calculator,
      gold: false
    },
    {
      title: language === 'en' ? 'Wealth Creation' : 'धन निर्माण (Wealth Creation)',
      desc: language === 'en'
        ? 'Work towards long-term wealth creation through diversification and periodic reviews.'
        : 'विविधीकरण और आवधिक समीक्षाओं के माध्यम से दीर्घकालिक धन निर्माण की दिशा में काम करें।',
      Icon: TrendingUp,
      gold: true
    },
    {
      title: language === 'en' ? 'Goal-Based Investment Planning' : 'लक्ष्य-आधारित निवेश योजना',
      desc: language === 'en'
        ? 'Connect investments with goals such as education, a home, retirement, or future wealth.'
        : 'शिक्षा, घर, सेवानिवृत्ति या भविष्य के धन जैसे वास्तविक लक्ष्यों के साथ निवेश को जोड़ें।',
      Icon: Target,
      gold: false
    }
  ];

  // 5 Hallmarks from Section 7
  const whyChooseList = [
    {
      title: language === 'en' ? 'Experience Since 2005' : '2005 से समृद्ध अनुभव',
      desc: language === 'en'
        ? 'Over 20 years of continuous financial market experience navigating bull and bear market cycles with composure.'
        : 'बाजार के सभी चरणों में 20 से अधिक वर्षों का अटूट वित्तीय अनुभव।',
      Icon: Calendar,
      gold: true
    },
    {
      title: language === 'en' ? '1,500+ Clients' : '1,500+ संतुष्ट परिवार',
      desc: language === 'en'
        ? 'Trusted by more than 1,500 individuals and families across India for personal financial milestone guidance.'
        : 'पूरे भारत में 1,500 से अधिक व्यक्तियों और परिवारों का विश्वसनीय वित्तीय साथी।',
      Icon: Users,
      gold: false
    },
    {
      title: language === 'en' ? 'Personalised Guidance' : 'व्यक्तिगत मार्गदर्शन',
      desc: language === 'en'
        ? 'Objective, fiduciary guidance tailored directly to your cash flow, family dependencies, and comfort level.'
        : 'आपकी पारिवारिक आवश्यकताओं और लक्ष्यों के अनुरूप तैयार किया गया व्यक्तिगत परामर्श।',
      Icon: UserCheck,
      gold: true
    },
    {
      title: language === 'en' ? 'Goal-Based Planning' : 'लक्ष्य-आधारित योजना',
      desc: language === 'en'
        ? 'Portfolios purposefully aligned to children education, retirement, and family security rather than speculative noise.'
        : 'अटकलों के बजाय बच्चों की उच्च शिक्षा, घर और सेवानिवृत्ति जैसे वास्तविक लक्ष्यों पर केंद्रित निवेश।',
      Icon: Target,
      gold: false
    },
    {
      title: language === 'en' ? 'Long-Term Perspective' : 'दीर्घकालिक दृष्टिकोण',
      desc: language === 'en'
        ? 'Harnessing the proven magic of compound interest through disciplined, patient, systematic investing.'
        : 'अनुशासित और धैर्यवान निवेश के माध्यम से चक्रवृद्धि ब्याज की शक्ति का लाभ उठाना।',
      Icon: Clock,
      gold: true
    }
  ];

  const whatsappDirectUrl = `https://wa.me/919810000000?text=${encodeURIComponent(
    `Hello Shubh Nivesh (Ankush Jain),\n\nI visited your website and would like to discuss goal-based investment planning and mutual funds for my family. Please guide me.`
  )}`;

  return (
    <div className="lp-wrapper">
      <ParticleBackground />

      {/* Structured Schema.org Data for Shubh Nivesh */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Shubh Nivesh",
            "alternateName": "Shubh Nivesh Mutual Fund Distributor",
            "founder": {
              "@type": "Person",
              "name": "Ankush Jain",
              "jobTitle": "Mutual Fund Distributor (Experience Since 2005)"
            },
            "url": "https://aicapitalinvestment.com",
            "description": "Shubh Nivesh: Mutual Fund Distribution, SIP planning, NPS, PMS, AIF, SIF, Insurance, and Goal-Based Planning with Ankush Jain (Experience Since 2005).",
            "telephone": "+91-9810000000",
            "areaServed": "IN"
          })
        }} 
      />

      {/* Schema.org FAQPage JSON-LD Structured Data */}
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

      {/* ── Top Header Bar ─────────────────────────────────────────── */}
      <header className="lp-header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="lp-container lp-header-inner">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer', flexShrink: 0 }}>
            <div className="logo-symbol" style={{ background: 'linear-gradient(135deg, #d4af37, #00e676)', color: '#030a05', fontWeight: 900, borderRadius: '8px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>SN</div>
            <div className="logo-text" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.4px', display: 'block' }}>SHUBH NIVESH</span>
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.5px', color: 'var(--color-gold)', display: 'block', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}>
                Your Wealth • Your Goals • Our Guidance
              </span>
            </div>
          </div>

          <nav className={`lp-nav-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
            <ul className="lp-nav">
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="#about">{t.nav[0]}</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="#services">{t.nav[1]}</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="#specialisations">{t.nav[2]}</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="#calculator" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{t.nav[3]}</a>
              </li>
              <li onClick={() => { setMobileMenuOpen(false); onNavigate('accreditation'); }}>
                <a href="/accreditation" onClick={(e) => { e.preventDefault(); onNavigate('accreditation'); }}>{t.nav[4]}</a>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <a href="#contact">{t.nav[5]}</a>
              </li>
              <li className="mobile-only-nav-item" style={{ marginTop: '16px', flexDirection: 'column', gap: '10px', width: '100%' }}>
                <button 
                  className="btn btn-gradient-started" 
                  onClick={() => { setMobileMenuOpen(false); onNavigate('signup'); }}
                  style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <UserPlus size={16} /> {t.signUp} / {t.getStarted}
                </button>
                <button 
                  className="btn btn-green-outline" 
                  onClick={() => { setMobileMenuOpen(false); onNavigate('login'); }}
                  style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <LogIn size={16} /> {t.signIn}
                </button>
                <a 
                  href={whatsappDirectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn" 
                  style={{ padding: '12px', fontSize: '0.9rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: '8px' }}
                >
                  <MessageCircle size={16} /> WhatsApp Us
                </a>
              </li>
            </ul>
          </nav>

          <div className="lp-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
              className="btn btn-green-outline"
              style={{ fontSize: '0.74rem', padding: '5px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '3px' }}
              aria-label="Switch language"
            >
              <Globe size={12} /> {language === 'en' ? 'हिंदी' : 'EN'}
            </button>
            
            {/* Direct WhatsApp CTA Pill */}
            <a 
              href={whatsappDirectUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn"
              title="Chat on WhatsApp"
              style={{
                fontSize: '0.76rem',
                padding: '6px 11px',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(37, 211, 102, 0.12)',
                color: '#25D366',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={13} /> WhatsApp
            </a>

            {/* Sign In Button */}
            <button 
              className="btn btn-green-outline" 
              onClick={() => onNavigate('login')}
              style={{ fontSize: '0.78rem', padding: '6px 13px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <LogIn size={13} /> {t.signIn}
            </button>

            {/* Sign Up Button (Requested!) */}
            <button 
              className="btn btn-gradient-started" 
              onClick={() => onNavigate('signup')}
              style={{ fontSize: '0.78rem', padding: '6px 15px', borderRadius: '20px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <UserPlus size={13} /> {t.signUp}
            </button>
            
            {/* Mobile Hamburger Button */}
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation menu">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main className="lp-main">

        {/* ── Hero Section (Page 1) ────────────────────────────────── */}
        <section className="lp-hero" id="home">
          <div className="lp-container lp-hero-inner">
            <div className="lp-hero-text fade-in-section">
              {/* Distributor Authority Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '24px',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                marginBottom: '16px'
              }}>
                <Award size={14} style={{ color: 'var(--color-gold)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  {t.distributorBadge}
                </span>
              </div>

              <h1 className="lp-hero-title" style={{ fontSize: '2.8rem', lineHeight: 1.15 }}>
                SHUBH NIVESH
                <span style={{
                  display: 'block',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  background: 'linear-gradient(90deg, #d4af37, #00e676)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '1.5px',
                  marginTop: '10px'
                }}>
                  {t.tagline}
                </span>
              </h1>

              <p className="lp-hero-sub" style={{ fontSize: '0.98rem', lineHeight: 1.65 }}>
                {t.heroSub}
              </p>

              <div className="lp-hero-cta-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button 
                  className="btn btn-gradient-started" 
                  onClick={() => onNavigate('signup')}
                  style={{ padding: '12px 24px', fontSize: '0.92rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <UserPlus size={16} /> {t.signUp} / {t.getStarted}
                </button>
                <button 
                  className="btn btn-gold" 
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ padding: '12px 22px', fontSize: '0.92rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Calculator size={16} /> {t.calculateSip}
                </button>
                <button 
                  className="btn btn-green-outline" 
                  onClick={() => onNavigate('login')}
                  style={{ padding: '12px 20px', fontSize: '0.92rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <LogIn size={16} /> {t.signIn}
                </button>
                <a 
                  href={whatsappDirectUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    padding: '12px 20px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    background: 'rgba(37, 211, 102, 0.15)',
                    color: '#25D366',
                    border: '1px solid rgba(37, 211, 102, 0.4)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none'
                  }}
                >
                  <MessageCircle size={16} /> {t.whatsappUs}
                </a>
              </div>
            </div>

            <div className="lp-hero-graphic fade-in-section">
              <HeroCanvas />
            </div>
          </div>
        </section>

        {/* ── Highlights Ribbon (Page 1 Proposal Header) ────────────── */}
        <section className="lp-metrics fade-in-section" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '24px 0' }}>
          <div className="lp-container lp-metrics-inner">
            <div className="lp-metric-item">
              <div className="lp-metric-icon gold"><Calendar size={22} /></div>
              <div>
                <div className="lp-metric-val">EXPERIENCE SINCE 2005</div>
                <p className="lp-metric-label">20+ Years in Financial Services</p>
              </div>
            </div>
            <div className="lp-metric-item">
              <div className="lp-metric-icon green"><Users size={22} /></div>
              <div>
                <div className="lp-metric-val">1,500+ CLIENTS</div>
                <p className="lp-metric-label">Trusted Individuals & Families</p>
              </div>
            </div>
            <div className="lp-metric-item">
              <div className="lp-metric-icon gold"><Target size={22} /></div>
              <div>
                <div className="lp-metric-val">GOAL-BASED PLANNING</div>
                <p className="lp-metric-label">Milestone-Oriented Wealth Strategies</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 1: Introduction & Section 2: About Us (Page 1) ── */}
        <section className="lp-section fade-in-section" id="about">
          <div className="lp-container">
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                <Award size={14} /> Shubh Nivesh Guidance Philosophy
              </div>
              <h2 className="lp-section-title">{t.aboutTitle}</h2>
              <p className="lp-section-sub" style={{ maxWidth: '780px', margin: '0 auto' }}>
                Your Wealth. Your Goals. Our Guidance.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '36px' }}>
              {/* Introduction Card */}
              <div className="glass-card gold-border" style={{ padding: '32px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div className="lp-feat-icon gold" style={{ marginBottom: 0 }}><Target size={22} /></div>
                  <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>{t.introTitle}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.7 }}>
                  {t.introBody}
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(0,230,118,0.1)', color: 'var(--color-green)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(0,230,118,0.2)' }}>✓ Wealth Creation</span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(212,175,55,0.1)', color: 'var(--color-gold)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)' }}>✓ Retirement Corpus</span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(56,189,248,0.1)', color: '#38bdf8', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>✓ Children's Future</span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(168,85,247,0.1)', color: '#c084fc', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(168,85,247,0.2)' }}>✓ Tax Planning</span>
                </div>
              </div>

              {/* About Ankush Jain Card */}
              <div className="glass-card green-border" style={{ padding: '32px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div className="lp-feat-icon green" style={{ marginBottom: 0 }}><UserCheck size={22} /></div>
                  <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>Ankush Jain (Mutual Fund Distributor)</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.7 }}>
                  {t.aboutBody}
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AMFI & NISM Certifications:</span>
                    <div style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 600 }}>Series V-A, V-D, XX-A, XV, VIII, IRDAI</div>
                  </div>
                  <button 
                    onClick={() => onNavigate('accreditation')}
                    className="btn btn-green-outline"
                    style={{ fontSize: '0.76rem', padding: '6px 12px', borderRadius: '16px' }}
                  >
                    View Credentials
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Products & Services (Page 1) ───────────────── */}
        <section className="lp-section fade-in-section" id="services">
          <div className="lp-container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                <Briefcase size={14} /> Full Spectrum Solutions
              </div>
              <h2 className="lp-section-title">{t.svcTitle}</h2>
              <p className="lp-section-sub" style={{ maxWidth: '680px', margin: '0 auto' }}>
                {t.svcSub}
              </p>
            </div>

            <div className="lp-services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {productsList.map(({ id, title, badge, desc, Icon, gold }) => (
                <div key={id} className={`glass-card lp-service-card ${gold ? 'gold-border' : 'green-border'}`} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div className={`lp-svc-icon ${gold ? 'gold' : 'green'}`} style={{ marginBottom: 0 }}><Icon size={22} /></div>
                    <span className={`lp-service-badge ${gold ? 'gold' : 'green'}`}>{badge}</span>
                  </div>
                  <h3 style={{ fontSize: '1.12rem', marginBottom: '10px', color: '#ffffff', fontWeight: 700 }}>{title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.55', flex: 1 }}>{desc}</p>
                  
                  {id === 'rebalance' && (
                    <button 
                      type="button"
                      onClick={() => onNavigate('rebalancing')}
                      className="btn btn-gold"
                      style={{ marginTop: '16px', fontSize: '0.82rem', padding: '8px 18px', borderRadius: '18px', display: 'inline-flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-start', cursor: 'pointer', fontWeight: 600 }}
                    >
                      {language === 'en' ? 'Explore Rebalancing Portal' : 'रीबैलेंसिंग पोर्टल देखें'} <ArrowRight size={14} />
                    </button>
                  )}
                  {id === 'sip' && (
                    <button 
                      type="button"
                      onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                      className="btn btn-green-outline"
                      style={{ marginTop: '16px', fontSize: '0.82rem', padding: '8px 18px', borderRadius: '18px', display: 'inline-flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-start', cursor: 'pointer', fontWeight: 600 }}
                    >
                      <Calculator size={14} /> {language === 'en' ? 'Open SIP Calculator' : 'एसआईपी कैलकुलेटर खोलें'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: Our Specialisations (Page 1 & 2) ────────────── */}
        <section className="lp-section fade-in-section" id="specialisations" style={{ background: 'rgba(0,0,0,0.25)', padding: '60px 0' }}>
          <div className="lp-container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                <Target size={14} /> Goal-Based Investment Pillars
              </div>
              <h2 className="lp-section-title">{t.specialisationsTitle}</h2>
              <p className="lp-section-sub" style={{ maxWidth: '640px', margin: '0 auto' }}>
                {t.specialisationsSub}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {specialisationsList.map(({ title, desc, Icon, gold }) => (
                <div key={title} className={`glass-card ${gold ? 'gold-border' : 'green-border'}`} style={{ padding: '28px', borderRadius: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div className={`lp-feat-icon ${gold ? 'gold' : 'green'}`} style={{ marginBottom: 0 }}>
                      <Icon size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>{title}</h3>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 6: Interactive SIP Calculator (Page 3) ─────────── */}
        <section className="lp-section fade-in-section" id="calculator" style={{ padding: '60px 0' }}>
          <div className="lp-container" style={{ maxWidth: '1000px' }}>
            <SipCalculator 
              language={language}
              onConsult={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </div>
        </section>

        {/* ── Section 5: Certifications & Qualifications (Page 2) ───── */}
        <section className="lp-section fade-in-section" id="credentials">
          <div className="lp-container">
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                <Award size={14} /> Fiduciary Verification
              </div>
              <h2 className="lp-section-title">{t.credentialsTitle}</h2>
              <p className="lp-section-sub" style={{ maxWidth: '720px', margin: '0 auto' }}>
                {t.credentialsSub}
              </p>
            </div>

            {/* Embedded Wealth Manager & Certificate Badges */}
            <WealthManagerCertificates />

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button 
                onClick={() => onNavigate('accreditation')}
                className="btn btn-gold"
                style={{ padding: '10px 24px', fontSize: '0.88rem', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Award size={16} /> View Verified Certificate Documents & Regulatory Licenses <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* ── Section 7: Why Choose Shubh Nivesh? (Page 3) ──────────── */}
        <section className="lp-section fade-in-section" id="why-us" style={{ background: 'rgba(0,0,0,0.2)', padding: '60px 0' }}>
          <div className="lp-container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                <ShieldCheck size={14} /> The Shubh Nivesh Advantage
              </div>
              <h2 className="lp-section-title">{t.whyTitle}</h2>
              <p className="lp-section-sub" style={{ maxWidth: '640px', margin: '0 auto' }}>
                {t.whySub}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {whyChooseList.map(({ title, desc, Icon, gold }) => (
                <div key={title} className={`glass-card ${gold ? 'gold-border' : 'green-border'}`} style={{ padding: '24px', borderRadius: '16px' }}>
                  <div className={`lp-feat-icon ${gold ? 'gold' : 'green'}`} style={{ marginBottom: '14px' }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '8px', fontWeight: 700 }}>{title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 8: Contact & Call to Action (Page 3) ──────────── */}
        <section className="lp-section fade-in-section" id="contact" style={{ padding: '60px 0' }}>
          <div className="lp-container" style={{ maxWidth: '850px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                <Phone size={14} /> Get In Touch
              </div>
              <h2 className="lp-section-title">{t.contactTitle}</h2>
              <p className="lp-section-sub" style={{ maxWidth: '680px', margin: '0 auto', fontSize: '0.95rem' }}>
                {t.contactSub}
              </p>

              {/* 3 Quick Buttons matching proposal */}
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
                <button 
                  onClick={() => {
                    const el = document.getElementById('consultation-form-wrap');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-gold"
                  style={{ padding: '12px 24px', fontSize: '0.9rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Phone size={16} /> Book a Consultation
                </button>
                <button 
                  onClick={() => onNavigate('signup')}
                  className="btn btn-gradient-started"
                  style={{ padding: '12px 24px', fontSize: '0.9rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <UserPlus size={16} /> Start a SIP / Sign Up
                </button>
                <a 
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    padding: '12px 24px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    borderRadius: '8px',
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none'
                  }}
                >
                  <MessageCircle size={16} /> WhatsApp Us
                </a>
              </div>
            </div>

            <div id="consultation-form-wrap">
              <LeadCaptureForm language={language} />
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
                      aria-label={`Toggle FAQ: ${language === 'en' ? item.qEn : item.qHi}`}
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

      {/* ── Footer with Verbatim Proposal Disclosures ──────────────── */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer-grid">
          <div className="lp-footer-brand">
            <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
              <div className="logo-symbol" style={{ background: 'linear-gradient(135deg, #d4af37, #00e676)', color: '#030a05', fontWeight: 900 }}>SN</div>
              <div className="logo-text">SHUBH NIVESH<span>{t.tagline}</span></div>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
              Mutual Fund Distributor website for Ankush Jain (Experience in financial services since 2005). Helping individuals and families achieve their life goals with disciplined investing.
            </p>
          </div>

          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', letterSpacing: '0.5px' }}>Quick Links</div>
            <ul className="lp-footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Products & Services</a></li>
              <li><a href="#specialisations">Specialisations</a></li>
              <li><a href="#calculator">SIP Calculator</a></li>
              <li><a href="/accreditation" onClick={(e) => { e.preventDefault(); onNavigate('accreditation'); }}>Certifications</a></li>
              <li><a href="/services/mutual-fund-rebalancing" onClick={(e) => { e.preventDefault(); onNavigate('rebalancing'); }}>MF Rebalancing</a></li>
              <li><a href="/login" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} style={{ color: 'var(--color-gold)' }}>Client Sign In</a></li>
              <li><a href="/signup" onClick={(e) => { e.preventDefault(); onNavigate('signup'); }} style={{ color: 'var(--color-green)' }}>Open Account (Sign Up)</a></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', letterSpacing: '0.5px' }}>Products Offered</div>
            <ul className="lp-footer-links">
              <li>Mutual Funds & SIPs</li>
              <li>National Pension System (NPS)</li>
              <li>Portfolio Management (PMS)</li>
              <li>Alternative Investment Funds (AIF)</li>
              <li>Specialised Investment Funds (SIF)</li>
              <li>Life & Health Insurance</li>
              <li>Fixed Deposits, NCDs & Bonds</li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', letterSpacing: '0.5px' }}>Contact & Credentials</div>
            <ul className="lp-footer-links">
              <li>Ankush Jain (Mutual Fund Distributor)</li>
              <li>Financial Services Since 2005</li>
              <li>NISM Series V-A, V-D, XX-A, XV, VIII</li>
              <li>IRDAI Insurance Authorisation</li>
              <li><a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366' }}>Chat on WhatsApp</a></li>
            </ul>
          </div>
        </div>

        {/* Verbatim Page 3 Important Disclosures */}
        <div className="lp-container" style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '24px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
              Important Regulatory Disclosures
            </span>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              {t.footerDisclosures}
            </p>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <div className="lp-container">
            <span>{t.copyright}</span>
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
};

export default LandingPage;
