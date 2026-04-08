import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import ThemeToggle from "./components/ThemeToggle";
import { IconGradient, HtmlIcon, CssIcon, JsIcon, ReactIcon, NodejsIcon, GitIcon } from "./components/Icons";
import AntigravityWrapper from "./components/AntigravityWrapper";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <IconGradient />
      
      <nav className={styles.navbar}>
        <div className={styles.logo}>Santiago.</div>
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

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <span className={styles.greeting}>Hola, mi nombre es</span>
              <h1 className={styles.title}>Santiago.</h1>
              <h2 className={styles.subtitle}>Desarrollador Web.</h2>
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
      </main>
    </div>
  );
}
