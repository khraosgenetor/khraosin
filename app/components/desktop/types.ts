import { createContext, useContext } from "react";

/* ─── Types ─────────────────────────────── */
export interface Line {
  content: React.ReactNode;
  raw?: string;
}

export type AppId = "terminal" | "about" | "projects";

export interface WindowState {
  id: AppId;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  workspace: number;
  pos: { x: number; y: number };
}

/* ─── Desktop Context ───────────────────── */
export interface DesktopContextType {
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

export const DesktopContext = createContext<DesktopContextType | null>(null);

export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error("useDesktop must be used within DesktopProvider");
  return ctx;
}
