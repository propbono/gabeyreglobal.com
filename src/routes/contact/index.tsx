import { createFileRoute } from "@tanstack/react-router";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { ContactForm } from "@/components/shared/contact-form";
import { COMPANY } from "@/lib/constants";
import { Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact/")({
  component: ContactPage,
});

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "(416) 666-1676",
    href: "tel:+14166661676",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(647) 833-8068",
    href: "tel:+16478338068",
  },
  {
    icon: MapPin,
    label: "Location",
    value: COMPANY.location,
    href: null,
  },
];

function ContactPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper>
        <SectionHeader
          heading="Start Your Project"
          subtext="Tell us what you need and we'll get back to you within 24 hours."
        />

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div className="flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Whether you need commercial printing, a custom web application, or
              technical consulting — we&apos;re ready to help. Fill out the form
              and our team will follow up within one business day.
            </p>

            <div className="mt-10 space-y-6">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-base text-foreground underline-offset-4 hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-base text-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
            <ContactForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
