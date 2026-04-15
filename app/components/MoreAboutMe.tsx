"use client";

import { useState, useEffect } from "react";
import styles from "./MoreAboutMe.module.css";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ShinyText from "./ShinyText";
import { User, MapPin, GraduationCap, Briefcase, Music, Rocket, Palette, Brain, Target, Zap } from "lucide-react";

const photos = ["/foto1.jpg", "/foto2.jpg", "/foto3.jpg"];

const SPOTLIGHT_COLOR = "rgba(139, 92, 246, 0.22)";

// ─── SpotlightMotionCard ─────────────────────────────────────────────────────
// Combines Framer Motion layoutId (expand animation) with the spotlight
// cursor-follow effect used in the Contact and Projects sections.
function SpotlightMotionCard({
  layoutId,
  className,
  onClick,
  cardStyle,
  children,
}: {
  layoutId: string;
  className?: string;
  onClick?: () => void;
  cardStyle?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity]   = useState(0);

  return (
    <motion.div
      layoutId={layoutId}
      className={className}
      style={cardStyle}
      onClick={onClick}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      whileHover={{ scale: 1.02 }}
      transition={{ layout: spring }}
    >
      {/* Spotlight radial gradient */}
      <div
        className={styles.spotlightOverlay}
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${SPOTLIGHT_COLOR}, transparent 70%)`,
        }}
      />
      {/* Content (above overlay via z-index) */}
      <div className={styles.cardContent}>
        {children}
      </div>
    </motion.div>
  );
}

type CardId = "gallery" | "personal" | "whatIDo" | "interests" | "mindset" | "vision" | "freetime";

const spring = { type: "spring" as const, damping: 30, stiffness: 300 };

// ─── Gallery expanded ────────────────────────────────────────────────────────
function GalleryExpanded({
  currentPhoto,
  setCurrentPhoto,
}: {
  currentPhoto: number;
  setCurrentPhoto: (n: number) => void;
}) {
  return (
    <div className={styles.galleryExpanded}>
      <div className={styles.galleryMainPhoto}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={photos[currentPhoto]}
              alt={`Foto ${currentPhoto + 1}`}
              fill
              style={{ objectFit: "cover", borderRadius: "14px" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.galleryControls}>
        <button
          className={styles.galleryBtn}
          onClick={() =>
            setCurrentPhoto((currentPhoto - 1 + photos.length) % photos.length)
          }
        >
          ‹
        </button>

        <div className={styles.galleryDots}>
          {photos.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentPhoto ? styles.dotActive : ""}`}
              onClick={() => setCurrentPhoto(i)}
            />
          ))}
        </div>

        <button
          className={styles.galleryBtn}
          onClick={() => setCurrentPhoto((currentPhoto + 1) % photos.length)}
        >
          ›
        </button>
      </div>
    </div>
  );
}

