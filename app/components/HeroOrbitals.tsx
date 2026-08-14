"use client";

import { motion } from "framer-motion";
import styles from "./HeroOrbitals.module.css";
import {
  SiJavascript,
  SiPython,
  SiHtml5,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiGit,
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiDocker,
  SiFigma,
} from "react-icons/si";

/* ─── Configuración de cada tecnología ─── */
const TECHS = [
  { Icon: SiJavascript, color: "#F7DF1E", bg: "rgba(247,223,30,0.14)",  label: "JS",       orbit: 140, duration: 10, startAngle: 0   },
  { Icon: SiPython,     color: "#3776AB", bg: "rgba(55,118,171,0.14)",  label: "Python",   orbit: 190, duration: 15, startAngle: 40  },
  { Icon: SiHtml5,      color: "#E34F26", bg: "rgba(227,79,38,0.14)",   label: "HTML5",    orbit: 140, duration: 12, startAngle: 120 },
  { Icon: SiTailwindcss,color: "#06B6D4", bg: "rgba(6,182,212,0.14)",   label: "Tailwind", orbit: 240, duration: 18, startAngle: 190 },
  { Icon: SiReact,      color: "#61DAFB", bg: "rgba(97,218,251,0.14)",  label: "React",    orbit: 190, duration: 13, startAngle: 260 },
  { Icon: SiNodedotjs,  color: "#339933", bg: "rgba(51,153,51,0.14)",   label: "Node",     orbit: 280, duration: 22, startAngle: 320 },
  { Icon: SiTypescript, color: "#3178C6", bg: "rgba(49,120,198,0.14)",  label: "TS",       orbit: 240, duration: 16, startAngle: 80  },
  { Icon: SiGit,        color: "#F05032", bg: "rgba(240,80,50,0.14)",   label: "Git",      orbit: 280, duration: 24, startAngle: 150 },
  { Icon: SiNextdotjs,  color: "#FFFFFF", bg: "rgba(255,255,255,0.14)", label: "Next.js",  orbit: 320, duration: 26, startAngle: 210 },
  { Icon: SiPostgresql, color: "#4169E1", bg: "rgba(65,105,225,0.14)", label: "Postgres", orbit: 320, duration: 28, startAngle: 30  },
  { Icon: SiDocker,     color: "#2496ED", bg: "rgba(36,150,237,0.14)", label: "Docker",   orbit: 360, duration: 30, startAngle: 300 },
  { Icon: SiFigma,      color: "#F24E1E", bg: "rgba(242,78,30,0.14)",   label: "Figma",    orbit: 360, duration: 32, startAngle: 110 },
];

/* Genera los keyframes (x, y) para una órbita circular */
function orbitKeyframes(radius: number, startDeg: number, steps = 10) {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const deg = startDeg + (360 / steps) * i;
    const rad = (deg * Math.PI) / 180;
    xs.push(Math.cos(rad) * radius);
    ys.push(Math.sin(rad) * radius);
  }
  return { xs, ys };
}

export default function HeroOrbitals() {
  return (
    /* Centro de las órbitas: centrado horizontalmente, ~40% desde el fondo */
    <div className={styles.orbitalRoot}>
      {TECHS.map(({ Icon, color, bg, label, orbit, duration, startAngle }, idx) => {
        const { xs, ys } = orbitKeyframes(orbit, startAngle);
        return (
          <motion.div
            key={label}
            className={styles.orbitalItem}
            animate={{ x: xs, y: ys }}
            transition={{
              duration,
              ease: "linear",
              repeat: Infinity,
              times: xs.map((_, i) => i / (xs.length - 1)),
            }}
            aria-hidden="true"
          >
            <div
              className={styles.badge}
              style={{
                border: `1px solid ${color}33`,
                background: bg,
                boxShadow: `0 0 18px ${color}22`,
              }}
              title={label}
            >
              <Icon color={color} size={22} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
