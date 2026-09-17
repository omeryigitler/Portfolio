import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ARCHIVE_FILE = path.resolve('src/archiveData.ts');
const OUTPUT_DIR = path.resolve('public/project-previews');
const WORKERS = 4;

const EXTRA_DELAY = {
  'reformerpilatesmalta.com': 3000,
  'bugunneyiyelim.com': 4500,
  'mybabyshire.com': 4500,
  'xxl-cafe-o-co.': 5000,
  'Japanese-Bakery': 5000,
  'dawlstudio.com': 5000,
  'builtwithseyhan.com': 4500,
  'yasemin-ozgan': 5000,
  'muhasebe': 3200,
  'mybabyshire-archive': 5500,
  'verdant-nyc---four-seasons-landscapes': 7000,
  'parfum': 4500,
  'the-maltese-bean': 4500,
  'cafe': 5000,
  'Architecture-eCommerce-3D': 6000,
  'nailstudio': 4000,
  'module-page-v1': 3500,
  'core-engine-admin-panel': 3500,
  'olinkbu.com': 3500,
  'date.omeryigitler.com': 3500,
  'berfinakbas.com': 4500,
  'Dashboard': 3500,
  'startpage': 3500,
  'ramazanda-malta.omeryigitler.com': 3500,
  'atelier-couture-belgium': 4500,
};

const safeName = (repo) =>
  repo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const parseLiveProjects = (source) => {
  const objects = source.match(/\{\n[\s\S]*?\n  \},/g) ?? [];
  return objects
    .map((block) => {
      const repo = block.match(/repo:\s*'([^']+)'/)?.[1];
      const siteUrl = block.match(/siteUrl:\s*'([^']+)'/)?.[1];
      return repo && siteUrl ? { repo, siteUrl } : null;
    })
    .filter(Boolean);
};

const looksProtected = async (page) => {
  const url = page.url().toLowerCase();
  if (url.includes('vercel.com/login') || url.includes('vercel.com/signup')) return true;
  const text = await page.locator('body').innerText({ timeout: 2000 }).catch(() => '');
  return /log in to vercel|continue with github|continue with google/i.test(text);
};

const settlePage = async (page, delay) => {
  await page.waitForLoadState('networkidle', { timeout: 6000 }).catch(() => {});
  await page.waitForTimeout(delay);

  const loadingState = await page.locator('body').innerText({ timeout: 2000 }).catch(() => '');
  if (/loading|yükleniyor|please wait/i.test(loadingState) && loadingState.trim().length < 260) {
    await page.waitForTimeout(5000);
  }

  await page.evaluate(() => window.scrollTo(0, Math.min(420, document.documentElement.scrollHeight / 4)));
  await page.waitForTimeout(450);
  await page.evaluate(() => window.scrollTo(0, 0));

  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    // The portfolio card already provides the framing. Remove browser-page gutters from
    // the captured asset so the homepage itself can sit edge-to-edge in the card.
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    document
      .querySelectorAll('[data-vercel-toolbar], vercel-live-feedback, #vercel-live-feedback')
      .forEach((element) => element.remove());

    const images = Array.from(document.images).slice(0, 24);
    await Promise.all(
      images.map(
        (image) =>
          new Promise((resolve) => {
            if (image.complete) return resolve();
            const done = () => resolve();
            image.addEventListener('load', done, { once: true });
            image.addEventListener('error', done, { once: true });
            setTimeout(done, 2500);
          }),
      ),
    );
  });

  await page.waitForTimeout(300);
};

const getCaptureClip = async (page) => {
  return page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const candidates = [
      document.querySelector('#root'),
      document.querySelector('#__next'),
      document.querySelector('main'),
      document.body.firstElementChild,
    ].filter(Boolean);

    for (const element of candidates) {
      const rect = element.getBoundingClientRect();
      if (rect.width < viewportWidth * 0.72 || rect.height < 280) continue;

      const x = Math.max(0, rect.left);
      const y = Math.max(0, rect.top);
      const width = Math.min(viewportWidth - x, rect.width);
      const height = Math.min(viewportHeight - y, Math.max(280, rect.height));

      // Only crop genuine outer gutters. Large offsets are usually intentional layout.
      if (x <= 80 && y <= 100 && width >= viewportWidth * 0.82) {
        return { x, y, width, height };
      }
    }

    return { x: 0, y: 0, width: viewportWidth, height: viewportHeight };
  });
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
  page.setDefaultTimeout(10000);

  try {
    console.log(`→ ${project.repo} | ${project.siteUrl}`);
    await page.goto(project.siteUrl, { waitUntil: 'domcontentloaded', timeout: 22000 });
    await settlePage(page, EXTRA_DELAY[project.repo] ?? 4000);

    if (await looksProtected(page)) {
      console.warn(`  ${project.repo}: skipped protected login`);
      return false;
    }

    const body = await page.locator('body').innerText({ timeout: 2500 }).catch(() => '');
    if (body.trim().length < 4) {
      console.warn(`  ${project.repo}: skipped blank page`);
      return false;
    }

    const clip = await getCaptureClip(page);
    const output = path.join(OUTPUT_DIR, `${safeName(project.repo)}.png`);
    await page.screenshot({
      path: output,
      clip,
      animations: 'disabled',
      caret: 'hide',
      type: 'png',
    });
    console.log(`  ${project.repo}: saved ${Math.round(clip.width)}x${Math.round(clip.height)}`);
    return true;
  } catch (error) {
    console.warn(`  ${project.repo}: ${error instanceof Error ? error.message : String(error)}`);
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
  let cursor = 0;
  let captured = 0;

  const worker = async () => {
    while (true) {
      const index = cursor++;
      if (index >= projects.length) return;
      if (await capture(browser, projects[index])) captured += 1;
    }
  };

  try {
    await Promise.all(Array.from({ length: Math.min(WORKERS, projects.length) }, worker));
  } finally {
    await browser.close();
  }

  console.log(`Captured ${captured}/${projects.length} live project previews.`);
};

await main();
