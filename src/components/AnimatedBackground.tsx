import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseY: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scrollVelocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
      
      const colors = [
        "rgba(0, 229, 255, ", // cyan
        "rgba(168, 85, 247, ", // purple
      ];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseY: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 0.3 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      particlesRef.current = particles;
    };
    createParticles();

    // Track scroll velocity
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocityRef.current = (currentScroll - lastScrollRef.current) * 0.1;
      lastScrollRef.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradually decay scroll velocity
      scrollVelocityRef.current *= 0.95;

      particlesRef.current.forEach((particle) => {
        // Update particle position based on scroll velocity
        particle.y = particle.baseY + scrollVelocityRef.current * particle.speed * 20;

        // Wrap particles around screen
        if (particle.y > canvas.height + 10) {
          particle.baseY = -10;
          particle.y = particle.baseY;
        } else if (particle.y < -10) {
          particle.baseY = canvas.height + 10;
          particle.y = particle.baseY;
        }

        // Draw particle glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, `${particle.color}${particle.opacity})`);
        gradient.addColorStop(1, `${particle.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle core
        ctx.fillStyle = `${particle.color}${particle.opacity + 0.3})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw streak when scrolling
        if (Math.abs(scrollVelocityRef.current) > 0.5) {
          const streakLength = Math.abs(scrollVelocityRef.current) * particle.speed * 5;
          const gradient = ctx.createLinearGradient(
            particle.x,
            particle.y,
            particle.x,
            particle.y - scrollVelocityRef.current * particle.speed * 3
          );
          gradient.addColorStop(0, `${particle.color}${particle.opacity * 0.6})`);
          gradient.addColorStop(1, `${particle.color}0)`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = particle.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x, particle.y - streakLength);
          ctx.stroke();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default AnimatedBackground;
