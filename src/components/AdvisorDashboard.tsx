import { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Users, Sparkles, LogOut, Send, 
    CheckCircle2, AlertCircle, RefreshCw, Phone, Mail, DollarSign
} from 'lucide-react';

interface UserData {
    name: string;
    email: string;
    role: string;
}

interface Client {
    name: string;
    email: string;
    phone: string;
    investmentAmount: number;
    riskTolerance: string;
    goal: string;
    advisorMessage: string;
    activeProposal?: {
        equities: number;
        bonds: number;
        cash: number;
        gold: number;
        text: string;
    } | null;
}

interface AdvisorDashboardProps {
    userData: UserData;
    onLogout: () => void;
}

const AdvisorDashboard = ({ userData, onLogout }: AdvisorDashboardProps) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedTab, setSelectedTab] = useState('clients');
    const [activeClient, setActiveClient] = useState<Client | null>(null);
    const [advisorTip, setAdvisorTip] = useState('');
    const [sendingTip, setSendingTip] = useState(false);
    const [tipSuccess, setTipSuccess] = useState(false);
    
    // Structured Proposal States
    const [modalTab, setModalTab] = useState<'text' | 'allocation'>('text');
    const [equities, setEquities] = useState('40');
    const [bonds, setBonds] = useState('30');
    const [cash, setCash] = useState('15');
    const [gold, setGold] = useState('15');
    const [proposalText, setProposalText] = useState('');

    const initials = userData.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

    const fetchClients = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/advisor/clients');
            if (!res.ok) throw new Error('Failed to retrieve client index.');
            const data = await res.json();
            setClients(data);
        } catch (err: any) {
            setError(err.message || 'Error loading clients');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleSendTip = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeClient) return;

        setSendingTip(true);
        try {
            const res = await fetch('/api/advisor/update-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ investorEmail: activeClient.email, message: advisorTip })
            });
            if (!res.ok) throw new Error('Failed to send advisory recommendation.');
            
            setTipSuccess(true);
            setClients(prev => prev.map(c => c.email === activeClient.email ? { ...c, advisorMessage: advisorTip } : c));
            setTimeout(() => {
                setTipSuccess(false);
                setActiveClient(null);
                setAdvisorTip('');
            }, 1800);
        } catch (err: any) {
            alert(err.message || 'Error sending advisor tip');
        } finally {
            setSendingTip(false);
        }
    };

    const handleSendProposal = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeClient) return;

        const sum = parseFloat(equities) + parseFloat(bonds) + parseFloat(cash) + parseFloat(gold);
        if (sum !== 100) {
            alert('Allocation sum must equal exactly 100%. Current sum: ' + sum + '%');
            return;
        }

        setSendingTip(true);
        try {
            const res = await fetch('/api/advisor/dispatch-proposal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    investorEmail: activeClient.email,
                    proposal: {
                        equities: parseFloat(equities),
                        bonds: parseFloat(bonds),
                        cash: parseFloat(cash),
                        gold: parseFloat(gold),
                        text: proposalText
                    }
                })
            });
            if (!res.ok) throw new Error('Failed to dispatch allocation proposal.');
            const data = await res.json();
            
            setTipSuccess(true);
            setClients(prev => prev.map(c => c.email === activeClient.email ? { ...c, activeProposal: data.activeProposal } : c));
            setTimeout(() => {
                setTipSuccess(false);
                setActiveClient(null);
                setProposalText('');
            }, 1800);
        } catch (err: any) {
            alert(err.message || 'Error dispatching proposal');
        } finally {
            setSendingTip(false);
        }
    };

    const openTipModal = (client: Client) => {
        setActiveClient(client);
        setAdvisorTip(client.advisorMessage || '');
        setModalTab('text');
        if (client.activeProposal) {
            setEquities(client.activeProposal.equities.toString());
            setBonds(client.activeProposal.bonds.toString());
            setCash(client.activeProposal.cash.toString());
            setGold(client.activeProposal.gold.toString());
            setProposalText(client.activeProposal.text || '');
        } else {
            setEquities('40');
            setBonds('30');
            setCash('15');
            setGold('15');
            setProposalText('');
        }
    };

    return (
        <div id="dashboard-view" className="dashboard-wrapper active">
            <div className="dashboard-container">
                <aside className="dash-sidebar">
                    <div className="logo">
                        <div className="logo-symbol">AI</div>
                        <div className="logo-text">AI Capital<span>Advisor</span></div>
                    </div>

                    <ul className="dash-menu">
                        {[
                            { id: 'clients', icon: <Users size={20} />, label: 'My Clients' },
                            { id: 'insights', icon: <Sparkles size={20} />, label: 'AI Market Info' }
                        ].map(item => (
                            <li key={item.id} className={`dash-menu-item ${selectedTab === item.id ? 'active' : ''}`} onClick={() => setSelectedTab(item.id)}>
                                <a>{item.icon} {item.label}</a>
                            </li>
                        ))}
                    </ul>

                    <div className="dash-sidebar-footer">
                        <div className="user-profile-badge">
                            <div className="user-avatar" style={{ border: '2px solid var(--color-gold)' }}>{initials}</div>
                            <div className="user-info">
                                <p className="user-name">{userData.name}</p>
                                <p className="user-tier" style={{ color: 'var(--color-gold)' }}>Senior Advisor</p>
                            </div>
                        </div>
                        <button className="btn btn-green-outline" style={{ width: '100%', fontSize: '0.85rem', padding: '8px 16px' }} onClick={onLogout}>
                            <LogOut size={16} /> Log Out
                        </button>
                    </div>
                </aside>

                <main className="dash-content">
                    <header className="dash-header">
                        <div className="dash-header-left">
                            <h1 className="glow-text-gold">Welcome Back, {userData.name.split(" ")[0]}!</h1>
                            <p>Here is your client index. Oversee allocations, analyze risk thresholds, and deploy advice.</p>
                        </div>
                        <div className="dash-header-right">
                            <button className="btn btn-green-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={fetchClients} disabled={loading}>
                                <RefreshCw size={16} className={loading ? 'spin-anim' : ''} /> Refresh List
                            </button>
                        </div>
                    </header>

                    {selectedTab === 'clients' ? (
                        <div className="blogs-container">
                            {error && (
                                <div style={{ color: '#ff5252', background: 'rgba(255,82,82,0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,82,82,0.2)' }}>
                                    {error}
                                </div>
                            )}

                            {loading ? (
                                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                                    <div className="auth-spinner" style={{ margin: '0 auto 16px', width: '32px', height: '32px' }} />
                                    Loading client accounts...
                                </div>
                            ) : clients.length === 0 ? (
                                <div className="widget" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                                    <AlertCircle size={40} style={{ color: 'var(--color-gold)', marginBottom: '12px' }} />
                                    <h4 style={{ color: '#fff', marginBottom: '8px' }}>No Assigned Clients</h4>
                                    <p style={{ fontSize: '0.85rem' }}>No verified investor accounts exist in the database yet.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                                    {clients.map(client => (
                                        <div key={client.email} className="widget glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid rgba(212,175,55,0.15)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0 }}>{client.name}</h3>
                                                    <span className="alloc-badge" style={{ marginTop: '6px', display: 'inline-block', background: 'rgba(0, 230, 118, 0.08)', color: 'var(--color-green)', borderColor: 'rgba(0, 230, 118, 0.15)' }}>
                                                        {client.riskTolerance} Profile
                                                    </span>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Assigned Assets</span>
                                                    <h4 className="glow-text-gold" style={{ fontSize: '1.25rem', fontWeight: 700, margin: '2px 0 0' }}>
                                                        {"$" + client.investmentAmount.toLocaleString()}
                                                    </h4>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <Mail size={14} style={{ color: 'var(--color-gold)' }} />
                                                    <span>{client.email}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <Phone size={14} style={{ color: 'var(--color-gold)' }} />
                                                    <span>{client.phone}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <DollarSign size={14} style={{ color: 'var(--color-gold)' }} />
                                                    <span>Goal: <strong>{client.goal} Planning</strong></span>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Advisory Message:</span>
                                                <div style={{ fontSize: '0.82rem', padding: '10px', background: 'rgba(6,18,10,0.8)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', minHeight: '44px', color: client.advisorMessage ? '#fff' : 'var(--text-muted)' }}>
                                                    {client.advisorMessage ? `"${client.advisorMessage}"` : 'No active recommendation deployed.'}
                                                </div>
                                            </div>

                                            {client.activeProposal && (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '8px 12px', background: 'rgba(212,175,55,0.05)', border: '1px dashed rgba(212,175,55,0.25)', borderRadius: '6px' }}>
                                                    <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', fontWeight: 700 }}>Pending Proposal Allocation:</span>
                                                    <div style={{ fontSize: '0.76rem', color: '#fff', fontWeight: 600 }}>
                                                        Eq: {client.activeProposal.equities}%, Bd: {client.activeProposal.bonds}%, Cs: {client.activeProposal.cash}%, Gd: {client.activeProposal.gold}%
                                                    </div>
                                                    {client.activeProposal.text && (
                                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
                                                            "{client.activeProposal.text}"
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <button className="btn btn-green" style={{ width: '100%', fontSize: '0.82rem', padding: '8px' }} onClick={() => openTipModal(client)}>
                                                {client.advisorMessage || client.activeProposal ? 'Modify Advisor Recommendation' : 'Deploy Advisor Recommendation'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="widget glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="widget-title">AI Market Information for Advisors</div>
                            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Integrate client investment configurations with recent macroeconomic indices. Our AI advisor suggests the following adjustments:
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                                <div style={{ padding: '14px', background: 'rgba(0, 230, 118, 0.04)', border: '1px solid rgba(0, 230, 118, 0.15)', borderRadius: '8px' }}>
                                    <h5 style={{ color: 'var(--color-green)', fontSize: '0.9rem', fontWeight: 600, margin: '0 0 6px' }}>Conservative Index Allocation Recommendation</h5>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Bond yield indexes have peaked by +0.8%. Clients under Conservative layouts should rebalance 10% Cash Reserves into Corporate Bonds to capture optimal yields.</p>
                                </div>
                                <div style={{ padding: '14px', background: 'rgba(212, 175, 55, 0.04)', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '8px' }}>
                                    <h5 style={{ color: 'var(--color-gold)', fontSize: '0.9rem', fontWeight: 600, margin: '0 0 6px' }}>Aggressive Crypto Hedging Recommendation</h5>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Due to rising digital asset volatility, evaluate pruning high-beta tech equities and expanding ETH validator nodes by 4% to lock in staking yields.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Deploy Advisor Tip Modal */}
            {activeClient && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(2, 8, 4, 0.75)', backdropFilter: 'blur(10px)',
                    padding: '20px'
                }}>
                    <div className="glass-card" style={{
                        maxWidth: '500px', width: '100%', padding: '28px',
                        position: 'relative', border: '1px solid rgba(212,175,55,0.22)',
                        background: 'rgba(6, 18, 10, 0.95)', boxShadow: '0 0 40px rgba(212, 175, 55, 0.1)'
                    }}>
                        <button type="button" onClick={() => setActiveClient(null)} style={{
                            position: 'absolute', top: '16px', right: '16px',
                            background: 'transparent', border: 'none', color: '#62777d',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'color 0.2s'
                        }} onMouseEnter={e => e.currentTarget.style.color = '#ffe066'} onMouseLeave={e => e.currentTarget.style.color = '#62777d'}>
                            <X size={20} />
                        </button>

                        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }} className="glow-text-gold">
                            Advisor Console
                        </h2>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            Deploy recommendations for <strong>{activeClient.name}</strong> ({activeClient.email})
                        </p>

                        {/* Modal Tab Switcher */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                            <button
                                type="button"
                                onClick={() => setModalTab('text')}
                                style={{
                                    flex: 1, padding: '8px', fontSize: '0.8rem', borderRadius: '4px',
                                    border: '1px solid ' + (modalTab === 'text' ? 'var(--color-gold)' : 'rgba(255,255,255,0.08)'),
                                    background: modalTab === 'text' ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                                    color: modalTab === 'text' ? 'var(--color-gold)' : 'var(--text-secondary)',
                                    cursor: 'pointer'
                                }}
                            >
                                Text Recommendation
                            </button>
                            <button
                                type="button"
                                onClick={() => setModalTab('allocation')}
                                style={{
                                    flex: 1, padding: '8px', fontSize: '0.8rem', borderRadius: '4px',
                                    border: '1px solid ' + (modalTab === 'allocation' ? 'var(--color-gold)' : 'rgba(255,255,255,0.08)'),
                                    background: modalTab === 'allocation' ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                                    color: modalTab === 'allocation' ? 'var(--color-gold)' : 'var(--text-secondary)',
                                    cursor: 'pointer'
                                }}
                            >
                                Allocation Proposal
                            </button>
                        </div>

                        {modalTab === 'text' ? (
                            <form onSubmit={handleSendTip}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Recommendation Message</label>
                                    <textarea
                                        value={advisorTip}
                                        onChange={e => setAdvisorTip(e.target.value)}
                                        placeholder="Type your portfolio advice here..."
                                        rows={4}
                                        required
                                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', resize: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '22px' }}>
                                    <div>
                                        {tipSuccess && (
                                            <span style={{ color: 'var(--color-green)', fontSize: '0.84rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <CheckCircle2 size={16} /> Broadcasted successfully!
                                            </span>
                                        )}
                                    </div>
                                    <button type="submit" className="btn btn-gold" disabled={sendingTip} style={{ minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                        {sendingTip ? <span className="auth-spinner" style={{ width: '14px', height: '14px' }} /> : <><Send size={14} /> Send Tip</>}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleSendProposal}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '14px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Equities %</label>
                                        <input
                                            type="number" min="0" max="100" required
                                            value={equities} onChange={e => setEquities(e.target.value)}
                                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Bonds %</label>
                                        <input
                                            type="number" min="0" max="100" required
                                            value={bonds} onChange={e => setBonds(e.target.value)}
                                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Cash %</label>
                                        <input
                                            type="number" min="0" max="100" required
                                            value={cash} onChange={e => setCash(e.target.value)}
                                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Gold %</label>
                                        <input
                                            type="number" min="0" max="100" required
                                            value={gold} onChange={e => setGold(e.target.value)}
                                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Proposal Summary Note</label>
                                    <input
                                        type="text"
                                        value={proposalText}
                                        onChange={e => setProposalText(e.target.value)}
                                        placeholder="e.g., Target rebalancing for defensive yield"
                                        required
                                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '22px' }}>
                                    <div>
                                        {(() => {
                                            const sum = (parseFloat(equities) || 0) + (parseFloat(bonds) || 0) + (parseFloat(cash) || 0) + (parseFloat(gold) || 0);
                                            return (
                                                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: sum === 100 ? 'var(--color-green)' : '#ff5252' }}>
                                                    Sum: {sum}% {sum === 100 ? '✓' : '(Must be 100%)'}
                                                </span>
                                            );
                                        })()}
                                    </div>
                                    <button type="submit" className="btn btn-gold" disabled={sendingTip} style={{ minWidth: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                        {sendingTip ? <span className="auth-spinner" style={{ width: '14px', height: '14px' }} /> : <><Send size={14} /> Dispatch Proposal</>}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const X = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default AdvisorDashboard;
