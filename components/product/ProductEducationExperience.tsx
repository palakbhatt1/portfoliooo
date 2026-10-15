"use client";

import React from "react";
import Link from "next/link";

export const ProductEducationExperience: React.FC = () => {
  return (
    <section className="border-t border-neutral-200 pt-10 sm:pt-12 pb-12 sm:pb-14 font-space-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        {/* LEFT: EDUCATION */}
        <div className="space-y-6 md:pr-6 md:border-r md:border-neutral-200">
          <h2 className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-neutral-900">
            EDUCATION
          </h2>

          <div className="space-y-6 text-xs font-mono">
            {/* Degree 1: B.Tech CSE (AI/ML) */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-24 sm:w-28 flex-shrink-0 space-y-0.5">
                <div className="text-neutral-900 font-bold whitespace-nowrap text-xs sm:text-[12.5px]">
                  2023 — 27
                </div>
                <div className="text-neutral-500 text-[11px] font-medium">CGPA: 8.18</div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-neutral-900 text-xs sm:text-[13px] leading-snug">
                  B.Tech CSE (AI/ML)
                </h3>
                <div className="text-neutral-700 text-xs leading-relaxed">
                  BML Munjal University, Gurgaon
                </div>
              </div>
            </div>

            {/* Degree 2: CBSE */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-24 sm:w-28 flex-shrink-0 space-y-0.5">
                <div className="text-neutral-900 font-bold whitespace-nowrap text-xs sm:text-[12.5px]">
                  2023
                </div>
                <div className="text-neutral-500 text-[11px] font-medium">90.6%</div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-neutral-900 text-xs sm:text-[13px] leading-snug">
                  CBSE
                </h3>
                <div className="text-neutral-700 text-xs leading-relaxed">
                  Arden Progressive School, Haldwani
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: EXPERIENCE */}
        <div className="space-y-6 md:pl-2">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-neutral-900">
              EXPERIENCE
            </h2>

            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 border border-neutral-900 text-neutral-900 text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-all shadow-2xs"
            >
              <span>VIEW RESUME</span>
              <span className="text-xs sm:text-sm leading-none">↗</span>
            </Link>
          </div>

          {/* Vertical Timeline with Green Dots */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-[7px] before:top-2 before:bottom-3 before:w-[2px] before:bg-neutral-200 text-xs font-mono">
            {/* Item 1: ViniBrawns Healthcare Solutions */}
            <div className="relative space-y-1">
              <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#789d65] border-2 border-white shadow-xs" />
              <div className="space-y-0.5">
                <div className="font-bold text-neutral-900 text-xs sm:text-[13px] leading-snug">
                  ViniBrawns Healthcare Solutions
                </div>
                <div className="text-neutral-700 text-xs">
                  Project Lead &amp; SDE Intern &middot;{" "}
                  <span className="text-neutral-500 font-bold">2026</span>
                </div>
              </div>
              <p className="text-neutral-600 text-xs leading-relaxed">
                Led AbleCircle from user needs to product requirements and implementation.
              </p>
            </div>

            {/* Item 2: USTART */}
            <div className="relative space-y-1">
              <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#789d65] border-2 border-white shadow-xs" />
              <div className="space-y-0.5">
                <div className="font-bold text-neutral-900 text-xs sm:text-[13px] leading-snug">
                  USTART
                </div>
                <div className="text-neutral-700 text-xs">
                  UI/UX Intern &middot;{" "}
                  <span className="text-neutral-500 font-bold">2025</span>
                </div>
              </div>
              <p className="text-neutral-600 text-xs leading-relaxed">
                Created 100+ high-fidelity designs and prototypes for web and mobile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
