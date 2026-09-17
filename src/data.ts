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

// Main-page selected work. This list is intentionally curated for visual rhythm;
// the complete project archive continues to live in archiveData.ts.
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
    id: "built-with-seyhan",
    number: "02",
    title: "BUILT WITH SEYHAN",
    category: "FITNESS / PLATFORM",
    year: "2026",
    bgImage: DEFAULT_BG,
    coverImage: "/project-previews/builtwithseyhan-com.png",
    ambientColor: "#D5D8CF",
    url: "https://builtwithseyhan.com",
  },
  {
    id: "mybabyshire",
    number: "03",
    title: "MYBABYSHIRE",
    category: "COMMERCE / BRAND",
    year: "2026",
    bgImage: DEFAULT_BG,
    coverImage: "https://mybabyshire-archive.vercel.app/toy-teddy-ring-teether.png",
    ambientColor: "#E8D9CB",
    url: "https://mybabyshire-archive.vercel.app",
  },
  {
    id: "architecture-3d",
    number: "04",
    title: "ARCHITECTURE 3D",
    category: "3D / E-COMMERCE",
    year: "2026",
    bgImage: DEFAULT_BG,
    coverImage: "https://raw.githubusercontent.com/omeryigitler/Architecture-eCommerce-3D/main/public/new-gunduz-day%20%281%29.png",
    ambientColor: "#D7DBCF",
    url: "https://architecture-e-commerce-3d.vercel.app",
  },
  {
    id: "elena-moreau",
    number: "05",
    title: "ELENA MOREAU",
    category: "LUXURY / REAL ESTATE",
    year: "2026",
    bgImage: DEFAULT_BG,
    coverImage: "/project-previews/yasemin-ozgan.png",
    ambientColor: "#D8D2C6",
    url: "https://elena-real-estate.vercel.app",
  },
  {
    id: "parfum",
    number: "06",
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
];
