"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useDesktop, type Line } from "../types";

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
export default function KittyTerminal() {
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
