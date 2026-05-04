"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  return (
    <section
      ref={ref}
      id="about"
      className="relative z-10 scroll-mt-20 border-y border-zinc-200/90 bg-zinc-100 px-4 py-20 text-zinc-900 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="relative font-mono text-xs font-medium uppercase tracking-[0.4em] text-violet-600">
          About
        </p>

        <div className="relative mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start lg:gap-16 xl:grid-cols-[minmax(0,380px)_1fr]">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-200 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] ring-1 ring-zinc-900/5">
              <Image
                src="/about/portrait.png"
                alt="Aarushi Krishna"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 380px"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: reduced ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 space-y-6 pt-1 lg:pt-2"
          >
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              I&apos;m a Software Developer
            </h2>

            <div className="space-y-5 text-base leading-relaxed text-slate-600 md:text-lg md:leading-relaxed">
              <p>
                Hi, I&apos;m Aarushi, a software developer who enjoys turning ideas
                into clean, interactive, and slightly addictive web experiences.
              </p>
              <p>
                I&apos;ve worked across both fast-paced startups and large-scale MNC
                environments, which has helped me learn how to move quickly while
                still building systems that are reliable and scalable. From crafting
                smooth and responsive frontends to working with modern full-stack
                technologies, I enjoy solving real-world problems with thoughtful and
                efficient code. I focus on creating applications that are not just
                functional, but also intuitive and enjoyable to use.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m usually watching films, reading
                something interesting, or thinking about small UI details that most
                people might overlook, but I believe make all the difference.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
