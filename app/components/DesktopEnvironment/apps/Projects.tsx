"use client";

import { useState } from "react";
import { projects, Project } from "./data/projects";

interface ProjectsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  maximized: boolean;
}

const statusColor: Record<Project["status"], string> = {
  active: "var(--green)",
  wip: "var(--yellow)",
  archived: "var(--overlay1)",
};

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="font-mono flex flex-col overflow-hidden"
        style={{
          width: "min(600px, 90%)",
          maxHeight: "80%",
          background: "rgba(24, 24, 37, 0.98)",
          border: "1px solid var(--glass-border)",
          borderRadius: "8px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-3 flex-shrink-0 relative"
          style={{
            height: "36px",
            borderBottom: "1px solid var(--glass-border)",
            background: "rgba(30,30,46,0.95)",
          }}
        >
          <div className="flex items-center gap-2">
            <button className="wctl-btn wctl-close" onClick={onClose} aria-label="Close" />
            <div className="wctl-btn wctl-min" style={{ opacity: 0.3, cursor: "default" }} />
            <div className="wctl-btn wctl-max" style={{ opacity: 0.3, cursor: "default" }} />
          </div>
          <span
            className="absolute left-1/2 -translate-x-1/2 text-xs select-none"
            style={{ color: "var(--subtext0)" }}
          >
            ~/{project.slug}
          </span>
          <span className="text-xs" style={{ color: statusColor[project.status] }}>
            {project.status}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="text-lg font-bold" style={{ color: "var(--mauve)" }}>
              {project.name}
            </div>
            <div className="text-xs" style={{ color: "var(--subtext0)" }}>
              {project.description}
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--surface0)" }} />

          <div className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
            {project.longDescription}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-0.5"
                style={{
                  background: "var(--surface0)",
                  color: "var(--lavender)",
                  border: "1px solid var(--surface1)",
                  borderRadius: "4px",
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {(project.link || project.repo) && (
            <div className="flex flex-col gap-1.5 text-xs">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>
                  ↗ {project.link}
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>
                  ↗ {project.repo}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectGrid({ onSelect }: { onSelect: (p: Project) => void }) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <button
            key={p.slug}
            className="text-left flex flex-col gap-2 p-4 transition-colors"
            style={{
              background: "rgba(30,30,46,0.6)",
              border: "1px solid var(--surface0)",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--surface2)";
              (e.currentTarget as HTMLElement).style.background = "rgba(30,30,46,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--surface0)";
              (e.currentTarget as HTMLElement).style.background = "rgba(30,30,46,0.6)";
            }}
            onClick={() => onSelect(p)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold" style={{ color: "var(--mauve)" }}>
                {p.name}
              </span>
              <span className="text-xs" style={{ color: statusColor[p.status] }}>
                {p.status}
              </span>
            </div>
            <div className="text-xs leading-relaxed" style={{ color: "var(--subtext0)" }}>
              {p.description}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
              {p.stack.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="text-xs px-1.5 py-0.5"
                  style={{
                    background: "var(--surface0)",
                    color: "var(--lavender)",
                    borderRadius: "3px",
                  }}
                >
                  {s}
                </span>
              ))}
              {p.stack.length > 3 && (
                <span className="text-xs" style={{ color: "var(--overlay1)" }}>
                  +{p.stack.length - 3}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Projects({ onClose, onMinimize, onMaximize, maximized }: ProjectsProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  const windowStyle = maximized
    ? {
        position: "fixed" as const,
        top: "40px",
        left: 0,
        right: 0,
        bottom: 0,
        width: "auto",
        height: "auto",
        borderRadius: 0,
        border: "none",
      }
    : {
        width: "calc(100% - 80px)",
        height: "calc(100% - 80px)",
        maxWidth: "1100px",
        borderRadius: "8px",
        border: "1px solid var(--glass-border)",
      };

  const inner = (
    <div
      className="relative flex flex-col overflow-hidden font-mono"
      style={{
        background: "rgba(17, 17, 27, 0.97)",
        ...windowStyle,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-3 flex-shrink-0 relative"
        style={{
          height: "36px",
          background: "rgba(24, 24, 37, 0.95)",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <div className="flex items-center gap-2">
          <button className="wctl-btn wctl-close" onClick={onClose} aria-label="Close" />
          <button className="wctl-btn wctl-min" onClick={onMinimize} aria-label="Minimize" />
          <button className="wctl-btn wctl-max" onClick={onMaximize} aria-label="Maximize" />
        </div>
        <span
          className="absolute left-1/2 -translate-x-1/2 text-xs select-none"
          style={{ color: "var(--subtext0)" }}
        >
          ~/projects
        </span>
        <span className="text-xs" style={{ color: "var(--overlay1)" }}>
          {projects.length} projects
        </span>
      </div>

      <ProjectGrid onSelect={setSelected} />

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{
          height: "22px",
          background: "rgba(17, 17, 27, 0.9)",
          borderTop: "1px solid var(--glass-border)",
          fontSize: "11px",
          fontFamily: "monospace",
        }}
      >
        <span style={{ color: "var(--green)" }}>● NORMAL</span>
        <span style={{ color: "var(--overlay1)" }}>projects/</span>
        <span style={{ color: "var(--lavender)" }}>khraos.in</span>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );

  if (maximized) return inner;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center"
      style={{
        top: "40px",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      {inner}
    </div>
  );
}