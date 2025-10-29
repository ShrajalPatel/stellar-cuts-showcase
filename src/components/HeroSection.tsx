import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import profileLogo from "@/assets/profile-logo.png";

const HeroSection = () => {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.img
                src={profileLogo}
                alt="Editor Logo"
                className="w-64 h-64 rounded-full neon-glow"
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(189 100% 50% / 0.5)",
                    "0 0 40px hsl(271 81% 56% / 0.5)",
                    "0 0 20px hsl(189 100% 50% / 0.5)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center md:text-left space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-foreground">Hi, I'm </span>
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                Creative Editor
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              I make cinematic, anime, and viral edits.
            </p>
            <p className="text-lg text-muted-foreground">
              Specializing in video edits, reels, photo edits, banners, and thumbnails.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="bg-gradient-neon hover:opacity-90 text-background font-semibold text-lg px-8 py-6 neon-glow"
              >
                View My Work
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Transition Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-neon z-20 opacity-60" 
           style={{
             maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 100%)'
           }}
      />
    </section>
  );
};

export default HeroSection;
