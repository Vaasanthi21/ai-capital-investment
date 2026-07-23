import { useState } from 'react';
import { Mail, Lock, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

type View = 'landing' | 'login' | 'signup' | 'otp-verify' | 'forgot-password' | 'dashboard';

interface LoginPageProps {
  onLoginSuccess: (user: any) => void;
  onNavigate: (v: View) => void;
  setTempEmail: (email: string) => void;
}

const LoginPage = ({ onLoginSuccess, onNavigate, setTempEmail }: LoginPageProps) => {
  const [email, setEmail]   = useState('');
  const [pass,  setPass]    = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error && data.error.includes('not verified')) {
          setTempEmail(email);
          onNavigate('otp-verify');
        } else {
          setError(data.error || 'Login failed.');
        }
      } else {
        onLoginSuccess(data.user);
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

      {/* ── Top App Domain Badge ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: '1000px', margin: '0 auto 16px', width: '100%', padding: '0 10px'
      }}>
        <button className="auth-back-btn" onClick={() => onNavigate('landing')} style={{ position: 'relative', top: 0, left: 0 }}>
          ← Back to Main Site
        </button>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(0, 230, 118, 0.08)', border: '1px solid rgba(0, 230, 118, 0.25)',
          padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', color: '#00e676',
          fontFamily: 'monospace'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e676', boxShadow: '0 0 8px #00e676' }} />
          <span>app.aicapitalinvestment.com</span>
        </div>
      </div>

      <div className="auth-layout">

        {/* ── Left: Branding panel ── */}
        <div className="auth-brand-panel">
          <div className="auth-brand-inner">
            <div className="logo" style={{ marginBottom: '24px' }}>
              <div className="logo-symbol" style={{ fontSize: '2rem' }}>AI</div>
              <div className="logo-text" style={{ fontSize: '1.1rem' }}>AI Capital<span>Investment</span></div>
            </div>

            <div style={{
              display: 'inline-block', padding: '4px 12px', background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '12px',
              fontSize: '0.72rem', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '16px'
            }}>
              OFFICIAL APP PORTAL • app.aicapitalinvestment.com
            </div>

            <h2 className="auth-brand-headline">Institutional App Portal Access</h2>
            <p className="auth-brand-sub">
              Access your multi-agent quantitative portfolio, real-time Volatility Shield risk controls, and 1-on-1 advisor consultations via <strong>app.aicapitalinvestment.com</strong>.
            </p>
            <div className="auth-perks">
              {[
                { Icon: TrendingUp,  text: 'Live market data & multi-agent portfolio analytics' },
                { Icon: ShieldCheck, text: 'SEC & SEBI compliant bank-grade encryption' },
                { Icon: Zap,         text: 'One-click AI advisory proposal execution' },
              ].map(({ Icon, text }) => (
                <div key={text} className="auth-perk-item">
                  <div className="auth-perk-icon"><Icon size={18} /></div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Login form ── */}
        <div className="auth-form-panel">
          <div className="auth-form-card" style={{ borderTop: '3px solid var(--color-green)' }}>
            
            {/* Mock Browser URL Bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '6px 12px',
              marginBottom: '20px', fontSize: '0.76rem', color: 'var(--text-muted)'
            }}>
              <span style={{ color: '#00e676' }}>🔒</span>
              <span style={{ color: '#fff', fontWeight: 600, fontFamily: 'monospace' }}>https://app.aicapitalinvestment.com/login</span>
            </div>

            <h1 className="auth-form-title" style={{ fontSize: '1.6rem' }}>App Portal Sign In</h1>
            <p className="auth-form-sub">Secure access to app.aicapitalinvestment.com</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-group">
                <label>Email Address</label>
                <div className="auth-input-wrap">
                  <Mail size={16} className="auth-input-icon" />
                  <input
                    type="email" placeholder="you@example.com" required
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label>Password</label>
                  <span onClick={() => onNavigate('forgot-password')} className="auth-forgot" style={{ cursor: 'pointer' }}>Forgot password?</span>
                </div>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type="password" placeholder="Enter your password" required
                    value={pass} onChange={e => setPass(e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>

              {error && (
                <div style={{ color: '#ff5252', fontSize: '0.84rem', textAlign: 'center', background: 'rgba(255,82,82,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,82,82,0.2)' }}>
                  {error}
                </div>
              )}

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : 'Sign In'}
              </button>
            </form>

            <div className="auth-divider">or continue with</div>
            <div className="auth-oauth-row">
              <button className="auth-oauth-btn">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.64l3.15-3.15C17.45 1.74 14.93 1 12 1 7.37 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 7.14 8.79 5.04 12 5.04z"/>
                  <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.22-2.35H12v4.45h6.45c-.28 1.48-1.12 2.74-2.38 3.58l3.6 2.8c2.1-1.94 3.33-4.8 3.33-8.48z"/>
                  <path fill="#FBBC05" d="M5.1 14.7c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.5 7.3C.54 9.22 0 11.38 0 13.7s.54 4.48 1.5 6.4l3.6-2.8z"/>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.6-2.8c-1.1.74-2.52 1.18-4.36 1.18-3.21 0-5.99-2.1-6.95-5.26l-3.6 2.8C3.4 20.35 7.37 23 12 23z"/>
                </svg>
                Continue with Google
              </button>
              <button className="auth-oauth-btn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.02 2.96 1.1.09 2.23-.58 2.95-1.39z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

            <p className="auth-switch-text">
              Don't have an account?{' '}
              <span className="auth-switch-link" onClick={() => onNavigate('signup')}>Sign Up</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
