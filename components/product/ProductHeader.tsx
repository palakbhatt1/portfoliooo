"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ProductHeader: React.FC = () => {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isProjects = pathname.startsWith("/projects") || pathname.startsWith("/work");
  const isResume = pathname.startsWith("/resume");
  const isAbout = pathname.startsWith("/about");

  return (
    <header className="w-full max-w-4xl mx-auto px-6 sm:px-8 pt-6 sm:pt-10 pb-4 flex items-center justify-between font-space-mono">
      {/* Left: Emblem + PALAK BHATT */}
      <Link href="/" className="flex items-center gap-3 group text-neutral-900">
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
          <svg className="w-5 h-5 text-neutral-900" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2.5C13.8 2.5 15 3.8 15 5.5C15 6.8 16.2 7.8 17.5 7.8C19.2 7.8 20.5 9 20.5 10.8C20.5 12.5 19.2 13.8 17.5 13.8C16.2 13.8 15 14.8 15 16C15 17.8 13.8 19 12 19C10.2 19 9 17.8 9 16C9 14.8 7.8 13.8 6.5 13.8C4.8 13.8 3.5 12.5 3.5 10.8C3.5 9 4.8 7.8 6.5 7.8C7.8 7.8 9 6.8 9 5.5C9 3.8 10.2 2.5 12 2.5Z"
              stroke="#111111"
              strokeWidth="1.8"
              fill="white"
            />
            <circle cx="12" cy="10.8" r="1.5" fill="#111111" />
          </svg>
        </div>
        <span className="text-xs sm:text-[13px] font-bold tracking-[0.24em] uppercase text-neutral-900">
          PALAK BHATT
        </span>
      </Link>

      {/* Right: Nav Items (Home, Projects, Resume, Contact) */}
      <nav className="flex items-center gap-5 sm:gap-7 text-xs sm:text-[13px]">
        {/* Home */}
        <div className="relative flex flex-col items-center">
          <Link
            href="/"
            className={`transition-colors ${
              isHome
                ? "font-bold text-neutral-900"
                : "font-medium text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Home
          </Link>
          {isHome && (
            <div className="nav-slider">
              <div className="nav-slider-line" />
              <div className="nav-slider-dot" />
              <div className="nav-slider-line" />
            </div>
          )}
        </div>

        {/* Projects */}
        <div className="relative flex flex-col items-center">
          <Link
            href="/projects"
            className={`transition-colors ${
              isProjects
                ? "font-bold text-neutral-900"
                : "font-medium text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Projects
          </Link>
          {isProjects && (
            <div className="nav-slider">
              <div className="nav-slider-line" />
              <div className="nav-slider-dot" />
              <div className="nav-slider-line" />
            </div>
          )}
        </div>

        {/* Resume */}
        <div className="relative flex flex-col items-center">
          <Link
            href="/resume"
            className={`transition-colors ${
              isResume
                ? "font-bold text-neutral-900"
                : "font-medium text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Resume
          </Link>
          {isResume && (
            <div className="nav-slider">
              <div className="nav-slider-line" />
              <div className="nav-slider-dot" />
              <div className="nav-slider-line" />
            </div>
          )}
        </div>

        {/* About */}
        <div className="relative flex flex-col items-center">
          <Link
            href="/about"
            className={`transition-colors ${
              isAbout
                ? "font-bold text-neutral-900"
                : "font-medium text-neutral-600 hover:text-neutral-900"
            }`}
          >
            About
          </Link>
          {isAbout && (
            <div className="nav-slider">
              <div className="nav-slider-line" />
              <div className="nav-slider-dot" />
              <div className="nav-slider-line" />
            </div>
          )}
        </div>

        {/* Contact anchor */}
        <div className="relative flex flex-col items-center">
          <a
            href="/#contact"
            className="font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};
