"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectCard.module.css";
import { Project } from "../data/projects";
import { GithubIcon, ExternalLinkIcon, ImageIcon } from "./Icons";
import { useLanguage } from "../context/LanguageContext";

export default function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLanguage();
  
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

  // Color de la luz, usa el púrpura del tema del portafolio interpolado
  const spotlightColor = 'rgba(139, 92, 246, 0.25)';

  return (
    <div 
      className={styles.card}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0} // Para que onFocus funcione si navega con teclado
    >
      <div
        className={styles.spotlightOverlay}
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
        }}
      />
      
      <div className={styles.cardInner}>
        <div className={styles.imageWrapper}>
          {project.image ? (
            <Image 
              src={project.image} 
              alt={project.title[lang]} 
              fill 
              className={styles.image} 
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className={styles.placeholder}>
              <ImageIcon className={styles.placeholderIcon} />
            </div>
          )}
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>{project.title[lang]}</h3>
          <p className={styles.description}>{project.description[lang]}</p>
          
          <div className={styles.tags}>
            {project.technologies.map(tech => (
              <span key={tech} className={styles.tag}>{tech}</span>
            ))}
          </div>
          
          <div className={styles.links}>
            <Link 
              href={project.githubUrl || "#"} 
              className={styles.linkBtn} 
              target={project.githubUrl ? "_blank" : undefined} 
              aria-label={`GitHub`}
            >
              <GithubIcon className={styles.icon} />
              <span>{t.projects.code}</span>
            </Link>
            
            <Link 
              href={project.liveUrl || "#"} 
              className={styles.linkBtn} 
              target={project.liveUrl ? "_blank" : undefined} 
              aria-label={`Live Demo`}
            >
              <ExternalLinkIcon className={styles.icon} />
              <span>{t.projects.demo}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
