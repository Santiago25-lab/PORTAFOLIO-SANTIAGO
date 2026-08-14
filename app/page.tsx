import styles from "./page.module.css";
import AntigravityWrapper from "./components/AntigravityWrapper";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsSection from "./components/ProjectsSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { IconGradient } from "./components/Icons";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      {/* Canvas de partículas — fixed, detrás de todo */}
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

      <IconGradient />

      {/* Navbar fixed — flota sobre todo */}
      <Navbar />

      {/* Hero full-width — fuera del contenedor con padding */}
      <Hero />

      {/* Resto de secciones dentro del wrapper centrado */}
      <div className={styles.pageContainer}>
        <main>
          <About />
          <ProjectsSection />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