// ─── Expanded card content ────────────────────────────────────────────────────
function ExpandedContent({
  id,
  m,
  currentPhoto,
  setCurrentPhoto,
}: {
  id: CardId;
  m: any;
  currentPhoto: number;
  setCurrentPhoto: (n: number) => void;
}) {
  switch (id) {
    case "gallery":
      return (
        <GalleryExpanded
          currentPhoto={currentPhoto}
          setCurrentPhoto={setCurrentPhoto}
        />
      );

    case "personal":
      return (
        <>
          <h2 className={styles.expandedTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><User size={28} /> {m.personal.title}</h2>
          <div className={styles.personalGrid}>
            {[
              { icon: <MapPin size={24} />, label: "Ubicación", value: m.personal.location },
              { icon: <GraduationCap size={24} />, label: "Estudios", value: m.personal.studies },
              { icon: <Briefcase size={24} />, label: "Enfoque", value: m.personal.focus },
              { icon: <Music size={24} />, label: "Historia", value: m.personal.background },
            ].map(({ icon, label, value }) => (
              <div key={label} className={styles.personalItem}>
                <span className={styles.personalEmoji} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6" }}>{icon}</span>
                <div>
                  <p className={styles.personalLabel}>{label}</p>
                  <p className={styles.personalValue}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case "whatIDo":
      return (
        <>
          <h2 className={styles.expandedTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Rocket size={28} /> {m.whatIDo.title}</h2>
          <p className={styles.expandedText}>{m.whatIDo.p1}</p>
          <div className={styles.expandedHighlight}>
            <p>{m.whatIDo.p2}</p>
          </div>
        </>
      );

    case "interests":
      return (
        <>
          <h2 className={styles.expandedTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Palette size={28} /> {m.interests.title}</h2>
          <div className={styles.expandedPills}>
            {m.interests.items.map((item: string) => (
              <motion.span
                key={item}
                className={styles.expandedPill}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </>
      );

    case "mindset":
      return (
        <>
          <h2 className={styles.expandedTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Brain size={28} /> {m.mindset.title}</h2>
          <blockquote className={styles.expandedBlockquote}>
            {m.mindset.p1}
          </blockquote>
          <p className={styles.expandedText}>{m.mindset.p2}</p>
        </>
      );

    case "vision":
      return (
        <>
          <h2 className={styles.expandedTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Target size={28} /> {m.vision.title}</h2>
          <p className={styles.expandedText}>{m.vision.p1}</p>
          <p className={styles.expandedText}>{m.vision.p2}</p>
        </>
      );

    case "freetime":
      return (
        <>
          <h2 className={styles.expandedTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Zap size={28} /> {m.freetime.title}</h2>
          <p className={styles.expandedText}>{m.freetime.text}</p>
        </>
      );

    default:
      return null;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MoreAboutMe() {
  const { t } = useLanguage();
  const m = t.moreAbout;

  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [selectedCard, setSelectedCard] = useState<CardId | null>(null);

  // Auto slideshow (paused while gallery is expanded)
  useEffect(() => {
    if (selectedCard === "gallery") return;
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedCard]);

  // Escape to close
  useEffect(() => {
    if (!selectedCard) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCard(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedCard]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedCard ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedCard]);

  const open = (id: CardId) => setSelectedCard(id);
  const close = () => setSelectedCard(null);

  const hiddenWhenSelected = (id: CardId): React.CSSProperties => ({
    opacity: selectedCard === id ? 0 : 1,
    pointerEvents: selectedCard === id ? "none" : "auto",
  });

  return (
    <>
      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <motion.div
        className={styles.bentoContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      >
        {/* 1 · Gallery */}
        <SpotlightMotionCard
          layoutId="card-gallery"
          className={`${styles.bentoCard} ${styles.span2} ${styles.row2} ${styles.galleryCard}`}
          onClick={() => open("gallery")}
          cardStyle={hiddenWhenSelected("gallery")}
        >
          <div className={styles.sliderContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhoto}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{ position: "absolute", inset: 0 }}
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
          <div className={styles.expandHint}>
            <span className={styles.expandIcon}>⤢</span>
          </div>
        </SpotlightMotionCard>

        {/* 2 · Personal */}
        <SpotlightMotionCard
          layoutId="card-personal"
          className={`${styles.bentoCard} ${styles.span2}`}
          onClick={() => open("personal")}
          cardStyle={hiddenWhenSelected("personal")}
        >
          <h3 className={styles.cardTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><User size={20} /> {m.personal.title}</h3>
          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <span className={styles.infoIcon} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6" }}><MapPin size={16} /></span>
              {m.personal.location}
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoIcon} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6" }}><GraduationCap size={16} /></span>
              {m.personal.studies}
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoIcon} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6" }}><Briefcase size={16} /></span>
              {m.personal.focus}
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoIcon} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6" }}><Music size={16} /></span>
              {m.personal.background}
            </li>
          </ul>
          <div className={styles.expandHint}>
            <span className={styles.expandIcon}>⤢</span>
          </div>
        </SpotlightMotionCard>

        {/* 3 · What I do */}
        <SpotlightMotionCard
          layoutId="card-whatIDo"
          className={`${styles.bentoCard} ${styles.span2}`}
          onClick={() => open("whatIDo")}
          cardStyle={hiddenWhenSelected("whatIDo")}
        >
          <h3 className={styles.cardTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Rocket size={20} /> {m.whatIDo.title}</h3>
          <p className={styles.cardText}>{m.whatIDo.p1}</p>
          <p className={styles.cardText}>
            <strong>{m.whatIDo.p2}</strong>
          </p>
          <div className={styles.expandHint}>
            <span className={styles.expandIcon}>⤢</span>
          </div>
        </SpotlightMotionCard>

        {/* 4 · Interests */}
        <SpotlightMotionCard
          layoutId="card-interests"
          className={`${styles.bentoCard} ${styles.span2}`}
          onClick={() => open("interests")}
          cardStyle={hiddenWhenSelected("interests")}
        >
          <h3 className={styles.cardTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Palette size={20} /> {m.interests.title}</h3>
          <div className={styles.pills}>
            {m.interests.items.map((item: string) => (
              <span key={item} className={styles.pill}>
                {item}
              </span>
            ))}
          </div>
          <div className={styles.expandHint}>
            <span className={styles.expandIcon}>⤢</span>
          </div>
        </SpotlightMotionCard>

        {/* 5 · Mindset */}
        <SpotlightMotionCard
          layoutId="card-mindset"
          className={`${styles.bentoCard} ${styles.span2}`}
          onClick={() => open("mindset")}
          cardStyle={hiddenWhenSelected("mindset")}
        >
          <h3 className={styles.cardTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Brain size={20} /> {m.mindset.title}</h3>
          <p className={styles.cardText}>{m.mindset.p1}</p>
          <p className={styles.cardText}>{m.mindset.p2}</p>
          <div className={styles.expandHint}>
            <span className={styles.expandIcon}>⤢</span>
          </div>
        </SpotlightMotionCard>

        {/* 6 · Vision */}
        <SpotlightMotionCard
          layoutId="card-vision"
          className={`${styles.bentoCard} ${styles.span2}`}
          onClick={() => open("vision")}
          cardStyle={hiddenWhenSelected("vision")}
        >
          <h3 className={styles.cardTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Target size={20} /> {m.vision.title}</h3>
          <p className={styles.cardText}>{m.vision.p1}</p>
          <p className={styles.cardText}>{m.vision.p2}</p>
          <div className={styles.expandHint}>
            <span className={styles.expandIcon}>⤢</span>
          </div>
        </SpotlightMotionCard>

        {/* 7 · Free time */}
        <SpotlightMotionCard
          layoutId="card-freetime"
          className={`${styles.bentoCard} ${styles.span2}`}
          onClick={() => open("freetime")}
          cardStyle={hiddenWhenSelected("freetime")}
        >
          <h3 className={styles.cardTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Zap size={20} /> {m.freetime.title}</h3>
          <p className={styles.cardText}>{m.freetime.text}</p>
          <div className={styles.expandHint}>
            <span className={styles.expandIcon}>⤢</span>
          </div>
        </SpotlightMotionCard>

        {/* Quote */}
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

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedCard && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />

            {/* Wrapper to center the expanded card */}
            <div className={styles.modalWrapper}>
              <motion.div
                layoutId={`card-${selectedCard}`}
                className={`${styles.bentoCard} ${styles.expandedCard}`}
                transition={{ layout: spring }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button className={styles.closeBtn} onClick={close} aria-label="Cerrar">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className={styles.expandedInner}>
                  <ExpandedContent
                    id={selectedCard}
                    m={m}
                    currentPhoto={currentPhoto}
                    setCurrentPhoto={setCurrentPhoto}
                  />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
