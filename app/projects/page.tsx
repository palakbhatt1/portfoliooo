"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductFooter } from "@/components/product/ProductFooter";
import { LicenseModal } from "@/components/home/LicenseModal";
import { projects, Project } from "@/lib/projects";

import {
  LinkedinIcon,
  GithubIcon,
  LeetCodeIcon,
  BehanceIcon,
  InstagramIcon,
} from "@/components/ui/Icons";

type ViewMode = "all" | "ai-ml" | "design-product";

interface ProjectGroup {
  heading: string;
  subheading?: string;
  items: Project[];
}

export default function ProjectsPage() {
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const noteRef = useRef<HTMLDivElement | null>(null);
  const avatarBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close note on Escape key or outside click
  useEffect(() => {
    if (!isNoteOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        noteRef.current &&
        !noteRef.current.contains(e.target as Node) &&
        avatarBtnRef.current &&
        !avatarBtnRef.current.contains(e.target as Node)
      ) {
        setIsNoteOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsNoteOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNoteOpen]);

  // Ensure navigating home from projects skips the intro landing screen
  useEffect(() => {
    try {
      sessionStorage.setItem("palak_intro_seen", "true");
      localStorage.setItem("palak_intro_seen", "true");
    } catch {
      // Ignore
    }
  }, []);

  const handleGoHome = () => {
    try {
      sessionStorage.setItem("palak_intro_seen", "true");
      localStorage.setItem("palak_intro_seen", "true");
    } catch {
      // Ignore
    }
  };

  // Filter/group projects based on active view mode: ALL PROJECTS · AI & ML · DESIGN & PRODUCT
  const projectGroups = useMemo<ProjectGroup[]>(() => {
    if (viewMode === "ai-ml") {
      return [
        {
          heading: "AI & ML",
          subheading: "Code Dependency Analyzer & DevEx Platform (2024)",
          items: projects.filter((p) => p.slug === "logiclens"),
        },
      ];
    }

    if (viewMode === "design-product") {
      return [
        {
          heading: "Design & Product",
          subheading: "Caregiver Ecosystem, Safety & Sustainable Commerce (2024 — 2026)",
          items: projects.filter((p) => p.slug !== "logiclens"),
        },
      ];
    }

    // Default: "all" (ALL PROJECTS - chronological breakdown by milestone)
    return [
      {
        heading: "2026",
        subheading: "Flagship Initiative · Caregiver Ecosystem",
        items: projects.filter((p) => p.slug === "ablecircle"),
      },
      {
        heading: "2025",
        subheading: "Interaction & Safety Design",
        items: projects.filter((p) => p.slug === "antisoch"),
      },
      {
        heading: "2024",
        subheading: "Startup Prototype & Dev Intelligence",
        items: projects.filter((p) => p.slug === "simply-hemp" || p.slug === "logiclens"),
      },
    ];
  }, [viewMode]);

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

      {/* 2. Outer Layout Margin Wrapper (framing the translucent card over the pixel background) */}
      <div className="relative z-10 min-h-screen px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 flex flex-col justify-between">
        
        {/* 3. Translucent White Main Card Container: strictly follows max-w-4xl text placement */}
        <div className="w-full max-w-4xl mx-auto bg-white/90 sm:bg-white/94 backdrop-blur-md rounded-[24px] sm:rounded-[32px] border border-white/70 shadow-2xl relative flex flex-col my-auto">
          
          {/* Top Global Navigation Bar */}
          <ProductHeader />

          {/* Delicate Hairline Separator */}
          <div className="w-full border-b border-neutral-200/80" />

          {/* Main Inner Card Content: aligns exactly with Home page padding px-6 sm:px-8 */}
          <main className="w-full max-w-4xl mx-auto px-6 sm:px-8 pt-4 sm:pt-5 pb-12 sm:pb-14 space-y-7 sm:space-y-8">
            
            {/* Header: VIEW Filters (Left) + Stylized "Projects" and Exact Reference Paper Note (Right) */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-2">
              
              {/* Left Column: VIEW Label + Pill Filters */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-[0.24em] text-neutral-400 uppercase block font-mono">
                  VIEW
                </span>
                <div className="flex items-center flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode("all")}
                    className={`px-3 py-1 sm:px-3.5 sm:py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                      viewMode === "all"
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "bg-white/70 border border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-700"
                    }`}
                  >
                    ALL PROJECTS
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("ai-ml")}
                    className={`px-3 py-1 sm:px-3.5 sm:py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                      viewMode === "ai-ml"
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "bg-white/70 border border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-700"
                    }`}
                  >
                    AI &amp; ML
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("design-product")}
                    className={`px-3 py-1 sm:px-3.5 sm:py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                      viewMode === "design-product"
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "bg-white/70 border border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-700"
                    }`}
                  >
                    DESIGN &amp; PRODUCT
                  </button>
                </div>
              </div>

              {/* Right Column: Stylized Wordmark + Overlay Green Paper Note Card in Original Position */}
              <div className="relative flex flex-col items-start lg:items-end">
                {/* Stylized "Projects" Wordmark: tightly compressed and kerned with caricature replacing 'o' */}
                <div className="relative inline-flex items-end select-none font-sans">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.07em] text-neutral-900 leading-none inline-block transform scale-y-[1.14] origin-bottom">
                    Pr
                  </span>
                  
                  {/* Caricature replacing 'o', clickable button to toggle the bio note */}
                  <button
                    ref={avatarBtnRef}
                    type="button"
                    onClick={() => setIsNoteOpen((prev) => !prev)}
                    aria-label={isNoteOpen ? "Close bio note" : "Open bio note"}
                    aria-expanded={isNoteOpen}
                    title="Click to view bio note"
                    className="inline-block relative -mb-0.5 sm:-mb-1 -mx-1.5 sm:-mx-2.5 md:-mx-3 flex-shrink-0 transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-full"
                  >
                    <Image
                      src="/avatar_o.png"
                      alt="Palak"
                      width={64}
                      height={70}
                      priority
                      unoptimized
                      className="w-10 sm:w-12 md:w-14 h-auto object-contain drop-shadow-xs pointer-events-none"
                    />
                  </button>

                  <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.07em] text-neutral-900 leading-none inline-block transform scale-y-[1.14] origin-bottom">
                    jects
                  </span>
                </div>

                {/* Portfolio Green Theme Note Card: appears on clicking avatar, overlays without shifting projects */}
                <div
                  ref={noteRef}
                  className={`absolute top-[calc(100%+14px)] -right-6 sm:-right-7 md:-right-8 z-30 w-[280px] sm:w-[310px] md:w-[330px] bg-[#92a878] rounded-none shadow-[0_16px_36px_rgba(0,0,0,0.18)] p-4 sm:p-5 space-y-3.5 text-[#13220e] rotate-[-1deg] border border-[#7a9161] transition-all duration-300 origin-top-right ${
                    isNoteOpen
                      ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                      : "opacity-0 scale-95 pointer-events-none -translate-y-2"
                  }`}
                >
                  {/* Triangular speech bubble pointer arrow placed at end of note, exactly after 's' where red dot is */}
                  <div className="absolute -top-[10px] right-3 sm:right-3.5 md:right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-[#92a878]" />

                    {/* Typewriter Bio Text (matching exact Marie reference font) */}
                    <div
                      className="space-y-2.5 font-typewriter text-[11px] sm:text-[11.5px] text-[#13220e] leading-[1.65]"
                      style={{ fontFamily: "'Courier Prime', 'Courier New', Courier, monospace" }}
                    >
                      <p>
                        Hey, I&apos;m Palak. I enjoy working at the intersection of AI, design &amp; product development. I&apos;m open to opportunities across AI Engineering, Machine Learning, Data Science, Data Analytics, UI/UX Design &amp; Product.
                      </p>
                      <p>
                        I love exploring ideas, solving problems &amp; building products that people would enjoy using.
                      </p>
                    </div>

                    {/* 5 Circular Buttons: LinkedIn, GitHub, LeetCode, Behance, Instagram in Portfolio Green */}
                    <div className="flex items-center justify-between pt-1 w-full">
                      {/* LinkedIn */}
                      <a
                        href="https://www.linkedin.com/in/palakbhatt1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center group/btn text-center"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#829968] group-hover/btn:bg-neutral-900 group-hover/btn:text-white border border-[#6f8556] flex items-center justify-center text-[#13220e] transition-all shadow-2xs">
                          <LinkedinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                        <span className="text-[8.5px] font-sans font-semibold text-[#182d13] group-hover/btn:text-neutral-900 mt-0.5 transition-colors">
                          LinkedIn
                        </span>
                      </a>

                      {/* GitHub */}
                      <a
                        href="https://github.com/palakbhatt1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center group/btn text-center"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#829968] group-hover/btn:bg-neutral-900 group-hover/btn:text-white border border-[#6f8556] flex items-center justify-center text-[#13220e] transition-all shadow-2xs">
                          <GithubIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                        <span className="text-[8.5px] font-sans font-semibold text-[#182d13] group-hover/btn:text-neutral-900 mt-0.5 transition-colors">
                          GitHub
                        </span>
                      </a>

                      {/* LeetCode */}
                      <a
                        href="https://leetcode.com/u/palakbhatt01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center group/btn text-center"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#829968] group-hover/btn:bg-neutral-900 group-hover/btn:text-white border border-[#6f8556] flex items-center justify-center text-[#13220e] transition-all shadow-2xs">
                          <LeetCodeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                        <span className="text-[8.5px] font-sans font-semibold text-[#182d13] group-hover/btn:text-neutral-900 mt-0.5 transition-colors">
                          LeetCode
                        </span>
                      </a>

                      {/* Behance */}
                      <a
                        href="https://www.behance.net/palakbhatt13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center group/btn text-center"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#829968] group-hover/btn:bg-neutral-900 group-hover/btn:text-white border border-[#6f8556] flex items-center justify-center text-[#13220e] transition-all shadow-2xs">
                          <BehanceIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                        <span className="text-[8.5px] font-sans font-semibold text-[#182d13] group-hover/btn:text-neutral-900 mt-0.5 transition-colors">
                          Behance
                        </span>
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/_palakbhatt__"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center group/btn text-center"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#829968] group-hover/btn:bg-neutral-900 group-hover/btn:text-white border border-[#6f8556] flex items-center justify-center text-[#13220e] transition-all shadow-2xs">
                          <InstagramIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                        <span className="text-[8.5px] font-sans font-semibold text-[#182d13] group-hover/btn:text-neutral-900 mt-0.5 transition-colors">
                          Instagram
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            {/* Project Sections Grouped with Serif Headings */}
            <div className="space-y-7 sm:space-y-8 pt-1">
              {projectGroups.map((group) => (
                <section key={group.heading} className="space-y-3">
                  {/* Date / Category Serif Heading */}
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#bd3a25] tracking-tight">
                      {group.heading}
                    </h2>
                    {group.subheading && (
                      <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline-block">
                        {group.subheading}
                      </span>
                    )}
                  </div>

                  {/* Horizontal Rule Under Section Title */}
                  <div className="w-full border-b border-neutral-300" />

                  {/* Project Rows */}
                  <div className="divide-y divide-neutral-200/80">
                    {group.items.map((proj) => (
                      <Link
                        key={proj.slug}
                        href={`/work/${proj.slug}`}
                        className="group py-4 sm:py-5 px-3 -mx-3 rounded-lg transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 hover:bg-neutral-900/[0.04] block"
                      >
                        {/* Column 1: Project Title + Category */}
                        <div className="md:w-[28%] flex-shrink-0 space-y-0.5">
                          <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#bd3a25] transition-colors flex items-center gap-1.5">
                            <span>{proj.title}</span>
                            <span className="inline-block text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#bd3a25]">
                              ↗
                            </span>
                          </h3>
                          <div className="text-[11px] font-mono text-neutral-500">
                            {proj.category}
                          </div>
                        </div>

                        {/* Column 2: Project Description */}
                        <div className="md:w-[48%] flex-grow">
                          <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-mono">
                            {proj.description}
                          </p>
                        </div>

                        {/* Column 3: Badge Pill */}
                        <div className="md:w-[24%] flex md:justify-end items-center flex-shrink-0">
                          <span className="inline-flex items-center text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wider px-3.5 py-1 rounded-full border border-neutral-300 text-neutral-800 bg-white/80 shadow-2xs group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-all whitespace-nowrap">
                            {proj.metrics || proj.badge?.split("·")[0] || "CASE STUDY"}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
              <Link
                href="/"
                onClick={handleGoHome}
                className="inline-flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
              >
                <span>&larr;</span>
                <span>Back to portfolio home</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/resume" className="hover:text-neutral-900 transition-colors">
                  View Resume
                </Link>
                <span>&middot;</span>
                <a
                  href="https://github.com/palakbhatt1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 transition-colors"
                >
                  GitHub ↗
                </a>
                <span>&middot;</span>
                <a
                  href="https://www.linkedin.com/in/palakbhatt1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 transition-colors"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

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
