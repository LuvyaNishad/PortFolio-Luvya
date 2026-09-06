import type { VisualArtifact } from "@/data/visualArtifacts";

/* ─────────────────────────────────────────────────
   CODE PROJECTS — Showcase Data
   ─────────────────────────────────────────────────
   Layout:
   • Card Preview (before clicking): 4:3 Aspect Ratio (using *43.png)
   • Dossier Modal (after clicking): 16:9 Landscape Banner (using *169.png)
   • 2x2 Grid Layout
   • Sequence: 1. Portfolio, 2. CampusQuest, 3. Leon, 4. PartWork
───────────────────────────────────────────────── */

export const CODE_PROJECTS: VisualArtifact[] = [
  {
    id: "cd-01",
    index: "01",
    type: "code_project",
    aspectRatio: "4/3",
    categoryLabel: "CODE PROJECTS",
    title: "PORTFOLIO",
    titleAccent: "& Design System",
    subtitle: "FE-03 // CREATIVE FRONTEND PLATFORM",
    accent: "#d6d6d8",
    imageSrc: "/images/portfolio43.png",
    modalImageSrc: "/images/portfolio169.png",
    tags: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "UI/UX",
    ],
    specs: [
      {
        label: "ROLE",
        value: "UI/UX Design & Frontend Engineering",
      },
      {
        label: "DATABASE",
        value: "Static / Local Asset Pipeline",
      },
    ],
    collaborators: "Luvya Nishad (Solo Architecture & Creative Direction)",
    overview:
      "A high-performance personal developer and design portfolio built to showcase creative frontend engineering, UI case studies, and brand identity projects. Includes custom interactive modals, high-contrast HUD-style showcases, and smooth page transitions.",
    artDirection:
      "Constructed using Vite and React with an atomic component hierarchy and utility-first styling via Tailwind CSS. Incorporates hardware-accelerated Framer Motion animations, accessible keyboard-navigable modals, and responsive layout scaling across all device viewports.",
    liveUrl: "https://github.com/LuvyaNishad/PortFolio-Luvya",
    liveButtonLabel: "VIEW CODE ↗",
    githubUrl: "https://github.com/LuvyaNishad/PortFolio-Luvya",
  },
  {
    id: "cd-02",
    index: "02",
    type: "code_project",
    aspectRatio: "4/3",
    categoryLabel: "CODE PROJECTS",
    title: "CAMPUSQUEST",
    titleAccent: "(3D Exploration & Navigation)",
    subtitle: "UNITY / C# // 3D NAVIGATION PLATFORM",
    accent: "#c59b4a",
    imageSrc: "/images/campus43.png",
    modalImageSrc: "/images/campus169.png",
    tags: [
      "Unity 6",
      "C#",
      "Unity UI",
      "3D",
      "HCI",
      "AR Research",
      "Git",
    ],
    specs: [
      {
        label: "ROLE",
        value: "Game Development / Navigation Systems / UI & HCI",
      },
      {
        label: "DATABASE",
        value: "N/A (Modular Scene Architecture)",
      },
    ],
    collaborators: "Luvya Nishad (Development & Systems), Yuvraj Singh, Taksh Dalal",
    overview:
      "A gamified 3D campus exploration and navigation system designed to make large campuses easier and more engaging to explore. CampusQuest combines immersive first-person navigation with interactive maps, minimaps, teleportation, directional guidance, location-based quests, and reward progression.",
    artDirection:
      "Built as a modular Unity environment with dedicated systems for player movement, camera control, navigation, quests, UI, teleportation, mapping, and rewards. Large-scene performance is addressed through occlusion culling, scene optimization, selective baking, and dynamic object management, while ongoing research explores AR-based campus experiences.",
    liveUrl: "https://campusquest.demo",
    liveButtonLabel: "PROJECT BUILD ↗",
    githubUrl: "https://github.com/LuvyaNishad",
  },
  {
    id: "cd-03",
    index: "03",
    type: "code_project",
    aspectRatio: "4/3",
    categoryLabel: "CODE PROJECTS",
    title: "LEON",
    titleAccent: "(Gym & Workout Tracker)",
    subtitle: "MOB-01 // MOBILE & FULL-STACK PLATFORM",
    accent: "#c5261a",
    imageSrc: "/images/leon43.png",
    modalImageSrc: "/images/leon169.png",
    tags: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Supabase",
      "PostgreSQL",
      "Hive",
      "Glassmorphism",
    ],
    specs: [
      {
        label: "ROLE",
        value: "Mobile Architecture, UI/UX Design & Full-Stack Development",
      },
      {
        label: "DATABASE",
        value: "Supabase (PostgreSQL) / Hive (Local Offline Storage)",
      },
    ],
    collaborators: "Luvya Nishad (Mobile Architecture & UI/UX Design)",
    overview:
      "A tactical, cyberpunk-inspired strength training and workout tracking application designed around progressive overload principles. Features custom Push/Pull/Legs and custom split builders, live set loggers, plate calculators, and recovery status analytics.",
    artDirection:
      "Engineered using a feature-first modular Flutter architecture paired with a local-first offline caching layer via Hive and real-time cloud persistence with Supabase. Utilizes Riverpod for reactive state management, Freezed for immutable data models, and a custom \"Liquid Glass\" tactical theme with radar charts.",
    inDevelopment: true,
    githubUrl: "https://github.com/LuvyaNishad",
  },
  {
    id: "cd-04",
    index: "04",
    type: "code_project",
    aspectRatio: "4/3",
    categoryLabel: "CODE PROJECTS",
    title: "PARTWORK",
    titleAccent: "(Micro-Internship & Gig Platform)",
    subtitle: "WEB-02 // FULL-STACK DATABASE SYSTEM",
    accent: "#78936f",
    imageSrc: "/images/PW43.png",
    modalImageSrc: "/images/PW169.png",
    tags: [
      "Python",
      "Flask",
      "MySQL",
      "Relational Database",
      "Jinja2",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    specs: [
      {
        label: "ROLE",
        value: "Full-Stack Engineering & Database Architecture",
      },
      {
        label: "DATABASE",
        value: "MySQL (Relational Schema with Views & Complex Queries)",
      },
    ],
    collaborators: "Luvya Nishad, Arsh Ahluwalia, Madhav Gautam",
    overview:
      "A campus-centric part-time work and micro-internship marketplace connecting university students with verified local employers and on-campus gigs. Includes robust job discovery, application tracking, and an administrative moderation portal.",
    artDirection:
      "Built on a Flask MVC framework integrated with a normalized MySQL database schema. Features role-based access control (Student, Employer, Admin), parameterized SQL queries for secure authentication, and server-side rendered dynamic templates for performance and accessibility.",
    githubUrl: "https://github.com/LuvyaNishad",
  },
];
