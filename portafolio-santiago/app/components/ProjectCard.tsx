import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectCard.module.css";
import { Project } from "../data/projects";
import { GithubIcon, ExternalLinkIcon, ImageIcon } from "./Icons";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {project.image ? (
          <Image 
            src={project.image} 
            alt={project.title} 
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
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        
        <div className={styles.tags}>
          {project.technologies.map(tech => (
            <span key={tech} className={styles.tag}>{tech}</span>
          ))}
        </div>
        
        <div className={styles.links}>
          {project.githubUrl && (
            <Link href={project.githubUrl} className={styles.linkIcon} target="_blank" aria-label={`GitHub de ${project.title}`}>
              <GithubIcon className={styles.icon} />
            </Link>
          )}
          {project.liveUrl && (
            <Link href={project.liveUrl} className={styles.linkIcon} target="_blank" aria-label={`Ver online ${project.title}`}>
              <ExternalLinkIcon className={styles.icon} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
