import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Award, Fingerprint, BadgeCheck } from "lucide-react";
import { accreditationData } from "@/lib/accreditationData";

interface ProfileSwitcherProps {
  active: string;
  setActive: (key: string) => void;
}

export default function ProfileSwitcher({ active, setActive }: ProfileSwitcherProps) {
  const profiles = Object.entries(accreditationData);

  return (
    <section className="relative px-6 py-24 accred-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37] mb-3">The Dual Entity</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Accredited <span className="green-text">Professionals</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {profiles.map(([key, profile]) => {
            const isActive = active === key;
            const isGold = profile.accent === "gold";
            const borderClass = isGold ? "glass-vault" : "glass-vault-green";
            const glowClass = isGold ? "gold-glow-box" : "green-glow-box";
            const accentColor = isGold ? "#d4af37" : "#00e676";

            return (
              <motion.button
                key={key}
                onClick={() => setActive(key)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className={`relative ${borderClass} ${isActive ? glowClass : ""} rounded-2xl p-8 md:p-10 text-left transition-all duration-500 ${
                  isActive ? "ring-2" : ""
                }`}
                style={isActive ? { boxShadow: `0 0 32px ${isGold ? "rgba(212,175,55,0.35)" : "rgba(0,230,118,0.3)"}` } : {}}
              >
                {/* Scan line on active */}
                {isActive && (
                  <div
                    className={`scan-line ${isGold ? "scan-line-gold" : "scan-line-green"}`}
                  />
                )}

                <div className="flex items-start gap-6">
                  <div className="relative shrink-0">
                    <div
                      className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2"
                      style={{ borderColor: accentColor, boxShadow: `0 0 20px ${isGold ? "rgba(212,175,55,0.3)" : "rgba(0,230,118,0.25)"}` }}
                    >
                      <Image
                        src={profile.photo}
                        alt={profile.name}
                        fittingType="fill"
                        className="w-full h-full"
                      />
                    </div>
                    <div
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: accentColor }}
                    >
                      <BadgeCheck className="w-5 h-5 text-[#030808]" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Fingerprint className="w-4 h-4" style={{ color: accentColor }} />
                      <span className="text-xs uppercase tracking-widest text-[#94a3b8]">
                        NISM Verified Professional
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{profile.name}</h3>
                    <p className="text-sm mt-1" style={{ color: accentColor }}>{profile.role}</p>
                    <p className="text-[#cbd5e1] text-sm mt-3 leading-relaxed">{profile.tagline}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {profile.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="text-xs px-3 py-1 rounded-full border border-[#d4af37]/20 text-[#cbd5e1] bg-[rgba(6,18,10,0.5)]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Credential count */}
                <div className="mt-6 pt-6 border-t border-[#d4af37]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" style={{ color: accentColor }} />
                    <span className="text-[#94a3b8] text-sm">
                      {profile.certificates.length} Verified Certificates
                    </span>
                  </div>
                  <span
                    className="text-xs uppercase tracking-widest font-semibold"
                    style={{ color: isActive ? accentColor : "#94a3b8" }}
                  >
                    {isActive ? "● Viewing" : "View Profile →"}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
