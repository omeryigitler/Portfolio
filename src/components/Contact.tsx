import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useUI } from '../context/UIContext';

const PROCESS = [
  ['01', 'DISCOVER', 'WHAT SHOULD EXIST?'],
  ['02', 'DESIGN', 'HOW SHOULD IT FEEL?'],
  ['03', 'BUILD', 'HOW SHOULD IT BEHAVE?'],
  ['04', 'SHIP', 'MAKE IT REAL.'],
] as const;

const PROJECT_TYPES = [
  'Website',
  'Digital product',
  'Brand / web system',
  'Creative development',
  'Something else',
] as const;

const TIMING_OPTIONS = ['ASAP', '1–2 months', '3–6 months', 'Flexible'] as const;

const ProcessPanel: React.FC = () => (
  <div className="w-full">
    <div className="mb-5 flex items-end justify-between gap-6 border-b border-ink/10 pb-5">
      <div>
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
          FROM IDEA TO LIVE EXPERIENCE
        </p>
        <p className="max-w-[520px] text-[18px] leading-[1.35] tracking-[-0.025em] text-ink md:text-[20px]">
          One continuous process, not separate handoffs.
        </p>
      </div>
      <span className="mb-1 h-2 w-2 shrink-0 bg-acid" />
    </div>

    <div className="relative border-l-2 border-acid pl-8 md:pl-10">
      {PROCESS.map(([number, title, note]) => (
        <div
          key={number}
          className="grid min-h-[94px] grid-cols-[38px_minmax(0,1fr)] items-center border-t border-ink/10 py-4 first:border-t-0 md:min-h-[108px] md:grid-cols-[50px_minmax(0,1fr)_170px]"
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.05em] text-muted-gray md:text-[9px]">{number}</span>
          <span className="text-[clamp(30px,3.3vw,58px)] font-[500] leading-[0.9] tracking-[-0.045em] text-ink">{title}</span>
          <span className="col-start-2 mt-2 text-left font-mono text-[8px] uppercase leading-[1.35] tracking-[0.04em] text-muted-gray md:col-start-auto md:mt-0 md:text-right md:text-[9px]">{note}</span>
        </div>
      ))}
    </div>

    <div className="mt-5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.05em] text-muted-gray md:text-[9px]">
      <span>STRATEGY → INTERFACE → CODE</span>
      <span>END TO END</span>
    </div>
  </div>
);

