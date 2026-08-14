"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import HeroOrbitals from "./HeroOrbitals";

/* ─── Datos personales ─── */
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Santiago25-lab" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/santiago-urbina-172371339/" },
  { label: "Email", href: "mailto:santiagou@example.com" },
];

const LINE1 = "SOFTWARE";
const LINE2 = "ENGINEER";

export default function Hero() {
  return (
    <section className={styles.hero} id="inicio">


      {/* Z-10: Tipografía gigante centrada */}
      <div className={styles.typography}>
        <div className={styles.typographyInner}>
          <div className={styles.typographyLine}>
            <motion.span
              className={`${styles.bigText} ${styles.bigTextAnim}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              {LINE1}
            </motion.span>
          </div>
          <div className={styles.typographyLine}>
            <motion.span
              className={`${styles.bigText} ${styles.bigTextAnim} ${styles.bigTextAnimLine2}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            >
              {LINE2}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Z-25: Íconos flotantes orbitales alrededor de la persona */}
      <HeroOrbitals />

      {/* Z-20: Foto de perfil emergiendo del texto */}
      <motion.div
        className={styles.photoWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        <div className={styles.photoAspect}>
          {/* eslint-disable-next-html-element-suppress */}
          <img
            src="/portrait-new.png"
            alt="Santiago — Software Engineer"
            className={styles.photo}
          />
        </div>
      </motion.div>

      {/* Z-30: Detalles arriba-izquierda */}
      <motion.div
        className={styles.details}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
      >
        {/* Badge "Available for work" */}
        <div className={styles.availableBadge}>
          <span className={styles.pingWrapper}>
            <span className={styles.pingRing} />
            <span className={styles.pingDot} />
          </span>
          <span className={styles.availableText}>Disponible para trabajar</span>
        </div>
      </motion.div>

      {/* Z-30: Redes sociales abajo-izquierda */}
      <motion.div
        className={styles.socials}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
      >
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            {s.label}
          </a>
        ))}
      </motion.div>

      {/* Z-30: Botones CTA abajo-derecha */}
      <motion.div
        className={styles.cta}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
      >
        <a href="#contacto" className={styles.ctaPrimary}>
          Trabajemos Juntos
        </a>
        <a href="#proyectos" className={styles.ctaSecondary}>
          Ver Proyectos
        </a>
      </motion.div>

    </section>
  );
}
