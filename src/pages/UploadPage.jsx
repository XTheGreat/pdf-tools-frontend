import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Particles from "../components/Particles";
import { useLayoutEffect } from "react";

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
  
  const options = [
    { label: "Office to PDF", value: "office-to-pdf" },
    { label: "Image to PDF", value: "image-to-pdf" },
    { label: "Compress PDF", value: "compress-pdf" },
  ];

  const qualityOptions = [
    { label: "Low (smallest)", value: "screen" },
    { label: "Medium (recommended)", value: "ebook" },
    { label: "High", value: "printer" },
    { label: "Very High", value: "prepress" },
  ];

  const TOOL_THEME = {
    "office-to-pdf": {
      glow: "rgba(59,130,246,0.45)",
      accent: "#3b82f6",
    },
    "image-to-pdf": {
      glow: "rgba(34,197,94,0.45)",
      accent: "#22c55e",
    },
    "compress-pdf": {
      glow: "rgba(168,85,247,0.45)",
      accent: "#a855f7",
    },
  };

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


  const animateFileSelection = () => {
    const fileDisplay = document.querySelector(".text-emerald-400");
    if (fileDisplay) {
      gsap.fromTo(
        fileDisplay.parentElement,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.5)",
        },
      );
    }
  };

  const applyToolGlow = (toolType = type) => {
    if (!contentCard.current) return;
    const theme = TOOL_THEME[toolType];
    gsap.to(contentCard.current, {
      boxShadow: `
        0 0 20px ${theme.glow},
        0 0 50px ${theme.glow}
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
        y: 24,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      },
    );
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

    return () => clearInterval(interval);
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
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
    );
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      gsap.fromTo(
        listRef.current,
        { opacity: 0, y: -8, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power3.out" },
      );

      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
    }
  }, [open]);

  // Animasi untuk dropdown quality
  useEffect(() => {
    if (openQuality && qualityListRef.current) {
      gsap.fromTo(
        qualityListRef.current,
        { opacity: 0, y: -8, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power3.out" },
      );

      gsap.fromTo(
        qualityListRef.current.children,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
    }
  }, [openQuality]);

  useEffect(() => {
    if (stats && type === "compress-pdf") {
      const animateCounter = (element, start, end, duration = 1) => {
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

      if (originalEl) animateCounter(originalEl, 0, stats.originalSize);
      if (finalEl) animateCounter(finalEl, 0, stats.compressedSize);
    }
  }, [stats, type]);

  useEffect(() => {
    const close = (e) => {
      if (!listRef.current?.parentElement.contains(e.target)) {
        setOpen(false);
      }
      if (!qualityListRef.current?.parentElement.contains(e.target)) {
        setOpenQuality(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (fakeProgress === 100) {
      gsap.to(contentCard.current, {
        boxShadow: "0 0 40px rgba(16,185,129,.5)",
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          applyToolGlow(type);
        },
      });

      gsap.fromTo(
        buttonRef.current,
        { scale: 1 },
        {
          scale: 1.05,
          duration: 0.3,
          yoyo: true,
          repeat: 2,
          ease: "power2.inOut",
        },
      );

      const downloadBtn = document.querySelector('a[href*="download"]');
      if (downloadBtn) {
        gsap.fromTo(
          downloadBtn,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 0.3,
          },
        );
      }
    }
  }, [fakeProgress, type]);

  useEffect(() => {
    if (loading) {
      gsap.to(tiltCard.current, {
        y: -8,
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: "sine.inOut",
      });
    } else {
      gsap.killTweensOf(tiltCard.current);
      gsap.to(tiltCard.current, { y: 0, duration: 0.4 });
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      applyToolGlow(type);
    }
  }, [type, loading]);

  useEffect(() => {
    const theme = TOOL_THEME[type];
    gsap.to(titleRef.current, {
      textShadow: `0 0 12px ${theme.glow}`,
      duration: 0.4,
    });
  }, [type]);

  const upload = async () => {
    if (!file || loading) return;

    hardReset(true);
    setLoading(true);

    await new Promise((r) => requestAnimationFrame(r));

    if (type === "office-to-pdf" && file.type.startsWith("image/")) {
      alert("File gambar tidak didukung. Gunakan Image → PDF.");
      setLoading(false);
      return;
    }
    if (type === "image-to-pdf" && !file.type.startsWith("image/")) {
      alert("Hanya file gambar yang didukung.");
      setLoading(false);
      return;
    }
    if (type === "compress-pdf" && file.type !== "application/pdf") {
      alert("Compress PDF hanya menerima file PDF.");
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

      if (pollingRef.current) clearInterval(pollingRef.current);

      pollingRef.current = setInterval(async () => {
        try {
        const res = await fetch(
  `${API_URL}/api/jobs/${data.jobId}`,
);
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
          alert("Error saat memproses file");
        }
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);

      gsap.fromTo(
        contentCard.current,
        { x: -10 },
        {
          x: 10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.set(contentCard.current, { x: 0 });
          },
        },
      );

      alert("Gagal upload file. Coba lagi.");
    }
  };

  const handleMove = (e) => {
    if (loading) return;
    const now = Date.now();
    if (now - lastMove.current < 24) return;

    lastMove.current = now;

    const rect = tiltCard.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -50;
    const rotateY = (x / rect.width - 0.5) * 50;

    gsap.to(tiltCard.current, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(titleRef.current, {
      x: (x / rect.width - 0.5) * 10,
      y: (y / rect.height - 0.5) * 10,
      duration: 0.4,
    });

    gsap.to(buttonRef.current, {
      x: (x / rect.width - 0.5) * 20,
      y: (y / rect.height - 0.5) * 20,
      duration: 0.4,
    });
    const { glow } = TOOL_THEME[type];
    gsap.killTweensOf(contentCard.current, "background");

    gsap.to(contentCard.current, {
      backgroundImage: `radial-gradient(
    ${glow.replace("0.45", "0.25")},
    rgba(24,24,27,0.97) 70%
  )`,
      duration: 0.25,
    });
  };

  const handleLeave = () => {
    gsap.to(tiltCard.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to([titleRef.current, buttonRef.current], {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    const { accent } = TOOL_THEME[type];
    gsap.killTweensOf(contentCard.current, "background");

    gsap.to(contentCard.current, {
      backgroundImage: `radial-gradient(
    600px circle at center,
    ${accent}22,
    rgba(24,24,27,0.85)
  )`,
      duration: 0.6,
      overwrite: "auto",
    });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isDragging) return;

    setIsDragging(true);
    const theme = TOOL_THEME[type];

    gsap.to(contentCard.current, {
      boxShadow: `
      0 0 0 rgba(0,0,0,0),
      0 0 40px ${theme.glow},
      0 0 80px ${theme.glow}
    `,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const theme = TOOL_THEME[type];

    gsap.to(contentCard.current, {
      boxShadow: `0 0 30px ${theme.glow}`,
      duration: 0.4,
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    hardReset(true);
    setFile(droppedFile);
    setTimeout(animateFileSelection, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white px-3">
      <Particles count={500} />
      <div
        className="relative z-10 flex items-center justify-center min-h-screen"
        style={{ perspective: "1200px" }}
      >
        <div
          ref={tiltCard}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative z-10 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-full max-w-md sm:max-w-xl lg:max-w-3xl">
            <div
              ref={cardRef}
              className="
        absolute inset-0
        rounded-2xl
        pointer-events-none
      "
            />
            <div
              ref={contentCard}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-2xl p-10 transition md:w-[500px] card-glow
`}
              style={{
                "--glow-color": TOOL_THEME[type].glow,
                backgroundImage: `
    linear-gradient(
      180deg,
      rgba(32,32,36,0.6),
      rgba(20,20,23,0.6)
    )
  `,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <h2
                ref={titleRef}
                className="card-item upload-item text-3xl font-bold mb-2 "
                style={{ transform: "translateZ(40px)" }}
              >
                PDF Tools
              </h2>
              <div
                ref={indicatorRef}
                className="h-[2px] w-full scale-x-0 origin-left card-item rounded-full mt-2 mb-3"
              />
              <label className="card-item upload-item block text-sm mb-2 text-white/70">
                Tool
              </label>
              <div className="relative mb-4">
                <button
                  onClick={() => setOpen(!open)}
                  className="
      upload-item
      w-full
      rounded-lg
      bg-zinc-800/80
      px-4 py-2
      text-left
      border border-white/10
      backdrop-blur
      hover:border-blue-500/50
      card-item
    "
                >
                  {options.find((o) => o.value === type)?.label}
                </button>

                {open && (
                  <ul
                    ref={listRef}
                    className="
        absolute z-20 mt-2 w-full
        rounded-lg
        bg-black/70
        backdrop-blur
        border border-white/10
        overflow-hidden
      "
                  >
                    {options.map((opt) => (
                      <li
                        key={opt.value}
                        onClick={() => {
                          hardReset();
                          setFile(null);
                          setType(opt.value);
                          setOpen(false);

                          requestAnimationFrame(() => {
                            applyToolGlow(opt.value);
                          });
                        }}
                        className="
            px-4 py-2
            cursor-pointer
            hover:bg-blue-500/20
            transition
          "
                      >
                        {opt.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {type === "compress-pdf" && (
                <>
                  <label className="block text-sm mb-2 text-white/70 card-item">
                    Compression level
                  </label>
                  <div className="relative mb-4">
                    <button
                      onClick={() => setOpenQuality(!openQuality)}
                      className="
                        w-full
                        rounded-lg
                        bg-zinc-800/80
                        px-4 py-2
                        text-left
                        border border-white/10
                        backdrop-blur
                        hover:border-purple-500/50
                        card-item
                        transition
                      "
                    >
                      {qualityOptions.find((o) => o.value === quality)?.label}
                    </button>

                    {openQuality && (
                      <ul
                        ref={qualityListRef}
                        className="
                          absolute z-20 mt-2 w-full
                          rounded-lg
                          bg-black/70
                          backdrop-blur
                          border border-white/10
                          overflow-hidden
                        "
                      >
                        {qualityOptions.map((opt) => (
                          <li
                            key={opt.value}
                            onClick={() => {
                              setQuality(opt.value);
                              setOpenQuality(false);
                            }}
                            className="
                              px-4 py-2
                              cursor-pointer
                              hover:bg-purple-500/20
                              transition
                            "
                          >
                            {opt.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}

              <label className="block text-sm mb-2 card-item text-white/70">
                File
              </label>
              {isDragging && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur z-20 pointer-events-none">
                  <div className="text-center">
                    <p className="text-xl font-semibold text-blue-400">
                      Drop file here
                    </p>
                    <p className="text-sm text-white/60">
                      Lepaskan untuk upload
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
                onClick={() => document.getElementById("fileInput").click()}
                className={`mb-6 cursor-pointer card-item rounded-xl border-2 border-dashed p-6 text-center
    ${
      isDragging
        ? "border-blue-400 bg-blue-500/10"
        : "border-white/20 hover:border-blue-400/60"
    }
  `}
              >
                {file ? (
                  <>
                    <p className="font-semibold text-emerald-400">
                      {file.name}
                    </p>
                    <p className="text-sm text-white/60">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <p className="card-item text-white/70">
                      Drag & drop file here
                    </p>
                    <p className="card-item text-sm text-white/40">
                      atau klik untuk pilih file
                    </p>
                  </>
                )}
              </div>

              <button
                ref={buttonRef}
                onClick={upload}
                disabled={!file || loading}
                onMouseEnter={() => {
                  if (!loading && file) {
                    gsap.to(buttonRef.current, {
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)",
                      duration: 0.2,
                    });
                  }
                }}
                onMouseLeave={() => {
                  if (!loading) {
                    gsap.to(buttonRef.current, {
                      scale: 1,
                      boxShadow: "none",
                      duration: 0.2,
                    });
                  }
                }}
                className="w-full card-item rounded-xl bg-blue-600 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ transform: "translateZ(60px)" }}
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                )}
                {loading ? "Processing..." : "Upload & Process"}
              </button>

              {jobId && (
                <div className="relative w-full mt-6">
                  <div className="relative h-3 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      ref={progressBarRef}
                      className="h-full rounded-full"
                      style={{
                        width: "0%",
                        background: TOOL_THEME[type].accent,
                      }}
                    />
                  </div>
                  <div
                    ref={orbRef}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{
                      left: "0%",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: TOOL_THEME[type].accent,
                      boxShadow: `0 0 16px ${TOOL_THEME[type].glow}`,
                    }}
                  />
                </div>
              )}

              {stats && type === "compress-pdf" && (
                <div className="mt-6 text-sm space-y-1 text-white/80">
                  <p>
                    Original: <span data-stat="original">0</span> MB
                  </p>
                  <p>
                    Final: <span data-stat="final">0</span> MB
                  </p>
                  <p className="text-emerald-400">
                    Saved: {stats.savedMB} MB ({stats.savedPercent}%)
                  </p>
                </div>
              )}

              {outputPath && (
                <a
                  href={`${API_URL}/api/jobs/${jobId}/download`}
                  className="mt-6 block text-center rounded-xl bg-emerald-500 py-3"
                >
                  Download Result
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}