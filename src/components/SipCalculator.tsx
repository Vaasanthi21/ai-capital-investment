import React, { useState } from 'react';
import { 
  Calculator, TrendingUp, IndianRupee, Calendar, Percent, 
  MessageCircle, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 
} from 'lucide-react';

interface SipCalculatorProps {
  language?: 'en' | 'hi';
  onConsult?: () => void;
}

export const SipCalculator: React.FC<SipCalculatorProps> = ({ 
  language = 'en',
  onConsult 
}) => {
  // Calculator inputs
  const [monthlyAmount, setMonthlyAmount] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [durationYears, setDurationYears] = useState<number>(15);
  const [stepUpEnabled, setStepUpEnabled] = useState<boolean>(false);
  const [stepUpRate, setStepUpRate] = useState<number>(10);

  // Calculation Logic
  // Standard SIP Formula: FV = P * [((1 + i)^n - 1) / i] * (1 + i)
  // where i = r / 12, n = years * 12
  const calculateSip = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = durationYears * 12;

    if (!stepUpEnabled) {
      const invested = monthlyAmount * totalMonths;
      const futureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      const returns = futureValue - invested;
      return {
        invested: Math.round(invested),
        futureValue: Math.round(futureValue),
        returns: Math.round(returns)
      };
    } else {
      // Step-up calculation: amount increases by stepUpRate% each year
      let totalInvested = 0;
      let totalValue = 0;
      let currentMonthly = monthlyAmount;

      for (let y = 1; y <= durationYears; y++) {
        for (let m = 1; m <= 12; m++) {
          totalInvested += currentMonthly;
          const remainingMonths = totalMonths - ((y - 1) * 12 + m) + 1;
          totalValue += currentMonthly * Math.pow(1 + monthlyRate, remainingMonths);
        }
        currentMonthly = Math.round(currentMonthly * (1 + stepUpRate / 100));
      }

      return {
        invested: Math.round(totalInvested),
        futureValue: Math.round(totalValue),
        returns: Math.round(totalValue - totalInvested)
      };
    }
  };

  const { invested, futureValue, returns } = calculateSip();

  // Format in Indian Lakh / Crore notation
  const formatInLakhs = (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const investedPercent = futureValue > 0 ? Math.round((invested / futureValue) * 100) : 50;
  const returnsPercent = 100 - investedPercent;

  // Prefilled WhatsApp message for lead enquiry
  const whatsappUrl = `https://wa.me/919810000000?text=${encodeURIComponent(
    `Hello Shubh Nivesh (Ankush Jain),\n\nI used the SIP Calculator on your website:\n• Monthly SIP: ₹${monthlyAmount.toLocaleString('en-IN')}\n• Assumed Return: ${expectedReturn}%\n• Period: ${durationYears} Years\n• Estimated Value: ${formatInLakhs(futureValue)} (Invested: ${formatInLakhs(invested)})\n\nI would like to discuss and start my goal-based SIP investment. Please guide me.`
  )}`;

  return (
    <div className="glass-card gold-border sip-calculator-card" style={{
      borderRadius: '24px',
      padding: '36px 32px',
      background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.08), rgba(6, 14, 8, 0.98))',
      border: '1px solid rgba(212, 175, 55, 0.35)',
      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.08)'
    }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '20px',
          background: 'rgba(212, 175, 55, 0.1)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          marginBottom: '12px'
        }}>
          <Calculator size={14} style={{ color: 'var(--color-gold)' }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            {language === 'en' ? 'Interactive Wealth Planning Tool' : 'इंटरएक्टिव वेल्थ प्लानिंग टूल'}
          </span>
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
          SIP CALCULATOR
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-gold)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
          PLAN YOUR INVESTMENTS. VISUALISE YOUR FUTURE.
        </p>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          {language === 'en'
            ? 'Estimate how regular monthly investments may grow over a selected period, based on an assumed rate of return.'
            : 'अनुमान लगाएं कि आपकी नियमित मासिक बचत एक निश्चित अवधि में अपेक्षित रिटर्न दर के आधार पर कितनी बढ़ सकती है।'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
        {/* Left Column: Sliders & Controls */}
        <div>
          {/* Preset Buttons for Quick Financial Goals */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Quick Goal Presets:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { label: 'Starter SIP (₹5,000)', amt: 5000, yrs: 10, ret: 12 },
                { label: 'Example (₹10,000 / 15Y)', amt: 10000, yrs: 15, ret: 12 },
                { label: "Child Education (₹15,000)", amt: 15000, yrs: 18, ret: 12 },
                { label: 'Retirement (₹25,000)', amt: 25000, yrs: 20, ret: 13 },
              ].map(preset => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setMonthlyAmount(preset.amt);
                    setDurationYears(preset.yrs);
                    setExpectedReturn(preset.ret);
                  }}
                  className="btn"
                  style={{
                    fontSize: '0.75rem',
                    padding: '5px 12px',
                    borderRadius: '14px',
                    background: monthlyAmount === preset.amt && durationYears === preset.yrs ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    border: monthlyAmount === preset.amt && durationYears === preset.yrs ? '1px solid var(--color-gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: monthlyAmount === preset.amt && durationYears === preset.yrs ? '#ffffff' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 1: Monthly Investment */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IndianRupee size={15} style={{ color: 'var(--color-gold)' }} />
                Monthly SIP Amount
              </span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-gold)', background: 'rgba(212, 175, 55, 0.1)', padding: '4px 12px', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                ₹{monthlyAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <input 
              type="range"
              min="500"
              max="150000"
              step="500"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>₹500 / mo</span>
              <span>₹50,000 / mo</span>
              <span>₹1.5 Lakh / mo</span>
            </div>
          </div>

          {/* Slider 2: Expected Return Rate */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Percent size={15} style={{ color: 'var(--color-green)' }} />
                Expected Annual Return (p.a.)
              </span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-green)', background: 'rgba(0, 230, 118, 0.1)', padding: '4px 12px', borderRadius: '8px', border: '1px solid rgba(0, 230, 118, 0.25)' }}>
                {expectedReturn}%
              </span>
            </div>
            <input 
              type="range"
              min="6"
              max="24"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-green)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>6% (Debt/Conservative)</span>
              <span>12% (Equity Benchmark)</span>
              <span>18%+ (Aggressive Alpha)</span>
            </div>
          </div>

          {/* Slider 3: Duration in Years */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={15} style={{ color: '#38bdf8' }} />
                Investment Period (Time Horizon)
              </span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 12px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                {durationYears} Years
              </span>
            </div>
            <input 
              type="range"
              min="1"
              max="35"
              step="1"
              value={durationYears}
              onChange={(e) => setDurationYears(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>1 Year</span>
              <span>15 Years</span>
              <span>35 Years (Long-Term Compounding)</span>
            </div>
          </div>

          {/* Step-Up SIP Option */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            padding: '12px 16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox"
                  checked={stepUpEnabled}
                  onChange={(e) => setStepUpEnabled(e.target.checked)}
                  style={{ accentColor: 'var(--color-gold)', width: '16px', height: '16px', cursor: 'pointer' }}
                />
                Include Annual Step-Up SIP (+{stepUpRate}% / Year)
              </label>
              {stepUpEnabled && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700 }}>
                  Active
                </span>
              )}
            </div>
            {stepUpEnabled && (
              <div style={{ marginTop: '10px' }}>
                <input 
                  type="range"
                  min="5"
                  max="25"
                  step="5"
                  value={stepUpRate}
                  onChange={(e) => setStepUpRate(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-gold)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  <span>+5% yearly</span>
                  <span>+{stepUpRate}% yearly</span>
                  <span>+25% yearly</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Breakdown & Illustrative Table */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '18px',
          padding: '28px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {/* Estimated Future Value Display */}
          <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Estimated Future Value
            </span>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #d4af37, #00e676)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginTop: '4px'
            }}>
              {formatInLakhs(futureValue)}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              (₹{futureValue.toLocaleString('en-IN')})
            </span>
          </div>

          {/* Visual Bar Comparison */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
              <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
                Invested: {formatInLakhs(invested)} ({investedPercent}%)
              </span>
              <span style={{ color: '#00e676', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00e676', display: 'inline-block' }} />
                Returns: {formatInLakhs(returns)} ({returnsPercent}%)
              </span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${investedPercent}%`, height: '100%', background: '#38bdf8', transition: 'width 0.4s ease' }} />
              <div style={{ width: `${returnsPercent}%`, height: '100%', background: 'linear-gradient(90deg, #00e676, #d4af37)', transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Illustrative Breakdown Table matching proposal */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: '24px',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '0.85rem'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Amount Invested</span>
              <strong style={{ color: '#ffffff' }}>₹{invested.toLocaleString('en-IN')}</strong>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '0.85rem'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>Estimated Wealth Gain (Returns)</span>
              <strong style={{ color: 'var(--color-green)' }}>Approx. {formatInLakhs(returns)}</strong>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 16px',
              fontSize: '0.85rem',
              background: 'rgba(212, 175, 55, 0.06)'
            }}>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Estimated Future Value</span>
              <strong style={{ color: 'var(--color-gold)' }}>Approx. {formatInLakhs(futureValue)}</strong>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{
                width: '100%',
                padding: '12px 20px',
                fontSize: '0.88rem',
                borderRadius: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(37, 211, 102, 0.25)'
              }}
            >
              <MessageCircle size={18} /> Discuss This SIP on WhatsApp
            </a>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={onConsult || (() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                })}
                className="btn btn-green-outline"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  fontSize: '0.82rem',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Book Consultation
              </button>
              <button
                type="button"
                onClick={onConsult || (() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                })}
                className="btn btn-gold"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  fontSize: '0.82rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Start a SIP <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px' }} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Illustrative Footnote / Compliance Note */}
      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
          * Example assumes contributions at the end of each month and a monthly rate derived from the assumed annual return. Figures are approximate; actual returns will vary depending on market movements. Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.
        </p>
      </div>
    </div>
  );
};

export default SipCalculator;
