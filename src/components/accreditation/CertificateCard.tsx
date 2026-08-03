import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { ExternalLink, Calendar, MapPin, Clock, CheckCircle2, ZoomIn } from "lucide-react";
import { Certificate } from "@/lib/accreditationData";

interface CertificateCardProps {
  certificate: Certificate;
  accent: string;
  onView: (cert: Certificate) => void;
}

export default function CertificateCard({ certificate, accent, onView }: CertificateCardProps) {
  const isGold = accent === "gold" || accent === "#d4af37";
  const accentColor = isGold ? "#d4af37" : "#00e676";
  const isPass = certificate.remarks === "PASS" || certificate.status.includes("Verified");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group cert-frame relative"
    >
      {/* Double border frame */}
      <div
        className="relative rounded-2xl p-[2px]"
        style={{ background: `linear-gradient(135deg, ${accentColor}, transparent 60%)` }}
      >
        <div className="relative rounded-2xl glass-vault overflow-hidden">
          {/* Scan sweep on hover */}
          <div className="cert-scan" />

          {/* Certificate image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[#030a04]">
            <Image
              src={certificate.image || certificate.imageUrl}
              alt={`${certificate.title} - ${certificate.subtitle}`}
              fittingType="fit"
              className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            {/* Holographic overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `linear-gradient(120deg, transparent 30%, ${isGold ? "rgba(212,175,55,0.08)" : "rgba(0,230,118,0.08)"} 50%, transparent 70%)`,
              }}
            />
            {/* Zoom hint */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(2,6,4,0.8)] backdrop-blur-sm border border-[#d4af37]/20 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>Inspect</span>
            </div>
            {/* Status badge */}
            <div
              className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(2,6,4,0.8)] backdrop-blur-sm border text-xs font-semibold"
              style={{ borderColor: isPass ? "#00e676" : "#d4af37" }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: isPass ? "#00e676" : "#d4af37" }} />
              <span style={{ color: isPass ? "#00e676" : "#d4af37" }}>{certificate.remarks}</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: accentColor }}>
              {certificate.type}
            </p>
            <h4 className="text-xl font-bold text-white leading-tight">{certificate.title}</h4>
            <p className="text-sm text-[#cbd5e1] mt-1 leading-snug">{certificate.subtitle}</p>

            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                <Calendar className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                <span className="mono">{certificate.testDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                <MapPin className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                <span>{certificate.testCentre}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                <Clock className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                <span>Valid Till: <span className="mono text-[#cbd5e1]">{certificate.validTill}</span></span>
              </div>
              {certificate.marks !== "—" && (
                <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                  <span>Marks Scored: <span className="mono text-[#cbd5e1]">{certificate.marks}</span></span>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => onView(certificate)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${isGold ? "#b28d17" : "#00b85f"})`,
                  color: "#030808",
                }}
              >
                View Certificate
              </button>
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 rounded-lg text-sm font-medium border border-[#d4af37]/30 text-[#cbd5e1] hover:bg-[rgba(6,18,10,0.5)] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
