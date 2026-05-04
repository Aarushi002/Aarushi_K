import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  kicker: string;
  title: ReactNode;
  description?: string;
  invert?: boolean;
  className?: string;
};

export function SectionHeader({
  kicker,
  title,
  description,
  invert = false,
  className,
}: Props) {
  return (
    <div className={cn("relative mb-12 md:mb-16", className)}>
      <p
        className={`relative font-mono text-xs font-medium uppercase tracking-[0.4em] ${invert ? "text-muted" : "text-accent"}`}
      >
        {kicker}
      </p>
      <h2
        className={`relative mt-4 max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl ${invert ? "text-foreground" : "text-foreground"}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`relative mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${invert ? "text-muted" : "text-muted"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
