export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  runtime: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  backgroundStyle: "video" | "image"; 
  // ➔ NEW NO-CODE BRIGHTNESS CONTROLLER ADDED HERE:
  brightnessStyle: "bright" | "normal"; 
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "FilmEditRun - Showreel",
    client: "Various",
    category: "Commercial / Filming",
    runtime: "0:45",
    description: "High-octane commercial production capturing dynamic night driving sequences across downtown Tokyo.",
    videoUrl: "https://player.vimeo.com/video/828757840?",
    thumbnail: "/images/confetti.png",
    backgroundStyle: "video",
    
    // ➔ TYPE "bright" TO AUTOMATICALLY BYPASS VIMEO'S DARK OVERRIDE LINK:
    brightnessStyle: "bright" 
  },
  {
    id: "project-2",
    title: "Echoes of Silence — Short Film",
    client: "Independent",
    category: "Narrative / Editing",
    runtime: "8:12",
    description: "Atmospheric psychological drama focused on pacing, sound design, and rhythm-driven cuts.",
    videoUrl: "https://vimeo.com",
    thumbnail: "/images/audience.png",
    backgroundStyle: "video",
    
    // ➔ KEEP AS "normal" FOR DRAMATIC, DEEP MOODY FOOTAGE PIECES:
    brightnessStyle: "normal" 
  }
];
