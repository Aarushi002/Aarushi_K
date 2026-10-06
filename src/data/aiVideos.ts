export type AiVideoCategory =
  | "Cleaning & ASMR"
  | "Kids Poems & Stories"
  | "Explainers";

export interface AiVideo {
  id: string;
  title: string;
  category: AiVideoCategory;
  /** Optional client / brand name shown above the title. */
  client?: string;
  description: string;
  tags: string[];
  /** Self-hosted file, e.g. "/ai-videos/brand-promo.mp4" (place it in public/ai-videos/). */
  src?: string;
  /** Embed URL for hosted videos, e.g. "https://www.youtube.com/embed/VIDEO_ID" or "https://player.vimeo.com/video/VIDEO_ID". */
  embedUrl?: string;
  /** Optional thumbnail, e.g. "/ai-videos/brand-promo.jpg". */
  poster?: string;
  /** Video shape — defaults to "portrait" (9:16 reels). Use "landscape" for 16:9. */
  orientation?: "landscape" | "portrait";
}

export const aiVideoCategories: AiVideoCategory[] = [
  "Cleaning & ASMR",
  "Kids Poems & Stories",
  "Explainers",
];

export const aiVideos: AiVideo[] = [
  // Cleaning & ASMR
  {
    id: "grime-ceiling-fan",
    title: "10 Years of Grime on One Ceiling Fan",
    category: "Cleaning & ASMR",
    description: "Satisfying before-and-after cleaning reel of a neglected ceiling fan.",
    tags: ["Short", "ASMR", "Cleaning"],
    src: "/ai-videos/10 YEARS of Grime on ONE Ceiling Fan.mp4",
  },
  {
    id: "dirt-hiding-one-room",
    title: "All This Dirt Was Hiding in One Room",
    category: "Cleaning & ASMR",
    description: "A single room taken from hidden grime to spotless in under a minute.",
    tags: ["Short", "ASMR", "Cleaning"],
    src: "/ai-videos/ALL This Dirt Was Hiding in ONE Room.mp4",
  },
  {
    id: "burnt-pan-spotless",
    title: "Burnt Pan to Spotless",
    category: "Cleaning & ASMR",
    description: "Satisfying cleaning ASMR restoring a scorched pan.",
    tags: ["Short", "ASMR", "Kitchen"],
    src: "/ai-videos/Burnt Pan to SPOTLESS Satisfying Cleaning ASMR.mp4",
  },
  {
    id: "places-everyone-forgets",
    title: "Cleaning the Places Everyone Forgets",
    category: "Cleaning & ASMR",
    description: "Deep-cleaning the overlooked corners of the home.",
    tags: ["Short", "Cleaning", "Tips"],
    src: "/ai-videos/Cleaning the Places Everyone FORGETS.mp4",
  },
  {
    id: "extreme-deep-clean",
    title: "Extreme Deep Clean: Filthy to Spotless",
    category: "Cleaning & ASMR",
    description: "High-impact deep-clean transformation with ASMR sound design.",
    tags: ["Short", "ASMR", "Transformation"],
    src: "/ai-videos/Extreme Deep Clean ASMR FILTHY to SPOTLESS!.mp4",
  },
  {
    id: "patio-power-wash",
    title: "Filthy Patio to Spotless Power Wash",
    category: "Cleaning & ASMR",
    description: "Satisfying power-wash reveal of an outdoor patio.",
    tags: ["Short", "Power Wash", "Outdoor"],
    src: "/ai-videos/FILTHY Patio to SPOTLESS Satisfying Power Wash.mp4",
  },
  {
    id: "floor-was-black",
    title: "I Thought This Floor Was Black… Until I Cleaned It",
    category: "Cleaning & ASMR",
    description: "Hook-driven floor-cleaning reveal built for short-form retention.",
    tags: ["Short", "Reveal", "Cleaning"],
    src: "/ai-videos/AIcleaning.mp4",
  },
  {
    id: "kitchen-cleaning",
    title: "Kitchen Cleaning",
    category: "Cleaning & ASMR",
    description: "Kitchen deep-clean reel with satisfying close-ups.",
    tags: ["Short", "Kitchen", "Cleaning"],
    src: "/ai-videos/KitchenCleaning.mp4",
  },
  {
    id: "bathroom-months",
    title: "This Bathroom Hasn't Been Cleaned in Months",
    category: "Cleaning & ASMR",
    description: "Bathroom rescue from neglected to sparkling.",
    tags: ["Short", "Bathroom", "Transformation"],
    src: "/ai-videos/This Bathroom Hasn’t Been Cleaned in MONTHS.mp4",
  },

  // Kids Poems & Stories
  {
    id: "dragon-poem",
    title: "Dragon Poem",
    category: "Kids Poems & Stories",
    description: "Animated children's poem about a dragon.",
    tags: ["Kids", "Poem", "Animation"],
    src: "/ai-videos/Dragon-Poem.mp4",
  },
  {
    id: "ducks-song",
    title: "Ducks Song",
    category: "Kids Poems & Stories",
    description: "Sing-along kids' song featuring ducks.",
    tags: ["Kids", "Song", "Animation"],
    src: "/ai-videos/DucksSong.mp4",
  },
  {
    id: "rabbit-poem",
    title: "Rabbit Poem",
    category: "Kids Poems & Stories",
    description: "Short animated children's poem about a rabbit.",
    tags: ["Kids", "Poem", "Animation"],
    src: "/ai-videos/Rabbit-Poem.mp4",
  },
  {
    id: "nani-mangoes",
    title: "Nani & the Mangoes",
    category: "Kids Poems & Stories",
    description: "Animated kids' story about Nani and mangoes.",
    tags: ["Kids", "Story", "Animation"],
    src: "/ai-videos/NaniMangoes.mp4",
  },
  {
    id: "kids-story",
    title: "Kids Story",
    category: "Kids Poems & Stories",
    description: "Animated storytelling video for young viewers.",
    tags: ["Kids", "Story", "Animation"],
    src: "/ai-videos/Kids.mp4",
  },
  {
    id: "kids-poem-1",
    title: "Kids Poem I",
    category: "Kids Poems & Stories",
    description: "Animated nursery-style poem for children.",
    tags: ["Kids", "Poem", "Animation"],
    src: "/ai-videos/KidPoem.mp4",
  },
  {
    id: "kids-poem-2",
    title: "Kids Poem II",
    category: "Kids Poems & Stories",
    description: "Animated nursery-style poem for children.",
    tags: ["Kids", "Poem", "Animation"],
    src: "/ai-videos/Kids-Poem.mp4",
  },
  {
    id: "kids-poem-3",
    title: "Kids Poem III",
    category: "Kids Poems & Stories",
    description: "Animated nursery-style poem for children.",
    tags: ["Kids", "Poem", "Animation"],
    src: "/ai-videos/KidsPoem.mp4",
  },

  // Explainers
  {
    id: "health-ai",
    title: "Health AI",
    category: "Explainers",
    description: "AI-produced health explainer reel.",
    tags: ["Health", "Explainer", "Short"],
    src: "/ai-videos/healthAI.mp4",
  },

  // Not listed: "`I Deep Cleaned an ENTIRE Filthy House ASMR.mp4" (160 MB, 16 min, 16:9)
  // exceeds GitHub's 100 MB file limit — host it on YouTube and add it with `embedUrl`
  // and orientation: "landscape".
];
