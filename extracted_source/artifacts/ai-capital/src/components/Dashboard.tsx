import { useState, useEffect } from 'react';
import {
    LayoutDashboard, Wallet, Sparkles, BarChart3, Settings, LogOut,
    ArrowUpRight, Lightbulb, CheckCircle2
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
}

interface DashboardProps {
    userData: UserData;
    onLogout: () => void;
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

const Dashboard = ({ userData, onLogout }: DashboardProps) => {
    const [sliderAmount, setSliderAmount] = useState(userData.investmentAmount || 10000);
    const [sliderYears, setSliderYears] = useState(10);
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
            const aiNoise = currentAiVal * (Math.random() - 0.48) * config.volatility * 0.6;
            const tradNoise = currentTradVal * (Math.random() - 0.5) * config.volatility;
            aiValues.push(Math.round(currentAiVal + aiNoise));
            tradValues.push(Math.round(currentTradVal + tradNoise));
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

    const currentConfig = assetDataConfig[riskTolerance];
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

    const showStats     = selectedTab === 'home';
    const showSimulator = selectedTab === 'home';
    const showHoldings  = selectedTab === 'home' || selectedTab === 'portfolio';
    const showAI        = selectedTab === 'home' || selectedTab === 'advisory';

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
                            { id: 'advisory', icon: <Sparkles size={20} />, label: 'AI Advisory' },
                            { id: 'analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
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
                                                    <th>Allocation</th>
                                                    <th>Balance</th>
                                                    <th>Day Return</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentConfig.allocation.map((percent, index) => {
                                                    const assetValue = finalAiVal * (percent / 100);
                                                    const dayReturn = (Math.sin(index + 3) * 1.5 + 0.2).toFixed(2);
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
                                                            <td><span className="alloc-badge">{percent}%</span></td>
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
                        </div>

                        <div className="dash-right-col">
                            {selectedTab === 'home' && (
                                <div className="widget">
                                    <div className="widget-title">Allocation Breakdown</div>
                                    <div className="doughnut-chart-container">
                                        <Doughnut data={doughnutData} options={doughnutOptions} />
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
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
