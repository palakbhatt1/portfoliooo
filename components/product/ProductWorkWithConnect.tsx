"use client";

import React from "react";
import Image from "next/image";

export const ProductWorkWithConnect: React.FC = () => {
  return (
    <section id="contact" className="border-t border-neutral-200 pt-10 sm:pt-12 font-space-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
        {/* LEFT: WHAT I WORK WITH */}
        <div className="space-y-6 md:pr-6 md:border-r md:border-neutral-200">
          <h2 className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-neutral-900">
            WHAT I WORK WITH
          </h2>

          <div className="space-y-5">
            {/* Row 1: PRODUCT DESIGN */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#edf5e7] flex items-center justify-center flex-shrink-0 text-[#3e632e] shadow-2xs">
                {/* Lightbulb Icon */}
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M12 2a7 7 0 0 0-7 7c0 2.6 1.4 4.8 3.5 6h7c2.1-1.2 3.5-3.4 3.5-6a7 7 0 0 0-7-7z" />
                </svg>
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-neutral-900 uppercase tracking-wider text-xs sm:text-[13px]">
                  PRODUCT DESIGN
                </div>
                <div className="text-neutral-600 text-xs">User Flows &bull; Wireframing</div>
                <div className="text-neutral-600 text-xs">Prototyping &bull; UI/UX</div>
              </div>
            </div>

            {/* Row 2: RESEARCH */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#edf5e7] flex items-center justify-center flex-shrink-0 text-[#3e632e] shadow-2xs">
                {/* Document Icon */}
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-neutral-900 uppercase tracking-wider text-xs sm:text-[13px]">
                  RESEARCH
                </div>
                <div className="text-neutral-600 text-xs">
                  User Research &bull; Problem Discovery
                </div>
                <div className="text-neutral-600 text-xs">Usability</div>
              </div>
            </div>

            {/* Row 3: TOOLS */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#edf5e7] flex items-center justify-center flex-shrink-0 text-[#3e632e] shadow-2xs">
                {/* Pencil Icon */}
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-neutral-900 uppercase tracking-wider text-xs sm:text-[13px]">
                  TOOLS
                </div>
                <div className="text-neutral-600 text-xs">Figma &bull; Canva</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: LET'S CONNECT WITH FROG MASCOT */}
        <div className="space-y-5 md:pl-2">
          <h2 className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-neutral-900">
            LET&apos;S CONNECT
          </h2>

          <div className="flex items-start justify-between gap-4">
            {/* Left Info + Button */}
            <div className="flex items-start gap-4">
              {/* Mail Icon Box */}
              <div className="w-14 h-14 rounded-2xl bg-[#edf5e7] flex items-center justify-center flex-shrink-0 text-[#3e632e] shadow-2xs mt-0.5">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>

              {/* Message + Button */}
              <div className="space-y-3 text-xs">
                <div className="space-y-0.5 text-neutral-700 leading-relaxed text-xs">
                  <div>Have an idea worth exploring?</div>
                  <div>Let&apos;s connect.</div>
                </div>

                <div>
                  <a
                    href="mailto:palakbhatt234@gmail.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-all shadow-2xs"
                  >
                    <span>GET IN TOUCH</span>
                    <span className="text-sm leading-none">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Adorable Pixel Frog Mascot */}
            <div className="flex-shrink-0 select-none -mt-4">
              <Image
                src="/pixel_frog_clean.png"
                alt="Pixel Frog Mascot"
                width={96}
                height={96}
                unoptimized
                className="w-20 sm:w-24 h-auto"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
