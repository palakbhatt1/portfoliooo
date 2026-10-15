"use client";

import React from "react";
import Image from "next/image";

interface VisualResumeSheetProps {
  showTopBar?: boolean;
}

export const VisualResumeSheet: React.FC<VisualResumeSheetProps> = ({ showTopBar = true }) => {
  return (
    <div className="bg-white text-neutral-900 p-6 sm:p-12 md:p-14 shadow-lg max-w-4xl mx-auto border border-neutral-300 font-space-mono">
      {/* Reference Top Bar (Like Behance in image copy.png) */}
      {showTopBar && (
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-neutral-200 text-xs">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#3e3e3e] hover:bg-neutral-900 text-white font-medium transition-colors cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect width="12" height="8" x="6" y="14" />
            </svg>
            <span>Print Sheet</span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#3e3e3e] hover:bg-neutral-900 text-white font-medium transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>PDF Resume</span>
          </a>

          <a
            href="mailto:bhattpalak234@gmail.com"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#3e3e3e] hover:bg-neutral-900 text-white font-medium transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>bhattpalak234@gmail.com</span>
          </a>
        </div>
      )}

      {/* Top Hero Block (HI I’M PALAK + Photo) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Bio Column */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 leading-none">
              HI I’M
            </div>
            <div className="text-4xl sm:text-5xl font-black tracking-wider text-[#3550e6] leading-tight mt-1">
              PALAK
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-neutral-700 font-mono leading-relaxed pt-2">
            <p>
              A final-year{" "}
              <span className="text-[#3550e6] font-semibold underline decoration-1 underline-offset-2">
                Computer Science & Engineering
              </span>{" "}
              (AI/ML) student at BML Munjal University, Gurugram.
            </p>
            <p>
              I design digital products that solve deep-seated human friction. Every product I touch
              is driven by the obsession that the tools we interact with every day should feel
              intentional, calm, and accessible to everyone. I am a multidisciplinary builder at
              heart. Product discovery is my foundation, but shipping technically feasible software
              comes first.
            </p>
            <p>This portfolio is a glimpse into how I research, what I design, and what I build.</p>
          </div>
        </div>

        {/* Right Photo Column */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div className="w-full max-w-[280px] aspect-[4/5] overflow-hidden rounded-md border border-neutral-300 bg-neutral-200 relative">
            <Image
              src="/palak.jpeg"
              alt="Palak Bhatt"
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-4 border-t border-neutral-200 text-xs font-mono">
        {/* Left Column (Education, Softwares, Languages) */}
        <div className="md:col-span-6 space-y-8">
          {/* EDUCATION */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold tracking-widest uppercase text-neutral-900">
              EDUCATION
            </h2>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-neutral-500 font-semibold">2023 – 27 ·</span>
                <span className="font-bold text-neutral-900">B.Tech in CSE (AI/ML)</span>
              </div>
              <p className="text-neutral-600 pl-16">
                BML Munjal University, Gurugram
                <br />
                <span className="text-neutral-900 font-semibold">CGPA: 8.18 / 10</span>
              </p>
            </div>
          </div>

          {/* SOFTWARES */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold tracking-widest uppercase text-neutral-900">
              SOFTWARES &amp; TOOLING
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-2 border border-neutral-300 rounded">
                <div className="w-7 h-7 bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] rounded">
                  Fg
                </div>
                <span className="font-semibold text-neutral-900">Figma</span>
              </div>

              <div className="flex items-center gap-2.5 p-2 border border-neutral-300 rounded">
                <div className="w-7 h-7 bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] rounded">
                  Py
                </div>
                <span className="font-semibold text-neutral-900">Python</span>
              </div>

              <div className="flex items-center gap-2.5 p-2 border border-neutral-300 rounded">
                <div className="w-7 h-7 bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] rounded">
                  SQL
                </div>
                <span className="font-semibold text-neutral-900">SQL</span>
              </div>

              <div className="flex items-center gap-2.5 p-2 border border-neutral-300 rounded">
                <div className="w-7 h-7 bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] rounded">
                  API
                </div>
                <span className="font-semibold text-neutral-900">FastAPI / Flask</span>
              </div>

              <div className="flex items-center gap-2.5 p-2 border border-neutral-300 rounded">
                <div className="w-7 h-7 bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] rounded">
                  Dk
                </div>
                <span className="font-semibold text-neutral-900">Docker</span>
              </div>

              <div className="flex items-center gap-2.5 p-2 border border-neutral-300 rounded">
                <div className="w-7 h-7 bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] rounded">
                  Git
                </div>
                <span className="font-semibold text-neutral-900">Git / GitHub</span>
              </div>
            </div>
          </div>

          {/* LANGUAGES */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold tracking-widest uppercase text-neutral-900">
              LANGUAGES
            </h2>
            <p className="text-neutral-700">English · Hindi</p>
          </div>
        </div>

        {/* Right Column (Skills, Experience, Achievements) */}
        <div className="md:col-span-6 space-y-8">
          {/* SKILLS */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold tracking-widest uppercase text-neutral-900">SKILLS</h2>
            <div className="space-y-2 leading-relaxed">
              <div className="flex items-start gap-4">
                <span className="font-bold text-neutral-900 w-12 flex-shrink-0">Hard</span>
                <span className="text-neutral-700">
                  Product Discovery, User Flows, Prototyping, Usability Testing, Technical
                  Feasibility, Wireframing, Design Systems
                </span>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold text-neutral-900 w-12 flex-shrink-0">Soft</span>
                <span className="text-neutral-700">
                  Developer Handoff, Design Reviews, Cross-functional Leadership, Content Strategy,
                  Storytelling
                </span>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold tracking-widest uppercase text-neutral-900">
              EXPERIENCE
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-neutral-900">2025 — Present</span>
                  <span className="text-neutral-500 font-semibold">ViniBrawns Healthcare</span>
                </div>
                <p className="font-bold text-neutral-900 text-xs">Project Lead &amp; SDE Intern</p>
                <p className="text-neutral-600 leading-normal">
                  Led product discovery, translating healthcare requirements into user flows and
                  technical solutions balancing patient needs and feasibility.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-neutral-900">2025</span>
                  <span className="text-neutral-500 font-semibold">USTART</span>
                </div>
                <p className="font-bold text-neutral-900 text-xs">UI/UX Intern</p>
                <p className="text-neutral-600 leading-normal">
                  Delivered 100+ developer-ready wireframes &amp; interactive prototypes across web and
                  mobile products; conducted design reviews and handoffs.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-neutral-900">2025 — 2026</span>
                  <span className="text-neutral-500 font-semibold">Youth Red Cross</span>
                </div>
                <p className="font-bold text-neutral-900 text-xs">Social Media Lead</p>
                <p className="text-neutral-600 leading-normal">
                  Led a 10-member team coordinating content planning and visual communication across
                  university community initiatives.
                </p>
              </div>
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold tracking-widest uppercase text-neutral-900">
              ACHIEVEMENTS
            </h2>
            <div className="space-y-2 leading-normal">
              <p>
                <span className="font-bold text-neutral-900">
                  2026 · Seed Grant Recipient (AbleCircle):
                </span>{" "}
                Institutional grant; caregiving ecosystem covered by a published patent application.
              </p>
              <p>
                <span className="font-bold text-neutral-900">2024 · Hult Prize OnCampus:</span> 5th
                place finalist with the Simply Hemp startup concept.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Contact Strip */}
      <div className="pt-8 mt-10 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-700">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-neutral-900"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>+91 9368275887</span>
        </div>

        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-neutral-900"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <a href="mailto:bhattpalak234@gmail.com" className="hover:underline">
            bhattpalak234@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://linkedin.com/in/palak-bhatt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn ↗
          </a>
          <span>·</span>
          <a
            href="https://github.com/palak-bhatt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
};
