"use client";

import { useState } from "react";
import styles from "../page.module.css";
import { HtmlIcon, CssIcon, JsIcon, ReactIcon, NodejsIcon, GitIcon } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import MoreAboutMe from "./MoreAboutMe";
import GradientText from "./GradientText";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function About() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className={styles.about}>
      <motion.h2 
        className={styles.sectionTitle}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {t.about.title}{" "}
          <GradientText colors={["#5b86e5", "#c084fc", "#8b5cf6", "#3b82f6", "#5b86e5"]} animationSpeed={6} yoyo={true}>
            {t.about.highlight}
          </GradientText>
      </motion.h2>

      <div className={styles.aboutContent}>
        <motion.div 
          className={styles.aboutText}
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </motion.div>

        <motion.div 
          className={styles.techGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className={styles.techCard}>
            <HtmlIcon className={styles.techIcon} />
            <span>HTML5</span>
          </motion.div>
          <motion.div variants={itemVariants} className={styles.techCard}>
            <CssIcon className={styles.techIcon} />
            <span>CSS3</span>
          </motion.div>
          <motion.div variants={itemVariants} className={styles.techCard}>
            <JsIcon className={styles.techIcon} />
            <span>JavaScript</span>
          </motion.div>
          <motion.div variants={itemVariants} className={styles.techCard}>
            <ReactIcon className={styles.techIcon} />
            <span>React</span>
          </motion.div>
          <motion.div variants={itemVariants} className={styles.techCard}>
            <NodejsIcon className={styles.techIcon} />
            <span>Node.js</span>
          </motion.div>
          <motion.div variants={itemVariants} className={styles.techCard}>
            <GitIcon className={styles.techIcon} />
            <span>Git</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Botón "Más Sobre Mí" */}
      <motion.button
        className={styles.moreAboutBtn}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? t.moreAbout.btnHide : t.moreAbout.btnShow}
      </motion.button>

      {/* Bento Grid expandible */}
      <AnimatePresence>
        {isExpanded && <MoreAboutMe />}
      </AnimatePresence>
    </section>
  );
}
