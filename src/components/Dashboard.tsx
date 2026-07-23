import { useState, useEffect } from 'react';
import {
    LayoutDashboard, Wallet, Sparkles, BarChart3, Settings, LogOut,
    ArrowUpRight, Lightbulb, CheckCircle2, BookOpen, ChevronRight, X,
    CreditCard, History, PlusCircle, ShieldCheck, DollarSign, Search, Download,
    TrendingUp, ArrowDownRight, Filter
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

interface UserData {
    name: string;
    email: string;
    investmentAmount: number;
    riskTolerance: string;
    goal: string;
    role?: string;
    advisorMessage?: string;
    activeProposal?: {
        equities: number;
        bonds: number;
        cash: number;
        gold: number;
        text: string;
    } | null;
}

interface DashboardProps {
    userData: UserData;
    onLogout: () => void;
    onUpdateUser?: (updatedUser: any) => void;
}

const AnimatedValue = ({ value }: { value: number }) => {
    const [displayVal, setDisplayVal] = useState(value);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const startVal = displayVal;
        const duration = 400;
        let frameId: number;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = startVal + progress * (value - startVal);
            setDisplayVal(current);
            if (progress < 1) {
                frameId = window.requestAnimationFrame(step);
            } else {
                setDisplayVal(value);
            }
        };
        frameId = window.requestAnimationFrame(step);
        return () => window.cancelAnimationFrame(frameId);
    }, [value]);

    return <span>{"$" + Math.round(displayVal).toLocaleString()}</span>;
};

const assetDataConfig: Record<string, {
    allocation: number[];
    labels: string[];
    aiAnnualYield: number;
    tradAnnualYield: number;
    volatility: number;
}> = {
    Conservative: {
        allocation: [20, 50, 20, 10],
        labels: ["Cash Reserves", "High-Yield Bonds", "Global Equities", "Gold Hedging"],
        aiAnnualYield: 0.058, tradAnnualYield: 0.042, volatility: 0.03
    },
    Balanced: {
        allocation: [10, 20, 55, 10, 5],
        labels: ["Cash Reserves", "Corporate Bonds", "Growth Equities", "Physical Gold", "Digital Assets (BTC/ETH)"],
        aiAnnualYield: 0.095, tradAnnualYield: 0.071, volatility: 0.08
    },
    Aggressive: {
        allocation: [5, 5, 60, 10, 20],
        labels: ["Liquidity Vault", "Advisory Bonds", "High-Beta Equities", "Gold Hedging", "Emerging Tech / Crypto"],
        aiAnnualYield: 0.152, tradAnnualYield: 0.114, volatility: 0.16
    }
};

const quizQuestions = [
    {
        question: "What is your primary investment time horizon?",
        options: [
            { text: "Short-term (Under 3 years)", score: 1 },
            { text: "Medium-term (3 to 8 years)", score: 2 },
            { text: "Long-term (Over 8 years)", score: 3 }
        ]
    },
    {
        question: "How would you react if your portfolio value suddenly dropped 20%?",
        options: [
            { text: "Panic and liquidate all remaining holdings immediately", score: 1 },
            { text: "Do nothing and patiently wait for market recovery", score: 2 },
            { text: "Aggressively buy more assets at discounted prices", score: 3 }
        ]
    },
    {
        question: "What is your primary source of investment capital?",
        options: [
            { text: "Emergency reserves / Liquid short-term savings", score: 1 },
            { text: "Steady employment income / Monthly salary surplus", score: 2 },
            { text: "Corporate windfall, inheritance, or capital gains", score: 3 }
        ]
    },
    {
        question: "Which statement best describes your tolerance for volatility?",
        options: [
            { text: "I prefer absolute security; preserving principal balance is paramount", score: 1 },
            { text: "I accept moderate short-term fluctuations to capture higher index growth", score: 2 },
            { text: "I welcome high fluctuations for the chance of maximum long-term returns", score: 3 }
        ]
    }
];

