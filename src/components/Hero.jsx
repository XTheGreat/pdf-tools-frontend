import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { Zap, Lock, Sparkles } from "lucide-react";

// Device detection utility
const getDeviceCapability = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEnd = isMobile && (
    navigator.hardwareConcurrency <= 4 || 
    navigator.deviceMemory <= 4 ||
    window.innerWidth < 768
  );
  return { isLowEnd };
};

const MagneticCursor = ({ theme }) => {
  const cursorRef = useRef();
  const cursorDotRef = useRef();
  const { isLowEnd } = useMemo(() => getDeviceCapability(), []);

  useEffect(() => {
    // Skip cursor effects on mobile/low-end devices
    if (isLowEnd) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };
    
    const growCursor = () => {
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: theme.accent,
        duration: 0.3
      });
    };
    
    const shrinkCursor = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: theme.accentLight,
        duration: 0.3
      });
    };
    
    window.addEventListener('mousemove', moveCursor, { passive: true });
    
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', growCursor);
      el.addEventListener('mouseleave', shrinkCursor);
    });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', growCursor);
        el.removeEventListener('mouseleave', shrinkCursor);
      });
    };
  }, [theme, isLowEnd]);
  
  if (isLowEnd) return null;
  
  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed w-8 h-8 rounded-full border-2 z-50 hidden md:block"
        style={{ 
          borderColor: theme.accentLight,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference'
        }}
      />
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed w-2 h-2 rounded-full z-50 hidden md:block"
        style={{ 
          backgroundColor: theme.accent,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 10px ${theme.accent}`
        }}
      />
    </>
  );
};

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const particlesRef = useRef([]);
  const featurePillsRef = useRef([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const deviceCapability = useMemo(() => getDeviceCapability(), []);
  const { isLowEnd } = deviceCapability;
  
  const prefersReducedMotion = useRef(false);

  if (particlesRef.current.length === 0) {
    particlesRef.current = Array(30).fill(null);
  }
  if (featurePillsRef.current.length === 0) {
    featurePillsRef.current = Array(3).fill(null);
  }

  const HERO_THEME = {
    glow: "rgba(79, 70, 229, 0.4)",
    accent: "#4f46e5",
    accentLight: "#818cf8",
    bg: "rgba(10, 10, 13, 1)",
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches || isLowEnd;
    
    if (prefersReducedMotion.current) {
      gsap.globalTimeline.timeScale(3);
    }
  }, [isLowEnd]);

  const getParticleCount = () => {
    if (isLowEnd) return 20; // Reduced for low-end devices
    return window.innerWidth < 768 ? 50 : 150; 
  };

  const createParticles = () => {
    const count = getParticleCount();
    return Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
  };

  const particlePositionsRef = useRef();
  particlePositionsRef.current ??= createParticles();
  const particlePositions = particlePositionsRef.current;

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (window.scrollY / totalScroll) * 100;
          setScrollProgress(Math.min(progress, 100));
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    
    // Simplified animations for low-end devices
    const animations = isLowEnd ? `
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes borderGlow {
        0%, 100% { 
          filter: drop-shadow(0 0 5px ${HERO_THEME.accent});
        }
        50% { 
          filter: drop-shadow(0 0 10px ${HERO_THEME.accentLight});
        }
      }
    ` : `
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        25% { background-position: 50% 50%; }
        50% { background-position: 100% 50%; }
        75% { background-position: 50% 100%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes hexagon-rainbow {
        0% {
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23ff0000' stroke-width='2.5' filter='drop-shadow(0 0 10px %23ff0000)'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%23ff0000' stroke-width='2.5' filter='drop-shadow(0 0 10px %23ff0000)'/%3E%3C/svg%3E");
        }
        20% {
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23ffff00' stroke-width='2.5' filter='drop-shadow(0 0 10px %23ffff00)'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%23ffff00' stroke-width='2.5' filter='drop-shadow(0 0 10px %23ffff00)'/%3E%3C/svg%3E");
        }
        40% {
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%2300ff00' stroke-width='2.5' filter='drop-shadow(0 0 10px %2300ff00)'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%2300ff00' stroke-width='2.5' filter='drop-shadow(0 0 10px %2300ff00)'/%3E%3C/svg%3E");
        }
        60% {
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%2300ffff' stroke-width='2.5' filter='drop-shadow(0 0 10px %2300ffff)'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%2300ffff' stroke-width='2.5' filter='drop-shadow(0 0 10px %2300ffff)'/%3E%3C/svg%3E");
        }
        80% {
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23ff00ff' stroke-width='2.5' filter='drop-shadow(0 0 10px %23ff00ff)'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%23ff00ff' stroke-width='2.5' filter='drop-shadow(0 0 10px %23ff00ff)'/%3E%3C/svg%3E");
        }
        100% {
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23ff0000' stroke-width='2.5' filter='drop-shadow(0 0 10px %23ff0000)'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%23ff0000' stroke-width='2.5' filter='drop-shadow(0 0 10px %23ff0000)'/%3E%3C/svg%3E");
        }
      }

      @keyframes borderGlow {
        0%, 100% { 
          filter: drop-shadow(0 0 10px ${HERO_THEME.accent}) drop-shadow(0 0 20px ${HERO_THEME.glow});
        }
        50% { 
          filter: drop-shadow(0 0 20px ${HERO_THEME.accentLight}) drop-shadow(0 0 40px ${HERO_THEME.accent});
        }
      }
    `;
    
    style.innerHTML = animations;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [isLowEnd]);

  useEffect(() => {
    // Faster loading for low-end devices
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), isLowEnd ? 100 : 300);
          return 100;
        }
        return prev + (isLowEnd ? 5 : 2);
      });
    }, isLowEnd ? 20 : 30);

    return () => clearInterval(interval);
  }, [isLowEnd]);

  useEffect(() => {
    if (prefersReducedMotion.current || isLowEnd) return;
    
    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        if (ctaButtonRef.current) {
          const rect = ctaButtonRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
          );

          if (distance < 200) {
            const force = (200 - distance) / 200;
            const deltaX = (e.clientX - centerX) * force * 0.3;
            const deltaY = (e.clientY - centerY) * force * 0.3;

            gsap.to(ctaButtonRef.current, {
              x: deltaX,
              y: deltaY,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            gsap.to(ctaButtonRef.current, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.3)",
            });
          }
        }
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLowEnd]);

  useEffect(() => {
    if (!isLoaded || !titleRef.current) return;

    const scrambleText = (element, finalText, duration = 2000) => {
      // Skip scramble effect on low-end devices
      if (isLowEnd) {
        element.textContent = finalText;
        return;
      }
      
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
      const length = finalText.length;
      let iteration = 0;
      const iterations = prefersReducedMotion.current ? 5 : 20;

      const interval = setInterval(() => {
        element.textContent = finalText
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) return finalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        iteration += length / iterations;

        if (iteration >= length) {
          clearInterval(interval);
          element.textContent = finalText;
        }
      }, duration / iterations);

      return () => clearInterval(interval);
    };

    const titleSpan = titleRef.current.querySelector("span");
    if (titleSpan) {
      setTimeout(() => {
        scrambleText(titleSpan, "Using PDF Tools", isLowEnd ? 0 : 1500);
      }, isLowEnd ? 100 : 1000);
    }
  }, [isLoaded, isLowEnd]);

  useEffect(() => {
    if (!isLoaded || !subtitleRef.current) return;

    const text = "Transform, convert, and manage your PDF documents with powerful tools. Fast, secure, and incredibly easy to use.";
    
    // Instant display for low-end devices
    if (isLowEnd) {
      subtitleRef.current.textContent = text;
      return;
    }
    
    let index = 0;
    subtitleRef.current.textContent = "";
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        subtitleRef.current.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, prefersReducedMotion.current ? 10 : 30);

    return () => clearInterval(typeInterval);
  }, [isLoaded, isLowEnd]);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const animationDuration = isLowEnd ? 0.2 : (prefersReducedMotion.current ? 0.3 : 1.2);
      
      gsap.set(titleRef.current, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(subtitleRef.current, { opacity: 1 });
      gsap.set(ctaButtonRef.current, { opacity: 0, y: 20, scale: 0.9 });
      
      featurePillsRef.current.forEach((pill) => {
        if (pill) {
          gsap.set(pill, { 
            opacity: 0, 
            scale: 0.8,
            rotation: 0,
            y: 30
          });
        }
      });

      const tl = gsap.timeline({ delay: isLowEnd ? 0.1 : 0.3 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: animationDuration,
        ease: "power4.out",
      })
        .to(
          ctaButtonRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: isLowEnd ? 0.2 : 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );

      // Skip text shadow animation on low-end devices
      if (!prefersReducedMotion.current && !isLowEnd) {
        gsap.to(titleRef.current, {
          textShadow: `0 0 40px ${HERO_THEME.glow}, 0 0 80px ${HERO_THEME.glow}`,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Reduced particle animations for low-end devices
      if (!isLowEnd) {
        particlesRef.current.filter(Boolean).forEach((particle, index) => {
          const pos = particlePositions[index];
          gsap.to(particle, {
            y: -100,
            opacity: 0,
            duration: pos.duration,
            ease: "none",
            repeat: -1,
            delay: pos.delay,
          });
        });
      }

      gsap.delayedCall(isLowEnd ? 0.2 : 1.5, () => {
        featurePillsRef.current.forEach((pill, index) => {
          if (pill) {
            const entranceTl = gsap.timeline();
            
            entranceTl.to(pill, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: isLowEnd ? 0.2 : 1,
              ease: "power3.out",
              delay: isLowEnd ? 0 : index * 0.15,
            });
          }
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded, particlePositions, isLowEnd]);

  const handle3DTilt = (e) => {
    if (!ctaButtonRef.current || prefersReducedMotion.current || isLowEnd) return;

    const rect = ctaButtonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(ctaButtonRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCTAClick = (e) => {
    // Simplified ripple effect for low-end devices
    if (isLowEnd) {
      gsap.to(ctaButtonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
      return;
    }
    
    const ripple = document.createElement('div');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255,255,255,0.5);
      transform: translate(-50%, -50%);
      pointer-events: none;
    `;
    
    e.currentTarget.appendChild(ripple);
    
    gsap.to(ripple, {
      width: 300,
      height: 300,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => ripple.remove()
    });
    
    gsap.to(ctaButtonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  };

  const handleCTAHover = (isEnter) => {
    if (isEnter) {
      gsap.to(ctaButtonRef.current, {
        scale: 1.05,
        boxShadow: isLowEnd ? `0 4px 15px ${HERO_THEME.glow}` : `0 8px 35px ${HERO_THEME.glow}, 0 0 60px ${HERO_THEME.glow}`,
        duration: 0.3,
        ease: "power2.out",
      });

      const arrow = ctaButtonRef.current?.querySelector("svg");
      if (arrow) {
        gsap.to(arrow, {
          x: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    } else {
      gsap.to(ctaButtonRef.current, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        boxShadow: `0 6px 25px ${HERO_THEME.glow}`,
        duration: 0.3,
        ease: "power2.out",
      });

      const arrow = ctaButtonRef.current?.querySelector("svg");
      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  };

  const handlePillHover = (index, isEnter) => {
    const pill = featurePillsRef.current[index];
    if (!pill) return;

    const icon = pill.querySelector('svg');
    const badge = pill.querySelector('.badge-glow');

    if (isEnter) {
      gsap.killTweensOf(pill);
      if (icon) gsap.killTweensOf(icon);
      if (badge) gsap.killTweensOf(badge);

      // Simplified effect for low-end devices
      if (!isLowEnd) {
        const ripple = document.createElement("div");
        ripple.className = "absolute inset-0 rounded-full pointer-events-none";
        ripple.style.background = `radial-gradient(circle, ${HERO_THEME.accentLight}40 0%, transparent 70%)`;
        ripple.style.transform = "scale(0)";
        pill.appendChild(ripple);

        gsap.to(ripple, {
          scale: 2,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        });
      }

      gsap.to(pill, {
        scale: isLowEnd ? 1.05 : 1.15,
        y: isLowEnd ? -5 : -15,
        rotationY: isLowEnd ? 0 : 5,
        rotationX: isLowEnd ? 0 : -5,
        background: `linear-gradient(135deg, ${HERO_THEME.accent}90, ${HERO_THEME.accentLight}70)`,
        borderColor: `${HERO_THEME.accentLight}`,
        duration: isLowEnd ? 0.2 : 0.6,
        ease: "power2.out",
        overwrite: true,
      });

      if (icon) {
        gsap.to(icon, {
          scale: isLowEnd ? 1.1 : 1.3,
          rotation: isLowEnd ? 0 : 360,
          filter: isLowEnd ? `drop-shadow(0 0 10px ${HERO_THEME.accentLight})` : `drop-shadow(0 0 20px ${HERO_THEME.accentLight}) drop-shadow(0 0 35px ${HERO_THEME.accent})`,
          duration: isLowEnd ? 0.2 : 0.6,
          ease: "back.out(2)",
          overwrite: true,
        });
      }

      if (badge) {
        gsap.to(badge, {
          scale: isLowEnd ? 1.05 : 1.2,
          rotation: isLowEnd ? 0 : 5,
          boxShadow: isLowEnd ? '0 4px 20px rgba(168, 85, 247, 0.5)' : `0 10px 45px rgba(168, 85, 247, 1), 0 0 60px rgba(236, 72, 153, 0.8), 0 0 100px rgba(168, 85, 247, 0.5)`,
          duration: 0.15,
          ease: "power1.out",
          overwrite: true,
        });
      }
    } else {
      gsap.to(pill, {
        scale: 1,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        boxShadow: `0 4px 25px ${HERO_THEME.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`,
        background: `linear-gradient(135deg, ${HERO_THEME.accent}50, ${HERO_THEME.accentLight}30)`,
        borderColor: `${HERO_THEME.accent}80`,
        duration: isLowEnd ? 0.2 : 0.7,
        ease: "power3.out",
        overwrite: true,
      });

      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          filter: `drop-shadow(0 0 8px ${HERO_THEME.accentLight})`,
          duration: isLowEnd ? 0.2 : 0.6,
          ease: "elastic.out(1, 0.5)",
          overwrite: true,
        });
      }

      if (badge) {
        gsap.to(badge, {
          scale: 1,
          rotation: 0,
          boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
          duration: isLowEnd ? 0.2 : 0.6,
          ease: "power3.out",
          overwrite: true,
        });
      }
    }
  };

  const handlePillMove = (e, index) => {
    if (isLowEnd) return; // Skip 3D tilt on low-end devices
    
    const pill = featurePillsRef.current[index];
    if (!pill || prefersReducedMotion.current) return;

    const rect = pill.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(pill, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <>
      <div 
        className="fixed top-0 left-0 h-1 z-50"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, ${HERO_THEME.accent}, ${HERO_THEME.accentLight})`,
          boxShadow: isLowEnd ? 'none' : `0 0 10px ${HERO_THEME.glow}`
        }}
      />

      <MagneticCursor theme={HERO_THEME} />

      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-64">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${loadingProgress}%`,
                  background: `linear-gradient(90deg, ${HERO_THEME.accent}, ${HERO_THEME.accentLight})`,
                  boxShadow: isLowEnd ? 'none' : `0 0 20px ${HERO_THEME.glow}`,
                }}
              />
            </div>
            <p className="text-white/50 text-center mt-4 text-sm">
              {loadingProgress}%
            </p>
          </div>
        </div>
      )}

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `
              linear-gradient(
                135deg,
                #140824,
                #0a0f1f,
                #071e35,
                #16123a,
                #140824
              )
            `,
            backgroundSize: "400% 400%",
            animation: isLowEnd ? "none" : "gradient-shift 15s ease infinite",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s"
          }}
        />

        {/* Hide hexagon pattern on low-end devices */}
        {!isLowEnd && (
          <div
            className="absolute inset-0 hexagon-glow -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='2'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='2'/%3E%3C/svg%3E")`,
              backgroundSize: "56px 100px",
              opacity: isLoaded ? 0.07 : 0,
              animation: "hexagon-rainbow 8s ease-in-out infinite"
            }}
          />
        )}

        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: `radial-gradient(circle at 50% 50%, transparent 0%, ${HERO_THEME.bg} 100%)`,
          }}
          aria-hidden="true"
        />

        {/* Simplified grid for low-end devices */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(79, 70, 229, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(79, 70, 229, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            opacity: 0.2,
            animation: isLowEnd ? "none" : "gridMove 20s linear infinite",
          }}
        />

        <style>{`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
        `}</style>

        {/* Particles - reduced for low-end */}
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((pos, i) => (
            <div
              key={i}
              ref={(el) => (particlesRef.current[i] = el)}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: HERO_THEME.accentLight,
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                opacity: isLowEnd ? 0.3 : 0.6,
                boxShadow: isLowEnd ? 'none' : `0 0 10px ${HERO_THEME.accentLight}`,
                willChange: isLowEnd ? 'auto' : 'transform, opacity'
              }}
            />
          ))}
        </div>

        <div className="relative py-20 md:py-0 z-10 max-w-5xl mx-auto text-center">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight cursor-default"
            style={{
              textShadow: isLowEnd ? `0 0 15px ${HERO_THEME.glow}` : `0 0 30px ${HERO_THEME.glow}`,
              willChange: isLowEnd ? 'auto' : 'transform'
            }}
            role="heading"
            aria-level="1"
          >
            Start Your Experience
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${HERO_THEME.accent}, ${HERO_THEME.accentLight})`,
              }}
            >
              Using PDF Tools
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed min-h-[80px]"
            aria-live="polite"
          >
          </p>

          <Link
            to="/tools"
            ref={ctaButtonRef}
            onClick={handleCTAClick}
            onMouseEnter={() => handleCTAHover(true)}
            onMouseLeave={() => handleCTAHover(false)}
            onMouseMove={handle3DTilt}
            className="px-10 py-5 rounded-xl font-bold text-lg text-white relative overflow-hidden group inline-flex"
            style={{
              background: `linear-gradient(135deg, ${HERO_THEME.accent}, ${HERO_THEME.accentLight})`,
              boxShadow: `0 6px 25px ${HERO_THEME.glow}`,
              transformStyle: isLowEnd ? "flat" : "preserve-3d",
              willChange: isLowEnd ? 'auto' : 'transform'
            }}
            role="button"
            aria-label="Get started with PDF tools - Navigate to tools page"
          >
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transition: isLowEnd ? "transform 0.3s" : "transform 0.6s"
              }}
            />

            <span className="relative z-10 flex items-center gap-3 justify-center">
              Get Started Now
              <svg
                className="w-6 h-6 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-6" role="list">
            {[
              { Icon: Zap, text: "Lightning Fast", stat: "99.9%"},
              { Icon: Lock, text: "Secure & Private", stat: "256-bit"},
              { Icon: Sparkles, text: "Easy to Use", stat: "5-star"},
            ].map((feature, index) => (
              <div
                key={index}
                ref={(el) => (featurePillsRef.current[index] = el)}
                onMouseEnter={() => handlePillHover(index, true)}
                onMouseLeave={() => handlePillHover(index, false)}
                onMouseMove={(e) => handlePillMove(e, index)}
                className="px-8 py-4 rounded-full text-white cursor-pointer flex items-center gap-3 relative"
                style={{
                  background: `rgba(255, 255, 255, 0.05)`,
                  backdropFilter: isLowEnd ? 'blur(10px)' : 'blur(20px) saturate(180%)',
                  border: `2px solid ${HERO_THEME.accent}80`,
                  boxShadow: `0 4px 30px ${HERO_THEME.glow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                  willChange: isLowEnd ? 'auto' : 'transform',
                  transformStyle: isLowEnd ? "flat" : "preserve-3d",
                }}
                role="listitem"
                aria-label={`${feature.text}: ${feature.stat}`}
              >
                <div 
                  className="badge-glow absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-2 py-1 text-xs font-bold shadow-lg"
                  style={{
                    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)'
                  }}
                >
                  {feature.stat}
                </div>
                <feature.Icon 
                  className="w-6 h-6" 
                  strokeWidth={2.5}
                  style={{
                    filter: `drop-shadow(0 0 8px ${HERO_THEME.accentLight})`,
                    animation: isLowEnd ? 'none' : 'borderGlow 3s ease-in-out infinite'
                  }}
                  aria-hidden="true"
                />
                <div>
                  <span className="font-bold text-lg block">{feature.text}</span>
                  <span className="text-xs text-white/60">{feature.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2" aria-hidden="true">
          <div className={isLowEnd ? "" : "animate-bounce"}>
            <div
              className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
              style={{
                borderColor: HERO_THEME.accentLight,
                boxShadow: isLowEnd ? 'none' : `0 0 20px ${HERO_THEME.glow}`,
              }}
            >
              <div
                className={isLowEnd ? "w-1.5 h-1.5 rounded-full" : "w-1.5 h-1.5 rounded-full animate-pulse"}
                style={{
                  background: HERO_THEME.accent,
                  boxShadow: isLowEnd ? 'none' : `0 0 10px ${HERO_THEME.glow}`,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}