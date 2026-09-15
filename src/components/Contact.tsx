import React from 'react';
import { motion } from 'motion/react';

const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group relative pb-1 text-ink focus-visible:outline-none"
  >
    <span>{children}</span>
    <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
  </a>
);

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      data-site-footer
      className="pointer-events-auto relative flex min-h-[calc(100svh-24px)] scroll-mt-3 flex-col rounded-[10px] bg-canvas px-5 pb-6 pt-20 shadow-[0_20px_70px_rgba(17,17,17,0.07)] md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:pb-8 md:pt-24"
    >
      <div className="flex min-h-0 flex-1 flex-col justify-center pb-[4svh]">
        <div className="mb-10 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:mb-14 md:text-[10px]">
          06 / CONTACT
        </div>

        <div className="mx-auto w-full max-w-[1180px] text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            className="mb-7 font-mono text-[10px] uppercase tracking-[0.05em] text-muted-gray md:text-[11px]"
          >
            HAVE AN IDEA?
          </motion.p>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group inline-flex items-center justify-center gap-4 md:gap-6"
          >
            <h2 className="text-[clamp(46px,6.6vw,100px)] font-medium uppercase leading-[0.9] tracking-[-0.055em] text-ink">
              MAKE IT REAL<span className="text-acid">.</span>
            </h2>

            <span
              className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-soft-gray transition-colors duration-300 group-hover:border-acid md:h-16 md:w-16"
              aria-hidden="true"
            >
              <span className="absolute h-2 w-2 scale-0 rounded-full bg-acid transition-transform duration-300 group-hover:scale-100" />
              <svg className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </motion.div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between border-t border-soft-gray/50 py-5 font-mono text-[9px] uppercase tracking-[0.05em] text-muted-gray md:text-[10px]">
        <span>© 2026 OMER YIGITLER</span>
        <div className="flex items-center gap-6 md:gap-9">
          <SocialLink href="https://www.instagram.com/omeryigitler.web/">INSTAGRAM ↗</SocialLink>
          <SocialLink href="https://github.com/omeryigitler">GITHUB ↗</SocialLink>
        </div>
      </div>

      <div className="flex w-full items-end justify-center overflow-visible pt-4">
        <h1 className="w-full whitespace-nowrap pb-2 text-center text-[clamp(60px,11.6vw,220px)] font-medium leading-[0.82] tracking-[-0.065em] text-ink md:pb-3">
          omeryigitler<span className="text-acid">.</span>
        </h1>
      </div>
    </section>
  );
};
