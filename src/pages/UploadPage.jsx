import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import Particles from "../components/Particles";
import { useLayoutEffect } from "react";
import { FileText, Image, Minimize2, Upload, FolderOpen } from "lucide-react";

export default function UploadPage() {
  const progressBarRef = useRef(null);
  const orbRef = useRef(null);
  const pollingRef = useRef(null);
  const tiltCard = useRef(null);
  const contentCard = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const lastMove = useRef(0);
  const listRef = useRef(null);
  const qualityListRef = useRef(null);
  const indicatorRef = useRef(null);
  const shineRef = useRef(null);
  const labelRefs = useRef([]);
  const fileAreaRef = useRef(null);
  const canvasRef = useRef(null);
  const trailPointsRef = useRef([]);
  const searchInputRef = useRef(null);
  const statsCardRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timeoutsRef = useRef([]);

  const [file, setFile] = useState(null);
  const [type, setType] = useState("office-to-pdf");
  const [quality, setQuality] = useState("ebook");
  const [jobId, setJobId] = useState(null);
  const [outputPath, setOutputPath] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openQuality, setOpenQuality] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fakeProgress, setFakeProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentFiles, setRecentFiles] = useState([]);
  const [processingMessage, setProcessingMessage] = useState(
    "Analyzing your file...",
  );

  const options = [
    {
      label: "Office to PDF",
      value: "office-to-pdf",
      icon: FileText,
      description: "Convert Word, Excel, PowerPoint to PDF",
    },
    {
      label: "Image to PDF",
      value: "image-to-pdf",
      icon: Image,
      description: "Convert images to PDF format",
    },
    {
      label: "Compress PDF",
      value: "compress-pdf",
      icon: Minimize2,
      description: "Reduce PDF file size",
    },
    {
      label: "Coming Soon: Merge PDFs etc",
      value: "merge-pdfs",
      icon: FolderOpen,
      description: "Merge multiple PDFs into one",
    },
  ];

  const qualityOptions = [
    {
      label: "Low (smallest)",
      value: "screen",
      description: "72 DPI - Screen",
    },
    { label: "Medium", value: "ebook", description: "150 DPI - E-readers" },
    { label: "High", value: "printer", description: "300 DPI - Print" },
    { label: "Very High", value: "prepress", description: "300 DPI - Pro" },
  ];

  const processingMessages = [
    "Analyzing your file...",
    "Processing document...",
    "Optimizing quality...",
    "Almost there...",
    "Finalizing...",
  ];

  const TOOL_THEME = {
    "office-to-pdf": {
      glow: "rgba(79, 70, 229, 0.35)",
      accent: "#4f46e5",
      gradient: "from-indigo-600 to-indigo-800",
    },
    "image-to-pdf": {
      glow: "rgba(14, 165, 233, 0.35)",
      accent: "#0ea5e9",
      gradient: "from-sky-600 to-sky-800",
    },
    "compress-pdf": {
      glow: "rgba(168, 85, 247, 0.35)",
      accent: "#a855f7",
      gradient: "from-purple-600 to-purple-800",
    },
  };

