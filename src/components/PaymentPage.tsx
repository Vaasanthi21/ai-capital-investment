import { useState } from 'react';
import { ShieldCheck, CreditCard, User, Calendar, Lock, CheckCircle2, TrendingUp, Zap, HelpCircle } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

interface PaymentPageProps {
  email: string;
  onPaymentSuccess: () => void;
}

const PaymentPage = ({ email, onPaymentSuccess }: PaymentPageProps) => {
  const [tier, setTier] = useState<'starter' | 'growth' | 'elite'>('growth');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('25000');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleTierSelect = (selectedTier: 'starter' | 'growth' | 'elite') => {
    setTier(selectedTier);
    if (selectedTier === 'starter') setAmount('10000');
    else if (selectedTier === 'growth') setAmount('25000');
    else setAmount('100000');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/fund-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount: parseFloat(amount) })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Payment failed.');
      }
      
      setSuccess(true);
      setTimeout(() => {
        onPaymentSuccess();
      }, 2500);
    } catch (err: any) {
      setError(err.message || 'Payment system offline.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper" style={{ overflowY: 'auto', padding: '40px 20px' }}>
      <ParticleBackground />

      <div className="auth-layout" style={{ maxWidth: '820px', margin: '0 auto' }}>
        
        {/* Payment Summary */}
        <div className="auth-brand-panel" style={{ padding: '36px' }}>
          <div className="auth-brand-inner">
            <h2 className="auth-brand-headline" style={{ fontSize: '1.8rem' }}>Fund Your Investment</h2>
            <p className="auth-brand-sub" style={{ fontSize: '0.88rem', marginBottom: '24px' }}>
              Deploy starting capital to your secure AI-allocated wealth portfolio. Choose your tier and enter payment credentials.
            </p>

            <div className="auth-perks" style={{ gap: '14px' }}>
              {[
                { Icon: ShieldCheck, title: 'Starter Tier ($1k+)', desc: 'Basic AI rebalancing & assets tracker.' },
                { Icon: Zap, title: 'Growth Tier ($25k+)', desc: 'Automated 24/7 rebalancing + AI Chatbot Advisor.' },
                { Icon: TrendingUp, title: 'Elite Tier ($100k+)', desc: 'Advisor priority reallocations & advisory support.' }
              ].map((perk, i) => (
                <div key={i} className="auth-perk-item" style={{ alignItems: 'flex-start' }}>
                  <div className="auth-perk-icon" style={{ marginTop: '2px' }}><perk.Icon size={16} /></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.86rem', color: '#fff' }}>{perk.title}</span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{perk.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontSize: '0.8rem' }}>
              <ShieldCheck size={18} />
              <span>SSL Secure 256-bit Encrypted Transaction</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="auth-form-panel" style={{ padding: '36px' }}>
          <div className="auth-form-card">
            
            {success ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,230,118,0.1)', border: '2px solid var(--color-green)', color: 'var(--color-green)', marginBottom: '20px' }}>
                  <CheckCircle2 size={36} className="spin-anim-slow" />
                </div>
                <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>Capital Allocated!</h2>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '0' }}>
                  Your deposit of <strong>{"$" + parseFloat(amount).toLocaleString()}</strong> was verified. Redirecting to login portal...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form">
                
                {/* Select Tier */}
                <div className="auth-input-group">
                  <label>Select Portfolio Tier</label>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    {(['starter', 'growth', 'elite'] as const).map(t => (
                      <button
                        key={t}
                        type="button"
                        className={`auth-risk-btn ${tier === t ? 'active' : ''}`}
                        onClick={() => handleTierSelect(t)}
                        style={{ flex: 1, textTransform: 'capitalize', fontSize: '0.8rem', padding: '8px' }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount to Deposit */}
                <div className="auth-input-group">
                  <label>Deposit &amp; Fund Amount ($)</label>
                  <div className="auth-input-wrap">
                    <DollarSign size={16} className="auth-input-icon" />
                    <input 
                      type="number" 
                      min="1000" 
                      required 
                      value={amount} 
                      onChange={e => setAmount(e.target.value)} 
                      placeholder="Enter deposit amount" 
                      className="auth-input" 
                    />
                  </div>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '4px 0 0 2px' }}>
                    Minimum deposit is $1,000. Starter (up to $25k), Growth (up to $100k), Elite ($100k+).
                  </p>
                </div>

                {/* Credit Card Input */}
                <div className="auth-input-group">
                  <label>Cardholder Name</label>
                  <div className="auth-input-wrap">
                    <User size={16} className="auth-input-icon" />
                    <input 
                      type="text" 
                      required 
                      placeholder="As shown on card" 
                      value={nameOnCard} 
                      onChange={e => setNameOnCard(e.target.value)} 
                      className="auth-input" 
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label>Card Number</label>
                  <div className="auth-input-wrap">
                    <CreditCard size={16} className="auth-input-icon" />
                    <input 
                      type="text" 
                      required 
                      maxLength={19}
                      placeholder="4000 1234 5678 9010" 
                      value={cardNumber} 
                      onChange={e => {
                        const v = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        setCardNumber(v);
                      }} 
                      className="auth-input" 
                    />
                  </div>
                </div>

                <div className="auth-fields-row">
                  <div className="auth-input-group">
                    <label>Expiration</label>
                    <div className="auth-input-wrap">
                      <Calendar size={16} className="auth-input-icon" />
                      <input 
                        type="text" 
                        required 
                        maxLength={5}
                        placeholder="MM/YY" 
                        value={expiry} 
                        onChange={e => {
                          let v = e.target.value.replace(/\//g, '');
                          if (v.length > 2) v = v.substring(0,2) + '/' + v.substring(2);
                          setExpiry(v);
                        }} 
                        className="auth-input" 
                      />
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label>CVV / CVC</label>
                    <div className="auth-input-wrap">
                      <Lock size={16} className="auth-input-icon" />
                      <input 
                        type="password" 
                        required 
                        maxLength={4}
                        placeholder="•••" 
                        value={cvv} 
                        onChange={e => setCvv(e.target.value.replace(/\D/g, ''))} 
                        className="auth-input" 
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div style={{ color: '#ff5252', fontSize: '0.82rem', textAlign: 'center', background: 'rgba(255,82,82,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,82,82,0.2)' }}>
                    {error}
                  </div>
                )}

                <button type="submit" className="auth-submit-btn" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {loading ? (
                    <span className="auth-spinner" />
                  ) : (
                    <>Deploy capital of {"$" + parseFloat(amount || '0').toLocaleString()}</>
                  )}
                </button>

                <p className="auth-switch-text" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  By clicking, you authorize AI Capital to initialize assets and execute rebalancing operations on your behalf.
                </p>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

// Re-use DollarSign icon since it's not imported directly from lucide-react in App
const DollarSign = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);

export default PaymentPage;
