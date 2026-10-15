"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { CardLightReflection } from "@/components/ui/CardLightReflection";
import { X, Sparkles, ExternalLink } from "lucide-react";

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReplayIntro: () => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({
  isOpen,
  onClose,
  onReplayIntro,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 12;
    const rotY = (x / (rect.width / 2)) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-2xl w-full bg-[#0d120e] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Authorized Creative Credential</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Palak&apos;s Creative License #0001
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Hover to examine in 3D. Valid until it doesn&apos;t.
          </p>
        </div>

        {/* 3D Interactive Card Preview */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-lg transition-transform duration-150 ease-out select-none cursor-grab active:cursor-grabbing"
          style={{
            aspectRatio: "2273 / 1409",
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/creative-license.png"
            alt="Palak's Creative License"
            fill
            unoptimized
            className="object-contain drop-shadow-2xl pointer-events-none"
            priority
          />
          <CardLightReflection />
        </div>

        {/* Card Metadata Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-6 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Holder</span>
            <span className="font-semibold text-white mt-0.5 block">PALAK BHATT</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Status</span>
            <span className="font-semibold text-emerald-400 mt-0.5 block">Building AI & UI</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Motto</span>
            <span className="font-semibold text-white mt-0.5 block">Stay Humble</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Expiry</span>
            <span className="font-semibold text-white mt-0.5 block">Never</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={() => {
              onClose();
              onReplayIntro();
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition shadow-lg shadow-emerald-500/20"
          >
            Replay Intro Animation
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition border border-white/10"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
