import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { PROJECTS } from '../data';

const CAPABILITIES = [
  {
    id: 'design',
    number: '01',
    label: 'DESIGN',
    note: 'ART DIRECTION / UI / SYSTEMS',
    statement: 'I shape the visual language, interface and system before anything gets built.',
    services: ['ART DIRECTION', 'UI / UX', 'DIGITAL IDENTITY', 'DESIGN SYSTEMS'],
    projects: ['japanese-bakery', 'berfin-akbas', 'xxl-cafe'],
  },
  {
    id: 'development',
    number: '02',
    label: 'DEVELOPMENT',
    note: 'FRONTEND / APIS / PERFORMANCE',
    statement: 'I turn the design into an interface that survives outside the mockup.',
    services: ['FRONTEND', 'CREATIVE DEVELOPMENT', 'APIS', 'PERFORMANCE'],
    projects: ['architecture-3d', 'reformer', 'xxl-cafe'],
  },
  {
    id: 'interaction',
    number: '03',
    label: 'INTERACTION',
    note: 'MOTION / 3D / AI',
    statement: 'Movement should explain, guide or reward — not compete with the experience.',
    services: ['MOTION', 'CREATIVE DEVELOPMENT', 'WEBGL / 3D', 'AI / GENERATIVE'],
    projects: ['architecture-3d', 'japanese-bakery', 'reformer'],
  },
] as const;

type CapabilityId = (typeof CAPABILITIES)[number]['id'];

export const SystemMap: React.FC = () => {
  const [openId, setOpenId] = useState<CapabilityId | null>(null);

  const projectMap = useMemo(
    () => new Map(PROJECTS.map((project) => [project.id, project])),
    [],
  );

  return (
    <section
      id="capabilities"
      className="pointer-events-auto relative min-h-[calc(100svh-24px)] w-full scroll-mt-3 rounded-[10px] bg-canvas px-5 py-8 shadow-[0_20px_70px_rgba(17,17,17,0.07)] md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:py-10 lg:px-14"
    >
      <div className="mx-auto flex min-h-[calc(100svh-88px)] w-full max-w-[1580px] flex-col md:min-h-[calc(100svh-128px)]">
        <div className="flex items-center justify-between gap-8 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
          <span>05 / CAPABILITIES</span>
          <span className="hidden md:block">CLICK A DISCIPLINE TO OPEN</span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-12 md:py-16">
          <div className="mb-12 max-w-[980px] md:mb-16">
            <p className="font-mono text-[9px] uppercase tracking-[0.07em] text-muted-gray md:text-[10px]">SCOPE OF WORK</p>
            <h2 className="mt-4 text-[clamp(42px,5vw,84px)] font-[500] leading-[0.92] tracking-[-0.055em] text-ink">
              A practice across design, development and interaction.
            </h2>
          </div>

          <div className="border-b border-ink/10">
            {CAPABILITIES.map((capability) => {
              const isOpen = openId === capability.id;

              return (
                <div key={capability.id} className="border-t border-ink/10">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : capability.id)}
                    className="group grid w-full grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3 py-6 text-left focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4 md:grid-cols-[62px_minmax(0,1fr)_330px_auto] md:py-8"
                    aria-expanded={isOpen}
                    aria-controls={`capability-${capability.id}`}
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
                      {capability.number}
                    </span>

                    <span className="text-[clamp(40px,5.4vw,92px)] font-[500] leading-[0.84] tracking-[-0.055em] text-ink transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:translate-x-2">
                      {capability.label}
                    </span>

                    <span className="hidden text-right font-mono text-[8px] uppercase leading-[1.45] tracking-[0.055em] text-muted-gray md:block md:text-[9px]">
                      {capability.note}
                    </span>

                    <span className={`grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink transition-[transform,border-color] duration-300 ease-[0.16,1,0.3,1] group-hover:border-ink/35 ${isOpen ? 'rotate-45' : 'group-hover:rotate-12'}`}>
                      <Plus size={17} strokeWidth={1.5} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`capability-${capability.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="relative mb-7 overflow-hidden rounded-[8px] bg-[#f1f0ea] px-5 py-7 md:mb-9 md:px-8 md:py-9 lg:px-10 lg:py-10">
                          <span className="absolute left-0 top-0 h-full w-[3px] bg-acid" aria-hidden="true" />

                          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.7fr_0.9fr] lg:gap-14 xl:gap-20">
                            <div>
                              <p className="mb-4 font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:text-[9px]">
                                {capability.number} / {capability.label}
                              </p>
                              <p className="max-w-[640px] text-[clamp(28px,3vw,48px)] leading-[1.02] tracking-[-0.045em] text-ink">
                                {capability.statement}
                              </p>
                            </div>

                            <div>
                              <p className="mb-5 font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:text-[9px]">WHAT IT INCLUDES</p>
                              <div className="space-y-0 border-b border-ink/10">
                                {capability.services.map((service) => (
                                  <div
                                    key={service}
                                    className="border-t border-ink/10 py-3.5 font-mono text-[9px] uppercase tracking-[0.055em] text-ink md:text-[10px]"
                                  >
                                    {service}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="mb-5 font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:text-[9px]">USED IN REAL WORK</p>
                              <div className="space-y-0 border-b border-ink/10">
                                {capability.projects.map((projectId) => {
                                  const project = projectMap.get(projectId);
                                  if (!project) return null;

                                  return (
                                    <a
                                      key={project.id}
                                      href={project.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="group/project flex items-center justify-between gap-4 border-t border-ink/10 py-3.5 text-[13px] font-[560] tracking-[-0.02em] text-ink md:text-[14px]"
                                    >
                                      <span>{project.title}</span>
                                      <ArrowUpRight
                                        size={15}
                                        strokeWidth={1.4}
                                        className="shrink-0 transition-transform duration-300 group-hover/project:translate-x-1 group-hover/project:-translate-y-1"
                                      />
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-end justify-between gap-8 border-t border-ink/8 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
          <span>DESIGN / DEVELOPMENT / INTERACTION</span>
          <span className="hidden md:block">CAPABILITY → REAL PROJECT</span>
        </div>
      </div>
    </section>
  );
};
