"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CardLightReflection } from "@/components/ui/CardLightReflection";

interface CreativeLicenseIntroProps {
  onIntroComplete: () => void;
  onStartReveal?: () => void;
}

export const CreativeLicenseIntro: React.FC<CreativeLicenseIntroProps> = ({
  onIntroComplete,
  onStartReveal,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const cardElementRef = useRef<HTMLDivElement | null>(null);
  const instructionRef = useRef<HTMLParagraphElement | null>(null);
  const whiteOverlayRef = useRef<HTMLDivElement | null>(null);

  // States
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isEntering, setIsEntering] = useState(false);
  const [isWhiteScreenActive, setIsWhiteScreenActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // GSAP animation references
  const idleTimeline = useRef<gsap.core.Tween | null>(null);

  // Audio reference for entrance sequence sound
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Hold tracking refs
  const holdStartTime = useRef<number | null>(null);
  const holdRafId = useRef<number | null>(null);
  const isHoldingKey = useRef<string | null>(null);

  // Preload and get/create reference audio on client mount
  const getOrCreateAudio = useCallback(() => {
    if (!audioRef.current && typeof window !== "undefined") {
      const audio = new Audio("/intro_sequence_sfx.mp3");
      audio.preload = "auto";
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  useEffect(() => {
    getOrCreateAudio();

    // User interaction unlocker: primes audio on the very first touch/click anywhere
    const unlockAudio = () => {
      const audio = getOrCreateAudio();
      if (audio && audio.paused) {
        audio.load();
      }
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true, passive: true });
    window.addEventListener("touchstart", unlockAudio, { once: true, passive: true });
    window.addEventListener("click", unlockAudio, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("click", unlockAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [getOrCreateAudio]);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Idle floating animation helper
  const startIdleAnimation = useCallback(() => {
    const card = cardElementRef.current;
    if (!card || reducedMotion || isEntering) return;
    idleTimeline.current?.kill();
    gsap.killTweensOf(card);

    idleTimeline.current = gsap.to(card, {
      y: -7,
      rotation: 0.6,
      duration: 2.3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, [reducedMotion, isEntering]);

  // Initial mount idle animation
  useEffect(() => {
    startIdleAnimation();
    return () => {
      idleTimeline.current?.kill();
    };
  }, [startIdleAnimation]);

  // Finish entrance sequence and reveal portfolio
  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem("palak_intro_seen", "true");
    } catch {
      // Ignore sessionStorage exceptions
    }
    idleTimeline.current?.kill();
    if (audioRef.current) {
      const audio = audioRef.current;
      gsap.killTweensOf(audio);
      gsap.to(audio, {
        volume: 0,
        duration: 0.45,
        ease: "power1.out",
        onComplete: () => {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 1;
        },
      });
    }
    onIntroComplete();
  }, [onIntroComplete]);

  // Entrance transition once hold duration completes:
  // Snaps to knife-edge orientation, cuts to solid white screen, and smoothly reveals portfolio ("white screen and boom")
  const triggerEntrance = useCallback(() => {
    setIsEntering(true);
    setIsHolding(false);
    holdStartTime.current = null;
    if (holdRafId.current) {
      cancelAnimationFrame(holdRafId.current);
      holdRafId.current = null;
    }
    idleTimeline.current?.kill();

    // Haptic vibration on supported devices
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([20, 40, 20, 50, 20]);
      } catch {
        // Safe fallback
      }
    }

    if (reducedMotion) {
      // Reduced motion: 400ms crossfade
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.inOut",
        onComplete: finishIntro,
      });
      return;
    }

    const card = cardElementRef.current;
    const overlay = whiteOverlayRef.current;
    if (!card || !overlay) {
      finishIntro();
      return;
    }

    // 1. Snap card to final knife-edge orientation at threshold
    card.style.transform =
      "translate3d(0px, 0px, 0px) rotateX(24deg) rotateY(-89deg) rotateZ(-30deg) scale(0.68)";

    // 2. Instant cut to solid white screen ("simply white screen and boom")
    setIsWhiteScreenActive(true);
    gsap.set(overlay, { opacity: 1, display: "block" });

    // 3. Immediately hide green container and card behind the white sheet
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
    }

    // 4. Reveal the main portfolio underneath the solid white screen
    onStartReveal?.();

    // 5. Hold solid white flash for 90ms punch, then smoothly fade from white directly into the portfolio
    setTimeout(() => {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.42,
        ease: "power2.out",
        onComplete: () => {
          setIsWhiteScreenActive(false);
          finishIntro();
        },
      });
    }, 90);
  }, [reducedMotion, finishIntro, onStartReveal]);

  // Handle release: if user releases before hold completes, stop movement immediately & recoil smoothly
  const handleRelease = useCallback(() => {
    if (isEntering) return;

    const elapsed = holdStartTime.current ? performance.now() - holdStartTime.current : 0;
    setIsHolding(false);
    isHoldingKey.current = null;
    holdStartTime.current = null;

    if (holdRafId.current) {
      cancelAnimationFrame(holdRafId.current);
      holdRafId.current = null;
    }

    setHoldProgress(0);

    // Smoothly fade out audio on early release to prevent click/pop
    if (audioRef.current) {
      const audio = audioRef.current;
      gsap.killTweensOf(audio);
      gsap.to(audio, {
        volume: 0,
        duration: 0.1,
        ease: "power1.out",
        onComplete: () => {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 1;
        },
      });
    }

    const card = cardElementRef.current;
    const instruction = instructionRef.current;
    if (!card) return;

    if (tiltResetTimer.current) {
      clearTimeout(tiltResetTimer.current);
      tiltResetTimer.current = null;
    }
    isHoveredRef.current = false;
    card.style.transition = "none";

    // Smooth graceful recoil back to resting idle position
    gsap.killTweensOf(card);
    gsap.to(card, {
      transform: "translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)",
      duration: 0.34,
      ease: "power2.out",
      onComplete: () => {
        card.style.transform = "";
        if (!isEntering) {
          startIdleAnimation();
        }
      },
    });

    if (instruction) {
      instruction.style.opacity = "1";
    }
  }, [isEntering, startIdleAnimation]);

  // Instant continuous chaotic 3D movement loop while click/press is held down:
  // Starts on frame 1 without any initial delay, continuously revolves across X, Y, Z axes
  // Stops if released early, or finishes at 1.2s threshold and unlocks portfolio
  const startHoldLoop = useCallback(
    (durationMs: number) => {
      if (isEntering) return;
      setIsHolding(true);

      const card = cardElementRef.current;
      const instruction = instructionRef.current;
      if (!card) return;

      if (tiltResetTimer.current) {
        clearTimeout(tiltResetTimer.current);
        tiltResetTimer.current = null;
      }
      isHoveredRef.current = false;
      card.style.transition = "none";

      // Kill any active idle or recoil tweens so they don't fight the continuous 3D transforms
      idleTimeline.current?.kill();
      gsap.killTweensOf(card);

      // Play audio synchronously with instant movement
      const audio = getOrCreateAudio();
      if (audio) {
        gsap.killTweensOf(audio);
        audio.volume = 1;
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Intro audio playback blocked by browser:", err);
          });
        }
      }

      holdStartTime.current = performance.now();

      const tick = (now: number) => {
        if (!holdStartTime.current) return;
        const elapsed = now - holdStartTime.current;
        const progress = Math.min(1, elapsed / durationMs);

        setHoldProgress(progress);

        if (!reducedMotion) {
          // Energetic yet clear 3D turns showing full revolutions across all axes
          const ramp = Math.min(1, elapsed / 80);

          // Horizontal 3D revolutions (tuned up slightly from 0.28 to 0.38)
          const rotY = (elapsed * 0.38 + Math.sin(elapsed * 0.0048) * 45) * ramp;

          // Vertical end-over-end 3D flips (tuned up slightly from 0.18 to 0.26)
          const rotX = (elapsed * 0.26 + Math.cos(elapsed * 0.0055) * 28) * ramp;

          // Diagonal barrel rolls along Z-axis (tuned up slightly from 0.14 to 0.19)
          const rotZ = (elapsed * 0.19 + Math.sin(elapsed * 0.0065) * 22) * ramp;

          // Spatial drift and physical presence
          const transX = Math.sin(elapsed * 0.008) * 15 * ramp;
          const transY = Math.cos(elapsed * 0.009) * 12 * ramp;
          const scale = 1 - progress * 0.10;

          // Direct DOM style update for 120fps hardware-accelerated 3D transforms
          card.style.transform = `translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        }

        // Instruction text dims as hold progresses
        if (instruction) {
          instruction.style.opacity = Math.max(0, 1 - progress * 1.6).toString();
        }

        if (progress >= 1) {
          // Hold duration reached: ends immediately and opens portfolio!
          triggerEntrance();
        } else {
          holdRafId.current = requestAnimationFrame(tick);
        }
      };

      holdRafId.current = requestAnimationFrame(tick);
    },
    [isEntering, reducedMotion, triggerEntrance, getOrCreateAudio]
  );

  // Window-level release listener: reliably detects release ANYWHERE in the window while holding
  useEffect(() => {
    if (!isHolding) return;

    const onPointerRelease = () => {
      handleRelease();
    };

    window.addEventListener("pointerup", onPointerRelease);
    window.addEventListener("pointercancel", onPointerRelease);
    window.addEventListener("mouseup", onPointerRelease);
    window.addEventListener("touchend", onPointerRelease);

    return () => {
      window.removeEventListener("pointerup", onPointerRelease);
      window.removeEventListener("pointercancel", onPointerRelease);
      window.removeEventListener("mouseup", onPointerRelease);
      window.removeEventListener("touchend", onPointerRelease);
    };
  }, [isHolding, handleRelease]);

  // Interactive 3D Cursor Tilt: matches the main portfolio hero card behavior on hover
  const isHoveredRef = useRef(false);
  const tiltResetTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; // Touch devices interact via long-press
    if (isHolding || isEntering || reducedMotion) return;
    const card = cardElementRef.current;
    if (!card) return;

    if (tiltResetTimer.current) {
      clearTimeout(tiltResetTimer.current);
      tiltResetTimer.current = null;
    }

    if (!isHoveredRef.current) {
      isHoveredRef.current = true;
      idleTimeline.current?.kill();
      gsap.killTweensOf(card);
    }

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 14;
    const rotY = (x / (rect.width / 2)) * 14;

    card.style.transition = "transform 0.18s ease-out";
    card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`;
  };

  const handlePointerLeave = () => {
    if (isHolding || isEntering || reducedMotion) return;
    const card = cardElementRef.current;
    if (!card) return;

    card.style.transition = "transform 0.25s ease-out";
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

    if (tiltResetTimer.current) clearTimeout(tiltResetTimer.current);
    tiltResetTimer.current = setTimeout(() => {
      isHoveredRef.current = false;
      if (!isHolding && !isEntering) {
        card.style.transition = "";
        card.style.transform = "";
        startIdleAnimation();
      }
    }, 250);
  };

  // Pointer down handler on the card or instruction wrapper: instant reaction on click / press!
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.button !== undefined) return; // Only primary button
    if (isEntering || isHolding) return;

    if (tiltResetTimer.current) {
      clearTimeout(tiltResetTimer.current);
      tiltResetTimer.current = null;
    }
    isHoveredRef.current = false;
    if (cardElementRef.current) {
      cardElementRef.current.style.transition = "none";
    }

    const duration = reducedMotion ? 800 : 1800;
    startHoldLoop(duration);
  };

  // Keyboard support: Space / Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isEntering || isHolding) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      isHoldingKey.current = e.key;

      if (tiltResetTimer.current) {
        clearTimeout(tiltResetTimer.current);
        tiltResetTimer.current = null;
      }
      isHoveredRef.current = false;
      if (cardElementRef.current) {
        cardElementRef.current.style.transition = "none";
      }

      const duration = reducedMotion ? 800 : 1800;
      startHoldLoop(duration);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (isHoldingKey.current === e.key) {
      handleRelease();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (tiltResetTimer.current) clearTimeout(tiltResetTimer.current);
      if (holdRafId.current) cancelAnimationFrame(holdRafId.current);
      idleTimeline.current?.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center select-none overflow-hidden prevent-select"
        style={{
          backgroundColor: "var(--CreativeLicenceBackground, #92a878)",
          transition: "background-color 0.3s ease",
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Hold Target Container (Perspective parent: 1200px) */}
        <div
          ref={cardWrapperRef}
          role="button"
          tabIndex={0}
          aria-label="Hold to enter portfolio"
          className="relative flex flex-col items-center justify-center cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:ring-offset-8 focus-visible:ring-offset-[#92a878] perspective-1200"
          style={{
            touchAction: "none",
            WebkitTouchCallout: "none",
            perspective: 1200,
          }}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleRelease}
        >
          {/* 3D Card Unit: preserve-3d allows continuous uniform tumbling across all axes */}
          <div
            ref={cardElementRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className={`relative will-change-transform transform-style-3d transition-shadow duration-300 ${
              isHolding ? "card-holding-shadow" : "card-floating-shadow"
            }`}
            style={{
              width: "clamp(300px, 80vw, 560px)",
              aspectRatio: "2273 / 1409",
              transformStyle: "preserve-3d",
              transformOrigin: "50% 50% 0px",
            }}
          >
            <Image
              src="/creative-license.png"
              alt="Palak's Creative License"
              width={2273}
              height={1409}
              priority
              unoptimized
              className="w-full h-auto pointer-events-none select-none block"
              draggable={false}
            />

            {/* Persistent Cursor-Controlled White Light Reflection */}
            <CardLightReflection />
          </div>

          {/* Centered Instruction Text Directly Beneath Card */}
          <div className="mt-7 flex flex-col items-center select-none pointer-events-none">
            <p
              ref={instructionRef}
              className="text-base sm:text-lg md:text-xl font-bold text-white tracking-wider text-center drop-shadow-md transition-opacity duration-150"
            >
              long press this to enter
            </p>
          </div>
        </div>



        {/* Accessibility note for keyboard users */}
        <span className="sr-only">
          Press and hold Space or Enter key for 1.8 seconds to enter the portfolio.
        </span>
      </div>

      {/* Solid White Screen Transition Overlay ("simply white screen and boom") */}
      <div
        ref={whiteOverlayRef}
        className="fixed inset-0 z-50 bg-white pointer-events-none"
        style={{
          display: isWhiteScreenActive ? "block" : "none",
          opacity: 0,
          willChange: "opacity",
        }}
      />
    </>
  );
};
