"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, projects } from "@/lib/projects";
import { ArrowLeft, ArrowRight, ArrowUpRight, X, Maximize2, Minimize2 } from "lucide-react";
import { GithubIcon, BehanceIcon, FigmaIcon } from "@/components/ui/Icons";

interface ProjectDetailViewProps {
  project: Project;
  onClose?: () => void;
  onNavigate?: (slug: string) => void;
  isOverlay?: boolean;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onClose,
  onNavigate,
  isOverlay = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Device frame types
  const isUstart = project.slug === "ustart";
  const isLandscapePhoneMockup = project.slug === "antisoch";
  const isLaptopMockup =
    project.slug === "simply-hemp" ||
    project.slug === "ustart" ||
    project.slug === "ablecircle";

  // Black circle cursor with 80% opacity (increased size: 36x36 with 28px diameter circle)
  const blackCircleCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Ccircle cx='18' cy='18' r='14' fill='%23000000' fill-opacity='0.8'/%3E%3C/svg%3E") 18 18, auto`;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Drag-to-scroll state for laptop screen
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Global mouseup to release drag-scroll
  useEffect(() => {
    const onGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", onGlobalMouseUp);
    return () => window.removeEventListener("mouseup", onGlobalMouseUp);
  }, []);

  // Reset image index and scroll container when project or slide changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project.slug]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentImageIndex]);

