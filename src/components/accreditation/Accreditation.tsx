import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { accreditationData } from "@/lib/accreditationData";
import AccreditationHero from "@/components/accreditation/AccreditationHero";
import ProfileSwitcher from "@/components/accreditation/ProfileSwitcher";
import CertificateCard from "@/components/accreditation/CertificateCard";
import CertificateLightbox from "@/components/accreditation/CertificateLightbox";
import VerificationLedger from "@/components/accreditation/VerificationLedger";
import BriefSection from "@/components/accreditation/BriefSection";
import { Quote } from "lucide-react";

export default function Accreditation() {
  const [active, setActive] = useState("Ankush");
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const profile = accreditationData[active];

  return (
    <div className="min-h-screen accred-bg">
      <AccreditationHero />

      <ProfileSwitcher active={active} setActive={setActive} />

      <BriefSection profile={profile} />

      {/* Certificate Gallery */}
      <section className="relative px-6 py-24 accred-bg">
        {/* Golden thread */}
        <div className="golden-thread top-0 bottom-0 left-1/2 hidden lg:block" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37] mb-3">The Glass Vault</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Certificate <span className="gold-text">Gallery</span>
            </h2>
            <p className="mt-4 text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
              Each credential is encased in a double-bordered light-box. Click to inspect the
              full-resolution scan with complete verification details.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {profile.certificates.map((cert) => (
                <CertificateCard
                  key={cert.id}
                  certificate={cert}
                  accent={profile.accent}
                  onView={setSelectedCert}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Trust statement */}
      <section className="px-6 py-24 accred-bg">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-10 h-10 text-[#d4af37] mx-auto mb-6" />
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-light text-white leading-relaxed tracking-tight"
          >
            "In the world of wealth management, trust is not a marketing claim — it is a{" "}
            <span className="green-text font-medium">documented credential</span>, verified by
            regulators and renewed through continuing education."
          </motion.blockquote>
          <p className="mt-6 text-sm uppercase tracking-widest text-[#94a3b8]">
            — {profile.name}, {profile.role}
          </p>
        </div>
      </section>

      <VerificationLedger profile={profile} />

      {/* Footer */}
      <footer className="px-6 py-16 border-t border-[#d4af37]/10 accred-bg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full glass-vault gold-glow-box flex items-center justify-center">
              <span className="gold-text font-bold text-sm">NiSM</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">National Institute of Securities Markets</p>
              <p className="text-xs text-[#94a3b8]">Established by the Securities and Exchange Board of India</p>
            </div>
          </div>
          <a
            href="https://certifications.nism.ac.in/nismskills"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#00e676] hover:underline"
          >
            Verify all credentials on NISM Skills Registry →
          </a>
        </div>
      </footer>

      <CertificateLightbox
        certificate={selectedCert}
        accent={profile.accent}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
}
