import { createFileRoute } from "@tanstack/react-router";
import { AboutCondensed } from "@/components/sections/about-condensed";
import { CompaniesSection } from "@/components/sections/companies-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { HeroSection } from "@/components/sections/hero";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { ServicesGrid } from "@/components/sections/services-grid";
import { SocialProofBar } from "@/components/sections/social-proof-bar";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gabeyre Global Inc",
  url: "https://gabeyreglobal.ca",
  description:
    "Gabeyre Global Inc is a Canadian corporation operating Gemprint (commercial printing) and Archdrill (AI system-design interview coaching), and providing web & app development services.",
  foundingDate: "2017",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CA",
    addressRegion: "Ontario",
  },
  sameAs: ["https://linkedin.com/company/gabeyre-global"],
};

// use `head` for page-level SEO metadata
function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires script injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        title: "Gabeyre Global Inc — Software & Print for Canadian Business",
      },
      {
        name: "description",
        content:
          "Gabeyre Global Inc is a Canadian corporation operating Gemprint (commercial printing) and Archdrill (AI system-design interview coaching), and providing web & app development services. Based in Ontario, serving clients across Canada.",
      },
      {
        name: "keywords",
        content:
          "Canadian software development company, web development Canada, custom software Ontario, commercial printing Canada, Gemprint, Archdrill, AI interview coaching, print and software company",
      },
    ],
  }),
});

function Home() {
  return (
    <>
      <StructuredData />
      <HeroSection />
      <SocialProofBar />
      <ServicesGrid />
      <PortfolioGrid />
      <CompaniesSection />
      <AboutCondensed />
      <FinalCTA />
    </>
  );
}
