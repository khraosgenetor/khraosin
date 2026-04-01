"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

/* ─── Types ─────────────────────────────── */
interface Line {
  text: string;
  color?: string;
}

interface DesktopIcon {
  id: string;
  label: string;
  icon: string;
  href?: string;
  onDoubleClick?: () => void;
}

/* ─── Banner ─────────────────────────────── */
const BANNER: Line[] = [
  { text: "Microsoft Windows 2000 [Version 5.00.2195]", color: "text-gray-300" },
  { text: "(C) Copyright 1985-2000 Microsoft Corp.", color: "text-gray-300" },
  { text: "", color: "" },
  { text: "C:\\Users\\khraos> neofetch", color: "text-gray-200" },
  { text: "", color: "" },
  { text: "  _  ___                            _____                 _             ", color: "text-green-400 text-xs" },
  { text: " | |/ / |                          / ____|               | |            ", color: "text-green-400 text-xs" },
  { text: " | ' /| |__  _ __ __ _  ___  ___  | |  __  ___ _ __   ___| |_ ___  _ __", color: "text-green-400 text-xs" },
  { text: " |  < | '_ \\| '__/ _` |/ _ \\/ __| | | |_ |/ _ \\ '_ \\ / _ \\ __/ _ \\| '__|", color: "text-green-400 text-xs" },
  { text: " | . \\| | | | | | (_| | (_) \\__ \\ | |__| |  __/ | | |  __/ || (_) | |", color: "text-green-400 text-xs" },
  { text: " |_|\\_\\_| |_|_|  \\__,_|\\___/|___/  \\_____|\\___/|_| |_|\\___|\\____/|_|", color: "text-green-400 text-xs" },
  { text: "", color: "" },
  { text: "  user      khraos", color: "text-gray-300" },
  { text: "  host      khraos.in", color: "text-gray-300" },
  { text: "  os        Arch Linux", color: "text-gray-300" },
  { text: "  shell     fish + starship", color: "text-gray-300" },
  { text: "  wm        Hyprland", color: "text-gray-300" },
  { text: "  learning  K&R C, x86 Assembly", color: "text-gray-300" },
  { text: "  projects  neolithic-age, khraos.in", color: "text-gray-300" },
  { text: "", color: "" },
  { text: "  type 'help' for available commands.", color: "text-gray-500" },
  { text: "", color: "" },
];

/* ─── Commands ───────────────────────────── */
const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    { text: "Available commands:", color: "text-yellow-300" },
    { text: "  whoami    — about me", color: "text-gray-300" },
    { text: "  skills    — my tech skills", color: "text-gray-300" },
    { text: "  projects  — my projects", color: "text-gray-300" },
    { text: "  contact   — contact info", color: "text-gray-300" },
    { text: "  pwd       — current directory", color: "text-gray-300" },
    { text: "  uname -a  — system info", color: "text-gray-300" },
    { text: "  cls       — clear screen", color: "text-gray-300" },
    { text: "", color: "" },
  ],
  whoami: () => [
    { text: "Khraos", color: "text-white" },
    { text: "Hyderabad, India", color: "text-gray-300" },
    { text: "Into CyberSec and OSDev.", color: "text-gray-300" },
    { text: "", color: "" },
  ],
  skills: () => [
    { text: "C, x86 Assembly, Java, C++, Rust, Linux, Next.js", color: "text-gray-300" },
    { text: "", color: "" },
  ],
  projects: () => [
    { text: "neolithic-age — Minecraft Forge mod (Java)", color: "text-gray-300" },
    { text: "khraos.in     — self-hosted home server (Linux)", color: "text-gray-300" },
    { text: "", color: "" },
  ],
  contact: () => [
    { text: "email:  khraos@khraos.in", color: "text-gray-300" },
    { text: "github: github.com/khraosgenetor", color: "text-gray-300" },
    { text: "", color: "" },
  ],
  pwd: () => [
    { text: "C:\\Users\\khraos", color: "text-gray-300" },
    { text: "", color: "" },
  ],
  "uname -a": () => [
    { text: "Linux khraos 6.x.0 #1 SMP x86_64 GNU/Linux", color: "text-gray-300" },
    { text: "", color: "" },
  ],
};

