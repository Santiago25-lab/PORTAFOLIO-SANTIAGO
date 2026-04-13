"use client";

import styles from "../page.module.css";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./Icons";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        {/* PEGA TUS LINKS REALES AQUI ABAJO DENTRO DE LAS COMILLAS DE href="" */}
        <a href="https://github.com/Santiago25-lab" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><GithubIcon className={styles.socialIcon} /></a>
        <a href="https://www.linkedin.com/in/santiago-urbina-172371339/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><LinkedinIcon className={styles.socialIcon} /></a>
        <a href="https://www.instagram.com/santiagou2_9/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon className={styles.socialIcon} /></a>
      </div>
      <p className={styles.footerText}>
        {t.footer.madeWith} <span className={styles.heart}>❤️</span> {t.footer.by}
      </p>
      <p className={styles.copyright}>
        &copy; 2026 {t.footer.rights}
      </p>
    </footer>
  );
}
