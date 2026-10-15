"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductFooter } from "@/components/product/ProductFooter";
import { LicenseModal } from "@/components/home/LicenseModal";

export default function AboutPage() {
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-space-mono flex flex-col justify-between">
      <ProductHeader />

      <main className="max-w-3xl mx-auto px-6 pt-10 pb-32 space-y-12 w-full flex-grow">
        {/* Top Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-mono text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <span>&larr;</span>
            <span>Back to portfolio</span>
          </Link>
        </div>

        {/* Main Bio Header */}
        <section className="space-y-6">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-neutral-300 border border-neutral-300 relative">
            <Image
              src="/palak.jpeg"
              alt="Palak Bhatt"
              fill
              priority
              className="object-cover object-top filter grayscale contrast-110"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 font-sans">
              About me
            </h1>
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
              AI, Design &amp; Development &middot; B.Tech CSE (AI/ML) &rsquo;27
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-2xl font-mono">
            <p>
              I am a final-year Computer Science &amp; Engineering (AI/ML) student at{" "}
              <strong>BML Munjal University</strong> (CGPA: 8.18). I moved from delivering 100+
              developer-ready wireframes and interactive prototypes as a UI/UX intern at USTART to
              leading product development at ViniBrawns Healthcare Solutions.
            </p>
            <p>
              My work is focused on accessible, high-friction problem domains—including{" "}
              <strong>AbleCircle</strong>, an intellectual disability caregiver community platform
              backed by an institutional seed grant and covered by a published patent application.
            </p>
            <p>
              I am strongest where human-centered design meets technical feasibility. When designing
              flows in Figma, I think about data models, system states, and developer
              handoff—ensuring that what gets designed can be reliably built and shipped.
            </p>
          </div>
        </section>

        {/* Subtle Line Divider */}
        <div className="rule-divider" />

        {/* Experience & Education Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 font-mono text-xs sm:text-sm">
          {/* Experience Column */}
          <div className="space-y-6">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 font-sans uppercase">
              Experience
            </h2>

            <div className="space-y-6 text-xs sm:text-sm">
              <div>
                <h3 className="font-bold text-neutral-900">Project Lead &amp; SDE Intern</h3>
                <p className="text-neutral-600">ViniBrawns Healthcare Solutions</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Sep 2025 — Present</p>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Led product development, translating clinical and caregiver requirements into user
                  flows and technical solutions balancing usability and engineering feasibility.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900">UI/UX Intern</h3>
                <p className="text-neutral-600">USTART</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Jun 2025 — Jul 2025</p>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Delivered 100+ high-fidelity, developer-ready wireframes &amp; interactive prototypes
                  across web and mobile products; prepared polished handoffs.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900">Social Media Lead</h3>
                <p className="text-neutral-600">Youth Red Cross</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">2025 — 2026</p>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Led a 10-member team coordinating content planning and visual communication across
                  multiple initiatives.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Achievements Column */}
          <div className="space-y-6">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 font-sans uppercase">
              Education &amp; Honors
            </h2>

            <div className="space-y-6 text-xs sm:text-sm">
              <div>
                <h3 className="font-bold text-neutral-900">B.Tech in CSE (AI/ML)</h3>
                <p className="text-neutral-600">BML Munjal University, Gurugram</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">2023 — 2027 &middot; CGPA: 8.18 / 10</p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900">Institutional Seed Grant</h3>
                <p className="text-neutral-600">AbleCircle Healthcare Caregiving Platform</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  2026 &middot; Caregiving ecosystem covered under published patent application
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900">Top 5 Finalist · Hult Prize</h3>
                <p className="text-neutral-600">Simply Hemp Sustainable Product Prototype</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">2024</p>
              </div>
            </div>
          </div>
        </section>

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
