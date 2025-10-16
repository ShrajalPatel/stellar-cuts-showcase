import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import reelImg from "@/assets/project-reel-1.jpg";
import animeImg from "@/assets/project-anime-1.jpg";
import photoImg from "@/assets/project-photo-1.jpg";
import bannerImg from "@/assets/project-banner-1.jpg";
import thumbImg from "@/assets/project-thumb-1.jpg";

const projects = [
  {
    category: "Reel Edits",
    image: reelImg,
    items: [
      { title: "Viral Dance Reel", views: "1.2M" },
      { title: "Product Showcase", views: "850K" },
      { title: "Fashion Transition", views: "920K" },
    ],
  },
  {
    category: "Anime Edits",
    image: animeImg,
    items: [
      { title: "AMV - Epic Battles", views: "2.1M" },
      { title: "Character Montage", views: "1.5M" },
      { title: "Opening Edit", views: "980K" },
    ],
  },
  {
    category: "Photo Edits",
    image: photoImg,
    items: [
      { title: "Portrait Retouch", views: "540K" },
      { title: "Creative Composite", views: "720K" },
      { title: "Color Grading", views: "610K" },
    ],
  },
  {
    category: "Banners",
    image: bannerImg,
    items: [
      { title: "YouTube Channel Art", views: "320K" },
      { title: "Gaming Banner", views: "450K" },
      { title: "Brand Header", views: "380K" },
    ],
  },
  {
    category: "Thumbnails",
    image: thumbImg,
    items: [
      { title: "Clickbait Design", views: "1.8M" },
      { title: "Tutorial Thumb", views: "920K" },
      { title: "Vlog Cover", views: "1.1M" },
    ],
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass rounded-xl overflow-hidden glow-hover h-full">
        {/* Preview Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.category}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
            {project.category}
          </h3>
          <div className="space-y-2">
            {project.items.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className="flex justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{item.title}</span>
                <span className="text-primary">{item.views}</span>
              </motion.div>
            ))}
          </div>
          <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-background">
            View More
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-neon bg-clip-text text-transparent">My Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Showcasing my latest creative work across different categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
