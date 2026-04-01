"use client";

import { useState, useCallback, useEffect } from "react";
import { DesktopContext, type AppId, type WindowState } from "./types";
import KittyTerminal from "./apps/Terminal";
import AboutApp from "./apps/About";
import ProjectsFolder from "./apps/Projects";
import "./desktop.css";

/* ─── Dock (Left Side) ──────────────────── */
function Dock() {
  const [, forceUpdate] = useState(0);
  
  return (
    <DockInner key={forceUpdate} />
  );
}

function DockInner() {
  const apps = [
    { id: "terminal" as AppId, icon: ">_", label: "Terminal", color: "var(--green)" },
    { id: "about" as AppId, icon: "i", label: "About", color: "var(--blue)" },
    { id: "projects" as AppId, icon: "\uD83D\uDCC1", label: "Projects", color: "var(--mauve)" },
  ];

  return (
    <DockWithContext apps={apps} />
  );
}

function DockWithContext({ apps }: { apps: { id: AppId; icon: string; label: string; color: string }[] }) {
  const { openApp, openWindows, activeWorkspace } = useDesktopSafe();

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

// Safe hook that returns defaults if context not available
function useDesktopSafe() {
  const [state] = useState({
    activeWorkspace: 1,
    openWindows: [] as WindowState[],
    openApp: () => {},
  });
  
  try {
    const { useDesktop } = require("./types");
    return useDesktop();
  } catch {
    return state;
  }
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
