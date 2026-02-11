import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const logoSvgRef = useRef(null);
  const sectionsRef = useRef([]);
  const dividerRef = useRef(null);
  const bottomRef = useRef(null);
  const socialRef = useRef([]);
  const backgroundPatternRef = useRef(null);
  const topGlowRef = useRef(null);
  const particlesContainerRef = useRef(null);
  const orbitRingsRef = useRef([]);

  const FOOTER_THEME = {
    glow: "rgba(79, 70, 229, 0.4)",
    glowStrong: "rgba(79, 70, 229, 0.6)",
    accent: "#4f46e5",
    accentLight: "#6366f1",
    accentDark: "#4338ca",
    bg: "rgba(15, 15, 20, 0.98)",
    bgPattern: "rgba(30, 30, 40, 0.5)",
  };

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Office to PDF", href: "#office-pdf" },
        { label: "Image to PDF", href: "#image-pdf" },
        { label: "Compress PDF", href: "#compress" },
        { label: "Merge PDF", href: "#merge" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Blog", href: "#blog" },
        { label: "Careers", href: "#careers" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#docs" },
        { label: "API", href: "#api" },
        { label: "Support", href: "#support" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Cookie Policy", href: "#cookies" },
        { label: "Licenses", href: "#licenses" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "#github",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#linkedin",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Discord",
      href: "#discord",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0 a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
    
      gsap.set(
        [
          footerRef.current,
          logoSvgRef.current,
          sectionsRef.current,
          socialRef.current,
          topGlowRef.current,
         
        ],
        {
          willChange: "auto",
          force3D: true,
        }
      );

      gsap.set(footerRef.current, { opacity: 1 });
      gsap.set(logoRef.current, { opacity: 0, y: 20, scale: 0.95 });
      gsap.set(logoSvgRef.current, { scale: 0.8, rotation: 0, opacity: 0 });
      gsap.set(sectionsRef.current, { opacity: 0, y: 20 });
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "center" });
      gsap.set(bottomRef.current, { opacity: 0, y: 15 });
      gsap.set(socialRef.current, { opacity: 0, scale: 0.8, y: 10 });

      orbitRingsRef.current.forEach((ring) => {
        if (ring) gsap.set(ring, { opacity: 0, scale: 0.5 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=50",
          end: "top center",
          toggleActions: "play none none none",
        },
        defaults: {
          ease: "power3.out", 
        },
      });

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      })
    
        .to(
          logoSvgRef.current,
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.2)", 
          },
          "-=0.5"
        )
        .to(
          orbitRingsRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .to(
          sectionsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: {
              each: 0.12,
              ease: "power2.out",
            },
          },
          "-=0.6"
        )
        .to(
          socialRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: {
              each: 0.08,
              from: "start",
            },
            ease: "back.out(1.5)",
          },
          "-=0.5"
        )
        .to(
          dividerRef.current,
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.4"
        )
        .to(
          bottomRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5"
        );

      const bottomLinks = bottomRef.current?.querySelectorAll("a");
      if (bottomLinks) {
        gsap.set(bottomLinks, { opacity: 0, y: 8 });
        tl.to(
          bottomLinks,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      if (particlesContainerRef.current) {
        const particleCount = 25;

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.className = "footer-particle";

          const size = Math.random() * 3 + 1.5;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;

          Object.assign(particle.style, {
            position: "absolute",
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${FOOTER_THEME.accentLight}, ${FOOTER_THEME.accent})`,
            opacity: Math.random() * 0.3 + 0.1,
            left: `${startX}%`,
            top: `${startY}%`,
            pointerEvents: "none",
            filter: "blur(0.5px)",
            boxShadow: `0 0 ${size * 2}px ${FOOTER_THEME.glow}`,
          });

          particlesContainerRef.current.appendChild(particle);

          gsap.to(particle, {
            y: -200 - Math.random() * 150,
            x: (Math.random() - 0.5) * 80,
            opacity: 0,
            duration: Math.random() * 8 + 6,
            repeat: -1,
            delay: Math.random() * 5,
            ease: "none",
          });

          gsap.to(particle, {
            x: `+=${Math.random() * 30 - 15}`,
            duration: Math.random() * 4 + 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }
      gsap.to(logoSvgRef.current, {
        y: -6,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.5,
      });

      gsap.to(logoSvgRef.current, {
        rotation: 3,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.5,
      });

      const logoBox = logoRef.current?.querySelector(".logo-box");
      if (logoBox) {
        gsap.to(logoBox, {
          boxShadow: `0 0 30px ${FOOTER_THEME.glow}, 0 0 60px ${FOOTER_THEME.glow}, inset 0 0 20px ${FOOTER_THEME.glow}`,
          duration: 2.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.5,
        });
      }

      orbitRingsRef.current.forEach((ring, index) => {
        if (ring) {
          gsap.to(ring, {
            rotation: index % 2 === 0 ? 360 : -360,
            duration: 20 + index * 5,
            ease: "none",
            repeat: -1,
            delay: 1.5,
          });
        }
      });

      if (backgroundPatternRef.current) {
        gsap.to(backgroundPatternRef.current, {
          backgroundPosition: "40px 40px",
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      }

      if (topGlowRef.current) {
        gsap.to(topGlowRef.current, {
          opacity: 0.7,
          scaleX: 1.3,
          duration: 3.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      socialRef.current.forEach((icon, index) => {
        if (icon) {
          gsap.to(icon, {
            y: -3,
            duration: 2.5 + index * 0.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.5 + index * 0.1,
          });
        }
      });

      sectionsRef.current.forEach((section, i) => {
        if (section) {
          gsap.to(section, {
            y: -10 * (i + 1),
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
      });

      gsap.to(logoRef.current, {
        y: -20,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleLinkHover = (e, isEnter) => {
    const underline = e.currentTarget.querySelector(".link-underline");

    if (isEnter) {
      gsap.to(e.currentTarget, {
        x: 6,
        color: "#ffffff",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(e.currentTarget, {
        textShadow: `0 0 12px ${FOOTER_THEME.glow}`,
        duration: 0.3,
      });
      gsap.to(underline, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(e.currentTarget, {
        x: 0,
        color: "rgba(255, 255, 255, 0.7)",
        textShadow: "none",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

 
  const handleSocialMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(e.currentTarget, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleSocialHover = (e, isEnter) => {
    const icon = e.currentTarget.querySelector("svg");

    if (isEnter) {
      gsap.to(e.currentTarget, {
        scale: 1.12,
        backgroundColor: "rgba(79, 70, 229, 0.25)",
        boxShadow: `0 0 20px ${FOOTER_THEME.glow}, 0 0 40px ${FOOTER_THEME.glow}`,
        borderColor: FOOTER_THEME.accentLight,
        duration: 0.5,
        ease: "power2.out",
      });

      if (icon) {
        gsap.to(icon, {
          scale: 1.1,
          rotation: 5,
          duration: 0.5,
          ease: "back.out(1.5)",
        });
      }
    } else {
      gsap.to(e.currentTarget, {
        scale: 1,
        x: 0,
        y: 0,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        boxShadow: "0 0 0px transparent",
        borderColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.5,
        ease: "power2.out",
      });

      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  };

  const handleLogoHover = (isEnter) => {
    const logoBox = logoRef.current?.querySelector(".logo-box");

    if (isEnter) {
      if (logoBox) {
        const ripple = document.createElement("div");
        ripple.className = "absolute inset-0 rounded-2xl pointer-events-none";
        ripple.style.background = `radial-gradient(circle, ${FOOTER_THEME.accentLight}40 0%, transparent 70%)`;
        ripple.style.transform = "scale(0)";
        logoBox.appendChild(ripple);

        gsap.to(ripple, {
          scale: 2,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        });
      }

      gsap.to(logoSvgRef.current, {
        scale: 1.3,
        rotation: 360,
        duration: 0.6,
        ease: "back.out(2)",
        overwrite: true,
      });


      if (logoBox) {
        gsap.to(logoBox, {
          scale: 1.1,
          y: -10,
          rotationY: 5,
          rotationX: -5,
          boxShadow: `0 20px 60px ${FOOTER_THEME.accent}, 0 0 80px ${FOOTER_THEME.glow}, inset 0 0 30px ${FOOTER_THEME.glow}`,
          borderColor: FOOTER_THEME.accentLight,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto", 
        });
      }


      orbitRingsRef.current.forEach((ring) => {
        if (ring) {
          gsap.to(ring, {
            opacity: 0.8,
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
          });
        }
      });
    } else {

      gsap.to(logoSvgRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
        overwrite: true,
      });

      if (logoBox) {
        gsap.to(logoBox, {
          scale: 1,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          boxShadow: `0 0 25px ${FOOTER_THEME.glow}, inset 0 0 15px ${FOOTER_THEME.glow}`,
          borderColor: "rgba(255, 255, 255, 0.15)",
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
        });
      }

      orbitRingsRef.current.forEach((ring) => {
        if (ring) {
          gsap.to(ring, {
            opacity: 0.3,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
          });
        }
      });
    }
  };

  const handleLogoMove = (e) => {
    const logoBox = logoRef.current?.querySelector(".logo-box");
    if (!logoBox) return;

    const rect = logoBox.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = Math.max(-10, Math.min(10, ((y - centerY) / centerY) * -10));
    const rotateY = Math.max(-10, Math.min(10, ((x - centerX) / centerX) * 10));

    gsap.to(logoBox, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true, 
    });
  };

  const handleLinkClick = (e) => {
    e.preventDefault();

    const ripple = document.createElement("span");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    Object.assign(ripple.style, {
      position: "absolute",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${FOOTER_THEME.accentLight} 0%, ${FOOTER_THEME.accent} 50%, transparent 70%)`,
      width: "15px",
      height: "15px",
      left: `${x}px`,
      top: `${y}px`,
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      zIndex: "10",
      boxShadow: `0 0 20px ${FOOTER_THEME.glow}`,
    });

    e.currentTarget.appendChild(ripple);

    gsap.to(ripple, {
      scale: 20,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    });
  };

  const handleSectionTitleHover = (e, isEnter) => {
    const underline = e.currentTarget.querySelector(".section-underline");

    if (isEnter) {
      gsap.to(underline, {
        scaleX: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(e.currentTarget, {
        x: 4,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(e.currentTarget, {
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${FOOTER_THEME.bg} 0%, rgba(10, 10, 15, 0.98) 100%)`,
        borderTop: `1px solid rgba(79, 70, 229, 0.2)`,
      }}
    >
      <div
        ref={backgroundPatternRef}
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(${FOOTER_THEME.accent} 1px, transparent 1px),
            linear-gradient(90deg, ${FOOTER_THEME.accent} 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />

      <div
        ref={particlesContainerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      <div
        ref={topGlowRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-50"
        style={{
          background: `linear-gradient(90deg, transparent, ${FOOTER_THEME.accentLight}, ${FOOTER_THEME.accent}, ${FOOTER_THEME.accentLight}, transparent)`,
          filter: "blur(15px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
          <div
            ref={logoRef}
            className="lg:col-span-4"
          >
            <div 
              className="relative inline-block"
              onMouseEnter={() => handleLogoHover(true)}
              onMouseLeave={() => handleLogoHover(false)}
              onMouseMove={handleLogoMove}
            >
              <div
                ref={(el) => (orbitRingsRef.current[0] = el)}
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  width: "120px",
                  height: "120px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
              </div>
              <div
                ref={(el) => (orbitRingsRef.current[1] = el)}
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  width: "140px",
                  height: "140px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
              </div>

 
              <div
                className="logo-box relative z-10 inline-block p-4 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(99, 102, 241, 0.05))`,
                  border: "2px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: `0 0 25px ${FOOTER_THEME.glow}, inset 0 0 15px ${FOOTER_THEME.glow}`,
                  backdropFilter: "blur(10px)",
                  transformStyle: "preserve-3d",
                }}
              >
          
                <svg
                  ref={logoSvgRef}
                  className="w-12 h-12 relative"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: FOOTER_THEME.accentLight }}
                >
               
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    opacity={0.3}
                  />
          
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 3v6a1 1 0 001 1h5"
                  />
                
                  <line
                    x1="9"
                    y1="13"
                    x2="15"
                    y2="13"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <line
                    x1="9"
                    y1="17"
                    x2="13"
                    y2="17"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <h3
              className="text-2xl font-bold mb-3 mt-6"
              style={{
                color: "#ffffff",
                textShadow: `0 0 20px ${FOOTER_THEME.glow}`,
              }}
            >
              PDF Tools Pro
            </h3>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(255, 255, 255, 0.65)" }}
            >
              Transform, merge, and compress your documents with lightning-fast
              PDF tools. Professional results, zero hassle.
            </p>

          
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  ref={(el) => (socialRef.current[index] = el)}
                  href={social.href}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white relative overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(5px)",
                  }}
                  onMouseEnter={(e) => handleSocialHover(e, true)}
                  onMouseLeave={(e) => handleSocialHover(e, false)}
                  onMouseMove={handleSocialMove}
                  onClick={handleLinkClick}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
            {footerSections.map((section, sectionIndex) => (
              <div
                key={section.title}
                ref={(el) => (sectionsRef.current[sectionIndex] = el)}
              >
                <h4
                  className="text-sm font-semibold mb-5 relative inline-block cursor-pointer"
                  style={{ color: "#ffffff", letterSpacing: "0.5px" }}
                  onMouseEnter={(e) => handleSectionTitleHover(e, true)}
                  onMouseLeave={(e) => handleSectionTitleHover(e, false)}
                >
                  {section.title}
                  <span
                    className="section-underline absolute -bottom-1 left-0 w-full h-0.5 origin-left"
                    style={{
                      background: `linear-gradient(90deg, ${FOOTER_THEME.accentLight}, ${FOOTER_THEME.accent})`,
                      transform: "scaleX(0)",
                      boxShadow: `0 0 8px ${FOOTER_THEME.glow}`,
                    }}
                  />
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm inline-block relative"
                        style={{ color: "rgba(255, 255, 255, 0.7)" }}
                        onMouseEnter={(e) => handleLinkHover(e, true)}
                        onMouseLeave={(e) => handleLinkHover(e, false)}
                        onClick={handleLinkClick}
                      >
                        {link.label}
                        <span
                          className="link-underline absolute -bottom-0.5 left-0 w-full h-px origin-left"
                          style={{
                            background: FOOTER_THEME.accentLight,
                            transform: "scaleX(0)",
                            boxShadow: `0 0 6px ${FOOTER_THEME.glow}`,
                          }}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={dividerRef}
          className="h-px mb-10 relative"
          style={{
            background: `linear-gradient(90deg, transparent, ${FOOTER_THEME.accentLight}, ${FOOTER_THEME.accent}, ${FOOTER_THEME.accentLight}, transparent)`,
            opacity: 0.4,
            boxShadow: `0 0 10px ${FOOTER_THEME.glow}`,
          }}
        />

        <div
          ref={bottomRef}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            © 2025 PDF Tools Pro. Crafted with passion.
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm relative inline-block"
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
                onClick={handleLinkClick}
              >
                {item}
                <span
                  className="link-underline absolute -bottom-0.5 left-0 w-full h-px origin-left"
                  style={{
                    background: FOOTER_THEME.accentLight,
                    transform: "scaleX(0)",
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}