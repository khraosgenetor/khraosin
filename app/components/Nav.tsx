"use client";

import { useState, useEffect } from "react";

/* ─── Clock ───────────────────────────────────────── */
function Clock() {
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
    <div className="waybar-pill gap-2">
      <span style={{ color: "var(--mauve)" }}></span>
      <span style={{ color: "var(--text)", fontWeight: 500 }}>{time}</span>
      <span style={{ color: "var(--overlay1)" }}>{date}</span>
    </div>
  );
}

/* ─── Workspaces ─────────────────────────────────── */
function Workspaces({
  active,
  occupied,
  onChange,
}: {
  active: number;
  occupied: number[];
  onChange: (ws: number) => void;
}) {
  return (
    <div className="waybar-pill gap-2">
      {[1, 2, 3, 4, 5].map((ws) => (
        <button
          key={ws}
          className={`ws-dot ${ws === active ? "active" : occupied.includes(ws) ? "occupied" : ""}`}
          title={`Workspace ${ws}`}
          onClick={() => onChange(ws)}
          aria-label={`Switch to workspace ${ws}`}
          aria-current={ws === active ? "true" : undefined}
          style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
        />
      ))}
    </div>
  );
}

/* ─── SysTray ─────────────────────────────────────── */
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

/* ─── App Launcher icon button ─────────────────────── */
function AppIconBtn({
  icon, label, color, onClick,
}: {
  icon: string;
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={`Open ${label}`}
      className="flex items-center justify-center transition-all duration-150"
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "8px",
        background: "rgba(24,24,37,0.8)",
        border: "1px solid var(--glass-border)",
        color,
        fontSize: "15px",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(49,50,68,0.9)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(180,190,254,0.25)";
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(24,24,37,0.8)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    >
      {icon}
    </button>
  );
}

/* ─── Nav ─────────────────────────────────────────── */
interface NavProps {
  activeWorkspace: number;
  occupiedWorkspaces: number[];
  onWorkspaceChange: (ws: number) => void;
  activeWindowTitle: string | null;
  onOpenAbout: () => void;
  onOpenProjects: () => void;
  onOpenTerminal: () => void;
}

export default function Nav({
  activeWorkspace,
  occupiedWorkspaces,
  onWorkspaceChange,
  activeWindowTitle,
  onOpenAbout,
  onOpenProjects,
  onOpenTerminal,
}: NavProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3"
      style={{ height: "40px" }}
      aria-label="Waybar"
    >
      {/* Left: Workspaces + app launchers */}
      <div className="flex items-center gap-2">
        <Workspaces
          active={activeWorkspace}
          occupied={occupiedWorkspaces}
          onChange={onWorkspaceChange}
        />

        {/* App icon launchers in nav */}
        <div className="flex items-center gap-1.5">
          <AppIconBtn
            icon="󰈚"
            label="About"
            color="var(--mauve)"
            onClick={onOpenAbout}
          />
          <AppIconBtn
            icon="󰉋"
            label="Projects"
            color="var(--blue)"
            onClick={onOpenProjects}
          />
          <AppIconBtn
            icon="󰆍"
            label="Terminal"
            color="var(--green)"
            onClick={onOpenTerminal}
          />
        </div>

        <div className="waybar-pill" style={{ color: "var(--mauve)", fontWeight: 600, fontSize: "12px" }}>
          khraos@archlinux
        </div>
      </div>

      {/* Center: Active window title */}
      <div className="waybar-pill" style={{ fontSize: "12px", color: "var(--subtext1)" }}>
        <span style={{ color: "var(--lavender)" }}></span>
        <span>{activeWindowTitle ?? "khraos@archlinux: ~"}</span>
      </div>

      {/* Right: Sys tray + clock */}
      <div className="flex items-center gap-2">
        <SysTray />
        <Clock />
      </div>
    </nav>
  );
}
