export const COMPANY = {
  name: "Gabeyre Global Inc",
  tagline: "Software & Print for Canadian Business",
  email: "hello@gabeyreglobal.ca",
  founded: 2017,
  location: "Ontario, Canada",
  description:
    "Gabeyre Global Inc is a Canadian corporation operating businesses in print, software, and consulting.",
} as const;

export const NAV_ITEMS = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Commercial Printing",
        href: "/services/print",
        description: "Full-service print shop for business",
      },
      {
        label: "Web & App Development",
        href: "/services/development",
        description: "Custom apps, SaaS, sites, e-commerce",
      },
    ],
  },
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "Companies",
    href: "/companies",
  },
  {
    label: "About",
    href: "/about",
  },
] as const;

export const SERVICES = [
  {
    id: "print",
    name: "Commercial Printing",
    description:
      "Full-service print shop for business. Business cards, flyers, banners, signage, and enterprise print runs.",
    icon: "Printer",
    href: "/services/print",
    externalHref: "https://gemprint.ca",
  },
  {
    id: "development",
    name: "Web & App Development",
    description:
      "Custom web applications, mobile apps, SaaS platforms, and e-commerce solutions built with modern technology.",
    icon: "Code",
    href: "/services/development",
  },
  {
    id: "consulting",
    name: "Consulting",
    description:
      "Technical strategy, architecture review, and technology advisory for businesses modernizing their stack.",
    icon: "Lightbulb",
    href: "/contact",
  },
] as const;

export const SITE_URLS = {
  gabeyreGlobal: "https://gabeyreglobal.ca",
  gemprint: "https://gemprint.ca",
  gmozer: "https://gmozer.ca",
  archdrill: "https://archdrill.com",
} as const;

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/gabeyre-global",
    icon: "Linkedin",
  },
] as const;
