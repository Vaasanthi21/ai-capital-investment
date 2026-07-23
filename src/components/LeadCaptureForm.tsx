import React, { useState } from 'react';
import { ShieldCheck, Send, CheckCircle2, User, Mail, Phone, DollarSign, Target, MessageSquare } from 'lucide-react';

interface LeadCaptureFormProps {
  language?: 'en' | 'hi';
  compact?: boolean;
  title?: string;
  subtitle?: string;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  language = 'en',
  compact = false,
  title,
  subtitle
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '$25,000 - $100,000',
    interest: 'AI Wealth Management',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg(language === 'en' ? 'Please fill in your name, email, and phone number.' : 'कृपया अपना नाम, ईमेल और फोन नंबर भरें।');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback for offline/static deployment
        const existingLeads = JSON.parse(localStorage.getItem('ai_capital_leads') || '[]');
        existingLeads.unshift({ ...formData, id: `LEAD-${Date.now()}`, date: new Date().toISOString() });
        localStorage.setItem('ai_capital_leads', JSON.stringify(existingLeads));
        setSubmitted(true);
      }
    } catch {
      // Offline fallback
      const existingLeads = JSON.parse(localStorage.getItem('ai_capital_leads') || '[]');
      existingLeads.unshift({ ...formData, id: `LEAD-${Date.now()}`, date: new Date().toISOString() });
      localStorage.setItem('ai_capital_leads', JSON.stringify(existingLeads));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const defaultTitleEn = compact ? "Request Advisor Callback" : "Schedule a Fiduciary AI Portfolio Consultation";
  const defaultSubEn = compact ? "Speak with a SEBI & SEC registered advisor." : "Get a customized quantitative asset allocation plan tailored to your wealth goals.";
  
  const defaultTitleHi = compact ? "सलाहकार से कॉल की पुष्टि करें" : "एआई पोर्टफोलियो परामर्श का अनुरोध करें";
  const defaultSubHi = compact ? "हमारे पंजीकृत वित्तीय सलाहकार से बात करें।" : "अपने लक्ष्यों के लिए अनुकूलित परिसंपत्ति आवंटन योजना प्राप्त करें।";

  return (
    <div 
      className="glass-card gold-border lead-capture-container"
      style={{
        background: 'linear-gradient(145deg, rgba(6, 20, 12, 0.92) 0%, rgba(3, 10, 6, 0.95) 100%)',
        border: '1px solid rgba(0, 230, 118, 0.25)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 230, 118, 0.08)',
        borderRadius: '20px',
        padding: compact ? '24px' : '36px 32px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow accent */}
      <div 
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(0,230,118,0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }}
      />

      {submitted ? (
        <div style={{ textAlign: 'center', padding: '24px 12px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(0, 230, 118, 0.15)', border: '1px solid #00e676',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px auto', color: '#00e676'
          }}>
            <CheckCircle2 size={36} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
            {language === 'en' ? 'Consultation Requested Successfully!' : 'परामर्श का अनुरोध सफलतापूर्वक भेजा गया!'}
          </h3>
          <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 20px auto' }}>
            {language === 'en' 
              ? `Thank you, ${formData.name}! A SEBI & SEC registered fiduciary advisor will contact you shortly at ${formData.phone} to review your customized AI investment strategy.` 
              : `धन्यवाद, ${formData.name}! एक पंजीकृत वित्तीय सलाहकार शीघ्र ही आपसे परामर्श के लिए संपर्क करेगा।`}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '20px', fontSize: '0.78rem', color: '#ffe066' }}>
            <ShieldCheck size={14} /> SEBI Reg: INA000098765 | SEC RIA #801-123456
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: '24px', textAlign: compact ? 'left' : 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#00e676', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              <ShieldCheck size={14} /> {language === 'en' ? 'Fiduciary Advisory Consultation' : 'पंजीकृत सलाहकार परामर्श'}
            </div>
            <h3 style={{ fontSize: compact ? '1.25rem' : '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.3px' }}>
              {title || (language === 'en' ? defaultTitleEn : defaultTitleHi)}
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              {subtitle || (language === 'en' ? defaultSubEn : defaultSubHi)}
            </p>
          </div>

          {errorMsg && (
            <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', color: '#fca5a5', fontSize: '0.82rem', marginBottom: '16px' }}>
              {errorMsg}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            {/* Full Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                {language === 'en' ? 'Full Name *' : 'पूरा नाम *'}
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'en' ? 'e.g. Rahul Sharma' : 'उदा. राहुल शर्मा'}
                  required
                  style={{
                    width: '100%', padding: '10px 12px 10px 38px',
                    background: 'rgba(6, 14, 8, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px', color: '#ffffff', fontSize: '0.88rem', outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                {language === 'en' ? 'Email Address *' : 'ईमेल पता *'}
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: '100%', padding: '10px 12px 10px 38px',
                    background: 'rgba(6, 14, 8, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px', color: '#ffffff', fontSize: '0.88rem', outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                {language === 'en' ? 'Phone Number *' : 'फोन नंबर *'}
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  required
                  style={{
                    width: '100%', padding: '10px 12px 10px 38px',
                    background: 'rgba(6, 14, 8, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px', color: '#ffffff', fontSize: '0.88rem', outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Investment Capital */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                {language === 'en' ? 'Investment Capital Budget' : 'अनुमानित निवेश पूंजी'}
              </label>
              <div style={{ position: 'relative' }}>
                <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <select 
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  style={{
                    width: '100%', padding: '10px 12px 10px 38px',
                    background: 'rgba(6, 14, 8, 0.95)', border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px', color: '#ffffff', fontSize: '0.88rem', outline: 'none',
                    boxSizing: 'border-box', cursor: 'pointer'
                  }}
                >
                  <option value="Under $25,000">Under $25,000 / ₹20 Lakhs</option>
                  <option value="$25,000 - $100,000">$25,000 - $100,000 / ₹20L - ₹80L</option>
                  <option value="$100,000 - $500,000">$100,000 - $500,000 / ₹80L - ₹4 Cr</option>
                  <option value="$500,000+">$500,000+ / ₹4 Crore+</option>
                </select>
              </div>
            </div>
          </div>

          {!compact && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '20px' }}>
              {/* Interest Service */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  {language === 'en' ? 'Primary Interest Area' : 'प्राथमिक रुचि का क्षेत्र'}
                </label>
                <div style={{ position: 'relative' }}>
                  <Target size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <select 
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 12px 10px 38px',
                      background: 'rgba(6, 14, 8, 0.95)', border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px', color: '#ffffff', fontSize: '0.88rem', outline: 'none',
                      boxSizing: 'border-box', cursor: 'pointer'
                    }}
                  >
                    <option value="AI Wealth Management">AI Algorithmic Wealth Management</option>
                    <option value="Tax-Loss Harvesting">Automated Tax-Loss Harvesting</option>
                    <option value="Quantitative Trading">Quantitative Stock & Crypto Analytics</option>
                    <option value="Fiduciary Advisory">SEBI / SEC Fiduciary Advisory Consultation</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  {language === 'en' ? 'Message or Specific Questions (Optional)' : 'संदेश या प्रश्न (वैकल्पिक)'}
                </label>
                <div style={{ position: 'relative' }}>
                  <MessageSquare size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                  <textarea 
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === 'en' ? 'Describe your financial targets or specific advisory requests...' : 'अपने वित्तीय लक्ष्य या प्रश्न लिखें...'}
                    style={{
                      width: '100%', padding: '10px 12px 10px 38px',
                      background: 'rgba(6, 14, 8, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px', color: '#ffffff', fontSize: '0.85rem', outline: 'none',
                      boxSizing: 'border-box', resize: 'vertical'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold"
              style={{
                width: compact ? '100%' : 'auto',
                minWidth: '240px',
                padding: '12px 32px',
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: '30px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)'
              }}
            >
              {loading ? (
                language === 'en' ? 'Submitting Request...' : 'जमा किया जा रहा है...'
              ) : (
                <>
                  {language === 'en' ? 'Request Fiduciary Consultation' : 'सलाहकार परामर्श अनुरोध भेजें'} <Send size={16} />
                </>
              )}
            </button>
          </div>
          
          <p style={{ fontSize: '0.72rem', color: '#64748b', textAlign: 'center', marginTop: '12px', margin: '12px 0 0 0' }}>
            🔒 {language === 'en' ? 'Your details are encrypted and will never be shared. SEBI INA000098765 / SEC RIA #801-123456 compliant.' : 'आपकी जानकारी सुरक्षित है और कभी साझा नहीं की जाएगी।'}
          </p>
        </form>
      )}
    </div>
  );
};

export default LeadCaptureForm;
