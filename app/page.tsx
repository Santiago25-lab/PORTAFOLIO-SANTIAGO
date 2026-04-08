import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import ThemeToggle from "./components/ThemeToggle";
import { IconGradient, HtmlIcon, CssIcon, JsIcon, ReactIcon, NodejsIcon, GitIcon, LinkedinIcon, TwitterIcon, InstagramIcon, GithubIcon } from "./components/Icons";
import AntigravityWrapper from "./components/AntigravityWrapper";
import { PROJECTS } from "./data/projects";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  return (
    <>
      <div className={styles.canvasContainer}>
        <AntigravityWrapper
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#8b5cf6"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      <div className={styles.pageContainer}>
        <IconGradient />

        <nav className={styles.navbar}>
          <div className={styles.logo}>Portafolio Personal</div>
          <div className={styles.navLinks}>
            <Link href="/" className={`${styles.navLink}`}>
              Inicio
            </Link>
            <Link href="#about" className={`${styles.navLink} ${styles.active}`}>
              Sobre Mí
            </Link>
            <Link href="#projects" className={styles.navLink}>
              Proyectos
            </Link>
            <Link href="#contact" className={styles.navLink}>
              Contacto
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        <main>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <span className={styles.greeting}>Hola, mi nombre es</span>
                <h1 className={styles.title}>Santiago.</h1>
                <h2 className={styles.subtitle}>Ingeniero de Software.</h2>
                <p className={styles.description}>
                  Me especializo en crear (y ocasionalmente diseñar) experiencias
                  digitales excepcionales. Actualmente estoy enfocado en construir
                  productos accesibles y centrados en el usuario.
                </p>

                <div className={styles.buttonGroup}>
                  <button className={styles.primaryBtn}>Ver mis trabajos</button>
                  <button className={styles.secondaryBtn}>Contactarme</button>
                </div>
              </div>

              <div className={styles.heroImageContainer}>
                <div className={styles.imageGlow}></div>
                <Image
                  src="/profile.jpg"
                  alt="Santiago - Desarrollador Web"
                  width={400}
                  height={400}
                  className={styles.profileImage}
                  priority
                />
              </div>
            </div>
          </section>

          <section id="about" className={styles.about}>
            <h2 className={styles.sectionTitle}>Sobre <span className={styles.highlight}>Mí</span></h2>

            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <p>¡Hola! Soy Santiago, un apasionado por la tecnología y el desarrollo web. Disfruto construyendo cosas para internet, desde sitios web simples hasta aplicaciones interactivas complejas.</p>
                <p>Mi objetivo principal es siempre crear experiencias que sean rápidas, accesibles y visualmente atractivas, utilizando las mejores prácticas de la industria.</p>
                <p>Aquí hay algunas tecnologías con las que he estado trabajando recientemente:</p>
              </div>

              <div className={styles.techGrid}>
                <div className={styles.techCard}>
                  <HtmlIcon className={styles.techIcon} />
                  <span>HTML5</span>
                </div>
                <div className={styles.techCard}>
                  <CssIcon className={styles.techIcon} />
                  <span>CSS3</span>
                </div>
                <div className={styles.techCard}>
                  <JsIcon className={styles.techIcon} />
                  <span>JavaScript</span>
                </div>
                <div className={styles.techCard}>
                  <ReactIcon className={styles.techIcon} />
                  <span>React</span>
                </div>
                <div className={styles.techCard}>
                  <NodejsIcon className={styles.techIcon} />
                  <span>Node.js</span>
                </div>
                <div className={styles.techCard}>
                  <GitIcon className={styles.techIcon} />
                  <span>Git</span>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className={styles.projects}>
            <h2 className={styles.sectionTitle}>
              Mis <span className={styles.gradientText}>Proyectos</span>
            </h2>
            <div className={styles.projectsGrid}>
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          <section id="contact" className={styles.contact}>
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>
                ¿Trabajamos <span className={styles.gradientText}>Juntos?</span>
              </h2>
              <p className={styles.contactDescription}>
                Actualmente estoy abierto a nuevas oportunidades. Si tienes una pregunta o simplemente quieres saludar, ¡haré todo lo posible por responderte!
              </p>
              <a href="mailto:hola@ejemplo.com" className={styles.emailBtn}>
                Escríbeme un email
              </a>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="GitHub" target="_blank"><GithubIcon className={styles.socialIcon} /></a>
            <a href="#" aria-label="LinkedIn" target="_blank"><LinkedinIcon className={styles.socialIcon} /></a>
            <a href="#" aria-label="Twitter" target="_blank"><TwitterIcon className={styles.socialIcon} /></a>
            <a href="#" aria-label="Instagram" target="_blank"><InstagramIcon className={styles.socialIcon} /></a>
          </div>
          <p className={styles.footerText}>
            Diseñado y construido con <span className={styles.heart}>❤️</span> por Santiago
          </p>
          <p className={styles.copyright}>
            &copy; 2026 Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
}
