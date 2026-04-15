export interface Project {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  image: string; // URL to the image, empty string for placeholder
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: "ecommerce",
    title: { es: "Landing Page Clon Mercado Libre", en: "Mercado Libre Clone Landing Page" },
    description: { 
      es: "Clon de la página principal de Mercado Libre, replicando su interfaz de usuario y diseño.",
      en: "Clone of the Mercado Libre landing page, replicating its user interface and design."
    },
    image: "/mi-proyecto1.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Santiago25-lab/Mercado_Libre_Clon",
    liveUrl: ""
  },
  {
    id: "task-app",
    title: { es: "App de Tareas Pro", en: "Pro Task App" },
    description: { 
      es: "Aplicación de gestión de tareas con modo oscuro, drag & drop, y sincronización en tiempo real entre múltiples dispositivos.",
      en: "Task management app with dark mode, drag & drop, and real-time synchronization across multiple devices."
    },
    image: "/project-placeholder.png",
    technologies: ["JavaScript", "Firebase", "CSS3"],
    githubUrl: "",
    liveUrl: ""
  },
  {
    id: "spotify-clone",
    title: { es: "Clon de Spotify", en: "Spotify Clone" },
    description: { 
      es: "Una interfaz visual que replica el diseño de Spotify, con reproductor de audio funcional y consumo de la API oficial.",
      en: "A visual interface that replicates the Spotify design, with a functional audio player and consumption of the official API."
    },
    image: "/project-placeholder.png",
    technologies: ["React", "API Rest", "Tailwind"],
    githubUrl: "",
    liveUrl: ""
  }
];
