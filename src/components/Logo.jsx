import React from 'react';

export function Logo({ className = "h-11 sm:h-12 md:h-13", variant = "dark", iconOnly = false }) {
  if (iconOnly) {
    return (
      <div className="flex items-center cursor-pointer select-none">
        <img
          src="/images/ziggie-symbol-3d.png"
          alt="Ziggie 3D"
          className={`${className} w-auto object-contain drop-shadow-sm transition-transform hover:scale-105`}
        />
      </div>
    );
  }

  const logoSrc = variant === 'light' 
    ? "/images/ziggie-logo-light.png" 
    : "/images/ziggie-logo-dark.png";

  return (
    <div className="flex items-center cursor-pointer select-none group py-0.5">
      <img
        src={logoSrc}
        alt="Ziggie Impressão 3D"
        className={`${className} w-auto object-contain drop-shadow-xs transition-all duration-300 group-hover:scale-[1.03] group-hover:drop-shadow-[0_4px_16px_rgba(255,85,0,0.35)]`}
      />
    </div>
  );
}

export default Logo;
