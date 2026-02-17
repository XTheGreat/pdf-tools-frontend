import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileText,
  Combine,
  Scissors,
  Lock,
  Image,
  Edit3,
  Upload,
  Wand2,
  Download,
  CheckCircle2,
} from "lucide-react";

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
  const timelineSectionRef = useRef(null);
  const timelineHeadingRef = useRef(null);
  const timelineSubtitleRef = useRef(null);
  const stepRefs = useRef([]);
  const connectorRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

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
      description:
        "Convert your PDF documents to editable Word files with perfect formatting preservation.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      glowColor: "rgba(102, 126, 234, 0.5)",
      delay: 0,
      stats: "98% accuracy",
      color: "#667eea",
    },
    {
      icon: Combine,
      title: "Merge PDFs",
      description:
        "Combine multiple PDF files into one document seamlessly with drag-and-drop interface.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      glowColor: "rgba(240, 147, 251, 0.5)",
      delay: 0.1,
      stats: "Unlimited files",
      color: "#f093fb",
    },
    {
      icon: Scissors,
      title: "Split PDF",
      description:
        "Extract specific pages or split your PDF into multiple documents effortlessly.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      glowColor: "rgba(79, 172, 254, 0.5)",
      delay: 0.2,
      stats: "Batch processing",
      color: "#4facfe",
    },
    {
      icon: Lock,
      title: "Secure PDF",
      description:
        "Add password protection and encryption to keep your documents safe and private.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      glowColor: "rgba(67, 233, 123, 0.5)",
      delay: 0.3,
      stats: "AES-256 encryption",
      color: "#43e97b",
    },
    {
      icon: Image,
      title: "PDF to Image",
      description:
        "Convert PDF pages to high-quality images in PNG, JPG, or other formats.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      glowColor: "rgba(250, 112, 154, 0.5)",
      delay: 0.4,
      stats: "4K resolution",
      color: "#fa709a",
    },
    {
      icon: Edit3,
      title: "Edit PDF",
      description:
        "Add text, images, and annotations to your PDF files with our intuitive editor.",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      glowColor: "rgba(48, 207, 208, 0.5)",
      delay: 0.5,
      stats: "Real-time preview",
      color: "#30cfd0",
    },
  ];

  const timelineSteps = [
    {
      icon: Upload,
      step: "01",
      title: "Upload Your File",
      description:
        "Drag & drop or browse to upload your PDF. Supports files up to 2GB with instant cloud storage.",
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      glowColor: "rgba(102, 126, 234, 0.5)",
      detail: "Supports PDF, Word, Excel, PowerPoint and 20+ formats",
      badge: "Instant upload",
    },
    {
      icon: Wand2,
      step: "02",
      title: "Choose Your Tool",
      description:
        "Pick from 20+ powerful PDF tools. Convert, merge, split, compress, sign — everything in one place.",
      color: "#f093fb",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      glowColor: "rgba(240, 147, 251, 0.5)",
      detail: "AI-powered processing with 99.9% accuracy rate",
      badge: "AI-powered",
    },
    {
      icon: Edit3,
      step: "03",
      title: "Customize & Preview",
      description:
        "Fine-tune your settings and preview results in real-time before applying any changes.",
      color: "#4facfe",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      glowColor: "rgba(79, 172, 254, 0.5)",
      detail: "Live preview with before/after comparison slider",
      badge: "Real-time",
    },
    {
      icon: CheckCircle2,
      step: "04",
      title: "Process & Secure",
      description:
        "Your file is processed with military-grade encryption. All files auto-delete after 2 hours.",
      color: "#43e97b",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      glowColor: "rgba(67, 233, 123, 0.5)",
      detail: "AES-256 encryption, GDPR compliant processing",
      badge: "Encrypted",
    },
    {
      icon: Download,
      step: "05",
      title: "Download & Share",
      description:
        "Download instantly or share via link. Export to Google Drive, Dropbox, or OneDrive.",
      color: "#fa709a",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      glowColor: "rgba(250, 112, 154, 0.5)",
      detail: "One-click share to cloud storage and email",
      badge: "Multi-export",
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

    /* ─── Timeline Animations ─── */

    @keyframes connector-flow {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes connector-flow-vertical {
      0% { background-position: 0 -200%; }
      100% { background-position: 0 200%; }
    }

    @keyframes step-ping {
      0% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.4); opacity: 0.3; }
      100% { transform: scale(1.8); opacity: 0; }
    }

    @keyframes orbit-particle {
      0% { transform: rotate(0deg) translateX(36px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(36px) rotate(-360deg); }
    }

    @keyframes orbit-particle-2 {
      0% { transform: rotate(180deg) translateX(36px) rotate(-180deg); }
      100% { transform: rotate(540deg) translateX(36px) rotate(-540deg); }
    }

    @keyframes data-packet {
      0% { offset-distance: 0%; opacity: 0; transform: scale(0); }
      10% { opacity: 1; transform: scale(1); }
      90% { opacity: 1; transform: scale(1); }
      100% { offset-distance: 100%; opacity: 0; transform: scale(0); }
    }

    @keyframes step-card-glow {
      0%, 100% { box-shadow: 0 0 20px transparent; }
      50% { box-shadow: 0 0 40px var(--step-glow); }
    }

    @keyframes float-detail {
      0% { transform: translateY(8px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }

    @keyframes number-count {
      0% { transform: translateY(-100%); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }

    .timeline-connector-active {
      animation: connector-flow 2s linear infinite;
    }

    .timeline-connector-vertical-active {
      animation: connector-flow-vertical 2s linear infinite;
    }

    .step-orbit-1 {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      animation: orbit-particle 3s linear infinite;
    }

    .step-orbit-2 {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      animation: orbit-particle-2 3s linear infinite;
    }

    .step-ping {
      animation: step-ping 1.5s ease-out infinite;
    }

    .step-detail-enter {
      animation: float-detail 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .timeline-step-card {
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                  box-shadow 0.4s ease;
    }

    .timeline-step-card:hover {
      transform: translateY(-8px) scale(1.02);
    }

    @media (max-width: 768px) {
      .timeline-step-card:hover {
        transform: translateY(-4px) scale(1.01);
      }
    }

    .feature-card:focus-visible {
      outline: 2px solid ${FEATURES_THEME.accent};
      outline-offset: 4px;
    }
  `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60, scale: 0.9, rotationX: -20 },
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
        },
      );

      if (subtitleRef.current) {
        const words = subtitleRef.current.querySelectorAll(".subtitle-word");
        gsap.fromTo(
          words,
          { opacity: 0, y: 40, filter: "blur(10px)" },
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
          },
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (timelineHeadingRef.current) {
        gsap.fromTo(
          timelineHeadingRef.current,
          { opacity: 0, y: 50, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: timelineHeadingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (timelineSubtitleRef.current) {
        gsap.fromTo(
          timelineSubtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineSubtitleRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Steps staggered entrance
      stepRefs.current.forEach((step, index) => {
        if (!step) return;

        gsap.fromTo(
          step,
          {
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotationY: index % 2 === 0 ? -15 : 15,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            filter: "blur(0px)",
            duration: 1.0,
            delay: index * 0.15,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: step,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      connectorRefs.current.forEach((connector, index) => {
        if (!connector) return;

        gsap.fromTo(
          connector,
          { scaleX: 0, transformOrigin: "left center", opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15 + 0.4,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: connector,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, timelineSectionRef);

    return () => ctx.revert();
  }, []);

  const startFloatingAnimation = (card, index) => {
    if (!card) return;
    if (floatingAnimations.current[index]) {
      floatingAnimations.current[index].kill();
    }

    const timeline = gsap.timeline({ repeat: -1 });
    timeline.to(
      card,
      {
        y: isMobile ? -5 : -12,
        duration: 2.5 + index * 0.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      },
      0,
    );

    if (!isMobile) {
      timeline.to(
        card,
        {
          rotationY: index % 2 === 0 ? 2 : -2,
          duration: 4 + index * 0.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        0,
      );
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
                setTimeout(
                  () => {
                    setIsInitialized(true);
                    startFloatingAnimation(card, index);
                  },
                  1200 + features[index].delay * 1000,
                );
              },
            },
          },
        );
      }, card);

      contexts.push(ctx);
    });

    return () => {
      contexts.forEach((ctx) => ctx.revert());
      floatingAnimations.current.forEach((anim) => {
        if (anim) anim.kill();
      });
    };
  }, [isMobile]);

  const handleFeatureHover = (index, isEnter) => {
    const card = featuresRef.current[index];
    if (!card) return;

    if (isEnter) {
      if (floatingAnimations.current[index])
        floatingAnimations.current[index].pause();
      gsap.to(card, { scale: 1.05, y: -15, duration: 0.4, ease: "power2.out" });

      const iconContainer = card.querySelector(".icon-container");
      if (iconContainer)
        gsap.to(iconContainer, {
          scale: 1.1,
          rotate: 5,
          duration: 0.4,
          ease: "back.out(1.5)",
        });

      const icon = card.querySelector(".feature-icon");
      if (icon)
        gsap.to(icon, { scale: 1.15, duration: 0.4, ease: "back.out(1.5)" });

      const gradientBorder = card.querySelector(".gradient-border");
      if (gradientBorder)
        gsap.to(gradientBorder, { opacity: 1, duration: 0.3 });

      const statsBox = card.querySelector(".stats-box");
      if (statsBox)
        gsap.to(statsBox, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.5)",
        });

      const learnMore = card.querySelector(".learn-more");
      if (learnMore) gsap.to(learnMore, { opacity: 1, x: 0, duration: 0.3 });

      const shimmer = card.querySelector(".shimmer-effect");
      if (shimmer)
        gsap.fromTo(
          shimmer,
          { x: "-100%" },
          { x: "100%", duration: 0.8, ease: "power2.inOut" },
        );
    } else {
      if (floatingAnimations.current[index])
        floatingAnimations.current[index].resume();
      gsap.to(card, { scale: 1, y: 0, duration: 0.4, ease: "power2.out" });

      const iconContainer = card.querySelector(".icon-container");
      if (iconContainer)
        gsap.to(iconContainer, {
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
        });

      const icon = card.querySelector(".feature-icon");
      if (icon)
        gsap.to(icon, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });

      const gradientBorder = card.querySelector(".gradient-border");
      if (gradientBorder)
        gsap.to(gradientBorder, { opacity: 0.6, duration: 0.3 });

      const statsBox = card.querySelector(".stats-box");
      if (statsBox)
        gsap.to(statsBox, { y: 5, opacity: 0.8, scale: 0.95, duration: 0.3 });

      const learnMore = card.querySelector(".learn-more");
      if (learnMore) gsap.to(learnMore, { opacity: 0, x: -10, duration: 0.3 });
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedFeature(selectedFeature === index ? null : index);
      const card = featuresRef.current[index];
      if (card) {
        gsap.fromTo(
          card,
          { scale: 1 },
          {
            scale: 1.03,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          },
        );
      }
    }
  };

  const handleStepHover = (index, isEnter) => {
    const step = stepRefs.current[index];
    if (!step) return;

    if (isEnter) {
      setActiveStep(index);

      gsap.to(step, {
        y: -10,
        scale: 1.03,
        duration: 0.4,
        ease: "back.out(1.5)",
      });

      const iconEl = step.querySelector(".timeline-icon-wrap");
      if (iconEl) {
        gsap.to(iconEl, {
          scale: 1.15,
          rotate: 8,
          duration: 0.4,
          ease: "back.out(2)",
        });
      }

      const detailEl = step.querySelector(".step-detail");
      if (detailEl) {
        gsap.fromTo(
          detailEl,
          { opacity: 0, y: 8, height: 0 },
          {
            opacity: 1,
            y: 0,
            height: "auto",
            duration: 0.35,
            ease: "power3.out",
          },
        );
      }

      const shimmerEl = step.querySelector(".timeline-shimmer");
      if (shimmerEl) {
        gsap.fromTo(
          shimmerEl,
          { x: "-100%" },
          { x: "100%", duration: 0.9, ease: "power2.inOut" },
        );
      }
    } else {
      setActiveStep(null);

      gsap.to(step, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      const iconEl = step.querySelector(".timeline-icon-wrap");
      if (iconEl) {
        gsap.to(iconEl, {
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
        });
      }

      const detailEl = step.querySelector(".step-detail");
      if (detailEl) {
        gsap.to(detailEl, {
          opacity: 0,
          y: 4,
          height: 0,
          duration: 0.25,
          ease: "power2.in",
        });
      }
    }
  };

  const handleStepClick = (index) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );

    const step = stepRefs.current[index];
    if (step) {
      gsap.fromTo(
        step,
        { scale: 1 },
        {
          scale: 1.06,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
      );
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
    <>
      {/* ─── Features Section ─── */}
      <section
        ref={sectionRef}
        className="relative min-h-screen py-24 px-6 overflow-hidden"
        aria-label="Features section"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, #140824, #0a0f1f, #071e35, #16123a, #140824)`,
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
                willChange: "transform, opacity",
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
                    style={{ background: feature.gradient }}
                  >
                    <div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: `linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(20, 20, 35, 0.98) 50%, rgba(15, 15, 25, 0.95) 100%)`,
                      }}
                    />
                  </div>

                  <div className="relative h-full p-8 rounded-3xl backdrop-blur-xl overflow-hidden">
                    <div
                      className="absolute top-0 right-0 w-20 h-20 opacity-30"
                      style={{
                        background: `radial-gradient(circle at top right, ${feature.color}, transparent)`,
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-20 h-20 opacity-20"
                      style={{
                        background: `radial-gradient(circle at bottom left, ${feature.color}, transparent)`,
                      }}
                    />

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
                          <IconComponent
                            size={36}
                            color={feature.color}
                            strokeWidth={2}
                          />
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
                    boxShadow: `0 15px 60px ${FEATURES_THEME.glow}, 0 0 80px ${FEATURES_THEME.glow}`,
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
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                </span>
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(79, 70, 229, 0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mt-20 z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div
              ref={timelineHeadingRef}
              className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full text-sm font-semibold"
              style={{
                background: "rgba(79, 70, 229, 0.15)",
                border: "1px solid rgba(129, 140, 248, 0.3)",
                color: "#818cf8",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#818cf8",
                  boxShadow: "0 0 8px #818cf8",
                  animation: "pulse-ring 2s ease infinite",
                }}
              />
              Step-by-step workflow
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5">
              <span className="inline-block">
                {"How It".split("").map((letter, i) => (
                  <span
                    key={i}
                    className={`letter-glow-${i} inline-block`}
                    style={{
                      display: letter === " " ? "inline" : "inline-block",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>{" "}
              <span className="inline-block">
                {"Works".split("").map((letter, i) => (
                  <span
                    key={i}
                    className={`letter-glow-${i} inline-block`}
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${FEATURES_THEME.accent}, ${FEATURES_THEME.accentLight})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: letter === " " ? "inline" : "inline-block",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>{" "}
            </h2>

            <p
              ref={timelineSubtitleRef}
              className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            >
              From upload to download in seconds.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="relative flex items-start justify-between gap-0">
              {timelineSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = activeStep === index;
                const isDone = completedSteps.includes(index);

                return (
                  <div
                    key={index}
                    className="relative flex-1 flex flex-col items-center"
                  >
                    {index < timelineSteps.length - 1 && (
                      <div
                        ref={(el) => (connectorRefs.current[index] = el)}
                        className="absolute top-[40px] left-1/2 w-full h-[3px] -z-0 overflow-hidden"
                        style={{ transformOrigin: "left center" }}
                        aria-hidden="true"
                      >
                        <div
                          className={`h-full w-full ${activeStep === index || activeStep === index + 1 ? "timeline-connector-active" : ""}`}
                          style={{
                            background:
                              activeStep === index || activeStep === index + 1
                                ? `linear-gradient(90deg, ${step.color}00, ${step.color}, ${timelineSteps[index + 1].color}, ${timelineSteps[index + 1].color}00)`
                                : isDone
                                  ? `linear-gradient(90deg, ${step.color}60, ${timelineSteps[index + 1].color}60)`
                                  : "rgba(129, 140, 248, 0.2)",
                            backgroundSize: "200% 100%",
                            transition: "background 0.4s ease",
                          }}
                        />
                        {activeStep === index && (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                            style={{
                              background: step.color,
                              boxShadow: `0 0 12px ${step.color}, 0 0 24px ${step.color}80`,
                              left: "-6px",
                              animation: "connector-flow 1.2s linear infinite",
                              backgroundSize: "300% 100%",
                              backgroundImage: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
                            }}
                          />
                        )}
                      </div>
                    )}

                    <div
                      ref={(el) => (stepRefs.current[index] = el)}
                      className="timeline-step-card relative w-full max-w-[200px] cursor-pointer"
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: "800px",
                        "--step-glow": step.glowColor,
                      }}
                      onMouseEnter={() => handleStepHover(index, true)}
                      onMouseLeave={() => handleStepHover(index, false)}
                      onClick={() => handleStepClick(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleStepClick(index);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Step ${step.step}: ${step.title}`}
                      aria-pressed={isDone}
                    >
                      <div className="flex justify-center mb-5 relative z-10">
                        <div className="relative">
                          <div
                            className="absolute -inset-8 rounded-3xl -z-10"
                            style={{
                              background: `radial-gradient(circle at center, ${step.color}15 0%, ${step.color}08 40%, transparent 70%)`,
                            }}
                          />

                          <div
                            className="absolute -inset-4 rounded-2xl -z-10 opacity-30"
                            style={{
                              background: `repeating-radial-gradient(circle at center, transparent 0px, transparent 10px, ${step.color}20 10px, ${step.color}20 11px)`,
                            }}
                          />

                          {isActive && (
                            <div
                              className="step-ping absolute inset-0 rounded-full"
                              style={{
                                background: `${step.color}30`,
                                border: `2px solid ${step.color}60`,
                              }}
                            />
                          )}

                          {isActive && (
                            <>
                              <div
                                className="step-orbit-1"
                                style={{
                                  background: step.color,
                                  boxShadow: `0 0 6px ${step.color}`,
                                }}
                              />
                              <div
                                className="step-orbit-2"
                                style={{
                                  background: step.color,
                                  opacity: 0.6,
                                }}
                              />
                            </>
                          )}

                          <div
                            className="timeline-icon-wrap relative flex items-center justify-center w-[72px] h-[72px] rounded-2xl z-10 overflow-hidden"
                            style={{
                              background: isDone
                                ? `rgba(${parseInt(step.color.slice(1, 3), 16)}, ${parseInt(step.color.slice(3, 5), 16)}, ${parseInt(step.color.slice(5, 7), 16)}, 0.25)`
                                : `rgba(${parseInt(step.color.slice(1, 3), 16)}, ${parseInt(step.color.slice(3, 5), 16)}, ${parseInt(step.color.slice(5, 7), 16)}, 0.12)`,
                              border: `2px solid ${isActive || isDone ? step.color + "80" : step.color + "30"}`,
                              boxShadow: isActive
                                ? `0 0 30px ${step.glowColor}, 0 0 60px ${step.glowColor}60, inset 0 0 20px ${step.color}15`
                                : isDone
                                  ? `0 0 20px ${step.glowColor}50, inset 0 0 15px ${step.color}10`
                                  : `inset 0 0 10px ${step.color}08`,
                              transition: "all 0.35s ease",
                              backdropFilter: "blur(16px) saturate(180%)",
                              WebkitBackdropFilter: "blur(16px) saturate(180%)",
                            }}
                          >
                            <div
                              className="absolute inset-0 rounded-2xl"
                              style={{
                                background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)`,
                              }}
                            />

                            <div
                              className="absolute inset-0 rounded-2xl blur-2xl opacity-40 -z-10"
                              style={{
                                background: `radial-gradient(circle, ${step.color}60, transparent 70%)`,
                              }}
                            />

                            <IconComponent
                              size={30}
                              color={
                                isActive || isDone
                                  ? step.color
                                  : `${step.color}cc`
                              }
                              strokeWidth={2.5}
                              className="relative z-10 drop-shadow-lg"
                              style={{
                                transition: "all 0.3s ease",
                                filter: `drop-shadow(0 0 8px ${step.color}40)`,
                              }}
                            />
                          </div>

                          {isDone && (
                            <div
                              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center z-20"
                              style={{
                                background: step.gradient,
                                boxShadow: `0 0 10px ${step.glowColor}`,
                              }}
                            >
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <path
                                  d="M2 5l2 2 4-4"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className="relative rounded-2xl p-4 overflow-hidden"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, rgba(15,15,28,0.95) 0%, rgba(${step.color
                                .replace("#", "")
                                .match(/.{2}/g)
                                .map((h) => parseInt(h, 16))
                                .join(",")}, 0.08) 100%)`
                            : "rgba(12,12,22,0.85)",
                          border: `1px solid ${isActive ? step.color + "40" : "rgba(129,140,248,0.1)"}`,
                          backdropFilter: "blur(12px)",
                          transition: "all 0.35s ease",
                          boxShadow: isActive
                            ? `0 8px 40px ${step.glowColor}30`
                            : "none",
                        }}
                      >
                        <div
                          className="timeline-shimmer absolute inset-0 -translate-x-full pointer-events-none"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${step.glowColor}, transparent)`,
                          }}
                        />

                        <div
                          className="text-xs font-black mb-2 tracking-widest"
                          style={{
                            background: step.gradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {step.step}
                        </div>

                        <div
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold mb-3"
                          style={{
                            background: `${step.color}18`,
                            border: `1px solid ${step.color}30`,
                            color: step.color,
                          }}
                        >
                          <div
                            className="w-1 h-1 rounded-full"
                            style={{ background: step.color }}
                          />
                          {step.badge}
                        </div>

                        <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                          {step.title}
                        </h3>

                        <p className="text-white/55 text-xs leading-relaxed">
                          {step.description}
                        </p>

                        <div
                          className="step-detail overflow-hidden"
                          style={{ height: 0, opacity: 0 }}
                        >
                          <div
                            className="mt-3 pt-3 text-[11px] leading-relaxed rounded-lg px-3 py-2"
                            style={{
                              background: `${step.color}10`,
                              border: `1px solid ${step.color}25`,
                              color: `${step.color}cc`,
                              borderLeft: `3px solid ${step.color}60`,
                            }}
                          >
                            {step.detail}
                          </div>
                        </div>

                        <div
                          className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at bottom right, ${step.color}25, transparent)`,
                            opacity: isActive ? 1 : 0.4,
                            transition: "opacity 0.3s ease",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <span className="text-white/30 text-sm">
                {completedSteps.length === 0
                  ? "Click steps to mark progress"
                  : `${completedSteps.length} of ${timelineSteps.length} steps explored`}
              </span>
              <div
                className="flex-1 max-w-xs h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(129,140,248,0.12)" }}
              >
                <div
                  className="h-full rounded-full ease-out"
                  style={{
                    width: `${(completedSteps.length / timelineSteps.length) * 100}%`,
                    background:
                      "linear-gradient(90deg, #667eea, #818cf8, #f093fb)",
                    boxShadow:
                      completedSteps.length > 0
                        ? "0 0 12px rgba(129,140,248,0.6)"
                        : "none",
                  }}
                />
              </div>
              {completedSteps.length === timelineSteps.length && (
                <span
                  className="text-sm font-bold"
                  style={{ color: "#43e97b" }}
                >
                  All steps done!
                </span>
              )}
            </div>
          </div>

          <div className="md:hidden relative">
            <div className="flex flex-col gap-6">
              {timelineSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = activeStep === index;
                const isDone = completedSteps.includes(index);

                return (
                  <div key={index} className="relative flex gap-6 items-start">
                    {index < timelineSteps.length - 1 && (
                      <div
                        className="absolute left-[30px] top-[40px] w-[2px] h-[calc(100%+20px)] -z-0"
                        style={{
                          background: isDone
                            ? `linear-gradient(180deg, ${step.color}60, ${timelineSteps[index + 1].color}30)`
                            : `rgba(129,140,248,0.06)`,
                          transition: "background 0.5s ease",
                        }}
                        aria-hidden="true"
                      />
                    )}

                    <div className="relative flex-shrink-0 z-10">
                      {isDone && (
                        <div
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center z-20"
                          style={{ background: step.gradient }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                          >
                            <path
                              d="M1.5 4l1.5 1.5 3.5-3.5"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}

                      <div
                        className="timeline-icon-wrap flex items-center justify-center w-[60px] h-[60px] rounded-xl relative"
                        style={{
                          background: isDone
                            ? `${step.color}25`
                            : `${step.color}10`,
                          border: `2px solid ${isActive || isDone ? step.color + "70" : step.color + "20"}`,
                          boxShadow: isActive
                            ? `0 0 20px ${step.glowColor}`
                            : "none",
                          transition: "all 0.3s ease",
                        }}
                        onClick={() => handleStepClick(index)}
                      >
                        <IconComponent
                          size={26}
                          color={
                            isActive || isDone ? step.color : `${step.color}60`
                          }
                          strokeWidth={2}
                        />
                      </div>
                    </div>

                    <div
                      ref={(el) => (stepRefs.current[index] = el)}
                      className="flex-1 rounded-2xl p-5 cursor-pointer"
                      style={{
                        background: "rgba(12,12,22,0.9)",
                        border: `1px solid ${isActive ? step.color + "35" : "rgba(129,140,248,0.08)"}`,
                        transition: "all 0.3s ease",
                        boxShadow: isActive
                          ? `0 4px 30px ${step.glowColor}20`
                          : "none",
                      }}
                      onTouchStart={() => handleStepHover(index, true)}
                      onTouchEnd={() => handleStepHover(index, false)}
                      onClick={() => handleStepClick(index)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs font-black tracking-widest"
                          style={{
                            background: step.gradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {step.step}
                        </span>
                        <div
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                          style={{
                            background: `${step.color}18`,
                            border: `1px solid ${step.color}30`,
                            color: step.color,
                          }}
                        >
                          {step.badge}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-white/55 text-xs leading-relaxed">
                        {step.description}
                      </p>

                      {isActive && (
                        <div
                          className="mt-3 pt-3 border-t text-[11px] leading-relaxed step-detail-enter"
                          style={{
                            borderColor: `${step.color}20`,
                            color: `${step.color}bb`,
                          }}
                        >
                          {step.detail}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 px-2">
              <div className="flex justify-between text-xs text-white/30 mb-2">
                <span>Progress</span>
                <span>
                  {completedSteps.length}/{timelineSteps.length}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(129,140,248,0.1)" }}
              >
                <div
                  className="h-full rounded-full ease-out"
                  style={{
                    width: `${(completedSteps.length / timelineSteps.length) * 100}%`,
                    background: "linear-gradient(90deg, #667eea, #818cf8)",
                    boxShadow:
                      completedSteps.length > 0
                        ? "0 0 8px rgba(129,140,248,0.5)"
                        : "none",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-white/40 text-sm mb-6">
              Ready to get started? It only takes 30 seconds.
            </p>
            <div className="inline-block relative group">
              <button
                className="px-8 py-4 rounded-full font-bold text-lg text-white relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #f093fb 50%, #fa709a 100%)",
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 4s ease infinite",
                  boxShadow: "0 10px 40px rgba(102,126,234,0.4)",
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.06,
                    boxShadow:
                      "0 15px 60px rgba(102,126,234,0.6), 0 0 80px rgba(240,147,251,0.3)",
                    duration: 0.3,
                    ease: "back.out(1.5)",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    boxShadow: "0 10px 40px rgba(102,126,234,0.4)",
                    duration: 0.3,
                  });
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Try It Free — No signup needed
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                </span>
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
