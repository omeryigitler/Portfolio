export const DEFAULT_BG = "https://images.unsplash.com/photo-1607499699365-d053229b48f9?q=80&w=2564&auto=format&fit=crop"; // neutral paper / material
export const PROJECT_1_BG = "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2564&auto=format&fit=crop"; // white architectural lines
export const PROJECT_2_BG = "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2564&auto=format&fit=crop"; // soft material field
export const PROJECT_3_BG = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"; // glass / dark material
export const PROJECT_4_BG = "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2564&auto=format&fit=crop"; // macro material

export const ALL_BACKGROUNDS = [
  DEFAULT_BG,
  PROJECT_1_BG,
  PROJECT_2_BG,
  PROJECT_3_BG,
  PROJECT_4_BG,
];

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  bgImage: string;
}

// Temporary project records. These are intentionally isolated here so the
// real portfolio screenshots/videos can replace them without changing scene logic.
export const PROJECTS: ProjectData[] = [
  {
    id: "proj-1",
    number: "01",
    title: "DIGITAL OBJECT",
    category: "INDUSTRIAL / ART",
    year: "2026",
    image: PROJECT_1_BG,
    bgImage: PROJECT_1_BG,
  },
  {
    id: "proj-2",
    number: "02",
    title: "EDITORIAL SYSTEM",
    category: "IDENTITY / PRINT",
    year: "2026",
    image: PROJECT_2_BG,
    bgImage: PROJECT_2_BG,
  },
  {
    id: "proj-3",
    number: "03",
    title: "CINEMATIC INTERFACE",
    category: "INTERACTION",
    year: "2025",
    image: PROJECT_3_BG,
    bgImage: PROJECT_3_BG,
  },
  {
    id: "proj-4",
    number: "04",
    title: "MOTION LAB",
    category: "EXPERIMENT",
    year: "2025",
    image: PROJECT_4_BG,
    bgImage: PROJECT_4_BG,
  },
];
