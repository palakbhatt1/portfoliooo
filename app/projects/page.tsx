"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductFooter } from "@/components/product/ProductFooter";
import { LicenseModal } from "@/components/home/LicenseModal";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-space-mono flex flex-col justify-between">
      <ProductHeader />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 pt-4 sm:pt-6 pb-28 space-y-12 w-full flex-grow">
        {/* Top Header */}
        <div className="space-y-3 border-b border-neutral-200 pb-8">
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-bold">
            Selected Work
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-sans">
            PROJECTS
          </h1>
          <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed max-w-2xl">
            A selection of digital products, platforms, and concepts designed with an emphasis on user
            research, systems thinking, and clean technical execution.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-10">
          {projects.map((proj, idx) => (
            <article
              key={proj.slug}
              className="p-6 sm:p-7 border border-neutral-200 hover:border-neutral-400 bg-white transition-all space-y-4 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-neutral-400">0{idx + 1}</span>
                  <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-neutral-900 group-hover:text-[#527340] transition-colors">
                    <Link href={`/work/${proj.slug}`} className="inline-flex items-center gap-2">
                      <span>{proj.title}</span>
                      <span className="text-sm">↗</span>
                    </Link>
                  </h2>
                </div>
                {proj.badge && (
                  <span className="inline-block self-start sm:self-auto text-[11px] font-bold text-neutral-800 bg-[#edf4e8] border border-[#c7d5bd] px-2.5 py-0.5 rounded-sm">
                    {proj.badge}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-neutral-900">{proj.category}</div>
                <div className="text-[11px] text-neutral-500">{proj.role}</div>
                <p className="text-xs sm:text-[12.5px] text-neutral-700 leading-relaxed max-w-3xl pt-1">
                  {proj.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/work/${proj.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 group-hover:text-[#527340] underline underline-offset-4"
                >
                  <span>Read Full Case Study</span>
                  <span>&rarr;</span>
                </Link>
                {proj.metrics && (
                  <span className="text-[11px] font-mono font-bold text-neutral-500">
                    {proj.metrics}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

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
