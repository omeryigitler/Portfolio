import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useUI } from '../context/UIContext';

export const Contact: React.FC = () => {
  const { isContactFormOpen, setContactFormOpen } = useUI();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isContactFormOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setContactFormOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isContactFormOpen, setContactFormOpen]);

  const openForm = () => {
    setSubmitted(false);
    setContactFormOpen(true);
  };

  const closeForm = () => {
    setSubmitted(false);
    setContactFormOpen(false);
  };

  return (
    <>
      <section
        id="contact"
        className="pointer-events-auto relative flex min-h-[100svh] w-full flex-col rounded-[10px] bg-canvas px-5 py-24 shadow-[0_22px_80px_rgba(17,17,17,0.055)] md:px-12 md:py-28"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
          06 / CONTACT
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="mx-auto w-full max-w-[1180px] text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              className="mb-7 font-mono text-[10px] uppercase tracking-[0.05em] text-muted-gray md:text-[11px]"
            >
              HAVE AN IDEA?
            </motion.p>

            <motion.button
              type="button"
              onClick={openForm}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex flex-col items-center justify-center focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-6"
              aria-label="Open project request form"
            >
              <span className="text-[clamp(46px,6.6vw,100px)] font-medium uppercase leading-[0.9] tracking-[-0.055em] text-ink">
                MAKE IT REAL<span className="text-acid">.</span>
              </span>

              <span
                className="relative mt-7 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-soft-gray transition-[border-color,transform] duration-300 ease-[0.16,1,0.3,1] group-hover:translate-x-1.5 group-hover:border-ink md:mt-9 md:h-16 md:w-16"
                aria-hidden="true"
              >
                <svg className="h-5 w-5 -rotate-45 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </motion.button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            className="fixed inset-0 z-[220] bg-ink/22 p-3 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeForm();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Project request form"
              initial={{ y: 28, opacity: 0, scale: 0.992 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 22, opacity: 0, scale: 0.994 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto flex h-full w-full max-w-[1680px] flex-col overflow-y-auto rounded-[10px] bg-canvas p-5 shadow-[0_30px_100px_rgba(17,17,17,0.18)] md:p-10 lg:p-12"
            >
              <div className="flex items-start justify-between border-b border-soft-gray/60 pb-5">
                <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
                  <p className="text-ink">PROJECT REQUEST / 06</p>
                  <p className="mt-1">A FEW DETAILS TO START</p>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  className="p-1 text-ink transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-acid"
                  aria-label="Close project request form"
                >
                  <X size={28} strokeWidth={1.35} />
                </button>
              </div>

              <div className="grid flex-1 gap-12 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-14">
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">START A PROJECT</p>
                    <h2 className="max-w-[760px] text-[clamp(42px,5.8vw,92px)] font-medium lowercase leading-[0.92] tracking-[-0.05em] text-ink">
                      let&apos;s make something worth remembering<span className="text-acid">.</span>
                    </h2>
                  </div>

                  <div className="mt-10 max-w-[440px] font-mono text-[9px] uppercase leading-[1.6] tracking-[0.04em] text-muted-gray md:text-[10px] lg:mt-16">
                    <p className="text-ink">DESIGN · DEVELOPMENT · INTERACTION</p>
                    <p className="mt-2">Share the project, timing and what you want the experience to do.</p>
                  </div>
                </div>

                <form
                  className="grid content-start gap-7 md:grid-cols-2 md:gap-x-8 md:gap-y-8"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <label className="group border-b border-soft-gray pb-3">
                    <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">01 / NAME</span>
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full bg-transparent text-[18px] text-ink outline-none placeholder:text-ink/25 md:text-[20px]"
                    />
                  </label>

                  <label className="group border-b border-soft-gray pb-3">
                    <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">02 / EMAIL</span>
                    <input
                      name="email"
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      className="w-full bg-transparent text-[18px] text-ink outline-none placeholder:text-ink/25 md:text-[20px]"
                    />
                  </label>

                  <label className="border-b border-soft-gray pb-3">
                    <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">03 / PROJECT</span>
                    <select
                      name="projectType"
                      defaultValue=""
                      className="w-full appearance-none bg-transparent text-[18px] text-ink outline-none md:text-[20px]"
                    >
                      <option value="" disabled>Choose a type</option>
                      <option>Website</option>
                      <option>Digital product</option>
                      <option>Brand / web system</option>
                      <option>Creative development</option>
                      <option>Something else</option>
                    </select>
                  </label>

                  <label className="border-b border-soft-gray pb-3">
                    <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">04 / TIMING</span>
                    <input
                      name="timing"
                      placeholder="When should it go live?"
                      className="w-full bg-transparent text-[18px] text-ink outline-none placeholder:text-ink/25 md:text-[20px]"
                    />
                  </label>

                  <label className="border-b border-soft-gray pb-3 md:col-span-2">
                    <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">05 / ABOUT THE PROJECT</span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="What are you building, and what should it feel like?"
                      className="w-full resize-none bg-transparent text-[18px] leading-[1.4] text-ink outline-none placeholder:text-ink/25 md:text-[20px]"
                    />
                  </label>

                  <div className="flex items-center justify-between gap-6 pt-1 md:col-span-2">
                    <p className={`font-mono text-[9px] uppercase tracking-[0.05em] ${submitted ? 'text-ink' : 'text-muted-gray'}`}>
                      {submitted ? 'FORM UI READY — DELIVERY EMAIL STILL NEEDS TO BE CONNECTED.' : 'ALL FIELDS STAY INSIDE THIS PAGE.'}
                    </p>

                    <button
                      type="submit"
                      className="group inline-flex shrink-0 items-center gap-3 text-[13px] font-[500] uppercase tracking-[-0.015em] text-ink focus-visible:outline-2 focus-visible:outline-acid"
                    >
                      <span>Send request</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">↗</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
