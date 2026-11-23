import { FolderOpen } from "lucide-react";
import { ProjectCard } from "@/components/shared/project-card";
import { SectionHeader } from "@/components/shared/section-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/lib/projects";

export function PortfolioGrid() {
  return (
    <SectionWrapper background="muted" id="work">
      <SectionHeader
        icon={FolderOpen}
        heading="Our Work"
        subtext="Selected projects from our portfolio."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {PROJECTS.map((project) => (
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
