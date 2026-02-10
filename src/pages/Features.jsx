import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Combine, Scissors, Lock, Image, Edit3 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const featuresRef = useRef([]);
  const particlesRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [setIsInitialized] = useState(false);
  
  const floatingAnimations = useRef([]);

  const FEATURES_THEME = {
    glow: "rgba(79, 70, 229, 0.4)",
    accent: "#4f46e5",
    accentLight: "#818cf8",
    bg: "rgba(10, 10, 13, 1)",
  };

  const features = [
    {
      icon: FileText,
      title: "PDF to Word",
      description: "Convert your PDF documents to editable Word files with perfect formatting preservation.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      glowColor: "rgba(102, 126, 234, 0.5)",
      delay: 0,
      stats: "98% accuracy",
      color: "#667eea",
    },
    {
      icon: Combine,
      title: "Merge PDFs",
      description: "Combine multiple PDF files into one document seamlessly with drag-and-drop interface.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      glowColor: "rgba(240, 147, 251, 0.5)",
      delay: 0.1,
      stats: "Unlimited files",
      color: "#f093fb",
    },
    {
      icon: Scissors,
      title: "Split PDF",
      description: "Extract specific pages or split your PDF into multiple documents effortlessly.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      glowColor: "rgba(79, 172, 254, 0.5)",
      delay: 0.2,
      stats: "Batch processing",
      color: "#4facfe",
    },
    {
      icon: Lock,
      title: "Secure PDF",
      description: "Add password protection and encryption to keep your documents safe and private.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      glowColor: "rgba(67, 233, 123, 0.5)",
      delay: 0.3,
      stats: "AES-256 encryption",
      color: "#43e97b",
    },
    {
      icon: Image,
      title: "PDF to Image",
      description: "Convert PDF pages to high-quality images in PNG, JPG, or other formats.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      glowColor: "rgba(250, 112, 154, 0.5)",
      delay: 0.4,
      stats: "4K resolution",
      color: "#fa709a",
    },
    {
      icon: Edit3,
      title: "Edit PDF",
      description: "Add text, images, and annotations to your PDF files with our intuitive editor.",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      glowColor: "rgba(48, 207, 208, 0.5)",
      delay: 0.5,
      stats: "Real-time preview",
      color: "#30cfd0",
    },
  ];

