import { useState } from 'react';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

type View = 'landing' | 'login' | 'signup' | 'otp-verify' | 'forgot-password' | 'dashboard';

interface ForgotPasswordProps {
  onResetSuccess: () => void;
  onNavigate: (v: View) => void;
}

const ForgotPassword = ({ onResetSuccess, onNavigate }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to request reset OTP.');
      } else {
        setSuccessMsg(`OTP sent successfully! (Debug code: ${data.debugOtp || 'sent'})`);
        setStep(2);
      }
    } catch (err) {
      setError('Connection error. Please check if backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode: code, newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to reset password.');
      } else {
        setSuccessMsg('Password updated successfully! Redirecting to login...');
        setTimeout(() => {
          onResetSuccess();
        }, 1500);
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

      <button className="auth-back-btn" onClick={() => onNavigate('login')}>
        ← Back to Login
      </button>

      <div className="auth-layout">
        {/* Left pane: branding */}
        <div className="auth-brand-panel">
          <div className="auth-brand-inner">
            <div className="logo" style={{ marginBottom: '32px' }}>
              <div className="logo-symbol" style={{ fontSize: '2rem' }}>AI</div>
              <div className="logo-text" style={{ fontSize: '1.1rem' }}>AI Capital<span>Investment</span></div>
            </div>
            <h2 className="auth-brand-headline">Reset Password Security</h2>
            <p className="auth-brand-sub">
              Securely recover your password using email verification. We generate a one-time key to verify your identity before resetting access.
            </p>
            <div className="auth-perks">
              <div className="auth-perk-item">
                <div className="auth-perk-icon"><Lock size={18} /></div>
                <span>Secured password reset interface</span>
              </div>
              <div className="auth-perk-item">
                <div className="auth-perk-icon"><Mail size={18} /></div>
                <span>OTP code sent to email on record</span>
              </div>
              <div className="auth-perk-item">
                <div className="auth-perk-icon"><ShieldCheck size={18} /></div>
                <span>Protects account from hijacking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right pane: reset flow */}
        <div className="auth-form-panel">
          <div className="auth-form-card">
            <h1 className="auth-form-title">Reset Password</h1>
            <p className="auth-form-sub">
              {step === 1 ? 'Enter your email to receive a verification OTP' : `Enter the OTP sent to ${email} and your new password`}
            </p>

            {step === 1 ? (
              <form onSubmit={handleRequestOtp} className="auth-form">
                <div className="auth-input-group">
                  <label>Email Address</label>
                  <div className="auth-input-wrap">
                    <Mail size={16} className="auth-input-icon" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
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
                  {loading ? <span className="auth-spinner" /> : 'Send Reset OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="auth-form">
                <div className="auth-input-group">
                  <label style={{ textAlign: 'center', width: '100%', marginBottom: '6px' }}>Verification Code</label>
                  <div className="auth-input-wrap">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      required
                      value={code}
                      onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                      className="auth-input"
                      style={{
                        letterSpacing: '0.5em',
                        fontSize: '1.6rem',
                        textAlign: 'center',
                        fontWeight: 700,
                        paddingLeft: '0.5em',
                        fontFamily: 'monospace'
                      }}
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label>New Password</label>
                  <div className="auth-input-wrap">
                    <Lock size={16} className="auth-input-icon" />
                    <input
                      type="password"
                      placeholder="Enter new secure password"
                      required
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>

                {error && (
                  <div style={{ color: '#ff5252', fontSize: '0.84rem', textAlign: 'center', background: 'rgba(255,82,82,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,82,82,0.2)' }}>
                    {error}
                  </div>
                )}

                {successMsg && (
                  <div style={{ color: '#00e676', fontSize: '0.84rem', textAlign: 'center', background: 'rgba(0,230,118,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(0,230,118,0.2)' }}>
                    {successMsg}
                  </div>
                )}

                <button type="submit" className="auth-submit-btn" disabled={loading || code.length !== 6 || !newPassword}>
                  {loading ? <span className="auth-spinner" /> : 'Reset Password'}
                </button>

                <p className="auth-switch-text" style={{ marginTop: '10px' }}>
                  Want to change email?{' '}
                  <span className="auth-switch-link" onClick={() => { setStep(1); setError(''); setSuccessMsg(''); }}>Go Back</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
