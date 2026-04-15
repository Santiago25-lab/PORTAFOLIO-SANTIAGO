/*
 * ============================================================
 *  TESTIMONIALS DATA
 *  ──────────────────────────────────────────────────────────
 *  Reemplaza los datos de ejemplo con los reales.
 *  Cada testimonio tiene:
 *    - name  → Nombre completo
 *    - role  → Cargo y empresa (ej. "CEO · Empresa X")
 *    - initials → 2 letras para el avatar (mientras no hay foto)
 *    - avatarColor → color del avatar (puedes cambiarlo)
 *    - quote → texto en ES e EN
 *    - stars → 1-5
 * ============================================================
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
  photo?: string;   // Ruta de la foto (ej. "/testimonials/ana.jpg") — opcional
  quote: { es: string; en: string };
  stars: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Ana Martínez",               // ← REEMPLAZA con nombre real
    role: "Lead Designer · DesignCo",   // ← REEMPLAZA con cargo y empresa
    initials: "AM",                      // ← REEMPLAZA con iniciales (fallback si no hay foto)
    avatarColor: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    // photo: "/testimonials/ana.jpg",  // ← DESCOMENTA y agrega la ruta de la foto (coloca la imagen en /public/testimonials/)
    quote: {
      es: "Santiago tiene una capacidad increíble para convertir ideas abstractas en interfaces visuales reales. Trabajar con él fue fluido, profesional y con resultados que superaron mis expectativas.",
      en: "Santiago has an incredible ability to turn abstract ideas into real visual interfaces. Working with him was smooth, professional, and the results exceeded my expectations.",
    },
    stars: 5,
  },
  {
    id: "t2",
    name: "Carlos Rivera",              // ← REEMPLAZA con nombre real
    role: "CEO · TechStartup",          // ← REEMPLAZA con cargo y empresa
    initials: "CR",                      // ← REEMPLAZA con iniciales (fallback si no hay foto)
    avatarColor: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    // photo: "/testimonials/carlos.jpg", // ← DESCOMENTA y agrega la ruta de la foto
    quote: {
      es: "Contratamos a Santiago para rediseñar nuestra plataforma web. Entregó en tiempo y forma, con un código limpio y bien documentado. Definitivamente volvería a trabajar con él.",
      en: "We hired Santiago to redesign our web platform. He delivered on time, with clean and well-documented code. I would definitely work with him again.",
    },
    stars: 5,
  },
  {
    id: "t3",
    name: "Laura Ospina",               // ← REEMPLAZA con nombre real
    role: "Docente · Universidad CESMAG", // ← REEMPLAZA con cargo e institución
    initials: "LO",                       // ← REEMPLAZA con iniciales (fallback si no hay foto)
    avatarColor: "linear-gradient(135deg, #10b981, #3b82f6)",
    // photo: "/testimonials/laura.jpg",  // ← DESCOMENTA y agrega la ruta de la foto
    quote: {
      es: "Santiago es un estudiante con una visión clara y una ética de trabajo admirable. Se destaca por ir más allá de lo requerido, siempre buscando la excelencia en cada proyecto.",
      en: "Santiago is a student with a clear vision and an admirable work ethic. He stands out for going beyond what's required, always seeking excellence in every project.",
    },
    stars: 5,
  },
];
