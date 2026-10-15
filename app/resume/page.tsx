"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductFooter } from "@/components/product/ProductFooter";
import { VisualResumeSheet } from "@/components/product/VisualResumeSheet";
import { LicenseModal } from "@/components/home/LicenseModal";

export default function ResumePage() {
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-space-mono flex flex-col justify-between">
      <ProductHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-32 space-y-6 w-full flex-grow">
        {/* Top Minimal Navigation */}
        <div className="flex items-center justify-between text-xs font-mono text-neutral-600">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-neutral-950 transition-colors">
            <span>&larr;</span>
            <span>Back to portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-900 hover:underline"
            >
              Download PDF (351 KB) ↗
            </a>
          </div>
        </div>

        {/* The Exact Reference Visual Resume Sheet */}
        <VisualResumeSheet showTopBar={true} />

        <ProductFooter />
      </main>

      <LicenseModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        onReplayIntro={() => {}}
      />
    </div>
  );
}
