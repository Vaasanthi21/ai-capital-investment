import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink, FileText } from "lucide-react";
import { Profile } from "@/lib/accreditationData";

interface LedgerRowProps {
  label: string;
  value: string;
  isLink?: boolean;
  url?: string;
}

function LedgerRow({ label, value, isLink, url }: LedgerRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between gap-4 py-3.5 px-4 rounded-lg hover:bg-[rgba(6,18,10,0.4)] transition-colors group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <FileText className="w-4 h-4 text-[#d4af37] shrink-0" />
        <span className="text-xs md:text-sm text-[#94a3b8] uppercase tracking-wider shrink-0 font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-xs md:text-sm text-[#cbd5e1] mono truncate">{value}</span>
        {isLink ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md border border-[#00e676]/40 hover:bg-[#00e676]/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#00e676]" />
          </a>
        ) : (
          <button
            onClick={handleCopy}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md border border-[#d4af37]/40 hover:bg-[#d4af37]/10 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00e676]" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface VerificationLedgerProps {
  profile: Profile;
}

export default function VerificationLedger({ profile }: VerificationLedgerProps) {
  const isGold = profile.accent === "gold";
  const accentColor = isGold ? "#d4af37" : "#00e676";

  return (
    <section className="relative px-6 py-24 accred-bg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37] mb-3">Verification Ledger</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            The <span className="green-text">Receipts</span>
          </h2>
          <p className="mt-4 text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
            Copy any reference number below and verify it directly on the official NISM Skills
            Registry. Transparency is the foundation of trust.
          </p>
        </motion.div>

        <div 
          className="glass-vault rounded-2xl p-6 md:p-8" 
          style={{ 
            boxShadow: `0 0 40px ${isGold ? "rgba(212,175,55,0.12)" : "rgba(0,230,118,0.12)"}`,
            borderColor: `${accentColor}35`
          }}
        >
          {/* Profile header */}
          <div className="flex items-center justify-between pb-6 mb-4 border-b" style={{ borderColor: `${accentColor}20` }}>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{profile.name}</h3>
              <p className="text-sm font-medium" style={{ color: accentColor }}>{profile.role}</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}40` }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: accentColor }}>Verified</span>
            </div>
          </div>

          {/* Identity records */}
          <div className="space-y-1">
            <LedgerRow label="PAN Number" value={profile.pan} />
            <LedgerRow label="Registration No." value={profile.registration} />
            <LedgerRow label="Enrolment No." value={profile.enrolment} />
          </div>

          {/* Per-certificate verification */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: `${accentColor}20` }}>
            <p className="text-xs uppercase tracking-widest text-[#94a3b8] mb-4 font-semibold">Individual Certificate References</p>
            <div className="space-y-6">
              {profile.certificates.map((cert) => (
                <div key={cert.id}>
                  <p className="text-base font-bold text-white mb-2">{cert.title}</p>
                  <div className="space-y-1 pl-4 border-l" style={{ borderColor: `${accentColor}25` }}>
                    {cert.certificationNo && <LedgerRow label="Certification No." value={cert.certificationNo} />}
                    {cert.cpeCode && <LedgerRow label="CPE Code" value={cert.cpeCode} />}
                    <LedgerRow label="Valid Till" value={cert.validTill} />
                    <LedgerRow label="Verify Online" value="NISM Skills Registry" isLink url={cert.verificationUrl} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