/* ─── Win2K Terminal Window ──────────────── */
function TerminalWindow({
  onMinimize,
  onClose,
}: {
  onMinimize: () => void;
  onClose: () => void;
}) {
  const [lines, setLines] = useState<Line[]>([...BANNER]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [maximized, setMaximized] = useState(false);
  const [pos, setPos] = useState({ x: 80, y: 40 });
  const [size] = useState({ w: 720, h: 440 });

  const dragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (maximized) return;
      dragging.current = true;
      dragStart.current = { mx: e.clientX, my: e.clientY, wx: pos.x, wy: pos.y };
      e.preventDefault();
    },
    [maximized, pos]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setPos({
        x: dragStart.current.wx + e.clientX - dragStart.current.mx,
        y: dragStart.current.wy + e.clientY - dragStart.current.my,
      });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const echo: Line = { text: `C:\\Users\\khraos> ${raw}`, color: "text-gray-200" };

    if (!cmd) {
      setLines((l) => [...l, echo, { text: "", color: "" }]);
      return;
    }

    if (cmd === "cls" || cmd === "clear") {
      setLines([{ text: "C:\\Users\\khraos> cls", color: "text-gray-200" }, { text: "", color: "" }]);
      return;
    }

    const result = COMMANDS[cmd];
    if (result) {
      setLines((l) => [...l, echo, ...result()]);
    } else {
      setLines((l) => [
        ...l,
        echo,
        { text: `'${raw}' is not recognized as an internal or external command.`, color: "text-red-400" },
        { text: "Type 'help' for available commands.", color: "text-gray-500" },
        { text: "", color: "" },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = input;
      setHistory((h) => [val, ...h]);
      setHistoryIdx(-1);
      runCommand(val);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : history[next] ?? "");
    }
  };

  const style = maximized
    ? { position: "fixed" as const, inset: "0 0 38px 0", width: "auto", height: "auto" }
    : {
        position: "fixed" as const,
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
      };

  return (
    <div
      className="win-raised flex flex-col z-20"
      style={{ ...style, fontFamily: "var(--font-jetbrains-mono), 'Courier New', monospace" }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-1 flex-shrink-0"
        style={{
          height: "22px",
          background: "linear-gradient(to right, #0A246A, #3A6EA5)",
          cursor: maximized ? "default" : "move",
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => setMaximized((v) => !v)}
      >
        <div className="flex items-center gap-1">
          <span style={{ fontSize: "12px" }}>💻</span>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "11px",
              fontWeight: "bold",
              fontFamily: "inherit",
              textShadow: "1px 1px 0 #000",
            }}
          >
            Command Prompt — C:\Users\khraos
          </span>
        </div>
        <div className="flex items-center gap-px">
          {/* Minimize */}
          <button
            className="win-button"
            style={{ width: "16px", height: "14px", padding: 0, fontSize: "10px" }}
            onClick={onMinimize}
            title="Minimize"
          >
            _
          </button>
          {/* Maximize */}
          <button
            className="win-button"
            style={{ width: "16px", height: "14px", padding: 0, fontSize: "9px" }}
            onClick={() => setMaximized((v) => !v)}
            title={maximized ? "Restore" : "Maximize"}
          >
            {maximized ? "❐" : "□"}
          </button>
          {/* Close */}
          <button
            className="win-button"
            style={{ width: "16px", height: "14px", padding: 0, fontSize: "10px", fontWeight: "bold" }}
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div
        className="flex items-center gap-4 px-2 flex-shrink-0"
        style={{
          height: "20px",
          background: "var(--win-gray)",
          borderBottom: "1px solid var(--win-shadow)",
          fontSize: "11px",
        }}
      >
        {["File", "Edit", "View", "Help"].map((item) => (
          <span
            key={item}
            className="cursor-pointer hover:bg-[var(--win-selected)] hover:text-[var(--win-selected-text)] px-1"
            style={{ color: "var(--foreground)" }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Terminal Body */}
      <div
        className="flex-1 overflow-y-auto p-2"
        style={{ background: "#000000" }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className={`leading-tight whitespace-pre text-xs font-mono ${line.color ?? "text-gray-300"}`}>
            {line.text || "\u00A0"}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center text-xs font-mono">
          <span className="text-gray-200 whitespace-pre">{"C:\\Users\\khraos> "}</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-gray-200 text-xs font-mono caret-gray-200"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
            style={{ caretColor: "#C0C0C0" }}
          />
          <span className="text-gray-200 cursor">▋</span>
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Status Bar */}
      <div
        className="flex items-center px-2 gap-2 flex-shrink-0"
        style={{
          height: "18px",
          background: "var(--win-gray)",
          borderTop: "1px solid var(--win-shadow)",
        }}
      >
        <div className="win-sunken-panel px-2 flex-1 text-xs" style={{ height: "14px", lineHeight: "14px" }}>
          Ready
        </div>
        <div className="win-sunken-panel px-2 text-xs" style={{ height: "14px", lineHeight: "14px" }}>
          khraos.in
        </div>
      </div>
    </div>
  );
}

/* ─── Desktop Icon ───────────────────────── */
function DesktopIcon({ icon }: { icon: DesktopIcon }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => setSelected((v) => !v);
  const handleDoubleClick = () => {
    if (icon.onDoubleClick) icon.onDoubleClick();
    if (icon.href) window.open(icon.href, "_blank");
  };

  return (
    <div
      className="flex flex-col items-center gap-1 p-1 cursor-pointer w-20"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      title={icon.label}
    >
      <div
        className="flex items-center justify-center text-3xl"
        style={{
          filter: selected ? "brightness(0.5) sepia(1) saturate(3) hue-rotate(190deg)" : "none",
        }}
      >
        {icon.icon}
      </div>
      <span
        className="text-center text-xs leading-tight px-1"
        style={{
          color: "#FFFFFF",
          textShadow: "1px 1px 2px #000000",
          background: selected ? "var(--win-selected)" : "transparent",
          maxWidth: "72px",
          wordBreak: "break-word",
        }}
      >
        {icon.label}
      </span>
    </div>
  );
}

/* ─── Main Desktop ───────────────────────── */
export default function Win2KDesktop() {
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);

  const desktopIcons: DesktopIcon[] = [
    {
      id: "terminal",
      label: "Command Prompt",
      icon: "💻",
      onDoubleClick: () => {
        setTerminalOpen(true);
        setMinimized(false);
      },
    },
    {
      id: "projects",
      label: "My Projects",
      icon: "📁",
      href: "/projects",
    },
    {
      id: "about",
      label: "About",
      icon: "📄",
      href: "/about",
    },
    {
      id: "github",
      label: "GitHub",
      icon: "🐙",
      href: "https://github.com/khraosgenetor",
    },
    {
      id: "recycle",
      label: "Recycle Bin",
      icon: "🗑️",
    },
  ];

  return (
    <div
      className="desktop-bg fixed inset-0"
      style={{ bottom: "38px" }}
    >
      {/* Desktop Icons — left column */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {desktopIcons.map((icon) => (
          <DesktopIcon key={icon.id} icon={icon} />
        ))}
      </div>

      {/* Terminal Window */}
      {terminalOpen && !minimized && (
        <TerminalWindow
          onMinimize={() => setMinimized(true)}
          onClose={() => setTerminalOpen(false)}
        />
      )}

      {/* Restore if minimized / closed */}
      {(!terminalOpen || minimized) && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="text-center"
            style={{ color: "rgba(255,255,255,0.3)", pointerEvents: "none" }}
          >
            <div style={{ fontSize: "48px" }}>💻</div>
            <div className="text-xs mt-1">Double-click icon to reopen terminal</div>
          </div>
        </div>
      )}
    </div>
  );
}
