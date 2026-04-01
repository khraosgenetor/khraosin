"use client";

import { useState, useRef, useCallback, useEffect, createContext, useContext } from "react";

/* ─── Types ─────────────────────────────── */
interface Line {
  content: React.ReactNode;
  raw?: string;
}

type AppId = "terminal" | "about" | "projects";

interface WindowState {
  id: AppId;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  workspace: number;
  pos: { x: number; y: number };
}

/* ─── Desktop Context ───────────────────── */
interface DesktopContextType {
  activeWorkspace: number;
  setActiveWorkspace: (ws: number) => void;
  openWindows: WindowState[];
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  updateWindowPos: (id: AppId, pos: { x: number; y: number }) => void;
  activeWindowTitle: string;
}

const DesktopContext = createContext<DesktopContextType | null>(null);

function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error("useDesktop must be used within DesktopProvider");
  return ctx;
}

/* ─── Neofetch Banner ─────────────────────────────── */
function NeofetchOutput() {
  const info = [
    ["OS", "Arch Linux x86_64"],
    ["Host", "khraos.in"],
    ["Kernel", "6.13.7-arch1-1"],
    ["Shell", "fish 3.7.1 + starship"],
    ["WM", "Hyprland"],
    ["Theme", "Catppuccin Mocha"],
    ["Font", "JetBrains Mono"],
    ["Learning", "K&R C, x86 Assembly"],
    ["Projects", "neolithic-age, khraos.in"],
  ];

  return (
    <div className="flex gap-6 my-1">
      <pre className="text-xs leading-tight flex-shrink-0" style={{ color: "var(--blue)" }}>
        {`      /\\
     /  \\
    /\\   \\
   /  __  \\
  /  (  )  \\
 / __|  |__\\\\
/.'        '.`}
      </pre>
      <div className="flex flex-col gap-0.5 text-xs font-mono">
        <div style={{ color: "var(--mauve)", fontWeight: 700 }}>khraos@archlinux</div>
        <div style={{ color: "var(--surface2)" }}>──────────────────</div>
        {info.map(([k, v]) => (
          <div key={k} className="flex gap-1">
            <span style={{ color: "var(--lavender)", minWidth: "72px" }}>{k}</span>
            <span style={{ color: "var(--overlay0)" }}>~</span>
            <span style={{ color: "var(--text)" }}>{v}</span>
          </div>
        ))}
        <div className="flex gap-1 mt-2">
          {["--crust", "--mantle", "--base", "--surface0", "--surface1", "--surface2"].map((c) => (
            <div
              key={c}
              style={{
                width: 14,
                height: 14,
                borderRadius: 2,
                background: `var(${c})`,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
        <div className="flex gap-1">
          {["--red", "--peach", "--yellow", "--green", "--teal", "--blue", "--mauve"].map((c) => (
            <div key={c} style={{ width: 14, height: 14, borderRadius: 2, background: `var(${c})` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── BANNER lines ─────────────────────────────── */
const BANNER: Line[] = [
  { content: <NeofetchOutput />, raw: "neofetch" },
  {
    content: (
      <span className="term-comment text-xs"># type &apos;help&apos; for available commands</span>
    ),
  },
  { content: <span></span> },
];

/* ─── Commands ───────────────────────────── */
const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    {
      content: (
        <div className="flex flex-col gap-0.5 text-xs my-1">
          <div style={{ color: "var(--mauve)", fontWeight: 600 }}>Available commands</div>
          {[
            ["whoami", "about me"],
            ["skills", "tech stack"],
            ["projects", "my projects"],
            ["contact", "reach out"],
            ["pwd", "current directory"],
            ["uname -a", "system info"],
            ["ls", "list directory"],
            ["clear", "clear terminal"],
          ].map(([cmd, desc]) => (
            <div key={cmd} className="flex gap-3 pl-2">
              <span style={{ color: "var(--green)", minWidth: "80px" }}>{cmd}</span>
              <span style={{ color: "var(--overlay1)" }}>{desc}</span>
            </div>
          ))}
        </div>
      ),
    },
  ],
  whoami: () => [
    {
      content: (
        <div className="flex flex-col gap-1 text-xs my-1 pl-2">
          <div>
            <span style={{ color: "var(--lavender)" }}>name </span>
            <span style={{ color: "var(--text)" }}>Khraos</span>
          </div>
          <div>
            <span style={{ color: "var(--lavender)" }}>loc </span>
            <span style={{ color: "var(--text)" }}>Hyderabad, India</span>
          </div>
          <div>
            <span style={{ color: "var(--lavender)" }}>focus </span>
            <span style={{ color: "var(--text)" }}>CyberSec &amp; OSDev</span>
          </div>
          <div>
            <span style={{ color: "var(--lavender)" }}>status</span>
            <span style={{ color: "var(--green)" }}> hacking...</span>
          </div>
        </div>
      ),
    },
  ],
  skills: () => [
    {
      content: (
        <div className="flex flex-col gap-1 text-xs my-1 pl-2">
          {[
            ["Systems", "C, x86 Assembly, Rust"],
            ["OOP", "Java, C++"],
            ["Web", "Next.js, TypeScript"],
            ["OS", "Linux, Arch, NixOS"],
            ["Security", "CyberSec, Reverse Engineering"],
          ].map(([cat, val]) => (
            <div key={cat} className="flex gap-3">
              <span style={{ color: "var(--blue)", minWidth: "72px" }}>{cat}</span>
              <span style={{ color: "var(--text)" }}>{val}</span>
            </div>
          ))}
        </div>
      ),
    },
  ],
  projects: () => [
    {
      content: (
        <div className="flex flex-col gap-2 text-xs my-1 pl-2">
          <div>
            <div style={{ color: "var(--mauve)", fontWeight: 600 }}>neolithic-age</div>
            <div style={{ color: "var(--subtext0)" }}>Minecraft Forge mod — Java</div>
          </div>
          <div>
            <div style={{ color: "var(--mauve)", fontWeight: 600 }}>khraos.in</div>
            <div style={{ color: "var(--subtext0)" }}>Self-hosted home server — Linux</div>
          </div>
        </div>
      ),
    },
  ],
  contact: () => [
    {
      content: (
        <div className="flex flex-col gap-1 text-xs my-1 pl-2">
          <div>
            <span style={{ color: "var(--lavender)" }}>email </span>
            <span style={{ color: "var(--text)" }}>khraos@khraos.in</span>
          </div>
          <div>
            <span style={{ color: "var(--lavender)" }}>github </span>
            <span style={{ color: "var(--blue)" }}>github.com/khraosgenetor</span>
          </div>
          <div>
            <span style={{ color: "var(--lavender)" }}>site </span>
            <span style={{ color: "var(--blue)" }}>khraos.in</span>
          </div>
        </div>
      ),
    },
  ],
  pwd: () => [{ content: <span className="text-xs term-output pl-2">/home/khraos</span> }],
  "uname -a": () => [
    {
      content: (
        <span className="text-xs term-output pl-2">
          Linux archlinux 6.13.7-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux
        </span>
      ),
    },
  ],
  ls: () => [
    {
      content: (
        <div className="flex gap-4 text-xs my-1 pl-2 flex-wrap">
          {[
            { name: "projects/", color: "var(--blue)" },
            { name: "scripts/", color: "var(--blue)" },
            { name: ".config/", color: "var(--blue)" },
            { name: "README.md", color: "var(--text)" },
            { name: ".dotfiles/", color: "var(--blue)" },
          ].map(({ name, color }) => (
            <span key={name} style={{ color }}>
              {name}
            </span>
          ))}
        </div>
      ),
    },
  ],
};

/* ─── Prompt Line ─────────────────────────── */
function PromptLine({ cmd }: { cmd: string }) {
  return (
    <div className="flex items-center gap-0 text-xs leading-6 font-mono">
      <span className="term-prompt-user">khraos</span>
      <span style={{ color: "var(--overlay1)" }}>@</span>
      <span className="term-prompt-host">archlinux</span>
      <span style={{ color: "var(--overlay1)" }}>:</span>
      <span className="term-prompt-path">~</span>
      <span style={{ color: "var(--overlay1)" }}> </span>
      <span className="term-prompt-arrow">&#10095;</span>
      <span style={{ color: "var(--overlay0)" }}>&nbsp;</span>
      <span style={{ color: "var(--text)" }}>{cmd}</span>
    </div>
  );
}

/* ─── Terminal Window ──────────────────────── */
function KittyTerminal() {
  const { closeApp, minimizeApp, maximizeApp, focusApp, updateWindowPos, openWindows } = useDesktop();
  const windowState = openWindows.find((w) => w.id === "terminal");

  const [lines, setLines] = useState<Line[]>([...BANNER]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [initialized, setInitialized] = useState(false);

  const dragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pos = windowState?.pos ?? { x: 0, y: 0 };
  const maximized = windowState?.maximized ?? false;

  useEffect(() => {
    if (!windowState) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (pos.x === 0 && pos.y === 0) {
      updateWindowPos("terminal", { x: Math.max(80, (w - 760) / 2), y: Math.max(50, (h - 480) / 2) });
    }
    setInitialized(true);
  }, [windowState, pos.x, pos.y, updateWindowPos]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      focusApp("terminal");
      if (maximized) return;
      dragging.current = true;
      dragStart.current = { mx: e.clientX, my: e.clientY, wx: pos.x, wy: pos.y };
      e.preventDefault();
    },
    [maximized, pos, focusApp]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      updateWindowPos("terminal", {
        x: dragStart.current.wx + e.clientX - dragStart.current.mx,
        y: dragStart.current.wy + e.clientY - dragStart.current.my,
      });
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [updateWindowPos]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const promptLine: Line = { content: <PromptLine cmd={raw} />, raw };

    if (!cmd) {
      setLines((l) => [...l, promptLine]);
      return;
    }

    if (cmd === "clear" || cmd === "cls") {
      setLines([]);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      setLines((l) => [...l, promptLine, ...handler()]);
    } else {
      setLines((l) => [
        ...l,
        promptLine,
        {
          content: (
            <span className="term-error text-xs pl-2">bash: {raw}: command not found</span>
          ),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = input;
      setCmdHistory((h) => [val, ...h]);
      setHistIdx(-1);
      runCommand(val);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    }
  };

  const toggleMaximize = () => maximizeApp("terminal");

  if (!initialized || !windowState) return null;

  const windowStyle = maximized
    ? {
        position: "fixed" as const,
        top: "40px",
        left: "72px",
        right: 0,
        bottom: 0,
        width: "auto",
        height: "auto",
        borderRadius: 0,
      }
    : { position: "fixed" as const, left: pos.x, top: pos.y, width: 760, height: 480 };

  return (
    <div
      className="glass-window flex flex-col overflow-hidden"
      style={{ ...windowStyle, zIndex: windowState.zIndex }}
      onClick={() => focusApp("terminal")}
    >
      <div
        className="glass-titlebar flex items-center justify-between px-3 flex-shrink-0"
        style={{ height: "36px", cursor: maximized ? "default" : "move" }}
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center gap-2">
          <button
            className="wctl-btn wctl-close"
            onClick={() => closeApp("terminal")}
            title="Close"
            aria-label="Close"
          />
          <button
            className="wctl-btn wctl-min"
            onClick={() => minimizeApp("terminal")}
            title="Minimize"
            aria-label="Minimize"
          />
          <button
            className="wctl-btn wctl-max"
            onClick={toggleMaximize}
            title="Maximize"
            aria-label="Maximize"
          />
        </div>

        <span
          className="absolute left-1/2 -translate-x-1/2 text-xs font-mono select-none"
          style={{ color: "var(--subtext0)" }}
        >
          kitty — khraos@archlinux: ~
        </span>

        <span className="text-xs font-mono" style={{ color: "var(--overlay1)" }}>
          fish
        </span>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 font-mono"
        style={{ background: "rgba(17, 17, 27, 0.95)", fontSize: "12px" }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className="leading-6">
            {line.content}
          </div>
        ))}

        <div className="flex items-center gap-0 leading-6">
          <PromptLine cmd="" />
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-xs font-mono"
            style={{ color: "var(--text)", caretColor: "var(--mauve)", minWidth: 0 }}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
          <span className="cursor text-xs" style={{ color: "var(--mauve)" }}>
            |
          </span>
        </div>
        <div ref={bottomRef} />
      </div>

      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{
          height: "22px",
          background: "rgba(17, 17, 27, 0.9)",
          borderTop: "1px solid var(--glass-border)",
          fontSize: "11px",
        }}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: "var(--green)" }}> NORMAL</span>
          <span style={{ color: "var(--overlay1)" }}>fish 3.7.1</span>
        </div>
        <div className="flex items-center gap-3">
          <span style={{ color: "var(--overlay1)" }}>utf-8</span>
          <span style={{ color: "var(--lavender)" }}>khraos.in</span>
        </div>
      </div>
    </div>
  );
}

/* ─── About App (Maximized) ──────────────────── */
function AboutApp() {
  const { closeApp, minimizeApp, maximizeApp, focusApp, openWindows } = useDesktop();
  const windowState = openWindows.find((w) => w.id === "about");

  if (!windowState) return null;

  return (
    <div
      className="glass-window flex flex-col overflow-hidden"
      style={{
        position: "fixed",
        top: "40px",
        left: "72px",
        right: 0,
        bottom: 0,
        borderRadius: 0,
        zIndex: windowState.zIndex,
      }}
      onClick={() => focusApp("about")}
    >
      <div
        className="glass-titlebar flex items-center justify-between px-3 flex-shrink-0"
        style={{ height: "36px" }}
      >
        <div className="flex items-center gap-2">
          <button
            className="wctl-btn wctl-close"
            onClick={() => closeApp("about")}
            title="Close"
            aria-label="Close"
          />
          <button
            className="wctl-btn wctl-min"
            onClick={() => minimizeApp("about")}
            title="Minimize"
            aria-label="Minimize"
          />
          <button
            className="wctl-btn wctl-max"
            onClick={() => maximizeApp("about")}
            title="Maximize"
            aria-label="Maximize"
          />
        </div>
        <span
          className="absolute left-1/2 -translate-x-1/2 text-xs font-mono select-none"
          style={{ color: "var(--subtext0)" }}
        >
          About — Khraos
        </span>
        <span className="text-xs font-mono" style={{ color: "var(--overlay1)" }}>
          ~/about.md
        </span>
      </div>

      <div
        className="flex-1 overflow-y-auto p-8"
        style={{ background: "rgba(17, 17, 27, 0.95)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-8 mb-8">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{ background: "var(--surface0)", color: "var(--mauve)" }}
            >
              K
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--mauve)" }}>
                Khraos
              </h1>
              <p className="text-sm mb-4" style={{ color: "var(--subtext0)" }}>
                Hyderabad, India
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                A passionate developer focused on Cybersecurity and Operating System Development.
                Currently learning K&R C and x86 Assembly. Building things that matter.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div
              className="p-4 rounded-lg"
              style={{ background: "var(--surface0)", border: "1px solid var(--glass-border)" }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--lavender)" }}>
                Focus Areas
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "var(--text)" }}>
                <li>Cybersecurity &amp; Reverse Engineering</li>
                <li>Operating System Development</li>
                <li>Systems Programming</li>
                <li>Low-level Computing</li>
              </ul>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ background: "var(--surface0)", border: "1px solid var(--glass-border)" }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--lavender)" }}>
                Current Setup
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  ["OS", "Arch Linux"],
                  ["WM", "Hyprland"],
                  ["Editor", "Neovim"],
                  ["Shell", "Fish + Starship"],
                  ["Theme", "Catppuccin Mocha"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span style={{ color: "var(--blue)" }}>{k}</span>
                    <span style={{ color: "var(--text)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="p-4 rounded-lg"
            style={{ background: "var(--surface0)", border: "1px solid var(--glass-border)" }}
          >
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--lavender)" }}>
              Skills &amp; Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "C",
                "x86 Assembly",
                "Rust",
                "Java",
                "C++",
                "TypeScript",
                "Next.js",
                "Linux",
                "NixOS",
                "Git",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{ background: "var(--surface1)", color: "var(--text)" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="https://github.com/khraosgenetor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm transition-colors"
              style={{
                background: "var(--mauve)",
                color: "var(--crust)",
                fontWeight: 600,
              }}
            >
              GitHub
            </a>
            <a
              href="mailto:khraos@khraos.in"
              className="px-4 py-2 rounded-lg text-sm transition-colors"
              style={{
                background: "var(--surface1)",
                color: "var(--text)",
                border: "1px solid var(--glass-border)",
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Projects Folder (Modal Dialog) ──────────────────── */
function ProjectsFolder() {
  const { closeApp, focusApp, openWindows } = useDesktop();
  const windowState = openWindows.find((w) => w.id === "projects");

  if (!windowState) return null;

  const projects = [
    {
      name: "neolithic-age",
      desc: "Minecraft Forge mod adding prehistoric content",
      tech: "Java, Forge API",
      color: "var(--green)",
      icon: "N",
    },
    {
      name: "khraos.in",
      desc: "Self-hosted home server infrastructure",
      tech: "Linux, Docker, Nginx",
      color: "var(--blue)",
      icon: "K",
    },
    {
      name: "dotfiles",
      desc: "Personal configuration files for Arch + Hyprland",
      tech: "Shell, Lua, Config",
      color: "var(--mauve)",
      icon: "D",
    },
    {
      name: "os-kernel",
      desc: "Experimental x86 kernel written from scratch",
      tech: "C, x86 Assembly",
      color: "var(--peach)",
      icon: "O",
    },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0"
        style={{
          background: "rgba(17, 17, 27, 0.6)",
          backdropFilter: "blur(4px)",
          zIndex: windowState.zIndex - 1,
        }}
        onClick={() => closeApp("projects")}
      />

      {/* Modal window */}
      <div
        className="glass-window flex flex-col overflow-hidden"
        style={{
          position: "fixed",
          top: "64px",
          left: "96px",
          right: "24px",
          bottom: "24px",
          zIndex: windowState.zIndex,
        }}
        onClick={() => focusApp("projects")}
      >
        <div
          className="glass-titlebar flex items-center justify-between px-3 flex-shrink-0"
          style={{ height: "36px" }}
        >
          <div className="flex items-center gap-2">
            <button
              className="wctl-btn wctl-close"
              onClick={() => closeApp("projects")}
              title="Close"
              aria-label="Close"
            />
            <div className="wctl-btn wctl-min" style={{ opacity: 0.5, cursor: "default" }} />
            <div className="wctl-btn wctl-max" style={{ opacity: 0.5, cursor: "default" }} />
          </div>
          <span
            className="absolute left-1/2 -translate-x-1/2 text-xs font-mono select-none"
            style={{ color: "var(--subtext0)" }}
          >
            Projects — ~/projects
          </span>
          <span className="text-xs font-mono" style={{ color: "var(--overlay1)" }}>
            thunar
          </span>
        </div>

        <div
          className="flex-1 overflow-y-auto p-6"
          style={{ background: "rgba(17, 17, 27, 0.95)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.name}
                className="p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.02]"
                style={{
                  background: "var(--surface0)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{ background: proj.color, color: "var(--crust)" }}
                  >
                    {proj.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-sm font-semibold mb-1 truncate"
                      style={{ color: "var(--text)" }}
                    >
                      {proj.name}
                    </h3>
                    <p
                      className="text-xs mb-2 line-clamp-2"
                      style={{ color: "var(--subtext0)" }}
                    >
                      {proj.desc}
                    </p>
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ background: "var(--surface1)", color: "var(--overlay1)" }}
                    >
                      {proj.tech}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-6 p-4 rounded-lg text-center"
            style={{
              background: "var(--surface0)",
              border: "1px dashed var(--surface2)",
            }}
          >
            <span className="text-xs" style={{ color: "var(--overlay1)" }}>
              More projects coming soon...
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Dock (Left Side) ──────────────────── */
function Dock() {
  const { openApp, openWindows, activeWorkspace } = useDesktop();

  const apps = [
    { id: "terminal" as AppId, icon: ">_", label: "Terminal", color: "var(--green)" },
    { id: "about" as AppId, icon: "i", label: "About", color: "var(--blue)" },
    { id: "projects" as AppId, icon: "", label: "Projects", color: "var(--mauve)" },
  ];

  return (
    <div
      className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-2 z-40"
      style={{
        background: "rgba(24, 24, 37, 0.8)",
        backdropFilter: "blur(12px)",
        borderRadius: "0 12px 12px 0",
        border: "1px solid var(--glass-border)",
        borderLeft: "none",
      }}
    >
      {apps.map((app) => {
        const isOpen = openWindows.some((w) => w.id === app.id && w.workspace === activeWorkspace);
        return (
          <button
            key={app.id}
            onClick={() => openApp(app.id)}
            className="relative w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all hover:scale-110"
            style={{
              background: isOpen ? app.color : "var(--surface0)",
              color: isOpen ? "var(--crust)" : app.color,
              border: "1px solid var(--glass-border)",
            }}
            title={app.label}
            aria-label={`Open ${app.label}`}
          >
            {app.icon}
            {isOpen && (
              <div
                className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full"
                style={{ background: app.color }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Main Desktop ───────────────────────── */
export default function HyprlandDesktop() {
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [openWindows, setOpenWindows] = useState<WindowState[]>([
    { id: "terminal", minimized: false, maximized: false, zIndex: 10, workspace: 1, pos: { x: 0, y: 0 } },
  ]);
  const [maxZ, setMaxZ] = useState(10);

  const openApp = useCallback(
    (id: AppId) => {
      setOpenWindows((prev) => {
        const existing = prev.find((w) => w.id === id && w.workspace === activeWorkspace);
        if (existing) {
          // Un-minimize and focus
          setMaxZ((z) => z + 1);
          return prev.map((w) =>
            w.id === id && w.workspace === activeWorkspace
              ? { ...w, minimized: false, zIndex: maxZ + 1 }
              : w
          );
        }
        // Open new window
        setMaxZ((z) => z + 1);
        const defaultMaximized = id === "about";
        return [
          ...prev,
          {
            id,
            minimized: false,
            maximized: defaultMaximized,
            zIndex: maxZ + 1,
            workspace: activeWorkspace,
            pos: { x: 0, y: 0 },
          },
        ];
      });
    },
    [activeWorkspace, maxZ]
  );

  const closeApp = useCallback(
    (id: AppId) => {
      setOpenWindows((prev) => prev.filter((w) => !(w.id === id && w.workspace === activeWorkspace)));
    },
    [activeWorkspace]
  );

  const minimizeApp = useCallback(
    (id: AppId) => {
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === id && w.workspace === activeWorkspace ? { ...w, minimized: true } : w
        )
      );
    },
    [activeWorkspace]
  );

  const maximizeApp = useCallback(
    (id: AppId) => {
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === id && w.workspace === activeWorkspace ? { ...w, maximized: !w.maximized } : w
        )
      );
    },
    [activeWorkspace]
  );

  const focusApp = useCallback(
    (id: AppId) => {
      setMaxZ((z) => z + 1);
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === id && w.workspace === activeWorkspace ? { ...w, zIndex: maxZ + 1 } : w
        )
      );
    },
    [activeWorkspace, maxZ]
  );

  const updateWindowPos = useCallback(
    (id: AppId, pos: { x: number; y: number }) => {
      setOpenWindows((prev) =>
        prev.map((w) => (w.id === id && w.workspace === activeWorkspace ? { ...w, pos } : w))
      );
    },
    [activeWorkspace]
  );

  // Get active window title for waybar
  const activeWindow = openWindows
    .filter((w) => w.workspace === activeWorkspace && !w.minimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  const activeWindowTitle =
    activeWindow?.id === "terminal"
      ? "kitty — khraos@archlinux:~"
      : activeWindow?.id === "about"
        ? "About — Khraos"
        : activeWindow?.id === "projects"
          ? "Projects — ~/projects"
          : "";

  const visibleWindows = openWindows.filter(
    (w) => w.workspace === activeWorkspace && !w.minimized
  );

  // Calculate occupied workspaces
  const occupiedWorkspaces = [...new Set(openWindows.map((w) => w.workspace))];

  return (
    <DesktopContext.Provider
      value={{
        activeWorkspace,
        setActiveWorkspace,
        openWindows,
        openApp,
        closeApp,
        minimizeApp,
        maximizeApp,
        focusApp,
        updateWindowPos,
        activeWindowTitle,
      }}
    >
      <div className="hypr-wallpaper fixed inset-0 font-mono" style={{ paddingTop: "40px" }}>
        {/* Background dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(180,190,254,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Waybar */}
        <Waybar
          activeWorkspace={activeWorkspace}
          setActiveWorkspace={setActiveWorkspace}
          occupiedWorkspaces={occupiedWorkspaces}
          activeWindowTitle={activeWindowTitle}
        />

        {/* Dock */}
        <Dock />

        {/* Windows */}
        {visibleWindows.map((w) => {
          if (w.id === "terminal") return <KittyTerminal key={`${w.id}-${w.workspace}`} />;
          if (w.id === "about") return <AboutApp key={`${w.id}-${w.workspace}`} />;
          if (w.id === "projects") return <ProjectsFolder key={`${w.id}-${w.workspace}`} />;
          return null;
        })}

        {/* Empty workspace hint */}
        {visibleWindows.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="glass-window px-6 py-4 text-center text-sm pointer-events-auto"
              style={{ color: "var(--subtext0)" }}
            >
              <div style={{ color: "var(--mauve)", fontSize: "20px", marginBottom: "8px" }}>
                Workspace {activeWorkspace}
              </div>
              <div>Use the dock to open apps</div>
            </div>
          </div>
        )}
      </div>
    </DesktopContext.Provider>
  );
}

/* ─── Waybar Component ───────────────────── */
function Waybar({
  activeWorkspace,
  setActiveWorkspace,
  occupiedWorkspaces,
  activeWindowTitle,
}: {
  activeWorkspace: number;
  setActiveWorkspace: (ws: number) => void;
  occupiedWorkspaces: number[];
  activeWindowTitle: string;
}) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
      setDate(now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3"
      style={{ height: "40px" }}
      aria-label="Waybar"
    >
      {/* Left: Workspaces + launcher */}
      <div className="flex items-center gap-2">
        <div className="waybar-pill gap-2">
          {[1, 2, 3, 4, 5].map((ws) => (
            <button
              key={ws}
              onClick={() => setActiveWorkspace(ws)}
              className={`ws-dot ${ws === activeWorkspace ? "active" : occupiedWorkspaces.includes(ws) ? "occupied" : ""}`}
              title={`Workspace ${ws}`}
              aria-label={`Switch to workspace ${ws}`}
            />
          ))}
        </div>
        <div
          className="waybar-pill"
          style={{ color: "var(--mauve)", fontWeight: 600, fontSize: "12px" }}
        >
          khraos@archlinux
        </div>
      </div>

      {/* Center: Active window title */}
      <div className="waybar-pill" style={{ fontSize: "12px", color: "var(--subtext1)" }}>
        <span style={{ color: "var(--lavender)" }}></span>
        <span>{activeWindowTitle || "Hyprland"}</span>
      </div>

      {/* Right: Sys tray + clock */}
      <div className="flex items-center gap-2">
        <div className="waybar-pill gap-3">
          <span style={{ color: "var(--green)", fontSize: "11px" }}> ETH</span>
          <span style={{ color: "var(--blue)", fontSize: "11px" }}> 100%</span>
          <span style={{ color: "var(--yellow)", fontSize: "11px" }}> 42C</span>
          <span style={{ color: "var(--overlay1)", fontSize: "11px" }}>arch</span>
        </div>
        <div className="waybar-pill gap-2">
          <span style={{ color: "var(--mauve)" }}></span>
          <span style={{ color: "var(--text)", fontWeight: 500 }}>{time}</span>
          <span style={{ color: "var(--overlay1)" }}>{date}</span>
        </div>
      </div>
    </nav>
  );
}
