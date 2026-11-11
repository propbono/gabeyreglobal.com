import { createFileRoute } from "@tanstack/react-router";
import { PenTool, Printer, Truck, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";

export const Route = createFileRoute("/services/print")({ component: PrintPage });

const capabilities = [
  { icon: Printer, title: "Digital Printing", desc: "High-quality short to medium runs with fast turnaround. Perfect for business cards, flyers, brochures, and booklets." },
  { icon: Palette, title: "Offset Printing", desc: "Cost-effective for large volumes. Ideal for catalogues, magazines, and corporate stationery in bulk." },
  { icon: Truck, title: "Large Format", desc: "Banners, posters, signage, and trade show displays. Indoor and outdoor materials." },
  { icon: PenTool, title: "Design Services", desc: "Need design help? Our team can take your concept from idea to print-ready artwork." },
];

function PrintPage() {
  return (
    <>
      <SectionWrapper background="muted">
        <SectionHeader
          heading="Commercial Printing at Scale"
          subtext="Through our Gemprint subsidiary, we handle print jobs from business cards to enterprise runs. Fast turnaround, quality materials, and exceptional service."
        />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {capabilities.map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <c.icon className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground">Why print through a technology company?</h2>
          <div className="mt-8 grid gap-6 text-left md:grid-cols-3">
            <div>
              <h4 className="font-semibold text-foreground">Online ordering</h4>
              <p className="mt-1 text-sm text-muted-foreground">Upload files, get instant quotes, and track orders through our automated platform.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Faster turnaround</h4>
              <p className="mt-1 text-sm text-muted-foreground">Automation and smart workflows mean your order moves faster from upload to delivery.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">One partner</h4>
              <p className="mt-1 text-sm text-muted-foreground">Need a website AND business cards? We handle both. No coordinating between vendors.</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="primary">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">Ready to print?</h2>
          <p className="mt-4 text-lg text-primary-foreground/70">Visit Gemprint to explore products and get a free quote.</p>
          <Button variant="secondary" size="lg" className="mt-8" asChild>
            <a href="https://gemprint.ca" target="_blank" rel="noopener noreferrer">Visit gemprint.ca</a>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
