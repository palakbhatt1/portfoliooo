"use client";

import React, { useState } from "react";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductFooter } from "@/components/product/ProductFooter";
import { LicenseModal } from "@/components/home/LicenseModal";
import { Download, FileText } from "lucide-react";

type ResumeTab = "design-product" | "ai-ml";

interface ResumeConfig {
  id: ResumeTab;
  label: string;
  badge: string;
  filename: string;
  pdfUrl: string;
  size: string;
  description: string;
}

const RESUMES: Record<ResumeTab, ResumeConfig> = {
  "design-product": {
    id: "design-product",
    label: "DESIGN & PRODUCT",
    badge: "UI/UX & PRODUCT DESIGN",
    filename: "PalakBhatt_Resume_UI_UX.pdf",
    pdfUrl: "/resume/PalakBhatt_Resume_UI_UX.pdf",
    size: "82 KB",
    description: "Focusing on Product Design, UI/UX Architecture, Wireframing, User Research, and Design Systems.",
  },
  "ai-ml": {
    id: "ai-ml",
    label: "AI & ML",
    badge: "AI, ML & MULTIMODAL SYSTEMS",
    filename: "PalakBhatt_Resume_AI_ML.pdf",
    pdfUrl: "/resume/PalakBhatt_Resume_AI_ML.pdf",
    size: "84 KB",
    description: "Focusing on Multimodal NLP, QLoRA fine-tuning, AST code intelligence, Audio-Visual ML, and Agentic Systems.",
  },
};

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<ResumeTab>("design-product");
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  const activeResume = RESUMES[activeTab];

  return (
    <div className="relative min-h-screen w-full bg-[#92a878] font-space-mono text-neutral-900 overflow-x-hidden selection:bg-[#9ab787] selection:text-neutral-900">
      {/* 1. Fullscreen Pixel Art Scenery Background with 80% opacity over theme green */}
      <div
        className="fixed inset-0 z-0 bg-[#92a878] bg-cover bg-center pointer-events-none opacity-80"
        style={{
          backgroundImage: "url('/projects_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
        }}
      />

      {/* 2. Outer Layout Margin Wrapper */}
      <div className="relative z-10 min-h-screen px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 flex flex-col justify-between">
        
        {/* 3. Translucent White Main Card Container */}
        <div className="w-full max-w-4xl mx-auto bg-white/90 sm:bg-white/94 backdrop-blur-md rounded-[24px] sm:rounded-[32px] border border-white/70 shadow-2xl relative flex flex-col my-auto">
          
          {/* Top Global Navigation Bar */}
          <ProductHeader />

          {/* Delicate Hairline Separator */}
          <div className="w-full border-b border-neutral-200/80" />

          {/* Main Inner Content */}
          <main className="w-full max-w-4xl mx-auto px-6 sm:px-8 pt-5 sm:pt-6 pb-12 sm:pb-14 space-y-6">
            
            {/* Top Controls Bar: Standalone pill buttons (DESIGN & PRODUCT | AI & ML) matching projects screen + Download logo button */}
            <div className="flex items-center justify-between gap-3 text-xs font-mono pb-1">
              {/* Standalone rounded-full buttons like in screenshot */}
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveTab("design-product")}
                  className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    activeTab === "design-product"
                      ? "bg-neutral-900 text-white border border-neutral-900 shadow-xs font-bold"
                      : "bg-transparent hover:bg-neutral-900/5 text-neutral-700 hover:text-neutral-900 border border-neutral-300 hover:border-neutral-800"
                  }`}
                >
                  DESIGN &amp; PRODUCT
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("ai-ml")}
                  className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    activeTab === "ai-ml"
                      ? "bg-neutral-900 text-white border border-neutral-900 shadow-xs font-bold"
                      : "bg-transparent hover:bg-neutral-900/5 text-neutral-700 hover:text-neutral-900 border border-neutral-300 hover:border-neutral-800"
                  }`}
                >
                  AI &amp; ML
                </button>
              </div>

              {/* Download Option: Logo Only Button */}
              <div className="flex items-center">
                <a
                  href={activeResume.pdfUrl}
                  download={activeResume.filename}
                  title={`Download ${activeResume.label} PDF (${activeResume.size})`}
                  aria-label={`Download ${activeResume.label} PDF`}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white/90 hover:bg-neutral-900 text-neutral-700 hover:text-white flex items-center justify-center transition-all shadow-2xs group cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Embedded PDF Viewer Container */}
            <div className="w-full rounded-2xl overflow-hidden border border-neutral-300/90 shadow-lg bg-[#182317] flex flex-col ring-1 ring-black/10">
              {/* PDF Viewer Header Bar */}
              <div className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#182317] via-[#111810] to-[#0a0f09] text-white flex items-center justify-between border-b border-[#3b4c33]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#85c96a]" />
                  <span className="font-mono text-xs font-bold text-neutral-200 tracking-wide">
                    {activeResume.filename}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-neutral-400">
                    PDF Document &middot; {activeResume.size}
                  </span>
                </div>
              </div>

              {/* PDF Display Viewport */}
              <div className="w-full h-[650px] sm:h-[820px] md:h-[950px] bg-neutral-200 relative">
                <iframe
                  key={activeResume.pdfUrl}
                  src={`${activeResume.pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                  title={`${activeResume.label} Resume`}
                  className="w-full h-full border-0"
                />
              </div>
            </div>

            {/* Footer */}
            <ProductFooter />
          </main>
        </div>
      </div>

      {/* 3D License Modal */}
      <LicenseModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        onReplayIntro={() => {}}
      />
    </div>
  );
}
