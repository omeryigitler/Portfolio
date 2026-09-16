import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const CAPABILITIES = [
  {
    id: 'design',
    number: '01',
    label: 'DESIGN',
    note: 'HOW IT LOOKS & FEELS.',
    description: 'Art direction, interface and visual systems shaped around the idea — not a template.',
    services: ['ART DIRECTION', 'UI / UX', 'IDENTITY', 'DESIGN SYSTEMS'],
  },
  {
    id: 'build',
    number: '02',
    label: 'BUILD',
    note: 'HOW IT WORKS & MOVES.',
    description: 'Frontend, motion and interaction built as part of the design rather than handed off later.',
    services: ['FRONTEND', 'MOTION', 'APIS', 'CREATIVE DEVELOPMENT'],
  },
  {
    id: 'experiment',
    number: '03',
    label: 'EXPERIMENT',
    note: 'WHERE IT CAN GO NEXT.',
    description: 'New interaction models, AI, 3D and generative systems when the project benefits from them.',
    services: ['AI', '3D', 'GENERATIVE', 'INTERACTIVE SYSTEMS'],
  },
] as const;

type CapabilityId = (typeof CAPABILITIES)[number]['id'];

type DetailProps = {
  active: CapabilityId;
};

const DesignSignal: React.FC = () => (
  <div className="grid h-full min-h-[150px] grid-cols-[0.8fr_1.2fr] gap-4 md:min-h-[170px] md:gap-6">
    <div className="flex items-end border-r border-ink/10 pr-4 md:pr-6">
      <div>
        <span className="block text-[clamp(54px,7vw,108px)] font-[500] leading-[0.72] tracking-[-0.075em] text-ink">Aa</span>
        <span className="mt-5 block font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:text-[9px]">TYPE / SCALE / RHYTHM</span>
      </div>
    </div>
    <div className="grid grid-cols-6 gap-2 md:gap-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className={`border border-ink/10 ${index === 1 || index === 8 ? 'bg-acid' : index === 4 || index === 10 ? 'bg-ink/10' : 'bg-canvas'}`}
        />
      ))}
    </div>
  </div>
);

const BuildSignal: React.FC = () => (
  <div className="flex h-full min-h-[150px] flex-col justify-between bg-[#171717] p-5 text-white md:min-h-[170px] md:p-6">
    <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.07em] text-white/40 md:text-[9px]">
      <span>INTERACTION.TSX</span>
      <span>BUILD / 02</span>
    </div>

    <div className="space-y-2 font-mono text-[10px] leading-[1.5] text-white/72 md:text-[11px]">
      <div><span className="mr-4 text-white/20">01</span>const experience = {'{'}</div>
      <div className="pl-9"><span className="text-acid">interface</span>: 'clear',</div>
      <div className="pl-9"><span className="text-acid">motion</span>: 'intentional',</div>
      <div className="pl-9"><span className="text-acid">performance</span>: 'fast'</div>
      <div><span className="mr-4 text-white/20">05</span>{'}'};</div>
    </div>

    <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[8px] uppercase tracking-[0.07em] text-white/36">
      <span>DESIGN → CODE → SHIP</span>
      <span className="h-[3px] w-16 bg-acid" />
    </div>
  </div>
);

