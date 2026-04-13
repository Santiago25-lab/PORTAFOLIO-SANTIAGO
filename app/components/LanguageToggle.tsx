"use client";

import { useLanguage } from "../context/LanguageContext";
import styles from "./ThemeToggle.module.css";

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage} 
      className={styles.themeToggle}
      aria-label="Toggle Language"
    >
      <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-outfit)' }}>
        {lang === 'es' ? 'EN' : 'ES'}
      </span>
    </button>
  );
}
