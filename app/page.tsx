"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CreativeLicenseIntro } from "@/components/intro/CreativeLicenseIntro";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductEducationExperience } from "@/components/product/ProductEducationExperience";
import { ProductWorkWithConnect } from "@/components/product/ProductWorkWithConnect";
import { ProductFooter } from "@/components/product/ProductFooter";
import { LicenseModal } from "@/components/home/LicenseModal";

export default function Home() {
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [introActive, setIntroActive] = useState(true);
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  // Check sessionStorage on client mount
  useEffect(() => {
    try {
      const params =
        typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const forceIntro = params?.get("intro") === "true" || params?.get("intro") === "1";
      const skipIntro = params?.get("skipIntro") === "true";
      // Purge any stale localStorage entry so new tabs always trigger the creative intro
      try {
        localStorage.removeItem("palak_intro_seen");
      } catch {
        // Ignore
      }

      const seen = sessionStorage.getItem("palak_intro_seen") === "true";

      if ((seen || skipIntro) && !forceIntro) {
        setIntroActive(false);
        setIsPortfolioVisible(true);
      } else if (forceIntro) {
        setIntroActive(true);
        setIsPortfolioVisible(false);
      } else {
        setIntroActive(true);
      }
    } catch {
      setIntroActive(false);
      setIsPortfolioVisible(true);
    }
    setHasCheckedSession(true);
  }, []);

  // Reveal portfolio underneath white flash before intro overlay unmounts
  const handleStartReveal = useCallback(() => {
    try {
      sessionStorage.setItem("palak_intro_seen", "true");
    } catch {
      // Ignore
    }
    setIsPortfolioVisible(true);
  }, []);

  // Intro completion handler
  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem("palak_intro_seen", "true");
    } catch {
      // Ignore
    }
    setIsPortfolioVisible(true);
    setIntroActive(false);
  }, []);

  // Replay intro handler
  const handleReplayIntro = useCallback(() => {
    try {
      sessionStorage.removeItem("palak_intro_seen");
    } catch {
      // Ignore
    }
    setIsPortfolioVisible(false);
    setIntroActive(true);
  }, []);

  return (
    <>
      {/* 1. Main Product Portfolio (Pre-mounted underneath intro to prevent loading flash) */}
      <div
        id="portfolio-root"
        className="relative min-h-screen w-full bg-[#92a878] text-neutral-900 transition-opacity duration-300 font-space-mono overflow-x-hidden selection:bg-[#9ab787] selection:text-neutral-900"
        style={{
          visibility: !introActive || isPortfolioVisible ? "visible" : "hidden",
          opacity: !introActive || isPortfolioVisible ? 1 : 0,
        }}
        aria-hidden={introActive && !isPortfolioVisible}
      >
        {/* Fullscreen Pixel Art Scenery Background with 80% opacity over theme green */}
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

        {/* Outer Layout Margin Wrapper (framing the translucent card over the pixel background) */}
        <div className="relative z-10 min-h-screen px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 flex flex-col justify-between">
          
          {/* Translucent White Main Card Container */}
          <div className="w-full max-w-4xl mx-auto bg-white/90 sm:bg-white/94 backdrop-blur-md rounded-[24px] sm:rounded-[32px] border border-white/70 shadow-2xl relative flex flex-col my-auto">
            {/* Top Navigation Bar */}
            <ProductHeader />

            {/* Delicate Hairline Separator */}
            <div className="w-full border-b border-neutral-200/80" />

            {/* Main Content Layout inside the white box */}
            <main className="w-full max-w-4xl mx-auto px-6 sm:px-8 pt-4 sm:pt-6 pb-16 sm:pb-20 text-neutral-900 space-y-10 sm:space-y-12">
              <ProductHero />
              <ProductEducationExperience />
              <ProductWorkWithConnect />
              <ProductFooter />
            </main>
          </div>
        </div>

        {/* 3D License Modal */}
        <LicenseModal
          isOpen={isLicenseModalOpen}
          onClose={() => setIsLicenseModalOpen(false)}
          onReplayIntro={handleReplayIntro}
        />
      </div>

      {/* 2. Interactive Creative License Intro Sequence */}
      {introActive && hasCheckedSession && (
        <CreativeLicenseIntro
          onIntroComplete={handleIntroComplete}
          onStartReveal={handleStartReveal}
        />
      )}
    </>
  );
}
