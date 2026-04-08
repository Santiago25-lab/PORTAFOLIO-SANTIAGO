export interface Project {
  id: string;
  title: string;
  description: string;
  image: string; // URL to the image, empty string for placeholder
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: "ecommerce",
    title: "E-Commerce Moderno",
    description: "Una plataforma de comercio electrónico completamente funcional con carrito de compras, integración de pagos y panel de administración.",
    image: "/project-placeholder.png", // Use the generated placeholder
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "#",
    liveUrl: "https://github.com/Santiago25-lab/Mercado_Libre_Clon"
  },
  {
    id: "task-app",
    title: "App de Tareas Pro",
    description: "Aplicación de gestión de tareas con modo oscuro, drag & drop, y sincronización en tiempo real entre múltiples dispositivos.",
    image: "/project-placeholder.png",
    technologies: ["JavaScript", "Firebase", "CSS3"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: "spotify-clone",
    title: "Clon de Spotify",
    description: "Una interfaz visual que replica el diseño de Spotify, con reproductor de audio funcional y consumo de la API oficial.",
    image: "/project-placeholder.png",
    technologies: ["React", "API Rest", "Tailwind"],
    githubUrl: "#",
    liveUrl: "#"
  }
];
