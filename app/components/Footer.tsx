"use client";

import { GithubIcon, LinkedinIcon, InstagramIcon } from "./Icons";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-16 px-[5%] flex flex-col items-center gap-6 border-t border-[var(--card-border)] mt-8 relative z-10">
      <div className="flex gap-6">
        {/* PEGA TUS LINKS REALES AQUI ABAJO DENTRO DE LAS COMILLAS DE href="" */}
        <a 
          href="https://github.com/Santiago25-lab" 
          aria-label="GitHub" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group"
        >
          <GithubIcon className="w-6 h-6 text-[var(--text-secondary)] transition-all duration-200 group-hover:text-[var(--text-primary)] group-hover:-translate-y-0.5" />
        </a>
        
        <a 
          href="https://www.linkedin.com/in/santiago-urbina-172371339/" 
          aria-label="LinkedIn" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group"
        >
          <LinkedinIcon className="w-6 h-6 text-[var(--text-secondary)] transition-all duration-200 group-hover:text-[var(--text-primary)] group-hover:-translate-y-0.5" />
        </a>

        <a 
          href="https://www.instagram.com/santiagou2_9/" 
          aria-label="Instagram" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group"
        >
          <InstagramIcon className="w-6 h-6 text-[var(--text-secondary)] transition-all duration-200 group-hover:text-[var(--text-primary)] group-hover:-translate-y-0.5" />
        </a>
      </div>
      
      <p className="text-[var(--text-secondary)] text-[0.95rem]">
        {t.footer.madeWith} <span className="text-[#ef4444]">❤️</span> {t.footer.by}
      </p>
      
      <p className="text-[var(--text-secondary)] text-[0.85rem] opacity-70">
        &copy; 2026 {t.footer.rights}
      </p>
    </footer>
  );
}
