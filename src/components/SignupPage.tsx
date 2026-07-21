import { useState } from 'react';
import { User, Mail, Phone, DollarSign, Lock, X, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

type View = 'landing' | 'login' | 'signup' | 'otp-verify' | 'forgot-password' | 'dashboard';

interface SignupPageProps {
  onSignupSuccess: (email: string) => void;
  onNavigate: (v: View) => void;
}

interface LegalModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const LegalModal = ({ title, onClose, children }: LegalModalProps) => {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(2, 8, 4, 0.75)', backdropFilter: 'blur(10px)',
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        maxWidth: '520px', width: '100%', padding: '28px',
        position: 'relative', border: '1px solid rgba(0, 230, 118, 0.22)',
        background: 'rgba(6, 18, 10, 0.95)', boxShadow: '0 0 40px rgba(0, 230, 118, 0.1)',
        transform: 'none'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'transparent', border: 'none', color: '#62777d',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'color 0.2s'
        }} onMouseEnter={e => e.currentTarget.style.color = '#00e676'} onMouseLeave={e => e.currentTarget.style.color = '#62777d'}>
          <X size={20} />
        </button>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '18px', color: '#ffffff' }} className="glow-text-green">{title}</h2>
        <div style={{
          maxHeight: '340px', overflowY: 'auto', paddingRight: '8px',
          fontSize: '0.86rem', color: '#a1b3b8', lineHeight: '1.6',
          textAlign: 'left'
        }}>
          {children}
        </div>
        <button type="button" className="btn btn-gold" onClick={onClose} style={{ marginTop: '22px', width: '100%' }}>
          I Understand
        </button>
      </div>
    </div>
  );
};

