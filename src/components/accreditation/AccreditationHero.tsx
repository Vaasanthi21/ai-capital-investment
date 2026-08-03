import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Lock } from "lucide-react";

const tickerItems = [
  "SEBI Certified Associated Persons",
  "NISM Accredited Professionals",
  "ISO-Grade Regulatory Compliance",
  "Verified via NISM Skills Registry",
  "SEBI Regulations 2007 Compliant",
];

export default function AccreditationHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden accred-bg px-6 py-32">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[rgba(0,140,55,0.18)] blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[rgba(155,115,15,0.22)] blur-[120px]" />
      {/* Golden thread */}
      <div className="golden-thread top-0 bottom-0 left-1/2" />

      {/* Trust badges row */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-6 mb-12"
      >
        {[
          { icon: ShieldCheck, label: "SEBI Regulated" },
          { icon: BadgeCheck, label: "NISM Certified" },
          { icon: Lock, label: "Independently Verified" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm tracking-widest uppercase text-[#cbd5e1]">
            <Icon className="w-4 h-4 text-[#00e676]" />
            <span>{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Central seal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative mb-12"
      >
        <div className="relative w-40 h-40 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border-2 border-[#d4af37]/40"
            style={{ animation: "seal-spin 30s linear infinite" }}
          />
          <div
            className="absolute inset-3 rounded-full border border-[#00e676]/30"
            style={{ animation: "seal-spin-rev 40s linear infinite" }}
          />
          <div className="absolute inset-6 rounded-full glass-vault gold-glow-box flex items-center justify-center">
            <ShieldCheck className="w-12 h-12 text-[#d4af37]" strokeWidth={1.2} />
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-center text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl"
      >
        <span className="gold-text">Validated</span>
        <span className="text-white"> by </span>
        <span className="text-[#00e676]">Giants</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-8 max-w-2xl text-center text-lg md:text-xl text-[#cbd5e1] leading-relaxed"
      >
        Every credential on this page is issued by the National Institute of Securities
        Markets and verified through the official NISM Skills Registry. Trust is not claimed —
        it is documented.
      </motion.p>

      {/* Live trust ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-[#d4af37]/15 py-4 bg-[rgba(2,6,4,0.6)] backdrop-blur-sm">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "ticker-scroll 25s linear infinite" }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-sm uppercase tracking-widest text-[#94a3b8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
