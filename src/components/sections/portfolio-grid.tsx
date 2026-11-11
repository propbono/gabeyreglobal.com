import { FolderOpen } from "lucide-react";
import { ProjectCard } from "@/components/shared/project-card";
import { SectionHeader } from "@/components/shared/section-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Gemprint",
    category: "Commercial Print Website",
    description:
      "Full-stack e-commerce print platform. Custom Next.js build with product catalog, quoting system, and integrated contact workflow.",
    href: "https://gemprint.ca",
    image: "/images/gemprint-screenshot.png",
  },
  {
    title: "Greg Mozer",
    category: "Personal Brand & Portfolio",
    description:
      "Personal portfolio and brand site. Demonstrates range across web development, game dev, and creative coding.",
    href: "https://gmozer.ca",
    image: "/images/gmozer-screenshot.png",
  },
  {
    title: "Cloudfide",
    category: "Web Application",
    description:
      "Cloud-based file tree explorer. Built with React and modern web technologies.",
    href: "https://cloudfide.vercel.app",
    image: "/images/cloudfide-screenshot.png",
  },
  {
    title: "Wizcode Music",
    category: "Web Application",
    description:
      "Music discovery app using iTunes API and React Query. Demonstrates API integration, state management, and testing with Vitest.",
    href: "https://wizcode-music.vercel.app",
    image: "/images/wizcode-screenshot.png",
  },
  {
    title: "Archdrill",
    category: "SaaS / AI Application",
    description:
      "AI-powered system-design interview coach. Paste a job description to get a tailored architecture challenge with adaptive follow-up evaluation and a strengths/improvements summary.",
    href: "https://archdrill.com",
  },
];

export function PortfolioGrid() {
  return (
    <SectionWrapper background="muted" id="work">
      <SectionHeader
        icon={FolderOpen}
        heading="Our Work"
        subtext="Selected projects from our portfolio."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            category={project.category}
            description={project.description}
            href={project.href}
            image={project.image}
          />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button variant="outline" asChild>
          <a href="/work">View All Work</a>
        </Button>
      </div>
    </SectionWrapper>
  );
}
