import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { CompanyCard } from "@/components/shared/company-card";

export const Route = createFileRoute("/companies/")({ component: CompaniesPage });

const companies = [
  {
    name: "Gemprint",
    description: "Commercial printing for Canadian businesses. Full-service print shop offering digital, offset, and large-format printing since 2017.",
    href: "https://gemprint.ca",
    status: "live" as const,
  },
  {
    name: "Archdrill",
    description: "AI system-design interview coach for senior engineers. Paste a job description and get a tailored architecture challenge with adaptive feedback.",
    href: "https://archdrill.com",
    status: "live" as const,
  },
];

function CompaniesPage() {
  return (
    <>
      <SectionWrapper background="muted">
        <SectionHeader
          heading="Our Companies"
          subtext="Gabeyre Global Inc is the parent company of a growing family of brands. Each subsidiary operates independently with its own focus, customers, and identity."
        />
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c) => (
            <CompanyCard key={c.name} {...c} />
          ))}
          {/* Subtle hint at future growth */}
          <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card/30 p-6 text-center">
            <p className="text-sm text-muted-foreground/60">More ventures<br />in development</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-foreground text-center">Corporate Structure</h2>
          <div className="mt-10 flex flex-col items-center gap-6">
            {/* Parent */}
            <div className="rounded-xl border-2 border-accent/30 bg-accent/5 px-8 py-4 text-center shadow-sm">
              <span className="text-sm font-semibold tracking-widest text-accent uppercase">Parent Company</span>
              <h3 className="mt-1 font-heading text-xl font-bold text-foreground">Gabeyre Global Inc</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">Ontario, Canada</p>
            </div>
            {/* Line */}
            <div className="h-8 w-px bg-border" />
            {/* Children */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card px-6 py-3 text-center shadow-sm">
                <span className="text-sm font-semibold text-foreground">Gemprint</span>
                <p className="text-xs text-muted-foreground">Commercial Print</p>
              </div>
              <div className="rounded-xl border border-border bg-card px-6 py-3 text-center shadow-sm">
                <span className="text-sm font-semibold text-foreground">Archdrill</span>
                <p className="text-xs text-muted-foreground">AI Interview Coaching</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="primary">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">Interested in partnering?</h2>
          <p className="mt-4 text-lg text-primary-foreground/70">Whether you want to work with one of our brands or explore a joint venture, we'd love to hear from you.</p>
          <Button variant="secondary" size="lg" className="mt-8" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
