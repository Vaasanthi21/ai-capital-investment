export interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  series: string;
  regNo: string;
  remarks: string;
  testDate: string;
  testCentre: string;
  language: string;
  marks: string;
  issueDate: string;
  place: string;
  validTill: string;
  pan: string;
  registration: string;
  enrolment: string;
  certificationNo?: string;
  cpeCode?: string;
  modeOfDelivery?: string;
  registrar: string;
  registrarTitle: string;
  imageUrl: string;
  image: string;
  pdfUrl?: string;
  verificationUrl: string;
  description: string;
  status: string;
  issuer: string;
}

export interface LedgerItem {
  date: string;
  event: string;
  ref: string;
  status: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  avatar: string;
  photo: string;
  image?: string;
  accent: string;
  sebiReg: string;
  pan: string;
  registration: string;
  enrolment: string;
  experience: string;
  brief: string;
  bio: string;
  specializations: string[];
  stats: { label: string; value: string }[];
  certificates: Certificate[];
  ledger: LedgerItem[];
}

export const accreditationData: Record<string, Profile> = {
  Ankush: {
    name: "Ankush Jain",
    role: "Portfolio Manager & Research Analyst",
    tagline: "Strategic wealth architect specializing in portfolio management and equity research.",
    avatar: "AJ",
    photo: "/ankush_jain.png",
    image: "/ankush_jain.png",
    accent: "gold",
    sebiReg: "SEBI Reg ID: NISM-201700064070",
    pan: "AGRPJ5771E",
    registration: "NISM-201700064070",
    enrolment: "2310310933",
    experience: "8+ Years Institutional Wealth Management",
    brief: "Leads algorithmic asset allocation, neural network portfolio strategies, and discretionary Portfolio Management Services (PMS) for High-Net-Worth Individuals.",
    bio: "Certified under SEBI Investment Advisers and Portfolio Managers Regulations. Specializes in quantitative risk modeling, equity research, and multi-asset portfolio restructuring.",
    specializations: ["Portfolio Management Services", "Mutual Fund Distribution", "Equity Research & Analysis"],
    stats: [
      { label: "Experience", value: "8+ Years" },
      { label: "NISM Exams", value: "3 Series" },
      { label: "Mandate", value: "PMS & Research" },
      { label: "AUM Monitored", value: "₹500 Cr+" }
    ],
    certificates: [
      {
        id: "ankush-xxia",
        title: "NISM-Series-XXI-A",
        subtitle: "Portfolio Management Services (PMS) Distributors Certification Examination",
        type: "CERTIFICATION EXAMINATION",
        series: "NISM Series XXI-A",
        regNo: "NISM-201700064070",
        remarks: "PASS",
        testDate: "October 26, 2023",
        testCentre: "Ranchi - NSEiT - Kantatoli Chowk",
        language: "English",
        marks: "60.5",
        issueDate: "October 29, 2023",
        place: "Mumbai",
        validTill: "October 25, 2026",
        pan: "AGRPJ5771E",
        registration: "NISM-201700064070",
        enrolment: "2310310933",
        certificationNo: "2310310933",
        modeOfDelivery: "Computer Based Test",
        registrar: "Sunil Kadam",
        registrarTitle: "Registrar",
        image: "/certificates/ankush_jain_nism_xxia_pms_advisor.png",
        imageUrl: "/certificates/ankush_jain_nism_xxia_pms_advisor.png",
        pdfUrl: "/certificates/ankush_jain_nism_xxia_pms_advisor.pdf",
        verificationUrl: "https://certifications.nism.ac.in/nismskills",
        description: "Certified under SEBI Regulations 2007 (Enrolment: 2310310933). Authorized for discretionary & non-discretionary PMS portfolio restructuring.",
        status: "Active & Verified",
        issuer: "NISM / SEBI"
      },
      {
        id: "ankush-va",
        title: "NISM Series V-A",
        subtitle: "Mutual Fund Distributors Continuing Professional Education Program",
        type: "CONTINUING PROFESSIONAL EDUCATION (CPE)",
        series: "NISM Series V-A",
        regNo: "Cert No: 2320200725",
        remarks: "COMPLETED",
        testDate: "15-Jul-2023",
        testCentre: "Ranchi",
        language: "English",
        marks: "CPE Completed",
        issueDate: "15-Jul-2023",
        place: "Ranchi",
        validTill: "30-Sep-2026",
        pan: "AGRPJ5771E",
        registration: "NISM-201700064070",
        enrolment: "2320200725",
        certificationNo: "2320200725",
        cpeCode: "CIEL/NISMS05A/7356/15-Jul-2023/Ranchi",
        modeOfDelivery: "Continuing Professional Education (CPE)",
        registrar: "Sunil Kadam",
        registrarTitle: "Registrar",
        image: "/certificates/ankush_jain_nism_va_mutual_funds.jpg",
        imageUrl: "/certificates/ankush_jain_nism_va_mutual_funds.jpg",
        pdfUrl: "/certificates/ankush_jain_nism_va_mutual_funds.pdf",
        verificationUrl: "https://certifications.nism.ac.in/nismskills",
        description: "Certified under SEBI Regulations 2007 via CPE. Specializes in mutual fund risk evaluation, portfolio construction, and tax-efficient strategies.",
        status: "Active & Verified",
        issuer: "NISM / SEBI"
      },
      {
        id: "ankush-xv",
        title: "NISM-Series-XV",
        subtitle: "Research Analyst Certification Examination",
        type: "CERTIFICATION EXAMINATION",
        series: "NISM Series XV",
        regNo: "NISM-201700064070",
        remarks: "PASS",
        testDate: "April 05, 2024",
        testCentre: "Ranchi - NSEiT - Kantatoli Chowk",
        language: "English",
        marks: "61",
        issueDate: "April 08, 2024",
        place: "Ranchi",
        validTill: "April 04, 2027",
        pan: "AGRPJ5771E",
        registration: "NISM-201700064070",
        enrolment: "2410108420",
        certificationNo: "2410108420",
        modeOfDelivery: "Computer Based Test",
        registrar: "Sunil Kadam",
        registrarTitle: "Registrar",
        image: "/certificates/ankush_jain_nism_xv_research_analyst.png",
        imageUrl: "/certificates/ankush_jain_nism_xv_research_analyst.png",
        pdfUrl: "/certificates/ankush_jain_nism_xv_research_analyst.pdf",
        verificationUrl: "https://certifications.nism.ac.in/nismskills",
        description: "Certified under SEBI Regulations 2007 (Enrolment: 2410108420). Certified for equity valuation, quantitative modeling, and macro research.",
        status: "Active & Verified",
        issuer: "NISM / SEBI"
      }
    ],
    ledger: [
      { date: "2024-04-05", event: "NISM Series XV Research Analyst Renewal", ref: "2410108420", status: "VERIFIED" },
      { date: "2023-10-26", event: "NISM Series XXI-A PMS Certification", ref: "2310310933", status: "VERIFIED" },
      { date: "2023-07-15", event: "NISM Series V-A Mutual Funds CPE", ref: "2320200725", status: "VERIFIED" }
    ]
  },
  Anant: {
    name: "Anant Jain",
    role: "Mutual Fund & Commodities Specialist",
    tagline: "Diversified investment advisor spanning mutual funds and commodity derivatives markets.",
    avatar: "ANJ",
    photo: "/anant_jain.png",
    image: "/anant_jain.png",
    accent: "green",
    sebiReg: "SEBI Reg ID: NISM-202300039334",
    pan: "AKDPJ2687D",
    registration: "NISM-202300039334",
    enrolment: "2310359018",
    experience: "6+ Years Capital Markets & Advisory",
    brief: "Specializes in commodity futures & options hedging, fixed income yield optimization, tax-loss harvesting, and mutual fund portfolio risk alignment.",
    bio: "Certified derivatives specialist and fixed-income strategist. Focuses on downside risk mitigation, yield enhancement strategies, and systematic asset allocation.",
    specializations: ["Mutual Fund Distribution", "Commodity Derivatives", "Continuing Professional Education"],
    stats: [
      { label: "Experience", value: "6+ Years" },
      { label: "NISM Exams", value: "2 Series" },
      { label: "Mandate", value: "Derivatives & Yield" },
      { label: "Hedging Volume", value: "₹300 Cr+" }
    ],
    certificates: [
      {
        id: "anant-va",
        title: "NISM-Series-V-A",
        subtitle: "Mutual Fund Distributors Certification Examination",
        type: "CERTIFICATION EXAMINATION",
        series: "NISM Series V-A",
        regNo: "NISM-202300039334",
        remarks: "PASS",
        testDate: "November 28, 2023",
        testCentre: "Ranchi - NSEiT - Kantatoli Chowk",
        language: "English",
        marks: "61",
        issueDate: "December 01, 2023",
        place: "Ranchi",
        validTill: "November 27, 2026",
        pan: "AKDPJ2687D",
        registration: "NISM-202300039334",
        enrolment: "2310359018",
        certificationNo: "2310359018",
        modeOfDelivery: "Computer Based Test",
        registrar: "Sunil Kadam",
        registrarTitle: "Registrar",
        image: "/certificates/anant_jain_nism_va_mutual_funds.png",
        imageUrl: "/certificates/anant_jain_nism_va_mutual_funds.png",
        pdfUrl: "/certificates/anant_jain_nism_va_mutual_funds.pdf",
        verificationUrl: "https://certifications.nism.ac.in/nismskills",
        description: "Certified under SEBI Regulations 2007 (Enrolment: 2310359018). Certified in systematic investment planning (SIP) and fund risk profiling.",
        status: "Active & Verified",
        issuer: "NISM / SEBI"
      },
      {
        id: "anant-xvi",
        title: "NISM Series XVI",
        subtitle: "Commodity Derivatives Continuing Professional Education Program",
        type: "CONTINUING PROFESSIONAL EDUCATION (E-CPE)",
        series: "NISM Series XVI",
        regNo: "Cert No: 2530395922",
        remarks: "COMPLETED",
        testDate: "29-Sep-2025",
        testCentre: "Online",
        language: "English",
        marks: "e-CPE Completed",
        issueDate: "10-Oct-2025",
        place: "Mumbai",
        validTill: "28-Sep-2028",
        pan: "AKDPJ2687D",
        registration: "NISM-202300039334",
        enrolment: "2530395922",
        certificationNo: "2530395922",
        cpeCode: "eCPE-NISM-XVI-2025",
        modeOfDelivery: "e-CPE Online",
        registrar: "Sunil Kadam",
        registrarTitle: "Registrar",
        image: "/certificates/anant_jain_nism_xvi_commodity_derivatives.jpg",
        imageUrl: "/certificates/anant_jain_nism_xvi_commodity_derivatives.jpg",
        pdfUrl: "/certificates/anant_jain_nism_xvi_commodity_derivatives.pdf",
        verificationUrl: "https://certifications.nism.ac.in/nismskills",
        description: "Certified under SEBI Regulations 2007 via e-CPE. Specializes in commodity derivatives risk management, options hedging, and clearing mechanics.",
        status: "Active & Verified",
        issuer: "NISM / SEBI"
      }
    ],
    ledger: [
      { date: "2025-09-29", event: "NISM Series XVI Commodity Derivatives e-CPE", ref: "2530395922", status: "VERIFIED" },
      { date: "2023-11-28", event: "NISM Series V-A Mutual Funds Certification", ref: "2310359018", status: "VERIFIED" }
    ]
  }
};
