import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { ProjectCard } from "@/components/shared/project-card";

export const Route = createFileRoute("/work/")({ component: WorkPage });

const projects = [
  {
    title: "Gemprint",
    category: "Commercial Print Website",
    description:
      "Full-stack e-commerce print platform. Custom Next.js build with product catalog, quoting system, and integrated contact workflow.",
    image: "/images/gemprint-screenshot.png",
    href: "https://gemprint.ca",
  },
  {
    title: "Greg Mozer",
    category: "Personal Brand & Portfolio",
    description:
      "Personal portfolio and brand site. Demonstrates range across web development, game dev, and creative coding.",
    image: "/images/gmozer-screenshot.png",
    href: "https://gmozer.ca",
  },
  {
    title: "Cloudfide",
    category: "Web Application",
    description:
      "Cloud-based file tree explorer. Built with React and modern web technologies.",
    image: "/images/cloudfide-screenshot.png",
    href: "https://cloudfide.vercel.app",
  },
  {
    title: "Wizcode Music",
    category: "Web Application",
    description:
      "Music discovery app using iTunes API and React Query. Demonstrates API integration, state management, and testing with Vitest.",
    image: "/images/wizcode-screenshot.png",
    href: "https://wizcode-music.vercel.app",
  },
  {
    title: "Archdrill",
    category: "SaaS / AI Application",
    description:
      "AI-powered system-design interview coach. Paste a job description to get a tailored architecture challenge with adaptive follow-up evaluation and a strengths/improvements summary.",
    href: "https://archdrill.com",
  },
];

function WorkPage() {
  return (
    <>
      <SectionWrapper background="muted">
        <SectionHeader
          heading="Our Work"
          subtext="Selected projects we've built for our clients and our own companies."
        />
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {projects.map((p) => (
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
