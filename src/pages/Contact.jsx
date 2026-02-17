import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { 
  Mail, Phone, MapPin, MessageCircle, 
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  Zap, Globe, Star, Briefcase
} from "lucide-react";

// FIX 1: Pindahkan CONTACT_THEME keluar component agar tidak dibuat ulang setiap render
const CONTACT_THEME = {
  glow: "rgba(79, 70, 229, 0.4)",
  accent: "#4f46e5",
  accentLight: "#818cf8",
  accentDark: "#3730a3",
  success: "#10b981",
  warning: "#f59e0b",
};

export default function Contact() {
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const contactCardsRef = useRef([]);
  const particlesRef = useRef([]);
  const socialLinksRef = useRef([]);
  const mapRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

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
  if (contactCardsRef.current.length === 0) {
    contactCardsRef.current = Array(4).fill(null);
  }
  if (socialLinksRef.current.length === 0) {
    socialLinksRef.current = Array(5).fill(null);
  }

  // FIX 2: Style injection dengan proper cleanup
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes gradient-contact {
        0% { background-position: 0% 50%; }
        25% { background-position: 50% 50%; }
        50% { background-position: 100% 50%; }
        75% { background-position: 50% 100%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes float-wave {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        33% { transform: translateY(-15px) rotate(2deg); }
        66% { transform: translateY(15px) rotate(-2deg); }
      }

      @keyframes pulse-ring {
        0% {
          transform: scale(0.8);
          opacity: 1;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.5;
        }
        100% {
          transform: scale(0.8);
          opacity: 1;
        }
      }

      @keyframes slide-up-fade {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
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
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // FIX 3: Glitch text effect dengan proper cleanup
  useEffect(() => {
    if (!isVisible || !titleRef.current) return;

    let cleanupInterval = null;

    const glitchText = (element) => {
      const originalText = element.textContent;
      const glitchChars = "█▓▒░!<>-_\\/[]{}—=+*^?#________";
      
      let iteration = 0;
      const speed = 50;
      const maxIterations = originalText.length;

      const interval = setInterval(() => {
        if (!element) {
          clearInterval(interval);
          return;
        }

        element.textContent = originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return originalText[index];
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join("");

        iteration += 0.5;

        if (iteration >= maxIterations) {
          clearInterval(interval);
          element.textContent = originalText;
        }
      }, speed);

      return interval;
    };

    const timeoutId = setTimeout(() => {
      if (titleRef.current) {
        cleanupInterval = glitchText(titleRef.current);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (cleanupInterval) {
        clearInterval(cleanupInterval);
      }
    };
  }, [isVisible]);

  // FIX 4: Subtitle animation dengan proper cleanup
  useEffect(() => {
    if (!isVisible || !subtitleRef.current) return;

    const text = "We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.";
    const words = text.split(" ");
    
    subtitleRef.current.innerHTML = "";
    
    const animations = [];

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.overflow = "hidden";
      wordSpan.style.marginRight = "0.3em";
      
      word.split("").forEach((char, charIndex) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(50px) rotate(10deg)";
        wordSpan.appendChild(span);
        
        const anim = gsap.to(span, {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.6,
          delay: (wordIndex * 0.05) + (charIndex * 0.03),
          ease: "back.out(2)",
        });

        animations.push(anim);
      });
      
      subtitleRef.current.appendChild(wordSpan);
    });

    return () => {
      animations.forEach(anim => anim.kill());
    };
  }, [isVisible]);

  // FIX 5: GSAP animations dengan dependencies yang benar
  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, scale: 0.8, rotationX: -45 });
      gsap.set(formRef.current, { opacity: 0, x: 100, rotationY: 15 });
      gsap.set(mapRef.current, { opacity: 0, scale: 0.9 });

      contactCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            rotationZ: index % 2 === 0 ? -15 : 15,
          });
        }
      });

      socialLinksRef.current.forEach((link) => {
        if (link) {
          gsap.set(link, { opacity: 0, scale: 0, rotation: 180 });
        }
      });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(titleRef.current, {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "power4.out",
      });

      tl.to(
        formRef.current,
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1"
      );

      tl.to(
        contactCardsRef.current.filter(Boolean),
        {
          opacity: 1,
          x: 0,
          rotationZ: 0,
          duration: 1,
          stagger: {
            each: 0.15,
            from: "start",
          },
          ease: "back.out(1.5)",
        },
        "-=0.8"
      );

      tl.to(
        socialLinksRef.current.filter(Boolean),
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.6"
      );

      tl.to(
        mapRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );

      gsap.to(titleRef.current, {
        textShadow: [
          `0 0 20px ${CONTACT_THEME.glow}`,
          `0 0 40px ${CONTACT_THEME.accent}, 0 0 60px ${CONTACT_THEME.glow}`,
          `0 0 20px ${CONTACT_THEME.glow}`,
        ],
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
      });

      particlesRef.current.filter(Boolean).forEach((particle, index) => {
        const pos = particlePositions[index];
        
        gsap.to(particle, {
          y: -150,
          x: Math.sin(index) * 50,
          opacity: 0,
          rotation: 360,
          duration: pos.duration,
          ease: "none",
          repeat: -1,
          delay: pos.delay,
        });
      });

    }, contactRef);

    return () => ctx.revert();
  }, [isVisible, particlePositions]); // Removed CONTACT_THEME from dependencies

  // FIX 6: Card hover dengan cleanup ripple yang lebih baik
  const handleCardHover = (index, isEnter) => {
    const card = contactCardsRef.current[index];
    if (!card) return;

    if (isEnter) {
      // Hapus ripple lama jika ada
      const oldRipples = card.querySelectorAll('.hover-ripple');
      oldRipples.forEach(ripple => ripple.remove());

      const ripple = document.createElement("div");
      ripple.className = "absolute inset-0 rounded-2xl pointer-events-none hover-ripple";
      ripple.style.background = `radial-gradient(circle, ${CONTACT_THEME.accentLight}40 0%, transparent 70%)`;
      ripple.style.transform = "scale(0)";
      card.appendChild(ripple);

      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          if (ripple && ripple.parentNode) {
            ripple.remove();
          }
        },
      });

      gsap.to(card, {
        scale: 1.1,
        y: -20,
        rotationY: 5,
        rotationX: -5,
        boxShadow: `0 20px 60px ${CONTACT_THEME.accent}, 0 0 80px ${CONTACT_THEME.glow}, inset 0 0 30px ${CONTACT_THEME.glow}`,
        duration: 0.5,
        ease: "power2.out",
      });

      const icon = card.querySelector(".card-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1.3,
          rotation: 360,
          duration: 0.6,
          ease: "back.out(2)",
        });
      }

      const title = card.querySelector(".card-title");
      if (title) {
        gsap.to(title, {
          textShadow: `0 0 20px ${CONTACT_THEME.accentLight}`,
          duration: 0.3,
        });
      }
    } else {
      gsap.to(card, {
        scale: 1,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        boxShadow: `0 8px 30px ${CONTACT_THEME.glow}`,
        duration: 0.5,
        ease: "power2.out",
      });

      const icon = card.querySelector(".card-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      }

      const title = card.querySelector(".card-title");
      if (title) {
        gsap.to(title, {
          textShadow: "0 0 0px transparent",
          duration: 0.3,
        });
      }
    }
  };

  const handleCardMove = (e, index) => {
    const card = contactCardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus("sending");
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFormStatus("success");
    
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFormStatus("");
    }, 3000);
  };

  const handleSocialHover = (index, isEnter) => {
    const link = socialLinksRef.current[index];
    if (!link) return;

    if (isEnter) {
      gsap.to(link, {
        scale: 1.3,
        rotation: 360,
        backgroundColor: CONTACT_THEME.accent,
        boxShadow: `0 0 30px ${CONTACT_THEME.glow}, 0 0 50px ${CONTACT_THEME.accent}`,
        duration: 0.4,
        ease: "back.out(2)",
      });
    } else {
      gsap.to(link, {
        scale: 1,
        rotation: 0,
        backgroundColor: `${CONTACT_THEME.accent}40`,
        boxShadow: `0 4px 15px ${CONTACT_THEME.glow}`,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@DocFlux.com",
      description: "Drop us a line anytime",
      color: "#3b82f6",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+62 852-1234-5678",
      description: "Mon-Fri, 9AM - 6PM EST",
      color: "#10b981",
    },
    // {
    //   icon: MapPin,
    //   title: "Visit Us",
    //   value: "-",
    //   description: "-",
    //   color: "#f59e0b",
    // },
    // {
    //   icon: MessageCircle,
    //   title: "Live Chat",
    //   value: "Chat with us now",
    //   description: "Average response: 2 mins",
    //   color: "#8b5cf6",
    // },
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "#", color: "#1877f2" },
    { icon: Twitter, name: "Twitter", url: "#", color: "#1da1f2" },
    { icon: Instagram, name: "Instagram", url: "#", color: "#e4405f" },
    { icon: Linkedin, name: "LinkedIn", url: "#", color: "#0a66c2" },
    { icon: Youtube, name: "YouTube", url: "#", color: "#ff0000" },
  ];

  return (
    <section
      ref={contactRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
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
          animation: "gradient-contact 15s ease infinite",
        }}
      />

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
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(10, 10, 13, 1) 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${CONTACT_THEME.accent} 0%, transparent 70%)`,
          animation: "pulse-ring 4s ease-in-out infinite",
        }}
      />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${CONTACT_THEME.accentLight} 0%, transparent 70%)`,
          animation: "pulse-ring 5s ease-in-out infinite",
          animationDelay: "1s",
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
              background: `radial-gradient(circle, ${CONTACT_THEME.accentLight}, ${CONTACT_THEME.accent})`,
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              opacity: 0.7,
              boxShadow: `0 0 ${pos.size * 3}px ${CONTACT_THEME.accentLight}`,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="text-center mb-20 md:mt-5">
          <h1
            ref={titleRef}
            className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
            style={{
              textShadow: `0 0 30px ${CONTACT_THEME.glow}`,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Let's Talk
          </h1>

          <div
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                
                return (
                  <div
                    key={index}
                    ref={(el) => (contactCardsRef.current[index] = el)}
                    onMouseEnter={() => handleCardHover(index, true)}
                    onMouseLeave={() => handleCardHover(index, false)}
                    onMouseMove={(e) => handleCardMove(e, index)}
                    className="relative p-6 rounded-2xl backdrop-blur-md cursor-pointer overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${CONTACT_THEME.accent}25, ${CONTACT_THEME.accentLight}15)`,
                      border: `2px solid ${CONTACT_THEME.accent}50`,
                      boxShadow: `0 8px 30px ${CONTACT_THEME.glow}`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${method.color}30, transparent)`,
                      }}
                    />

                    <div className="relative z-10">
                      <div
                        className="card-icon mb-4 inline-block"
                        style={{
                          filter: `drop-shadow(0 0 10px ${method.color})`,
                        }}
                      >
                        <Icon size={48} color={method.color} strokeWidth={1.8} />
                      </div>
                      <h3 className="card-title text-xl font-bold text-white mb-2">
                        {method.title}
                      </h3>
                      <p className="text-white/90 font-medium mb-1 text-sm">
                        {method.value}
                      </p>
                      <p className="text-white/60 text-xs">{method.description}</p>
                    </div>
                    <div
                      className="absolute top-0 right-0 w-20 h-20 opacity-20"
                      style={{
                        background: `radial-gradient(circle at top right, ${method.color}, transparent)`,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border-2"
              style={{
                borderColor: `${CONTACT_THEME.accent}40`,
                boxShadow: `0 8px 30px ${CONTACT_THEME.glow}`,
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Follow Us
              </h3>

              <div className="flex justify-center gap-4 flex-wrap">
                {socialLinks.map((social, index) => {
                  const SocialIcon = social.icon;
                  
                  return (
                    <a
                      key={index}
                      href={social.url}
                      ref={(el) => (socialLinksRef.current[index] = el)}
                      onMouseEnter={() => handleSocialHover(index, true)}
                      onMouseLeave={() => handleSocialHover(index, false)}
                      className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
                      style={{
                        background: `${CONTACT_THEME.accent}40`,
                        boxShadow: `0 4px 15px ${CONTACT_THEME.glow}`,
                      }}
                      title={social.name}
                    >
                      <SocialIcon size={24} color={social.color} strokeWidth={2} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div
              ref={mapRef}
              className="relative h-64 rounded-2xl overflow-hidden border-2"
              style={{
                borderColor: `${CONTACT_THEME.accent}40`,
                boxShadow: `0 8px 30px ${CONTACT_THEME.glow}`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-white/70 text-sm">Interactive Map(Coming soon)</p>
                  <p className="text-white/50 text-xs mt-1">-</p>
                </div>
              </div>
              
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, transparent 40%, ${CONTACT_THEME.accent}20)`,
                }}
              />
            </div>
          </div>

          <div
            ref={formRef}
            className="relative p-8 md:p-10 rounded-3xl backdrop-blur-md"
            style={{
              background: `linear-gradient(135deg, ${CONTACT_THEME.accent}20, ${CONTACT_THEME.accentLight}10)`,
              border: `2px solid ${CONTACT_THEME.accent}50`,
              boxShadow: `0 12px 50px ${CONTACT_THEME.glow}`,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Send us a Message
              </h2>
              <div className="h-1 w-20 mx-auto rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${CONTACT_THEME.accent}, ${CONTACT_THEME.accentLight})`,
                  boxShadow: `0 0 20px ${CONTACT_THEME.glow}`,
                }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-white/90 font-medium mb-2 text-sm">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 text-white placeholder-white/40 focus:outline-none"
                    style={{
                      borderColor: `${CONTACT_THEME.accent}30`,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = CONTACT_THEME.accent;
                      e.target.style.boxShadow = `0 0 25px ${CONTACT_THEME.glow}`;
                      gsap.to(e.target, {
                        scale: 1.02,
                        duration: 0.3,
                      });
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = `${CONTACT_THEME.accent}30`;
                      e.target.style.boxShadow = "none";
                      gsap.to(e.target, {
                        scale: 1,
                        duration: 0.3,
                      });
                    }}
                    placeholder="Your name..."
                  />
                </div>

                <div className="relative">
                  <label className="block text-white/90 font-medium mb-2 text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 text-white placeholder-white/40 focus:outline-none"
                    style={{
                      borderColor: `${CONTACT_THEME.accent}30`,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = CONTACT_THEME.accent;
                      e.target.style.boxShadow = `0 0 25px ${CONTACT_THEME.glow}`;
                      gsap.to(e.target, {
                        scale: 1.02,
                        duration: 0.3,
                      });
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = `${CONTACT_THEME.accent}30`;
                      e.target.style.boxShadow = "none";
                      gsap.to(e.target, {
                        scale: 1,
                        duration: 0.3,
                      });
                    }}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-white/90 font-medium mb-2 text-sm">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 text-white placeholder-white/40 focus:outline-none"
                  style={{
                    borderColor: `${CONTACT_THEME.accent}30`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = CONTACT_THEME.accent;
                    e.target.style.boxShadow = `0 0 25px ${CONTACT_THEME.glow}`;
                    gsap.to(e.target, {
                      scale: 1.02,
                      duration: 0.3,
                    });
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `${CONTACT_THEME.accent}30`;
                    e.target.style.boxShadow = "none";
                    gsap.to(e.target, {
                      scale: 1,
                      duration: 0.3,
                    });
                  }}
                  placeholder="How can we help you?"
                />
              </div>

              <div className="relative">
                <label className="block text-white/90 font-medium mb-2 text-sm">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 text-white placeholder-white/40 focus:outline-none resize-none"
                  style={{
                    borderColor: `${CONTACT_THEME.accent}30`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = CONTACT_THEME.accent;
                    e.target.style.boxShadow = `0 0 25px ${CONTACT_THEME.glow}`;
                    gsap.to(e.target, {
                      scale: 1.02,
                      duration: 0.3,
                    });
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `${CONTACT_THEME.accent}30`;
                    e.target.style.boxShadow = "none";
                    gsap.to(e.target, {
                      scale: 1,
                      duration: 0.3,
                    });
                  }}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <div className="text-right text-white/50 text-xs">
                {formData.message.length} / 1000 characters
              </div>

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="relative w-full px-10 py-5 rounded-xl font-bold text-lg text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: formStatus === "success" 
                    ? `linear-gradient(135deg, ${CONTACT_THEME.success}, #059669)`
                    : `linear-gradient(135deg, ${CONTACT_THEME.accent}, ${CONTACT_THEME.accentLight})`,
                  boxShadow: `0 8px 30px ${CONTACT_THEME.glow}`,
                }}
                onMouseEnter={(e) => {
                  if (formStatus !== "sending") {
                    gsap.to(e.currentTarget, {
                      scale: 1.03,
                      boxShadow: `0 12px 40px ${CONTACT_THEME.accent}, 0 0 60px ${CONTACT_THEME.glow}`,
                      duration: 0.3,
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    boxShadow: `0 8px 30px ${CONTACT_THEME.glow}`,
                    duration: 0.3,
                  });
                }}
              >
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />

                <span className="relative z-10 flex items-center gap-3 justify-center">
                  {formStatus === "sending" ? (
                    <>
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : formStatus === "success" ? (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              <p className="text-white/50 text-xs text-center mt-4">
                Your information is safe with us. We respect your privacy.
              </p>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: Zap, label: "Fast Response", value: "- hours", color: "#fbbf24" },
            { icon: Globe, label: "Worldwide", value: "- Countries", color: "#3b82f6" },
            { icon: Star, label: "Customer Rating", value: "-/5.0", color: "#fbbf24" },
            { icon: Briefcase, label: "Projects Done", value: "-", color: "#8b5cf6" },
          ].map((stat, index) => {
            const StatIcon = stat.icon;
            
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl backdrop-blur-sm"
                style={{
                  background: `${CONTACT_THEME.accent}15`,
                  border: `1px solid ${CONTACT_THEME.accent}30`,
                  animation: "slide-up-fade 0.6s ease-out",
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <div className="mb-2 flex justify-center">
                  <StatIcon 
                    size={36} 
                    color={stat.color} 
                    strokeWidth={2} 
                  />
                </div>
                
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
