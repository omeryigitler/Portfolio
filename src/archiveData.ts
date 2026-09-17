export type ArchiveCategory = 'sites' | 'commerce' | 'apps' | 'tools' | 'experiments';

export interface ArchiveProject {
  repo: string;
  title: string;
  category: ArchiveCategory;
  siteUrl?: string;
  githubUrl?: string;
}

export const ARCHIVE_FILTERS: { value: 'all' | ArchiveCategory; label: string }[] = [
  { value: 'all', label: 'ALL' },
  { value: 'sites', label: 'SITES' },
  { value: 'commerce', label: 'COMMERCE' },
  { value: 'apps', label: 'APPS' },
  { value: 'tools', label: 'TOOLS' },
  { value: 'experiments', label: 'EXPERIMENTS' },
];

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  { repo: 'reformerpilatesmalta.com', title: 'Reformer Pilates Malta', category: 'sites', siteUrl: 'https://reformerpilatesmalta.com' },
  { repo: 'omeryigitler.com', title: 'Ömer Yiğitler.com', category: 'sites', siteUrl: 'https://omeryigitler.com', githubUrl: 'https://github.com/omeryigitler/omeryigitler.com' },
  { repo: 'bugunneyiyelim.com', title: 'Bugün Ne Yiyelim', category: 'apps', siteUrl: 'https://bugunneyiyelim.com' },
  { repo: 'ramazanda-malta.omeryigitler.com', title: 'Ramazanda Malta', category: 'apps', siteUrl: 'https://ramazanda-malta.omeryigitler.com' },
  { repo: 'atelier-couture-belgium', title: 'Atelier Couture Belgium', category: 'sites' },
  { repo: 'dawlstudio.com', title: 'Dawl Studio', category: 'sites', siteUrl: 'https://dawlstudio.com' },
  { repo: 'builtwithseyhan.com', title: 'Built With Seyhan', category: 'sites', siteUrl: 'https://builtwithseyhan.com' },
  { repo: 'yasemin-ozgan', title: 'Elena Moreau', category: 'sites', siteUrl: 'https://elena-real-estate.vercel.app' },
  { repo: 'verdant-nyc---four-seasons-landscapes', title: 'Verdant NYC — Four Seasons Landscapes', category: 'sites' },
  { repo: 'the-maltese-bean', title: 'The Maltese Bean', category: 'sites' },
  { repo: 'module-page-v1', title: 'Module Page V1', category: 'tools' },
  { repo: 'core-engine-admin-panel', title: 'Core Engine Admin Panel', category: 'tools' },
  { repo: 'parfum', title: 'Parfum', category: 'commerce', siteUrl: 'https://parfum-eta.vercel.app' },
  { repo: 'mybabyshire.com', title: 'MyBabyShire', category: 'commerce', siteUrl: 'https://mybabyshire.com' },
  { repo: 'full-stack', title: 'Full Stack', category: 'tools' },
  { repo: 'finance-agent-browser', title: 'Finance Agent Browser', category: 'tools' },
  { repo: 'olinkbu.com', title: 'Olinkbu', category: 'apps', siteUrl: 'https://olinkbu.com' },
  { repo: 'date.omeryigitler.com', title: 'Date', category: 'apps', siteUrl: 'https://date.omeryigitler.com' },
  { repo: 'GymApp', title: 'Gym App', category: 'apps' },
  { repo: 'berfinakbas.com', title: 'Berfin Akbaş', category: 'sites', siteUrl: 'https://berfinakbas-com.vercel.app', githubUrl: 'https://github.com/omeryigitler/berfinakbas.com' },
  { repo: 'nailstudio', title: 'Nail Studio', category: 'commerce', siteUrl: 'https://nailstudio-gamma.vercel.app' },
  { repo: 'Dashboard', title: 'Dashboard', category: 'tools', githubUrl: 'https://github.com/omeryigitler/Dashboard' },
  { repo: 'kedi', title: 'Kedi', category: 'experiments', githubUrl: 'https://github.com/omeryigitler/kedi' },
  { repo: 'cafe', title: 'Cafe', category: 'commerce', githubUrl: 'https://github.com/omeryigitler/cafe' },
  { repo: 'xxl-cafe-o-co.', title: 'XXL Cafe & Co.', category: 'commerce', siteUrl: 'https://xxl-cafe-o-co.vercel.app', githubUrl: 'https://github.com/omeryigitler/xxl-cafe-o-co.' },
  { repo: 'startpage', title: 'Startpage', category: 'sites', githubUrl: 'https://github.com/omeryigitler/startpage' },
  { repo: 'Japanese-Bakery', title: 'Japanese Bakery', category: 'commerce', siteUrl: 'https://japanese-bakery.vercel.app', githubUrl: 'https://github.com/omeryigitler/Japanese-Bakery' },
  { repo: 'Architecture-eCommerce-3D', title: 'Architecture eCommerce 3D', category: 'commerce', siteUrl: 'https://architecture-e-commerce-3d.vercel.app', githubUrl: 'https://github.com/omeryigitler/Architecture-eCommerce-3D' },
  { repo: '-Property-Management', title: 'Property Management', category: 'apps', githubUrl: 'https://github.com/omeryigitler/-Property-Management' },
  { repo: 'mybabyshire-archive', title: 'MyBabyShire Archive', category: 'commerce', siteUrl: 'https://mybabyshire-archive.vercel.app' },
  { repo: 'reformer', title: 'Reformer', category: 'commerce', siteUrl: 'https://reformer-beta.vercel.app', githubUrl: 'https://github.com/omeryigitler/reformer' },
  { repo: 'muhasebe', title: 'Muhasebe', category: 'apps', githubUrl: 'https://github.com/omeryigitler/muhasebe' },
  { repo: 'Portfolio', title: 'Portfolio', category: 'sites', githubUrl: 'https://github.com/omeryigitler/Portfolio' },
];

export const ARCHIVE_COUNT = ARCHIVE_PROJECTS.length;
