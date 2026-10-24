import React, { useRef, useState, useEffect } from 'react';

const row1Images = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
];

const row2Images = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

// Tripled lists for continuous seamless appearance
const triRow1 = [...row1Images, ...row1Images, ...row1Images];
const triRow2 = [...row2Images, ...row2Images, ...row2Images];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const calculated = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(calculated);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(${-(offset - 200)}px)`;

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none relative"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          className="flex gap-3"
          style={{
            transform: row1Transform,
            willChange: 'transform',
            transition: 'transform 0.1s linear',
          }}
        >
          {triRow1.map((src, i) => (
            <div
              key={`r1-${i}`}
              className="w-[320px] sm:w-[380px] md:w-[420px] h-[200px] sm:h-[240px] md:h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#161616] border border-white/5 shadow-xl"
            >
              <img
                src={src}
                alt={`Interactive Visual Showcase ${(i % 11) + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          className="flex gap-3"
          style={{
            transform: row2Transform,
            willChange: 'transform',
            transition: 'transform 0.1s linear',
          }}
        >
          {triRow2.map((src, i) => (
            <div
              key={`r2-${i}`}
              className="w-[320px] sm:w-[380px] md:w-[420px] h-[200px] sm:h-[240px] md:h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#161616] border border-white/5 shadow-xl"
            >
              <img
                src={src}
                alt={`Interactive Visual Showcase ${(i % 10) + 12}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
