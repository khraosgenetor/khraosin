"use client";

import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
      setDate(
        now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="waybar-pill gap-2">
      <span style={{ color: "var(--mauve)" }}></span>
      <span style={{ color: "var(--text)", fontWeight: 500 }}>{time}</span>
      <span style={{ color: "var(--overlay1)" }}>{date}</span>
    </div>
  );
}

function SysTray() {
  return (
    <div className="waybar-pill gap-3">
      <span style={{ color: "var(--green)", fontSize: "11px" }}> ETH</span>
      <span style={{ color: "var(--blue)", fontSize: "11px" }}> 100%</span>
      <span style={{ color: "var(--yellow)", fontSize: "11px" }}> 42°C</span>
      <span style={{ color: "var(--overlay1)", fontSize: "11px" }}>arch</span>
    </div>
  );
}

interface NavProps {
  activeTitle: string;
  activeWorkspace: number;
  onWorkspaceChange: (ws: number) => void;
}

export default function Nav({ activeTitle, activeWorkspace, onWorkspaceChange }: NavProps) {
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
              className={`ws-dot ${ws === activeWorkspace ? "active" : ""}`}
              title={`Workspace ${ws}`}
              onClick={() => onWorkspaceChange(ws)}
              aria-label={`Switch to workspace ${ws}`}
            />
          ))}
        </div>
        <div className="waybar-pill" style={{ color: "var(--mauve)", fontWeight: 600, fontSize: "12px" }}>
          khraos@archlinux
        </div>
      </div>

      {/* Center: Active window title */}
      <div className="waybar-pill" style={{ fontSize: "12px", color: "var(--subtext1)" }}>
        <span style={{ color: "var(--lavender)" }}></span>
        <span>{activeTitle}</span>
      </div>

      {/* Right: Sys tray + clock */}
      <div className="flex items-center gap-2">
        <SysTray />
        <Clock />
      </div>
    </nav>
  );
}