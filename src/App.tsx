import { useState, useEffect, lazy, Suspense, Component, type ErrorInfo, type ReactNode } from 'react';
import LandingPage from './components/LandingPage';

const LoginPage = lazy(() => import('./components/LoginPage'));
const SignupPage = lazy(() => import('./components/SignupPage'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const AdvisorDashboard = lazy(() => import('./components/AdvisorDashboard'));
const OtpVerification = lazy(() => import('./components/OtpVerification'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword'));
const PaymentPage = lazy(() => import('./components/PaymentPage'));
const StandaloneBlogPage = lazy(() => import('./components/StandaloneBlogPage'));
const StandaloneAccreditationPage = lazy(() => import('./components/StandaloneAccreditationPage'));

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#03080a', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <h2 style={{ color: '#00e676', marginBottom: '8px', fontSize: '1.5rem' }}>AI Capital Investment</h2>
          <p style={{ color: '#94a3b8', maxWidth: '480px', marginBottom: '24px', fontSize: '0.9rem' }}>
            We encountered a minor display issue loading this section. Click below to continue.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => window.location.href = '/dashboard/overview'} style={{ background: '#00e676', color: '#000', fontWeight: 700, padding: '10px 22px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
              Go to Overview
            </button>
            <button onClick={() => window.location.reload()} style={{ background: 'transparent', color: '#00e676', border: '1px solid #00e676', fontWeight: 600, padding: '10px 22px', borderRadius: '8px', cursor: 'pointer' }}>
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

type View = 'landing' | 'login' | 'signup' | 'otp-verify' | 'payment' | 'forgot-password' | 'dashboard' | 'blogs' | 'accreditation';

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  investmentAmount: number;
  riskTolerance: string;
  goal: string;
  role?: string;
  advisorMessage?: string;
}

function App() {
  const getInitialView = (): View => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/login')) return 'login';
    if (path.includes('/signup')) return 'signup';
    if (path.includes('/dashboard') || path.includes('/advisor') || path.includes('/app')) return 'dashboard';
    if (path.includes('/blogs') || path.includes('/blog')) return 'blogs';
    if (path.includes('/accreditation') || path.includes('/certificates')) return 'accreditation';
    return 'landing';
  };

  const [view, setViewState] = useState<View>(getInitialView);
  const [tempEmail, setTempEmail] = useState('');
  const [regRole, setRegRole] = useState<'investor' | 'advisor'>('investor');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    investmentAmount: 25000,
    riskTolerance: 'Balanced',
    goal: 'Growth',
  });

  const setView = (newView: View) => {
    setViewState(newView);
    const pathMap: Record<View, string> = {
      'landing': '/',
      'login': '/login',
      'signup': '/signup',
      'otp-verify': '/verify',
      'payment': '/payment',
      'forgot-password': '/forgot-password',
      'dashboard': '/app',
      'blogs': '/blogs',
      'accreditation': '/accreditation'
    };
    const targetPath = pathMap[newView] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view: newView }, '', targetPath);
    }
  };

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setViewState(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#060e08' }} />}>
        {view === 'landing'       && <LandingPage onNavigate={setView} />}
        {view === 'blogs'         && <StandaloneBlogPage onNavigate={setView} />}
        {view === 'accreditation' && <StandaloneAccreditationPage onNavigate={setView} />}
        {view === 'login'         && <LoginPage onLoginSuccess={(user) => { setUserProfile(user); setView('dashboard'); }} onNavigate={setView} setTempEmail={setTempEmail} />}
        {view === 'signup'        && <SignupPage onSignupSuccess={(email, role) => { setTempEmail(email); setRegRole(role); setView('otp-verify'); }} onNavigate={setView} />}
        {view === 'otp-verify'    && <OtpVerification email={tempEmail} onVerificationSuccess={() => {
          setView('login');
        }} onNavigate={setView} />}
        {view === 'payment' && <PaymentPage email={tempEmail} onPaymentSuccess={() => setView('login')} />}
        {view === 'forgot-password' && <ForgotPassword onResetSuccess={() => setView('login')} onNavigate={setView} />}
        {view === 'dashboard' && (userProfile.role === 'advisor' ? (
          <AdvisorDashboard userData={userProfile} onLogout={() => setView('landing')} />
        ) : (
          <Dashboard userData={userProfile} onLogout={() => setView('landing')} onUpdateUser={(user) => setUserProfile(user)} />
        ))}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
