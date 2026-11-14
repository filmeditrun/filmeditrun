import workPage from "../content/pages/work.json";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  videoUrl: string;
  thumbnail: string;
}

interface RawProject {
  title: string;
  client: string;
  category: string;
  videoUrl: string;
  thumbnail: string;
}

const rawProjects = ((workPage as any).projects || []) as RawProject[];

export const projects: Project[] = rawProjects.map((p, idx) => ({
  ...p,
  id: `project-${idx + 1}-${(p.title || `item-${idx + 1}`).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
}));
