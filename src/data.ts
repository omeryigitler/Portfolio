export const DEFAULT_BG = "https://images.unsplash.com/photo-1607499699365-d053229b48f9?q=80&w=2564&auto=format&fit=crop";

export const ALL_BACKGROUNDS = [DEFAULT_BG];

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  bgImage: string;
  url: string;
}

const screenshot = (domain: string) => `https://screenshotof.com/${domain}?s=2048`;

// The portfolio UI stays neutral; project colour lives only inside the media frame.
// Screenshots are generated from the live deployments so the work stays visually current.
export const PROJECTS: ProjectData[] = [
  {
    id: "japanese-bakery",
    number: "01",
    title: "JAPANESE BAKERY",
    category: "COMMERCE / EDITORIAL",
    year: "2026",
    image: screenshot("japanese-bakery.vercel.app"),
    bgImage: DEFAULT_BG,
    url: "https://japanese-bakery.vercel.app",
  },
  {
    id: "architecture-3d",
    number: "02",
    title: "ARCHITECTURE 3D",
    category: "3D / E-COMMERCE",
    year: "2026",
    image: screenshot("architecture-e-commerce-3d.vercel.app"),
    bgImage: DEFAULT_BG,
    url: "https://architecture-e-commerce-3d.vercel.app",
  },
  {
    id: "berfin-akbas",
    number: "03",
    title: "BERFIN AKBAŞ",
    category: "PORTFOLIO / IDENTITY",
    year: "2026",
    image: screenshot("berfinakbas-com.vercel.app"),
    bgImage: DEFAULT_BG,
    url: "https://berfinakbas-com.vercel.app",
  },
  {
    id: "reformer",
    number: "04",
    title: "REFORMER",
    category: "WELLNESS / BOOKING",
    year: "2026",
    image: screenshot("reformer-beta.vercel.app"),
    bgImage: DEFAULT_BG,
    url: "https://reformer-beta.vercel.app",
  },
  {
    id: "parfum",
    number: "05",
    title: "PARFUM",
    category: "BEAUTY / COMMERCE",
    year: "2026",
    image: screenshot("parfum-eta.vercel.app"),
    bgImage: DEFAULT_BG,
    url: "https://parfum-eta.vercel.app",
  },
  {
    id: "nail-studio",
    number: "06",
    title: "NAIL STUDIO",
    category: "BEAUTY / BRAND",
    year: "2026",
    image: screenshot("nailstudio-gamma.vercel.app"),
    bgImage: DEFAULT_BG,
    url: "https://nailstudio-gamma.vercel.app",
  },
  {
    id: "xxl-cafe",
    number: "07",
    title: "XXL CAFE & CO.",
    category: "HOSPITALITY / COMMERCE",
    year: "2026",
    image: screenshot("xxl-cafe-o-co.vercel.app"),
    bgImage: DEFAULT_BG,
    url: "https://xxl-cafe-o-co.vercel.app",
  },
];
