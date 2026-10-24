import React from 'react';
import { FadeIn } from './common/MotionComponents';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    number: '01',
    name: 'Full-Stack Architecture',
    description:
      'Creation of scalable web platforms, interactive React frontends, and tailored digital architectures built for high performance and reliability.',
  },
  {
    number: '02',
    name: 'Python & Backend Systems',
    description:
      'Robust backend services, RESTful APIs, and secure database structures engineered to handle complex business logic and high throughput.',
  },
  {
    number: '03',
    name: 'Motion Design & Interaction',
    description:
      'Dynamic animations, magnetic interactions, and responsive motion graphics that add storytelling and premium fluidity to web applications.',
  },
  {
    number: '04',
    name: 'AI Products & Intelligent Workflows',
    description:
      'Designing modern AI integrations, automated pipeline engineering, and custom intelligent agent interfaces to deliver real business impact.',
  },
  {
    number: '05',
    name: 'Web & UI/UX Design',
    description:
      'Designing clean, modern, and conversion-focused websites with obsessive attention to layout, fluid typography, and seamless user experiences.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* 5 Service Items List */}
        <div className="flex flex-col">
          {servicesData.map((item, i) => (
            <FadeIn key={item.number} delay={i * 0.1} y={30} duration={0.7}>
              <div
                className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-12 gap-6 md:gap-12"
                style={{
                  borderBottom:
                    i < servicesData.length - 1
                      ? '1px solid rgba(12, 12, 12, 0.15)'
                      : 'none',
                }}
              >
                {/* Huge Number */}
                <span
                  className="font-black text-[#0C0C0C] leading-none shrink-0"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {item.number}
                </span>

                {/* Name + Description stacked vertically on the right */}
                <div className="flex flex-col gap-2 md:gap-3 flex-1">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
