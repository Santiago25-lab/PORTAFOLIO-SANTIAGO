"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Testimonials.module.css";
import { TESTIMONIALS, Testimonial } from "../data/testimonials";
import { useLanguage } from "../context/LanguageContext";
import GradientText from "./GradientText";

// ─── Star rating ──────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className={styles.stars} aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </div>
  );
}

// ─── Single testimonial card ──────────────────────────────────────────────────
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { lang } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos]         = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      {/* Spotlight overlay */}
      <div
        className={styles.spotlight}
        style={{
          opacity,
          background: `radial-gradient(circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.18), transparent 65%)`,
        }}
      />

      {/* Decorative quote mark */}
      <span className={styles.quoteDecor} aria-hidden="true">&ldquo;</span>

      {/* Stars */}
      <Stars count={testimonial.stars} />

      {/* Quote text */}
      <blockquote className={styles.quote}>
        &ldquo;{testimonial.quote[lang]}&rdquo;
      </blockquote>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Person */}
      <div className={styles.person}>
        <div
          className={styles.avatar}
          style={!testimonial.photo ? { background: testimonial.avatarColor } : undefined}
          aria-hidden="true"
        >
          {testimonial.photo ? (
            <Image
              src={testimonial.photo}
              alt={testimonial.name}
              fill
              style={{ objectFit: "cover", borderRadius: "50%" }}
              sizes="48px"
            />
          ) : (
            testimonial.initials
          )}
        </div>
        <div>
          <p className={styles.name}>{testimonial.name}</p>
          <p className={styles.role}>{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className={styles.section}>
      {/* Section title */}
      <motion.h2
        className={styles.sectionTitle}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {t.testimonials.title}{" "}
        <GradientText
          colors={["#5b86e5", "#c084fc", "#8b5cf6", "#3b82f6", "#5b86e5"]}
          animationSpeed={6}
          yoyo
        >
          {t.testimonials.highlight}
        </GradientText>
      </motion.h2>

      {/* Sub-title */}
      <motion.p
        className={styles.subtitle}
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.1 }}
      >
        {t.testimonials.subtitle}
      </motion.p>

      {/* Cards grid */}
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {TESTIMONIALS.map((testimonial) => (
          <motion.div key={testimonial.id} variants={cardVariants}>
            <TestimonialCard testimonial={testimonial} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
