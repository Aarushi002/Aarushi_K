export type ProjectCategory =
  | "MERN Stack"
  | "Shopify"
  | "WordPress & WooCommerce";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  href: string;
}

export const projectCategories: ProjectCategory[] = [
  "MERN Stack",
  "Shopify",
  "WordPress & WooCommerce",
];

export const projects: Project[] = [
  {
    id: "offshore-company-reg",
    title: "Offshore Company Reg",
    category: "MERN Stack",
    description:
      "Offshore company formation, registration, and banking flows with a guided client experience.",
    tags: ["MERN", "Forms", "Dashboard"],
    href: "https://www.offshorecompanyreg.com/",
  },
  {
    id: "phact",
    title: "pHact | ProCaps Labs",
    category: "MERN Stack",
    description:
      "Soap-free natural skin pH cleansing bar — dermatologist tested, story-led product experience.",
    tags: ["React", "E-commerce", "Brand"],
    href: "https://phact.procapslabs.com/",
  },
  {
    id: "love-cuba",
    title: "Love Cuba",
    category: "MERN Stack",
    description:
      "Travel and holiday storytelling with immersive visuals and itinerary highlights.",
    tags: ["Travel", "Content", "UI"],
    href: "https://share.google/mQrUBNa9fktu82zax",
  },
  {
    id: "talent-by-design",
    title: "Talent by Design",
    category: "MERN Stack",
    description:
      "Organizational change and POD-360 narrative for leadership and transformation programs.",
    tags: ["Consulting", "MERN", "CMS"],
    href: "https://talent-by-design.vercel.app/",
  },
  {
    id: "gammaflow-capital",
    title: "GammaFlow Capital",
    category: "MERN Stack",
    description:
      "Finance and capital positioning with trust-first layouts and data clarity.",
    tags: ["Finance", "Dashboard", "APIs"],
    href: "https://www.gammaflowcapital.com/",
  },
  {
    id: "cafeholic",
    title: "Cafeholic",
    category: "MERN Stack",
    description:
      "College cafeteria menu and ordering — fast paths for hungry students.",
    tags: ["Ordering", "MERN", "UX"],
    href: "https://cafe-holic-alpha.vercel.app/",
  },
  {
    id: "skillswap-hub",
    title: "SkillSwap Hub",
    category: "MERN Stack",
    description:
      "Skill exchange platform connecting learners and mentors with frictionless profiles.",
    tags: ["Community", "Auth", "MongoDB"],
    href: "https://skill-swap-frontend-gray.vercel.app/",
  },
  {
    id: "pure-femm",
    title: "Pure Femm",
    category: "Shopify",
    description:
      "Custom Shopify storefront with editorial product storytelling.",
    tags: ["Shopify", "Liquid", "Brand"],
    href: "https://purefemm.com/",
  },
  {
    id: "deluxy",
    title: "Deluxy",
    category: "Shopify",
    description:
      "Modern Shopify e-commerce with premium visuals and conversion-focused UX.",
    tags: ["Shopify", "UI", "Performance"],
    href: "https://deluxy.it/",
  },
  {
    id: "gomi-design",
    title: "Gomi Design",
    category: "Shopify",
    description:
      "Product-focused Shopify experience with gallery-led merchandising.",
    tags: ["Shopify", "Product", "Motion"],
    href: "https://gomi.design/",
  },
  {
    id: "lighting-n-beyond",
    title: "Lighting N Beyond",
    category: "Shopify",
    description:
      "Lighting and home-decor Shopify store with category clarity and rich imagery.",
    tags: ["Shopify", "Catalog", "SEO"],
    href: "https://lightingnbeyond.com/",
  },
  {
    id: "gearhub-eu",
    title: "GearHub EU",
    category: "Shopify",
    description:
      "European-facing Shopify shop with localization and shipping clarity.",
    tags: ["Shopify", "EU", "Checkout"],
    href: "https://www.gearhub.eu/en-nl",
  },
  {
    id: "trafficwerk",
    title: "Trafficwerk",
    category: "WordPress & WooCommerce",
    description:
      "Performance marketing WordPress site with bold landing narratives.",
    tags: ["WordPress", "Marketing", "Speed"],
    href: "https://temp.trafficwerk.de/",
  },
  {
    id: "influential-consultant",
    title: "The Influential Consultant",
    category: "WordPress & WooCommerce",
    description:
      "Consulting and coaching WordPress presence with authority-led copy.",
    tags: ["WordPress", "Coaching", "CMS"],
    href: "https://theinfluentialconsultant.co.uk/",
  },
  {
    id: "vivekananda-hospital",
    title: "Vivekananda Hospital",
    category: "WordPress & WooCommerce",
    description:
      "Hospital services WordPress site — clear departments and patient paths.",
    tags: ["Healthcare", "WordPress", "Accessibility"],
    href: "https://vivekanandahospital.in/",
  },
  {
    id: "honeycroft",
    title: "Honeycroft",
    category: "WordPress & WooCommerce",
    description:
      "Care and community services site with warm, trustworthy tone.",
    tags: ["Community", "WordPress", "Care"],
    href: "https://honeycroft.com.au/",
  },
  {
    id: "lyka-furniture",
    title: "Lyka Furniture",
    category: "WordPress & WooCommerce",
    description:
      "WooCommerce furniture catalog with dimensional specs and room inspiration.",
    tags: ["WooCommerce", "Catalog", "Interior"],
    href: "https://lykafurniture.com/",
  },
  {
    id: "zendra-hr",
    title: "Zendra HR",
    category: "WordPress & WooCommerce",
    description:
      "HR and people solutions site with service tiers and lead capture.",
    tags: ["WordPress", "HR", "Lead Gen"],
    href: "https://zendrahr.com.au/",
  },
  {
    id: "brockerhoff-llc",
    title: "Brockerhoff LLC",
    category: "WordPress & WooCommerce",
    description:
      "Professional WordPress site with crisp typography and firm credibility.",
    tags: ["WordPress", "Corporate", "Brand"],
    href: "https://brockerhoffllc.com/",
  },
  {
    id: "chill-bar-delivery",
    title: "Chill Bar Delivery",
    category: "WordPress & WooCommerce",
    description:
      "WooCommerce ordering for delivery — menu-first flows and upsells.",
    tags: ["WooCommerce", "Food", "Checkout"],
    href: "https://chillbardelivery.com/",
  },
];
