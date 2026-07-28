import React, { useState } from 'react';
import { Award, ShieldCheck, ExternalLink, X, FileText, CheckCircle2, Building2 } from 'lucide-react';

interface CertificateItem {
  title: string;
  series: string;
  regNo: string;
  issuedDate: string;
  validity: string;
  imageUrl: string;
  pdfUrl?: string;
  description: string;
}

interface WealthManager {
  id: string;
  name: string;
  role: string;
  experience: string;
  sebiReg: string;
  avatar: string;
  image?: string;
  stats: { label: string; value: string }[];
  bio: string;
  certificates: CertificateItem[];
}

const wealthManagersData: WealthManager[] = [
  {
    id: 'ankush-jain',
    name: 'Ankush Jain',
    role: 'Senior Portfolio Manager & Chief Quantitative Analyst',
    experience: '8+ Years Institutional Wealth Management',
    sebiReg: 'SEBI Reg ID: NISM-201700064070',
    avatar: 'AJ',
    image: '/ankush_jain.png',
    stats: [
      { label: 'Experience', value: '8+ Years' },
      { label: 'NISM Exams', value: '3 Series' },
      { label: 'Mandate', value: 'PMS & Research' }
    ],
    bio: 'Leads algorithmic asset allocation, neural network portfolio strategies, and discretionary Portfolio Management Services (PMS) for High-Net-Worth Individuals.',
    certificates: [
      {
        title: 'Portfolio Management Services (PMS) Distributors',
        series: 'NISM Series XXI-A',
        regNo: 'NISM-201700064070',
        issuedDate: '29-Oct-2023',
        validity: 'Valid till 25-Oct-2026',
        imageUrl: '/certificates/ankush_jain_nism_xxia_pms_advisor.png',
        pdfUrl: '/certificates/ankush_jain_nism_xxia_pms_advisor.pdf',
        description: 'Certified under SEBI Regulations 2007 (Enrolment: 2310310933, Score: 60.5/100, NSEiT Ranchi). Authorized for discretionary & non-discretionary PMS portfolio restructuring.'
      },
      {
        title: 'Research Analyst Certification',
        series: 'NISM Series XV',
        regNo: 'NISM-201700064070',
        issuedDate: '08-Apr-2024',
        validity: 'Valid till 04-Apr-2027',
        imageUrl: '/certificates/ankush_jain_nism_xv_research_analyst.png',
        pdfUrl: '/certificates/ankush_jain_nism_xv_research_analyst.pdf',
        description: 'Certified under SEBI Regulations 2007 (Enrolment: 2410108420, Score: 61/100, NSEiT Ranchi). Certified for equity valuation, quantitative modeling, and macro research.'
      },
      {
        title: 'Mutual Fund Distributors CPE Certification',
        series: 'NISM Series V-A',
        regNo: 'Cert No: 2320200725',
        issuedDate: '20-Jul-2023',
        validity: 'Valid till 30-Sep-2026',
        imageUrl: '/certificates/ankush_jain_nism_va_mutual_funds.jpg',
        pdfUrl: '/certificates/ankush_jain_nism_va_mutual_funds.pdf',
        description: 'Certified under SEBI Regulations 2007 via CPE (Ranchi). Specializes in mutual fund risk evaluation, portfolio construction, and tax-efficient strategies.'
      }
    ]
  },
  {
    id: 'anant-jain',
    name: 'Anant Jain',
    role: 'Head of Derivatives & Fixed Income Strategy',
    experience: '6+ Years Capital Markets & Advisory',
    sebiReg: 'SEBI Reg ID: NISM-202300039334',
    avatar: 'ANJ',
    image: '/anant_jain.png',
    stats: [
      { label: 'Experience', value: '6+ Years' },
      { label: 'NISM Exams', value: '2 Series' },
      { label: 'Mandate', value: 'Derivatives & Yield' }
    ],
    bio: 'Specializes in commodity futures & options hedging, fixed income yield optimization, tax-loss harvesting, and mutual fund portfolio risk alignment.',
    certificates: [
      {
        title: 'Commodity Derivatives Certification',
        series: 'NISM Series XVI',
        regNo: 'Cert No: 2530395922',
        issuedDate: '10-Oct-2025',
        validity: 'Valid till 28-Sep-2028',
        imageUrl: '/certificates/anant_jain_nism_xvi_commodity_derivatives.jpg',
        pdfUrl: '/certificates/anant_jain_nism_xvi_commodity_derivatives.pdf',
        description: 'Certified under SEBI Regulations 2007 via e-CPE (Online). Specializes in commodity derivatives risk management, options hedging, and clearing mechanics.'
      },
      {
        title: 'Mutual Fund Distributors Certification',
        series: 'NISM Series V-A',
        regNo: 'NISM-202300039334',
        issuedDate: '01-Dec-2023',
        validity: 'Valid till 27-Nov-2026',
        imageUrl: '/certificates/anant_jain_nism_va_mutual_funds.png',
        pdfUrl: '/certificates/anant_jain_nism_va_mutual_funds.pdf',
        description: 'Certified under SEBI Regulations 2007 (Enrolment: 2310359018, Score: 61/100, NSEiT Ranchi). Certified in systematic investment planning (SIP) and fund risk profiling.'
      }
    ]
  }
];

const WealthManagerCertificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<{ cert: CertificateItem; managerName: string } | null>(null);

  return (
    <section className="lp-section fade-in-section" id="wealth-managers-certificates" style={{ padding: '60px 0' }}>
      <div className="lp-container">
        
        {/* Section Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.35)', borderRadius: '24px', fontSize: '0.8rem', color: '#ffe066', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
            <Award size={16} /> SEBI & NISM Accredited Fiduciary Leadership
          </div>
          
          <h2 className="lp-section-title" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', marginBottom: '12px' }}>
            Verified Wealth Manager Credentials
          </h2>
          
          <p className="lp-section-sub" style={{ maxWidth: '750px', margin: '0 auto', fontSize: '0.98rem', color: '#94a3b8', lineHeight: 1.6 }}>
            Our algorithmic asset allocation engines and institutional wealth vaults are authored, monitored, and audited by SEBI-compliant, NISM-certified financial analysts.
          </p>
        </div>

        {/* Manager Cards Grid (Side by Side) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {wealthManagersData.map(manager => (
            <div 
              key={manager.id}
              className="glass-card gold-border"
              style={{
                background: 'linear-gradient(145deg, rgba(8, 24, 14, 0.92) 0%, rgba(4, 12, 7, 0.96) 100%)',
                border: '1px solid rgba(0, 230, 118, 0.25)',
                borderRadius: '20px',
                padding: '22px 18px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Profile Header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                marginBottom: '18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '18px'
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  overflow: 'hidden', border: '2.5px solid #00e676',
                  boxShadow: '0 0 16px rgba(0, 230, 118, 0.4)',
                  flexShrink: 0, background: 'linear-gradient(135deg, #00e676 0%, #00a854 100%)',
                  position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ color: '#040d07', fontWeight: 900, fontSize: '1.3rem' }}>
                    {manager.avatar}
                  </span>
                  {manager.image && (
                    <img 
                      src={manager.image} 
                      alt={`${manager.name} NISM Certified`}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                      {manager.name}
                    </h3>
                    <span style={{ fontSize: '0.68rem', color: '#00e676', background: 'rgba(0, 230, 118, 0.12)', border: '1px solid rgba(0, 230, 118, 0.3)', padding: '2px 6px', borderRadius: '10px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <ShieldCheck size={12} /> SEBI Verified
                    </span>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#ffe066', fontWeight: 700, margin: '3px 0 2px 0' }}>
                    {manager.role}
                  </p>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                    {manager.sebiReg}
                  </span>
                </div>
              </div>

              {/* Stat Grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px',
                marginBottom: '18px', background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '10px 8px'
              }}>
                {manager.stats.map((st, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.62rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.4px' }}>
                      {st.label}
                    </span>
                    <strong style={{ fontSize: '0.78rem', color: '#00e676', fontWeight: 800 }}>
                      {st.value}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55, margin: '0 0 20px 0' }}>
                {manager.bio}
              </p>

              {/* Certificates List Title */}
              <div style={{
                fontSize: '0.8rem', fontWeight: 800, color: '#ffe066',
                textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <Building2 size={15} /> Accredited Certifications ({manager.certificates.length})
              </div>

              {/* Certificate Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {manager.certificates.map((cert, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.09)',
                      borderRadius: '12px',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', flexWrap: 'wrap' }}>
                      <div>
                        <span style={{
                          fontSize: '0.7rem', fontWeight: 800, color: '#ffe066',
                          background: 'rgba(212, 175, 55, 0.15)', padding: '2px 7px',
                          borderRadius: '6px', border: '1px solid rgba(212, 175, 55, 0.3)', display: 'inline-block'
                        }}>
                          {cert.series}
                        </span>
                        <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', margin: '5px 0 2px 0' }}>
                          {cert.title}
                        </h4>
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#00e676', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px', background: 'rgba(0, 230, 118, 0.12)', padding: '2px 7px', borderRadius: '8px', whiteSpace: 'nowrap' }}>
                        <CheckCircle2 size={11} /> Validated
                      </span>
                    </div>

                    <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, lineHeight: 1.45 }}>
                      {cert.description}
                    </p>

                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      flexWrap: 'wrap', gap: '8px',
                      paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: '2px'
                    }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'monospace' }}>
                        {cert.regNo}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedCert({ cert, managerName: manager.name })}
                        className="btn btn-green-outline"
                        style={{
                          padding: '5px 10px',
                          borderRadius: '8px',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FileText size={12} /> View Certificate <ExternalLink size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Certificate Dialog */}
        {selectedCert && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(4, 13, 7, 0.92)', backdropFilter: 'blur(10px)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px'
          }}>
            <div 
              className="glass-card gold-border"
              style={{
                background: 'linear-gradient(145deg, rgba(8, 24, 14, 0.96) 0%, rgba(4, 12, 7, 0.98) 100%)',
                border: '1px solid rgba(0, 230, 118, 0.3)',
                borderRadius: '16px', maxWidth: '850px', width: '100%',
                maxHeight: '92vh', overflowY: 'auto', display: 'flex', flexDirection: 'column'
              }}
            >
              {/* Modal Header */}
              <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#ffe066', fontWeight: 800, textTransform: 'uppercase' }}>
                    {selectedCert.cert.series} • Official NISM Certificate
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: '3px 0 0 0' }}>
                    {selectedCert.cert.title} — {selectedCert.managerName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', background: 'rgba(255, 255, 255, 0.03)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>Registration ID</span>
                    <strong style={{ color: '#00e676', fontFamily: 'monospace', fontSize: '0.8rem' }}>{selectedCert.cert.regNo}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '0.74rem', display: 'block' }}>Issued / Validity</span>
                    <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>{selectedCert.cert.issuedDate} • {selectedCert.cert.validity}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '0.74rem', display: 'block' }}>Verification</span>
                    <strong style={{ color: '#00e676', fontSize: '0.85rem' }}>✓ SEBI / NISM Validated</strong>
                  </div>
                </div>

                <div style={{ minHeight: '380px', background: '#020a05', borderRadius: '12px', border: '1px solid rgba(0, 230, 118, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', position: 'relative' }}>
                  <img 
                    src={selectedCert.cert.imageUrl}
                    alt={`${selectedCert.cert.title} — ${selectedCert.managerName} Official NISM Certificate`}
                    style={{ maxWidth: '100%', maxHeight: '520px', objectFit: 'contain', borderRadius: '8px' }}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const fallbackBox = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                      if (fallbackBox) fallbackBox.style.display = 'flex';
                    }}
                  />
                  <div style={{ display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '14px', padding: '30px' }}>
                    <Award size={48} style={{ color: '#ffe066' }} />
                    <h3 style={{ color: '#ffffff', margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                      Official NISM Certificate Validated
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', maxWidth: '480px', lineHeight: 1.6, margin: 0 }}>
                      Official certification record issued under Securities and Exchange Board of India (SEBI) regulations.
                      <br /><strong style={{ color: '#00e676', fontFamily: 'monospace', display: 'block', marginTop: '6px' }}>Reg ID: {selectedCert.cert.regNo}</strong>
                    </p>
                    <a 
                      href={selectedCert.cert.imageUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-gold"
                      style={{ fontSize: '0.82rem', padding: '8px 18px', borderRadius: '20px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}
                    >
                      <FileText size={14} /> Open Full Resolution Image <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0, 0, 0, 0.3)' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  🔒 Official NISM Certificate issued under Securities and Exchange Board of India (SEBI) regulations.
                </span>
                <a 
                  href={selectedCert.cert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn btn-gold"
                  style={{
                    padding: '8px 18px', borderRadius: '20px',
                    textDecoration: 'none', fontWeight: 700, fontSize: '0.82rem',
                    display: 'inline-flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <FileText size={14} /> Download Certificate Image <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WealthManagerCertificates;
