import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappNumber = '5511999999999';
  const whatsappMessage = encodeURIComponent('Olá! Gostaria de tirar dúvidas sobre as impressoras 3D e filamentos da Ziggie 3D.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* Floating Right Social Rail (Matches 3D Prime) */}
      <aside 
        aria-label="Redes Sociais Ziggie 3D" 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col bg-white/95 backdrop-blur-md border-l border-y border-zinc-200 shadow-xl rounded-l-2xl py-2 px-1.5 space-y-2.5"
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-600 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 transition-all duration-200"
          title="Instagram Ziggie 3D"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-600 hover:text-white hover:bg-red-600 transition-all duration-200"
          title="Canal YouTube Ziggie 3D"
        >
          <YoutubeIcon className="w-4 h-4" />
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-600 hover:text-white hover:bg-blue-600 transition-all duration-200"
          title="Facebook Ziggie 3D"
        >
          <FacebookIcon className="w-4 h-4" />
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-600 hover:text-white hover:bg-emerald-500 transition-all duration-200"
          title="Fale no WhatsApp"
        >
          <Send className="w-4 h-4" />
        </a>
      </aside>

      {/* Floating WhatsApp Action Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {showTooltip && (
          <div className="hidden sm:flex items-center gap-2 bg-white text-zinc-800 text-xs font-semibold py-2 px-3.5 rounded-2xl shadow-xl border border-zinc-200 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Dúvidas? Fale com nosso consultor</span>
            <button 
              onClick={() => setShowTooltip(false)}
              className="text-zinc-400 hover:text-zinc-600 ml-1"
              aria-label="Fechar dica"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group"
          title="Conversar pelo WhatsApp"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none group-hover:hidden"></span>
          <MessageCircle className="w-7 h-7 stroke-[2.2]" />
        </a>
      </div>
    </>
  );
}
