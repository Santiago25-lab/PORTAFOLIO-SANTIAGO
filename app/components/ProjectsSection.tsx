"use client";

import styles from "../page.module.css";
import { PROJECTS } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import GradientText from "./GradientText";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section id="projects" className={styles.projects}>
      <motion.h2 
        className={styles.sectionTitle}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        {t.projects.title}{" "}
          <GradientText colors={["#5b86e5", "#c084fc", "#8b5cf6", "#3b82f6", "#5b86e5"]} animationSpeed={6} yoyo={true}>
            {t.projects.highlight}
          </GradientText>
      </motion.h2>
      <motion.div 
        className={styles.projectsGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {PROJECTS.map((project) => (
          <motion.div key={project.id} variants={cardVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
