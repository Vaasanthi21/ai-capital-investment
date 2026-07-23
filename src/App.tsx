import { useState, useEffect, lazy, Suspense } from 'react';
import LandingPage from './components/LandingPage';

const LoginPage = lazy(() => import('./components/LoginPage'));
const SignupPage = lazy(() => import('./components/SignupPage'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const AdvisorDashboard = lazy(() => import('./components/AdvisorDashboard'));
const OtpVerification = lazy(() => import('./components/OtpVerification'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword'));
const PaymentPage = lazy(() => import('./components/PaymentPage'));
const StandaloneBlogPage = lazy(() => import('./components/StandaloneBlogPage'));

type View = 'landing' | 'login' | 'signup' | 'otp-verify' | 'payment' | 'forgot-password' | 'dashboard' | 'blogs';

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
      'blogs': '/blogs'
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
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#060e08' }} />}>
      {view === 'landing'   && <LandingPage onNavigate={setView} />}
      {view === 'blogs'     && <StandaloneBlogPage onNavigate={setView} />}
      {view === 'login'     && <LoginPage onLoginSuccess={(user) => { setUserProfile(user); setView('dashboard'); }} onNavigate={setView} setTempEmail={setTempEmail} />}
      {view === 'signup'    && <SignupPage onSignupSuccess={(email, role) => { setTempEmail(email); setRegRole(role); setView('otp-verify'); }} onNavigate={setView} />}
      {view === 'otp-verify' && <OtpVerification email={tempEmail} onVerificationSuccess={() => {
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
  );
}

export default App;
