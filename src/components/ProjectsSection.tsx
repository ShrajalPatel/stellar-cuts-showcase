import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
      { title: "Travel Montage", views: "1.5M" },
      { title: "Food Content", views: "680K" },
      { title: "Fitness Journey", views: "790K" },
      { title: "Music Video", views: "2.3M" },
      { title: "Brand Story", views: "540K" },
      { title: "Event Recap", views: "410K" },
      { title: "Tutorial Series", views: "950K" },
    ],
  },
  {
    category: "Anime Edits",
    image: animeImg,
    items: [
      { title: "AMV - Epic Battles", views: "2.1M" },
      { title: "Character Montage", views: "1.5M" },
      { title: "Opening Edit", views: "980K" },
      { title: "Emotional AMV", views: "1.8M" },
      { title: "Fight Compilation", views: "2.5M" },
      { title: "Sad Moment Mix", views: "1.2M" },
      { title: "Power Up Scenes", views: "1.9M" },
      { title: "Romance Edit", views: "1.1M" },
      { title: "Villain Theme", views: "1.6M" },
      { title: "Crossover Edit", views: "2.2M" },
    ],
  },
  {
    category: "Photo Edits",
    image: photoImg,
    items: [
      { title: "Portrait Retouch", views: "540K" },
      { title: "Creative Composite", views: "720K" },
      { title: "Color Grading", views: "610K" },
      { title: "Fantasy Scene", views: "890K" },
      { title: "Product Photo", views: "450K" },
      { title: "Fashion Editorial", views: "670K" },
      { title: "Surreal Art", views: "980K" },
      { title: "Urban Portrait", views: "520K" },
      { title: "Nature Enhancement", views: "710K" },
      { title: "Vintage Effect", views: "630K" },
    ],
  },
  {
    category: "Banners",
    image: bannerImg,
    items: [
      { title: "YouTube Channel Art", views: "320K" },
      { title: "Gaming Banner", views: "450K" },
      { title: "Brand Header", views: "380K" },
      { title: "Twitch Design", views: "410K" },
      { title: "Twitter Header", views: "290K" },
      { title: "Discord Server", views: "350K" },
      { title: "Website Hero", views: "480K" },
      { title: "Event Banner", views: "310K" },
      { title: "Music Cover", views: "390K" },
      { title: "Store Header", views: "270K" },
    ],
  },
  {
    category: "Thumbnails",
    image: thumbImg,
    items: [
      { title: "Clickbait Design", views: "1.8M" },
      { title: "Tutorial Thumb", views: "920K" },
      { title: "Vlog Cover", views: "1.1M" },
      { title: "Gaming Thumbnail", views: "1.6M" },
      { title: "Reaction Video", views: "1.3M" },
      { title: "Challenge Cover", views: "1.9M" },
      { title: "Review Thumbnail", views: "870K" },
      { title: "Podcast Art", views: "640K" },
      { title: "Stream Highlight", views: "1.4M" },
      { title: "Compilation Cover", views: "1.7M" },
    ],
  },
];

const ProjectCard = ({ item, image }: { item: { title: string; views: string }; image: string }) => {
  return (
    <motion.div
      className="group relative"
    >
      <div className="glass rounded-lg overflow-hidden h-full transition-shadow duration-300 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)]">
        {/* Preview Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h4 className="font-semibold text-foreground truncate">{item.title}</h4>
          <p className="text-sm text-primary">{item.views} views</p>
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection = ({ category, index }: { category: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="space-y-6"
    >
      {/* Category Heading */}
      <h3 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
        {category.category}
      </h3>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {category.items.map((item, idx) => (
            <CarouselItem key={idx} className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <ProjectCard item={item} image={category.image} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-12 glass border-primary/20" />
        <CarouselNext className="-right-12 glass border-primary/20" />
      </Carousel>
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

        <div className="space-y-16">
          {projects.map((category, index) => (
            <CategorySection key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
