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
      const isDev = process.env.NODE_ENV === "development";
      const params =
        typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const forceIntro = params?.get("intro") === "true" || params?.get("intro") === "1";
      const seen = sessionStorage.getItem("palak_intro_seen");
      if (seen === "true" && !isDev && !forceIntro) {
        setIntroActive(false);
        setIsPortfolioVisible(true);
      } else {
        setIntroActive(true);
      }
    } catch {
      setIntroActive(true);
    }
    setHasCheckedSession(true);
  }, []);

  // Reveal portfolio underneath white flash before intro overlay unmounts
  const handleStartReveal = useCallback(() => {
    setIsPortfolioVisible(true);
  }, []);

  // Intro completion handler
  const handleIntroComplete = useCallback(() => {
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
        className="relative min-h-screen bg-white text-neutral-900 transition-opacity duration-300 font-space-mono"
        style={{
          visibility: !introActive || isPortfolioVisible ? "visible" : "hidden",
          opacity: !introActive || isPortfolioVisible ? 1 : 0,
        }}
        aria-hidden={introActive && !isPortfolioVisible}
      >
        {/* Editorial Header */}
        <ProductHeader />

        {/* Main Content Layout */}
        <main className="max-w-4xl mx-auto px-6 sm:px-8 pt-4 sm:pt-6 pb-24 text-neutral-900">
          <ProductHero />
          <ProductEducationExperience />
          <ProductWorkWithConnect />
          <ProductFooter />
        </main>

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
