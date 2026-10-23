"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

interface HoldButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  holdDurationMs?: number;
  title?: string;
}

export const HoldButton: React.FC<HoldButtonProps> = ({
  href,
  children,
  className = "",
  holdDurationMs = 850,
  title,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [btnWidth, setBtnWidth] = useState<number | null>(null);

  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isCompletedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activePointerIdRef = useRef<number | null>(null);

  // Stop hold animation and reset both visual progress and sound immediately
  const stopHoldAndReset = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    startTimeRef.current = null;
    setIsHolding(false);
    setProgress(0);

    // Stop and reset audio immediately to keep sound and progress in perfect sync
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1;
      } catch {
        // Safe fallback
      }
    }
  }, []);

  // Always reset completed state when route/pathname changes
  useEffect(() => {
    isCompletedRef.current = false;
    stopHoldAndReset();
  }, [pathname, stopHoldAndReset]);

  // Handle bfcache back/forward navigation
  useEffect(() => {
    const handlePageShow = () => {
      isCompletedRef.current = false;
      stopHoldAndReset();
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [stopHoldAndReset]);

  // Measure button width for precise text overlay alignment
  const updateWidth = useCallback(() => {
    if (buttonRef.current) {
      setBtnWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  // Audio helper
  const getAudio = useCallback(() => {
    if (!audioRef.current && typeof window !== "undefined") {
      const audio = new Audio("/intro_sequence_sfx.mp3");
      audio.preload = "auto";
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  // Preload audio on initial mount for instant zero-latency playback
  useEffect(() => {
    const a = getAudio();
    if (a) {
      a.load();
    }
  }, [getAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } catch {}
        audioRef.current = null;
      }
    };
  }, []);

  const triggerNavigation = useCallback(() => {
    isCompletedRef.current = true;
    setIsHolding(false);
    setProgress(1);
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    startTimeRef.current = null;

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(30);
      } catch {
        // Safe fallback
      }
    }

    router.push(href);

    // Auto-reset completed flag after short delay so browser back navigation works immediately
    setTimeout(() => {
      isCompletedRef.current = false;
      setProgress(0);
      setIsHolding(false);
    }, 500);
  }, [href, router]);

  // Release handler: early release stops animation and resets sound immediately
  const handleRelease = useCallback(() => {
    if (isCompletedRef.current) return;
    stopHoldAndReset();
  }, [stopHoldAndReset]);

  // Pointer Down (Mouse click or finger press)
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    // Only primary button (left mouse or touch)
    if (e.button !== 0 && e.button !== undefined) return;
    if (isCompletedRef.current) return;

    // Capture pointer so moves outside don't lose the hold
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
      activePointerIdRef.current = e.pointerId;
    } catch {}

    updateWidth();
    setIsHolding(true);
    setProgress(0);
    startTimeRef.current = performance.now();

    const audio = getAudio();
    if (audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } catch {}
    }

    const tick = (now: number) => {
      if (!startTimeRef.current) return;
      const elapsed = now - startTimeRef.current;
      const p = Math.min(1, elapsed / holdDurationMs);
      setProgress(p);

      if (p >= 1) {
        triggerNavigation();
      } else {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(tick);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    try {
      if (activePointerIdRef.current !== null && e.currentTarget.hasPointerCapture(activePointerIdRef.current)) {
        e.currentTarget.releasePointerCapture(activePointerIdRef.current);
      }
    } catch {}
    activePointerIdRef.current = null;
    handleRelease();
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    try {
      if (activePointerIdRef.current !== null && e.currentTarget.hasPointerCapture(activePointerIdRef.current)) {
        e.currentTarget.releasePointerCapture(activePointerIdRef.current);
      }
    } catch {}
    activePointerIdRef.current = null;
    handleRelease();
  };

  // Prevent default click navigation: only a full long-press triggers navigation
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Keyboard navigation support: holding Space or Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isCompletedRef.current || isHolding) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      updateWidth();
      setIsHolding(true);
      setProgress(0);
      startTimeRef.current = performance.now();

      const audio = getAudio();
      if (audio) {
        try {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 1;
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } catch {}
      }

      const tick = (now: number) => {
        if (!startTimeRef.current) return;
        const elapsed = now - startTimeRef.current;
        const p = Math.min(1, elapsed / holdDurationMs);
        setProgress(p);

        if (p >= 1) {
          triggerNavigation();
        } else {
          rafIdRef.current = requestAnimationFrame(tick);
        }
      };

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(tick);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleRelease();
    }
  };

  // Window-level safety listener to handle release anywhere if pointer capture is unsupported
  useEffect(() => {
    if (!isHolding) return;

    const onWindowRelease = () => {
      handleRelease();
    };

    window.addEventListener("pointerup", onWindowRelease);
    window.addEventListener("pointercancel", onWindowRelease);
    window.addEventListener("mouseup", onWindowRelease);
    window.addEventListener("touchend", onWindowRelease);

    return () => {
      window.removeEventListener("pointerup", onWindowRelease);
      window.removeEventListener("pointercancel", onWindowRelease);
      window.removeEventListener("mouseup", onWindowRelease);
      window.removeEventListener("touchend", onWindowRelease);
    };
  }, [isHolding, handleRelease]);

  return (
    <button
      ref={buttonRef}
      type="button"
      title={title || "Press and hold to activate"}
      aria-label={title || "Press and hold to activate"}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative overflow-hidden select-none cursor-pointer border border-neutral-900 bg-white/70 shadow-2xs font-mono transition-transform duration-150 active:scale-[0.98] touch-none ${className}`}
      style={{
        WebkitTouchCallout: "none",
        userSelect: "none",
      }}
    >
      {/* 1. Base Layer: Default black text on light button */}
      <div className="flex items-center justify-center gap-1.5 w-full h-full text-neutral-900 pointer-events-none">
        {children}
      </div>

      {/* 2. Black Progress Fill Layer (expands from left across the button) */}
      <div
        className="absolute inset-y-0 left-0 bg-neutral-900 overflow-hidden pointer-events-none"
        style={{
          width: `${progress * 100}%`,
          transition: isHolding ? "none" : "width 0.15s ease-out",
        }}
      >
        {/* 3. White Text Overlay (fixed at original button width so text never shrinks or warps) */}
        <div
          className="h-full flex items-center justify-center gap-1.5 text-white pointer-events-none"
          style={{
            width: btnWidth ? `${btnWidth}px` : "100%",
          }}
        >
          {children}
        </div>
      </div>
    </button>
  );
};