const ExperimentSignal: React.FC = () => (
  <div className="relative h-full min-h-[150px] overflow-hidden border border-ink/10 bg-[#efeee9] md:min-h-[170px]">
    <div
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          'linear-gradient(rgba(17,17,17,0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.075) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
      }}
    />
    <motion.div
      className="absolute left-[10%] top-[18%] h-[54%] w-[26%] rounded-[44%_56%_62%_38%] border border-ink/12 bg-[#d2d2cc]"
      animate={{ rotate: [0, 4, -2, 0], borderRadius: ['44% 56% 62% 38%', '58% 42% 36% 64%', '44% 56% 62% 38%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute right-[12%] top-[24%] h-[46%] w-[32%] rounded-full border border-ink/10 bg-[#bebfba]"
      animate={{ scale: [1, 1.04, 0.98, 1], x: [0, 8, -4, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="absolute left-[8%] top-[10%] font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:text-[9px]">GENERATIVE / INTERACTIVE</div>
    <div className="absolute bottom-[10%] right-[8%] h-3 w-3 bg-acid" />
  </div>
);

const CapabilityDetail: React.FC<DetailProps> = ({ active }) => {
  const capability = CAPABILITIES.find((item) => item.id === active)!;

  return (
    <motion.div
      key={active}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-6 border-t border-ink/8 bg-[#f3f2ed] px-4 py-5 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-7 lg:gap-12 lg:px-10"
    >
      <div className="flex flex-col justify-between gap-8 py-1">
        <p className="max-w-[620px] text-[18px] leading-[1.38] tracking-[-0.028em] text-ink md:text-[22px] lg:text-[24px]">
          {capability.description}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
          {capability.services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </div>

      <div>
        {active === 'design' && <DesignSignal />}
        {active === 'build' && <BuildSignal />}
        {active === 'experiment' && <ExperimentSignal />}
      </div>
    </motion.div>
  );
};

export const SystemMap: React.FC = () => {
  const [active, setActive] = useState<CapabilityId>('design');

  return (
    <section
      id="capabilities"
      className="pointer-events-auto relative min-h-[calc(100svh-24px)] w-full scroll-mt-3 rounded-[10px] bg-canvas px-5 py-8 shadow-[0_20px_70px_rgba(17,17,17,0.07)] md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:py-10 lg:px-14"
    >
      <div className="mx-auto flex min-h-[calc(100svh-88px)] w-full max-w-[1580px] flex-col md:min-h-[calc(100svh-128px)]">
        <div className="flex items-center justify-between gap-8 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
          <span>05 / CAPABILITIES</span>
          <span className="hidden md:block">DESIGN / BUILD / EXPERIMENT</span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10 md:py-12">
          <div className="mb-10 grid gap-6 border-b border-ink/10 pb-8 md:mb-12 md:grid-cols-[1.1fr_0.9fr] md:items-end md:pb-10">
            <h2 className="max-w-[980px] text-[clamp(42px,5.6vw,90px)] font-[500] leading-[0.9] tracking-[-0.055em] text-ink">
              The work behind the work.
            </h2>
            <p className="max-w-[520px] text-[15px] leading-[1.55] tracking-[-0.02em] text-ink/62 md:justify-self-end md:text-[17px]">
              Three disciplines I stay close to from first sketch to shipped interface.
            </p>
          </div>

          <div className="border-b border-ink/10">
            {CAPABILITIES.map((capability) => {
              const isActive = active === capability.id;

              return (
                <div key={capability.id} className="border-t border-ink/10 first:border-t-0">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(capability.id)}
                    onFocus={() => setActive(capability.id)}
                    onClick={() => setActive(capability.id)}
                    aria-expanded={isActive}
                    className="group grid w-full grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-3 py-5 text-left focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4 md:grid-cols-[52px_minmax(0,1fr)_260px_auto] md:py-7"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">{capability.number}</span>
                    <span
                      className={`text-[clamp(38px,5vw,82px)] font-[500] leading-[0.84] tracking-[-0.055em] text-ink transition-transform duration-300 ease-[0.16,1,0.3,1] ${
                        isActive ? 'translate-x-2' : 'group-hover:translate-x-2'
                      }`}
                    >
                      {capability.label}
                    </span>
                    <span className="hidden text-right font-mono text-[8px] uppercase tracking-[0.05em] text-muted-gray md:block md:text-[9px]">
                      {capability.note}
                    </span>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.4}
                      className={`text-ink transition-transform duration-300 ease-[0.16,1,0.3,1] ${
                        isActive ? 'translate-x-1 -translate-y-1' : 'group-hover:translate-x-1 group-hover:-translate-y-1'
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && <CapabilityDetail active={capability.id} />}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-end justify-between gap-8 border-t border-ink/8 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
          <span>STRATEGY / INTERFACE / CODE</span>
          <span className="hidden md:block">OPEN A ROW / SEE THE DISCIPLINE</span>
        </div>
      </div>
    </section>
  );
};
