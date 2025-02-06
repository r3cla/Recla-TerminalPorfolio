
import { mywork } from "../commands/mywork";
import { skillsCommand } from "../commands/skills";
import { cowsay } from "../commands/cowsay";
import { CommandOutput, Commands } from "../types/commands";

const commands: Commands = {
  mywork: () => mywork(),
  skills: () => skillsCommand(),
  cowsay: (args) => cowsay(args),
  help: () => ({
    content: `
Available commands:
- mywork: View my project portfolio
- cowsay [message]: Display a cow saying your message
- skills: Display my technical skills
- help: Show this help message
- clear: Clear the terminal
    `,
  }),
  clear: () => ({ content: "CLEAR" }),
};

export const executeCommand = (command: string): CommandOutput => {
  const [cmd, ...args] = command.trim().split(" ");
  const cleanCommand = cmd.toLowerCase();

  const commandFn = commands[cleanCommand];
  if (!commandFn) {
    return {
      content: `Command not found: ${command}. Type 'help' for available commands.`,
    };
  }

  return commandFn(args);
};
