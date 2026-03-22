"use client";

import { useState, useRef, useEffect } from "react";

const BANNER: { text: string; color: string }[] = [
  {
    text: "  _  ___                            _____                 _             ",
    color: "text-green-400 text-xs",
  },
  {
    text: " | |/ / |                          / ____|               | |            ",
    color: "text-green-400 text-xs",
  },
  {
    text: " | ' /| |__  _ __ __ _  ___  ___  | |  __  ___ _ __   ___| |_ ___  _ __ ",
    color: "text-green-400 text-xs",
  },
  {
    text: " |  < | '_ \\| '__/ _` |/ _ \\/ __| | | |_ |/ _ \\ '_ \\ / _ \\ __/ _ \\| '__|",
    color: "text-green-400 text-xs",
  },
  {
    text: " | . \\| | | | | | (_| | (_) \\__ \\ | |__| |  __/ | | |  __/ || (_) | |   ",
    color: "text-green-400 text-xs",
  },
  {
    text: " |_|\\_\\_| |_|_|  \\__,_|\\___/|___/  \\_____|\\___/|_| |_|\\___|\\_____/|_|   ",
    color: "text-green-400 text-xs",
  },
  { text: "", color: "" },
  { text: "  user      khraos", color: "text-zinc-400" },
  { text: "  host      khraos.in", color: "text-zinc-400" },
  { text: "  os        Arch Linux", color: "text-zinc-400" },
  { text: "  shell     fish + starship", color: "text-zinc-400" },
  { text: "  wm        Hyprland", color: "text-zinc-400" },
  { text: "  learning  K&R C, x86 Assembly", color: "text-zinc-400" },
  { text: "  projects  neolithic-age, khraos.in", color: "text-zinc-400" },
  { text: "", color: "" },
  { text: "  type 'help' for available commands.", color: "text-zinc-500" },
];

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([{ cmd: "", output: BANNER }]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.setSelectionRange(el.value.length, el.value.length);
    }
  }, [input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function runCommand(cmd: string): { text: string; color: string }[] {
    if (cmd.trim().toLowerCase().startsWith("echo ")) {
      return [{ text: cmd.trim().slice(5), color: "text-zinc-400" }];
    }
    switch (cmd.trim().toLowerCase()) {
      case "help":
        return [
          { text: "available commands:", color: "text-white" },
          { text: "  whoami    — who is this guy", color: "text-zinc-400" },
          { text: "  skills    — what i know", color: "text-zinc-400" },
          { text: "  projects  — my projects", color: "text-zinc-400" },
          { text: "  contact   — get in touch", color: "text-zinc-400" },
          { text: "  clear     — clear the terminal", color: "text-zinc-400" },
          {
            text: "  pwd       — print working directory",
            color: "text-zinc-400",
          },
          { text: "  echo      — print text", color: "text-zinc-400" },
          { text: "  uname -a  — system info", color: "text-zinc-400" },
          { text: "  date      — current date", color: "text-zinc-400" },
          { text: "  neofetch  — show banner", color: "text-zinc-400" },
        ];
      case "whoami":
        return [
          { text: "Khraos", color: "text-white" },
          { text: "Hyderabad, India", color: "text-zinc-400" },
          { text: "Into CyberSec and OSDev.", color: "text-zinc-400" },
        ];
      case "skills":
        return [
          {
            text: "C, x86 Assembly, Java, C++, Rust, Linux, Next.js",
            color: "text-zinc-400",
          },
        ];
      case "projects":
        return [
          {
            text: "neolithic-age — Minecraft Forge mod (Java)",
            color: "text-zinc-400",
          },
          {
            text: "khraos.in — self-hosted home server (Linux)",
            color: "text-zinc-400",
          },
        ];
      case "contact":
        return [
          { text: "email: you@khraos.in", color: "text-zinc-400" },
          { text: "github: github.com/khraos", color: "text-zinc-400" },
        ];
      case "pwd":
        return [{ text: "~/khraos", color: "text-zinc-400" }];

      case "uname -a":
        return [
          {
            text: "Linux khraos 6.x.0 #1 SMP x86_64 GNU/Linux",
            color: "text-zinc-400",
          },
        ];

      case "neofetch":
        return BANNER;

      case "date":
        return [{ text: new Date().toString(), color: "text-zinc-400" }];
      default:
        return [{ text: `command not found: ${cmd}`, color: "text-red-400" }];
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      return;
    }
    if (e.key !== "Enter") return;
    if (!input.trim()) return;
    setCmdHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    if (input.trim() === "clear") {
      setHistory([{ cmd: "", output: BANNER }]);
    } else {
      setHistory((prev) => [
        ...prev,
        { cmd: input, output: runCommand(input) },
      ]);
    }
    setInput("");
  }

  return (
    <div
      tabIndex={0}
      className="min-h-[calc(100vh-57px)] bg-black text-white font-mono text-sm p-6 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((entry, i) => (
        <div key={i} className="mb-1">
          {entry.cmd && (
            <p>
              <span className="text-green-400">~/khraos $</span> {entry.cmd}
            </p>
          )}
          {entry.output.map((line, j) => (
            <pre key={j} className={`${line.color} font-mono leading-tight`}>
              {line.text}
            </pre>
          ))}
        </div>
      ))}
      <div className="flex items-center gap-2">
        <span className="text-green-400">~/khraos $</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="bg-transparent border-none outline-none text-white font-mono text-sm flex-1"
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
