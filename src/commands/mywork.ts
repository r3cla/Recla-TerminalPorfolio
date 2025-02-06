
import { projects } from "../config/projects";
import { CommandOutput } from "../types/commands";

export const mywork = (): CommandOutput => {
  const projectLinks = projects
    .map(
      (project) => `
      <div class="flex items-center space-x-2">
        <span class="text-primary">→</span>
        <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">
          ${project.name}
        </a>
      </div>
    `
    )
    .join("");

  return {
    content: `
      <div class="space-y-2">
        ${projectLinks}
      </div>
    `,
    isHTML: true,
  };
};
