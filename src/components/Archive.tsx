import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const CAPABILITIES = [
  {
    id: 'design',
    number: '01',
    label: 'DESIGN',
    note: 'HOW IT LOOKS & FEELS.',
    services: ['ART DIRECTION', 'UI / UX', 'IDENTITY', 'SYSTEMS'],
  },
  {
    id: 'build',
    number: '02',
    label: 'BUILD',
    note: 'HOW IT WORKS & MOVES.',
    services: ['FRONTEND', 'MOTION', 'APIS', 'CREATIVE DEVELOPMENT'],
  },
  {
    id: 'experiment',
    number: '03',
    label: 'EXPERIMENT',
    note: 'WHERE IT CAN GO NEXT.',
    services: ['AI', '3D', 'GENERATIVE', 'INTERACTIVE SYSTEMS'],
  },
] as const;

type CapabilityId = (typeof CAPABILITIES)[number]['id'];

const ProofWindow: React.FC<{ active: CapabilityId }> = ({ active }) => (
  <div className="relative h-[330px] overflow-hidden rounded-[12px] border border-ink/10 bg-[#efeee9] shadow-[0_20px_55px_rgba(17,17,17,0.055)] md:h-[420px] lg:h-[500px]">
    <div className="flex h-11 items-center justify-between border-b border-ink/8 bg-canvas/90 px-4 font-mono text-[8px] uppercase tracking-[0.08em] text-muted-gray md:px-5 md:text-[9px]">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-acid" />
        <span>CAPABILITY PROOF</span>
      </div>
      <span>{CAPABILITIES.find((item) => item.id === active)?.number} / 03</span>
    </div>

    <AnimatePresence mode="wait" initial={false}>
      {active === 'design' && (
        <motion.div
          key="design"
          className="absolute inset-x-0 bottom-0 top-11 p-5 md:p-7"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid h-full grid-cols-[0.72fr_1.28fr] gap-4 md:gap-6">
            <div className="flex flex-col justify-between border-r border-ink/10 pr-4 md:pr-6">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:text-[9px]">DESIGN SYSTEM / 01</p>
                <p className="mt-4 max-w-[220px] text-[clamp(28px,3vw,52px)] leading-[0.92] tracking-[-0.05em] text-ink">Clarity before decoration.</p>
              </div>
              <div className="space-y-2 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
                <p className="border-t border-ink/10 pt-2">TYPE / SCALE</p>
                <p className="border-t border-ink/10 pt-2">GRID / RHYTHM</p>
                <p className="border-t border-ink/10 pt-2">INTERFACE / STATES</p>
              </div>
            </div>

            <div className="grid grid-rows-[auto_1fr_auto] gap-3">
              <div className="flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.07em] text-muted-gray md:text-[8px]"><span>WIREFRAME → INTERFACE</span><span>01</span></div>
              <div className="grid grid-cols-12 gap-2 border border-ink/10 bg-canvas p-3 md:p-4">
                <div className="col-span-7 border border-ink/10 p-3">
                  <div className="h-3 w-2/5 bg-ink/10" />
                  <div className="mt-5 h-[48%] border border-dashed border-ink/15" />
                  <div className="mt-4 h-2 w-4/5 bg-ink/8" />
                  <div className="mt-2 h-2 w-1/2 bg-ink/6" />
                </div>
                <div className="col-span-5 grid grid-rows-3 gap-2">
                  <div className="border border-ink/10 bg-[#deded8]" />
                  <div className="border border-ink/10 bg-canvas" />
                  <div className="border border-ink/10 bg-[#d1d2cc]" />
                </div>
              </div>
              <div className="h-[3px] w-full bg-acid" />
            </div>
          </div>
        </motion.div>
      )}

      {active === 'build' && (
        <motion.div
          key="build"
          className="absolute inset-x-0 bottom-0 top-11 bg-[#171717] p-5 text-white md:p-7"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-white/42 md:text-[9px]">
              <span>BUILD / INTERACTION.TSX</span>
              <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-acid" /></div>
            </div>

            <div className="space-y-2.5 font-mono text-[10px] leading-[1.55] text-white/72 md:text-[12px] lg:text-[13px]">
              <div><span className="mr-5 text-white/22">01</span>const interfaceSystem = {'{'}</div>
              <div className="pl-10"><span className="text-acid">responsive</span>: true,</div>
              <div className="pl-10"><span className="text-acid">motion</span>: 'purposeful',</div>
              <div className="pl-10"><span className="text-acid">accessibility</span>: 'built-in',</div>
              <div className="pl-10"><span className="text-acid">performance</span>: 'fast'</div>
              <div><span className="mr-5 text-white/22">06</span>{'}'};</div>
              <div className="pt-4"><span className="mr-5 text-white/22">08</span><span className="text-white">ship</span>(interfaceSystem);</div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[8px] uppercase tracking-[0.07em] text-white/36">
              <span>FRONTEND / MOTION / APIS</span>
              <span className="h-[3px] w-16 bg-acid" />
            </div>
          </div>
        </motion.div>
      )}

      {active === 'experiment' && (
        <motion.div
          key="experiment"
          className="absolute inset-x-0 bottom-0 top-11 overflow-hidden bg-[#e7e6e1] p-5 md:p-7"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative h-full overflow-hidden border border-ink/10 bg-canvas">
            <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(rgba(17,17,17,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.08) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
            <motion.div
              className="absolute left-[14%] top-[16%] h-[34%] w-[34%] rounded-[44%_56%_62%_38%] border border-ink/12 bg-[#d0d0ca]"
              animate={{ rotate: [0, 5, -3, 0], borderRadius: ['44% 56% 62% 38%', '58% 42% 36% 64%', '44% 56% 62% 38%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-[14%] right-[12%] h-[42%] w-[38%] rounded-full border border-ink/10 bg-[#b8b9b3]"
              animate={{ scale: [1, 1.04, 0.98, 1], x: [0, 8, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute left-[9%] top-[11%] font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:text-[9px]">GENERATIVE / INTERACTIVE / 03</div>
            <div className="absolute bottom-[9%] left-[9%] max-w-[260px] text-[clamp(28px,3vw,50px)] leading-[0.92] tracking-[-0.05em] text-ink">Explore without losing the system.</div>
            <div className="absolute right-[8%] top-[10%] h-3 w-3 bg-acid" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

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
          <span className="hidden md:block">WHAT I CAN TAKE FROM IDEA TO LIVE</span>
        </div>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 xl:gap-24">
          <div>
            <div className="mb-10 max-w-[760px] md:mb-12">
              <p className="font-mono text-[9px] uppercase tracking-[0.07em] text-muted-gray md:text-[10px]">END TO END / WITHOUT THE HANDOFFS</p>
              <h2 className="mt-4 text-[clamp(38px,4.4vw,72px)] font-[500] leading-[0.94] tracking-[-0.05em] text-ink">
                I work across the parts that usually get handed off.
              </h2>
            </div>

            <div className="border-b border-ink/10">
              {CAPABILITIES.map((capability) => {
                const isActive = active === capability.id;
                return (
                  <button
                    key={capability.id}
                    type="button"
                    onMouseEnter={() => setActive(capability.id)}
                    onFocus={() => setActive(capability.id)}
                    onClick={() => setActive(capability.id)}
                    className="group grid w-full grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-3 border-t border-ink/10 py-5 text-left focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4 md:grid-cols-[52px_minmax(0,1fr)_220px_auto] md:py-6"
                    aria-pressed={isActive}
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">{capability.number}</span>
                    <div className="min-w-0">
                      <span className={`block text-[clamp(34px,3.8vw,66px)] font-[500] leading-[0.88] tracking-[-0.05em] text-ink transition-transform duration-300 ease-[0.16,1,0.3,1] ${isActive ? 'translate-x-2' : 'group-hover:translate-x-2'}`}>{capability.label}</span>
                      <span className="mt-2 block truncate font-mono text-[8px] uppercase tracking-[0.05em] text-muted-gray md:text-[9px]">{capability.services.join(' / ')}</span>
                    </div>
                    <span className="hidden text-right font-mono text-[8px] uppercase tracking-[0.05em] text-muted-gray md:block md:text-[9px]">{capability.note}</span>
                    <ArrowUpRight size={20} strokeWidth={1.4} className={`text-ink transition-transform duration-300 ease-[0.16,1,0.3,1] ${isActive ? 'translate-x-1 -translate-y-1' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:pl-2">
            <ProofWindow active={active} />
            <div className="mt-4 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
              <span>HOVER / TAP TO CHANGE PROOF</span>
              <span>DESIGN → BUILD → EXPERIMENT</span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-8 border-t border-ink/8 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
          <span>STRATEGY / INTERFACE / CODE</span>
          <span className="hidden md:block">ONE SYSTEM / MANY DISCIPLINES</span>
        </div>
      </div>
    </section>
  );
};
