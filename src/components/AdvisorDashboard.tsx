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

const assetDataConfig: Record<string, {
    allocation: number[];
    labels: string[];
}> = {
    Conservative: {
        allocation: [20, 50, 20, 10],
        labels: ["Cash Reserves", "High-Yield Bonds", "Global Equities", "Gold Hedging"]
    },
    Balanced: {
        allocation: [10, 20, 55, 10, 5],
        labels: ["Cash Reserves", "Corporate Bonds", "Growth Equities", "Physical Gold", "Digital Assets (BTC/ETH)"]
    },
    Aggressive: {
        allocation: [5, 5, 60, 10, 20],
        labels: ["Liquidity Vault", "Advisory Bonds", "High-Beta Equities", "Gold Hedging", "Emerging Tech / Crypto"]
    }
};

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
    const [modalTab, setModalTab] = useState<'text' | 'allocation' | 'chat'>('text');
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [equities, setEquities] = useState('40');
    const [bonds, setBonds] = useState('30');
    const [cash, setCash] = useState('15');
    const [gold, setGold] = useState('15');
    const [proposalText, setProposalText] = useState('');
    const [activeMacroSignal, setActiveMacroSignal] = useState('');
    const [bulkDispatching, setBulkDispatching] = useState(false);
    const [bulkSuccess, setBulkSuccess] = useState(false);

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

    const handleAutoGenerateProposal = () => {
        if (!activeClient) return;
        const profile = activeClient.riskTolerance;
        
        if (profile === 'Conservative') {
            setEquities('20');
            setBonds('50');
            setCash('20');
            setGold('10');
            setProposalText('AI Recommendation: Optimized defensive layout with 50% core fixed-income bonds to secure capital yields while maintaining 10% gold hedging protection.');
        } else if (profile === 'Aggressive') {
            setEquities('70');
            setBonds('10');
            setCash('10');
            setGold('10');
            setProposalText('AI Recommendation: Maximizing capital appreciation with 70% growth equities and high-beta tech, paired with active rebalancing vaults.');
        } else {
            // Balanced
            setEquities('50');
            setBonds('25');
            setCash('15');
            setGold('10');
            setProposalText('AI Recommendation: Diversified core growth layout with 50% equities and 25% bonds to capture index runs while mitigating sudden volatility shocks.');
        }
    };

    const handleBulkDispatch = async () => {
        if (!activeMacroSignal) return;
        setBulkDispatching(true);
        setBulkSuccess(false);
        
        let propData = { Conservative: [20, 50, 20, 10], Balanced: [10, 20, 55, 10, 5], Aggressive: [5, 5, 60, 10, 20], text: '' };
        
        if (activeMacroSignal === 'inflation') {
            propData = {
                Conservative: [15, 45, 20, 20],
                Balanced: [10, 15, 50, 20, 5],
                Aggressive: [5, 5, 50, 20, 20],
                text: 'Macro Rebalance: Hedging inflation risk by expanding Physical Gold allocation by 10%.'
            };
        } else if (activeMacroSignal === 'recession') {
            propData = {
                Conservative: [30, 55, 5, 10],
                Balanced: [20, 25, 40, 10, 5],
                Aggressive: [10, 15, 45, 10, 20],
                text: 'Macro Rebalance: De-risking client assets. Trimming Equities by 15% to build Cash and Sovereign Bond reserves.'
            };
        } else if (activeMacroSignal === 'crypto') {
            propData = {
                Conservative: [15, 50, 20, 10, 5],
                Balanced: [5, 20, 55, 10, 10],
                Aggressive: [5, 5, 50, 10, 30],
                text: 'Macro Rebalance: Increasing allocation to high-alpha Digital Assets to capture bull-market momentum.'
            };
        } else if (activeMacroSignal === 'rates') {
            propData = {
                Conservative: [10, 60, 20, 10],
                Balanced: [5, 30, 50, 10, 5],
                Aggressive: [5, 10, 55, 10, 20],
                text: 'Macro Rebalance: Capitalizing on rate cuts. Shifting cash vaults into high-yield Corporate/Sovereign Bonds.'
            };
        }
        
        try {
            for (const client of clients) {
                const isAgg = client.riskTolerance === 'Aggressive';
                const isCons = client.riskTolerance === 'Conservative';
                const key = isAgg ? 'Aggressive' : isCons ? 'Conservative' : 'Balanced';
                const alloc = propData[key];
                
                await fetch('/api/advisor/dispatch-proposal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        investorEmail: client.email,
                        proposal: {
                            equities: alloc[2],
                            bonds: alloc[1],
                            cash: alloc[0],
                            gold: alloc[3] + (alloc[4] || 0),
                            text: propData.text
                        }
                    })
                });
            }
            
            setBulkSuccess(true);
            await fetchClients();
            setTimeout(() => {
                setBulkSuccess(false);
                setActiveMacroSignal('');
            }, 2500);
        } catch (err) {
            console.error("Bulk dispatch error:", err);
            alert("Error running bulk dispatch.");
        } finally {
            setBulkDispatching(false);
        }
    };

    const fetchChatMessages = async () => {
        if (!activeClient) return;
        try {
            const res = await fetch(`/api/chat/history?user1=${userData.email}&user2=${activeClient.email}`);
            if (res.ok) {
                const data = await res.json();
                setChatMessages(data);
            }
        } catch (e) {
            console.error("Error loading chat messages:", e);
        }
    };

    const handleSendChatMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeClient || !chatInput.trim()) return;
        
        const text = chatInput.trim();
        setChatInput('');
        
        try {
            const res = await fetch('/api/chat/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sender: userData.email,
                    receiver: activeClient.email,
                    text
                })
            });
            if (res.ok) {
                fetchChatMessages();
            }
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    useEffect(() => {
        if (activeClient && modalTab === 'chat') {
            fetchChatMessages();
            const interval = setInterval(fetchChatMessages, 3000);
            return () => clearInterval(interval);
        }
    }, [activeClient, modalTab]);

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

                                            {/* Drift Visualizer Section */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
                                                {(() => {
                                                    const targetConfig = assetDataConfig[client.riskTolerance] || assetDataConfig.Balanced;
                                                    
                                                    // Deterministic offset based on the client name length/email
                                                    const seed = client.email.length;
                                                    const actualAlloc = targetConfig.allocation.map((val, idx) => {
                                                        if (idx === 0) return Math.max(0, val + (seed % 7) - 3);
                                                        if (idx === 2) return Math.max(0, val - (seed % 7) + 3);
                                                        return val;
                                                    });
                                                    
                                                    const actualSum = actualAlloc.reduce((a, b) => a + b, 0);
                                                    const normalizedActual = actualAlloc.map(v => Math.round((v / actualSum) * 100));
                                                    
                                                    const drift = targetConfig.allocation.reduce((sum, val, idx) => sum + Math.abs(val - normalizedActual[idx]), 0);
                                                    const needsRebalance = drift >= 10;
                                                    
                                                    return (
                                                        <>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Portfolio Drift:</span>
                                                                <span style={{ 
                                                                    fontSize: '0.7rem', 
                                                                    background: needsRebalance ? 'rgba(255, 82, 82, 0.08)' : 'rgba(0, 230, 118, 0.08)',
                                                                    color: needsRebalance ? '#ff5252' : 'var(--color-green)',
                                                                    padding: '2px 8px', borderRadius: '12px',
                                                                    fontWeight: 600, border: '1px solid ' + (needsRebalance ? 'rgba(255,82,82,0.15)' : 'rgba(0,230,118,0.15)')
                                                                }}>
                                                                    {needsRebalance ? `⚠️ Rebalance Alert (${drift}% Drift)` : `✓ Stable (${drift}% Drift)`}
                                                                </span>
                                                            </div>
                                                            
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '2px' }}>
                                                                {targetConfig.allocation.map((targetVal, idx) => {
                                                                    const actualVal = normalizedActual[idx];
                                                                    const diff = actualVal - targetVal;
                                                                    
                                                                    return (
                                                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                                                                                <span>{targetConfig.labels[idx]}</span>
                                                                                <span>
                                                                                    Act: <strong>{actualVal}%</strong> (Tgt: {targetVal}%)
                                                                                    {diff !== 0 && (
                                                                                        <span style={{ marginLeft: '4px', color: diff > 0 ? 'var(--color-green)' : '#ff5252', fontWeight: 600 }}>
                                                                                            {diff > 0 ? `+${diff}` : diff}%
                                                                                        </span>
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                            <div style={{ height: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                                                                                <div style={{ width: `${actualVal}%`, height: '100%', background: diff > 4 ? '#ff5252' : 'var(--color-green)', borderRadius: '2px' }} />
                                                                                <div style={{ position: 'absolute', left: `${targetVal}%`, top: 0, bottom: 0, width: '2px', background: 'var(--color-gold)' }} title="Target Marker" />
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </>
                                                    );
                                                })()}
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
                            <div className="widget-title">AI Macroeconomic Signal Dispatcher</div>
                            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Trigger macro economic scenarios to simulate and optionally deploy bulk rebalancing proposals to all managed client accounts instantly.
                            </p>
                            
                            {/* Macro Scenarios Toggle Row */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                                {[
                                    { id: 'inflation', label: '🔥 Inflation Spike', color: '#ff9800' },
                                    { id: 'recession', label: '📉 Recession Risk', color: '#ff5252' },
                                    { id: 'crypto', label: '🚀 Crypto Bull Run', color: 'var(--color-green)' },
                                    { id: 'rates', label: '🏦 Interest Rate Cuts', color: 'var(--color-gold)' }
                                ].map(sig => (
                                    <button
                                        key={sig.id}
                                        type="button"
                                        onClick={() => {
                                            setActiveMacroSignal(activeMacroSignal === sig.id ? '' : sig.id);
                                        }}
                                        style={{
                                            padding: '12px 6px', borderRadius: '8px',
                                            border: '1px solid ' + (activeMacroSignal === sig.id ? sig.color : 'rgba(255,255,255,0.06)'),
                                            background: activeMacroSignal === sig.id ? `${sig.color}15` : 'rgba(255,255,255,0.02)',
                                            color: activeMacroSignal === sig.id ? sig.color : 'var(--text-secondary)',
                                            fontWeight: 600, cursor: 'pointer', textAlign: 'center', transition: 'all 0.25s'
                                        }}
                                    >
                                        {sig.label}
                                    </button>
                                ))}
                            </div>

                            {activeMacroSignal ? (
                                <div style={{
                                    background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '8px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px',
                                    animation: 'fadeInUp 0.3s ease-out'
                                }}>
                                    <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
                                        {activeMacroSignal === 'inflation' && "Scenario: Global Inflation Surge"}
                                        {activeMacroSignal === 'recession' && "Scenario: Market Recession & Credit Contraction"}
                                        {activeMacroSignal === 'crypto' && "Scenario: Institutional Crypto Inflows"}
                                        {activeMacroSignal === 'rates' && "Scenario: Federal Reserve Rate Reductions"}
                                    </h4>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                                        <p style={{ margin: 0 }}>
                                            <strong>AI Suggested Rebalance Strategy:</strong>
                                        </p>
                                        <p style={{ margin: 0, paddingLeft: '8px', borderLeft: '2.5px solid var(--color-gold)', fontStyle: 'italic' }}>
                                            {activeMacroSignal === 'inflation' && '"Rotate 10% cash/bonds into Physical Gold to insulate capital from buying power erosion."'}
                                            {activeMacroSignal === 'recession' && '"De-risk portfolios by moving 15% growth equities into Treasury Bonds & cash vaults."'}
                                            {activeMacroSignal === 'crypto' && '"Incorporate 5%-10% digital assets (BTC/ETH) to harvest high-alpha yields."'}
                                            {activeMacroSignal === 'rates' && '"Expand corporate bond duration by 10% to lock in peak yields before rate cuts execute."'}
                                        </p>
                                    </div>

                                    {/* Action row */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                        <div>
                                            {bulkSuccess && (
                                                <span style={{ color: 'var(--color-green)', fontSize: '0.84rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    ✓ Proposals sent to all clients!
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleBulkDispatch}
                                            disabled={bulkDispatching}
                                            className="btn btn-gold"
                                            style={{ minWidth: '220px', display: 'flex', justifyItems: 'center', justifyContent: 'center' }}
                                        >
                                            {bulkDispatching ? (
                                                <span className="auth-spinner" style={{ width: '16px', height: '16px' }} />
                                            ) : "Deploy Rebalance to All Clients"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
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
                            )}
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
                            {['text', 'allocation', 'chat'].map(tab => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setModalTab(tab as any)}
                                    style={{
                                        flex: 1, padding: '8px', fontSize: '0.8rem', borderRadius: '4px',
                                        border: '1px solid ' + (modalTab === tab ? 'var(--color-gold)' : 'rgba(255,255,255,0.08)'),
                                        background: modalTab === tab ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                                        color: modalTab === tab ? 'var(--color-gold)' : 'var(--text-secondary)',
                                        cursor: 'pointer', textTransform: 'capitalize'
                                    }}
                                >
                                    {tab === 'text' ? 'Advice Tip' : tab === 'allocation' ? 'Proposal' : 'Secure Chat'}
                                </button>
                            ))}
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
                        ) : modalTab === 'allocation' ? (
                            <form onSubmit={handleSendProposal}>
                                <button 
                                    type="button" 
                                    onClick={handleAutoGenerateProposal} 
                                    className="btn btn-green-outline" 
                                    style={{ width: '100%', fontSize: '0.78rem', padding: '8px 12px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                                >
                                    ✨ Auto-Generate AI Proposal
                                </button>
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
                        ) : (
                            /* Chat Tab */
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '340px' }}>
                                <div style={{ 
                                    flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', 
                                    borderRadius: '8px', padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px'
                                }}>
                                    {chatMessages.length === 0 ? (
                                        <div style={{ alignSelf: 'center', margin: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                            No messages yet. Send a secure message below to start chatting.
                                        </div>
                                    ) : (
                                        chatMessages.map((m, idx) => {
                                            const isMe = m.sender === userData.email;
                                            return (
                                                <div key={idx} style={{ 
                                                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                                                    maxWidth: '80%', padding: '8px 12px', borderRadius: '12px',
                                                    background: isMe ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255,255,255,0.04)',
                                                    border: '1px solid ' + (isMe ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255,255,255,0.06)'),
                                                    color: '#fff', fontSize: '0.82rem', wordBreak: 'break-word'
                                                }}>
                                                    <div style={{ fontSize: '0.62rem', color: isMe ? 'var(--color-green)' : 'var(--color-gold)', fontWeight: 600, marginBottom: '2px' }}>
                                                        {isMe ? 'Advisor (You)' : activeClient.name}
                                                    </div>
                                                    {m.text}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                                <form onSubmit={handleSendChatMessage} style={{ display: 'flex', gap: '8px' }}>
                                    <input 
                                        type="text" 
                                        value={chatInput}
                                        onChange={e => setChatInput(e.target.value)}
                                        placeholder="Type secure client reply..."
                                        required
                                        style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
                                    />
                                    <button type="submit" className="btn btn-gold" style={{ padding: '0 16px', fontSize: '0.82rem' }}>
                                        Send
                                    </button>
                                </form>
                            </div>
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
