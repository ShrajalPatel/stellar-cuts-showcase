import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const StatCard = ({ stat, index }: { stat: { label: string; value: string }; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);
  const scale = useTransform(
    [mouseX, mouseY],
    ([x, y]: [number, number]) => {
      const centerDistance = Math.sqrt(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2));
      return 1.1 - centerDistance * 0.05;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="text-center p-3 rounded-lg bg-muted/30 transition-shadow duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)]"
    >
      <div className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
        {stat.value}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
    </motion.div>
  );
};

const AboutSection = () => {

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl p-12 neon-glow"
        >
          <h2 className="text-5xl font-bold mb-8 text-center">
            <span className="bg-gradient-neon bg-clip-text text-transparent">About My Work</span>
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground">
            <p className="leading-relaxed">
              I specialize in creating <span className="text-primary font-semibold">cinematic</span> and{" "}
              <span className="text-secondary font-semibold">anime-style edits</span> that bring visuals to life. 
              With years of experience in video editing, photo manipulation, and graphic design, I transform 
              ordinary content into extraordinary visual experiences.
            </p>

            <p className="leading-relaxed">
              Whether you need a viral Instagram reel, an epic anime AMV, professional photo retouching, 
              eye-catching banners, or thumbnail designs that demand clicks – I've got you covered.
            </p>

            <div className="border-l-4 border-primary pl-6 py-4 my-8 bg-card/50 rounded-r-lg">
              <h3 className="text-2xl font-semibold text-foreground mb-3">How to Work With Me</h3>
              <p className="leading-relaxed">
                To collaborate, simply reach out via my contact details below and share your idea. 
                I'll handle the rest – from concept development to final delivery. Every project gets 
                my full attention and creative expertise to ensure you get content that stands out.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Projects", value: "500+" },
                { label: "Clients", value: "200+" },
                { label: "Total Views", value: "50M+" },
                { label: "Avg Rating", value: "4.9★" },
              ].map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
