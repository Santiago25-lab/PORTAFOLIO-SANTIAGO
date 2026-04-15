"use client";

import { useRef, useState, useTransition, Suspense } from "react";
import styles from "../page.module.css";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { sendEmailAction } from "../actions/sendEmail";
import GradientText from "./GradientText";
import LanyardWrapper from "./LanyardWrapper";

// ─── Lanyard placeholder while loading ───────────────────────
function LanyardPlaceholder() {
  return (
    <div className={styles.lanyardPlaceholder}>
      <div className={styles.lanyardSpinner} />
      <p className={styles.lanyardHint}>Cargando animación...</p>
    </div>
  );
}

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
  const [isFocused, setIsFocused]   = useState(false);
  const [position, setPosition]     = useState({ x: 0, y: 0 });
  const [opacity, setOpacity]       = useState(0);

  // Monta el Lanyard solo cuando esta sección entra al viewport
  // → así la tarjeta "cae" justo cuando el usuario llega aquí
  const lanyardRef   = useRef(null);
  const lanyardReady = useInView(lanyardRef, { once: true, margin: "0px 0px -80px 0px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const spotlightColor = "rgba(139, 92, 246, 0.15)";

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contactLayout}>

        {/* ── LEFT: form card ─────────────────────────────── */}
        <motion.div
          ref={divRef as any}
          onMouseMove={handleMouseMove}
          onFocus={() => { setIsFocused(true);  setOpacity(0.6); }}
          onBlur={() =>  { setIsFocused(false); setOpacity(0);   }}
          onMouseEnter={() => setOpacity(0.6)}
          onMouseLeave={() => setOpacity(0)}
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
              background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
            }}
          />

          <div className={styles.contactCardInner}>
            <h2 className={styles.contactTitle}>
              {t.contact.title}{" "}
              <GradientText
                colors={["#5b86e5", "#c084fc", "#8b5cf6", "#3b82f6", "#5b86e5"]}
                animationSpeed={6}
                yoyo
              >
                {t.contact.highlight}
              </GradientText>
            </h2>

            <p className={styles.contactDescription}>{t.contact.description}</p>

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
                  />
                </div>
                <button type="submit" className={styles.submitBtn} disabled={isPending}>
                  {isPending ? t.form.sending : t.form.send}
                </button>

                {status === "error" && (
                  <p className={styles.errorMsg}>{t.form.error}</p>
                )}
              </form>
            )}
          </div>
        </motion.div>

        {/* ── RIGHT: Lanyard 3D ──────────────────────────────── */}
        <motion.div
          ref={lanyardRef}
          className={styles.lanyardContainer}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Solo se monta cuando la sección es visible → la tarjeta cae al entrar */}
          {lanyardReady && (
            <Suspense fallback={<LanyardPlaceholder />}>
              <LanyardWrapper position={[0, 0, 20]} gravity={[0, -40, 0]} fov={20} />
            </Suspense>
          )}
        </motion.div>

      </div>
    </section>
  );
}
