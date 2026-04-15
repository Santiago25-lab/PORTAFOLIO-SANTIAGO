"use client";

import Image from "next/image";
import styles from "../page.module.css";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import GradientText from "./GradientText";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <motion.div
          className={styles.heroText}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={styles.greeting}>{t.hero.greeting}</span>
          <h1 className={styles.title}>{t.hero.name}</h1>
          <h2 className={styles.subtitle}>
            <GradientText
              colors={["#5b86e5", "#c084fc", "#8b5cf6", "#3b82f6", "#5b86e5"]}
              animationSpeed={6}
              yoyo={true}
            >
              {t.hero.role}
            </GradientText>
          </h2>
          <p className={styles.description}>
            {t.hero.description}
          </p>


        </motion.div>

        <motion.div
          className={styles.heroImageContainer}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className={styles.imageGlow}></div>
          <Image
            src="/profile.jpg"
            alt="Santiago - Desarrollador Web"
            width={400}
            height={400}
            className={styles.profileImage}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
