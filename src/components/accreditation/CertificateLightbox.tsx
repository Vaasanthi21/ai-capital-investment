import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/components/ui/image";
import { X, ExternalLink, ShieldCheck, Fingerprint } from "lucide-react";
import { Certificate } from "@/lib/accreditationData";

interface CertificateLightboxProps {
  certificate: Certificate | null;
  accent: string;
  onClose: () => void;
}

export default function CertificateLightbox({ certificate, accent, onClose }: CertificateLightboxProps) {
  useEffect(() => {
    if (!certificate) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [certificate, onClose]);

  if (!certificate) return null;
  const isGold = accent === "gold" || accent === "#d4af37";
  const accentColor = isGold ? "#d4af37" : "#00e676";

  const detailRows = [
    { label: "Test Date", value: certificate.testDate },
    { label: "Test Centre", value: certificate.testCentre },
    { label: "Language", value: certificate.language },
    { label: "Marks", value: certificate.marks },
    { label: "Remarks", value: certificate.remarks },
    { label: "Date of Issue", value: certificate.issueDate },
    { label: "Place", value: certificate.place },
    { label: "Valid Till", value: certificate.validTill },
    { label: "PAN Number", value: certificate.pan },
    { label: "Registration Number", value: certificate.registration },
    { label: "Enrolment Number", value: certificate.enrolment },
    certificate.certificationNo ? { label: "Certification No.", value: certificate.certificationNo } : null,
    certificate.cpeCode ? { label: "CPE Code", value: certificate.cpeCode } : null,
    certificate.modeOfDelivery ? { label: "Mode of Delivery", value: certificate.modeOfDelivery } : null,
    { label: "Registrar", value: `${certificate.registrar}, ${certificate.registrarTitle}` },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        style={{ background: "rgba(3,10,4,0.92)", backdropFilter: "blur(20px)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full glass-vault flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
          style={{ border: `1px solid ${accentColor}40` }}
        >
          <div className="grid lg:grid-cols-5">
            {/* Certificate image — deep zoom area */}
            <div className="lg:col-span-3 relative bg-[#030a04] p-4 md:p-8 flex items-center justify-center">
              <div
                className="relative w-full rounded-xl overflow-hidden border-2"
                style={{ borderColor: `${accentColor}30` }}
              >
                <Image
                  src={certificate.image || certificate.imageUrl}
                  alt={`${certificate.title} - ${certificate.subtitle}`}
                  fittingType="fit"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Details panel */}
            <div className="lg:col-span-2 glass-vault p-6 md:p-8" style={{ borderLeft: `1px solid ${accentColor}20` }}>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5" style={{ color: accentColor }} />
                <span className="text-xs uppercase tracking-widest" style={{ color: accentColor }}>
                  Official NISM Credential
                </span>
              </div>

              <p className="text-sm text-[#94a3b8] mb-1">{certificate.type}</p>
              <h3 className="text-2xl font-bold text-white">{certificate.title}</h3>
              <p className="text-[#cbd5e1] mt-2">{certificate.subtitle}</p>

              {/* Verified badge */}
              <div
                className="mt-5 flex items-center gap-2 px-4 py-2.5 rounded-lg"
                style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
              >
                <Fingerprint className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-sm font-medium" style={{ color: accentColor }}>
                  Independently Verifiable Credential
                </span>
              </div>

              {/* Detail grid */}
              <div className="mt-6 space-y-1">
                {detailRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-start gap-4 py-2 border-b border-[#d4af37]/8"
                  >
                    <span className="text-xs uppercase tracking-wider text-[#94a3b8] shrink-0">
                      {row.label}
                    </span>
                    <span className="text-sm text-[#cbd5e1] mono text-right">{row.value}</span>
                  </div>
                ))}
              </div>

              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${isGold ? "#b28d17" : "#00b85f"})`,
                  color: "#030808",
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Verify on NISM Skills Registry
              </a>
              <p className="text-xs text-[#94a3b8] text-center mt-3 leading-relaxed">
                Every credential can be independently verified through the official NISM
                Skills Registry portal using the registration and enrolment numbers above.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
