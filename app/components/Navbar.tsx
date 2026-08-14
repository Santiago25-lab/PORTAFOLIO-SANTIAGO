"use client";

import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import styles from "../page.module.css";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <motion.nav 
      className={`${styles.navbar} fixed top-0 left-0 right-0 z-50 px-[5%]`}
      style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.logo}>Portafolio Personal</div>
      <div className={styles.navContent}>
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
        </div>
        <div className={styles.navControls}>
          <LanguageToggle />
        </div>
      </div>
    </motion.nav>
  );
}