const API_URL = "https://pdf-tools-backend-production-7cec.up.railway.app";

  useEffect(() => {
    const stored = localStorage.getItem("recentFiles");
    if (stored) {
      try {
        setRecentFiles(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse recent files", e);
      }
    }
  }, []);

  const saveToRecent = useCallback(
    (fileName, toolType) => {
      const newRecent = [
        { name: fileName, type: toolType, date: new Date().toISOString() },
        ...recentFiles.filter((f) => f.name !== fileName),
      ].slice(0, 5);
      setRecentFiles(newRecent);
      localStorage.setItem("recentFiles", JSON.stringify(newRecent));
    },
    [recentFiles],
  );

  const upload = useCallback(async () => {
    if (!file || loading) return;

    hardReset(true);
    setLoading(true);
    setProcessingMessage("Analyzing your file...");

    await new Promise((r) => requestAnimationFrame(r));

    if (type === "office-to-pdf" && file.type.startsWith("image/")) {
      setError(
        "It looks like you uploaded an image. Please use the Image to PDF tool instead.",
      );
      setLoading(false);
      return;
    }

    if (type === "image-to-pdf" && !file.type.startsWith("image/")) {
      setError("Please upload an image file to continue.");
      setLoading(false);
      return;
    }

    if (type === "compress-pdf" && file.type !== "application/pdf") {
      setError("Please upload a PDF file to use the Compress PDF feature.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      formData.append("quality", quality);

      const res = await fetch(`${API_URL}/api/jobs`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setJobId(data.jobId);

      saveToRecent(file.name, type);

      if (pollingRef.current) clearInterval(pollingRef.current);

      pollingRef.current = setInterval(async () => {
        try {
          const res = await fetch(`${API_URL}/api/jobs/${data.jobId}`);
          if (!res.ok) throw new Error("Polling failed");

          const job = await res.json();

          if (job.status === "finished") {
            setFakeProgress(100);
            clearInterval(pollingRef.current);
            pollingRef.current = null;

            setOutputPath(job.outputPath);
            setStats(job);

            setTimeout(() => setLoading(false), 600);
          }
        } catch (err) {
          console.error("Polling error:", err);
          clearInterval(pollingRef.current);
          pollingRef.current = null;
          setLoading(false);
          setError("Error processing file. Please try again.");
        }
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);

      if (contentCard.current) {
        gsap.fromTo(
          contentCard.current,
          { x: -15 },
          {
            x: 15,
            duration: 0.08,
            repeat: 6,
            yoyo: true,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.set(contentCard.current, { x: 0 });
            },
          },
        );
      }

      setError("Failed to upload file. Please try again.");
    }
  }, [file, loading, type, quality, API_URL, saveToRecent]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && file && !loading) {
        upload();
      }
      if (e.key === "Escape") {
        setOpen(false);
        setOpenQuality(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [upload, file, loading]);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opt.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getFileIcon = () => {
    if (!file) return null;

    const type = file.type;
    if (type.includes("pdf")) return "📕";
    if (type.includes("word") || type.includes("document")) return "📘";
    if (type.includes("excel") || type.includes("sheet")) return "📊";
    if (type.includes("powerpoint") || type.includes("presentation"))
      return "📙";
    if (type.includes("image")) return "🖼️";
    return "📄";
  };

  const animateFileSelection = () => {
    const fileDisplay = document.querySelector(".file-selected");
    if (fileDisplay) {
      gsap.fromTo(
        fileDisplay,
        { scale: 0.9, opacity: 0, rotateY: -90 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
      );
    }
  };

  const applyToolGlow = (toolType = type) => {
    if (!contentCard.current) return;
    const theme = TOOL_THEME[toolType];
    gsap.to(contentCard.current, {
      boxShadow: `
        0 0 30px ${theme.glow},
        0 0 60px ${theme.glow},
        0 10px 40px rgba(0,0,0,0.3)
      `,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const hardReset = (skipInputReset = false) => {
    const input = document.getElementById("fileInput");
    if (input && !skipInputReset) input.value = "";

    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }

    setFakeProgress(0);
    setJobId(null);
    setOutputPath(null);
    setStats(null);
    setError(null);

    if (progressBarRef.current) {
      gsap.killTweensOf(progressBarRef.current);
      gsap.set(progressBarRef.current, { width: "0%" });
    }

    if (orbRef.current) {
      gsap.killTweensOf(orbRef.current);
      gsap.set(orbRef.current, { left: "0%" });
    }

    if (contentCard.current) {
      gsap.killTweensOf(contentCard.current);
    }
  };

  useLayoutEffect(() => {
    gsap.fromTo(
      ".card-item",
      {
        opacity: 0,
        y: 30,
        filter: "blur(8px)",
        rotateX: -15,
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        rotateX: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      },
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isMobile) return;

    const ctx = canvas.getContext("2d");

    const getFullHeight = () =>
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight,
      );

    canvas.width = window.innerWidth;
    canvas.height = getFullHeight();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = getFullHeight();
    };
    window.addEventListener("resize", handleResize);

    let lastPoint = null;

    const handleMouseMove = (e) => {
      const currentPoint = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
      };

      if (lastPoint) {
        const distance = Math.hypot(
          currentPoint.x - lastPoint.x,
          currentPoint.y - lastPoint.y,
        );

        const steps = Math.max(Math.floor(distance / 2), 1);

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          trailPointsRef.current.push({
            x: lastPoint.x + (currentPoint.x - lastPoint.x) * t,
            y: lastPoint.y + (currentPoint.y - lastPoint.y) * t,
            opacity: 1,
            color: TOOL_THEME[type].accent,
          });
        }
      } else {
        trailPointsRef.current.push({
          x: currentPoint.x,
          y: currentPoint.y,
          opacity: 1,
          color: TOOL_THEME[type].accent,
        });
      }

      lastPoint = currentPoint;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const currentHeight = getFullHeight();
      ctx.clearRect(0, 0, canvas.width, currentHeight);

      trailPointsRef.current = trailPointsRef.current.filter((point) => {
        const r = parseInt(point.color.slice(1, 3), 16);
        const g = parseInt(point.color.slice(3, 5), 16);
        const b = parseInt(point.color.slice(5, 7), 16);

        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          4,
        );

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${point.opacity})`);
        gradient.addColorStop(
          0.5,
          `rgba(${r}, ${g}, ${b}, ${point.opacity * 0.5})`,
        );
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();

        point.opacity -= 0.005;

        return point.opacity > 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [type, isMobile]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!jobId && progressBarRef.current && orbRef.current) {
      gsap.set(progressBarRef.current, { width: "0%" });
      gsap.set(orbRef.current, { left: "0%" });
    }
  }, [jobId]);

  useEffect(() => {
    if (!progressBarRef.current || !orbRef.current) return;

    gsap.to(progressBarRef.current, {
      width: `${fakeProgress}%`,
      duration: 0.4,
      ease: "power1.out",
    });

    gsap.to(orbRef.current, {
      left: `${fakeProgress}%`,
      duration: 0.4,
      ease: "power1.out",
    });
  }, [fakeProgress]);

  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setFakeProgress((prev) => {
        if (prev >= 92) return prev;
        const increment = Math.random() * 8 + 3;
        return Math.min(prev + increment, 92);
      });
    }, 400);

    const messageInterval = setInterval(() => {
      setProcessingMessage((prev) => {
        const currentIndex = processingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % processingMessages.length;
        return processingMessages[nextIndex];
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [loading]);

  useEffect(() => {
    const theme = TOOL_THEME[type];
    if (!indicatorRef.current) return;

    gsap.to(indicatorRef.current, {
      backgroundColor: theme.accent,
      scaleX: 1,
      transformOrigin: "left",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [type]);

  useEffect(() => {
    if (loading && orbRef.current) {
      gsap.to(orbRef.current, {
        boxShadow: `0 0 24px ${TOOL_THEME[type].glow}, 0 0 12px ${TOOL_THEME[type].accent}`,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    } else if (orbRef.current) {
      gsap.killTweensOf(orbRef.current);
    }
  }, [loading, type]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
      );
    }
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      gsap.fromTo(
        listRef.current,
        { opacity: 0, y: -12, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)" },
      );

      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, x: -15 },
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
          stagger: 0.04,
          ease: "power2.out",
        },
      );
    }
  }, [open]);

  useEffect(() => {
    if (openQuality && qualityListRef.current) {
      gsap.fromTo(
        qualityListRef.current,
        { opacity: 0, y: -12, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)" },
      );

      gsap.fromTo(
        qualityListRef.current.children,
        { opacity: 0, x: -15 },
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
          stagger: 0.04,
          ease: "power2.out",
        },
      );
    }
  }, [openQuality]);

  useEffect(() => {
    if (stats && type === "compress-pdf" && statsCardRef.current) {
      gsap.fromTo(
        statsCardRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
      );

      const animateCounter = (element, start, end, duration = 1.2) => {
        if (!element) return;
        gsap.to(
          { value: start },
          {
            value: end,
            duration,
            ease: "power2.out",
            onUpdate: function () {
              element.textContent = this.targets()[0].value.toFixed(2);
            },
          },
        );
      };

      const originalEl = document.querySelector('[data-stat="original"]');
      const finalEl = document.querySelector('[data-stat="final"]');
      const percentEl = document.querySelector('[data-stat="percent"]');

      if (originalEl) animateCounter(originalEl, 0, stats.originalSize);
      if (finalEl) animateCounter(finalEl, 0, stats.compressedSize);
      if (percentEl)
        animateCounter(percentEl, 0, parseFloat(stats.savedPercent));
    }
  }, [stats, type]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    @keyframes float {
      0%, 100% { 
        transform: translate(0, 0) scale(1);
      }
      33% { 
        transform: translate(30px, -30px) scale(1.1);
      }
      66% { 
        transform: translate(-30px, 30px) scale(0.9);
      }
    }
    
    @keyframes gradient-shift {
      0% { 
        background-position: 0% 50%;
      }
      25% {
        background-position: 50% 50%;
      }
      50% { 
        background-position: 100% 50%;
      }
      75% {
        background-position: 50% 100%;
      }
      100% { 
        background-position: 0% 50%;
      }
    }

    @keyframes pulse-dot {
      0%, 100% {
        opacity: 0.4;
        transform: scale(0.8);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
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
    
    .hexagon-glow {
      animation: hexagon-rainbow 8s ease-in-out infinite;
      opacity: 0.07;
    }
  `;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (
        listRef.current?.parentElement &&
        !listRef.current.parentElement.contains(e.target)
      ) {
        setOpen(false);
      }
      if (
        qualityListRef.current?.parentElement &&
        !qualityListRef.current.parentElement.contains(e.target)
      ) {
        setOpenQuality(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    if (fakeProgress === 100 && contentCard.current) {

      for (let i = 0; i < 3; i++) {
        const timeoutId = setTimeout(() => {
          if (!contentCard.current) return; // Guard
          const pulse = document.createElement("div");
          pulse.style.position = "absolute";
          pulse.style.inset = "-20px";
          pulse.style.border = `2px solid ${TOOL_THEME[type].accent}`;
          pulse.style.borderRadius = "1.5rem";
          pulse.style.pointerEvents = "none";
          pulse.style.zIndex = "1";

          contentCard.current.appendChild(pulse);

          gsap.fromTo(
            pulse,
            { scale: 1, opacity: 0.8 },
            {
              scale: 1.3,
              opacity: 0,
              duration: 1.2,
              ease: "power2.out",
              onComplete: () => pulse.remove(),
            },
          );
        }, i * 200);

        timeoutsRef.current.push(timeoutId);
      }

      const checkmarkTimeoutId = setTimeout(() => {
        if (!contentCard.current) return;

        const checkmark = document.createElement("div");
        checkmark.innerHTML = `
        <svg width="100" height="100" viewBox="0 0 60 60" style="filter: drop-shadow(0 0 20px ${TOOL_THEME[type].accent})">
          <circle cx="30" cy="30" r="28" fill="${TOOL_THEME[type].accent}" opacity="0.3" stroke="${TOOL_THEME[type].accent}" stroke-width="3"/>
          <path d="M17 30 L26 39 L43 22" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
        checkmark.style.position = "absolute";
        checkmark.style.top = "43%";
        checkmark.style.left = "50%";
        checkmark.style.transform = "translate(-50%, -50%)";
        checkmark.style.zIndex = "100";
        checkmark.style.pointerEvents = "none";

        contentCard.current.appendChild(checkmark);

        gsap.fromTo(
          checkmark,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.7,
            delay: 0.2,
            ease: "back.out(2.5)",
            onComplete: () => {
              gsap.to(checkmark, {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                delay: 1,
                onComplete: () => checkmark.remove(),
              });
            },
          },
        );
      }, 0);

      timeoutsRef.current.push(checkmarkTimeoutId);

      gsap.to(contentCard.current, {
        boxShadow: `0 0 80px ${TOOL_THEME[type].glow}, 0 0 120px ${TOOL_THEME[type].glow}`,
        duration: 0.6,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          applyToolGlow(type);
        },
      });

if (buttonRef.current) {
  gsap.fromTo(
    buttonRef.current,
    { scale: 1 },
    {
      scale: isMobile ? 1.02 : 1.06, // scale sedikit dikurangi
      duration: 0.6, // durasi lebih lama = lebih smooth
      yoyo: true,
      repeat: 2,
      ease: "sine.inOut", // ease paling smooth
      onComplete: () => {
        if (buttonRef.current) {
          gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.7, // transisi akhir lebih lama
            ease: "power2.out",
            clearProps: "transform"
          });
        }
      }
    },
  );
}

      const downloadBtn = document.querySelector('a[href*="download"]');
      if (downloadBtn) {
        gsap.fromTo(
          downloadBtn,
          { opacity: 0, y: 30, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(2)",
            delay: 0.3,
          },
        );
      }
    }

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [fakeProgress, type]);

  useEffect(() => {
    return () => {
      gsap.killTweensOf(
        [
          tiltCard.current,
          contentCard.current,
          titleRef.current,
          buttonRef.current,
          progressBarRef.current,
          orbRef.current,
          listRef.current,
          qualityListRef.current,
          indicatorRef.current,
          shineRef.current,
          fileAreaRef.current,
          statsCardRef.current,
          cardRef.current,
          ...labelRefs.current,
        ].filter(Boolean),
      );

      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (loading && tiltCard.current) {
      gsap.to(tiltCard.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });
    } else if (tiltCard.current) {
      gsap.killTweensOf(tiltCard.current);
      gsap.to(tiltCard.current, { y: 0, duration: 0.5 });
    }

    return () => {
      if (tiltCard.current) {
        gsap.killTweensOf(tiltCard.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      applyToolGlow(type);
    }
  }, [type, loading]);

  useEffect(() => {
    const theme = TOOL_THEME[type];
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        textShadow: `0 0 20px ${theme.glow}, 0 0 40px ${theme.glow}`,
        duration: 0.5,
      });
    }
  }, [type]);

  const handleMove = (e) => {
    if (loading || isMobile || !tiltCard.current) return;
    const now = Date.now();
    if (now - lastMove.current < 24) return;

    lastMove.current = now;

    const rect = tiltCard.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -3;
    const rotateY = (x / rect.width - 0.5) * 3;

    gsap.to(tiltCard.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power3.out",
    });

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        x: (x / rect.width - 0.5) * 12,
        y: (y / rect.height - 0.5) * 12,
        duration: 0.5,
      });
    }

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: (x / rect.width - 0.5) * 25,
        y: (y / rect.height - 0.5) * 25,
        duration: 0.5,
      });
    }

    if (listRef.current && open) {
      gsap.to(listRef.current, {
        x: (x / rect.width - 0.5) * 40,
        y: (y / rect.height - 0.5) * 40,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    if (qualityListRef.current && openQuality) {
      gsap.to(qualityListRef.current, {
        x: (x / rect.width - 0.5) * 40,
        y: (y / rect.height - 0.5) * 40,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    labelRefs.current.forEach((label, i) => {
      if (label) {
        gsap.to(label, {
          x: (x / rect.width - 0.5) * (6 + i * 2),
          duration: 0.5,
        });
      }
    });

    if (fileAreaRef.current && !isDragging) {
      gsap.to(fileAreaRef.current, {
        x: (x / rect.width - 0.5) * 10,
        y: (y / rect.height - 0.5) * 10,
        duration: 0.6,
      });
    }

    if (shineRef.current) {
      const centerX = (x / rect.width) * 100;
      const centerY = (y / rect.height) * 100;

      gsap.to(shineRef.current, {
        opacity: 1,
        background: `radial-gradient(
          700px circle at ${centerX}% ${centerY}%,
          ${TOOL_THEME[type].accent}25,
          transparent 40%
        )`,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    const distanceFromCenter = Math.sqrt(
      Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2),
    );
    const maxDistance = Math.sqrt(
      Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2),
    );
    const intensity = 1 - (distanceFromCenter / maxDistance) * 0.5;

    const { glow, accent } = TOOL_THEME[type];
    gsap.killTweensOf(contentCard.current, "background");

    const angle =
      Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI) +
      180;

    if (contentCard.current) {
      gsap.to(contentCard.current, {
        backgroundImage: `
          linear-gradient(${angle}deg, 
            ${accent}18 0%, 
            rgba(24,24,27,0.9) 50%,
            rgba(18,18,21,0.9) 100%
          )
        `,
        boxShadow: `
          0 0 ${25 * intensity}px ${glow},
          0 0 ${60 * intensity}px ${glow},
          inset 0 0 ${40 * intensity}px ${glow},
          0 10px 40px rgba(0,0,0,0.3)
        `,
        duration: 0.4,
      });
    }
  };

  const handleLeave = () => {
    if (tiltCard.current) {
      gsap.to(tiltCard.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }

    if (titleRef.current || buttonRef.current) {
      gsap.to([titleRef.current, buttonRef.current].filter(Boolean), {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }

    if (listRef.current) {
      gsap.to(listRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }

    if (qualityListRef.current) {
      gsap.to(qualityListRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }

    labelRefs.current.forEach((label) => {
      if (label) gsap.to(label, { x: 0, duration: 0.7 });
    });

    if (fileAreaRef.current) {
      gsap.to(fileAreaRef.current, { x: 0, y: 0, duration: 0.7 });
    }

    if (shineRef.current) {
      gsap.to(shineRef.current, {
        opacity: 0,
        duration: 0.5,
      });
    }

    if (contentCard.current) {
      gsap.killTweensOf(contentCard.current, "background");

      gsap.to(contentCard.current, {
        backgroundImage: `
          linear-gradient(
            180deg,
            rgba(32,32,36,0.7),
            rgba(18,18,21,0.7)
          )
        `,
        boxShadow: `
          0 0 30px ${TOOL_THEME[type].glow},
          0 0 60px ${TOOL_THEME[type].glow},
          0 10px 40px rgba(0,0,0,0.3)
        `,
        duration: 0.7,
        overwrite: "auto",
      });
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isDragging) return;

    setIsDragging(true);
    const theme = TOOL_THEME[type];

    if (contentCard.current) {
      gsap.to(contentCard.current, {
        boxShadow: `
          0 0 0 rgba(0,0,0,0),
          0 0 50px ${theme.glow},
          0 0 100px ${theme.glow},
          inset 0 0 60px ${theme.glow}
        `,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const theme = TOOL_THEME[type];

    if (contentCard.current) {
      gsap.to(contentCard.current, {
        boxShadow: `0 0 30px ${theme.glow}, 0 0 60px ${theme.glow}`,
        scale: 1,
        duration: 0.5,
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    hardReset(true);
    setFile(droppedFile);

    if (contentCard.current) {
      gsap.to(contentCard.current, {
        scale: 1,
        duration: 0.3,
      });
    }

    setTimeout(animateFileSelection, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-white px-2 sm:px-3 py-8 sm:py-12 md:py-20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{ mixBlendMode: "screen" }}
      />

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

      <Particles count={isMobile ? 50 : 2000} />

      <div
        className="absolute inset-0 hexagon-glow -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='2'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='2'/%3E%3C/svg%3E")`,
          backgroundSize: "56px 100px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(10, 10, 13, 1) 100%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="relative mt-16 md:mt-20 z-10 w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-2xl"
        style={{ perspective: "1500px" }}
      >
        <div
          ref={tiltCard}
          onMouseMove={!isMobile ? handleMove : undefined}
          onMouseLeave={!isMobile ? handleLeave : undefined}
          className="relative z-10 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-full">
            <div
              ref={cardRef}
              className="absolute inset-0 rounded-2xl pointer-events-none"
            />

            <div
              ref={contentCard}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="relative rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 lg:p-12 transition w-full card-glow"
              style={{
                "--glow-color": TOOL_THEME[type].glow,
                backgroundImage: `
                  linear-gradient(
                    180deg,
                    rgba(32,32,36,0.7),
                    rgba(18,18,21,0.7)
                  )
                `,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              {!isMobile && (
                <div
                  ref={shineRef}
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0"
                  style={{
                    transform: "translateZ(5px)",
                    mixBlendMode: "screen",
                  }}
                />
              )}

              <div className="mb-4 sm:mb-6 md:mb-8">
                <h2
                  ref={titleRef}
                  className="card-item upload-item text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2"
                  style={{ transform: "translateZ(50px)" }}
                >
                  PDF Tools
                </h2>
                <p className="card-item text-[10px] xs:text-xs sm:text-sm md:text-base text-white/50 mb-2 sm:mb-3 md:mb-4">
                  Transform your documents instantly
                </p>
                <div
                  ref={indicatorRef}
                  className="h-0.5 sm:h-1 w-full scale-x-0 origin-left card-item rounded-full"
                />
              </div>

              <label
                ref={(el) => (labelRefs.current[0] = el)}
                className="card-item upload-item block text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-white/80"
              >
                Select Tool
              </label>
              <div className="relative mb-3 sm:mb-4 md:mb-6">
                <button
                  onClick={() => setOpen(!open)}
                  className="upload-item w-full rounded-lg sm:rounded-xl bg-zinc-800/60 backdrop-blur-xl px-2.5 xs:px-3 sm:px-4 md:px-5 py-2 xs:py-2.5 sm:py-3 md:py-3.5 text-left border border-white/10 hover:border-white/20 card-item flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2 sm:gap-3 min-w-0">
                    {(() => {
                      const Icon = options.find((o) => o.value === type)?.icon;
                      return Icon ? (
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      ) : null;
                    })()}
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-xs xs:text-sm sm:text-base truncate">
                        {options.find((o) => o.value === type)?.label}
                      </div>
                      <div className="text-[10px] xs:text-xs text-white/50 mt-0.5 truncate">
                        {options.find((o) => o.value === type)?.description}
                      </div>
                    </div>
                  </span>
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-white/40 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
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

                {open && (
                  <div
                    ref={listRef}
                    className="absolute z-20 mt-2 w-full rounded-lg sm:rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl"
                    style={{
                      transform: "translateZ(60px)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="p-2 sm:p-3 border-b border-white/5">
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-800/60 rounded-md sm:rounded-lg px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-white/10 focus:border-white/20 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="max-h-48 xs:max-h-56 sm:max-h-64 overflow-y-auto">
                      {filteredOptions.map((opt) => {
                        const Icon = opt.icon;
                        return (
                          <div
                            key={opt.value}
                            onClick={() => {
                              hardReset();
                              setFile(null);
                              setType(opt.value);
                              setOpen(false);
                              setSearchQuery("");

                              requestAnimationFrame(() => {
                                applyToolGlow(opt.value);
                              });
                            }}
                            className="px-3 xs:px-4 sm:px-5 py-2.5 xs:py-3 sm:py-3.5 cursor-pointer hover:bg-white/5 duration-200 flex items-center gap-2 sm:gap-3 group border-b border-white/5 last:border-0"
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-xs sm:text-sm truncate">
                                {opt.label}
                              </div>
                              <div className="text-[10px] xs:text-xs text-white/40 mt-0.5 truncate">
                                {opt.description}
                              </div>
                            </div>
                            {type === opt.value && (
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        );
                      })}

                      {filteredOptions.length === 0 && (
                        <div className="px-3 xs:px-4 sm:px-5 py-6 sm:py-8 text-center text-white/40 text-xs sm:text-sm">
                          No tools found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {type === "compress-pdf" && (
                <>
                  <label
                    ref={(el) => (labelRefs.current[1] = el)}
                    className="block text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-white/80 card-item"
                  >
                    Compression Level
                  </label>
                  <div className="relative mb-3 sm:mb-4 md:mb-6">
                    <button
                      onClick={() => setOpenQuality(!openQuality)}
                      className="w-full rounded-lg sm:rounded-xl bg-zinc-800/60 backdrop-blur-xl px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 md:py-3.5 text-left border border-white/10 hover:border-white/20 card-item flex items-center justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-xs sm:text-sm truncate">
                          {
                            qualityOptions.find((o) => o.value === quality)
                              ?.label
                          }
                        </div>
                        <div className="text-[10px] xs:text-xs text-white/50 mt-0.5 truncate">
                          {
                            qualityOptions.find((o) => o.value === quality)
                              ?.description
                          }
                        </div>
                      </div>
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-white/40 transition-transform flex-shrink-0 ml-2 ${openQuality ? "rotate-180" : ""}`}
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

                    {openQuality && (
                      <ul
                        ref={qualityListRef}
                        className="absolute video-scrollbar z-20 mt-2 w-full rounded-lg sm:rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl max-h-48 xs:max-h-56 sm:max-h-64 overflow-y-auto"
                        style={{
                          transform: "translateZ(60px)",
                          transformStyle: "preserve-3d",
                          "--scrollbar-color": TOOL_THEME[type].accent,
                        }}
                      >
                        {qualityOptions.map((opt) => (
                          <li
                            key={opt.value}
                            onClick={() => {
                              setQuality(opt.value);
                              setOpenQuality(false);
                            }}
                            className="px-3 xs:px-4 sm:px-5 py-2.5 xs:py-3 sm:py-3.5 cursor-pointer hover:bg-white/5 duration-200 border-b border-white/5 last:border-0 group"
                          >
                            <div className="font-medium text-xs sm:text-sm truncate">
                              {opt.label}
                            </div>
                            <div className="text-[10px] xs:text-xs text-white/40 mt-0.5 truncate">
                              {opt.description}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}

              <label
                ref={(el) => (labelRefs.current[2] = el)}
                className="block text-xs sm:text-sm font-medium mb-2 sm:mb-3 card-item text-white/80"
              >
                Upload File
              </label>

              {isDragging && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl sm:rounded-2xl bg-black/70 backdrop-blur-xl z-20 pointer-events-none border-2 border-dashed border-white/30">
                  <div className="text-center px-4">
                    <div className="mb-2 sm:mb-3 md:mb-4 flex justify-center">
                      <FolderOpen
                        className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 animate-bounce"
                        style={{ color: TOOL_THEME[type].accent }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <p
                      className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold"
                      style={{ color: TOOL_THEME[type].accent }}
                    >
                      Drop file here
                    </p>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-white/60 mt-1 sm:mt-2">
                      Release to upload
                    </p>
                  </div>
                </div>
              )}

              <input
                type="file"
                id="fileInput"
                onChange={(e) => {
                  hardReset(true);
                  setFile(e.target.files[0]);
                  setTimeout(animateFileSelection, 100);
                }}
                className="hidden"
              />

              <div
                ref={fileAreaRef}
                onClick={() => document.getElementById("fileInput").click()}
                className={`mb-3 sm:mb-4 md:mb-6 cursor-pointer card-item rounded-lg sm:rounded-xl border-2 border-dashed p-3 xs:p-4 sm:p-6 md:p-8 text-center ${
                  isDragging
                    ? "border-white/40 bg-white/5 scale-105"
                    : file
                      ? "border-emerald-400/40 bg-emerald-400/5"
                      : "border-white/20 hover:border-white/40 hover:bg-white/5"
                }`}
              >
                {file ? (
                  <div className="file-selected flex items-center gap-2 xs:gap-3 sm:gap-4 text-left">
                    <div
                      className="p-2 xs:p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${TOOL_THEME[type].accent}20, ${TOOL_THEME[type].accent}10)`,
                        border: `1px solid ${TOOL_THEME[type].accent}30`,
                      }}
                    >
                      <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl">
                        {getFileIcon()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-emerald-400 text-xs xs:text-sm sm:text-base md:text-lg truncate mb-0.5 sm:mb-1">
                        {file.name}
                      </p>
                      <p className="text-[10px] xs:text-xs sm:text-sm text-white/50">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        hardReset();
                        setFile(null);
                      }}
                      className="p-1.5 xs:p-2 rounded-md sm:rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400 duration-200 flex-shrink-0"
                    >
                      <svg
                        className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="py-2 xs:py-3 sm:py-4">
                    <div className="mb-2 xs:mb-3 md:mb-4 flex justify-center">
                      <Upload
                        className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white/40"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="card-item text-white/80 font-medium text-xs xs:text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                      Drag & drop your file here
                    </p>
                    <p className="card-item text-[10px] xs:text-xs sm:text-sm text-white/50">
                      or click to browse
                    </p>
                    <div className="mt-2 xs:mt-3 sm:mt-4 flex flex-wrap gap-1.5 xs:gap-2 justify-center">
                      <span className="px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 bg-white/5 rounded-full text-[10px] xs:text-xs text-white/60">
                        PDF
                      </span>
                      <span className="px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 bg-white/5 rounded-full text-[10px] xs:text-xs text-white/60">
                        DOCX
                      </span>
                      <span className="px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 bg-white/5 rounded-full text-[10px] xs:text-xs text-white/60">
                        PNG
                      </span>
                      <span className="px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 bg-white/5 rounded-full text-[10px] xs:text-xs text-white/60">
                        JPG
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-3 sm:mb-4 md:mb-6 p-2.5 xs:p-3 sm:p-4 rounded-lg sm:rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-red-300 flex-1">
                      {error}
                    </p>
                    <button
                      onClick={() => setError(null)}
                      className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <button
                ref={buttonRef}
                onClick={upload}
                disabled={!file || loading}
                onMouseEnter={() => {
                  if (!loading && file && buttonRef.current) {
                    gsap.to(buttonRef.current, {
                      scale: 1.03,
                      duration: 0.3,
                    });
                  }
                }}
                onMouseLeave={() => {
                  if (!loading && buttonRef.current) {
                    gsap.to(buttonRef.current, {
                      scale: 1,
                      duration: 0.3,
                    });
                  }
                }}
                className="w-full card-item rounded-lg sm:rounded-xl py-2.5 xs:py-3 sm:py-3.5 md:py-4 font-semibold text-xs xs:text-sm sm:text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-between gap-2 sm:gap-3 relative overflow-hidden group px-3 xs:px-4 sm:px-6"
                style={{
                  transform: "translateZ(60px)",
                  background: `linear-gradient(135deg, ${TOOL_THEME[type].accent}, ${TOOL_THEME[type].accent}cc)`,
                  boxShadow: `0 8px 30px ${TOOL_THEME[type].glow}`,
                }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {loading ? (
                    <svg
                      className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  )}
                  <span className="text-xs xs:text-sm sm:text-base">
                    {loading ? "Processing..." : "Upload & Process"}
                  </span>
                </div>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:translate-x-1 transition-transform"
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
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  }}
                />
              </button>

              {file && !loading && !isMobile && (
                <div className="mt-2 sm:mt-3 md:mt-4 text-center">
                  <p className="text-[10px] xs:text-xs text-white/40">
                    Press{" "}
                    <kbd className="px-1.5 xs:px-2 py-0.5 xs:py-1 bg-white/10 rounded text-white/60 font-mono text-[10px] xs:text-xs">
                      Enter
                    </kbd>{" "}
                    to upload
                  </p>
                </div>
              )}

              {loading && (
                <div className="mt-3 sm:mt-4 md:mt-6 space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/70">
                    <div className="flex gap-1 sm:gap-1.5">
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                        style={{
                          backgroundColor: TOOL_THEME[type].accent,
                          animation: "pulse-dot 1.4s ease-in-out infinite",
                          animationDelay: "0ms",
                        }}
                      />
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                        style={{
                          backgroundColor: TOOL_THEME[type].accent,
                          animation: "pulse-dot 1.4s ease-in-out infinite",
                          animationDelay: "200ms",
                        }}
                      />
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                        style={{
                          backgroundColor: TOOL_THEME[type].accent,
                          animation: "pulse-dot 1.4s ease-in-out infinite",
                          animationDelay: "400ms",
                        }}
                      />
                    </div>
                    <span className="truncate">{processingMessage}</span>
                  </div>
                </div>
              )}

              {jobId && (
                <div className="relative w-full mt-3 sm:mt-4 md:mt-6">
                  <div className="flex justify-between text-[10px] xs:text-xs text-white/60 mb-1.5 sm:mb-2">
                    <span className="font-medium">Processing...</span>
                    <span className="font-mono font-semibold">
                      {Math.round(fakeProgress)}%
                    </span>
                  </div>
                  <div className="relative h-2 xs:h-2.5 sm:h-3 w-full rounded-full bg-white/5 overflow-hidden backdrop-blur-sm border border-white/10">
                    <div
                      ref={progressBarRef}
                      className="h-full rounded-full"
                      style={{
                        width: "0%",
                        background: `linear-gradient(90deg, ${TOOL_THEME[type].accent}, ${TOOL_THEME[type].accent}dd)`,
                        boxShadow: `0 0 20px ${TOOL_THEME[type].glow}`,
                      }}
                    />
                  </div>
                  <div
                    ref={orbRef}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{
                      left: "0%",
                      borderRadius: "50%",
                      background: TOOL_THEME[type].accent,
                      boxShadow: `0 0 20px ${TOOL_THEME[type].glow}, 0 0 10px ${TOOL_THEME[type].accent}`,
                    }}
                  />
                </div>
              )}

              {stats && type === "compress-pdf" && (
                <div
                  ref={statsCardRef}
                  className="mt-3 sm:mt-4 md:mt-6 p-3 xs:p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border overflow-hidden relative"
                  style={{
                    background: `linear-gradient(135deg, ${TOOL_THEME[type].accent}10, ${TOOL_THEME[type].accent}05)`,
                    borderColor: `${TOOL_THEME[type].accent}30`,
                  }}
                >
                  <div className="relative z-10">
                    <h3 className="text-xs sm:text-sm font-semibold text-white/80 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Compression Results
                    </h3>

                    <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="text-center">
                        <p className="text-[10px] xs:text-xs text-white/50 mb-1 sm:mb-2">
                          Original
                        </p>
                        <p
                          className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold"
                          data-stat="original"
                        >
                          0
                        </p>
                        <p className="text-[10px] xs:text-xs text-white/60 mt-0.5 sm:mt-1">
                          MB
                        </p>
                      </div>

                      <div className="flex items-center justify-center">
                        <svg
                          className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8"
                          style={{ color: TOOL_THEME[type].accent }}
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
                      </div>

                      <div className="text-center">
                        <p className="text-[10px] xs:text-xs text-white/50 mb-1 sm:mb-2">
                          Compressed
                        </p>
                        <p
                          className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold"
                          style={{ color: TOOL_THEME[type].accent }}
                          data-stat="final"
                        >
                          0
                        </p>
                        <p className="text-[10px] xs:text-xs text-white/60 mt-0.5 sm:mt-1">
                          MB
                        </p>
                      </div>
                    </div>

                    <div
                      className="pt-3 sm:pt-4 border-t text-center"
                      style={{ borderColor: `${TOOL_THEME[type].accent}20` }}
                    >
                      <p className="text-xs sm:text-sm text-white/70 mb-1 sm:mb-2">
                        Space Saved
                      </p>
                      <p
                        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                        style={{ color: TOOL_THEME[type].accent }}
                      >
                        <span data-stat="percent">0</span>%
                      </p>
                      <p className="text-[10px] xs:text-xs sm:text-sm text-white/50 mt-0.5 sm:mt-1">
                        {stats.savedMB} MB smaller
                      </p>
                    </div>
                  </div>
                  <div
                    className="absolute top-0 right-0 w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 rounded-full blur-3xl opacity-20"
                    style={{ background: TOOL_THEME[type].accent }}
                  />
                </div>
              )}

              {outputPath && (
                <a
                  href={`${API_URL}/api/jobs/${jobId}/download`}
                  className="mt-3 sm:mt-4 md:mt-6 block text-center rounded-lg sm:rounded-xl py-2.5 xs:py-3 sm:py-4 px-3 xs:px-4 sm:px-6 font-semibold relative overflow-hidden group hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${TOOL_THEME[type].accent}, ${TOOL_THEME[type].accent}dd)`,
                    boxShadow: `0 8px 30px ${TOOL_THEME[type].glow}`,
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      boxShadow: `0 12px 40px ${TOOL_THEME[type].glow}, 0 0 60px ${TOOL_THEME[type].glow}`,
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      boxShadow: `0 8px 30px ${TOOL_THEME[type].glow}`,
                      duration: 0.3,
                    });
                  }}
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-3 relative z-10">
                    <svg
                      className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span className="text-xs xs:text-sm sm:text-base">
                      Download Result
                    </span>
                  </span>
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    }}
                  />
                </a>
              )}

              {recentFiles.length > 0 && !loading && !outputPath && (
                <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-white/10">
                  <h3 className="text-[10px] xs:text-xs sm:text-sm font-semibold text-white/70 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Recent Conversions
                  </h3>
                  <div className="space-y-1.5 sm:space-y-2">
                    {recentFiles.slice(0, 3).map((recentFile, idx) => {
                      const opt = options.find(
                        (o) => o.value === recentFile.type,
                      );
                      const Icon = opt?.icon;

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (opt) {
                              setType(recentFile.type);
                              applyToolGlow(recentFile.type);
                            }
                          }}
                          className="w-full text-left px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 rounded-md sm:rounded-lg bg-white/5 hover:bg-white/10 duration-200 flex items-center gap-2 sm:gap-3 group"
                        >
                          {Icon && (
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] xs:text-xs sm:text-sm font-medium truncate text-white/80 group-hover:text-white">
                              {recentFile.name}
                            </p>
                            <p className="text-[9px] xs:text-[10px] sm:text-xs text-white/40">
                              {new Date(recentFile.date).toLocaleDateString()}
                            </p>
                          </div>
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
