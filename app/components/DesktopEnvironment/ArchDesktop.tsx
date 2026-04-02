"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import AboutMe from "./apps/AboutMe";
import Projects from "./apps/Projects";

/* ─── Types ─────────────────────────────── */
type AppId = "terminal" | "about" | "projects" | "help";

interface AppState {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
}

interface WorkspaceState {
  apps: Record<AppId, AppState>;
}

const defaultAppState = (): Record<AppId, AppState> => ({
  terminal: { open: false, minimized: false, maximized: false },
  about: { open: false, minimized: false, maximized: false },
  projects: { open: false, minimized: false, maximized: false },
  help: { open: false, minimized: false, maximized: false },
});

const defaultWorkspaces = (): Record<number, WorkspaceState> => {
  const ws: Record<number, WorkspaceState> = {};
  for (let i = 1; i <= 5; i++) ws[i] = { apps: defaultAppState() };
  // Help open by default on workspace 1
  ws[1].apps.help.open = true;
  return ws;
};

const APP_TITLES: Record<AppId, string> = {
  terminal: "kitty — khraos@archlinux: ~",
  about: "~/about.md",
  projects: "~/projects",
  help: "~/help.md",
};

/* ─── Help App ───────────────────────────── */
function HelpApp({ onClose, onMinimize }: { onClose: () => void; onMinimize: () => void }) {
  return (
    <div
      className="fixed z-30 font-mono flex flex-col overflow-hidden"
      style={{
        bottom: "72px",
        right: "16px",
        width: "300px",
        background: "rgba(24, 24, 37, 0.97)",
        border: "1px solid var(--glass-border)",
        borderRadius: "8px",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-3 flex-shrink-0 relative"
        style={{
          height: "32px",
          background: "rgba(30, 30, 46, 0.95)",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <div className="flex items-center gap-2">
          <button className="wctl-btn wctl-close" onClick={onClose} aria-label="Close" />
          <button className="wctl-btn wctl-min" onClick={onMinimize} aria-label="Minimize" />
          <div className="wctl-btn wctl-max" style={{ opacity: 0.2, cursor: "default" }} />
        </div>
        <span
          className="absolute left-1/2 -translate-x-1/2 text-xs select-none"
          style={{ color: "var(--subtext0)" }}
        >
          ~/help.md
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-4" style={{ fontSize: "11px" }}>

        {/* Apps */}
        <div className="flex flex-col gap-2">
          <div style={{ color: "var(--mauve)", fontWeight: 600, fontSize: "11px" }}>
            ## apps
          </div>
          {[
            ["⌨", "terminal", "interactive shell, run commands"],
            ["◉", "about me", "who i am, skills, setup, contact"],
            ["⬡", "projects", "browse my projects"],
            ["?", "help", "this window"],
          ].map(([icon, name, desc]) => (
            <div key={name} className="flex gap-2">
              <span style={{ color: "var(--overlay1)", minWidth: "14px" }}>{icon}</span>
              <span style={{ color: "var(--lavender)", minWidth: "72px" }}>{name}</span>
              <span style={{ color: "var(--subtext0)" }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ height: "1px", background: "var(--surface0)" }} />

        {/* Window controls */}
        <div className="flex flex-col gap-2">
          <div style={{ color: "var(--mauve)", fontWeight: 600, fontSize: "11px" }}>
            ## window
          </div>
          {[
            ["🔴", "close app"],
            ["🟡", "minimize to dock"],
            ["🟢", "maximize / restore"],
            ["drag", "move terminal window"],
          ].map(([key, desc]) => (
            <div key={key} className="flex gap-2">
              <span style={{ color: "var(--lavender)", minWidth: "52px" }}>{key}</span>
              <span style={{ color: "var(--subtext0)" }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ height: "1px", background: "var(--surface0)" }} />

        {/* Keybinds */}
        <div className="flex flex-col gap-2">
          <div style={{ color: "var(--mauve)", fontWeight: 600, fontSize: "11px" }}>
            ## keybinds
          </div>
          {[
            ["Alt+Shift+Ctrl+1..5", "switch workspace"],
          ].map(([key, desc]) => (
            <div key={key} className="flex flex-col gap-0.5">
              <span
                className="px-1.5 py-0.5 text-xs"
                style={{
                  background: "var(--surface0)",
                  color: "var(--green)",
                  borderRadius: "3px",
                  display: "inline-block",
                  width: "fit-content",
                  fontSize: "10px",
                }}
              >
                {key}
              </span>
              <span style={{ color: "var(--subtext0)" }}>{desc}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ─── Terminal ───────────────────────────── */
interface TermLine {
  content: React.ReactNode;
}

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
          {["--crust","--mantle","--base","--surface0","--surface1","--surface2"].map((c) => (
            <div key={c} style={{ width: 14, height: 14, borderRadius: 2, background: `var(${c})`, border: "1px solid rgba(255,255,255,0.1)" }} />
          ))}
        </div>
        <div className="flex gap-1">
          {["--red","--peach","--yellow","--green","--teal","--blue","--mauve"].map((c) => (
            <div key={c} style={{ width: 14, height: 14, borderRadius: 2, background: `var(${c})` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const BANNER: TermLine[] = [
  { content: <NeofetchOutput /> },
  { content: <span className="term-comment text-xs"># type &apos;help&apos; for available commands</span> },
  { content: <span /> },
];

const COMMANDS: Record<string, () => TermLine[]> = {
  help: () => [{
    content: (
      <div className="flex flex-col gap-0.5 text-xs my-1">
        <div style={{ color: "var(--mauve)", fontWeight: 600 }}>Available commands</div>
        {[["whoami","about me"],["skills","tech stack"],["projects","my projects"],["contact","reach out"],["pwd","current directory"],["uname -a","system info"],["ls","list directory"],["clear","clear terminal"]].map(([cmd, desc]) => (
          <div key={cmd} className="flex gap-3 pl-2">
            <span style={{ color: "var(--green)", minWidth: "80px" }}>{cmd}</span>
            <span style={{ color: "var(--overlay1)" }}>{desc}</span>
          </div>
        ))}
      </div>
    ),
  }],
  whoami: () => [{
    content: (
      <div className="flex flex-col gap-1 text-xs my-1 pl-2">
        {[["name","Khraos"],["loc","Hyderabad, India"],["focus","CyberSec & OSDev"],["status","hacking..."]].map(([k, v]) => (
          <div key={k}>
            <span style={{ color: "var(--lavender)" }}>{k} </span>
            <span style={{ color: k === "status" ? "var(--green)" : "var(--text)" }}>{v}</span>
          </div>
        ))}
      </div>
    ),
  }],
  skills: () => [{
    content: (
      <div className="flex flex-col gap-1 text-xs my-1 pl-2">
        {[["Systems","C, x86 Assembly, Rust"],["OOP","Java, C++"],["Web","Next.js, TypeScript"],["OS","Linux, Arch"],["Security","CyberSec, Reverse Engineering"]].map(([cat, val]) => (
          <div key={cat} className="flex gap-3">
            <span style={{ color: "var(--blue)", minWidth: "72px" }}>{cat}</span>
            <span style={{ color: "var(--text)" }}>{val}</span>
          </div>
        ))}
      </div>
    ),
  }],
  projects: () => [{
    content: (
      <div className="flex flex-col gap-2 text-xs my-1 pl-2">
        {[["neolithic-age","Minecraft Forge mod — Java"],["khraos.in","Self-hosted home server — Linux"]].map(([name, desc]) => (
          <div key={name}>
            <div style={{ color: "var(--mauve)", fontWeight: 600 }}>{name}</div>
            <div style={{ color: "var(--subtext0)" }}>{desc}</div>
          </div>
        ))}
      </div>
    ),
  }],
  contact: () => [{
    content: (
      <div className="flex flex-col gap-1 text-xs my-1 pl-2">
        {[["email","khraos@khraos.in"],["github","github.com/khraosgenetor"],["site","khraos.in"]].map(([k, v]) => (
          <div key={k}>
            <span style={{ color: "var(--lavender)" }}>{k} </span>
            <span style={{ color: "var(--blue)" }}>{v}</span>
          </div>
        ))}
      </div>
    ),
  }],
  pwd: () => [{ content: <span className="text-xs term-output pl-2">/home/khraos</span> }],
  "uname -a": () => [{ content: <span className="text-xs term-output pl-2">Linux archlinux 6.13.7-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</span> }],
  ls: () => [{
    content: (
      <div className="flex gap-4 text-xs my-1 pl-2 flex-wrap">
        {[{name:"projects/",color:"var(--blue)"},{name:"scripts/",color:"var(--blue)"},{name:".config/",color:"var(--blue)"},{name:"README.md",color:"var(--text)"},{name:".dotfiles/",color:"var(--blue)"}].map(({name,color}) => (
          <span key={name} style={{ color }}>{name}</span>
        ))}
      </div>
    ),
  }],
};

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

function KittyTerminal({ onClose, onMinimize, onMaximize, maximized }: {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  maximized: boolean;
}) {
  const [lines, setLines] = useState<TermLine[]>([...BANNER]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);

  const dragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setPos({ x: Math.max(0, (w - 760) / 2), y: Math.max(40, (h - 480) / 2) });
    setInitialized(true);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (maximized) return;
    dragging.current = true;
    dragStart.current = { mx: e.clientX, my: e.clientY, wx: pos.x, wy: pos.y };
    e.preventDefault();
  }, [maximized, pos]);

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
    const promptLine: TermLine = { content: <PromptLine cmd={raw} /> };
    if (!cmd) { setLines((l) => [...l, promptLine]); return; }
    if (cmd === "clear" || cmd === "cls") { setLines([]); return; }
    const handler = COMMANDS[cmd];
    if (handler) {
      setLines((l) => [...l, promptLine, ...handler()]);
    } else {
      setLines((l) => [...l, promptLine, {
        content: <span className="term-error text-xs pl-2">bash: {raw}: command not found</span>,
      }]);
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
      setInput(next === -1 ? "" : (cmdHistory[next] ?? ""));
    }
  };

  if (!initialized) return null;

  const windowStyle = maximized
    ? { position: "fixed" as const, top: "40px", left: 0, right: 0, bottom: 0, width: "auto", height: "auto", borderRadius: 0 }
    : { position: "fixed" as const, left: pos.x, top: pos.y, width: 760, height: 480, borderRadius: "8px" };

  return (
    <div className="glass-window flex flex-col z-20 overflow-hidden" style={windowStyle}>
      <div
        className="glass-titlebar flex items-center justify-between px-3 flex-shrink-0 relative"
        style={{ height: "36px", cursor: maximized ? "default" : "move" }}
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <button className="wctl-btn wctl-close" onClick={onClose} aria-label="Close" />
          <button className="wctl-btn wctl-min" onClick={onMinimize} aria-label="Minimize" />
          <button className="wctl-btn wctl-max" onClick={onMaximize} aria-label="Maximize" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-xs font-mono select-none" style={{ color: "var(--subtext0)" }}>
          kitty — khraos@archlinux: ~
        </span>
        <span className="text-xs font-mono" style={{ color: "var(--overlay1)" }}>fish</span>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 font-mono"
        style={{ background: "rgba(17, 17, 27, 0.95)", fontSize: "12px" }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className="leading-6">{line.content}</div>
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
          <span className="cursor text-xs" style={{ color: "var(--mauve)" }}>|</span>
        </div>
        <div ref={bottomRef} />
      </div>

      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{ height: "22px", background: "rgba(17, 17, 27, 0.9)", borderTop: "1px solid var(--glass-border)", fontSize: "11px" }}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: "var(--green)" }}>● NORMAL</span>
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

/* ─── Dock ───────────────────────────────── */
interface DockApp { id: AppId; label: string; icon: string; }

const DOCK_APPS: DockApp[] = [
  { id: "terminal", label: "Terminal", icon: "⌨" },
  { id: "about", label: "About Me", icon: "◉" },
  { id: "projects", label: "Projects", icon: "⬡" },
  { id: "help", label: "Help", icon: "?" },
];

function Dock({ appStates, onToggle }: { appStates: Record<AppId, AppState>; onToggle: (id: AppId) => void }) {
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2"
      style={{ background: "rgba(24, 24, 37, 0.85)", border: "1px solid var(--glass-border)", borderRadius: "14px", backdropFilter: "blur(20px)" }}
    >
      {DOCK_APPS.map((app) => {
        const state = appStates[app.id];
        const isActive = state.open && !state.minimized;
        return (
          <button
            key={app.id}
            onClick={() => onToggle(app.id)}
            title={app.label}
            aria-label={app.label}
            className="relative flex flex-col items-center gap-1 px-3 py-1.5 transition-all"
            style={{ borderRadius: "8px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <span className="text-xl leading-none select-none" style={{ color: isActive ? "var(--mauve)" : "var(--overlay2)" }}>
              {app.icon}
            </span>
            <span className="text-xs font-mono" style={{ color: "var(--overlay1)", fontSize: "10px" }}>{app.label}</span>
            {state.open && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2" style={{ width: 4, height: 4, borderRadius: "50%", background: isActive ? "var(--mauve)" : "var(--overlay1)" }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Main Desktop ───────────────────────── */
interface HyprlandDesktopProps {
  onTitleChange: (title: string) => void;
  activeWorkspace: number;
  onWorkspaceChange: (ws: number) => void;
}

export default function HyprlandDesktop({ onTitleChange, activeWorkspace, onWorkspaceChange }: HyprlandDesktopProps) {
  const [workspaces, setWorkspaces] = useState<Record<number, WorkspaceState>>(defaultWorkspaces);

  const currentApps = workspaces[activeWorkspace].apps;

  const updateApp = (ws: number, id: AppId, patch: Partial<AppState>) => {
    setWorkspaces((prev) => ({
      ...prev,
      [ws]: {
        ...prev[ws],
        apps: { ...prev[ws].apps, [id]: { ...prev[ws].apps[id], ...patch } },
      },
    }));
  };

  // Derive active title
  useEffect(() => {
    const order: AppId[] = ["terminal", "about", "projects", "help"];
    const focused = order.find((id) => currentApps[id].open && !currentApps[id].minimized);
    onTitleChange(focused ? APP_TITLES[focused] : "khraos.in/");
  }, [currentApps, onTitleChange]);

  // Workspace keybind: Alt+Shift+Ctrl+1..5
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.ctrlKey) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 5) {
          e.preventDefault();
          onWorkspaceChange(num);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onWorkspaceChange]);

  const handleDockToggle = (id: AppId) => {
    const state = currentApps[id];
    if (!state.open) {
      updateApp(activeWorkspace, id, { open: true, minimized: false });
    } else if (state.minimized) {
      updateApp(activeWorkspace, id, { minimized: false });
    } else {
      updateApp(activeWorkspace, id, { minimized: true });
    }
  };

  const visible = (id: AppId) => currentApps[id].open && !currentApps[id].minimized;

  return (
    <div className="hypr-wallpaper fixed inset-0 font-mono" style={{ paddingTop: "40px" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(180,190,254,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      {visible("terminal") && (
        <KittyTerminal
          onClose={() => updateApp(activeWorkspace, "terminal", { open: false, minimized: false, maximized: false })}
          onMinimize={() => updateApp(activeWorkspace, "terminal", { minimized: true })}
          onMaximize={() => updateApp(activeWorkspace, "terminal", { maximized: !currentApps.terminal.maximized })}
          maximized={currentApps.terminal.maximized}
        />
      )}

      {visible("about") && (
        <AboutMe
          onClose={() => updateApp(activeWorkspace, "about", { open: false, minimized: false, maximized: false })}
          onMinimize={() => updateApp(activeWorkspace, "about", { minimized: true })}
          onMaximize={() => updateApp(activeWorkspace, "about", { maximized: !currentApps.about.maximized })}
          maximized={currentApps.about.maximized}
        />
      )}

      {visible("projects") && (
        <Projects
          onClose={() => updateApp(activeWorkspace, "projects", { open: false, minimized: false, maximized: false })}
          onMinimize={() => updateApp(activeWorkspace, "projects", { minimized: true })}
          onMaximize={() => updateApp(activeWorkspace, "projects", { maximized: !currentApps.projects.maximized })}
          maximized={currentApps.projects.maximized}
        />
      )}

      {visible("help") && (
        <HelpApp
          onClose={() => updateApp(activeWorkspace, "help", { open: false, minimized: false, maximized: false })}
          onMinimize={() => updateApp(activeWorkspace, "help", { minimized: true })}
        />
      )}

      <Dock appStates={currentApps} onToggle={handleDockToggle} />
    </div>
  );
}