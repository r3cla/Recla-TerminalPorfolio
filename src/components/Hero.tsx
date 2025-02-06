
import { useState, useRef, KeyboardEvent } from "react";
import ProfileAvatar from "./ProfileAvatar";
import { executeCommand } from "../utils/commands";

type TerminalEntry = {
  command: string;
  output: string;
  isHTML?: boolean;
};

const Hero = () => {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = () => {
    const command = currentInput.trim();
    if (!command) return;

    const result = executeCommand(command);
    
    if (result.content === 'CLEAR') {
      setEntries([]);
    } else {
      setEntries(prev => [...prev, {
        command,
        output: result.content,
        isHTML: result.isHTML
      }]);
    }
    
    setCurrentInput("");
    
    // Scroll to bottom after new entry
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#222222] rounded-lg overflow-hidden shadow-2xl border border-[#333333]">
        {/* Terminal title bar */}
        <div className="bg-[#333333] px-4 py-2 flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
          <span className="ml-2 text-sm text-gray-400">developer@terminal ~ </span>
        </div>
        
        {/* Terminal content */}
        <div 
          ref={terminalRef}
          className="p-6 space-y-6 max-h-[70vh] overflow-y-auto"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="space-y-4">
            <ProfileAvatar />
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground typing-animation-slow">
                Creative Web Developer
              </h1>
              <p className="text-base md:text-lg text-foreground/70 typing-animation-slower">
                Type 'help' to see available commands
              </p>
            </div>
          </div>

          {/* Previous commands and outputs */}
          {entries.map((entry, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-primary">$</span>
                <span>{entry.command}</span>
              </div>
              {entry.isHTML ? (
                <div dangerouslySetInnerHTML={{ __html: entry.output }} />
              ) : (
                <pre className="whitespace-pre-wrap">{entry.output}</pre>
              )}
            </div>
          ))}
          
          {/* Current input line */}
          <div className="flex items-center space-x-4">
            <span className="text-primary">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-foreground"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
