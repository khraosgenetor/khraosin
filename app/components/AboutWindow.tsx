"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface Props {
  onClose: () => void;
  onMinimize: () => void;
  zIndex: number;
  onFocus: () => void;
}

export default function AboutWindow({ onClose, onMinimize, zIndex, onFocus }: Props) {
  const [maximized, setMaximized] = useState(true); // starts maximized per spec
  const [pos, setPos] = useState({ x: 80, y: 60 });
  const [size] = useState({ w: 860, h: 540 });
  const [initialized, setInitialized] = useState(false);

  const dragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setPos({ x: Math.max(0, (w - size.w) / 2), y: Math.max(40, (h - size.h) / 2) });
    setInitialized(true);
  }, [size.w, size.h]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (maximized) return;
      dragging.current = true;
      dragStart.current = { mx: e.clientX, my: e.clientY, wx: pos.x, wy: pos.y };
      e.preventDefault();
    },
    [maximized, pos],
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

  if (!initialized) return null;

  const windowStyle = maximized
    ? { position: "fixed" as const, top: "40px", left: 0, right: 0, bottom: 0, width: "auto", height: "auto", borderRadius: 0 }
    : { position: "fixed" as const, left: pos.x, top: pos.y, width: size.w, height: size.h };

  return (
    <div
      className="glass-window flex flex-col overflow-hidden"
      style={{ ...windowStyle, zIndex }}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className="glass-titlebar flex items-center justify-between px-3 flex-shrink-0"
        style={{ height: "36px", cursor: maximized ? "default" : "move" }}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => setMaximized((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <button className="wctl-btn wctl-close" onClick={onClose} title="Close" aria-label="Close" />
          <button className="wctl-btn wctl-min" onClick={onMinimize} title="Minimize" aria-label="Minimize" />
          <button className="wctl-btn wctl-max" onClick={() => setMaximized((v) => !v)} title="Maximize" aria-label="Maximize" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-xs font-mono select-none" style={{ color: "var(--subtext0)" }}>
          ~/about.md — khraos
        </span>
        <span className="text-xs font-mono" style={{ color: "var(--overlay1)" }}>md</span>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto font-mono"
        style={{ background: "rgba(17, 17, 27, 0.97)", fontSize: "13px" }}
      >
        <div className="flex h-full min-h-0">
          {/* Sidebar */}
          <div
            className="flex flex-col gap-1 p-4 flex-shrink-0"
            style={{ width: "200px", borderRight: "1px solid var(--glass-border)", background: "rgba(24,24,37,0.6)" }}
          >
            <div className="text-xs mb-3" style={{ color: "var(--overlay0)" }}>EXPLORER</div>
            {[
              { icon: "󰈙", label: "about.md", active: true },
              { icon: "󰉋", label: "skills/", active: false },
              { icon: "󰏗", label: "projects/", active: false },
              { icon: "󱁎", label: "contact.md", active: false },
            ].map(({ icon, label, active }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-2 py-1 rounded text-xs cursor-pointer"
                style={{
                  background: active ? "rgba(203,166,247,0.12)" : "transparent",
                  color: active ? "var(--mauve)" : "var(--subtext0)",
                  borderLeft: active ? "2px solid var(--mauve)" : "2px solid transparent",
                }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto p-8" style={{ lineHeight: "1.8" }}>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="flex items-center justify-center rounded-full text-2xl font-bold flex-shrink-0"
                  style={{
                    width: "72px", height: "72px",
                    background: "rgba(203,166,247,0.15)",
                    border: "2px solid var(--mauve)",
                    color: "var(--mauve)",
                  }}
                >
                  K
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Khraos</h1>
                  <div className="text-sm" style={{ color: "var(--subtext0)" }}>khraosgenetor</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(166,227,161,0.12)", color: "var(--green)", border: "1px solid rgba(166,227,161,0.2)" }}>
                      available
                    </span>
                    <span className="text-xs" style={{ color: "var(--overlay1)" }}>Hyderabad, India</span>
                  </div>
                </div>
              </div>
              <div
                className="text-sm leading-relaxed p-4 rounded"
                style={{ background: "rgba(49,50,68,0.4)", border: "1px solid var(--glass-border)", color: "var(--subtext1)" }}
              >
                Passionate about low-level systems, security research, and building things from scratch.
                Currently diving deep into CyberSec and OSDev — understanding how computers work at the metal level.
              </div>
            </div>

            {/* System info */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--lavender)" }}>
                <span style={{ color: "var(--overlay1)" }}># </span>system
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  ["OS", "Arch Linux x86_64"],
                  ["Kernel", "6.13.7-arch1-1"],
                  ["WM", "Hyprland"],
                  ["Shell", "fish 3.7.1 + starship"],
                  ["Editor", "neovim"],
                  ["Theme", "Catppuccin Mocha"],
                  ["Font", "JetBrains Mono"],
                  ["Host", "khraos.in"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2 items-center px-3 py-2 rounded" style={{ background: "rgba(49,50,68,0.3)" }}>
                    <span style={{ color: "var(--blue)", minWidth: "56px" }}>{k}</span>
                    <span style={{ color: "var(--overlay1)" }}>~</span>
                    <span style={{ color: "var(--text)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--lavender)" }}>
                <span style={{ color: "var(--overlay1)" }}># </span>skills
              </h2>
              <div className="flex flex-col gap-2 text-xs">
                {[
                  { cat: "Systems", items: ["C", "x86 Assembly", "Rust"], color: "var(--red)" },
                  { cat: "OOP", items: ["Java", "C++"], color: "var(--peach)" },
                  { cat: "Web", items: ["Next.js", "TypeScript", "React"], color: "var(--blue)" },
                  { cat: "OS", items: ["Linux", "Arch", "NixOS"], color: "var(--green)" },
                  { cat: "Security", items: ["CyberSec", "Reverse Engineering"], color: "var(--mauve)" },
                ].map(({ cat, items, color }) => (
                  <div key={cat} className="flex items-center gap-3 px-3 py-2 rounded" style={{ background: "rgba(49,50,68,0.3)" }}>
                    <span style={{ color, minWidth: "72px", fontWeight: 600 }}>{cat}</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {items.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ background: "rgba(180,190,254,0.08)", color: "var(--text)", border: "1px solid var(--glass-border)" }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently learning */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--lavender)" }}>
                <span style={{ color: "var(--overlay1)" }}># </span>currently learning
              </h2>
              <div className="flex gap-2 flex-wrap">
                {["K&R C", "x86 Assembly", "OS internals", "network security"].map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1 rounded"
                    style={{ background: "rgba(137,180,250,0.1)", color: "var(--blue)", border: "1px solid rgba(137,180,250,0.2)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--lavender)" }}>
                <span style={{ color: "var(--overlay1)" }}># </span>contact
              </h2>
              <div className="flex flex-col gap-2 text-xs">
                {[
                  { label: "email", value: "khraos@khraos.in", href: "mailto:khraos@khraos.in", color: "var(--peach)" },
                  { label: "github", value: "github.com/khraosgenetor", href: "https://github.com/khraosgenetor", color: "var(--blue)" },
                  { label: "site", value: "khraos.in", href: "https://khraos.in", color: "var(--lavender)" },
                ].map(({ label, value, href, color }) => (
                  <div key={label} className="flex gap-3 items-center px-3 py-2 rounded" style={{ background: "rgba(49,50,68,0.3)" }}>
                    <span style={{ color: "var(--subtext0)", minWidth: "52px" }}>{label}</span>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color }}
                      className="hover:underline"
                    >
                      {value} ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