export const Contact: React.FC = () => {
  const { isContactFormOpen, setContactFormOpen } = useUI();
  const [submitted, setSubmitted] = useState(false);
  const [ctaActive, setCtaActive] = useState(false);
  const [projectType, setProjectType] = useState<string>('');
  const [timing, setTiming] = useState<string>('');

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
        className="pointer-events-auto relative min-h-[100svh] w-full overflow-hidden rounded-[10px] bg-canvas px-5 py-7 shadow-[0_22px_80px_rgba(17,17,17,0.055)] md:px-12 md:py-10 lg:px-14"
      >
        <div className="mx-auto grid min-h-[calc(100svh-56px)] w-full max-w-[1580px] grid-rows-[auto_1fr_auto] md:min-h-[calc(100svh-80px)]">
          <div className="flex items-center justify-between gap-8 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
            <span>06 / CONTACT</span>
            <span className="hidden md:block">FROM IDEA TO LIVE EXPERIENCE</span>
          </div>

          <div className="flex items-center py-10 lg:py-8">
            <div
              className="relative hidden min-h-[610px] w-full lg:block"
              onMouseLeave={() => setCtaActive(false)}
            >
              <motion.button
                type="button"
                onMouseEnter={() => setCtaActive(true)}
                onFocus={() => setCtaActive(true)}
                onClick={() => setCtaActive(true)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                animate={{
                  opacity: ctaActive ? 0 : 1,
                  x: ctaActive ? -36 : 0,
                  scale: ctaActive ? 0.985 : 1,
                }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 left-0 z-10 flex w-1/2 flex-col justify-between pr-12 text-left focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-6"
                aria-label="Reveal start project action"
                tabIndex={ctaActive ? -1 : 0}
              >
                <div>
                  <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
                    HAVE AN IDEA?
                  </p>
                  <h2 className="max-w-[720px] text-[clamp(64px,7.2vw,128px)] font-[500] lowercase leading-[0.86] tracking-[-0.055em] text-ink">
                    have an
                    <br />
                    idea<span className="text-acid">?</span>
                  </h2>
                </div>

                <div className="grid gap-5 border-t border-ink/10 pt-5 md:grid-cols-[minmax(0,430px)_auto] md:items-end md:justify-between">
                  <p className="max-w-[430px] text-[14px] leading-[1.55] tracking-[-0.02em] text-ink/65 md:text-[16px]">
                    Bring the idea, the problem or even the rough sketch. I can take it from direction to a working digital experience.
                  </p>
                  <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">
                    HOVER TO EXPLORE ↗
                  </span>
                </div>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                animate={{
                  x: ctaActive ? '-100%' : '0%',
                  opacity: 1,
                  scale: ctaActive ? 0.985 : 1,
                }}
                transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 right-0 z-20 flex w-1/2 items-center pl-12"
              >
                <ProcessPanel />
              </motion.div>

              <motion.button
                type="button"
                onClick={openForm}
                initial={false}
                animate={{
                  opacity: ctaActive ? 1 : 0,
                  x: ctaActive ? 0 : 46,
                  scale: ctaActive ? 1 : 0.975,
                }}
                transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                className="group absolute inset-y-0 right-0 z-30 flex w-1/2 flex-col justify-center pl-14 text-left focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-6"
                style={{ pointerEvents: ctaActive ? 'auto' : 'none' }}
                aria-label="Open project request form"
              >
                <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
                  READY WHEN YOU ARE
                </p>

                <div className="inline-flex items-center gap-7">
                  <span className="text-[clamp(72px,7.4vw,136px)] font-[500] lowercase leading-[0.84] tracking-[-0.06em] text-ink">
                    make it real<span className="text-acid">.</span>
                  </span>

                  <span
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-ink/15 text-[28px] text-acid transition-[transform,border-color,background-color] duration-300 ease-[0.16,1,0.3,1] group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:border-ink/35 md:h-20 md:w-20 md:text-[34px]"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>

                <div className="mt-10 grid gap-5 border-t border-ink/10 pt-5 md:grid-cols-[minmax(0,430px)_auto] md:items-end md:justify-between">
                  <p className="max-w-[430px] text-[14px] leading-[1.55] tracking-[-0.02em] text-ink/65 md:text-[16px]">
                    Tell me what you want to make, what it should do and when it needs to exist.
                  </p>
                  <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">
                    OPEN PROJECT FORM ↗
                  </span>
                </div>
              </motion.button>
            </div>

            <div className="grid w-full gap-10 lg:hidden">
              <button
                type="button"
                onClick={() => setCtaActive((value) => !value)}
                className="text-left focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-6"
              >
                <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">HAVE AN IDEA?</p>
                <h2 className="text-[clamp(58px,16vw,104px)] font-[500] lowercase leading-[0.86] tracking-[-0.055em] text-ink">
                  have an idea<span className="text-acid">?</span>
                </h2>
              </button>

              <AnimatePresence mode="wait" initial={false}>
                {!ctaActive ? (
                  <motion.div
                    key="process"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProcessPanel />
                  </motion.div>
                ) : (
                  <motion.button
                    key="cta"
                    type="button"
                    onClick={openForm}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group text-left focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-6"
                  >
                    <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">READY WHEN YOU ARE</p>
                    <div className="flex items-center gap-4">
                      <span className="text-[clamp(56px,15vw,94px)] font-[500] lowercase leading-[0.86] tracking-[-0.055em] text-ink">
                        make it real<span className="text-acid">.</span>
                      </span>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-[22px] text-acid transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5">↗</span>
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-end justify-between gap-8 border-t border-ink/8 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
            <span>DESIGN / DEVELOPMENT / INTERACTION</span>
            <span className="hidden md:block">IDEA → PROCESS → PROJECT</span>
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

              <div className="grid flex-1 gap-12 py-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20 lg:py-14">
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
                  className="grid content-start gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-9"
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
                      className="w-full appearance-none rounded-none bg-transparent text-[18px] text-ink outline-none placeholder:text-ink/25 md:text-[20px]"
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
                      className="w-full appearance-none rounded-none bg-transparent text-[18px] text-ink outline-none placeholder:text-ink/25 md:text-[20px]"
                    />
                  </label>

                  <fieldset className="md:col-span-2">
                    <legend className="mb-3 block font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">03 / PROJECT TYPE</legend>
                    <input type="hidden" name="projectType" value={projectType} />
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((option) => {
                        const selected = projectType === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setProjectType(option)}
                            aria-pressed={selected}
                            className={`rounded-full border px-4 py-2.5 text-[12px] tracking-[-0.01em] transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-acid ${selected ? 'border-ink bg-ink text-canvas' : 'border-ink/15 bg-transparent text-ink hover:border-ink/45'}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset className="md:col-span-2">
                    <legend className="mb-3 block font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">04 / TIMING</legend>
                    <input type="hidden" name="timing" value={timing} />
                    <div className="flex flex-wrap gap-2">
                      {TIMING_OPTIONS.map((option) => {
                        const selected = timing === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setTiming(option)}
                            aria-pressed={selected}
                            className={`rounded-full border px-4 py-2.5 text-[12px] tracking-[-0.01em] transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-acid ${selected ? 'border-ink bg-ink text-canvas' : 'border-ink/15 bg-transparent text-ink hover:border-ink/45'}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <label className="border-b border-soft-gray pb-3 md:col-span-2">
                    <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">05 / ABOUT THE PROJECT</span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="What are you building, and what should it feel like?"
                      className="w-full resize-none appearance-none rounded-none bg-transparent text-[18px] leading-[1.4] text-ink outline-none placeholder:text-ink/25 md:text-[20px]"
                    />
                  </label>

                  <div className="flex items-center justify-between gap-6 pt-1 md:col-span-2">
                    <p className={`font-mono text-[9px] uppercase tracking-[0.05em] ${submitted ? 'text-ink' : 'text-muted-gray'}`}>
                      {submitted ? 'FORM UI READY — DELIVERY EMAIL STILL NEEDS TO BE CONNECTED.' : 'A SHORT BRIEF IS ENOUGH TO START.'}
                    </p>

                    <button
                      type="submit"
                      className="group inline-flex shrink-0 items-center gap-3 text-[13px] font-[500] uppercase tracking-[-0.015em] text-ink focus-visible:outline-2 focus-visible:outline-acid"
                    >
                      <span>Send request</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5">↗</span>
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