const getParticleCount = () => {
  return window.innerWidth < 768 ? 100 : 200;
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

  if (particlesRef.current.length === 0) {
    particlesRef.current = Array(getParticleCount()).fill(null);
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

    @keyframes letter-glow-wave {
      0% {
        text-shadow: 
          0 0 0px transparent,
          0 0 0px transparent,
          0 0 0px transparent;
        filter: brightness(1);
      }
      50% {
        text-shadow: 
          0 0 30px rgba(129, 140, 248, 1),
          0 0 60px rgba(129, 140, 248, 0.8),
          0 0 90px rgba(129, 140, 248, 0.6);
        filter: brightness(1.5) drop-shadow(0 0 20px rgba(129, 140, 248, 0.8));
      }
      100% {
        text-shadow: 
          0 0 0px transparent,
          0 0 0px transparent,
          0 0 0px transparent;
        filter: brightness(1);
      }
    }

    .letter-glow-0 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 0s; }
    .letter-glow-1 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 0.15s; }
    .letter-glow-2 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 0.3s; }
    .letter-glow-3 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 0.45s; }
    .letter-glow-4 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 0.6s; }
    .letter-glow-5 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 0.75s; }
    .letter-glow-6 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 0.9s; }
    .letter-glow-7 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 1.05s; }
    .letter-glow-8 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 1.2s; }

    .letter-glow-9 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 1.35s; }
    .letter-glow-10 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 1.5s; }
    .letter-glow-11 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 1.65s; }
    .letter-glow-12 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 1.8s; }
    .letter-glow-13 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 1.95s; }
    .letter-glow-14 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 2.1s; }
    .letter-glow-15 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 2.25s; }
    .letter-glow-16 { animation: letter-glow-wave 4s ease-in-out infinite; animation-delay: 2.4s; }

    @keyframes word-fade-slide {
      0% {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
        filter: blur(10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }
    }

    @keyframes shimmer-sweep {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }

    .subtitle-word {
      display: inline-block;
      opacity: 0;
      animation: word-fade-slide 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .subtitle-shimmer {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.7) 0%,
        rgba(255, 255, 255, 0.7) 40%,
        rgba(129, 140, 248, 1) 50%,
        rgba(255, 255, 255, 0.7) 60%,
        rgba(255, 255, 255, 0.7) 100%
      );
      background-size: 200% auto;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer-sweep 3s linear infinite;
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

    @keyframes gridMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(80px, 80px); }
    }

    @media (max-width: 640px) {
      .subtitle-word {
        margin: 0 2px;
      }
    }
  `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9,
          rotationX: -20,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.4,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (subtitleRef.current) {
        const words = subtitleRef.current.querySelectorAll('.subtitle-word');
        gsap.fromTo(
          words,
          { 
            opacity: 0, 
            y: 40,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.08,
            delay: 0.4,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

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

    }, sectionRef);

    return () => ctx.revert();
  }, [particlePositions]);

  const startFloatingAnimation = (card, index) => {
    if (!card) return;

    if (floatingAnimations.current[index]) {
      floatingAnimations.current[index].kill();
    }

    const timeline = gsap.timeline({ repeat: -1 });

    timeline.to(card, {
      y: isMobile ? -5 : -12,
      duration: 2.5 + index * 0.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    }, 0);

    if (!isMobile) {
      timeline.to(card, {
        rotationY: index % 2 === 0 ? 2 : -2,
        duration: 4 + index * 0.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }, 0);
    }

    floatingAnimations.current[index] = timeline;
  };

  useEffect(() => {
    const contexts = [];
    
    featuresRef.current.forEach((card, index) => {
      if (!card) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotationX: -30,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 1.2,
            delay: features[index].delay,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
              onEnter: () => {
                setTimeout(() => {
                  setIsInitialized(true);
                  startFloatingAnimation(card, index);
                }, 1200 + features[index].delay * 1000);
              },
            },
          }
        );
      }, card);

      contexts.push(ctx);
    });

    return () => {
      contexts.forEach(ctx => ctx.revert());
      floatingAnimations.current.forEach(anim => {
        if (anim) anim.kill();
      });
    };
  }, [isMobile]); 

  const handleFeatureHover = (index, isEnter) => {
    const card = featuresRef.current[index];
    if (!card) return;

    if (isEnter) {
      if (floatingAnimations.current[index]) {
        floatingAnimations.current[index].pause();
      }

      gsap.to(card, {
        scale: 1.05,
        y: -15,
        duration: 0.4,
        ease: "power2.out",
      });

      const iconContainer = card.querySelector(".icon-container");
      if (iconContainer) {
        gsap.to(iconContainer, {
          scale: 1.1,
          rotate: 5,
          duration: 0.4,
          ease: "back.out(1.5)",
        });
      }

      const icon = card.querySelector(".feature-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1.15,
          duration: 0.4,
          ease: "back.out(1.5)",
        });
      }

      const gradientBorder = card.querySelector(".gradient-border");
      if (gradientBorder) {
        gsap.to(gradientBorder, {
          opacity: 1,
          duration: 0.3,
        });
      }

      const statsBox = card.querySelector(".stats-box");
      if (statsBox) {
        gsap.to(statsBox, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.5)",
        });
      }

      const learnMore = card.querySelector(".learn-more");
      if (learnMore) {
        gsap.to(learnMore, {
          opacity: 1,
          x: 0,
          duration: 0.3,
        });
      }

      const shimmer = card.querySelector(".shimmer-effect");
      if (shimmer) {
        gsap.fromTo(shimmer,
          { x: "-100%" },
          { x: "100%", duration: 0.8, ease: "power2.inOut" }
        );
      }

    } else {
      if (floatingAnimations.current[index]) {
        floatingAnimations.current[index].resume();
      }

      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      const iconContainer = card.querySelector(".icon-container");
      if (iconContainer) {
        gsap.to(iconContainer, {
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
        });
      }

      const icon = card.querySelector(".feature-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
        });
      }

      const gradientBorder = card.querySelector(".gradient-border");
      if (gradientBorder) {
        gsap.to(gradientBorder, {
          opacity: 0.6,
          duration: 0.3,
        });
      }

      const statsBox = card.querySelector(".stats-box");
      if (statsBox) {
        gsap.to(statsBox, {
          y: 5,
          opacity: 0.8,
          scale: 0.95,
          duration: 0.3,
        });
      }

      const learnMore = card.querySelector(".learn-more");
      if (learnMore) {
        gsap.to(learnMore, {
          opacity: 0,
          x: -10,
          duration: 0.3,
        });
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedFeature(selectedFeature === index ? null : index);
      
      const card = featuresRef.current[index];
      if (card) {
        gsap.fromTo(card, 
          { scale: 1 },
          { 
            scale: 1.03,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          }
        );
      }
    }
  };

  const renderSubtitle = () => {
    const text = "Everything you need to work with PDFs, all in one place";
    const words = text.split(" ");
    
    return words.map((word, index) => (
      <span
        key={index}
        className="subtitle-word subtitle-shimmer"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {word}
        {index < words.length - 1 ? "\u00A0" : ""}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
      aria-label="Features section"
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

      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: FEATURES_THEME.accentLight,
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              opacity: 0.6,
              boxShadow: `0 0 10px ${FEATURES_THEME.accentLight}`,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 hexagon-glow -z-10"
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
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, ${FEATURES_THEME.bg} 100%)`,
        }}
        aria-hidden="true"
      />

      <style>{`
        .feature-card:focus-visible {
          outline: 2px solid ${FEATURES_THEME.accent};
          outline-offset: 4px;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mt-5">
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            <span className="inline-block">
              {"Powerful ".split("").map((letter, index) => (
                <span
                  key={index}
                  className={`letter-glow-${index} inline-block`}
                  style={{
                    display: letter === " " ? "inline" : "inline-block",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>
            <span className="inline-block">
              {"Features".split("").map((letter, index) => (
                <span
                  key={index}
                  className={`letter-glow-${index + 9} inline-block bg-clip-text text-transparent`}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${FEATURES_THEME.accent}, ${FEATURES_THEME.accentLight})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h2>
          
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            {renderSubtitle()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => (featuresRef.current[index] = el)}
                onMouseEnter={() => handleFeatureHover(index, true)}
                onMouseLeave={() => handleFeatureHover(index, false)}
                onFocus={() => handleFeatureHover(index, true)}
                onBlur={() => handleFeatureHover(index, false)}
                onKeyDown={(e) => handleKeyPress(e, index)}
                tabIndex={0}
                role="article"
                aria-label={`${feature.title}: ${feature.description}`}
                className="feature-card relative group cursor-pointer focus:outline-none"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1200px",
                }}
              >
                <div
                  className="gradient-border absolute inset-0 rounded-3xl p-[2px] opacity-60 transition-opacity duration-300"
                  style={{
                    background: feature.gradient,
                  }}
                >
                  <div className="absolute inset-0 rounded-3xl" style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(15, 15, 25, 0.95) 0%, 
                        rgba(20, 20, 35, 0.98) 50%,
                        rgba(15, 15, 25, 0.95) 100%
                      )
                    `,
                  }} />
                </div>

                <div className="relative h-full p-8 rounded-3xl backdrop-blur-xl overflow-hidden">
                  
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-30" style={{
                    background: `radial-gradient(circle at top right, ${feature.color}, transparent)`,
                  }} />
                  <div className="absolute bottom-0 left-0 w-20 h-20 opacity-20" style={{
                    background: `radial-gradient(circle at bottom left, ${feature.color}, transparent)`,
                  }} />

                  <div
                    className="shimmer-effect absolute inset-0 -translate-x-full pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${feature.glowColor}, transparent)`,
                    }}
                  />

                  <div className="relative mb-6 z-10">
                    <div
                      className="icon-container inline-flex items-center justify-center w-20 h-20 rounded-2xl relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                        border: `1px solid ${feature.color}30`,
                        boxShadow: `0 8px 32px ${feature.glowColor}40`,
                      }}
                    >
                      <div
                        className="absolute inset-0 blur-xl opacity-50"
                        style={{
                          background: `radial-gradient(circle, ${feature.color}, transparent)`,
                        }}
                      />
                      
                      <div className="feature-icon relative z-10">
                        <IconComponent size={36} color={feature.color} strokeWidth={2} />
                      </div>
                    </div>
                  </div>

                  <div
                    className="stats-box absolute top-6 right-6 px-4 py-2 rounded-xl text-xs font-bold opacity-80 scale-95 translate-y-1 duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}30, ${feature.color}20)`,
                      border: `1px solid ${feature.color}40`,
                      color: feature.color,
                      boxShadow: `0 4px 20px ${feature.glowColor}30`,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: feature.color,
                          boxShadow: `0 0 8px ${feature.color}`,
                        }}
                      />
                      {feature.stats}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 relative z-10">
                    {feature.title}
                  </h3>

                  <p className="text-white/70 leading-relaxed relative z-10 mb-6">
                    {feature.description}
                  </p>

                  <div className="learn-more relative z-10 flex items-center gap-2 text-sm font-semibold opacity-0 -translate-x-2">
                    <span
                      style={{
                        background: feature.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Learn more
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: feature.color }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>

                  <div
                    className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none -z-10"
                    style={{
                      background: `radial-gradient(circle, ${feature.glowColor}, transparent 70%)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 text-center">
          <div className="inline-block relative group">
            <button
              className="px-8 py-4 rounded-full font-bold text-lg relative overflow-hidden hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${FEATURES_THEME.accent}, ${FEATURES_THEME.accentLight})`,
                boxShadow: `0 10px 40px ${FEATURES_THEME.glow}`,
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: `
                    0 15px 60px ${FEATURES_THEME.glow},
                    0 0 80px ${FEATURES_THEME.glow}
                  `,
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: `0 10px 40px ${FEATURES_THEME.glow}`,
                  duration: 0.3,
                });
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Started Free
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
              />
            </button>

            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
              style={{
                background: `linear-gradient(135deg, ${FEATURES_THEME.accent}, ${FEATURES_THEME.accentLight})`,
                transform: 'scale(1.1)',
                animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}