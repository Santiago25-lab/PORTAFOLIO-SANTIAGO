"use client";

import { useRef, useState } from "react";
import styles from "../page.module.css";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { sendEmailAction } from "../actions/sendEmail";
import { useTransition } from "react";
import GradientText from "./GradientText";

export default function Contact() {
  const { t } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (formData: FormData) => {
    setStatus("idle");
    startTransition(async () => {
      const result = await sendEmailAction({}, formData);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    });
  };

  // Spotlight logic
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const spotlightColor = 'rgba(139, 92, 246, 0.15)'; // Luz sutil para esta tarjeta

  return (
    <section id="contact" className={styles.contact}>
      <motion.div 
        ref={divRef as any}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.contactCard}
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        tabIndex={0}
      >
        <div
          className={styles.spotlightOverlayContact}
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
          }}
        />

        <div className={styles.contactCardInner}>
          <h2 className={styles.contactTitle}>
            {t.contact.title}{" "}
              <GradientText colors={["#5b86e5", "#c084fc", "#8b5cf6", "#3b82f6", "#5b86e5"]} animationSpeed={6} yoyo={true}>
                {t.contact.highlight}
              </GradientText>
          </h2>
          <p className={styles.contactDescription}>
            {t.contact.description}
          </p>

          {status === "success" ? (
            <p className={styles.successMsg}>{t.form.success}</p>
          ) : (
             <form action={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <input 
                  type="text" 
                  name="name" 
                  placeholder={t.form.name} 
                  required 
                  className={styles.input} 
                  disabled={isPending}
                />
              </div>
              <div className={styles.formGroup}>
                <input 
                  type="email" 
                  name="email" 
                  placeholder={t.form.email} 
                  required 
                  className={styles.input} 
                  disabled={isPending}
                />
              </div>
              <div className={styles.formGroup}>
                <textarea 
                  name="message" 
                  placeholder={t.form.message} 
                  required 
                  className={styles.textarea}
                  disabled={isPending}
                ></textarea>
              </div>
              <button type="submit" className={styles.submitBtn} disabled={isPending}>
                {isPending ? t.form.sending : t.form.send}
              </button>

              {status === "error" && <p className={styles.errorMsg}>{t.form.error}</p>}
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
