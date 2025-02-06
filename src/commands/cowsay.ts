
import { CommandOutput } from "../types/commands";

const createCowsay = (message: string): string => {
  const maxLength = 40;
  const words = message.split(" ");
  let lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + word).length > maxLength) {
      lines.push(currentLine);
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  });
  if (currentLine) lines.push(currentLine);

  const maxLineLength = Math.max(...lines.map((line) => line.length));
  const top = ` ${"_".repeat(maxLineLength + 2)}`;
  const bottom = ` ${"-".repeat(maxLineLength + 2)}`;
  const formattedLines = lines.map((line) => `| ${line.padEnd(maxLineLength)} |`);

  return `${top}
${formattedLines.join("\n")}${bottom}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
};

export const cowsay = (args: string[]): CommandOutput => {
  const message = args.length > 0 ? args.join(" ") : "Moo! Type a message after cowsay";
  return {
    content: `<pre class="font-mono whitespace-pre-wrap">${createCowsay(message)}</pre>`,
    isHTML: true,
  };
};
