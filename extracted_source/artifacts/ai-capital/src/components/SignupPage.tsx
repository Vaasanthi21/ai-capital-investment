import { useState } from 'react';
import { User, Mail, Phone, DollarSign, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

type View = 'landing' | 'login' | 'signup' | 'dashboard';

interface SignupPageProps {
  onSubmit: (d: any) => void;
  onNavigate: (v: View) => void;
}

const SignupPage = ({ onSubmit, onNavigate }: SignupPageProps) => {
  const [name,   setName]   = useState('');
  const [email,  setEmail]  = useState('');
  const [phone,  setPhone]  = useState('');
  const [amount, setAmount] = useState('');
  const [risk,   setRisk]   = useState('Balanced');
  const [goal,   setGoal]   = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    onSubmit({ name, email, phone, investmentAmount: parseFloat(amount) || 10000, riskTolerance: risk, goal });
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
                <div className="auth-input-group">
                  <label>Investment Amount ($)</label>
                  <div className="auth-input-wrap">
                    <DollarSign size={16} className="auth-input-icon" />
                    <input type="number" placeholder="10,000" min="1000" required value={amount} onChange={e => setAmount(e.target.value)} className="auth-input" />
                  </div>
                </div>
              </div>

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
                <select className="auth-select" value={goal} onChange={e => setGoal(e.target.value)} required>
                  <option value="" disabled>Select your primary goal</option>
                  <option value="Retirement">Retirement Planning</option>
                  <option value="Growth">Aggressive Capital Growth</option>
                  <option value="Passive">Passive Income Generation</option>
                  <option value="Education">Education Funding</option>
                </select>
              </div>

              <label className="auth-check-label">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required />
                I agree to the <a href="#" className="auth-switch-link">Terms &amp; Conditions</a> and <a href="#" className="auth-switch-link">Privacy Policy</a>
              </label>

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
    </div>
  );
};

export default SignupPage;
