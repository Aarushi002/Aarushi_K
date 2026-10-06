"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  aiVideoCategories,
  aiVideos,
  type AiVideo,
  type AiVideoCategory,
} from "@/data/aiVideos";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSound } from "@/context/SoundContext";

function hasSource(v: AiVideo) {
  return Boolean(v.src || v.embedUrl);
}

function isPortrait(v: AiVideo) {
  return v.orientation !== "landscape";
}

function categorySectionId(c: AiVideoCategory) {
  return `ai-videos-${c.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase()}`;
}

export function AiVideosShowcase() {
  const [category, setCategory] = useState<AiVideoCategory | "all">("all");
  const [active, setActive] = useState<AiVideo | null>(null);
  const reduced = useReducedMotion();
  const { playTick } = useSound();

  const visibleCategories = aiVideoCategories.filter(
    (c) =>
      (category === "all" || category === c) &&
      aiVideos.some((v) => v.category === c),
  );

  return (
    <section
      id="ai-videos"
      className="relative z-10 scroll-mt-20 px-4 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="AI Videos"
          title="AI-crafted videos for clients"
          description="Promos, reels, and explainers produced with AI video, voice, and avatar tools — tailored to each client's brand."
        />

        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Video categories"
        >
          {(["all", ...aiVideoCategories] as const).map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => {
                playTick();
                setCategory(c);
              }}
              className={cn(
                "focus-orbit px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition",
                category === c
                  ? c === "all"
                    ? "bg-accent-cyan text-base shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                    : "bg-accent text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                  : "border border-white/10 text-muted hover:text-accent-cyan",
              )}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>

        {visibleCategories.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted">
            New videos coming soon.
          </p>
        ) : (
          <div className="mt-14 space-y-14 md:space-y-20">
            {visibleCategories.map((cat) => {
              const sid = categorySectionId(cat);
              const list = aiVideos.filter((v) => v.category === cat);
              return (
                <section
                  key={cat}
                  id={sid}
                  className="scroll-mt-24 rounded-2xl border border-white/10 bg-base p-6 md:p-8"
                  aria-labelledby={`heading-${sid}`}
                >
                  <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                    <h3
                      id={`heading-${sid}`}
                      className="text-xl font-bold tracking-tight text-foreground md:text-2xl"
                    >
                      {cat}
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {list.length} {list.length === 1 ? "video" : "videos"}
                    </span>
                  </div>
                  <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {list.map((v, i) => (
                      <li
                        key={v.id}
                        className={cn(!isPortrait(v) && "col-span-2")}
                      >
                        <VideoCard
                          video={v}
                          index={i}
                          reduced={reduced}
                          onOpen={() => {
                            playTick();
                            setActive(v);
                          }}
                          onHoverSound={playTick}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>

      <VideoModal
        video={active}
        onClose={() => setActive(null)}
        reduced={reduced}
      />
    </section>
  );
}

function VideoCard({
  video,
  index,
  reduced,
  onOpen,
  onHoverSound,
}: {
  video: AiVideo;
  index: number;
  reduced: boolean;
  onOpen: () => void;
  onHoverSound: () => void;
}) {
  const previewRef = useRef<HTMLVideoElement>(null);
  const playable = hasSource(video);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        delay: reduced ? 0 : index * 0.06,
        duration: reduced ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => {
        onHoverSound();
        if (!reduced) void previewRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        const el = previewRef.current;
        if (!el) return;
        el.pause();
        el.currentTime = 0;
      }}
      className="surface-card group flex h-full flex-col border border-white/10 transition-colors hover:border-accent-cyan/50"
    >
      <button
        type="button"
        onClick={onOpen}
        disabled={!playable}
        aria-label={playable ? `Play ${video.title}` : `${video.title} — video coming soon`}
        className={cn(
          "focus-orbit relative block w-full overflow-hidden bg-base disabled:cursor-default",
          isPortrait(video) ? "aspect-[9/16]" : "aspect-video",
        )}
      >
        {video.src ? (
          <video
            ref={previewRef}
            // #t=0.1 makes Safari render the first frame as a thumbnail.
            src={video.poster ? video.src : `${video.src}#t=0.1`}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : video.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.poster}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/25 via-base to-accent-cyan/20">
            <Clapperboard className="h-10 w-10 text-muted" aria-hidden />
          </div>
        )}

        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/10">
          {playable ? (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_24px_rgba(124,58,237,0.5)] transition group-hover:scale-110 group-hover:bg-accent-cyan group-hover:text-base">
              <Play className="ml-0.5 h-6 w-6" fill="currentColor" aria-hidden />
            </span>
          ) : (
            <span className="border border-white/15 bg-base/80 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
              Coming soon
            </span>
          )}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4">
        {video.client ? (
          <p className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            {video.client}
          </p>
        ) : null}
        <h4 className="text-sm font-bold leading-snug text-foreground md:text-base">
          {video.title}
        </h4>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
          {video.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {video.tags.map((t) => (
            <span
              key={t}
              className="border border-white/10 bg-base px-2 py-1 font-mono text-[10px] text-sky"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function VideoModal({
  video,
  onClose,
  reduced,
}: {
  video: AiVideo | null;
  onClose: () => void;
  reduced: boolean;
}) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [video, onClose]);

  const portrait = video ? isPortrait(video) : false;

  return (
    <AnimatePresence>
      {video ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 px-4 py-10 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: reduced ? 1 : 0.96, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={cn(
              "glass-panel glow-ring max-h-[92vh] w-full overflow-y-auto p-4 md:p-6",
              portrait ? "max-w-sm" : "max-w-4xl",
            )}
          >
            <div
              className={cn(
                "overflow-hidden bg-black",
                portrait ? "aspect-[9/16]" : "aspect-video",
              )}
            >
              {video.src ? (
                <video
                  src={video.src}
                  poster={video.poster}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full"
                />
              ) : video.embedUrl ? (
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
                  {video.client ?? video.category}
                </p>
                <h2
                  id="video-modal-title"
                  className="mt-1 text-xl font-bold text-foreground md:text-2xl"
                >
                  {video.title}
                </h2>
              </div>
              <button
                type="button"
                className="focus-orbit border border-white/20 px-4 py-2 text-sm font-semibold text-foreground hover:border-accent-cyan"
                onClick={onClose}
              >
                Close
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {video.description}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