  // Smooth mousewheel / trackpad scroll on laptop display without parent page hijacking
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Only Simply Hemp login page fits without scroll; all other pages (including all Ustart web pages) scroll smoothly
      if (project.slug === "simply-hemp" && currentImageIndex === 0) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) return;

      if ((e.deltaY > 0 && scrollTop < maxScroll) || (e.deltaY < 0 && scrollTop > 0)) {
        e.preventDefault();
        el.scrollTop += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [currentImageIndex, project.slug]);

  // Click & drag handlers for mouse scrolling on the laptop screen
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (project.slug === "simply-hemp" && currentImageIndex === 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    setIsDragging(true);
    dragStartY.current = e.clientY;
    if (scrollContainerRef.current) {
      dragStartScrollTop.current = scrollContainerRef.current.scrollTop;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const deltaY = dragStartY.current - e.clientY;
    scrollContainerRef.current.scrollTop = dragStartScrollTop.current + deltaY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle escape key to close overlay
  useEffect(() => {
    if (!isOverlay || !onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOverlay, onClose]);

  // Check if this is an AI & ML project (simplified info + direct links, no images)
  const aiSlugs = ["claimxplain", "logiclens", "personapath", "pathwise"];
  const dpSlugs = ["ablecircle", "antisoch", "simply-hemp", "ustart"];
  const isAiMlProject =
    !dpSlugs.includes(project.slug) &&
    (aiSlugs.includes(project.slug) || /\b(ai|ml|nlp)\b/i.test(project.category));

  // Active Gallery Navigation (UStart defaults directly to web gallery)
  const activeGallery = isUstart
    ? project.webGallery || project.gallery
    : project.gallery && project.gallery.length > 0
    ? project.gallery
    : [
        {
          url: "/projects/project-morph-ui.jpg",
          alt: project.title,
          caption: project.oneLiner,
          badge: project.category,
        },
      ];

  const handlePrevImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev === 0 ? activeGallery.length - 1 : prev - 1));
    },
    [activeGallery.length]
  );

  const handleNextImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev === activeGallery.length - 1 ? 0 : prev + 1));
    },
    [activeGallery.length]
  );

  // Previous & Next Project Navigation
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex !== -1 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : projects[0];

  const activeImage = activeGallery[currentImageIndex] || activeGallery[0];

  // Resolve links
  const githubLink = project.links?.github || project.githubUrl;
  const demoLink = project.links?.demo || project.demoUrl;
  const prototypeLink = project.links?.prototype;
  const figmaLink = project.links?.figma;
  const behanceLink = project.links?.behance || (project.links?.caseStudy && project.links.caseStudy.includes("behance") ? project.links.caseStudy : undefined);
  const hasAnyLink = Boolean(githubLink || demoLink || prototypeLink || figmaLink || behanceLink || project.links?.caseStudy);

  const content = (
    <div className="w-full min-h-full flex flex-col font-sans selection:bg-[#92a878] selection:text-neutral-900 bg-[#f7f8f4]">
      {/* Top Bar: Label + Fullscreen + "Close ×" button */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-6 sm:px-8 py-3.5 border-b border-neutral-200/80 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-neutral-500 uppercase">
            {isAiMlProject ? "AI & ML PROJECT" : "DESIGN & PRODUCT"}
          </span>
          {isAiMlProject && (
            <span className="px-2 py-0.5 rounded-full bg-[#92a878]/20 text-[#2f4f1d] border border-[#92a878]/40 text-[10px] font-mono font-semibold uppercase tracking-wider">
              Direct Access
            </span>
          )}
        </div>

        {/* Top Right Action Buttons: Fullscreen + Close (just a cross) */}
        <div className="flex items-center gap-2">
          {/* Full Screen Button */}
          <button
            type="button"
            onClick={() => setIsFullScreen((prev) => !prev)}
            title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
            aria-label={isFullScreen ? "Exit Full Screen" : "Full Screen"}
            className="w-8 h-8 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-700 transition-all flex items-center justify-center cursor-pointer group"
          >
            {isFullScreen ? (
              <Minimize2 className="w-3.5 h-3.5 group-hover:scale-90 transition-transform" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Close Button: Just a cross (X) */}
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-700 transition-all cursor-pointer flex items-center justify-center group"
              aria-label="Close"
              title="Close"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          ) : (
            <Link
              href="/projects"
              className="w-8 h-8 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-700 transition-all flex items-center justify-center"
              aria-label="Close"
              title="Close"
            >
              <X className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="px-4 sm:px-8 md:px-10 py-6 max-w-4xl mx-auto w-full flex-grow space-y-8">
        {/* 1. PROJECT PREVIEW (Gallery) — ONLY FOR DESIGN & PRODUCT PROJECTS (No images for AI & ML) */}
        {!isAiMlProject && (
          <section suppressHydrationWarning className="space-y-4">
            {/* A. LAPTOP SCREEN MOCKUP (Simply Hemp & Ustart Web - Proportional 16:10, 80% opacity black circle cursor, Drag+Wheel scroll) */}
            {isLaptopMockup ? (
              <div className="w-full max-w-[580px] mx-auto space-y-3">
                {/* 1. Laptop Display Lid with Signature UI theme styling (Dark Forest Obsidian Lid + Sage Metallic Rim) */}
                <div className="relative mx-auto w-full rounded-t-[18px] sm:rounded-t-[22px] bg-gradient-to-b from-[#182317] via-[#111810] to-[#0a0f09] p-2 sm:p-2.5 pb-1.5 shadow-[0_22px_50px_rgba(10,20,10,0.45)] border-t-2 border-x-2 border-[#738b5d] ring-1 ring-[#92a878]/30">
                  {/* Top Bezel Webcam Notch */}
                  <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#050805] border border-[#3b4c33] shadow-inner flex items-center justify-center">
                      <div className="w-0.5 h-0.5 rounded-full bg-[#85c96a]" />
                    </div>
                  </div>

                  {/* 16:10 Screen Display Outer Frame (Never scrolls! Anchors buttons & counter) */}
                  <div className="relative w-full aspect-[16/10] bg-[#070b06] rounded-t-[7px] sm:rounded-t-[9px] overflow-hidden select-none ring-1 ring-black/80">
                    {/* Inner Scrollable Viewport with 80% opacity Black Circle Cursor & Drag/Wheel Scrolling */}
                    <div
                      ref={scrollContainerRef}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      className={`w-full h-full ${
                        project.slug === "simply-hemp" && currentImageIndex === 0
                          ? "overflow-hidden"
                          : "overflow-y-auto overflow-x-hidden scroll-smooth"
                      }`}
                      style={{ cursor: blackCircleCursor }}
                      tabIndex={0}
                      aria-label={`${project.title} laptop display`}
                    >
                      {isMounted ? (
                        project.slug === "simply-hemp" && currentImageIndex === 0 ? (
                          /* Simply Hemp Login page: fits in completely without scroll */
                          <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-1.5 bg-[#edebe6]">
                            <Image
                              src={activeImage.url}
                              alt={activeImage.alt || project.title}
                              fill
                              priority
                              draggable={false}
                              unoptimized={activeImage.url.endsWith(".svg")}
                              sizes="(max-width: 580px) 100vw, 580px"
                              className="object-contain pointer-events-none select-none"
                            />
                          </div>
                        ) : (
                          /* Scrollable pages (Simply Hemp pages & Ustart Web pages): scrollable via drag or wheel */
                          <div className="w-full relative bg-white">
                            <Image
                              src={activeImage.url}
                              alt={activeImage.alt || project.title}
                              width={1440}
                              height={3200}
                              priority
                              draggable={false}
                              unoptimized={activeImage.url.endsWith(".svg")}
                              sizes="(max-width: 580px) 100vw, 580px"
                              className="w-full h-auto block select-none pointer-events-none"
                            />
                          </div>
                        )
                      ) : (
                        <div className="w-full h-full bg-[#edebe6] animate-pulse" />
                      )}
                    </div>

                    {/* PINNED NAVIGATION ARROWS: Pinned over display lid, NEVER scrolls away! */}
                    {activeGallery.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevImage}
                          aria-label="Previous screen"
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/75 hover:bg-black/95 active:scale-90 text-white flex items-center justify-center transition-all border border-white/20 shadow-md cursor-pointer backdrop-blur-xs"
                        >
                          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextImage}
                          aria-label="Next screen"
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/75 hover:bg-black/95 active:scale-90 text-white flex items-center justify-center transition-all border border-white/20 shadow-md cursor-pointer backdrop-blur-xs"
                        >
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>

                        {/* Pinned Counter bottom-right (stays fixed, never scrolls away) */}
                        <div className="absolute bottom-2 right-2 z-20 pointer-events-none">
                          <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[10px] font-mono text-white/90 border border-white/10">
                            {currentImageIndex + 1} / {activeGallery.length}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Lower Bezel Bar */}
                  <div className="h-2.5 sm:h-3 w-full bg-[#0c120a] border-t border-[#1d2919] flex items-center justify-center">
                    <span className="text-[7px] sm:text-[7.5px] font-mono tracking-[0.28em] text-[#92a878]/80 uppercase font-bold select-none">
                      {project.slug === "simply-hemp"
                        ? "SIMPLY HEMP"
                        : project.slug === "ablecircle"
                        ? "ABLECIRCLE"
                        : "USTART"}
                    </span>
                  </div>
                </div>

                {/* 2. Laptop Base Deck (Signature UI Theme: Anodized Sage-Green Titanium Deck) */}
                <div className="relative w-full">
                  <div className="mx-auto w-[56%] sm:w-[48%] h-1 bg-[#131c12] rounded-b-xs border-b border-black/80 shadow-inner" />
                  <div className="relative mx-auto -mt-[1px] w-[104%] sm:w-[105%] -left-[2%] sm:-left-[2.5%] h-2.5 sm:h-3 bg-gradient-to-b from-[#4d613e] via-[#334229] to-[#1c2617] rounded-b-[10px] sm:rounded-b-[12px] border-t border-[#a2ba88] border-b border-[#0d140b] shadow-[0_16px_32px_rgba(15,25,12,0.4)] flex items-start justify-center">
                    <div className="w-12 sm:w-16 h-1 bg-[#0e150d] rounded-b-md border-x border-[#5c724b] shadow-inner" />
                  </div>
                  <div className="relative mx-auto -mt-[0.5px] w-[105%] sm:w-[106%] -left-[2.5%] sm:-left-[3%] h-1 bg-[#10170e] rounded-b-[12px] sm:rounded-b-[16px]" />
                  <div className="w-[94%] mx-auto h-2 sm:h-2.5 bg-black/40 blur-md rounded-full -mt-0.5" />
                </div>
              </div>
            ) : isLandscapePhoneMockup ? (
              /* C. PHONE FRAME (AntiSoch Mobile App - Landscape Phone Mockup) */
              <div className="w-full space-y-3 pt-1">
                {/* Landscape Phone Frame for horizontal game immersion */}
                <div className="relative mx-auto w-full max-w-[620px] aspect-[19.5/9]">
                  {/* Top Volume Buttons (since rotated horizontally) */}
                  <div className="absolute -top-[5px] left-[95px] sm:left-[110px] h-[5px] w-7 sm:w-8 bg-[#423150] rounded-t-xs border-x border-t border-[#59426c] shadow-xs" />
                  <div className="absolute -top-[5px] left-[130px] sm:left-[150px] h-[5px] w-7 sm:w-8 bg-[#423150] rounded-t-xs border-x border-t border-[#59426c] shadow-xs" />
                  {/* Bottom Power Button */}
                  <div className="absolute -bottom-[5px] left-[105px] sm:left-[120px] h-[5px] w-10 sm:w-12 bg-[#423150] rounded-b-xs border-x border-b border-[#59426c] shadow-xs" />

                  {/* Horizontal Phone Outer Chassis (Deep purple metallic titanium) */}
                  <div className="relative w-full h-full rounded-[38px] sm:rounded-[46px] bg-gradient-to-r from-[#2a1e35] via-[#1d1525] to-[#140e1b] p-2 sm:p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border-2 border-[#453257] ring-1 ring-white/10 flex items-center">
                    {/* Left Side Dynamic Island (since held in landscape) */}
                    <div className="absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center">
                      <div className="h-18 sm:h-22 w-5 sm:w-6.5 rounded-full bg-black flex flex-col items-center justify-between py-2 sm:py-2.5 shadow-sm border border-neutral-800/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#111115]" />
                        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#0a101b] border border-[#1b2b45] flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-emerald-500/70" />
                        </div>
                      </div>
                    </div>

                    {/* Display Screen */}
                    <div className="relative w-full h-full rounded-[32px] sm:rounded-[40px] overflow-hidden bg-neutral-950 flex items-center justify-center border border-black/80">
                      {/* Image Screen */}
                      {isMounted ? (
                        <Image
                          src={activeImage.url}
                          alt={activeImage.alt || project.title}
                          fill
                          priority
                          unoptimized={activeImage.url.endsWith(".svg")}
                          sizes="(max-width: 620px) 100vw, 620px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-900 animate-pulse" />
                      )}

                      {/* Two Arrow Buttons */}
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        aria-label="Previous screen"
                        className="absolute left-9 sm:left-11 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/70 hover:bg-black/95 active:scale-90 text-white flex items-center justify-center transition-all border border-white/20 shadow-md cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextImage}
                        aria-label="Next screen"
                        className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/70 hover:bg-black/95 active:scale-90 text-white flex items-center justify-center transition-all border border-white/20 shadow-md cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>

                      {/* In-screen Counter */}
                      <div className="absolute bottom-2.5 right-3 z-20 pointer-events-none">
                        <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-white border border-white/15">
                          {currentImageIndex + 1} / {activeGallery.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* D. STANDARD DEFAULT PREVIEW (e.g. AbleCircle) */
              <div
                suppressHydrationWarning
                className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 shadow-md flex items-center justify-center bg-neutral-900"
                style={{ aspectRatio: "16 / 10", minHeight: "280px" }}
              >
                {isMounted ? (
                  <>
                    <Image
                      src={activeImage.url}
                      alt={activeImage.alt || project.title}
                      fill
                      priority
                      unoptimized={activeImage.url.endsWith(".svg")}
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-contain transition-opacity duration-300"
                    />

                    <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
                      <div className="pointer-events-auto px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono font-medium text-white border border-white/15 shadow-sm">
                        {currentImageIndex + 1} / {activeGallery.length}
                      </div>

                      {activeGallery.length > 1 && (
                        <div className="pointer-events-auto flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handlePrevImage}
                            aria-label="Previous screenshot"
                            className="w-8 h-8 rounded-full bg-black/70 hover:bg-black/95 active:scale-95 text-white flex items-center justify-center transition-all border border-white/15 shadow-sm cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={handleNextImage}
                            aria-label="Next screenshot"
                            className="w-8 h-8 rounded-full bg-black/70 hover:bg-black/95 active:scale-95 text-white flex items-center justify-center transition-all border border-white/15 shadow-sm cursor-pointer"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full min-h-[280px] bg-neutral-900 animate-pulse flex items-center justify-center">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
                      {project.category}
                    </span>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* 2. PROJECT OVERVIEW HEADER */}
        <section className="space-y-4 pt-1">
          {/* Metadata Row: Category / Date / Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              {project.category}
            </span>

            <div className="flex items-center gap-2.5">
              <span className="text-neutral-500 uppercase tracking-wider text-[11.5px]">
                {project.date}
              </span>
              {project.status && (
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-300 text-[10.5px] font-mono text-neutral-800 tracking-wide">
                  {project.status}
                </span>
              )}
            </div>
          </div>

          {/* Project Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-[1.1]">
            {project.title}
            {project.subtitle && (project.slug === "ablecircle" || project.slug === "antisoch") && (
              <span className="font-semibold text-neutral-500 text-2xl sm:text-3xl md:text-4xl">
                {" "}– {project.subtitle}
              </span>
            )}
          </h1>

          {/* Quick Access Link Buttons: Try it Now for deployed, Logo Buttons for GitHub, Figma, Behance */}
          {hasAnyLink && (
            <div className="flex flex-wrap items-center gap-2.5 pt-2 pb-1">
              {/* Deployed link / Live Demo: "Try it Now" */}
              {demoLink && (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#92a878] text-[#13220e] hover:bg-[#839b69] border border-[#7a9161] font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-xs group cursor-pointer"
                >
                  <span>Try it Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {/* Figma Logo Button */}
              {(figmaLink || (prototypeLink && prototypeLink.includes("figma"))) && (
                <a
                  href={figmaLink || prototypeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Figma"
                  aria-label="Figma"
                  className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-900 text-neutral-800 hover:text-white border border-neutral-300 hover:border-neutral-900 flex items-center justify-center transition-all shadow-2xs group cursor-pointer"
                >
                  <FigmaIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              )}

              {/* Behance Logo Button */}
              {behanceLink && (
                <a
                  href={behanceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Behance"
                  aria-label="Behance"
                  className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-900 text-neutral-800 hover:text-white border border-neutral-300 hover:border-neutral-900 flex items-center justify-center transition-all shadow-2xs group cursor-pointer"
                >
                  <BehanceIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              )}

              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-900 text-neutral-800 hover:text-white border border-neutral-300 hover:border-neutral-900 flex items-center justify-center transition-all shadow-2xs group cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              )}
            </div>
          )}

          {/* Project Description / Bullet Points */}
          {project.bulletPoints && project.bulletPoints.length > 0 ? (
            <div className="space-y-3 pt-2">
              <ul className="space-y-3 font-mono text-xs sm:text-[13.5px] text-neutral-700 leading-relaxed list-outside pl-5 list-disc marker:text-[#92a878]">
                {project.bulletPoints.map((point, idx) => (
                  <li key={idx} className="pl-1">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="space-y-3 pt-1">
              <p className="text-base sm:text-lg text-neutral-800 font-medium leading-relaxed font-sans">
                {project.oneLiner}
              </p>
              <p className="text-sm sm:text-[15px] text-neutral-600 leading-[1.7] font-mono">
                {project.overview}
              </p>
            </div>
          )}
        </section>

        {/* 4. KEYWORDS & TECH STACK */}
        <section className="space-y-3 pt-1">
          <h2 className="text-xs font-bold font-mono tracking-[0.18em] uppercase text-neutral-500">
            Skills &amp; Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2 pt-0.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800 hover:border-neutral-400 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Bottom Navigation Strip: Prev Project / Next Project */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          {onNavigate ? (
            <button
              type="button"
              onClick={() => onNavigate(prevProject.slug)}
              className="inline-flex items-center gap-2 hover:text-neutral-900 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Previous: {prevProject.title}</span>
            </button>
          ) : (
            <Link
              href={`/work/${prevProject.slug}`}
              className="inline-flex items-center gap-2 hover:text-neutral-900 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Previous: {prevProject.title}</span>
            </Link>
          )}

          {onNavigate ? (
            <button
              type="button"
              onClick={() => onNavigate(nextProject.slug)}
              className="inline-flex items-center gap-2 hover:text-neutral-900 transition-colors cursor-pointer group font-semibold text-neutral-900"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-2 hover:text-neutral-900 transition-colors group font-semibold text-neutral-900"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  // If used as overlay drawer
  if (isOverlay) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
        {/* Click outside to close backdrop */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
          aria-label="Close overlay"
        />

        {/* Sliding Panel / Sidebar: Clean UI theme background with no photo background */}
        <div
          className={`relative z-10 h-full overflow-y-auto text-neutral-900 bg-[#f7f8f4] shadow-2xl flex flex-col border-l border-neutral-300/80 transition-all duration-300 animate-slideLeft ${
            isFullScreen
              ? "w-full max-w-none"
              : "w-full max-w-2xl lg:max-w-3xl xl:max-w-[780px]"
          }`}
        >
          {content}
        </div>
      </div>
    );
  }

  // Standalone page render
  return content;
};
