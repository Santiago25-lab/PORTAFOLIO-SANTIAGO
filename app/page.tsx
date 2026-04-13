import styles from "./page.module.css";
import AntigravityWrapper from "./components/AntigravityWrapper";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsSection from "./components/ProjectsSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { IconGradient } from "./components/Icons";

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
        <Navbar />
        <main>
          <Hero />
          <About />
          <ProjectsSection />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
