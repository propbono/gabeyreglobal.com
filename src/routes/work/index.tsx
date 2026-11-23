import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { ProjectCard } from "@/components/shared/project-card";
import { PROJECTS } from "@/lib/projects";

export const Route = createFileRoute("/work/")({ component: WorkPage });

function WorkPage() {
  return (
    <>
      <SectionWrapper background="muted">
        <SectionHeader
          heading="Our Work"
          subtext="Selected projects we've built for our clients and our own companies."
        />
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="primary">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
            Want to be our next case study?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            Tell us about your project and let&apos;s build something together.
          </p>
          <Button variant="secondary" size="lg" className="mt-8" asChild>
            <Link to="/contact">Start Your Project</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
