import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Videos — My Portfolio",
  description:
    "AI-generated promos, reels, and explainer videos produced for clients.",
};

export default function AiVideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
