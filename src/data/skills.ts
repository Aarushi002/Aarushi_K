import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Braces,
  Code2,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  Layers,
  Layout,
  Palette,
  Server,
  ShoppingBag,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";

export type SkillGroupId =
  | "tech-stack"
  | "languages"
  | "tools"
  | "concepts"
  | "styling"
  | "exploring";

export interface SkillItem {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface SkillGroup {
  id: SkillGroupId;
  label: string;
  skills: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "tech-stack",
    label: "Tech Stack",
    skills: [
      {
        name: "React.js",
        description: "Component-driven UIs with hooks, suspense, and polish.",
        icon: Layout,
      },
      {
        name: "Node.js",
        description: "Runtime for scalable services and tooling.",
        icon: Server,
      },
      {
        name: "Express.js",
        description: "Lean APIs and middleware for production backends.",
        icon: Workflow,
      },
      {
        name: "MongoDB",
        description: "Document data modeling and performant queries.",
        icon: Database,
      },
      {
        name: "JavaScript",
        description: "The language that powers the modern web stack.",
        icon: Braces,
      },
      {
        name: "HTML",
        description: "Semantic structure and accessible foundations.",
        icon: FileCode2,
      },
      {
        name: "CSS",
        description: "Layout, motion, and visual storytelling in the browser.",
        icon: Palette,
      },
    ],
  },
  {
    id: "languages",
    label: "Programming Languages",
    skills: [
      {
        name: "JavaScript",
        description: "Async flows, ES modules, and full-stack fluency.",
        icon: Braces,
      },
      {
        name: "Java",
        description: "OOP patterns and JVM ecosystem experience.",
        icon: Cpu,
      },
      {
        name: "Python",
        description: "Scripts, APIs, and data-friendly workflows.",
        icon: Terminal,
      },
      {
        name: "C",
        description: "Low-level thinking and performance-aware code.",
        icon: Code2,
      },
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    skills: [
      {
        name: "Git",
        description: "Branching strategies and clean commit history.",
        icon: GitBranch,
      },
      {
        name: "GitHub",
        description: "Collaboration, reviews, and CI-friendly repos.",
        icon: GitBranch,
      },
      {
        name: "WordPress",
        description: "Custom themes, plugins, and editorial workflows.",
        icon: Globe,
      },
      {
        name: "Shopify",
        description: "Liquid, storefront UX, and conversion-focused builds.",
        icon: ShoppingBag,
      },
      {
        name: "PHP",
        description: "Server-side templates and WordPress deep dives.",
        icon: FileCode2,
      },
    ],
  },
  {
    id: "concepts",
    label: "Core Concepts",
    skills: [
      {
        name: "REST APIs",
        description: "Predictable contracts between clients and services.",
        icon: Boxes,
      },
      {
        name: "API Integration",
        description: "Auth headers, retries, and resilient data fetching.",
        icon: Workflow,
      },
      {
        name: "Authentication",
        description: "Sessions, tokens, and secure user journeys.",
        icon: Sparkles,
      },
      {
        name: "Database Design",
        description: "Schemas, indexing, and maintainable data models.",
        icon: Database,
      },
      {
        name: "Full-Stack Development",
        description: "End-to-end ownership from UI pixels to DB queries.",
        icon: Layers,
      },
    ],
  },
  {
    id: "styling",
    label: "Styling & UI",
    skills: [
      {
        name: "Tailwind CSS",
        description: "Utility-first speed without sacrificing design systems.",
        icon: Palette,
      },
      {
        name: "Bootstrap",
        description: "Rapid layouts with battle-tested components.",
        icon: Layout,
      },
      {
        name: "Responsive Design",
        description: "Fluid grids that feel native on every breakpoint.",
        icon: Globe,
      },
    ],
  },
  {
    id: "exploring",
    label: "Currently Exploring",
    skills: [
      {
        name: "TypeScript",
        description: "Typed React and safer refactors at scale.",
        icon: Code2,
      },
      {
        name: "Next.js",
        description: "App Router, streaming, and edge-ready experiences.",
        icon: Sparkles,
      },
      {
        name: "Advanced Backend Systems",
        description: "Queues, caching layers, and resilient architecture.",
        icon: Server,
      },
    ],
  },
];

export function flattenSkills(filterGroup?: SkillGroupId | "all"): SkillItem[] {
  if (!filterGroup || filterGroup === "all") {
    return skillGroups.flatMap((g) => g.skills);
  }
  return skillGroups.find((g) => g.id === filterGroup)?.skills ?? [];
}
