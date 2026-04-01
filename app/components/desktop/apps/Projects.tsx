"use client";

import { useDesktop } from "../types";

export default function ProjectsFolder() {
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
