import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const logoIconRef = useRef(null);
  const menuItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const underlineRef = useRef(null);
  const loaderRef = useRef(null);
  const particlesRef = useRef([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  
  const location = useLocation();
  
  const getActiveItem = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname === "/tools") return "tools";
    if (location.pathname === "/features") return "features";
    if (location.pathname === "/pricing") return "pricing";
    if (location.pathname === "/contact") return "contact";
    return "home";
  };

  const activeItem = getActiveItem();

  const [particles] = useState(() => 
    [...Array(30)].map(() => ({
      size: Math.random() * 4 + 2,
      blur: Math.random() * 20 + 10,
    }))
  );

  const menuItems = [
    { label: "Home", value: "home", href: "/" }, 
    { label: "Tools", value: "tools", href: "/tools" }, 
    { label: "Features", value: "features", href: "/features" },
    { label: "Pricing", value: "pricing", href: "/pricing" },
    { label: "Contact", value: "contact", href: "/contact" },
  ];

  const NAVBAR_THEME = {
    normal: {
      glow: "rgba(79, 70, 229, 0.3)",
      accent: "#4f46e5",
      bg: "rgba(20, 20, 23, 0.4)",
    },
    scrolled: {
      glow: "rgba(79, 70, 229, 0.5)",
      accent: "#4f46e5",
      bg: "rgba(20, 20, 23, 0.9)",
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current || !showNavbar) return;

    const theme = isScrolled ? NAVBAR_THEME.scrolled : NAVBAR_THEME.normal;

    gsap.to(navRef.current, {
      backgroundColor: theme.bg,
      backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
      boxShadow: isScrolled
        ? `0 4px 30px ${theme.glow}, 0 0 60px ${theme.glow}`
        : `0 2px 20px ${theme.glow}`,
      paddingTop: isScrolled ? "0.75rem" : "1rem",
      paddingBottom: isScrolled ? "0.75rem" : "1rem",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isScrolled, showNavbar, NAVBAR_THEME.normal.glow, NAVBAR_THEME.scrolled]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const loaderTimeline = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        setShowNavbar(true);
        document.body.style.overflow = 'auto';
      }
    });

    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach((particle, i) => {
        gsap.fromTo(
          particle,
          { 
            opacity: 0,
            scale: 0,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          },
          {
            opacity: 1,
            scale: gsap.utils.random(0.5, 1.5),
            x: gsap.utils.random(0, window.innerWidth),
            y: gsap.utils.random(0, window.innerHeight),
            duration: gsap.utils.random(0.8, 1.5),
            ease: "power3.out",
            delay: i * 0.02,
          }
        );
      });
    }

    loaderTimeline
      .to(loaderRef.current?.querySelector('.loader-logo'), {
        scale: 1.2,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(loaderRef.current?.querySelector('.loader-logo'), {
        rotate: 360,
        duration: 0.8,
        ease: "back.out(1.5)",
      }, "-=0.2")
      .to(loaderRef.current?.querySelector('.loader-text'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.4")
      .to(loaderRef.current?.querySelector('.loader-progress'), {
        width: "100%",
        duration: 1.2,
        ease: "power2.inOut",
      }, "-=0.3")
      .to(particlesRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.01,
        ease: "power2.in",
      }, "-=0.3")
      .to(loaderRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.6,
        ease: "power2.inOut",
      }, "-=0.2");

    return () => {
      loaderTimeline.kill();
      gsap.killTweensOf(particlesRef.current);
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!showNavbar) return;

    const tl = gsap.timeline();

    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      }
    )
    .fromTo(
      logoRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    )
    .fromTo(
      menuItemsRef.current,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .fromTo(
      ctaButtonRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(2)",
      },
      "-=0.3"
    );

    const floatingAnimation = gsap.to(logoIconRef.current, {
      y: -3,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tl.kill();
      floatingAnimation.kill();
      gsap.killTweensOf([navRef.current, logoRef.current, menuItemsRef.current, ctaButtonRef.current, logoIconRef.current]);
    };
  }, [showNavbar]);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const menuChildren = mobileMenuRef.current.children[0]?.children;

    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );

      if (menuChildren) {
        gsap.fromTo(
          menuChildren,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.1,
            ease: "back.out(1.5)",
          }
        );
      }
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    return () => {
      gsap.killTweensOf(mobileMenuRef.current);
      if (menuChildren) {
        gsap.killTweensOf(menuChildren);
      }
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    if (hamburgerRef.current) {
      const lines = hamburgerRef.current.children;

      if (!isMobileMenuOpen) {
        gsap.to(lines[0], {
          rotate: 45,
          y: 8,
          duration: 0.3,
          ease: "back.out(2)",
        });
        gsap.to(lines[1], {
          opacity: 0,
          scaleX: 0,
          duration: 0.2,
        });
        gsap.to(lines[2], {
          rotate: -45,
          y: -8,
          duration: 0.3,
          ease: "back.out(2)",
        });
      } else {
        gsap.to(lines[0], {
          rotate: 0,
          y: 0,
          duration: 0.3,
          ease: "back.out(2)",
        });
        gsap.to(lines[1], {
          opacity: 1,
          scaleX: 1,
          duration: 0.2,
          delay: 0.1,
        });
        gsap.to(lines[2], {
          rotate: 0,
          y: 0,
          duration: 0.3,
          ease: "back.out(2)",
        });
      }
    }
  };

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
    
    if (hamburgerRef.current) {
      const lines = hamburgerRef.current.children;
      gsap.to(lines[0], { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(lines[1], { opacity: 1, scaleX: 1, duration: 0.2 });
      gsap.to(lines[2], { rotate: 0, y: 0, duration: 0.3 });
    }
  };

  const handleMenuItemHover = (index, isEnter) => {
    const item = menuItemsRef.current[index];
    if (!item) return;

    if (isEnter) {
      gsap.to(item, {
        scale: 1.1,
        y: -2,
        color: "#ffffff",
        textShadow: `0 0 20px ${NAVBAR_THEME.normal.glow}, 0 0 40px ${NAVBAR_THEME.normal.glow}`,
        duration: 0.3,
        ease: "back.out(2)",
      });
    } else {
      gsap.to(item, {
        scale: 1,
        y: 0,
        color: activeItem === menuItems[index].value ? "#ffffff" : "rgba(255,255,255,0.7)",
        textShadow: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleLogoHover = (isEnter) => {
    if (isEnter) {
      gsap.to(logoRef.current, {
        scale: 1.08,
        duration: 0.4,
        ease: "back.out(2)",
      });
      gsap.to(logoIconRef.current, {
        rotate: 360,
        scale: 1.1,
        duration: 0.6,
        ease: "back.out(1.5)",
      });
    } else {
      gsap.to(logoRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(logoIconRef.current, {
        rotate: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  const handleCTAHover = (isEnter) => {
    if (isEnter) {
      gsap.to(ctaButtonRef.current, {
        scale: 1.08,
        y: -2,
        boxShadow: `0 8px 30px ${NAVBAR_THEME.normal.glow}, 0 0 60px ${NAVBAR_THEME.normal.glow}`,
        duration: 0.3,
        ease: "back.out(2)",
      });
    } else {
      gsap.to(ctaButtonRef.current, {
        scale: 1,
        y: 0,
        boxShadow: `0 4px 15px ${NAVBAR_THEME.normal.glow}`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <>
      {isLoading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #0f0f12 0%, #1a1a2e 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle, i) => (
              <div
                key={i}
                ref={(el) => (particlesRef.current[i] = el)}
                className="absolute rounded-full"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  background: NAVBAR_THEME.normal.accent,
                  boxShadow: `0 0 ${particle.blur}px ${NAVBAR_THEME.normal.glow}`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="loader-logo">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${NAVBAR_THEME.normal.accent}, ${NAVBAR_THEME.normal.accent}cc)`,
                  boxShadow: `0 0 40px ${NAVBAR_THEME.normal.glow}, 0 0 80px ${NAVBAR_THEME.normal.glow}`,
                }}
              >
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                
                <div
                  className="absolute inset-0 rounded-2xl animate-ping"
                  style={{
                    background: NAVBAR_THEME.normal.accent,
                    opacity: 0.2,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle, ${NAVBAR_THEME.normal.glow} 0%, transparent 70%)`,
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
              </div>
            </div>

            <div className="loader-text opacity-0 translate-y-4">
              <h2 className="text-3xl font-bold text-center text-white mb-2">DocFlux</h2>
              <p className="text-white/60 text-sm">Loading amazing experience...</p>
            </div>

            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="loader-progress h-full rounded-full"
                style={{
                  width: "0%",
                  background: `linear-gradient(90deg, ${NAVBAR_THEME.normal.accent}, #818cf8)`,
                  boxShadow: `0 0 20px ${NAVBAR_THEME.normal.glow}`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showNavbar && (
        <nav
          ref={navRef}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
          style={{
            backgroundColor: NAVBAR_THEME.normal.bg,
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            opacity: 0,
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              ref={logoRef}
              to="/"
              className="flex items-center gap-3 group"
              onMouseEnter={() => handleLogoHover(true)}
              onMouseLeave={() => handleLogoHover(false)}
            >
              
              <div
                ref={logoIconRef}
                className="w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${NAVBAR_THEME.normal.accent}, ${NAVBAR_THEME.normal.accent}cc)`,
                  boxShadow: `0 0 20px ${NAVBAR_THEME.normal.glow}`,
                }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                  }}
                />
              </div>
              <span className="text-xl font-bold text-white">DocFlux</span>
            </Link>

            <ul className="hidden md:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <li key={item.value}>
                  {item.href.startsWith("/") ? (
                    <Link
                      ref={(el) => (menuItemsRef.current[index] = el)}
                      to={item.href}
                      onClick={() => handleMenuItemClick(item.value)}
                      onMouseEnter={() => handleMenuItemHover(index, true)}
                      onMouseLeave={() => handleMenuItemHover(index, false)}
                      className={`
                        text-sm font-medium transition-colors relative
                        ${
                          activeItem === item.value
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                        }
                      `}
                    >
                      {item.label}
                      {activeItem === item.value && (
                        <div
                          ref={underlineRef}
                          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                          style={{
                            background: NAVBAR_THEME.normal.accent,
                            boxShadow: `0 0 10px ${NAVBAR_THEME.normal.glow}`,
                          }}
                        />
                      )}
                    </Link>
                  ) : (
                    <a
                      ref={(el) => (menuItemsRef.current[index] = el)}
                      href={item.href}
                      onClick={() => handleMenuItemClick(item.value)}
                      onMouseEnter={() => handleMenuItemHover(index, true)}
                      onMouseLeave={() => handleMenuItemHover(index, false)}
                      className={`
                        text-sm font-medium transition-colors relative
                        ${
                          activeItem === item.value
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                        }
                      `}
                    >
                      {item.label}
                      {activeItem === item.value && (
                        <div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                          style={{
                            background: NAVBAR_THEME.normal.accent,
                            boxShadow: `0 0 10px ${NAVBAR_THEME.normal.glow}`,
                          }}
                        />
                      )}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <button
              ref={ctaButtonRef}
              className="hidden md:block px-6 py-2.5 rounded-lg font-semibold text-white relative overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, ${NAVBAR_THEME.normal.accent}, ${NAVBAR_THEME.normal.accent}dd)`,
                boxShadow: `0 4px 15px ${NAVBAR_THEME.normal.glow}`,
              }}
              onMouseEnter={() => handleCTAHover(true)}
              onMouseLeave={() => handleCTAHover(false)}
            >
              <span className="relative z-10">Get Started</span>
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                }}
              />
            </button>

            <button
              ref={hamburgerRef}
              onClick={toggleMobileMenu}
              className="md:hidden flex flex-col gap-1.5 p-2"
            >
              <span className="w-6 h-0.5 bg-white rounded-full origin-center" />
              <span className="w-6 h-0.5 bg-white rounded-full origin-center" />
              <span className="w-6 h-0.5 bg-white rounded-full origin-center" />
            </button>
          </div>

          <div
            ref={mobileMenuRef}
            className="md:hidden overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <ul className="pt-4 pb-2 space-y-2">
              {menuItems.map((item) => (
                <li key={item.value}>
                  {item.href.startsWith("/") ? (
                    <Link
                      to={item.href}
                      onClick={() => handleMenuItemClick(item.value)}
                      className={`
                        block px-4 py-3 rounded-lg
                        ${
                          activeItem === item.value
                            ? "bg-white/10 text-white font-semibold"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        }
                      `}
                      style={
                        activeItem === item.value
                          ? {
                              boxShadow: `0 0 15px ${NAVBAR_THEME.normal.glow}`,
                            }
                          : {}
                      }
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => handleMenuItemClick(item.value)}
                      className={`
                        block px-4 py-3 rounded-lg
                        ${
                          activeItem === item.value
                            ? "bg-white/10 text-white font-semibold"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        }
                      `}
                      style={
                        activeItem === item.value
                          ? {
                              boxShadow: `0 0 15px ${NAVBAR_THEME.normal.glow}`,
                            }
                          : {}
                      }
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <button
                  className="w-full px-4 py-3 rounded-lg font-semibold text-white relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, ${NAVBAR_THEME.normal.accent}, ${NAVBAR_THEME.normal.accent}dd)`,
                    boxShadow: `0 4px 15px ${NAVBAR_THEME.normal.glow}`,
                  }}
                >
                  <span className="relative z-10">Get Started</span>
                  <div
                    className="absolute inset-0 -translate-x-full group-active:translate-x-full transition-transform duration-500"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    }}
                  />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}