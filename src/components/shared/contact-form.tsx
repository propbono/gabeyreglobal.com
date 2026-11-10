import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { initPostHog } from "@/lib/posthog";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  company: z.string().optional(),
  serviceInterest: z.enum([
    "Print",
    "Web Development",
    "Mobile App",
    "Consulting",
    "Other",
  ]),
  budgetRange: z.enum([
    "Under $1K",
    "$1K-$5K",
    "$5K-$20K",
    "$20K+",
    "Not sure",
  ]),
  timeline: z.enum([
    "ASAP",
    "Within 1 month",
    "1-3 months",
    "3+ months",
    "Just exploring",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const SERVICE_OPTIONS = [
  "Print",
  "Web Development",
  "Mobile App",
  "Consulting",
  "Other",
] as const;

const BUDGET_OPTIONS = [
  "Under $1K",
  "$1K-$5K",
  "$5K-$20K",
  "$20K+",
  "Not sure",
] as const;

const TIMELINE_OPTIONS = [
  "ASAP",
  "Within 1 month",
  "1-3 months",
  "3+ months",
  "Just exploring",
] as const;

const REQUIRED_FIELDS = ["name", "email", "message"] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const hasTrackedStart = useRef(false);
  const completedFields = useRef(new Set<string>());

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      serviceInterest: "Print",
      budgetRange: "Not sure",
      timeline: "Just exploring",
      message: "",
    },
  });

  const selectedService = watch("serviceInterest");
  const selectedBudget = watch("budgetRange");
  const selectedTimeline = watch("timeline");

  const trackFieldComplete = useCallback(
    (fieldName: string) => {
      if (completedFields.current.has(fieldName)) return;
      const posthog = initPostHog();
      if (posthog) {
        posthog.capture("form_field_completed", {
          form_name: "contact",
          field_name: fieldName,
        });
      }
      completedFields.current.add(fieldName);
    },
    [],
  );

  const handleFieldBlur = useCallback(
    async (fieldName: keyof ContactFormValues) => {
      const valid = await trigger(fieldName);
      if (valid) {
        trackFieldComplete(fieldName);
      }
    },
    [trigger, trackFieldComplete],
  );

  const handleFirstFocus = useCallback(() => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    const posthog = initPostHog();
    if (posthog) {
      posthog.capture("form_started", { form_name: "contact" });
    }
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as {
        success: boolean;
        error?: string;
      };

      if (result.success) {
        setStatus("success");
        const posthog = initPostHog();
        if (posthog) {
          posthog.capture("form_submitted", {
            form_name: "contact",
            service_interest: data.serviceInterest,
            budget_range: data.budgetRange,
            timeline: data.timeline,
          });
        }
      } else {
        setStatus("error");
        setErrorMessage(result.error ?? "Something went wrong. Please try again.");
        const posthog = initPostHog();
        if (posthog) {
          posthog.capture("form_submission_failed", {
            form_name: "contact",
            error_message: result.error ?? "Unknown error",
          });
        }
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
      const posthog = initPostHog();
      if (posthog) {
        posthog.capture("form_submission_failed", {
          form_name: "contact",
          error_message: "Network error",
        });
      }
    }
  };

  const handleValidationError = useCallback((validationErrors: FieldErrors<ContactFormValues>) => {
    const posthog = initPostHog();
    if (posthog) {
      for (const field of REQUIRED_FIELDS) {
        if (validationErrors[field]) {
          posthog.capture("form_errored", {
            form_name: "contact",
            field_name: field,
            error_type: validationErrors[field]?.type ?? "validation",
          });
        }
      }
    }
  }, []);

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent/10">
          <svg
            className="size-6 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-foreground">
          Thanks! We&apos;ll be in touch within 24 hours.
        </h3>
        <p className="mt-2 text-muted-foreground">
          We&apos;ve received your message and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, handleValidationError)}
      className="space-y-6"
      noValidate
    >
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Your full name"
          aria-invalid={!!errors.name}
          onFocus={handleFirstFocus}
          onBlur={() => handleFieldBlur("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="you@company.com"
          aria-invalid={!!errors.email}
          onFocus={handleFirstFocus}
          onBlur={() => handleFieldBlur("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company">Company (optional)</Label>
        <Input
          id="company"
          {...register("company")}
          placeholder="Your company name"
          onFocus={handleFirstFocus}
        />
      </div>

      {/* Service Interest */}
      <div className="space-y-2">
        <Label htmlFor="serviceInterest">Service Interest</Label>
        <Select
          value={selectedService}
          onValueChange={(value) => {
            setValue("serviceInterest", value as ContactFormValues["serviceInterest"]);
          }}
        >
          <SelectTrigger id="serviceInterest" className="w-full" onFocus={handleFirstFocus}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Budget Range */}
      <div className="space-y-2">
        <Label htmlFor="budgetRange">Budget Range</Label>
        <Select
          value={selectedBudget}
          onValueChange={(value) => {
            setValue("budgetRange", value as ContactFormValues["budgetRange"]);
          }}
        >
          <SelectTrigger id="budgetRange" className="w-full" onFocus={handleFirstFocus}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BUDGET_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Timeline */}
      <div className="space-y-2">
        <Label htmlFor="timeline">Timeline</Label>
        <Select
          value={selectedTimeline}
          onValueChange={(value) => {
            setValue("timeline", value as ContactFormValues["timeline"]);
          }}
        >
          <SelectTrigger id="timeline" className="w-full" onFocus={handleFirstFocus}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TIMELINE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Project Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Tell us about your project, goals, and any specific requirements..."
          rows={5}
          aria-invalid={!!errors.message}
          onFocus={handleFirstFocus}
          onBlur={() => handleFieldBlur("message")}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      {/* Error message */}
      {status === "error" && (
        <p className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
