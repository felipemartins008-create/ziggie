import React from 'react';

export function BlackFridayBanner({ onBannerClick }) {
  return (
    <section 
      onClick={onBannerClick}
      className="w-full bg-black border-b border-white/[0.08] cursor-pointer group relative overflow-hidden block"
      title="Conferir Ofertas da Black Friday"
    >
      <img 
        src="/images/black-friday-banner.png" 
        alt="Black Friday + Black November Ziggie 3D" 
        className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-[1.008]"
      />
    </section>
  );
}

export default BlackFridayBanner;
