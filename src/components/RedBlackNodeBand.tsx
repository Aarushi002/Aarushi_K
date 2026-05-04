import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SITE = "https://www.redblacknode.com/";

export function RedBlackNodeBand() {
  return (
    <section
      id="redblacknode"
      className="redblacknode-band relative z-10 scroll-mt-20 border-t border-red-950/40 bg-black px-4 py-14 md:px-10 md:py-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16">
        <div className="relative w-full max-w-[min(100%,280px)] shrink-0 md:max-w-[320px]">
          <Image
            src="/branding/redblacknode-logo.png"
            alt="RedBlackNode — digital product and development studio"
            width={1024}
            height={1024}
            className="h-auto w-full object-contain"
            sizes="(max-width: 768px) 280px, 320px"
            priority={false}
          />
        </div>

        <div className="min-w-0 flex-1 text-center text-[#FF1F1F] md:max-w-2xl md:text-left [&_a]:text-[#FF1F1F] [&_a:hover]:text-[#FF1F1F] [&_a:visited]:text-[#FF1F1F]">
          <h2 className="sr-only">RedBlackNode</h2>
          <p
            className="text-base leading-relaxed !text-[#FF1F1F] md:text-lg md:leading-relaxed lg:text-xl"
            style={{ color: "#ff1f1f", WebkitTextFillColor: "#ff1f1f" }}
          >
            RedBlackNode is my sole proprietorship where we provide end-to-end tech
            solutions — from development to deployment. We work with startups and
            businesses to build reliable, scalable, and impactful digital products.
          </p>
          <Link
            href={SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-orbit group mt-8 inline-flex items-center gap-2 border-2 border-[#FF1F1F] bg-transparent px-8 py-4 font-mono text-sm font-bold !text-[#FF1F1F] tracking-wide transition hover:bg-[#FF1F1F]/15 hover:!text-[#FF1F1F] md:mt-10"
            style={{ color: "#ff1f1f", WebkitTextFillColor: "#ff1f1f" }}
          >
            Explore our website
            <ArrowUpRight
              className="h-5 w-5 shrink-0 !text-[#FF1F1F] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 [&_path]:stroke-[#FF1F1F]"
              style={{ color: "#ff1f1f", stroke: "#ff1f1f" }}
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
