import React from 'react';
import { FadeIn, AnimatedText, ContactButton } from './common/MotionComponents';

export const About: React.FC = () => {
  const aboutText =
    "With more than two years of hands-on experience in software engineering, i focus on modern web architectures, Python backend systems, and AI-driven products, i truly enjoy collaborating on projects that aim to stand out and deliver high-impact performance. Let's build something incredible together!";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden select-none"
    >
      {/* 4 Decorative 3D Floating Images in Corners */}
      {/* 1. Top-Left: Moon icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon Object"
            referrerPolicy="no-referrer"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          />
        </FadeIn>
      </div>

      {/* 2. Bottom-Left: 3D Object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Shape Object"
            referrerPolicy="no-referrer"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          />
        </FadeIn>
      </div>

      {/* 3. Top-Right: Lego icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego Object"
            referrerPolicy="no-referrer"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          />
        </FadeIn>
      </div>

      {/* 4. Bottom-Right: 3D Group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group Geometric Object"
            referrerPolicy="no-referrer"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          />
        </FadeIn>
      </div>

      {/* Central Content Stack */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading & text: gap-10 sm:gap-14 md:gap-16 */}
        <div className="mt-10 sm:mt-14 md:mt-16 w-full flex justify-center">
          <AnimatedText
            text={aboutText}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' } as React.CSSProperties}
          />
        </div>

        {/* Gap between text block and button: gap-16 sm:gap-20 md:gap-24 */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.4} y={30} duration={0.8}>
            <ContactButton label="Contact Me" href="#contact" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
