"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductFooter } from "@/components/product/ProductFooter";
import { LicenseModal } from "@/components/home/LicenseModal";
import { ProjectDetailView } from "@/components/product/ProjectDetailView";
import { projects, Project } from "@/lib/projects";

import {
  LinkedinIcon,
  GithubIcon,
  LeetCodeIcon,
  BehanceIcon,
  InstagramIcon,
  FigmaIcon,
} from "@/components/ui/Icons";

type ViewMode = "all" | "design-product" | "ai-ml";

interface ProjectGroup {
  heading: string;
  subheading?: string;
  items: Project[];
}

export default function ProjectsPage() {
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);

  const selectedProject = useMemo(() => {
    return selectedProjectSlug ? projects.find((p) => p.slug === selectedProjectSlug) || null : null;
  }, [selectedProjectSlug]);

  // Sync with query parameter ?project=slug and browser back/forward history
  useEffect(() => {
    // Check initial URL on mount/refresh
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const querySlug = searchParams.get("project");
      const match = window.location.pathname.match(/\/work\/([^/]+)/);
      const initial = querySlug || (match ? match[1] : null);
      if (initial) {
        setSelectedProjectSlug(initial);
      }
    }

    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const querySlug = searchParams.get("project");
      const match = window.location.pathname.match(/\/work\/([^/]+)/);
      const slug = querySlug || (match ? match[1] : null);
      setSelectedProjectSlug(slug || null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleOpenProject = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProjectSlug(slug);
    try {
      window.history.pushState(null, "", `/projects?project=${slug}`);
    } catch {
      // Ignore
    }
  };

  const handleCloseProject = () => {
    setSelectedProjectSlug(null);
    try {
      window.history.pushState(null, "", "/projects");
    } catch {
      // Ignore
    }
  };

  const handleNavigateProject = (slug: string) => {
    setSelectedProjectSlug(slug);
    try {
      window.history.pushState(null, "", `/projects?project=${slug}`);
    } catch {
      // Ignore
    }
  };

  const noteRef = useRef<HTMLDivElement | null>(null);
  const avatarBtnRef = useRef<HTMLButtonElement | null>(null);
  // Instant tactile click via Web Audio API: 20ms sharp snap that begins and terminates immediately
  const playInstantClick = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // Audio fallback
    }
  }, []);

  const handleAvatarClick = useCallback(() => {
    playInstantClick();
    setIsNoteOpen((prev) => !prev);
  }, [playInstantClick]);

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

  // Ensure navigating home from projects skips the intro landing screen within this tab session
  useEffect(() => {
    try {
      sessionStorage.setItem("palak_intro_seen", "true");
    } catch {
      // Ignore
    }
  }, []);

  // Filter/group projects based on active view mode: ALL PROJECTS · AI & ML · DESIGN & PRODUCT
  const projectGroups = useMemo<ProjectGroup[]>(() => {
    const aiSlugs = ["claimxplain", "logiclens", "personapath", "pathwise"];
    const dpSlugs = ["ablecircle", "antisoch", "simply-hemp", "ustart"];

    if (viewMode === "design-product") {
      return [
        {
          heading: "Design & Product",
          items: projects.filter((p) => dpSlugs.includes(p.slug)),
        },
      ];
    }

    if (viewMode === "ai-ml") {
      return [
        {
          heading: "AI & ML",
          items: projects.filter((p) => aiSlugs.includes(p.slug)),
        },
      ];
    }

    // Default: "all" (ALL PROJECTS - chronological breakdown: 2026, 2025, 2024)
    return [
      {
        heading: "2026",
        items: [
          projects.find((p) => p.slug === "ablecircle"),
          projects.find((p) => p.slug === "logiclens"),
          projects.find((p) => p.slug === "claimxplain"),
          projects.find((p) => p.slug === "personapath"),
        ].filter(Boolean) as Project[],
      },
      {
        heading: "2025",
        items: [
          projects.find((p) => p.slug === "antisoch"),
          projects.find((p) => p.slug === "ustart"),
          projects.find((p) => p.slug === "pathwise"),
        ].filter(Boolean) as Project[],
      },
      {
        heading: "2024",
        items: [
          projects.find((p) => p.slug === "simply-hemp"),
        ].filter(Boolean) as Project[],
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
                    onClick={() => setViewMode("design-product")}
                    className={`px-3 py-1 sm:px-3.5 sm:py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                      viewMode === "design-product"
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "bg-white/70 border border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-700"
                    }`}
                  >
                    DESIGN &amp; PRODUCT
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
                </div>
              </div>

              {/* Right Column: Stylized Wordmark + Overlay Green Paper Note Card in Original Position */}
              <div className="relative flex flex-col items-start lg:items-end">
                {/* Stylized "Projects" Wordmark: tightly compressed and kerned with caricature replacing 'o' */}
                <div className="relative inline-flex items-end select-none font-sans">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.07em] text-neutral-900 leading-none inline-block transform scale-y-[1.14] origin-bottom">
                    Pr
                  </span>
                  
                  {/* Caricature replacing 'o', clickable button to toggle the bio note with instant click & refined movement */}
                  <button
                    ref={avatarBtnRef}
                    type="button"
                    onClick={handleAvatarClick}
                    aria-label={isNoteOpen ? "Close bio note" : "Open bio note"}
                    aria-expanded={isNoteOpen}
                    title="Click to view bio note"
                    className="inline-block relative -mb-0.5 sm:-mb-1 -mx-1.5 sm:-mx-2.5 md:-mx-3 flex-shrink-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-full group/avatar"
                  >
                    <div
                      className={`transition-transform duration-200 group-hover/avatar:scale-[1.08] active:scale-95 ${
                        isNoteOpen ? "scale-100" : "animate-avatar-curious"
                      }`}
                    >
                      <Image
                        src="/avatar_o.png"
                        alt="Palak"
                        width={64}
                        height={70}
                        priority
                        unoptimized
                        className="w-10 sm:w-12 md:w-13.5 h-auto object-contain drop-shadow-xs pointer-events-none select-none"
                      />
                    </div>
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

            {/* Project Sections Grouped with Serif Headings matching reference */}
            <div className="space-y-8 sm:space-y-10 pt-1">
              {projectGroups.map((group) => (
                <section key={group.heading} className="space-y-2">
                  {/* Date / Category Serif Heading */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#bd3a25] tracking-tight">
                    {group.heading}
                  </h2>

                  {/* Clean Hairline Rule Under Section Title */}
                  <div className="w-full border-b border-neutral-300" />

                  {/* Project Rows */}
                  <div className="divide-y divide-neutral-200/80">
                    {group.items.map((proj) => {
                        const isLogicLens = proj.slug === "logiclens";
                        const demoUrl = isLogicLens ? (proj.links?.demo || proj.demoUrl) : null;
                        const githubUrl = proj.links?.github || proj.githubUrl;
                        const figmaUrl = proj.links?.figma || (proj.links?.prototype?.includes("figma") ? proj.links.prototype : null);
                        const behanceUrl = proj.links?.behance || (proj.links?.caseStudy && proj.links.caseStudy.includes("behance") ? proj.links.caseStudy : null);

                        return (
                          <div
                            key={proj.slug}
                            onClick={(e) => handleOpenProject(proj.slug, e)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleOpenProject(proj.slug, e as unknown as React.MouseEvent);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Open project details for ${proj.title}`}
                            className="group py-4 sm:py-5 px-3 -mx-3 rounded-xl transition-all duration-200 flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-6 hover:bg-neutral-900/[0.04] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                          >
                            {/* Column 1: Project Title + Action Logo Buttons underneath */}
                            <div className="md:w-[32%] lg:w-[34%] flex-shrink-0 space-y-2">
                              <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#bd3a25] transition-colors leading-snug">
                                {proj.title}
                              </h3>

                              {/* Logos of Buttons directly under the Project Title */}
                              <div className="flex items-center flex-wrap gap-1.5 pt-0.5">
                                {demoUrl && (
                                  <a
                                    href={demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    title="Try it Now"
                                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[#7a9161]/50 bg-[#92a878]/25 text-[#1b3411] hover:bg-[#92a878] hover:text-[#0b1606] transition-all shadow-2xs whitespace-nowrap cursor-pointer"
                                  >
                                    <span>Try it Now</span>
                                    <span className="text-[11px] leading-none">↗</span>
                                  </a>
                                )}

                                {figmaUrl && (
                                  <a
                                    href={figmaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    title="Figma Prototype"
                                    aria-label="Figma Prototype"
                                    className="w-6 h-6 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-white flex items-center justify-center transition-all shadow-2xs group/btn cursor-pointer"
                                  >
                                    <FigmaIcon className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                                  </a>
                                )}

                                {behanceUrl && (
                                  <a
                                    href={behanceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    title="Behance Case Study"
                                    aria-label="Behance Case Study"
                                    className="w-6 h-6 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white/90 hover:bg-neutral-900 text-neutral-700 hover:text-white flex items-center justify-center transition-all shadow-2xs group/btn cursor-pointer"
                                  >
                                    <BehanceIcon className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
                                  </a>
                                )}

                                {githubUrl && (
                                  <a
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    title="GitHub"
                                    aria-label="GitHub"
                                    className="w-6 h-6 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white/90 hover:bg-neutral-900 text-neutral-700 hover:text-white flex items-center justify-center transition-all shadow-2xs group/btn cursor-pointer"
                                  >
                                    <GithubIcon className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Column 2: One-line Sentence Description */}
                            <div className="md:w-[66%] lg:w-[64%] flex-grow">
                              <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-sans">
                                {proj.oneLiner || proj.description}
                              </p>
                            </div>
                          </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <ProductFooter />
          </main>
        </div>
      </div>

      {/* Project Detail Overlay Drawer */}
      {selectedProject && (
        <ProjectDetailView
          project={selectedProject}
          onClose={handleCloseProject}
          onNavigate={handleNavigateProject}
          isOverlay={true}
        />
      )}

      {/* 3D License Modal */}
      <LicenseModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        onReplayIntro={() => {}}
      />
    </div>
  );
}