const SignupPage = ({ onSignupSuccess, onNavigate }: SignupPageProps) => {
  const [name,   setName]   = useState('');
  const [email,  setEmail]  = useState('');
  const [phone,  setPhone]  = useState('');
  const [amount, setAmount] = useState('');
  const [risk,   setRisk]   = useState('Balanced');
  const [goal,   setGoal]   = useState('');
  const [pass,   setPass]   = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [role, setRole] = useState<'investor' | 'advisor'>('investor');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          investmentAmount: role === 'investor' ? (parseFloat(amount) || 10000) : 0,
          riskTolerance: role === 'investor' ? risk : 'Balanced',
          goal: role === 'investor' ? goal : 'Growth',
          password: pass,
          role
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed.');
      } else {
        onSignupSuccess(email);
      }
    } catch (err) {
      setError('Connection error. Please check if backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <ParticleBackground />

      <button className="auth-back-btn" onClick={() => onNavigate('landing')}>
        ← Back to Home
      </button>

      <div className="auth-layout">

        {/* ── Left: Branding panel ── */}
        <div className="auth-brand-panel">
          <div className="auth-brand-inner">
            <div className="logo" style={{ marginBottom: '32px' }}>
              <div className="logo-symbol" style={{ fontSize: '2rem' }}>AI</div>
              <div className="logo-text" style={{ fontSize: '1.1rem' }}>AI Capital<span>Investment</span></div>
            </div>
            <h2 className="auth-brand-headline">Start Your Investment Journey Today</h2>
            <p className="auth-brand-sub">
              Join 50,000+ investors who trust AI Capital to grow and protect their wealth.
              Create your account in minutes and let our AI do the heavy lifting.
            </p>
            <div className="auth-perks">
              {[
                { Icon: TrendingUp,  text: 'Personalized portfolio in minutes' },
                { Icon: ShieldCheck, text: 'Regulated & fully insured platform' },
                { Icon: Zap,         text: 'AI rebalancing 24/7 on your behalf' },
              ].map(({ Icon, text }) => (
                <div key={text} className="auth-perk-item">
                  <div className="auth-perk-icon"><Icon size={18} /></div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Signup form ── */}
        <div className="auth-form-panel">
          <div className="auth-form-card">
            <h1 className="auth-form-title">Create Your Account</h1>
            <p className="auth-form-sub">Start your investment journey today</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-group" style={{ marginBottom: '20px' }}>
                <label>Register As</label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                  <button
                    type="button"
                    className={`auth-risk-btn ${role === 'investor' ? 'active' : ''}`}
                    onClick={() => setRole('investor')}
                    style={{ flex: 1, padding: '10px' }}
                  >
                    Investor
                  </button>
                  <button
                    type="button"
                    className={`auth-risk-btn ${role === 'advisor' ? 'active' : ''}`}
                    onClick={() => setRole('advisor')}
                    style={{ flex: 1, padding: '10px' }}
                  >
                    Advisor
                  </button>
                </div>
              </div>
              <div className="auth-fields-row">
                <div className="auth-input-group">
                  <label>Full Name</label>
                  <div className="auth-input-wrap">
                    <User size={16} className="auth-input-icon" />
                    <input type="text" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} className="auth-input" />
                  </div>
                </div>
                <div className="auth-input-group">
                  <label>Email Address</label>
                  <div className="auth-input-wrap">
                    <Mail size={16} className="auth-input-icon" />
                    <input type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} className="auth-input" />
                  </div>
                </div>
              </div>

              <div className="auth-fields-row">
                <div className="auth-input-group">
                  <label>Phone Number</label>
                  <div className="auth-input-wrap">
                    <Phone size={16} className="auth-input-icon" />
                    <input type="tel" placeholder="+1 (555) 000-0000" required value={phone} onChange={e => setPhone(e.target.value)} className="auth-input" />
                  </div>
                </div>
                {role === 'investor' && (
                  <div className="auth-input-group">
                    <label>Investment Amount ($)</label>
                    <div className="auth-input-wrap">
                      <DollarSign size={16} className="auth-input-icon" />
                      <input type="number" placeholder="10,000" min="1000" required={role === 'investor'} value={amount} onChange={e => setAmount(e.target.value)} className="auth-input" />
                    </div>
                  </div>
                )}
              </div>

              <div className="auth-input-group">
                <label>Password</label>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-input-icon" />
                  <input type="password" placeholder="Create a secure password" required value={pass} onChange={e => setPass(e.target.value)} className="auth-input" />
                </div>
              </div>

              {role === 'investor' && (
                <>
                  <div className="auth-input-group">
                    <label>Risk Tolerance</label>
                    <div className="auth-risk-row">
                      {['Conservative', 'Balanced', 'Aggressive'].map(l => (
                        <button key={l} type="button" className={`auth-risk-btn ${risk === l ? 'active' : ''}`} onClick={() => setRisk(l)}>{l}</button>
                      ))}
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label>Investment Goals</label>
                    <select className="auth-select" value={goal} onChange={e => setGoal(e.target.value)} required={role === 'investor'}>
                      <option value="" disabled>Select your primary goal</option>
                      <option value="Retirement">Retirement Planning</option>
                      <option value="Growth">Aggressive Capital Growth</option>
                      <option value="Passive">Passive Income Generation</option>
                      <option value="Education">Education Funding</option>
                    </select>
                  </div>
                </>
              )}

              <label className="auth-check-label">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required />
                I agree to the{' '}
                <span onClick={() => setShowTerms(true)} className="auth-switch-link" style={{ cursor: 'pointer' }}>Terms &amp; Conditions</span>
                {' '}and{' '}
                <span onClick={() => setShowPrivacy(true)} className="auth-switch-link" style={{ cursor: 'pointer' }}>Privacy Policy</span>
              </label>

              {error && (
                <div style={{ color: '#ff5252', fontSize: '0.84rem', textAlign: 'center', background: 'rgba(255,82,82,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,82,82,0.2)' }}>
                  {error}
                </div>
              )}

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : 'Create Account'}
              </button>
            </form>

            <p className="auth-switch-text">
              Already have an account?{' '}
              <span className="auth-switch-link" onClick={() => onNavigate('login')}>Sign In</span>
            </p>
          </div>
        </div>

      </div>

      {showTerms && (
        <LegalModal title="Terms & Conditions" onClose={() => setShowTerms(false)}>
          <p style={{ marginBottom: '14px' }}>Welcome to AI Capital Investment. By creating an account and checking the agreement box, you agree to comply with and be bound by the following terms and conditions:</p>
          <h3 style={{ color: '#d4af37', fontSize: '0.92rem', fontWeight: 600, margin: '14px 0 6px' }}>1. Automated Wealth Services</h3>
          <p>AI Capital Investment provides automated portfolio optimization and AI-driven asset rebalancing. The recommendations generated are suggestions based on risk tolerance profiles and market data. They do not constitute certified legal, tax, or professional financial advice.</p>
          <h3 style={{ color: '#d4af37', fontSize: '0.92rem', fontWeight: 600, margin: '14px 0 6px' }}>2. Market Risk Disclosure</h3>
          <p>All financial investments carry inherent market risks. Past performance, whether verified by historical datasets or simulated by AI models, does not guarantee future financial returns. Capital loss is possible.</p>
          <h3 style={{ color: '#d4af37', fontSize: '0.92rem', fontWeight: 600, margin: '14px 0 6px' }}>3. Account Security & Verification</h3>
          <p>You are responsible for maintaining the confidentiality of your login passwords and verification OTP tokens. Any transactions or profile changes executed under your account credentials will be deemed authorized by you.</p>
          <h3 style={{ color: '#d4af37', fontSize: '0.92rem', fontWeight: 600, margin: '14px 0 6px' }}>4. Modification of Services</h3>
          <p>We reserve the right to modify, suspend, or terminate the services, fees, or features of the platform at our discretion without prior notice.</p>
        </LegalModal>
      )}

      {showPrivacy && (
        <LegalModal title="Privacy Policy" onClose={() => setShowPrivacy(false)}>
          <p style={{ marginBottom: '14px' }}>At AI Capital Investment, we are committed to safeguarding your personal and financial details. This Privacy Policy outlines what information we gather and how it is secured:</p>
          <h3 style={{ color: '#00e676', fontSize: '0.92rem', fontWeight: 600, margin: '14px 0 6px' }}>1. Data Collection</h3>
          <p>We collect personal information necessary to design your investment strategies, including your name, email, telephone number, investment budget, and risk tolerance profile.</p>
          <h3 style={{ color: '#00e676', fontSize: '0.92rem', fontWeight: 600, margin: '14px 0 6px' }}>2. Storage & Security</h3>
          <p>All profile data and password hashes are encrypted and stored in secure database schemas. We use advanced digital protocols to block unauthorized access and prevent security breaches.</p>
          <h3 style={{ color: '#00e676', fontSize: '0.92rem', fontWeight: 600, margin: '14px 0 6px' }}>3. Third-party Sharing</h3>
          <p>We do not lease, sell, or trade your personal information to third-party marketing companies. Data is only shared with authorized financial service providers necessary to operate your portfolio transactions.</p>
          <h3 style={{ color: '#00e676', fontSize: '0.92rem', fontWeight: 600, margin: '14px 0 6px' }}>4. User Data Controls</h3>
          <p>You retain full rights to request access to, correction of, or permanent deletion of your personal account files by contacting our support team at info@aicapital.com.</p>
        </LegalModal>
      )}
    </div>
  );
};

export default SignupPage;
