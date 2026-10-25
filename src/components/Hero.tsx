import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Magnet, ContactButton } from './common/MotionComponents';

interface HeroProps {
  onOpenAdmin?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Bind mouse scroll progress across hero section to reactive transform values
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax translation, dynamic zoom scale, and soft fade driven by mouse scroll
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 0.94]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.85, 0.15]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-8 md:pb-10"
    >
      {/* 1. Hero Background Name Typography Cover */}
      <motion.div
        style={{ y: headingY }}
        className="w-full overflow-hidden text-center z-0 pointer-events-none mt-1 sm:mt-0 px-1 flex items-center justify-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap w-full text-[10.2vw] sm:text-[11.8vw] md:text-[12.8vw] lg:text-[13.5vw] xl:text-[13.8vw] select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
        >
          Hi, i&apos;m zubair
        </motion.h1>
      </motion.div>

      {/* 2. Hero Portrait with Mouse Scroll & Magnet Dynamic Interaction */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[190px] sm:w-[250px] md:w-[320px] lg:w-[370px] xl:w-[400px] bottom-[110px] sm:bottom-[90px] md:bottom-0 pointer-events-none"
      >
        <Magnet
          padding={140}
          strength={3.5}
          activeTransition="transform 0.25s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="w-full flex justify-center pointer-events-auto"
        >
          <div className="relative group overflow-hidden rounded-t-[90px] sm:rounded-t-[125px] md:rounded-t-[160px] rounded-b-xl sm:rounded-b-2xl border border-[#D7E2EA]/30 bg-gradient-to-b from-[#181A1F] via-[#101216] to-[#0C0C0C] p-1.5 sm:p-2 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(187,204,215,0.12)] transition-all duration-500 hover:border-[#D7E2EA]/60 hover:shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_50px_rgba(187,204,215,0.22)]">
            <div className="relative overflow-hidden rounded-t-[85px] sm:rounded-t-[120px] md:rounded-t-[155px] rounded-b-lg aspect-[3/4]">
              <img
                src="/images/zubair-portrait.jpg"
                alt="Zubair - Software Engineer"
                className="w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                draggable={false}
                loading="eager"
              />

              {/* Seamless dark blend gradient at bottom of portrait */}
              <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 md:h-36 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-transparent pointer-events-none" />

              {/* Subtle top ambient sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />

              {/* Accent status tag */}
              <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#0C0C0C]/85 border border-white/15 backdrop-blur-md flex items-center gap-1.5 shadow-lg pointer-events-none whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-wider text-[#D7E2EA]">
                  Software Engineer
                </span>
              </div>
            </div>
          </div>
        </Magnet>
      </motion.div>

      {/* 3. Bottom Bar */}
      <div className="w-full flex flex-row justify-between items-end px-4 sm:px-6 md:px-10 z-20 pb-1 sm:pb-3 md:pb-0">
        {/* Left Bio text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-tight sm:leading-snug max-w-[170px] sm:max-w-[240px] md:max-w-[300px] text-[10px] sm:text-xs md:text-sm"
        >
          a software engineer driven by crafting striking and impactful digital products
        </motion.p>

        {/* Right Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="shrink-0"
        >
          <ContactButton label="Contact Me" href="#contact" />
        </motion.div>
      </div>
    </section>
  );
};
