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
  ambientColor: string;
  url: string;
}

// Real portfolio projects. The white editorial sheet stays consistent, while
// the outer layer picks up a restrained tint from each project's visual world.
export const PROJECTS: ProjectData[] = [
  {
    id: "japanese-bakery",
    number: "01",
    title: "JAPANESE BAKERY",
    category: "COMMERCE / EDITORIAL",
    year: "2026",
    bgImage: DEFAULT_BG,
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
    ambientColor: "#E2D5C5",
    url: "https://xxl-cafe-o-co.vercel.app",
  },
];
