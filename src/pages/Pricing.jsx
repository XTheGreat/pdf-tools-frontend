import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check,
  Sparkles,
  Zap,
  Shield,
  Users,
  Lock,
  Heart,
  Infinity as InfinityIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PricingPage() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const cardRefs = useRef([]);
  const faqRefs = useRef([]);
  const ctaRef = useRef(null);
  const carouselRef = useRef(null);
  const carouselTimelineRef = useRef(null);
  const particlesRef = useRef([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const THEME = {
    glow: "rgba(79, 70, 229, 0.4)",
    accent: "#4f46e5",
    accentLight: "#818cf8",
    bg: "rgba(10, 10, 13, 1)",
  };

  const getParticleCount = () => {
    return window.innerWidth < 768 ? 100 : 200;
  };

  const createParticles = () => {
    const count = getParticleCount();
    return Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
      size: Math.random() * 3 + 1,
    }));
  };

  const particlePositionsRef = useRef();
  particlePositionsRef.current ??= createParticles();
  const particlePositions = particlePositionsRef.current;

  if (particlesRef.current.length === 0) {
    particlesRef.current = Array(getParticleCount()).fill(null);
  }

  const features = [
    {
      icon: InfinityIcon,
      title: "Unlimited Usage",
      description:
        "Convert as many documents as you need, whenever you need them",
      color: "#667eea",
      glow: "rgba(102, 126, 234, 0.5)",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Process your files in seconds with our optimized infrastructure",
      color: "#0ea5e9",
      glow: "rgba(14, 165, 233, 0.5)",
    },
    {
      icon: Shield,
      title: "100% Secure",
      description:
        "Your files are encrypted and automatically deleted after processing",
      color: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.5)",
    },
    {
      icon: Users,
      title: "No Sign-Up Required",
      description: "Start converting immediately without creating an account",
      color: "#ec4899",
      glow: "rgba(236, 72, 153, 0.5)",
    },
    {
      icon: Lock,
      title: "No Hidden Fees",
      description: "Completely free forever. No premium tiers, no paywalls",
      color: "#f59e0b",
      glow: "rgba(245, 158, 11, 0.5)",
    },
    {
      icon: Heart,
      title: "Thoughtfully Crafted",
      description: "Focused on clean design and real-world needs",
      color: "#ef4444",
      glow: "rgba(239, 68, 68, 0.5)",
    },
  ];

  const faqs = [
    {
      question: "Is this really completely free?",
      answer:
        "Yes! All our tools are 100% free with no hidden costs, no premium tiers, and no limitations. We believe document conversion should be accessible to everyone.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "Nope! You can use all our tools immediately without signing up. Just upload your file and start converting.",
    },
    {
      question: "Are there any file size limits?",
      answer:
        "We support files up to 50MB to ensure fast processing for everyone. This covers 99% of common use cases.",
    },
    {
      question: "How do you keep it free?",
      answer:
        "We're passionate about building useful tools. This project is supported by our community and runs on efficient infrastructure to keep costs minimal.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Absolutely. Files are processed securely and automatically deleted from our servers immediately after conversion. We never store or access your documents.",
    },
    {
      question: "Will it always be free?",
      answer:
        "Yes! We're committed to keeping DocFlux free forever. No ads, no premium plans, no catches.",
    },
  ];

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        25% { background-position: 50% 50%; }
        50% { background-position: 100% 50%; }
        75% { background-position: 50% 100%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes hexagon-rainbow {
        0%, 100% {
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23667eea' stroke-width='2' filter='drop-shadow(0 0 8px %23667eea)'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%23667eea' stroke-width='2' filter='drop-shadow(0 0 8px %23667eea)'/%3E%3C/svg%3E");
        }
        20% {
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%230ea5e9' stroke-width='2' filter='drop-shadow(0 0 8px %230ea5e9)'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%230ea5e9' stroke-width='2' filter='drop-shadow(0 0 8px %230ea5e9)'/%3E%3C/svg%3E");
        }
        40% {
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%238b5cf6' stroke-width='2' filter='drop-shadow(0 0 8px %238b5cf6)'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%238b5cf6' stroke-width='2' filter='drop-shadow(0 0 8px %238b5cf6)'/%3E%3C/svg%3E");
        }
        60% {
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23ec4899' stroke-width='2' filter='drop-shadow(0 0 8px %23ec4899)'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%23ec4899' stroke-width='2' filter='drop-shadow(0 0 8px %23ec4899)'/%3E%3C/svg%3E");
        }
        80% {
          background-image: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23f59e0b' stroke-width='2' filter='drop-shadow(0 0 8px %23f59e0b)'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%23f59e0b' stroke-width='2' filter='drop-shadow(0 0 8px %23f59e0b)'/%3E%3C/svg%3E");
        }
      }

      @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(80px, 80px); }
      }

      @keyframes pulse-ring {
        0% {
          transform: scale(0.95);
          opacity: 1;
        }
        50% {
          transform: scale(1.05);
          opacity: 0.7;
        }
        100% {
          transform: scale(0.95);
          opacity: 1;
        }
      }

      @keyframes shimmer-sweep {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }

      @keyframes letter-glow {
        0%, 100% {
          text-shadow: 
            0 0 10px rgba(129, 140, 248, 0.5),
            0 0 20px rgba(129, 140, 248, 0.3),
            0 0 30px rgba(129, 140, 248, 0.2);
          filter: brightness(1);
        }
        50% {
          text-shadow: 
            0 0 20px rgba(129, 140, 248, 1),
            0 0 40px rgba(129, 140, 248, 0.8),
            0 0 60px rgba(129, 140, 248, 0.6);
          filter: brightness(1.3);
        }
      }

      .badge-shimmer {
        background: linear-gradient(
          90deg,
          rgba(129, 140, 248, 0.2) 0%,
          rgba(129, 140, 248, 0.4) 50%,
          rgba(129, 140, 248, 0.2) 100%
        );
        background-size: 200% auto;
        animation: shimmer-sweep 3s linear infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
      );

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.3",
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      );

      particlesRef.current.filter(Boolean).forEach((particle, index) => {
        const pos = particlePositions[index];

        gsap.to(particle, {
          y: -150,
          x: Math.sin(index) * 30,
          opacity: 0,
          rotation: 180,
          duration: pos.duration,
          ease: "none",
          repeat: -1,
          delay: pos.delay,
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [particlePositions]);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const cards = carousel.querySelectorAll(".feature-carousel-card");

    if (cards.length === 0) return;

    if (carouselTimelineRef.current) {
      carouselTimelineRef.current.kill();
    }

    let isMounted = true;

    const animateCard = (cardIndex) => {
      if (!isMounted) return;

      const card = cards[cardIndex];
      const shimmerOverlay = card.querySelector(".shimmer-overlay");
      const glowRing = card.querySelector(".glow-ring");
      const tl = gsap.timeline();

      gsap.set(cards, {
        x: "120%",
        scale: 0.8,
        opacity: 0,
        zIndex: 1,
      });

      tl.set(card, { zIndex: 10 })
        .fromTo(
          card,
          { x: "120%", scale: 0.8, opacity: 0 },
          {
            x: "0%",
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
        )
        .to(
          [shimmerOverlay, glowRing],
          {
            opacity: 1,
            duration: 0.3,
          },
          "-=0.3",
        )
        .fromTo(
          shimmerOverlay,
          { backgroundPosition: "-200% center" },
          {
            backgroundPosition: "200% center",
            duration: 1.0,
            ease: "power2.inOut",
          },
          "-=0.3",
        )
        .to(
          card,
          {
            scale: 1.08,
            duration: 1.0,
            ease: "power2.inOut",
          },
          "-=1.0",
        )
        .to(
          [shimmerOverlay, glowRing],
          {
            opacity: 0,
            duration: 0.4,
          },
          "-=0.2",
        )
        .to(card, {
          scale: 1.08,
          duration: 1.5,
        })
        .to(card, {
          scale: 1,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(card, {
          x: "-120%",
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
          onComplete: () => {
            if (!isMounted) return;

            const nextIndex = (cardIndex + 1) % features.length;
            setActiveFeatureIndex(nextIndex);
            const newTimeline = animateCard(nextIndex);
            carouselTimelineRef.current = newTimeline;
          },
        });

      return tl;
    };

    const initialTimeline = animateCard(0);
    carouselTimelineRef.current = initialTimeline;

    return () => {
      isMounted = false;

      if (carouselTimelineRef.current) {
        carouselTimelineRef.current.kill();
        carouselTimelineRef.current = null;
      }
    };
  }, [features.length]);

  useEffect(() => {
    const contexts = [];

    cardRefs.current.forEach((card) => {
      if (!card) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }, card);

      contexts.push(ctx);
    });

    return () => contexts.forEach((ctx) => ctx.revert());
  }, []);

  useEffect(() => {
    const contexts = [];

    faqRefs.current.forEach((faq, faqIndex) => {
      if (!faq) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          faq,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: faqIndex * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faq,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }, faq);

      contexts.push(ctx);
    });

    return () => contexts.forEach((ctx) => ctx.revert());
  }, []);

  useEffect(() => {
    if (!ctaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, ctaRef.current);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (faqIndex) => {
    setActiveFaq(activeFaq === faqIndex ? null : faqIndex);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 sm:py-24 px-4 sm:px-6 overflow-hidden"
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
          animation: "gradient-shift 15s ease infinite",
        }}
      />

      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='2'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='2'/%3E%3C/svg%3E")`,
          backgroundSize: "56px 100px",
          opacity: 0.07,
          animation: "hexagon-rainbow 8s ease-in-out infinite",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(79, 70, 229, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(79, 70, 229, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          animation: "gridMove 30s linear infinite",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, ${THEME.bg} 100%)`,
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute rounded-full"
            style={{
              width: `${pos.size}px`,
              height: `${pos.size}px`,
              background: `radial-gradient(circle, ${THEME.accentLight}, ${THEME.accent})`,
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              opacity: 0.6,
              boxShadow: `0 0 ${pos.size * 3}px ${THEME.accentLight}`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={heroRef} className="text-center mb-24 sm:mb-32">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 backdrop-blur-xl border"
            style={{
              background:
                "linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(139, 92, 246, 0.15))",
              borderColor: "rgba(129, 140, 248, 0.3)",
              boxShadow: "0 8px 32px rgba(79, 70, 229, 0.3)",
            }}
          >
            <Sparkles className="w-4 h-4 text-indigo-300" />
            <span className="text-sm font-bold text-indigo-200 badge-shimmer bg-clip-text">
              100% Free Forever
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200"
            style={{
              textShadow: "0 0 80px rgba(129, 140, 248, 0.5)",
              animation: "letter-glow 3s ease-in-out infinite",
            }}
          >
            Free for Everyone
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            No credit card. No sign-up. No limits. Just powerful tools that
            work. (◍•ᴗ•◍)
          </p>
        </div>

        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
              What You Get
            </h2>
            <p className="text-white/60 text-lg">
              Everything, with no strings attached
            </p>
          </div>

          <div
            ref={carouselRef}
            className="relative h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden"
          >
            {features.map((feature, featureIndex) => {
              const Icon = feature.icon;
              return (
                <div
                  key={featureIndex}
                  className="feature-carousel-card absolute w-[280px] sm:w-[400px] md:w-[550px] max-w-2xl"
                  style={{
                    x: "120%",
                    opacity: 0,
                  }}
                >
                  <div className="group relative cursor-pointer">
                    <div
                      className="absolute inset-0 rounded-3xl p-[3px]"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)`,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                          background: `linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(20, 20, 35, 0.98) 100%)`,
                        }}
                      />
                    </div>

                    <div
                      className="glow-ring absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
                      style={{
                        boxShadow: `0 0 30px 10px ${feature.glow}, inset 0 0 30px 5px ${feature.glow}`,
                        filter: "blur(3px)",
                      }}
                    />

                    <div className="relative p-8 sm:p-10 md:p-12 rounded-3xl backdrop-blur-xl overflow-hidden">
                      <div
                        className="shimmer-overlay absolute inset-0 opacity-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(
                            90deg,
                            transparent 0%,
                            ${feature.color}40 50%,
                            transparent 100%
                          )`,
                          backgroundSize: "200% 100%",
                        }}
                      />

                      <div
                        className="absolute top-0 right-0 w-64 h-64 opacity-20"
                        style={{
                          background: `radial-gradient(circle at top right, ${feature.color}, transparent)`,
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-64 h-64 opacity-15"
                        style={{
                          background: `radial-gradient(circle at bottom left, ${feature.color}, transparent)`,
                        }}
                      />

                      <div className="relative z-10 text-center">
                        <div className="mb-6 flex justify-center">
                          <div
                            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl relative overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${feature.color}25, ${feature.color}15)`,
                              border: `2px solid ${feature.color}40`,
                              boxShadow: `0 20px 60px ${feature.glow}`,
                            }}
                          >
                            <div
                              className="absolute inset-0 blur-3xl opacity-60"
                              style={{
                                background: `radial-gradient(circle, ${feature.color}, transparent)`,
                              }}
                            />

                            <div className="relative z-10">
                              <Icon
                                size={48}
                                color={feature.color}
                                strokeWidth={2}
                                className="sm:w-14 sm:h-14 md:w-16 md:h-16"
                              />
                            </div>
                          </div>
                        </div>

                        <div
                          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
                          style={{
                            background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                            border: `1px solid ${feature.color}30`,
                          }}
                        >
                          <Sparkles size={14} color={feature.color} />
                          <span
                            className="text-xs sm:text-sm font-bold"
                            style={{ color: feature.color }}
                          >
                            Feature {featureIndex + 1} of {features.length}
                          </span>
                        </div>

                        <h3
                          className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4"
                          style={{
                            textShadow: `0 0 40px ${feature.glow}`,
                          }}
                        >
                          {feature.title}
                        </h3>

                        <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
                          {feature.description}
                        </p>
                      </div>

                      <div
                        className="absolute -inset-12 opacity-40 blur-3xl pointer-events-none -z-10"
                        style={{
                          background: `radial-gradient(circle, ${feature.glow}, transparent 70%)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="transition-all duration-300"
                style={{
                  width: activeFeatureIndex === featureIndex ? "40px" : "12px",
                  height: "12px",
                  borderRadius: "6px",
                  background:
                    activeFeatureIndex === featureIndex
                      ? `linear-gradient(90deg, ${feature.color}, ${feature.color}80)`
                      : "rgba(255, 255, 255, 0.2)",
                  boxShadow:
                    activeFeatureIndex === featureIndex
                      ? `0 0 20px ${feature.glow}`
                      : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div className="mb-32">
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className="relative max-w-4xl mx-auto p-8 sm:p-12 md:p-16 rounded-3xl overflow-hidden"
          >
            <div
              className="absolute inset-0 rounded-3xl p-[2px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))",
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(20, 20, 35, 0.98) 100%)",
                }}
              />
            </div>

            <div
              className="absolute inset-0 blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(99, 102, 241, 0.4), transparent 70%)",
              }}
            />

            <div className="relative z-10 text-center">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  boxShadow: "0 20px 60px rgba(79, 70, 229, 0.6)",
                }}
              >
                <span className="text-4xl">✨</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
                Always Free
              </h2>

              <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                We built DocFlux because we believe everyone deserves access to
                great tools. No paywalls, no premium tiers, no hidden costs.
                Just free, powerful document conversion.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
                {["No Tracking", "No Account Needed"].map(
                  (text, textIndex) => (
                    <div
                      key={textIndex}
                      className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="text-white/90">{text}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 text-lg">Everything you need to know</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, faqIndex) => (
              <div
                key={faqIndex}
                ref={(el) => (faqRefs.current[faqIndex] = el)}
                className="rounded-2xl backdrop-blur-xl border overflow-hidden"
                style={{
                  background: "rgba(30, 30, 45, 0.4)",
                  borderColor:
                    activeFaq === faqIndex
                      ? "rgba(129, 140, 248, 0.3)"
                      : "rgba(255, 255, 255, 0.1)",
                }}
              >
                <button
                  onClick={() => toggleFaq(faqIndex)}
                  className="w-full px-6 sm:px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white pr-8">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-indigo-400 flex-shrink-0 transition-transform duration-300 ${
                      activeFaq === faqIndex ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out ${
                    activeFaq === faqIndex
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-6 sm:px-8 pb-6 text-white/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={ctaRef}
          className="text-center py-20 px-8 rounded-3xl relative overflow-hidden"
        >
          <div
            className="absolute inset-0 rounded-3xl p-[2px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(79, 70, 229, 0.4), rgba(139, 92, 246, 0.4))",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(20, 20, 35, 0.98) 100%)",
              }}
            />
          </div>

          <div
            className="absolute inset-0 blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99, 102, 241, 0.5), transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              No sign-up required. Just upload your file and start converting.
            </p>

            <div className="inline-block relative group">
              <a
                href="/tools"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  boxShadow: "0 20px 60px rgba(79, 70, 229, 0.5)",
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    boxShadow: "0 25px 80px rgba(79, 70, 229, 0.7)",
                    y: -5,
                    scale: 1.05,
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    boxShadow: "0 20px 60px rgba(79, 70, 229, 0.5)",
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                  });
                }}
              >
                <span className="relative z-10">Try It Now!</span>
                <svg
                  className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>

                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
              </a>

              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  transform: "scale(1.1)",
                  animation:
                    "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
