export interface Project {
  id: string;
  order: string;
  title: string;
  client: string;
  category: string;
  runtime: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  backgroundStyle: "video" | "image";
  brightnessStyle: "bright" | "normal";
}

const projectFiles = import.meta.glob<Omit<Project, "id">>(
  "../content/projects/*.json",
  {
    eager: true,
    import: "default",
  }
);

export const projects: Project[] = Object.entries(projectFiles)
  .map(([filePath, data], idx) => ({
    ...data,
    id: `project-${data.order || idx + 1}-${filePath.split("/").pop()?.replace(".json", "")}`,
  }))
  .sort((a, b) => a.order.localeCompare(b.order, undefined, { numeric: true }));
