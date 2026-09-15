export const DEFAULT_BG = "https://images.unsplash.com/photo-1607499699365-d053229b48f9?q=80&w=2564&auto=format&fit=crop";
export const DEFAULT_AMBIENT = "#D9D9D2";

export const ALL_BACKGROUNDS = [DEFAULT_BG];

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  bgImage: string;
  coverImage: string;
  coverFallback?: string;
  coverFit?: "cover" | "contain";
  ambientColor: string;
  url: string;
}

// Real portfolio projects. The white editorial sheet stays consistent, while
// the outer layer picks up a restrained tint from each project's visual world.
// Index covers are static project media; the live site only loads after a project is opened.
export const PROJECTS: ProjectData[] = [
  {
    id: "japanese-bakery",
    number: "01",
    title: "JAPANESE BAKERY",
    category: "COMMERCE / EDITORIAL",
    year: "2026",
    bgImage: DEFAULT_BG,
    coverImage: "https://raw.githubusercontent.com/omeryigitler/Japanese-Bakery/main/public/hero.png",
    ambientColor: "#D6E6EA",
    url: "https://japanese-bakery.vercel.app",
  },
  {
    id: "architecture-3d",
    number: "02",
    title: "ARCHITECTURE 3D",
    category: "3D / E-COMMERCE",
    year: "2026",
    bgImage: DEFAULT_BG,
    coverImage: "https://raw.githubusercontent.com/omeryigitler/Architecture-eCommerce-3D/main/public/new-gunduz-day%20%281%29.png",
    ambientColor: "#DED8CB",
    url: "https://architecture-e-commerce-3d.vercel.app",
  },
  {
    id: "berfin-akbas",
    number: "03",
    title: "BERFIN AKBAŞ",
    category: "PORTFOLIO / IDENTITY",
    year: "2026",
    bgImage: DEFAULT_BG,
    coverImage: "https://raw.githubusercontent.com/omeryigitler/berfinakbas.com/main/public/berfin-hero-full-1%20%281%29.png",
    ambientColor: "#E2D5D3",
    url: "https://berfinakbas-com.vercel.app",
  },
  {
    id: "reformer",
    number: "04",
    title: "REFORMER",
    category: "WELLNESS / BOOKING",
    year: "2026",
    bgImage: DEFAULT_BG,
    coverImage: "https://raw.githubusercontent.com/omeryigitler/reformer/main/public/premium/studio_reveal_1788398858603.jpg",
    ambientColor: "#D8E1D4",
    url: "https://reformer-beta.vercel.app",
  },
  {
    id: "parfum",
    number: "05",
    title: "PARFUM",
    category: "BEAUTY / COMMERCE",
    year: "2026",
    bgImage: DEFAULT_BG,
    coverImage: "https://parfum-eta.vercel.app/bottle-tiny.webp",
    coverFallback: "https://raw.githubusercontent.com/omeryigitler/parfum/main/public/bottle-tiny.webp",
    coverFit: "contain",
    ambientColor: "#E4D6DC",
    url: "https://parfum-eta.vercel.app",
  },
  {
    id: "nail-studio",
    number: "06",
    title: "NAIL STUDIO",
    category: "BEAUTY / BRAND",
    year: "2026",
    bgImage: DEFAULT_BG,
    coverImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=82&auto=format&fit=crop",
    coverFallback: "https://raw.githubusercontent.com/omeryigitler/nailstudio/main/src/assets/images/vertical_salon_1782782037818.jpg",
    ambientColor: "#E1D5E4",
    url: "https://nailstudio-gamma.vercel.app",
  },
  {
    id: "xxl-cafe",
    number: "07",
    title: "XXL CAFE & CO.",
    category: "HOSPITALITY / COMMERCE",
    year: "2026",
    bgImage: DEFAULT_BG,
    coverImage: "https://raw.githubusercontent.com/omeryigitler/xxl-cafe-o-co./main/src/assets/images/omerly_iced_coffee_1784775254141.jpg",
    ambientColor: "#E2D5C5",
    url: "https://xxl-cafe-o-co.vercel.app",
  },
];
