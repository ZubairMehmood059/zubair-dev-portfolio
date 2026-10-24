import React from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
  onClick?: () => void;
  showDot?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
  onClick,
  showDot = false,
}) => {
  const iconDimensions = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12',
  }[size];

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg lg:text-xl',
    lg: 'text-xl sm:text-2xl',
  }[size];

  const badgePadding = {
    xs: 'p-1',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  }[size];

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer text-left focus:outline-none transition-transform active:scale-95 ${className}`}
      aria-label="Zubair.dev - Return to top"
    >
      {/* 3D Geometric Vector Emblem */}
      <div
        className={`relative ${iconDimensions} rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1C1F24] via-[#121417] to-[#0C0C0C] p-[1.5px] border border-[#D7E2EA]/30 shadow-[0_4px_16px_rgba(0,0,0,0.5)] group-hover:border-[#D7E2EA] group-hover:shadow-[0_0_20px_rgba(187,204,215,0.25)] transition-all duration-300 shrink-0 flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#646973" />
              <stop offset="50%" stopColor="#D7E2EA" />
              <stop offset="100%" stopColor="#BBCCD7" />
            </linearGradient>
            <linearGradient id="logoAccentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#BBCCD7" />
            </linearGradient>
          </defs>

          {/* Top bar */}
          <path
            d="M17 18H47L43 25H17V18Z"
            fill="url(#logoAccentGrad)"
            className="transition-opacity group-hover:opacity-100"
          />

          {/* Diagonal faceted stroke */}
          <path
            d="M43 23L23 41H31L47 25V23H43Z"
            fill="url(#logoMetalGrad)"
          />
          <path
            d="M40 25L21 42H28L44 26L40 25Z"
            fill="#FFFFFF"
            fillOpacity="0.45"
          />

          {/* Bottom bar */}
          <path
            d="M17 39L21 46H47V39H17Z"
            fill="url(#logoAccentGrad)"
          />

          {/* Accent .dev dot node */}
          <circle
            cx="49"
            cy="46"
            r="3"
            fill="#D7E2EA"
            stroke="#0C0C0C"
            strokeWidth="1.5"
            className="group-hover:fill-white transition-colors"
          />
        </svg>

        {showDot && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0C0C0C] animate-pulse" />
        )}
      </div>

      {/* Wordmark Typography */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span
              className={`font-black uppercase tracking-tight text-white font-['Kanit',sans-serif] ${textSizes} group-hover:text-white transition-colors`}
            >
              Zubair
            </span>
            <span className="text-[#BBCCD7] font-mono text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded bg-white/10 border border-white/10 group-hover:border-white/30 transition-colors">
              .dev
            </span>
          </div>
          <span className="text-[8px] sm:text-[10px] font-mono text-[#D7E2EA]/50 tracking-wider uppercase block">
            SOFTWARE ENGINEER
          </span>
        </div>
      )}
    </button>
  );
};
