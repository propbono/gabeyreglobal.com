import { Building2 } from "lucide-react";
import { CompanyCard } from "@/components/shared/company-card";
import { SectionHeader } from "@/components/shared/section-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const companies = [
  {
    id: "gemprint",
    name: "Gemprint",
    description:
      "Commercial printing for Canadian businesses. Operating since 2017.",
    href: "https://gemprint.ca",
    status: "live" as const,
  },
  {
    id: "archdrill",
    name: "Archdrill",
    description:
      "AI system-design interview coach for senior engineers. Paste a job description and get a tailored architecture challenge with adaptive feedback.",
    href: "https://archdrill.com",
    status: "live" as const,
  },
];

export function CompaniesSection() {
  return (
    <SectionWrapper background="muted">
      <SectionHeader
        icon={Building2}
        heading="Our Companies"
        subtext="Gabeyre Global Inc is the parent company of a growing family of brands."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            name={company.name}
            description={company.description}
            href={company.href}
            status={company.status}
          />
        ))}
        <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card/30 p-6 text-center">
          <p className="text-sm text-muted-foreground/60">More ventures<br />in development</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
