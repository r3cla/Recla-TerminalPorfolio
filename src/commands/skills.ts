
import { skills } from "../config/skills";
import { CommandOutput } from "../types/commands";

export const skillsCommand = (): CommandOutput => {
  const skillBars = skills
    .map(
      (skill) => `
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>${skill.name}</span>
          <span>${skill.percentage}%</span>
        </div>
        <div class="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div class="h-full bg-primary" style="width: ${skill.percentage}%"></div>
        </div>
      </div>
    `
    )
    .join("");

  return {
    content: `
      <div class="space-y-4 max-w-md">
        ${skillBars}
      </div>
    `,
    isHTML: true,
  };
};
