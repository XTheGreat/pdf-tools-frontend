import { useEffect, useRef } from "react";

export default function Particles({ count = 40 }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth < 768;
    const config = {
      count: isMobile ? count * 0.5 : count,
      radius: isMobile ? 80 : 120,
      force: isMobile ? 0.6 : 1.2,
      maxDpr: isMobile ? 1.5 : 2,
    };
    
    const resetMouse = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    const getFullHeight = () => Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      window.innerHeight
    );

    const dpr = Math.min(window.devicePixelRatio || 1, config.maxDpr);
    const fullHeight = getFullHeight();

    canvas.width = window.innerWidth * dpr;
    canvas.height = fullHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = fullHeight + "px";

    ctx.scale(dpr, dpr);

    particles.current = Array.from({ length: config.count }).map(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * fullHeight;

      return {
        x,
        y,
        ox: x,
        oy: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        hue: Math.random() * 180 + 120,
        alpha: Math.random() * 0.5 + 0.4,
        size: Math.random() * 1.8 + 0.8,
        shimmer: Math.random() * Math.PI * 2,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: Math.random() * 0.5 + 0.8,
        wanderChange: Math.random() * 0.04 + 0.02,
      };
    });

    let rafId;
    const animate = () => {
      const currentFullHeight = getFullHeight();
      ctx.clearRect(0, 0, window.innerWidth, currentFullHeight);

      particles.current.forEach((p) => {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const radius = config.radius;

        if (dist < radius) {
          const force = (radius - dist) / radius;
          p.vx += (dx / dist) * force * config.force;
          p.vy += (dy / dist) * force * config.force;
          p.hue += 3.5;
        }

        p.vx += (p.ox - p.x) * 0.0008;
        p.vy += (p.oy - p.y) * 0.0008;

        p.wanderAngle += (Math.random() - 0.5) * p.wanderChange;
        p.vx += Math.cos(p.wanderAngle) * p.wanderSpeed * 0.08;
        p.vy += Math.sin(p.wanderAngle) * p.wanderSpeed * 0.08;

        const maxSpeed = 2;
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed > maxSpeed) {
          p.vx = (p.vx / currentSpeed) * maxSpeed;
          p.vy = (p.vy / currentSpeed) * maxSpeed;
        }

        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        const padding = 10;
        if (p.x < padding || p.x > window.innerWidth - padding) {
          p.vx *= -0.8;
        }
        if (p.y < padding || p.y > currentFullHeight - padding) {
          p.vy *= -0.8;
        }

        p.x = Math.max(padding, Math.min(window.innerWidth - padding, p.x));
        p.y = Math.max(padding, Math.min(currentFullHeight - padding, p.y));

        p.shimmer += 0.03;
        const sparkle = Math.sin(p.shimmer) * 0.3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + sparkle, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.alpha})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY + window.scrollY; 
    };

    const handleTouch = (e) => {
      if (!e.touches[0]) return;
      mouse.current.x = e.touches[0].clientX;
      mouse.current.y = e.touches[0].clientY + window.scrollY;
    };

    const handleResize = () => {
      const fullHeight = getFullHeight();
      const newDpr = Math.min(window.devicePixelRatio || 1, config.maxDpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width = window.innerWidth * newDpr;
      canvas.height = fullHeight * newDpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = fullHeight + "px";
      ctx.scale(newDpr, newDpr);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("touchend", resetMouse);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchend", resetMouse);
      window.removeEventListener("resize", handleResize);
    };
  }, [count]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
  );
}