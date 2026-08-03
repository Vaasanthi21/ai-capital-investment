import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Target, Eye, ShieldCheck } from "lucide-react";
import { Profile } from "@/lib/accreditationData";

const briefs: Record<string, { philosophy: string; approach: string[] }> = {
  Ankush: {
    philosophy:
      "Wealth creation is not a sprint — it is a disciplined pursuit of risk-adjusted returns. My approach blends fundamental equity research with portfolio-level risk management, ensuring that every rupee deployed has a documented thesis and a defined exit.",
    approach: [
      "Research-driven allocation across asset classes",
      "Continuous professional education to stay ahead of regulatory shifts",
      "Transparent, verifiable credentials — because clients deserve proof, not promises",
    ],
  },
  Anant: {
    philosophy:
      "Diversification across instruments — from mutual funds to commodity derivatives — is the bedrock of resilient portfolios. My role is to translate complex market dynamics into clear, actionable strategies that protect and grow capital over time.",
    approach: [
      "Multi-asset allocation spanning equities, debt, and commodities",
      "Ongoing certification to navigate evolving SEBI regulations",
      "Client-first advisory grounded in regulatory compliance and transparency",
    ],
  },
};

interface BriefSectionProps {
  profile: Profile;
}

export default function BriefSection({ profile }: BriefSectionProps) {
  const isGold = profile.accent === "gold";
  const accentColor = isGold ? "#d4af37" : "#00e676";
  const brief = briefs[profile.name.split(" ")[0]] || briefs.Ankush;

  return (
    <section className="relative px-6 py-24 accred-bg">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative max-w-xs mx-auto">
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl"
                style={{ background: isGold ? "rgba(212,175,55,0.15)" : "rgba(0,230,118,0.12)" }}
              />
              <div
                className="relative rounded-2xl overflow-hidden border-2"
                style={{ borderColor: `${accentColor}50` }}
              >
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fittingType="fill"
                  className="w-full aspect-square"
                />
              </div>
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full glass-vault whitespace-nowrap"
                style={{ boxShadow: `0 0 20px ${isGold ? "rgba(212,175,55,0.2)" : "rgba(0,230,118,0.2)"}` }}
              >
                <ShieldCheck className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">NISM Certified</span>
              </div>
            </div>
          </motion.div>

          {/* Brief content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37] mb-3">The Brief</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              {profile.name}
            </h2>

            <div className="flex items-start gap-3 mb-6">
              <Eye className="w-5 h-5 shrink-0 mt-1" style={{ color: accentColor }} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#94a3b8] mb-1">Philosophy</p>
                <p className="text-[#cbd5e1] leading-relaxed">{brief.philosophy}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-8">
              <Target className="w-5 h-5 shrink-0 mt-1" style={{ color: accentColor }} />
              <div className="flex-1">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">Approach</p>
                <ul className="space-y-2.5">
                  {brief.approach.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[#cbd5e1]">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Credential summary strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#d4af37]/10">
              {[
                { label: "Certificates", value: profile.certificates?.length || 0 },
                { label: "Years Certified", value: "3+" },
                { label: "Specializations", value: profile.specializations?.length || 0 },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold" style={{ color: accentColor }}>{stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-[#94a3b8] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
