import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseY: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  driftSpeed: number;
  layer: number;
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

    // Create particles with depth layers
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
      
      const colors = [
        "rgba(0, 229, 255, ", // cyan
        "rgba(168, 85, 247, ", // purple
        "rgba(96, 165, 250, ", // blue
      ];

      for (let i = 0; i < particleCount; i++) {
        const layer = Math.random();
        const size = Math.random() * 2.5 + 0.5;
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseY: Math.random() * canvas.height,
          size,
          opacity: Math.random() * 0.4 + 0.2,
          speed: layer * 1.5 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          driftSpeed: (Math.random() - 0.5) * 0.1,
          layer,
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

    // Animation loop with continuous drift
    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradually decay scroll velocity
      scrollVelocityRef.current *= 0.93;
      time += 0.01;

      particlesRef.current.forEach((particle) => {
        // Continuous subtle drift animation
        const drift = Math.sin(time + particle.x * 0.01) * particle.driftSpeed;
        
        // Update particle position based on scroll velocity (opposite direction)
        particle.baseY += drift;
        particle.y = particle.baseY - scrollVelocityRef.current * particle.speed * 25;

        // Wrap particles around screen
        if (particle.y > canvas.height + 20) {
          particle.baseY = -20;
          particle.y = particle.baseY;
        } else if (particle.y < -20) {
          particle.baseY = canvas.height + 20;
          particle.y = particle.baseY;
        }

        // Depth-based scale for parallax effect
        const scale = 0.5 + particle.layer * 0.5;
        const glowSize = particle.size * 4 * scale;
        const coreSize = particle.size * scale;

        // Draw particle glow with depth
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowSize
        );
        gradient.addColorStop(0, `${particle.color}${particle.opacity * particle.layer})`);
        gradient.addColorStop(0.5, `${particle.color}${particle.opacity * particle.layer * 0.3})`);
        gradient.addColorStop(1, `${particle.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle core
        ctx.fillStyle = `${particle.color}${Math.min(particle.opacity + 0.4, 1)})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, coreSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw enhanced streak when scrolling
        const scrollSpeed = Math.abs(scrollVelocityRef.current);
        if (scrollSpeed > 0.3) {
          const streakLength = scrollSpeed * particle.speed * 8 * particle.layer;
          const streakGradient = ctx.createLinearGradient(
            particle.x,
            particle.y,
            particle.x,
            particle.y - scrollVelocityRef.current * particle.speed * 4
          );
          streakGradient.addColorStop(0, `${particle.color}${particle.opacity * 0.8})`);
          streakGradient.addColorStop(0.5, `${particle.color}${particle.opacity * 0.4})`);
          streakGradient.addColorStop(1, `${particle.color}0)`);

          ctx.strokeStyle = streakGradient;
          ctx.lineWidth = coreSize * 1.2;
          ctx.lineCap = 'round';
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
      style={{ opacity: 0.7 }}
    />
  );
};

export default AnimatedBackground;
