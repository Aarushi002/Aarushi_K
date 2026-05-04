import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — My Portfolio",
  description:
    "Selected work — MERN, Shopify, WordPress, and interactive UI engineering.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
