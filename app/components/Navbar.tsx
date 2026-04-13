"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import styles from "../page.module.css";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.logo}>Portafolio Personal</div>
      <div className={styles.navLinks}>
        <Link href="/" className={`${styles.navLink}`}>
          {t.nav.home}
        </Link>
        <Link href="#about" className={styles.navLink}>
          {t.nav.about}
        </Link>
        <Link href="#projects" className={styles.navLink}>
          {t.nav.projects}
        </Link>
        <Link href="#contact" className={styles.navLink}>
          {t.nav.contact}
        </Link>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
