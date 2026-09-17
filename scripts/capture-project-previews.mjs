import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ARCHIVE_FILE = path.resolve('src/archiveData.ts');
const OUTPUT_DIR = path.resolve('public/project-previews');

const EXTRA_DELAY = {
  'reformerpilatesmalta.com': 4500,
  'bugunneyiyelim.com': 6500,
  'mybabyshire.com': 6500,
  'xxl-cafe-o-co.': 7000,
  'Japanese-Bakery': 7000,
  'dawlstudio.com': 7000,
  'builtwithseyhan.com': 6500,
  'yasemin-ozgan': 7000,
  'muhasebe': 5000,
  'mybabyshire-archive': 7500,
  'verdant-nyc---four-seasons-landscapes': 11000,
  'parfum': 6500,
  'the-maltese-bean': 6500,
  'cafe': 7000,
  'Architecture-eCommerce-3D': 8500,
  'nailstudio': 6000,
  'module-page-v1': 5000,
  'core-engine-admin-panel': 5000,
  'olinkbu.com': 5000,
  'date.omeryigitler.com': 5000,
  'berfinakbas.com': 6500,
  'Dashboard': 5000,
  'startpage': 5000,
  'ramazanda-malta.omeryigitler.com': 5000,
  'atelier-couture-belgium': 6500,
};

const safeName = (repo) =>
  repo
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const parseLiveProjects = (source) => {
  const objects = source.match(/\{\n[\s\S]*?\n  \},/g) ?? [];

  return objects
    .map((block) => {
      const repo = block.match(/repo:\s*'([^']+)'/)?.[1];
      const siteUrl = block.match(/siteUrl:\s*'([^']+)'/)?.[1];
      if (!repo || !siteUrl) return null;
      return { repo, siteUrl };
    })
    .filter(Boolean);
};

const looksProtected = async (page) => {
  const url = page.url().toLowerCase();
  if (url.includes('vercel.com/login') || url.includes('vercel.com/signup')) return true;

  const text = await page.locator('body').innerText({ timeout: 3000 }).catch(() => '');
  return /log in to vercel|continue with github|continue with google/i.test(text);
};

const settlePage = async (page, delay) => {
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(delay);

  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    const noisy = document.querySelectorAll(
      '[data-vercel-toolbar], vercel-live-feedback, #vercel-live-feedback',
    );
    noisy.forEach((element) => element.remove());
  });

  await page.waitForTimeout(350);
};

const capture = async (browser, project) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'reduce',
    locale: 'en-US',
  });

  const page = await context.newPage();
  page.setDefaultTimeout(15000);

  try {
    console.log(`\n→ ${project.repo}\n  ${project.siteUrl}`);
    await page.goto(project.siteUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 45000,
    });

    await settlePage(page, EXTRA_DELAY[project.repo] ?? 6000);

    if (await looksProtected(page)) {
      console.warn('  skipped: protected Vercel/login page');
      return false;
    }

    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      text: document.body.innerText.trim().length,
    }));

    if (dimensions.text < 8 && dimensions.height <= 950) {
      console.warn('  skipped: page appears blank');
      return false;
    }

    const output = path.join(OUTPUT_DIR, `${safeName(project.repo)}.png`);
    await page.screenshot({
      path: output,
      fullPage: false,
      animations: 'disabled',
      caret: 'hide',
      type: 'png',
    });

    console.log(`  saved: ${path.relative(process.cwd(), output)}`);
    return true;
  } catch (error) {
    console.warn(`  failed: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  } finally {
    await context.close();
  }
};

const main = async () => {
  const source = await fs.readFile(ARCHIVE_FILE, 'utf8');
  const projects = parseLiveProjects(source);

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  let captured = 0;

  try {
    for (const project of projects) {
      if (await capture(browser, project)) captured += 1;
    }
  } finally {
    await browser.close();
  }

  console.log(`\nCaptured ${captured}/${projects.length} live project previews.`);
};

await main();