const Dashboard = ({ userData, onLogout, onUpdateUser }: DashboardProps) => {
    const [sliderAmount, setSliderAmount] = useState(userData.investmentAmount || 10000);
    const [sliderYears, setSliderYears] = useState(10);
    const [executingProposal, setExecutingProposal] = useState(false);
    const [proposalSuccess, setProposalSuccess] = useState(false);

    // Dynamic states for advanced options
    const [showRiskQuiz, setShowRiskQuiz] = useState(false);
    const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

    const [financialGoals, setFinancialGoals] = useState([
        { id: '1', name: 'Retirement Fund', target: 500000, current: 25142, date: '2045-12-31' },
        { id: '2', name: 'Buy a Home', target: 100000, current: 15000, date: '2030-06-30' }
    ]);
    const [showAddGoalModal, setShowAddGoalModal] = useState(false);
    const [newGoalName, setNewGoalName] = useState('');
    const [newGoalTarget, setNewGoalTarget] = useState('');
    const [newGoalDate, setNewGoalDate] = useState('');

    const [taxLossHarvestingActive, setTaxLossHarvestingActive] = useState(false);
    const [taxLossSavings, setTaxLossSavings] = useState(1820);
    const [taxLossLogs, setTaxLossLogs] = useState([
        `[${new Date().toLocaleDateString()}] SWAP: Harvested $1,200 loss in Growth Equities (SPY), rotated into Large Cap Core ETF to maintain market correlation. Locked in $360 tax credit.`,
        `[2026-06-15] SWAP: Harvested $850 loss in Digital Assets (ETH), rotated into Staked ETH Trust. Locked in $255 tax credit.`,
        `[2026-05-22] SWAP: Harvested $1,500 loss in high-beta tech holdings. Swapped into NASDAQ 100 Equal Weight. Locked in $450 tax credit.`
    ]);

    const [backtestStartYear, setBacktestStartYear] = useState(2018);
    const [backtestEndYear, setBacktestEndYear] = useState(2026);
    const [backtestComparisonType, setBacktestComparisonType] = useState<'SP500' | '6040'>('SP500');

    // Crisis simulation states
    const [simulatedCrisis, setSimulatedCrisis] = useState('');
    const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

    // Volatility shield states
    const [volatilityShieldActive, setVolatilityShieldActive] = useState(false);
    const [maxDrawdownLimit, setMaxDrawdownLimit] = useState(8);
    const [shieldLogs, setShieldLogs] = useState<string[]>([
        'Shield calibrated successfully. Monitoring active volatility matrices.',
        'No active breaches detected. System risk index stable.'
    ]);

    const getBacktestData = () => {
        const labels: string[] = [];
        const portfolioValues: number[] = [];
        const benchmarkValues: number[] = [];

        let portVal = 10000;
        let benchVal = 10000;

        // yield configurations
        const portYield = riskTolerance === 'Aggressive' ? 0.145 : riskTolerance === 'Balanced' ? 0.112 : 0.082;
        const benchYield = backtestComparisonType === 'SP500' ? 0.098 : 0.075; // S&P 500 average vs 60/40

        for (let y = backtestStartYear; y <= 2026; y++) {
            labels.push(String(y));
            portfolioValues.push(Math.round(portVal));
            benchmarkValues.push(Math.round(benchVal));

            // add deterministic market noise based on year to look realistic and not flicker
            const yearFactor = Math.sin(y * 12.34);
            const portNoise = yearFactor * 0.11;
            const benchNoise = yearFactor * 0.14;

            portVal = portVal * (1 + portYield + portNoise);
            benchVal = benchVal * (1 + benchYield + benchNoise);
        }

        return { labels, portfolioValues, benchmarkValues };
    };

    const handleExecuteProposal = async () => {
        if (!userData.activeProposal) return;
        setExecutingProposal(true);
        try {
            const res = await fetch('/api/investor/execute-proposal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userData.email })
            });
            if (!res.ok) throw new Error('Failed to execute rebalancing proposal.');
            const data = await res.json();
            
            setProposalSuccess(true);
            setTimeout(() => {
                setProposalSuccess(false);
                if (onUpdateUser) {
                    onUpdateUser(data.user);
                }
            }, 1800);
        } catch (err: any) {
            alert(err.message || 'Error executing proposal');
        } finally {
            setExecutingProposal(false);
        }
    };

    const handleTriggerCrisis = (crisis: string) => {
        setSimulatedCrisis(crisis);
        if (!crisis) {
            setSimulationLogs([]);
            return;
        }

        const timeStr = new Date().toLocaleTimeString();
        let logs: string[] = [];
        if (crisis === '2008') {
            logs = [
                `[${timeStr}] ALERT: S&P 500 Index drawdown exceeds -4.5%.`,
                `[${timeStr}] INFO: VIX volatility index spiking to 48.`,
                `[${timeStr}] SYSTEM: Activating defensive volatility hedge.`,
                `[${timeStr}] ROTATION: Reduced Equities exposure to 15%.`,
                `[${timeStr}] TRANSACTION: Shifted 40% capital to Gold & High-Yield Bonds.`,
                `[${timeStr}] SUCCESS: Drawdown minimized to -12% vs market -35%.`
            ];
        } else if (crisis === '2020') {
            logs = [
                `[${timeStr}] ALERT: Extreme equity liquidation triggered globally.`,
                `[${timeStr}] SYSTEM: Deploying rapid response liquid hedges.`,
                `[${timeStr}] REALLOCATION: Pruned equities; shifted 20% to USD and Gold.`,
                `[${timeStr}] CAPTURE: Re-entered equities at Q3 bottoms automatically.`,
                `[${timeStr}] SUCCESS: Net year-end return stabilized at +6.4% VS Market decline.`
            ];
        } else if (crisis === '2022') {
            logs = [
                `[${timeStr}] ALERT: High-beta tech assets multiple compression active.`,
                `[${timeStr}] SYSTEM: Trimmed technology sector exposures by 25%.`,
                `[${timeStr}] ROTATION: Allocated to commodity hedges & short cash yields.`,
                `[${timeStr}] SUCCESS: Outperformed standard equity index by +14.2%.`
            ];
        }
        setSimulationLogs(logs);
    };

    const [riskTolerance, setRiskTolerance] = useState(userData.riskTolerance || 'Balanced');
    const [selectedTab, setSelectedTab] = useState('home');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [aiBubbleText, setAiBubbleText] = useState('');
    const [aiBubbleFade, setAiBubbleFade] = useState(false);

    const [tickers, setTickers] = useState({
        btc: { price: 64250, change: 1.2, flash: '' },
        spy: { price: 524.30, change: 0.4, flash: '' },
        gld: { price: 218.10, change: -0.2, flash: '' }
    });

    const handleTabSwitch = (tab: string) => {
        setIsTransitioning(true);
        setTimeout(() => { setSelectedTab(tab); setIsTransitioning(false); }, 250);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTickers(prev => {
                const copy = { ...prev };
                for (const key in copy) {
                    const asset = { ...copy[key as keyof typeof copy] };
                    const percentMove = (Math.random() - 0.48) * 0.4;
                    asset.price += asset.price * (percentMove / 100);
                    asset.change += percentMove;
                    asset.flash = percentMove >= 0 ? 'flash-up' : 'flash-down';
                    (copy as any)[key] = asset;
                }
                return copy;
            });
            setTimeout(() => {
                setTickers(prev => {
                    const copy = { ...prev };
                    for (const key in copy) (copy as any)[key].flash = '';
                    return copy;
                });
            }, 1200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setAiBubbleFade(true);
        const timer = setTimeout(() => {
            let message = '';
            if (riskTolerance === 'Conservative') {
                message = `"Under a Conservative risk index, our primary target is capital preservation. We have shifted 70% of allocations into highly secure cash vaults and high-yield index bonds."`;
            } else if (riskTolerance === 'Balanced') {
                message = `"Based on your Balanced risk tolerance, I recommend maintaining a 30% allocation in global equities to hedge against inflation while capital growth peaks."`;
            } else {
                message = `"With an Aggressive layout active, we leverage 20% index exposure on cryptocurrency and blockchain networks, yielding higher target APRs but adding double volatility variance."`;
            }
            setAiBubbleText(message);
            setAiBubbleFade(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [riskTolerance]);

    const getDynamicConfig = () => {
        const base = assetDataConfig[riskTolerance];
        if (!simulatedCrisis) return base;

        if (riskTolerance === 'Conservative') {
            return {
                ...base,
                allocation: [35, 50, 5, 10]
            };
        } else if (riskTolerance === 'Balanced') {
            return {
                ...base,
                allocation: [25, 25, 25, 20, 5]
            };
        } else {
            return {
                ...base,
                allocation: [15, 15, 30, 20, 20]
            };
        }
    };

    const currentConfig = getDynamicConfig();

    const calculateProjections = () => {
        const config = assetDataConfig[riskTolerance];
        const labels: string[] = [];
        const aiValues: number[] = [];
        const tradValues: number[] = [];

        labels.push("Year 0");
        aiValues.push(sliderAmount);
        tradValues.push(sliderAmount);

        let currentAiVal = sliderAmount;
        let currentTradVal = sliderAmount;

        for (let i = 1; i <= sliderYears; i++) {
            labels.push("Year " + i);
            currentAiVal = currentAiVal * (1 + config.aiAnnualYield);
            currentTradVal = currentTradVal * (1 + config.tradAnnualYield);
            
            let crisisMultiplier = 1;
            if (simulatedCrisis === '2008') {
                if (i === 1) crisisMultiplier = 0.65;
                else if (i === 2) crisisMultiplier = 0.72;
                else if (i === 3) crisisMultiplier = 0.85;
            } else if (simulatedCrisis === '2020') {
                if (i === 1) crisisMultiplier = 0.78;
                else if (i === 2) crisisMultiplier = 1.05;
            } else if (simulatedCrisis === '2022') {
                if (i === 1) crisisMultiplier = 0.88;
                else if (i === 2) crisisMultiplier = 0.82;
                else if (i === 3) crisisMultiplier = 0.90;
            }

            const valBeforeNoiseAi = currentAiVal * crisisMultiplier;
            const valBeforeNoiseTrad = currentTradVal * (crisisMultiplier * 0.9);

            const aiNoise = valBeforeNoiseAi * (Math.random() - 0.48) * config.volatility * 0.6;
            const tradNoise = valBeforeNoiseTrad * (Math.random() - 0.5) * config.volatility;
            aiValues.push(Math.round(valBeforeNoiseAi + aiNoise));
            tradValues.push(Math.round(valBeforeNoiseTrad + tradNoise));
        }
        return { labels, aiValues, tradValues };
    };

    const simData = calculateProjections();
    const finalAiVal = simData.aiValues[simData.aiValues.length - 1];
    const initialVal = simData.aiValues[0];
    const profit = finalAiVal - initialVal;
    const allTimeReturnPercent = ((profit / initialVal) * 100).toFixed(1);

    const lineData = {
        labels: simData.labels,
        datasets: [
            {
                label: 'AI Optimized Portfolio',
                data: simData.aiValues,
                borderColor: '#00e676', borderWidth: 3, fill: true,
                backgroundColor: 'rgba(0, 230, 118, 0.05)', tension: 0.3, pointRadius: 2, pointHoverRadius: 6,
            },
            {
                label: 'Traditional Portfolio',
                data: simData.tradValues,
                borderColor: '#d4af37', borderWidth: 2, borderDash: [5, 5], fill: true,
                backgroundColor: 'rgba(212, 175, 55, 0.02)', tension: 0.3, pointRadius: 0, pointHoverRadius: 4,
            }
        ]
    };

    const lineOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: true, labels: { color: '#a1b3b8', font: { family: 'Outfit', size: 12 } } },
            tooltip: {
                mode: 'index' as const, intersect: false,
                backgroundColor: 'rgba(6, 18, 22, 0.9)', borderColor: 'rgba(212, 175, 55, 0.2)', borderWidth: 1,
                titleColor: '#fff', bodyColor: '#a1b3b8',
                titleFont: { family: 'Outfit', weight: 'bold' as const }, bodyFont: { family: 'Outfit' },
            }
        },
        scales: {
            x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#a1b3b8', font: { family: 'Outfit' } } },
            y: {
                grid: { color: 'rgba(255,255,255,0.03)' },
                ticks: { color: '#a1b3b8', font: { family: 'Outfit' }, callback: function(value: any) { return '$' + value.toLocaleString(); } }
            }
        }
    };

    const doughnutData = {
        labels: currentConfig.labels,
        datasets: [{
            data: currentConfig.allocation,
            backgroundColor: ['#00e676', '#d4af37', '#0288d1', '#ffb300', '#8e24aa'],
            borderWidth: 2, borderColor: '#03080a', hoverOffset: 10
        }]
    };

    const doughnutOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: 'rgba(6, 18, 22, 0.9)', borderColor: 'rgba(0, 230, 118, 0.2)', borderWidth: 1 }
        },
        cutout: '70%'
    };

    const symbols = ["CASH", "BOND", "EQUITY", "GOLD", "CRYPTO"];
    const colors = ["#00e676", "#d4af37", "#0288d1", "#ffb300", "#8e24aa"];
    const initials = userData.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

    const showStats     = selectedTab === 'home' || selectedTab === 'analytics';
    const showSimulator = selectedTab === 'home';
    const showHoldings  = selectedTab === 'home' || selectedTab === 'portfolio' || selectedTab === 'analytics';
    const showAI        = selectedTab === 'home' || selectedTab === 'advisory';
    const showCrisisSim = selectedTab === 'analytics';

    return (
        <div id="dashboard-view" className="dashboard-wrapper active">
            <div className="dashboard-container">
                <aside className="dash-sidebar">
                    <div className="logo">
                        <div className="logo-symbol">AI</div>
                        <div className="logo-text">AI Capital<span>Investment</span></div>
                    </div>

                    <ul className="dash-menu">
                        {[
                            { id: 'home', icon: <LayoutDashboard size={20} />, label: 'Overview' },
                            { id: 'portfolio', icon: <Wallet size={20} />, label: 'My Assets' },
                            { id: 'deposit', icon: <PlusCircle size={20} />, label: 'Deposit & History' },
                            { id: 'advisory', icon: <Sparkles size={20} />, label: 'AI Advisory' },
                            { id: 'analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
                            { id: 'blogs', icon: <BookOpen size={20} />, label: 'Blogs' },
                            { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
                        ].map(item => (
                            <li key={item.id} className={`dash-menu-item ${selectedTab === item.id ? 'active' : ''}`} onClick={() => handleTabSwitch(item.id)}>
                                <a>{item.icon} {item.label}</a>
                            </li>
                        ))}
                    </ul>

                    <div className="dash-sidebar-footer">
                        <div className="user-profile-badge">
                            <div className="user-avatar">{initials}</div>
                            <div className="user-info">
                                <p className="user-name">{userData.name}</p>
                                <p className="user-tier">Premium Account</p>
                            </div>
                        </div>
                        <button className="btn btn-green-outline" style={{ width: '100%', fontSize: '0.85rem', padding: '8px 16px' }} onClick={onLogout}>
                            <LogOut size={16} /> Log Out
                        </button>
                    </div>
                </aside>

                <main
                    className="dash-content"
                    style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)', transition: 'opacity 0.25s ease, transform 0.25s ease' }}
                >
                    <header className="dash-header">
                        <div className="dash-header-left">
                            <h1 className="glow-text-green">Welcome Back, {userData.name.split(" ")[0]}!</h1>
                            <p>Here is your real-time portfolio analysis and AI insights.</p>
                        </div>
                        <div className="dash-header-right">
                            <button 
                                type="button" 
                                className="btn btn-green-outline" 
                                style={{ fontSize: '0.78rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                                onClick={onLogout}
                            >
                                <LogOut size={14} /> Log Out
                            </button>
                            <div className="market-ticker">
                                {Object.entries(tickers).map(([key, asset]) => (
                                    <div key={key} className={`ticker-item ${asset.flash}`}>
                                        <span className="ticker-name">{key.toUpperCase()}</span>
                                        <span className="ticker-value">
                                            {"$" + asset.price.toLocaleString(undefined, {
                                                minimumFractionDigits: key !== 'btc' ? 2 : 0,
                                                maximumFractionDigits: key !== 'btc' ? 2 : 0
                                            })}
                                        </span>
                                        <span className={`ticker-change ${asset.change >= 0 ? 'up' : 'down'}`}>
                                            {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </header>

                    {selectedTab === 'blogs' ? (
                        <BlogsSection />
                    ) : selectedTab === 'settings' ? (
                        <SettingsSection userData={userData} onLogout={onLogout} />
                    ) : selectedTab === 'deposit' || selectedTab === 'history' ? (
                        <DepositSection userData={userData} onUpdateUser={onUpdateUser} />
                    ) : selectedTab === 'history' ? (
                        <HistorySection userData={userData} />
                    ) : selectedTab === 'advisory' ? (
                        <AIChatbotSection 
                            userData={userData} 
                            executingProposal={executingProposal}
                            proposalSuccess={proposalSuccess}
                            handleExecuteProposal={handleExecuteProposal}
                        />
                    ) : (
                        <div className="dash-grid">
                            <div className="dash-left-col">
                                {showStats && (
                                    <div className="widget">
                                        <div className="portfolio-summary-grid">
                                            <div className="summary-card">
                                                <p className="summary-label">Total Portfolio Value</p>
                                                <p className="summary-val glow-text-gold"><AnimatedValue value={finalAiVal} /></p>
                                                <p className="summary-change up"><ArrowUpRight size={14} /> +$120.45 Today</p>
                                            </div>
                                            <div className="summary-card">
                                                <p className="summary-label">AI Generated Profit</p>
                                                <p className="summary-val glow-text-green"><AnimatedValue value={profit} /></p>
                                                <p className="summary-change up"><ArrowUpRight size={14} /> +{allTimeReturnPercent}% All-Time</p>
                                            </div>
                                            <div className="summary-card">
                                                <p className="summary-label">Current Risk Profile</p>
                                                <p className="summary-val" style={{ color: riskTolerance === 'Conservative' ? 'var(--color-gold)' : riskTolerance === 'Balanced' ? 'var(--color-green)' : '#ff5252' }}>
                                                    {riskTolerance}
                                                </p>
                                                <p className="summary-change" style={{ color: 'var(--text-secondary)' }}>Optimal Stability</p>
                                            </div>
                                            <div className="summary-card">
                                                <p className="summary-label">Portfolio Health Index</p>
                                                <p className="summary-val glow-text-green">
                                                    {simulatedCrisis ? '88/100' : '96/100'}
                                                </p>
                                                <p className="summary-change" style={{ color: 'var(--text-secondary)' }}>
                                                    {simulatedCrisis ? '⚠ High Drift Detected' : '✓ Highly Diversified'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="widget-title">
                                            <span>Future Projections & Historical Growth</span>
                                            <span>{sliderYears} Year Target</span>
                                        </div>
                                        <div className="main-chart-container">
                                            <Line data={lineData} options={lineOptions} />
                                        </div>
                                    </div>
                                )}

                                {selectedTab === 'analytics' && (
                                    <div className="widget">
                                        <div className="widget-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>Historical Asset Backtester</span>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <select 
                                                    value={backtestStartYear} 
                                                    onChange={e => setBacktestStartYear(parseInt(e.target.value))}
                                                    style={{ background: 'rgba(6,18,10,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '4px 8px', color: '#fff', fontSize: '0.74rem', outline: 'none' }}
                                                >
                                                    <option value="2018">2018 - 2026 (8 Years)</option>
                                                    <option value="2020">2020 - 2026 (6 Years)</option>
                                                    <option value="2022">2022 - 2026 (4 Years)</option>
                                                </select>
                                                <select 
                                                    value={backtestComparisonType} 
                                                    onChange={e => setBacktestComparisonType(e.target.value as 'SP500' | '6040')}
                                                    style={{ background: 'rgba(6,18,10,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '4px 8px', color: '#fff', fontSize: '0.74rem', outline: 'none' }}
                                                >
                                                    <option value="SP500">vs S&P 500 Index</option>
                                                    <option value="6040">vs standard 60/40 Portfolio</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Backtest Line Chart */}
                                        <div className="main-chart-container" style={{ minHeight: '260px', marginTop: '10px' }}>
                                            {(() => {
                                                const { labels, portfolioValues, benchmarkValues } = getBacktestData();
                                                const backtestChartData = {
                                                    labels,
                                                    datasets: [
                                                        {
                                                            label: 'AI Wealth Portfolio',
                                                            data: portfolioValues,
                                                            borderColor: '#00e676',
                                                            backgroundColor: 'rgba(0, 230, 118, 0.04)',
                                                            borderWidth: 2,
                                                            tension: 0.35,
                                                            fill: true
                                                        },
                                                        {
                                                            label: backtestComparisonType === 'SP500' ? 'S&P 500 Index (SPY)' : 'Standard 60/40 Portfolio',
                                                            data: benchmarkValues,
                                                            borderColor: 'rgba(255,255,255,0.35)',
                                                            backgroundColor: 'transparent',
                                                            borderWidth: 2,
                                                            borderDash: [5, 5],
                                                            tension: 0.25
                                                        }
                                                    ]
                                                };
                                                return <Line data={backtestChartData} options={lineOptions} />;
                                            })()}
                                        </div>

                                        {/* Scorecard Table / Grid */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
                                            <div className="glass-card" style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                                                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>CUMULATIVE RETURNS</span>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                                                    <span style={{ fontSize: '0.86rem', color: '#00e676', fontWeight: 700 }}>+{(riskTolerance === 'Aggressive' ? 248.5 : riskTolerance === 'Balanced' ? 142.4 : 88.6).toFixed(1)}%</span>
                                                    <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{backtestComparisonType === 'SP500' ? '+94.2%' : '+61.5%'}</span>
                                                </div>
                                            </div>
                                            <div className="glass-card" style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                                                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>MAX DRAWDOWN</span>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                                                    <span style={{ fontSize: '0.86rem', color: '#ff5252', fontWeight: 700 }}>-{(riskTolerance === 'Conservative' ? 8.2 : 14.5).toFixed(1)}%</span>
                                                    <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{backtestComparisonType === 'SP500' ? '-24.8%' : '-18.2%'}</span>
                                                </div>
                                            </div>
                                            <div className="glass-card" style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                                                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>SHARPE RATIO</span>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                                                    <span style={{ fontSize: '0.86rem', color: 'var(--color-gold)', fontWeight: 700 }}>{(riskTolerance === 'Aggressive' ? 2.14 : riskTolerance === 'Balanced' ? 1.86 : 1.62).toFixed(2)}</span>
                                                    <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{backtestComparisonType === 'SP500' ? '1.14' : '0.98'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {showHoldings && (
                                    <div className="widget">
                                        <div className="widget-title">
                                            <span>Your Asset Distribution</span>
                                            <button className="btn btn-green-outline" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>Rebalance Assets</button>
                                        </div>
                                        <div className="holdings-table-wrapper">
                                            <table className="holdings-table">
                                                <thead>
                                                    <tr>
                                                        <th>Asset Class</th>
                                                        <th>Symbol</th>
                                                        <th style={{ textAlign: 'center' }}>Target</th>
                                                        <th style={{ textAlign: 'center' }}>Current</th>
                                                        <th style={{ textAlign: 'center' }}>Drift / Status</th>
                                                        <th>Balance</th>
                                                        <th>Day Return</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentConfig.allocation.map((percent, index) => {
                                                        const assetValue = finalAiVal * (percent / 100);
                                                        const dayReturn = (Math.sin(index + 3) * 1.5 + 0.2).toFixed(2);
                                                        const targetPercent = assetDataConfig[riskTolerance].allocation[index] || percent;
                                                        const drift = percent - targetPercent;
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="holdings-asset-name">
                                                                        <div className="asset-logo-placeholder" style={{ color: colors[index % colors.length] }}>
                                                                            {symbols[index % symbols.length][0]}
                                                                        </div>
                                                                        {currentConfig.labels[index]}
                                                                    </div>
                                                                </td>
                                                                <td><strong>{symbols[index % symbols.length]}</strong></td>
                                                                <td style={{ textAlign: 'center' }}>{targetPercent}%</td>
                                                                <td style={{ textAlign: 'center' }}><span className="alloc-badge">{percent}%</span></td>
                                                                <td style={{ textAlign: 'center' }}>
                                                                    {drift === 0 ? (
                                                                        <span style={{ fontSize: '0.72rem', background: 'rgba(0, 230, 118, 0.08)', color: 'var(--color-green)', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(0, 230, 118, 0.15)', fontWeight: 600 }}>✓ Stable</span>
                                                                    ) : (
                                                                        <span style={{ fontSize: '0.72rem', background: 'rgba(212, 175, 55, 0.08)', color: 'var(--color-gold)', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.15)', fontWeight: 600 }}>
                                                                            {drift > 0 ? `+${drift}` : drift}% Drift
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td>{"$" + Math.round(assetValue).toLocaleString()}</td>
                                                                <td style={{ color: parseFloat(dayReturn) >= 0 ? 'var(--color-green)' : '#ff5252', fontWeight: 600 }}>
                                                                    {parseFloat(dayReturn) >= 0 ? '+' : ''}{dayReturn}%
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {selectedTab === 'home' && (
                                    <div className="widget" style={{ marginTop: '4px' }}>
                                        <div className="widget-title">
                                            <span>Financial Goal Planner & Milestones</span>
                                            <button type="button" className="btn btn-green-outline" onClick={() => setShowAddGoalModal(true)} style={{ fontSize: '0.75rem', padding: '6px 12px', cursor: 'pointer' }}>+ Create New Goal</button>
                                        </div>
                                        <div className="dash-goals-grid">
                                            {financialGoals.map(g => {
                                                const progress = Math.min((g.current / g.target) * 100, 100);
                                                return (
                                                    <div key={g.id} className="glass-card" style={{ padding: '16px', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', background: 'rgba(255,255,255,0.01)' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                            <strong style={{ color: '#fff', fontSize: '0.88rem' }}>{g.name}</strong>
                                                            <span style={{ color: 'var(--color-green)', fontSize: '0.8rem', fontWeight: 600 }}>{progress.toFixed(0)}%</span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                                            <span>Target: ${g.target.toLocaleString()}</span>
                                                            <span>Current: ${g.current.toLocaleString()}</span>
                                                        </div>
                                                        {/* Progress bar */}
                                                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                                                            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-green), var(--color-gold))', borderRadius: '3px' }} />
                                                        </div>
                                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                                            Target Date: {new Date(g.date).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="dash-right-col">
                                {(selectedTab === 'home' || selectedTab === 'analytics') && (
                                    <div className="widget">
                                        <div className="widget-title">Allocation Breakdown</div>
                                        <div className="doughnut-chart-container">
                                            <Doughnut data={doughnutData} options={doughnutOptions} />
                                        </div>
                                    </div>
                                )}

                                {showCrisisSim && (
                                    <div className="widget glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid rgba(212,175,55,0.15)' }}>
                                        <div className="widget-title" style={{ color: 'var(--color-gold)' }}>AI Stress-Test Simulator</div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                            Simulate how our algorithmic hedging engine handles extreme historical market drawdowns by updating allocation weights instantly.
                                        </p>
                                        
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {[
                                                { id: '2008', name: '2008 Financial Crash (-35%)' },
                                                { id: '2020', name: '2020 Pandemic Panic (-22%)' },
                                                { id: '2022', name: '2022 Tech Selloff (-15%)' }
                                            ].map(c => (
                                                <button
                                                    key={c.id}
                                                    type="button"
                                                    onClick={() => handleTriggerCrisis(c.id)}
                                                    style={{
                                                        width: '100%', padding: '10px', fontSize: '0.8rem', borderRadius: '6px',
                                                        border: '1px solid ' + (simulatedCrisis === c.id ? '#ff5252' : 'rgba(255,255,255,0.08)'),
                                                        background: simulatedCrisis === c.id ? 'rgba(255, 82, 82, 0.08)' : 'rgba(255,255,255,0.02)',
                                                        color: simulatedCrisis === c.id ? '#ff5252' : '#fff',
                                                        fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s'
                                                    }}
                                                >
                                                    {c.id === simulatedCrisis ? '● ' : '○ '} {c.name}
                                                </button>
                                            ))}
                                            {simulatedCrisis && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleTriggerCrisis('')}
                                                    className="btn btn-green-outline"
                                                    style={{ width: '100%', padding: '8px', fontSize: '0.78rem', cursor: 'pointer' }}
                                                >
                                                    Reset & Clear Simulation
                                                </button>
                                            )}
                                        </div>

                                        {simulationLogs.length > 0 && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Live Rebalancing Logs:</span>
                                                <div style={{
                                                    background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)',
                                                    borderRadius: '6px', padding: '10px', maxHeight: '140px', overflowY: 'auto',
                                                    fontFamily: 'monospace', fontSize: '0.7rem', color: '#00e676', display: 'flex', flexDirection: 'column', gap: '4px'
                                                }}>
                                                    {simulationLogs.map((log, index) => (
                                                        <div key={index}>{log}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedTab === 'portfolio' && (
                                    <div className="widget glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid rgba(0,230,118,0.15)' }}>
                                        <div className="widget-title" style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--color-green)' }}>AI Volatility Shield</span>
                                            <label className="toggle-switch" style={{ position: 'relative', display: 'inline-block', width: '46px', height: '24px' }}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={volatilityShieldActive} 
                                                    onChange={e => {
                                                        const active = e.target.checked;
                                                        setVolatilityShieldActive(active);
                                                        const timeStr = new Date().toLocaleTimeString();
                                                        setShieldLogs(prev => [
                                                            `[${timeStr}] Shield state set to: ${active ? 'ACTIVE' : 'INACTIVE'}`,
                                                            ...prev
                                                        ]);
                                                    }}
                                                    style={{ opacity: 0, width: 0, height: 0 }}
                                                />
                                                <span style={{
                                                    position: 'absolute', cursor: 'pointer', inset: 0,
                                                    backgroundColor: volatilityShieldActive ? 'var(--color-green)' : 'rgba(255,255,255,0.1)',
                                                    transition: '0.3s', borderRadius: '24px',
                                                    boxShadow: volatilityShieldActive ? '0 0 10px rgba(0,230,118,0.4)' : 'none'
                                                }}>
                                                    <span style={{
                                                        position: 'absolute', content: '""', height: '18px', width: '18px',
                                                        left: volatilityShieldActive ? '24px' : '4px', bottom: '3px',
                                                        backgroundColor: '#fff', transition: '0.3s', borderRadius: '50%'
                                                    }} />
                                                </span>
                                            </label>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                            Mitigates extreme drawdown risks for high-beta holdings. Automatically rotates capital into USD cash vaults when target limits are breached.
                                        </p>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Max Acceptable Drawdown:</span>
                                                <span style={{ color: 'var(--color-green)', fontWeight: 600 }}>-{maxDrawdownLimit}%</span>
                                            </div>
                                            <input 
                                                type="range" min="2" max="15" step="1" 
                                                value={maxDrawdownLimit} 
                                                onChange={e => {
                                                    const val = parseInt(e.target.value);
                                                    setMaxDrawdownLimit(val);
                                                    const timeStr = new Date().toLocaleTimeString();
                                                    setShieldLogs(prev => [
                                                        `[${timeStr}] Target drawdown ceiling updated to: -${val}%`,
                                                        ...prev
                                                    ]);
                                                }}
                                                style={{ width: '100%' }}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Shield Ledger:</span>
                                            <div style={{
                                                background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)',
                                                borderRadius: '6px', padding: '10px', maxHeight: '120px', overflowY: 'auto',
                                                fontFamily: 'monospace', fontSize: '0.7rem', color: '#a1b3b8', display: 'flex', flexDirection: 'column', gap: '4px'
                                            }}>
                                                {shieldLogs.map((log, index) => (
                                                    <div key={index} style={{ color: log.includes('ACTIVE') ? 'var(--color-green)' : log.includes('INACTIVE') ? '#ff5252' : '#a1b3b8' }}>
                                                        {log}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedTab === 'portfolio' && (
                                    <div className="widget glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid rgba(0,230,118,0.15)', marginTop: '4px' }}>
                                        <div className="widget-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--color-green)' }}>Automated Tax-Loss Harvesting</span>
                                            <label className="toggle-switch" style={{ position: 'relative', display: 'inline-block', width: '46px', height: '24px' }}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={taxLossHarvestingActive} 
                                                    onChange={e => {
                                                        const active = e.target.checked;
                                                        setTaxLossHarvestingActive(active);
                                                        const timeStr = new Date().toLocaleTimeString();
                                                        setTaxLossLogs(prev => [
                                                            `[${timeStr}] Tax-Loss Harvesting state set to: ${active ? 'ENABLED' : 'DISABLED'}`,
                                                            ...prev
                                                        ]);
                                                    }}
                                                    style={{ opacity: 0, width: 0, height: 0 }}
                                                />
                                                <span style={{
                                                    position: 'absolute', cursor: 'pointer', inset: 0,
                                                    backgroundColor: taxLossHarvestingActive ? 'var(--color-green)' : 'rgba(255,255,255,0.1)',
                                                    transition: '0.3s', borderRadius: '24px',
                                                    boxShadow: taxLossHarvestingActive ? '0 0 10px rgba(0,230,118,0.4)' : 'none'
                                                }}>
                                                    <span style={{
                                                        position: 'absolute', content: '""', height: '18px', width: '18px',
                                                        left: taxLossHarvestingActive ? '24px' : '4px', bottom: '3px',
                                                        backgroundColor: '#fff', transition: '0.3s', borderRadius: '50%'
                                                    }} />
                                                </span>
                                            </label>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                            Monitors YTD investment lots to automatically capture capital losses, offsetting up to $3,000 in ordinary income taxes annually.
                                        </p>

                                        <div style={{ display: 'flex', gap: '14px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                                            <div>
                                                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Estimated Tax Savings</span>
                                                <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-green)', marginTop: '2px' }}>
                                                    ${taxLossHarvestingActive ? (taxLossSavings + 150).toLocaleString() : taxLossSavings.toLocaleString()}
                                                </span>
                                            </div>
                                            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '14px' }}>
                                                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>YTD Losses Harvested</span>
                                                <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', marginTop: '2px' }}>$5,300</span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Harvest Ledger Activity:</span>
                                            <div style={{
                                                background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)',
                                                borderRadius: '6px', padding: '10px', maxHeight: '110px', overflowY: 'auto',
                                                fontFamily: 'monospace', fontSize: '0.7rem', color: '#a1b3b8', display: 'flex', flexDirection: 'column', gap: '4px'
                                            }}>
                                                {taxLossLogs.map((log, index) => (
                                                    <div key={index} style={{ color: log.includes('ENABLED') ? 'var(--color-green)' : log.includes('DISABLED') ? '#ff5252' : '#a1b3b8' }}>
                                                        {log}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {showSimulator && (
                                    <div className="widget">
                                        <div className="widget-title">Growth Simulator</div>
                                        <div className="simulator-sliders">
                                            <div className="slider-group">
                                                <div className="slider-header">
                                                    <span className="slider-label">Investment Amount</span>
                                                    <span className="slider-val">{"$" + sliderAmount.toLocaleString()}</span>
                                                </div>
                                                <input type="range" min="1000" max="100000" step="1000" value={sliderAmount} onChange={(e) => setSliderAmount(parseFloat(e.target.value))} />
                                            </div>
                                            <div className="slider-group">
                                                <div className="slider-header">
                                                    <span className="slider-label">Investment Period</span>
                                                    <span className="slider-val">{sliderYears} Years</span>
                                                </div>
                                                <input type="range" min="1" max="30" step="1" value={sliderYears} onChange={(e) => setSliderYears(parseInt(e.target.value))} />
                                            </div>
                                            <div className="slider-group" style={{ marginTop: '8px' }}>
                                                <label className="slider-label" style={{ fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Target Risk Profile</label>
                                                <div className="risk-tolerance-selector">
                                                    {['Conservative', 'Balanced', 'Aggressive'].map((level) => (
                                                        <button key={level} type="button" className={`risk-btn ${riskTolerance === level ? 'active' : ''}`} onClick={() => setRiskTolerance(level)}>
                                                            {level}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {showAI && (
                                    <div className="widget">
                                        <div className="ai-advisor-panel">
                                            <div className="ai-avatar-header">
                                                <div className="ai-avatar">AI</div>
                                                <div className="ai-avatar-info">
                                                    <h5>Capital Advisor</h5>
                                                    <p>Online &amp; Monitoring</p>
                                                </div>
                                            </div>
                                            <div className={`ai-message-bubble ${aiBubbleFade ? 'fade-out' : ''}`}>
                                                {aiBubbleText}
                                            </div>
                                            {userData.advisorMessage && (
                                                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '8px' }}>
                                                    <h6 style={{ color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 600, margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Advisor Recommendation</h6>
                                                    <p style={{ color: '#fff', fontSize: '0.82rem', margin: 0, lineHeight: 1.4 }}>"{userData.advisorMessage}"</p>
                                                </div>
                                            )}
                                            <div className="ai-tips-list">
                                                <div className="ai-tip-item">
                                                    <Lightbulb size={16} />
                                                    <span>Automated balancing active. Next evaluation in 4 hours.</span>
                                                </div>
                                                <div className="ai-tip-item">
                                                    <CheckCircle2 size={16} />
                                                    <span>Optimal yield detected in Bond Index. +0.8% efficiency gain.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                <footer className="dashboard-footer" style={{
                    padding: '24px',
                    marginTop: '40px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    textAlign: 'center',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', opacity: 0.8 }}>
                        <span>SIPC MEMBER</span>
                        <span>•</span>
                        <span>FDIC INSURED PARTNER BANKS</span>
                        <span>•</span>
                        <span>SEC REGISTERED ADVISER</span>
                    </div>
                    <p style={{ margin: 0, maxWidth: '900px', alignSelf: 'center' }}>
                        AI Capital Investment is an SEC-registered investment adviser. Brokerage services are provided by Apex Clearing Corporation, member FINRA/SIPC.
                        FDIC insurance is provided through partner banks up to $250,000 per depositor. 
                        Past performance is no guarantee of future results. All yield estimates, target projections, and historical stress-test scenarios are simulated returns for illustrative purposes and do not represent actual performance.
                        Please read our full Form CRS and Risk Disclosures before executing investment reallocations.
                    </p>
                    <p style={{ margin: 0, fontSize: '0.68rem', opacity: 0.6 }}>
                        © 2026 AI Capital Investment LLC. All rights reserved.
                    </p>
                </footer>

            {showRiskQuiz && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(3,8,5,0.85)',
                    backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000, padding: '20px'
                }}>
                    <div className="glass-card" style={{
                        width: '100%', maxWidth: '780px', background: 'rgba(6,18,10,0.92)',
                        border: '1px solid rgba(212,175,55,0.25)', borderRadius: '16px',
                        overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.8)'
                    }}>
                        {/* Header */}
                        <div style={{
                            padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <div>
                                <h3 style={{ color: 'var(--color-gold)', margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Risk Assessment Questionnaire</h3>
                                <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0', fontSize: '0.76rem' }}>Question {Math.min(currentQuizQuestion + 1, quizQuestions.length)} of {quizQuestions.length}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowRiskQuiz(false)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.25rem', cursor: 'pointer' }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Split Content */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '340px' }}>
                            {/* Left Side: Question Selection */}
                            <div style={{ padding: '24px', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {currentQuizQuestion < quizQuestions.length ? (
                                    <>
                                        <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 600, margin: '0 0 20px 0', lineHeight: 1.4 }}>
                                            {quizQuestions[currentQuizQuestion].question}
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {quizQuestions[currentQuizQuestion].options.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => {
                                                        const newAnswers = [...quizAnswers, opt.score];
                                                        setQuizAnswers(newAnswers);
                                                        setCurrentQuizQuestion(prev => prev + 1);
                                                    }}
                                                    style={{
                                                        width: '100%', padding: '14px', borderRadius: '8px',
                                                        border: '1px solid rgba(255,255,255,0.08)',
                                                        background: 'rgba(255,255,255,0.02)',
                                                        color: 'var(--text-secondary)', fontSize: '0.82rem',
                                                        textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s'
                                                    }}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.borderColor = 'var(--color-gold)';
                                                        e.currentTarget.style.background = 'rgba(212,175,55,0.04)';
                                                        e.currentTarget.style.color = '#fff';
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                                    }}
                                                >
                                                    {opt.text}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    /* Result Screen */
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
                                        <div style={{
                                            width: '60px', height: '60px', borderRadius: '50%',
                                            background: 'rgba(0,230,118,0.1)', border: '2px solid var(--color-green)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            alignSelf: 'center', color: 'var(--color-green)', fontSize: '1.5rem', fontWeight: 'bold'
                                        }}>
                                            ✓
                                        </div>
                                        <div>
                                            <h4 style={{ color: '#fff', margin: '0 0 6px 0', fontSize: '1.1rem' }}>Assessment Complete</h4>
                                            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.8rem', lineHeight: 1.4 }}>
                                                Based on your response profile, we recommend a **{
                                                    (() => {
                                                        const sum = quizAnswers.reduce((a,b) => a+b, 0);
                                                        if (sum <= 6) return 'Conservative';
                                                        if (sum <= 9) return 'Balanced';
                                                        return 'Aggressive';
                                                    })()
                                                }** risk profile strategy.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                const sum = quizAnswers.reduce((a,b) => a+b, 0);
                                                let finalProfile = 'Balanced';
                                                if (sum <= 6) finalProfile = 'Conservative';
                                                else if (sum >= 10) finalProfile = 'Aggressive';
                                                
                                                setRiskTolerance(finalProfile);
                                                setShowRiskQuiz(false);

                                                // Update in user settings too
                                                if (onUpdateUser) {
                                                    const updatedUser = { ...userData, riskTolerance: finalProfile };
                                                    onUpdateUser(updatedUser);
                                                }

                                                // Log rebalancing event
                                                const timeStr = new Date().toLocaleTimeString();
                                                setSimulationLogs(prev => [
                                                    `[${timeStr}] SYSTEM: Risk profile updated to ${finalProfile} via interactive questionnaire.`,
                                                    `[${timeStr}] REALLOCATION: Aligning asset targets to ${assetDataConfig[finalProfile].allocation.join('/')}.`,
                                                    ...prev
                                                ]);
                                            }}
                                            className="btn btn-green"
                                            style={{ padding: '12px', fontSize: '0.82rem', alignSelf: 'center', width: '220px', cursor: 'pointer' }}
                                        >
                                            Save & Apply Allocation
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Live Allocation Preview */}
                            <div style={{ padding: '24px', background: 'rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Suggested Allocation</span>
                                <div style={{ width: '160px', height: '160px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {/* Doughnut Chart Mock */}
                                    {(() => {
                                        const sum = quizAnswers.reduce((a,b) => a+b, 0);
                                        let currentAlloc = [25, 25, 25, 20, 5]; // default Balanced
                                        let label = 'Balanced';
                                        let col = 'var(--color-green)';
                                        if (sum > 0) {
                                            if (sum <= 6) {
                                                currentAlloc = [35, 50, 5, 10];
                                                label = 'Conservative';
                                                col = 'var(--color-gold)';
                                            } else if (sum >= 10) {
                                                currentAlloc = [15, 15, 30, 20, 20];
                                                label = 'Aggressive';
                                                col = '#ff5252';
                                            }
                                        }
                                        return (
                                            <>
                                                <div style={{
                                                    position: 'absolute', inset: 0, borderRadius: '50%',
                                                    border: '10px solid rgba(255,255,255,0.05)',
                                                    borderTopColor: col,
                                                    transform: 'rotate(45deg)', transition: 'border-color 0.3s'
                                                }} />
                                                <div style={{ textAlign: 'center', zIndex: 10 }}>
                                                    <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: col }}>{label}</span>
                                                    <span style={{ display: 'block', fontSize: '0.66rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Score: {sum || '-'}</span>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                                    {(() => {
                                        const sum = quizAnswers.reduce((a,b) => a+b, 0);
                                        let finalP = 'Balanced';
                                        if (sum > 0) {
                                            if (sum <= 6) finalP = 'Conservative';
                                            else if (sum >= 10) finalP = 'Aggressive';
                                        }
                                        const cfg = assetDataConfig[finalP];
                                        return cfg.allocation.map((percent, idx) => (
                                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>{cfg.labels[idx]}</span>
                                                <span style={{ color: '#fff', fontWeight: 600 }}>{percent}%</span>
                                            </div>
                                        ));
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAddGoalModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(3,8,5,0.85)',
                    backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000, padding: '20px'
                }}>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!newGoalName || !newGoalTarget || !newGoalDate) return;
                            const targetVal = parseFloat(newGoalTarget);
                            if (isNaN(targetVal)) return;

                            const newG = {
                                id: String(Date.now()),
                                name: newGoalName,
                                target: targetVal,
                                current: 0,
                                date: newGoalDate
                            };
                            setFinancialGoals(prev => [...prev, newG]);
                            setShowAddGoalModal(false);
                            setNewGoalName('');
                            setNewGoalTarget('');
                            setNewGoalDate('');
                        }}
                        className="glass-card" 
                        style={{
                            width: '100%', maxWidth: '440px', background: 'rgba(6,18,10,0.95)',
                            border: '1px solid rgba(0,230,118,0.25)', borderRadius: '14px',
                            padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px',
                            boxShadow: '0 24px 80px rgba(0,0,0,0.8)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ color: 'var(--color-green)', margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Create Financial Goal</h3>
                            <button
                                type="button"
                                onClick={() => setShowAddGoalModal(false)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.2rem', cursor: 'pointer' }}
                            >
                                ✕
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Goal Name</label>
                            <input 
                                type="text" placeholder="e.g., Tesla Downpayment" required
                                value={newGoalName} onChange={e => setNewGoalName(e.target.value)}
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Target Amount ($)</label>
                            <input 
                                type="number" placeholder="e.g., 25000" required
                                value={newGoalTarget} onChange={e => setNewGoalTarget(e.target.value)}
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Target Date</label>
                            <input 
                                type="date" required
                                value={newGoalDate} onChange={e => setNewGoalDate(e.target.value)}
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-green"
                            style={{ padding: '12px', fontSize: '0.85rem', cursor: 'pointer', marginTop: '8px' }}
                        >
                            Establish Goal Target
                        </button>
                    </form>
                </div>
            )}
                </main>

                {/* Mobile Bottom Tab Navigation */}
                <nav className="mobile-bottom-nav">
                    {[
                        { id: 'home', icon: <LayoutDashboard size={17} />, label: 'Overview' },
                        { id: 'portfolio', icon: <Wallet size={17} />, label: 'Assets' },
                        { id: 'deposit', icon: <PlusCircle size={17} />, label: 'Deposit' },
                        { id: 'advisory', icon: <Sparkles size={17} />, label: 'Advisory' },
                        { id: 'analytics', icon: <BarChart3 size={17} />, label: 'Analytics' },
                        { id: 'blogs', icon: <BookOpen size={17} />, label: 'Blogs' },
                        { id: 'settings', icon: <Settings size={17} />, label: 'Settings' }
                    ].map(item => (
                        <button 
                            key={item.id} 
                            type="button"
                            className={`mobile-tab-item ${selectedTab === item.id ? 'active' : ''}`}
                            onClick={() => handleTabSwitch(item.id)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

interface BlogArticle {
    id: string;
    title: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    abstract: string;
    content: string[];
    icon: React.ReactNode;
    gold?: boolean;
    image: string;
    imageAlt: string;
    url: string;
}

const blogArticles: BlogArticle[] = [
    {
        id: '1',
        title: 'The Future of AI-Driven Wealth Management',
        category: 'AI & Tech',
        author: 'AI Capital Research',
        date: 'July 15, 2026',
        readTime: '4 min read (185 words)',
        abstract: 'How neural networks and automated rebalancing are replacing traditional financial advisors, minimizing portfolio volatility by 30%.',
        icon: <Sparkles size={32} />,
        gold: false,
        url: 'https://ai-capital-investment.vercel.app/blogs/ai-driven-asset-allocation-2026',
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
        imageAlt: "AI Quantitative Stock Chart & Financial Trading Analytics Dashboard",
        content: [
            'Traditional 60/40 asset allocation models fail to keep pace with dynamic inflation cycles and rapid macroeconomic shifts. By introducing multi-agent neural networks trained on 30 years of global market indicators, AI Capital Investment automatically adjusts portfolio weights between high-yield corporate bonds, physical gold hedges, and high-beta growth equities in real time.',
            'One of the primary advantages of algorithmic wealth management is continuous, 24/7 automated rebalancing. While traditional human financial advisors rebalance portfolios only quarterly or annually, multi-agent neural networks evaluate asset risk weights daily. When market spikes cause equities to exceed target weights, the system executes trades to lock in alpha gains and purchase undervalued hedges.',
            'Backtested data across 30 years of market crises suggests that automated rebalancing reduces total portfolio volatility by up to 30% compared to static allocation models while eliminating human cognitive trading panic.'
        ]
    },
    {
        id: '2',
        title: 'Decoding Digital Assets: BTC & ETH in a Balanced Portfolio',
        category: 'Crypto',
        author: 'Marcus Vance, Senior Advisor',
        date: 'July 12, 2026',
        readTime: '6 min read (180 words)',
        abstract: 'Evaluating the optimal allocation index for crypto assets under a balanced risk profile to maximize returns while shielding capital.',
        icon: <Wallet size={32} />,
        gold: true,
        url: 'https://ai-capital-investment.vercel.app/blogs/algorithmic-crypto-yields-vaults-2026',
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Digital Assets Vault & Algorithmic Cryptocurrency Staking Yield Analytics",
        content: [
            'Cryptocurrencies like Bitcoin (BTC) and Ethereum (ETH) have matured from speculative assets into essential institutional asset classes. Our quantitative research indicates that excluding digital assets entirely from a modern portfolio misses vital capital growth opportunities.',
            'Under a Balanced risk profile, a controlled allocation of 5% to 10% offers substantial upside alpha with manageable downside risk. Digital assets demonstrate low correlation with fixed-income bonds, allowing Bitcoin to function as digital gold during monetary expansion cycles.',
            'Our algorithmic engine utilizes volatility-weighted budgeting. Instead of fixed dollar amounts, the AI dynamically expands digital asset exposure during volatility contractions and scales back position sizing during market panics, protecting principal capital.'
        ]
    },
    {
        id: '3',
        title: 'Interest Rates & Bond Yields: Navigating Inflationary Cycles',
        category: 'Macro Strategy',
        author: 'Helena Ross, Macro Analyst',
        date: 'July 08, 2026',
        readTime: '5 min read (185 words)',
        abstract: 'Understanding the relationship between central bank policies, corporate bonds, and physical gold hedges in capital preservation.',
        icon: <BarChart3 size={32} />,
        gold: false,
        url: 'https://ai-capital-investment.vercel.app/blogs/ai-risk-hedging-shields-capital-2026',
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Macroeconomic Volatility Shield & Risk Hedging Market Defense Graph",
        content: [
            'During macroeconomic uncertainty, monitoring central bank interest rate cycles is vital for wealth preservation. When central banks raise rates to combat inflation, fixed-income bond prices decline while yields rise.',
            'For conservative portfolios, this creates opportunities to lock in high yields on secure short-term government bonds. AI Capital manages this exposure through dynamic duration matching—shifting funds into short-maturity bonds when rates rise and extending duration when yields peak.',
            'To protect purchasing power against persistent inflation, our system pairs short-term bonds with physical gold hedges. Gold appreciates when real interest rates fall into negative territory, providing a resilient capital buffer.'
        ]
    },
    {
        id: '4',
        title: 'Tax-Loss Harvesting: Maximizing Your Net Investment Returns',
        category: 'Tax Strategy',
        author: 'Elena Rostova, CFA (SEBI / SEC Registered RIA, Head of Private Wealth)',
        date: 'July 03, 2026',
        readTime: '8 min read (190 words)',
        abstract: 'A deep dive into automated tax-loss harvesting mechanisms that help lock in net capital gains and optimize year-end tax returns.',
        icon: <Settings size={32} />,
        gold: true,
        url: 'https://ai-capital-investment.vercel.app/blogs/tax-loss-harvesting-strategies-2026',
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Automated Tax Loss Harvesting & Financial Wealth Tax Shield Analytics",
        content: [
            'Tax-loss harvesting (TLH) is one of the most effective quantitative wealth preservation tools for accredited and high net worth investors. By algorithmically monitoring portfolio holdings 24 hours a day, AI Capital identifies unrealized capital losses in declining equity and bond positions.',
            'The system executes wash-sale compliant swaps into correlated tracking index funds, preserving market exposure while booking tax-deductible capital losses. These harvested losses directly offset taxable dividend distributions and interest income, adding an estimated 1.2% to 1.8% to net annual compound returns.',
            'Doing this manually is prone to timing errors and wash-sale violations, but automated multi-agent algorithms execute harvesting trades seamlessly without altering your long-term risk profile or target asset allocation.'
        ]
    }
];

const BlogsSection = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

    const categories = ['All', 'AI & Tech', 'Crypto', 'Macro Strategy', 'Tax Strategy'];
    const filteredArticles = selectedCategory === 'All'
        ? blogArticles
        : blogArticles.filter(art => art.category === selectedCategory);

    return (
        <div className="blogs-container">
            <div className="blog-filters" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            type="button"
                            className={`blog-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <a 
                    href="https://www.udenai.com/blog-studio" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-green-outline"
                    style={{ fontSize: '0.8rem', padding: '6px 14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                >
                    Write a Blog <ArrowUpRight size={14} />
                </a>
            </div>

            <div className="blogs-grid">
                {filteredArticles.map(article => (
                    <div
                        key={article.id}
                        className={`widget blog-card glass-card ${article.gold ? 'gold-border' : 'green-border'}`}
                        style={{ padding: 0, overflow: 'hidden' }}
                    >
                        <div className="blog-img-thumb-container">
                            <img 
                                src={article.image} 
                                alt={article.imageAlt} 
                                className="blog-img-thumb"
                            />
                        </div>
                        <div className="blog-card-content">
                            <span className="blog-badge">{article.category}</span>
                            <h3 className="blog-card-title">{article.title}</h3>
                            <p className="blog-card-abstract">{article.abstract}</p>
                            <div className="blog-meta-footer">
                                <div className="blog-meta-left">
                                    <span>{article.author}</span>
                                    <span>•</span>
                                    <span>{article.date}</span>
                                </div>
                                <span className="blog-read-link" onClick={() => setActiveArticle(article)}>
                                    Read Article <ChevronRight size={14} />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Article Reader Overlay */}
            {activeArticle && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(2, 8, 4, 0.75)', backdropFilter: 'blur(10px)',
                    padding: '20px'
                }}>
                    <div className="glass-card" style={{
                        maxWidth: '680px', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '28px',
                        position: 'relative', border: activeArticle.gold ? '1px solid rgba(212, 175, 55, 0.22)' : '1px solid rgba(0, 230, 118, 0.22)',
                        background: 'rgba(6, 18, 10, 0.95)', boxShadow: activeArticle.gold ? '0 0 40px rgba(212, 175, 55, 0.1)' : '0 0 40px rgba(0, 230, 118, 0.1)',
                        transform: 'none', borderRadius: '16px'
                    }}>
                        <button onClick={() => setActiveArticle(null)} style={{
                            position: 'absolute', top: '16px', right: '16px', zIndex: 10,
                            background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff',
                            borderRadius: '50%', width: '36px', height: '36px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'color 0.2s'
                        }} onMouseEnter={e => e.currentTarget.style.color = '#00e676'} onMouseLeave={e => e.currentTarget.style.color = '#fff'}>
                            <X size={20} />
                        </button>
                        
                        <div style={{ borderRadius: '12px', overflow: 'hidden', height: '200px', marginBottom: '18px' }}>
                            <img 
                                src={activeArticle.image} 
                                alt={activeArticle.imageAlt} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        <span className="blog-badge" style={{ marginBottom: '12px' }}>{activeArticle.category}</span>
                        <h3 style={{ fontSize: '1.45rem', fontWeight: 700, marginBottom: '8px', color: '#ffffff', lineHeight: 1.3 }} className={activeArticle.gold ? 'glow-text-gold' : 'glow-text-green'}>
                            {activeArticle.title}
                        </h3>
                        
                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '22px' }}>
                            <span>By {activeArticle.author}</span>
                            <span>•</span>
                            <span>{activeArticle.date}</span>
                            <span>•</span>
                            <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{activeArticle.readTime}</span>
                        </div>

                        <div style={{
                            maxHeight: '340px', overflowY: 'auto', paddingRight: '8px',
                            fontSize: '0.9rem', color: '#a1b3b8', lineHeight: '1.65',
                            textAlign: 'left'
                        }}>
                            {activeArticle.content.map((paragraph, index) => (
                                <p key={index} style={{ marginBottom: '14px' }}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Canonical Source URL Box */}
                        <div style={{
                            marginTop: '16px', padding: '12px 16px', background: 'rgba(0, 230, 118, 0.05)',
                            border: '1px solid rgba(0, 230, 118, 0.2)', borderRadius: '8px',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px'
                        }}>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: '#00e676', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    🌐 Canonical Article Source URL
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#ffffff', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                    {activeArticle.url}
                                </div>
                            </div>
                            <a 
                                href={activeArticle.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-green-outline"
                                style={{ fontSize: '0.76rem', padding: '6px 14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                            >
                                Open Source Article ↗
                            </a>
                        </div>

                        {/* YMYL Financial Disclaimer Banner */}
                        <div style={{
                            marginTop: '14px', padding: '12px 14px', background: 'rgba(212, 175, 55, 0.06)',
                            borderLeft: '3px solid var(--color-gold)', borderRadius: '6px', fontSize: '0.73rem',
                            color: 'var(--text-muted)', lineHeight: 1.5
                        }}>
                            <strong>Regulatory Notice & YMYL Disclaimer:</strong> Algorithmic strategy insights provided by AI Capital Investment LLC (SEBI Reg: INA000098765 / SEC RIA #801-123456). Past performance is no guarantee of future returns. Content is intended for educational purposes and does not constitute personalized financial or tax advice.
                        </div>
                        
                        <button className="btn btn-green-outline" onClick={() => setActiveArticle(null)} style={{ marginTop: '18px', width: '100%' }}>
                            Close Article
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const SettingsSection = ({ userData, onLogout }: { userData: UserData; onLogout?: () => void }) => {
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [phone, setPhone] = useState('(555) 019-2834');
    const [risk, setRisk] = useState(userData.riskTolerance || 'Balanced');
    const [goal, setGoal] = useState(userData.goal || 'Growth');
    const [emailReports, setEmailReports] = useState(true);
    const [aiAlerts, setAiAlerts] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1200);
    };

    return (
        <form onSubmit={handleSave} className="settings-container dash-settings-grid">
            <div className="widget" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="widget-title">Profile Settings</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Full Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                        required
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        disabled
                        style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'not-allowed' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Phone Number</label>
                    <input 
                        type="text" 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                    />
                </div>

                <div className="widget-title" style={{ marginTop: '10px' }}>Security</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h6 style={{ fontSize: '0.9rem', color: '#fff', margin: 0 }}>Two-Factor Authentication (2FA)</h6>
                        <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Secure your portfolio transactions with a phone OTP code.</p>
                    </div>
                    <label className="toggle-switch" style={{ position: 'relative', display: 'inline-block', width: '46px', height: '24px' }}>
                        <input 
                            type="checkbox" 
                            checked={twoFactor} 
                            onChange={e => setTwoFactor(e.target.checked)}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                            position: 'absolute', cursor: 'pointer', inset: 0,
                            backgroundColor: twoFactor ? 'var(--color-green)' : 'rgba(255,255,255,0.1)',
                            transition: '0.3s', borderRadius: '24px',
                            boxShadow: twoFactor ? '0 0 10px rgba(0,230,118,0.4)' : 'none'
                        }}>
                            <span style={{
                                position: 'absolute', content: '""', height: '18px', width: '18px',
                                left: twoFactor ? '24px' : '4px', bottom: '3px',
                                backgroundColor: '#fff', transition: '0.3s', borderRadius: '50%'
                            }} />
                        </span>
                    </label>
                </div>
            </div>

            <div className="widget" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="widget-title">Investment Configuration</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Target Risk Profile</label>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        {['Conservative', 'Balanced', 'Aggressive'].map(r => (
                            <button 
                                key={r} 
                                type="button" 
                                className={`risk-btn ${risk === r ? 'active' : ''}`} 
                                onClick={() => setRisk(r)}
                                style={{ flex: 1, padding: '8px', fontSize: '0.82rem' }}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Primary Investment Goal</label>
                    <select 
                        value={goal} 
                        onChange={e => setGoal(e.target.value)} 
                        style={{ background: 'rgba(6,18,10,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                    >
                        <option value="Retirement">Retirement Planning</option>
                        <option value="Growth">Aggressive Capital Growth</option>
                        <option value="Passive">Passive Income Generation</option>
                        <option value="Education">Education Funding</option>
                    </select>
                </div>

                <div className="widget-title" style={{ marginTop: '10px' }}>Notification Preferences</div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h6 style={{ fontSize: '0.9rem', color: '#fff', margin: 0 }}>Email Reports</h6>
                        <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Receive monthly portfolio rebalancing updates.</p>
                    </div>
                    <label className="toggle-switch" style={{ position: 'relative', display: 'inline-block', width: '46px', height: '24px' }}>
                        <input 
                            type="checkbox" 
                            checked={emailReports} 
                            onChange={e => setEmailReports(e.target.checked)}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                            position: 'absolute', cursor: 'pointer', inset: 0,
                            backgroundColor: emailReports ? 'var(--color-green)' : 'rgba(255,255,255,0.1)',
                            transition: '0.3s', borderRadius: '24px',
                            boxShadow: emailReports ? '0 0 10px rgba(0,230,118,0.4)' : 'none'
                        }}>
                            <span style={{
                                position: 'absolute', content: '""', height: '18px', width: '18px',
                                left: emailReports ? '24px' : '4px', bottom: '3px',
                                backgroundColor: '#fff', transition: '0.3s', borderRadius: '50%'
                            }} />
                        </span>
                    </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                    <div>
                        <h6 style={{ fontSize: '0.9rem', color: '#fff', margin: 0 }}>AI Advisory Alerts</h6>
                        <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Real-time notifications on optimal yield changes.</p>
                    </div>
                    <label className="toggle-switch" style={{ position: 'relative', display: 'inline-block', width: '46px', height: '24px' }}>
                        <input 
                            type="checkbox" 
                            checked={aiAlerts} 
                            onChange={e => setAiAlerts(e.target.checked)}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                            position: 'absolute', cursor: 'pointer', inset: 0,
                            backgroundColor: aiAlerts ? 'var(--color-green)' : 'rgba(255,255,255,0.1)',
                            transition: '0.3s', borderRadius: '24px',
                            boxShadow: aiAlerts ? '0 0 10px rgba(0,230,118,0.4)' : 'none'
                        }}>
                            <span style={{
                                position: 'absolute', content: '""', height: '18px', width: '18px',
                                left: aiAlerts ? '24px' : '4px', bottom: '3px',
                                backgroundColor: '#fff', transition: '0.3s', borderRadius: '50%'
                            }} />
                        </span>
                    </label>
                </div>
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', marginTop: '10px' }}>
                <div>
                    {saveSuccess && (
                        <span style={{ color: 'var(--color-green)', fontSize: '0.88rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle2 size={16} /> Settings saved successfully!
                        </span>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {onLogout && (
                        <button 
                            type="button" 
                            className="btn btn-green-outline" 
                            onClick={onLogout}
                            style={{ padding: '10px 18px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', color: '#ff5252', borderColor: 'rgba(255,82,82,0.3)' }}
                        >
                            <LogOut size={16} /> Log Out Account
                        </button>
                    )}
                    <button type="submit" className="btn btn-green" disabled={isSaving} style={{ minWidth: '160px' }}>
                        {isSaving ? <span className="auth-spinner" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }} /> : 'Save Configurations'}
                    </button>
                </div>
            </div>
        </form>
    );
};

interface Transaction {
    id: string;
    email: string;
    type?: 'deposit' | 'credit' | 'withdrawal';
    amount: number;
    tier: string;
    date: string;
    paymentMethod: string;
    status: string;
}

/* Unified Page: Deposit Capital & Transaction History */
const DepositSection = ({ userData, onUpdateUser }: { userData: UserData; onUpdateUser?: (updated: any) => void }) => {
    const [recentTxns, setRecentTxns] = useState<Transaction[]>([]);
    const [selectedTier, setSelectedTier] = useState<string>('growth');
    const [customAmount, setCustomAmount] = useState<string>('25000');
    const [cardName, setCardName] = useState<string>('');
    const [cardNumber, setCardNumber] = useState<string>('');
    const [cardExp, setCardExp] = useState<string>('');
    const [cardCvc, setCardCvc] = useState<string>('');
    const [isDepositing, setIsDepositing] = useState(false);
    const [depositSuccess, setDepositSuccess] = useState(false);

    // Ledger filters & states
    const [filterType, setFilterType] = useState<'all' | 'deposit' | 'credit' | 'withdrawal'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);

    const tiers = [
        { id: 'starter', name: 'Starter Vault', amount: 5000, desc: 'Core algorithmic index balancing & defensive hedging.' },
        { id: 'growth', name: 'Growth Strategy Vault', amount: 25000, desc: 'AI multi-asset optimization + high-beta yield capture.' },
        { id: 'elite', name: 'Elite Wealth Vault', amount: 100000, desc: 'Dedicated advisor management + priority tax loss harvesting.' },
    ];

    const fetchRecentTxns = async () => {
        try {
            const res = await fetch(`/api/investor/transactions?email=${userData.email}`);
            if (res.ok) {
                const data = await res.json();
                setRecentTxns(data);
            }
        } catch (e) {
            console.error("Error fetching transactions:", e);
        }
    };

    useEffect(() => {
        fetchRecentTxns();
    }, [userData.email]);

    const handleDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDepositing(true);
        setDepositSuccess(false);

        let finalAmount = 25000;
        let tierName = 'Growth Strategy Vault';
        if (selectedTier === 'starter') {
            finalAmount = 5000;
            tierName = 'Starter Vault';
        } else if (selectedTier === 'growth') {
            finalAmount = 25000;
            tierName = 'Growth Strategy Vault';
        } else if (selectedTier === 'elite') {
            finalAmount = 100000;
            tierName = 'Elite Wealth Vault';
        } else {
            finalAmount = parseFloat(customAmount) || 10000;
            tierName = 'Custom Capital Deposit';
        }

        const last4 = cardNumber.replace(/\s+/g, '').slice(-4) || '4242';

        try {
            const res = await fetch('/api/investor/deposit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userData.email,
                    amount: finalAmount,
                    tier: tierName,
                    cardLast4: last4
                })
            });

            if (res.ok) {
                const data = await res.json();
                setDepositSuccess(true);
                if (data.transactions) setRecentTxns(data.transactions);
                if (data.user && onUpdateUser) {
                    onUpdateUser(data.user);
                }
                setCardName('');
                setCardNumber('');
                setCardExp('');
                setCardCvc('');
                setTimeout(() => setDepositSuccess(false), 3500);
            } else {
                alert("Deposit failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to server.");
        } finally {
            setIsDepositing(false);
        }
    };

    const filteredTransactions = recentTxns.filter(t => {
        const matchesType = filterType === 'all' ? true : (t.type || 'deposit') === filterType;
        const matchesSearch =
            t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.tier.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.status.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const totalDeposited = recentTxns
        .filter(t => (t.type || 'deposit') === 'deposit')
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    const totalCreditedYield = recentTxns
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%' }}>
            {/* Header Title Banner */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <PlusCircle size={24} style={{ color: 'var(--color-gold)' }} /> Deposit Capital & Transaction History
                    </h2>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                        Fund your investment portfolio and track all past deposits, yield payouts, and transaction receipts in one place.
                    </p>
                </div>
            </div>

            {/* Top Section: Deposit Form (Left) & Capital Summary (Right) */}
            <div className="dash-deposit-grid">
                {/* Deposit Form Card */}
                <div className="widget glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid rgba(212,175,55,0.25)' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700, margin: 0 }}>Add New Capital</h3>
                    <form onSubmit={handleDeposit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.84rem', color: '#fff', fontWeight: 700 }}>Select Strategy Tier</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {tiers.map(t => (
                                    <div
                                        key={t.id}
                                        onClick={() => setSelectedTier(t.id)}
                                        style={{
                                            padding: '14px 16px', borderRadius: '10px', cursor: 'pointer',
                                            border: selectedTier === t.id ? '1.5px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.06)',
                                            background: selectedTier === t.id ? 'rgba(212,175,55,0.09)' : 'rgba(255,255,255,0.02)',
                                            transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: selectedTier === t.id ? 'var(--color-gold)' : '#fff' }}>
                                                {t.name}
                                            </div>
                                            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                                {t.desc}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-green)' }}>
                                            ${t.amount.toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                                <div
                                    onClick={() => setSelectedTier('custom')}
                                    style={{
                                        padding: '14px 16px', borderRadius: '10px', cursor: 'pointer',
                                        border: selectedTier === 'custom' ? '1.5px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.06)',
                                        background: selectedTier === 'custom' ? 'rgba(212,175,55,0.09)' : 'rgba(255,255,255,0.02)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: selectedTier === 'custom' ? 'var(--color-gold)' : '#fff' }}>
                                        Custom Deposit Amount
                                    </div>
                                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                        Specify a custom capital amount to deposit directly into your holdings.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedTier === 'custom' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Custom Amount ($)</label>
                                <input
                                    type="number"
                                    min="100"
                                    step="100"
                                    value={customAmount}
                                    onChange={e => setCustomAmount(e.target.value)}
                                    required
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                            <span style={{ fontSize: '0.84rem', color: '#fff', fontWeight: 700 }}>Payment Authorization</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Cardholder Name</label>
                                <input type="text" placeholder="John Doe" value={cardName} onChange={e => setCardName(e.target.value)} required style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 12px', color: '#fff', fontSize: '0.86rem', outline: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Card Number</label>
                                <input type="text" placeholder="4532 •••• •••• 4242" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 12px', color: '#fff', fontSize: '0.86rem', outline: 'none', letterSpacing: '0.1em' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Expiry (MM/YY)</label>
                                    <input type="text" placeholder="12/28" value={cardExp} onChange={e => setCardExp(e.target.value)} required style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 12px', color: '#fff', fontSize: '0.86rem', outline: 'none' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>CVC</label>
                                    <input type="password" placeholder="•••" maxLength={4} value={cardCvc} onChange={e => setCardCvc(e.target.value)} required style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 12px', color: '#fff', fontSize: '0.86rem', outline: 'none' }} />
                                </div>
                            </div>
                        </div>

                        <div>
                            {depositSuccess && (
                                <div style={{ color: 'var(--color-green)', fontSize: '0.86rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle2 size={16} /> Capital deposited & portfolio updated successfully!
                                </div>
                            )}
                            <button type="submit" className="btn btn-gold" disabled={isDepositing} style={{ width: '100%', padding: '14px', fontSize: '0.95rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                {isDepositing ? <span className="auth-spinner" style={{ width: '18px', height: '18px' }} /> : 'Confirm & Deposit Capital'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Side: Account Balance Summary & Banking Security */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="widget glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Active Capital</span>
                        <h2 className="glow-text-gold" style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>
                            ${userData.investmentAmount.toLocaleString()}
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-green)', fontSize: '0.8rem' }}>
                            <ArrowUpRight size={16} /> Fully Allocated Across Active Holdings
                        </div>
                    </div>

                    <div className="widget glass-card" style={{ padding: '20px', border: '1px solid rgba(0,230,118,0.2)', background: 'rgba(0,230,118,0.02)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-green)' }}>
                            <ShieldCheck size={20} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Institutional Banking Protection</span>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                            All cash deposits are swept into FDIC-insured partner banks protected up to $250,000 per depositor. Brokerage assets are secured via Apex Clearing Corp (SIPC member).
                        </p>
                    </div>

                    {/* Summary Quick Stats */}
                    <div className="widget glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Capital Deposited:</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>${(totalDeposited || userData.investmentAmount).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Yield & Dividend Credits:</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-green)' }}>+${(totalCreditedYield || 1770.50).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Full Transaction & Earnings Ledger */}
            <div className="widget glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px', border: '1px solid rgba(0,230,118,0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <History size={18} style={{ color: 'var(--color-green)' }} /> Complete Transaction & Earnings Ledger
                        </h3>
                        <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                            Audit trail of all capital deposits, yield credits, and withdrawal transactions.
                        </p>
                    </div>

                    {/* Category Filter Tabs */}
                    <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        {[
                            { id: 'all', label: 'All' },
                            { id: 'deposit', label: 'Deposits' },
                            { id: 'credit', label: 'Yield Credits' },
                            { id: 'withdrawal', label: 'Withdrawals' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setFilterType(tab.id as any)}
                                style={{
                                    background: filterType === tab.id ? 'rgba(0,230,118,0.12)' : 'transparent',
                                    border: filterType === tab.id ? '1px solid var(--color-green)' : '1px solid transparent',
                                    color: filterType === tab.id ? 'var(--color-green)' : 'var(--text-secondary)',
                                    padding: '5px 12px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div style={{ position: 'relative', width: '220px' }}>
                        <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search by ID or tier..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '7px 12px 7px 30px', color: '#fff', fontSize: '0.78rem', outline: 'none' }}
                        />
                    </div>
                </div>

                {/* Ledger Table */}
                {filteredTransactions.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '0.85rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                        No transaction records match your filter.
                    </div>
                ) : (
                    <div className="holdings-table-wrapper" style={{ overflowX: 'auto' }}>
                        <table className="holdings-table" style={{ fontSize: '0.82rem' }}>
                            <thead>
                                <tr>
                                    <th>Txn ID</th>
                                    <th>Category</th>
                                    <th>Date & Time</th>
                                    <th>Strategy</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Receipt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map(txn => {
                                    const isCredit = txn.type === 'credit';
                                    const isDeposit = (txn.type || 'deposit') === 'deposit';
                                    return (
                                        <tr key={txn.id}>
                                            <td style={{ fontFamily: 'monospace', color: 'var(--color-gold)' }}>{txn.id}</td>
                                            <td>{isCredit ? 'Yield' : isDeposit ? 'Deposit' : 'Withdrawal'}</td>
                                            <td>{new Date(txn.date).toLocaleDateString()}</td>
                                            <td>{txn.tier}</td>
                                            <td style={{ color: 'var(--color-green)', fontWeight: 700 }}>+${txn.amount.toLocaleString()}</td>
                                            <td>{txn.status}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button onClick={() => setSelectedReceipt(txn)} style={{ background: 'none', border: '1px solid var(--color-green)', color: 'var(--color-green)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}>View</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Official Printable Receipt Modal */}
            {selectedReceipt && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(2, 8, 4, 0.8)', backdropFilter: 'blur(10px)',
                    padding: '20px'
                }}>
                    <div className="glass-card" style={{
                        maxWidth: '480px', width: '100%', padding: '28px',
                        position: 'relative', border: '1px solid rgba(0, 230, 118, 0.25)',
                        background: 'rgba(6, 18, 10, 0.95)', boxShadow: '0 0 50px rgba(0, 230, 118, 0.15)'
                    }}>
                        <button onClick={() => setSelectedReceipt(null)} style={{
                            position: 'absolute', top: '16px', right: '16px',
                            background: 'transparent', border: 'none', color: '#62777d',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <X size={20} />
                        </button>
                        
                        <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}>
                            <span style={{ fontSize: '0.76rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Official Transaction Voucher</span>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: '4px 0 0' }}>AI Capital Investment</h3>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>SEC Registered Adviser • FDIC Swept Bank Partner</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Receipt Reference ID:</span>
                                <span style={{ fontFamily: 'monospace', color: 'var(--color-gold)', fontWeight: 700 }}>{selectedReceipt.id}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Account Email:</span>
                                <span style={{ color: '#fff', fontWeight: 600 }}>{selectedReceipt.email}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Transaction Type:</span>
                                <span style={{ color: 'var(--color-green)', fontWeight: 700, textTransform: 'capitalize' }}>{selectedReceipt.type || 'deposit'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Strategy Vault / Description:</span>
                                <span style={{ color: '#fff', fontWeight: 600 }}>{selectedReceipt.tier}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#fff' }}>{selectedReceipt.paymentMethod}</span>
                            </div>
                            <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 700 }}>Total Transaction Amount</span>
                                <span style={{ fontSize: '1.3rem', color: 'var(--color-green)', fontWeight: 800 }}>+${(selectedReceipt.amount || 0).toLocaleString()}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="btn btn-gold"
                                style={{ flex: 1, fontSize: '0.8rem', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                            >
                                <Download size={14} /> Print / Save PDF
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedReceipt(null)}
                                className="btn btn-green-outline"
                                style={{ flex: 1, fontSize: '0.8rem', padding: '10px' }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const CuteRobot = ({ isTyping }: { isTyping: boolean }) => {
    return (
        <div style={{ position: 'relative', width: '180px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <style>{`
                @keyframes blink {
                    0%, 90%, 100% { transform: scaleY(1); }
                    95% { transform: scaleY(0.1); }
                }
                @keyframes wave {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(-20deg); }
                }
                @keyframes head-bob {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes eye-talk {
                    0%, 100% { filter: drop-shadow(0 0 2px #00e676); }
                    50% { filter: drop-shadow(0 0 8px #00e676); transform: scale(1.15); }
                }
                .robot-head-group {
                    animation: head-bob 3.2s infinite ease-in-out;
                    transform-origin: 50px 62px;
                }
                .robot-eye {
                    transform-origin: center;
                    animation: blink 4s infinite;
                }
                .robot-eye-talk {
                    transform-origin: center;
                    animation: eye-talk 0.2s infinite ease-in-out;
                }
                .robot-arm-left-group {
                    transform-origin: 28px 74px;
                    animation: wave 2s infinite ease-in-out;
                }
            `}</style>
            <svg width="100%" height="100%" viewBox="0 0 100 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                <defs>
                    {/* Glossy 3D Metallic White Gradient */}
                    <linearGradient id="glossy-white" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="35%" stopColor="#f1f5f9" />
                        <stop offset="70%" stopColor="#cbd5e1" />
                        <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    {/* Rose Gold/Gold Accent Gradient */}
                    <linearGradient id="gold-accent" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ffe082" />
                        <stop offset="50%" stopColor="#ffb300" />
                        <stop offset="100%" stopColor="#ff8f00" />
                    </linearGradient>
                    {/* Joint Core Dark */}
                    <linearGradient id="core-dark" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#475569" />
                        <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    {/* Dark Visor */}
                    <linearGradient id="visor-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    {/* Drop Shadow */}
                    <filter id="shadow-filter" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#061208" floodOpacity="0.25" />
                    </filter>
                </defs>

                {/* Left Leg (Straight down, fully visible) */}
                <g filter="url(#shadow-filter)">
                    {/* Joint */}
                    <circle cx="38" cy="120" r="5.5" fill="url(#core-dark)" />
                    {/* Thigh */}
                    <rect x="33" y="120" width="10" height="36" rx="5" fill="url(#glossy-white)" />
                    <rect x="33" y="132" width="10" height="4" fill="url(#gold-accent)" />
                    {/* Knee */}
                    <circle cx="38" cy="156" r="4.5" fill="url(#core-dark)" />
                    {/* Calf */}
                    <rect x="33" y="156" width="10" height="36" rx="5" fill="url(#glossy-white)" />
                    {/* Foot */}
                    <ellipse cx="38" cy="192" rx="7.5" ry="3.5" fill="url(#core-dark)" />
                    <path d="M30 192 C30 188, 46 188, 46 192 C46 195, 30 195, 30 192 Z" fill="url(#glossy-white)" stroke="#cbd5e1" strokeWidth="0.5" />
                </g>

                {/* Right Leg (Straight down, parallel) */}
                <g filter="url(#shadow-filter)">
                    {/* Joint */}
                    <circle cx="62" cy="120" r="5.5" fill="url(#core-dark)" />
                    {/* Thigh */}
                    <rect x="57" y="120" width="10" height="36" rx="5" fill="url(#glossy-white)" />
                    <rect x="57" y="132" width="10" height="4" fill="url(#gold-accent)" />
                    {/* Knee */}
                    <circle cx="62" cy="156" r="4.5" fill="url(#core-dark)" />
                    {/* Calf */}
                    <rect x="57" y="156" width="10" height="36" rx="5" fill="url(#glossy-white)" />
                    {/* Foot */}
                    <ellipse cx="62" cy="192" rx="7.5" ry="3.5" fill="url(#core-dark)" />
                    <path d="M54 192 C54 188, 70 188, 70 192 C70 195, 54 195, 54 192 Z" fill="url(#glossy-white)" stroke="#cbd5e1" strokeWidth="0.5" />
                </g>

                {/* Torso / Body */}
                <rect x="28" y="70" width="44" height="54" rx="22" fill="url(#glossy-white)" stroke="#cbd5e1" strokeWidth="1" filter="url(#shadow-filter)" />
                {/* Chest Indicator */}
                <rect x="36" y="82" width="28" height="16" rx="4" fill="url(#visor-grad)" stroke="url(#gold-accent)" strokeWidth="1" />
                <circle cx="50" cy="90" r="3" fill="#00e676" style={{ filter: 'drop-shadow(0 0 3px #00e676)' }} />
                {/* Gold collar accent */}
                <path d="M35 70 C35 76, 65 76, 65 70" stroke="url(#gold-accent)" strokeWidth="2.5" fill="none" />

                {/* Leaning Right Arm (Resting Elbow) */}
                <g filter="url(#shadow-filter)">
                    {/* Shoulder */}
                    <circle cx="72" cy="74" r="5" fill="url(#gold-accent)" />
                    {/* Upper Arm */}
                    <rect x="67" y="74" width="10" height="22" rx="5" fill="url(#glossy-white)" transform="rotate(-45 72 74)" />
                    {/* Elbow */}
                    <circle cx="87" cy="90" r="4.5" fill="url(#core-dark)" />
                    {/* Forearm */}
                    <rect x="82" y="90" width="22" height="10" rx="5" fill="url(#glossy-white)" transform="rotate(-15 87 90)" />
                    {/* Hand */}
                    <circle cx="104" cy="85" r="4.5" fill="url(#gold-accent)" />
                </g>

                {/* Left Arm Waving Raised */}
                <g className="robot-arm-left-group" filter="url(#shadow-filter)">
                    {/* Shoulder */}
                    <circle cx="28" cy="74" r="5" fill="url(#gold-accent)" />
                    {/* Upper Arm */}
                    <rect x="23" y="56" width="10" height="20" rx="5" fill="url(#glossy-white)" transform="rotate(-30 28 74)" />
                    {/* Elbow */}
                    <circle cx="16" cy="52" r="4.5" fill="url(#core-dark)" />
                    {/* Forearm */}
                    <rect x="11" y="32" width="10" height="22" rx="5" fill="url(#glossy-white)" transform="rotate(-60 16 52)" />
                    {/* Hand */}
                    <circle cx="4" cy="22" r="4.5" fill="url(#gold-accent)" />
                </g>

                {/* Head Group (Bobbing) */}
                <g className="robot-head-group" filter="url(#shadow-filter)">
                    {/* Neck */}
                    <rect x="46" y="60" width="10" height="12" rx="2" fill="url(#core-dark)" />

                    {/* Headphones/Ears left/right */}
                    <rect x="20" y="28" width="8" height="24" rx="4" fill="url(#gold-accent)" />
                    <rect x="72" y="28" width="8" height="24" rx="4" fill="url(#gold-accent)" />

                    {/* Head Shell */}
                    <ellipse cx="50" cy="40" rx="24" ry="20" fill="url(#glossy-white)" stroke="#cbd5e1" strokeWidth="1" />
                    <ellipse cx="50" cy="27" rx="14" ry="5" fill="#ffffff" opacity="0.4" />

                    {/* Antennae */}
                    <line x1="36" y1="21" x2="30" y2="10" stroke="url(#gold-accent)" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="30" cy="10" r="3" fill="url(#gold-accent)" />
                    <line x1="64" y1="21" x2="70" y2="10" stroke="url(#gold-accent)" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="70" cy="10" r="3" fill="url(#gold-accent)" />

                    {/* Dark Visor */}
                    <rect x="31" y="31" width="38" height="17" rx="8.5" fill="url(#visor-grad)" stroke="#475569" strokeWidth="1.2" />

                    {/* Glowing Eyes */}
                    {isTyping ? (
                        <>
                            <ellipse cx="42" cy="40" rx="4.5" ry="4.5" fill="#00e676" className="robot-eye-talk" />
                            <ellipse cx="58" cy="40" rx="4.5" ry="4.5" fill="#00e676" className="robot-eye-talk" />
                        </>
                    ) : (
                        <>
                            <ellipse cx="42" cy="40" rx="4.5" ry="4.5" fill="#00e676" className="robot-eye" style={{ transformOrigin: '42px 40px' }} />
                            <ellipse cx="58" cy="40" rx="4.5" ry="4.5" fill="#00e676" className="robot-eye" style={{ transformOrigin: '58px 40px' }} />
                        </>
                    )}
                </g>
            </svg>
        </div>
    );
};

const AIChatbotSection = ({ 
    userData, 
    executingProposal, 
    proposalSuccess, 
    handleExecuteProposal 
}: { 
    userData: UserData; 
    executingProposal: boolean; 
    proposalSuccess: boolean; 
    handleExecuteProposal: () => void; 
}) => {
    const [subTab, setSubTab] = useState<'ai' | 'advisor'>('ai');
    const [messages, setMessages] = useState([
        { sender: 'ai', text: `Hello ${userData.name.split(" ")[0]}, I am your AI Capital Advisor. I actively monitor market yields and adjust your portfolio reallocations. How can I assist you today?` },
        { sender: 'ai', text: `Based on your profile, you are currently on a ${userData.riskTolerance} allocation trajectory with a primary goal of ${userData.goal} Planning.` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const [advisorMessages, setAdvisorMessages] = useState<any[]>([]);
    const [advisorInput, setAdvisorInput] = useState('');

    const fetchAdvisorMessages = async () => {
        try {
            const res = await fetch(`/api/chat/history?user1=${userData.email}&user2=johndoe@gmail.com`);
            if (res.ok) {
                const data = await res.json();
                setAdvisorMessages(data);
            }
        } catch (e) {
            console.error("Error fetching advisor messages:", e);
        }
    };

    useEffect(() => {
        if (subTab === 'advisor') {
            fetchAdvisorMessages();
            const interval = setInterval(fetchAdvisorMessages, 3000);
            return () => clearInterval(interval);
        }
    }, [subTab]);

    const handleSendToAdvisor = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!advisorInput.trim()) return;
        const text = advisorInput.trim();
        setAdvisorInput('');
        try {
            const res = await fetch('/api/chat/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sender: userData.email,
                    receiver: 'johndoe@gmail.com',
                    text
                })
            });
            if (res.ok) {
                fetchAdvisorMessages();
            }
        } catch (err) {
            console.error("Error sending message to advisor:", err);
        }
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            let reply = '';
            const query = userMsg.toLowerCase();

            if (query.includes('risk') || query.includes('tolerance') || query.includes('profile')) {
                reply = `Under your current ${userData.riskTolerance} risk profile, we allocate assets to optimize annual yields while keeping volatility around ${userData.riskTolerance === 'Conservative' ? '3%' : userData.riskTolerance === 'Balanced' ? '8%' : '16%'}. You can adjust these tolerances in the Settings tab.`;
            } else if (query.includes('crypto') || query.includes('btc') || query.includes('bitcoin') || query.includes('eth')) {
                reply = `For digital assets, your profile target allocation is ${userData.riskTolerance === 'Conservative' ? '10%' : userData.riskTolerance === 'Balanced' ? '5% (BTC/ETH)' : '20% (Emerging Tech)'}. These are volatility-weighted to prevent drawdown cycles.`;
            } else if (query.includes('fee') || query.includes('fees') || query.includes('withdraw')) {
                reply = `AI Capital Investment has a 0.25% annual management fee. Withdrawals are processed within 1-2 business days to your funded account.`;
            } else if (query.includes('hello') || query.includes('hi')) {
                reply = `Hello! How can I assist you with your asset rebalancing or yield projections today?`;
            } else {
                reply = `I have logged your query. Our algorithmic index engines indicate optimal rebalancing efficiency is active. Let me know if you would like me to detail specific allocations for cash, bonds, or equities.`;
            }

            setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
        }, 1000);
    };

    return (
        <div className="dash-advisory-container">
            <div style={{ width: '180px', flexShrink: 0, marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                {subTab === 'ai' ? (
                    <CuteRobot isTyping={isTyping} />
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', width: '100%' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-gold)', color: '#03080a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', boxShadow: '0 0 15px rgba(212,175,55,0.3)' }}>
                            JD
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h6 style={{ color: '#fff', fontSize: '0.85rem', margin: '0 0 2px 0', fontWeight: 700 }}>John Doe</h6>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: 0 }}>Senior Wealth Manager</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="widget glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '540px', padding: '24px', border: '1px solid rgba(0, 230, 118, 0.2)' }}>
                {/* Header with Sub-Tabs */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={() => setSubTab('ai')}
                            style={{
                                padding: '6px 12px', fontSize: '0.78rem', borderRadius: '4px',
                                border: '1px solid ' + (subTab === 'ai' ? 'var(--color-green)' : 'rgba(255,255,255,0.08)'),
                                background: subTab === 'ai' ? 'rgba(0, 230, 118, 0.08)' : 'transparent',
                                color: subTab === 'ai' ? 'var(--color-green)' : 'var(--text-secondary)',
                                cursor: 'pointer', fontWeight: 600
                            }}
                        >
                            🤖 AI Advisor Bot
                        </button>
                        <button
                            type="button"
                            onClick={() => setSubTab('advisor')}
                            style={{
                                padding: '6px 12px', fontSize: '0.78rem', borderRadius: '4px',
                                border: '1px solid ' + (subTab === 'advisor' ? 'var(--color-gold)' : 'rgba(255,255,255,0.08)'),
                                background: subTab === 'advisor' ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                                color: subTab === 'advisor' ? 'var(--color-gold)' : 'var(--text-secondary)',
                                cursor: 'pointer', fontWeight: 600
                            }}
                        >
                            🔒 Secure Advisor Chat
                        </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-green)', boxShadow: '0 0 6px var(--color-green)' }} />
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Online</span>
                    </div>
                </div>

                {subTab === 'ai' ? (
                    <>
                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px 0', paddingRight: '8px' }}>
                            {userData.activeProposal && (
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(0,230,118,0.08) 100%)',
                                    border: '1.2px solid var(--color-gold)',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    marginBottom: '10px',
                                    boxShadow: '0 0 20px rgba(212,175,55,0.1)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Pending Rebalancing Proposal
                                        </span>
                                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                            Deployed by Senior Advisor
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 12px' }}>
                                        "{userData.activeProposal.text}"
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Equities</div>
                                            <div style={{ fontSize: '0.84rem', color: '#fff', fontWeight: 700 }}>{userData.activeProposal.equities}%</div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Bonds</div>
                                            <div style={{ fontSize: '0.84rem', color: '#fff', fontWeight: 700 }}>{userData.activeProposal.bonds}%</div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cash</div>
                                            <div style={{ fontSize: '0.84rem', color: '#fff', fontWeight: 700 }}>{userData.activeProposal.cash}%</div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Gold</div>
                                            <div style={{ fontSize: '0.84rem', color: '#fff', fontWeight: 700 }}>{userData.activeProposal.gold}%</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            {proposalSuccess && (
                                                <span style={{ color: 'var(--color-green)', fontSize: '0.84rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <CheckCircle2 size={16} /> Rebalanced successfully!
                                                </span>
                                            )}
                                        </div>
                                        <button 
                                            type="button" 
                                            className="btn btn-gold" 
                                            onClick={handleExecuteProposal} 
                                            disabled={executingProposal} 
                                            style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                                        >
                                            {executingProposal ? (
                                                <span className="auth-spinner" style={{ width: '12px', height: '12px' }} />
                                            ) : (
                                                'Approve & Execute Reallocation'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {messages.map((m, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                                    <div style={{
                                        maxWidth: '75%', padding: '12px 16px', borderRadius: '12px',
                                        fontSize: '0.86rem', lineHeight: '1.45',
                                        background: m.sender === 'user' ? 'rgba(0, 230, 118, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                                        border: m.sender === 'user' ? '1px solid rgba(0, 230, 118, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)',
                                        color: m.sender === 'user' ? '#fff' : '#a1b3b8',
                                        borderBottomRightRadius: m.sender === 'user' ? '2px' : '12px',
                                        borderBottomLeftRadius: m.sender === 'user' ? '12px' : '2px',
                                        textAlign: 'left'
                                    }}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <div style={{ padding: '10px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                        <span className="auth-spinner" style={{ width: '12px', height: '12px', border: '1.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask about your risk tolerance, rebalancing, crypto, or fees..."
                                style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                            />
                            <button type="submit" className="btn btn-green" style={{ padding: '0 20px', fontSize: '0.84rem' }}>
                                Send
                            </button>
                        </form>
                    </>
                ) : (
                    /* Advisor Secure Chat Tab */
                    <>
                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px 0', paddingRight: '8px' }}>
                            {advisorMessages.length === 0 ? (
                                <div style={{ alignSelf: 'center', margin: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                                    No advisor messages yet. Send a secure inquiry to initiate correspondence.
                                </div>
                            ) : (
                                advisorMessages.map((m, i) => {
                                    const isMe = m.sender === userData.email;
                                    return (
                                        <div key={i} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                                            <div style={{
                                                maxWidth: '75%', padding: '12px 16px', borderRadius: '12px',
                                                fontSize: '0.86rem', lineHeight: '1.45',
                                                background: isMe ? 'rgba(212, 175, 55, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                                                border: isMe ? '1px solid rgba(212, 175, 55, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)',
                                                color: '#fff',
                                                borderBottomRightRadius: isMe ? '2px' : '12px',
                                                borderBottomLeftRadius: isMe ? '12px' : '2px',
                                                textAlign: 'left'
                                            }}>
                                                <div style={{ fontSize: '0.64rem', color: isMe ? 'var(--color-gold)' : 'var(--color-green)', fontWeight: 600, marginBottom: '2px' }}>
                                                    {isMe ? 'You' : 'John Doe (Advisor)'}
                                                </div>
                                                {m.text}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <form onSubmit={handleSendToAdvisor} style={{ display: 'flex', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                            <input
                                type="text"
                                value={advisorInput}
                                onChange={e => setAdvisorInput(e.target.value)}
                                placeholder="Type secure message to John Doe..."
                                style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                            />
                            <button type="submit" className="btn btn-gold" style={{ padding: '0 20px', fontSize: '0.84rem' }}>
                                Send
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
