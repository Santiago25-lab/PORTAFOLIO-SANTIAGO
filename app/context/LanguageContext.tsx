"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Language, Dictionary } from "../i18n/dictionaries";

interface LanguageContextType {
  lang: Language;
  t: Dictionary;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('es');

  // Load initial preference
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'es' || saved === 'en')) {
      setLang(saved);
    }
  }, []);

  const toggleLanguage = () => {
    setLang(prev => {
      const newLang = prev === 'es' ? 'en' : 'es';
      localStorage.setItem('language', newLang);
      return newLang;
    });
  };

  const t = dictionaries[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
