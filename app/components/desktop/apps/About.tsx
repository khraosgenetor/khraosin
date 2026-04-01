"use client";

import { useDesktop } from "../types";

export default function AboutApp() {
  const { closeApp, minimizeApp, maximizeApp, focusApp, openWindows } = useDesktop();
  const windowState = openWindows.find((w) => w.id === "about");

  if (!windowState) return null;

  const skills = [
    { name: "C", level: 90, color: "var(--blue)" },
    { name: "x86 Assembly", level: 70, color: "var(--mauve)" },
    { name: "Rust", level: 65, color: "var(--peach)" },
    { name: "Java", level: 80, color: "var(--red)" },
    { name: "TypeScript", level: 75, color: "var(--blue)" },
    { name: "Linux", level: 95, color: "var(--yellow)" },
  ];

  const stats = [
    { label: "Years Coding", value: "3+", icon: ">" },
    { label: "Projects", value: "10+", icon: "/" },
    { label: "Commits", value: "500+", icon: "*" },
    { label: "Coffees", value: "999+", icon: "#" },
  ];

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
          about.md — neovim
        </span>
        <span className="text-xs font-mono" style={{ color: "var(--overlay1)" }}>
          markdown
        </span>
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "rgba(17, 17, 27, 0.98)" }}
      >
        {/* Hero Section */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(203,166,247,0.1) 0%, rgba(137,180,250,0.05) 50%, rgba(166,227,161,0.1) 100%)",
            borderBottom: "1px solid var(--glass-border)",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, var(--mauve) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--blue) 0%, transparent 50%)",
              filter: "blur(60px)",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-8 py-12">
            <div className="flex items-center gap-8">
              {/* Avatar with glow */}
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full opacity-50"
                  style={{
                    background: "var(--mauve)",
                    filter: "blur(20px)",
                    transform: "scale(0.8)",
                  }}
                />
                <div
                  className="relative w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, var(--surface0) 0%, var(--surface1) 100%)",
                    border: "2px solid var(--mauve)",
                    color: "var(--mauve)",
                    boxShadow: "0 0 40px rgba(203,166,247,0.3)",
                  }}
                >
                  K
                </div>
              </div>

              {/* Name and tagline */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1
                    className="text-4xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, var(--mauve) 0%, var(--lavender) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Khraos
                  </h1>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium"
                    style={{ background: "var(--green)", color: "var(--crust)" }}
                  >
                    Available
                  </span>
                </div>
                <p className="text-lg mb-3" style={{ color: "var(--subtext1)" }}>
                  Systems Programmer &amp; Security Researcher
                </p>
                <div className="flex items-center gap-4 text-sm" style={{ color: "var(--overlay1)" }}>
                  <span className="flex items-center gap-1">
                    <span style={{ color: "var(--red)" }}>@</span> Hyderabad, India
                  </span>
                  <span className="flex items-center gap-1">
                    <span style={{ color: "var(--blue)" }}>&gt;</span> khraos.in
                  </span>
                  <span className="flex items-center gap-1">
                    <span style={{ color: "var(--green)" }}>$</span> CyberSec &amp; OSDev
                  </span>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center px-4 py-3 rounded-xl"
                    style={{
                      background: "rgba(30, 30, 46, 0.8)",
                      border: "1px solid var(--glass-border)",
                      minWidth: "80px",
                    }}
                  >
                    <div className="text-xs mb-1" style={{ color: "var(--mauve)" }}>{stat.icon}</div>
                    <div className="text-xl font-bold" style={{ color: "var(--text)" }}>{stat.value}</div>
                    <div className="text-xs" style={{ color: "var(--overlay1)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - About */}
            <div className="col-span-2 space-y-6">
              {/* Bio Card */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(30,30,46,0.9) 0%, rgba(24,24,37,0.9) 100%)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: "var(--mauve)" }}>#</span>
                  <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--mauve)" }}>
                    About Me
                  </h2>
                </div>
                <p className="leading-relaxed mb-4" style={{ color: "var(--text)", lineHeight: 1.8 }}>
                  I&apos;m a passionate systems programmer with a deep interest in how computers work at the lowest level.
                  My journey started with curiosity about operating systems and evolved into a full-blown obsession
                  with cybersecurity and reverse engineering.
                </p>
                <p className="leading-relaxed" style={{ color: "var(--subtext0)", lineHeight: 1.8 }}>
                  Currently diving deep into K&amp;R C and x86 Assembly, building experimental kernels,
                  and exploring the intersection of security research and low-level programming.
                  When I&apos;m not coding, you&apos;ll find me tweaking my Arch Linux setup or reading about exploit development.
                </p>
              </div>

              {/* Skills with progress bars */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(30,30,46,0.9) 0%, rgba(24,24,37,0.9) 100%)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: "var(--blue)" }}>&gt;</span>
                  <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--blue)" }}>
                    Technical Skills
                  </h2>
                </div>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm" style={{ color: "var(--text)" }}>{skill.name}</span>
                        <span className="text-xs" style={{ color: "var(--overlay1)" }}>{skill.level}%</span>
                      </div>
                      <div
                        className="h-2 rounded-full overflow-hidden"
                        style={{ background: "var(--surface0)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}88 100%)`,
                            boxShadow: `0 0 10px ${skill.color}44`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Setup Card */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(30,30,46,0.9) 0%, rgba(24,24,37,0.9) 100%)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: "var(--green)" }}>~</span>
                  <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--green)" }}>
                    Setup
                  </h2>
                </div>
                <div className="space-y-3 text-sm font-mono">
                  {[
                    ["os", "Arch Linux", "var(--blue)"],
                    ["wm", "Hyprland", "var(--mauve)"],
                    ["editor", "Neovim", "var(--green)"],
                    ["shell", "Fish", "var(--yellow)"],
                    ["term", "Kitty", "var(--peach)"],
                    ["theme", "Catppuccin", "var(--lavender)"],
                  ].map(([key, val, color]) => (
                    <div key={key} className="flex items-center">
                      <span style={{ color: "var(--overlay1)", width: "60px" }}>{key}</span>
                      <span style={{ color: "var(--overlay0)" }}>=</span>
                      <span style={{ color: color as string, marginLeft: "4px" }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(30,30,46,0.9) 0%, rgba(24,24,37,0.9) 100%)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: "var(--peach)" }}>*</span>
                  <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--peach)" }}>
                    Focus
                  </h2>
                </div>
                <div className="space-y-2">
                  {[
                    "Kernel Development",
                    "Reverse Engineering",
                    "Exploit Research",
                    "Systems Programming",
                  ].map((area) => (
                    <div
                      key={area}
                      className="px-3 py-2 rounded-lg text-sm"
                      style={{
                        background: "var(--surface0)",
                        color: "var(--text)",
                        border: "1px solid var(--surface1)",
                      }}
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(30,30,46,0.9) 0%, rgba(24,24,37,0.9) 100%)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: "var(--lavender)" }}>@</span>
                  <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--lavender)" }}>
                    Connect
                  </h2>
                </div>
                <div className="space-y-2">
                  <a
                    href="https://github.com/khraosgenetor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all hover:scale-[1.02]"
                    style={{
                      background: "var(--surface0)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--text)",
                    }}
                  >
                    <span>GitHub</span>
                    <span style={{ color: "var(--mauve)" }}>-&gt;</span>
                  </a>
                  <a
                    href="mailto:khraos@khraos.in"
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all hover:scale-[1.02]"
                    style={{
                      background: "var(--surface0)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--text)",
                    }}
                  >
                    <span>Email</span>
                    <span style={{ color: "var(--blue)" }}>-&gt;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{
          height: "24px",
          background: "rgba(17, 17, 27, 0.95)",
          borderTop: "1px solid var(--glass-border)",
          fontSize: "11px",
        }}
      >
        <div className="flex items-center gap-4">
          <span style={{ color: "var(--green)" }}>NORMAL</span>
          <span style={{ color: "var(--overlay1)" }}>utf-8</span>
        </div>
        <div className="flex items-center gap-4">
          <span style={{ color: "var(--overlay1)" }}>markdown</span>
          <span style={{ color: "var(--lavender)" }}>ln 1, col 1</span>
        </div>
      </div>
    </div>
  );
}
