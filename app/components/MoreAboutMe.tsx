"use client";

import { useState, useEffect } from "react";
import styles from "./MoreAboutMe.module.css";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SpotlightCard from "./SpotlightCard";
import ShinyText from "./ShinyText";

// Fotos temporales, cámbialas por tus fotos en /public
const photos = [
  "/foto1.jpg",
  "/foto2.jpg",
  "/foto3.jpg"
];

export default function MoreAboutMe() {
  const { t } = useLanguage();
  const m = t.moreAbout;

  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={styles.bentoContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      {/* 1. Galería de Fotos (2 columnas, 2 filas) */}
      <SpotlightCard className={`${styles.bentoCard} ${styles.span2} ${styles.row2} ${styles.galleryCard}`}>
        <div className={styles.sliderContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: "100%", height: "100%", position: "absolute" }}
            >
              <Image
                src={photos[currentPhoto]}
                alt={`Slide ${currentPhoto + 1}`}
                fill
                className={styles.sliderImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </SpotlightCard>

      {/* 2. Personal Info */}
      <SpotlightCard className={`${styles.bentoCard} ${styles.span2}`}>
        <h3 className={styles.cardTitle}>🧍‍♂️ {m.personal.title}</h3>
        <ul className={styles.infoList}>
          <li className={styles.infoItem}><span className={styles.infoIcon}>📍</span> {m.personal.location}</li>
          <li className={styles.infoItem}><span className={styles.infoIcon}>🎓</span> {m.personal.studies}</li>
          <li className={styles.infoItem}><span className={styles.infoIcon}>💼</span> {m.personal.focus}</li>
          <li className={styles.infoItem}><span className={styles.infoIcon}>🎵</span> {m.personal.background}</li>
        </ul>
      </SpotlightCard>

      {/* 3. A qué me dedico */}
      <SpotlightCard className={`${styles.bentoCard} ${styles.span2}`}>
        <h3 className={styles.cardTitle}>🚀 {m.whatIDo.title}</h3>
        <p className={styles.cardText}>{m.whatIDo.p1}</p>
        <p className={styles.cardText}><strong>{m.whatIDo.p2}</strong></p>
      </SpotlightCard>

      {/* 4. Intereses */}
      <SpotlightCard className={`${styles.bentoCard} ${styles.span2}`}>
        <h3 className={styles.cardTitle}>🎨 {m.interests.title}</h3>
        <div className={styles.pills}>
          {m.interests.items.map((item: string) => (
            <span key={item} className={styles.pill}>{item}</span>
          ))}
        </div>
      </SpotlightCard>

      {/* 5. Mentalidad */}
      <SpotlightCard className={`${styles.bentoCard} ${styles.span2}`}>
        <h3 className={styles.cardTitle}>🧠 {m.mindset.title}</h3>
        <p className={styles.cardText}>{m.mindset.p1}</p>
        <p className={styles.cardText}>{m.mindset.p2}</p>
      </SpotlightCard>

      {/* 6. Visión */}
      <SpotlightCard className={`${styles.bentoCard} ${styles.span2}`}>
        <h3 className={styles.cardTitle}>🎯 {m.vision.title}</h3>
        <p className={styles.cardText}>{m.vision.p1}</p>
        <p className={styles.cardText}>{m.vision.p2}</p>
      </SpotlightCard>

      {/* 7. Tiempo Libre */}
      <SpotlightCard className={`${styles.bentoCard} ${styles.span2}`}>
        <h3 className={styles.cardTitle}>⚡ {m.freetime.title}</h3>
        <p className={styles.cardText}>{m.freetime.text}</p>
      </SpotlightCard>

      {/* 8. Frase Final - ShinyText Animation */}
      <div className={`${styles.span4} ${styles.quoteArea}`}>
        <ShinyText
          text={m.quote}
          speed={3}
          delay={0.5}
          color="#8b5cf6"
          shineColor="#e0e7ff"
          spread={120}
          direction="left"
          yoyo={true}
          pauseOnHover={true}
          className={styles.quoteShiny}
        />
      </div>

    </motion.div>
  );
}
