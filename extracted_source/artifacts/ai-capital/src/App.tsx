import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';

type View = 'landing' | 'login' | 'signup' | 'dashboard';

interface UserProfile {
  name: string;
  email: string;
  investmentAmount: number;
  riskTolerance: string;
  goal: string;
}

function App() {
  const [view, setView] = useState<View>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    investmentAmount: 25000,
    riskTolerance: 'Balanced',
    goal: 'Growth',
  });

  const handleLoginSubmit = (credentials: { email: string; password: string }) => {
    const username =
      credentials.email.split('@')[0].replace(/[^a-zA-Z]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase()).trim() || 'Investor';
    setUserProfile({ name: username, email: credentials.email, investmentAmount: 25000, riskTolerance: 'Balanced', goal: 'Growth' });
    setView('dashboard');
  };

  const handleSignupSubmit = (data: UserProfile) => {
    setUserProfile(data);
    setView('dashboard');
  };

  return (
    <>
      {view === 'landing'   && <LandingPage onNavigate={setView} />}
      {view === 'login'     && <LoginPage  onSubmit={handleLoginSubmit}  onNavigate={setView} />}
      {view === 'signup'    && <SignupPage onSubmit={handleSignupSubmit} onNavigate={setView} />}
      {view === 'dashboard' && <Dashboard userData={userProfile} onLogout={() => setView('landing')} />}
    </>
  );
}

export default App;
