import { useState } from 'react';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

type View = 'landing' | 'login' | 'signup' | 'otp-verify' | 'forgot-password' | 'dashboard';

interface OtpVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
  onNavigate: (v: View) => void;
}

const OtpVerification = ({ email, onVerificationSuccess, onNavigate }: OtpVerificationProps) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode: code })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Verification failed.');
      } else {
        setSuccessMsg('Account verified successfully! Redirecting...');
        setTimeout(() => {
          onVerificationSuccess();
        }, 1500);
      }
    } catch (err) {
      setError('Connection error. Please check if backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to resend code.');
      } else {
        setSuccessMsg(`A new OTP has been sent! (Debug code: ${data.debugOtp || 'sent'})`);
      }
    } catch (err) {
      setError('Connection error.');
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
            <h2 className="auth-brand-headline">Verify Your Identity</h2>
            <p className="auth-brand-sub">
              To secure your financial profile, we require OTP verification. Enter the 6-digit code sent to your credentials.
            </p>
            <div className="auth-perks">
              <div className="auth-perk-item">
                <div className="auth-perk-icon"><Lock size={18} /></div>
                <span>Encrypted OTP token generation</span>
              </div>
              <div className="auth-perk-item">
                <div className="auth-perk-icon"><Mail size={18} /></div>
                <span>Code dispatched to registered info</span>
              </div>
              <div className="auth-perk-item">
                <div className="auth-perk-icon"><ShieldCheck size={18} /></div>
                <span>Secures access to your portfolio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right pane: OTP entry */}
        <div className="auth-form-panel">
          <div className="auth-form-card">
            <h1 className="auth-form-title">Enter Verification Code</h1>
            <p className="auth-form-sub" style={{ wordBreak: 'break-all' }}>
              We've sent a 6-digit code to <strong>{email || 'your email'}</strong>
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-group">
                <label style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }}>Verification Code</label>
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

              <button type="submit" className="auth-submit-btn" disabled={loading || code.length !== 6}>
                {loading ? <span className="auth-spinner" /> : 'Verify Code'}
              </button>
            </form>

            <p className="auth-switch-text" style={{ marginTop: '20px' }}>
              Didn't receive the code?{' '}
              <span className="auth-switch-link" onClick={handleResend}>Resend Code</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
