
export type CommandOutput = {
  content: string;
  isHTML?: boolean;
};

export type CommandFunction = (args: string[]) => CommandOutput;

export type Commands = {
  [key: string]: CommandFunction;
};
