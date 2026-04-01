"use client";

interface Props {
  onClose: () => void;
}

const PROJECTS = [
  {
    name: "neolithic-age",
    lang: "Java",
    icon: "󰬷",
    iconColor: "var(--peach)",
    desc: "Minecraft Forge mod adding prehistoric content, custom biomes, and new mobs.",
    tags: ["Minecraft", "Forge", "Modding"],
    status: "active",
    href: "https://github.com/khraosgenetor",
  },
  {
    name: "khraos.in",
    lang: "Linux",
    icon: "󰣺",
    iconColor: "var(--blue)",
    desc: "Self-hosted home server running on bare metal Arch Linux with custom nginx config.",
    tags: ["Arch", "Self-hosted", "nginx"],
    status: "active",
    href: "https://khraos.in",
  },
  {
    name: "dotfiles",
    lang: "Shell",
    icon: "󰒓",
    iconColor: "var(--green)",
    desc: "My Hyprland + Catppuccin Mocha dotfiles. Includes Waybar, Kitty, neovim configs.",
    tags: ["Hyprland", "Catppuccin", "neovim"],
    status: "maintained",
    href: "https://github.com/khraosgenetor",
  },
  {
    name: "osdev-experiments",
    lang: "C / ASM",
    icon: "󰻀",
    iconColor: "var(--red)",
    desc: "Bare-metal x86 experiments — bootloader, basic kernel, memory paging.",
    tags: ["x86", "Assembly", "C"],
    status: "wip",
    href: "https://github.com/khraosgenetor",
  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  active: { bg: "rgba(166,227,161,0.12)", text: "var(--green)", border: "rgba(166,227,161,0.2)" },
  maintained: { bg: "rgba(137,180,250,0.12)", text: "var(--blue)", border: "rgba(137,180,250,0.2)" },
  wip: { bg: "rgba(249,226,175,0.12)", text: "var(--yellow)", border: "rgba(249,226,175,0.2)" },
};

export default function ProjectsDialog({ onClose }: Props) {
  return (
    /* Backdrop — slightly greyed out, covers whole screen except border area */
    <div
      className="fixed inset-0 flex items-center justify-center z-40"
      style={{
        background: "rgba(17,17,27,0.55)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        padding: "40px 28px 28px 28px", /* top = nav height, sides/bottom = border gap */
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Dialog window */}
      <div
        className="glass-window flex flex-col w-full h-full overflow-hidden"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div
          className="glass-titlebar flex items-center justify-between px-4 flex-shrink-0"
          style={{ height: "38px" }}
        >
          <div className="flex items-center gap-2">
            <button className="wctl-btn wctl-close" onClick={onClose} title="Close" aria-label="Close" />
            <div className="wctl-btn wctl-min" style={{ cursor: "default", opacity: 0.4 }} />
            <div className="wctl-btn wctl-max" style={{ cursor: "default", opacity: 0.4 }} />
          </div>
          <span
            className="absolute left-1/2 -translate-x-1/2 text-xs font-mono select-none"
            style={{ color: "var(--subtext0)" }}
          >
            ~/projects — folder
          </span>
          <span className="text-xs font-mono" style={{ color: "var(--overlay1)" }}>
            {PROJECTS.length} items
          </span>
        </div>

        {/* Toolbar */}
        <div
          className="flex items-center gap-3 px-5 py-2 flex-shrink-0 text-xs font-mono"
          style={{ borderBottom: "1px solid var(--glass-border)", background: "rgba(24,24,37,0.5)" }}
        >
          <span style={{ color: "var(--overlay0)" }}>/</span>
          <span style={{ color: "var(--mauve)" }}>home</span>
          <span style={{ color: "var(--overlay0)" }}>/</span>
          <span style={{ color: "var(--subtext0)" }}>khraos</span>
          <span style={{ color: "var(--overlay0)" }}>/</span>
          <span style={{ color: "var(--text)" }}>projects</span>
        </div>

        {/* Projects grid */}
        <div
          className="flex-1 overflow-y-auto p-6"
          style={{ background: "rgba(17,17,27,0.9)" }}
        >
          <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
            {PROJECTS.map((proj) => {
              const sc = STATUS_COLORS[proj.status] ?? STATUS_COLORS.maintained;
              return (
                <a
                  key={proj.name}
                  href={proj.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-3 p-5 rounded-xl transition-all duration-200 group"
                  style={{
                    background: "rgba(30,30,46,0.7)",
                    border: "1px solid var(--glass-border)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(49,50,68,0.7)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(180,190,254,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(30,30,46,0.7)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-lg flex-shrink-0 text-lg"
                        style={{
                          width: "38px", height: "38px",
                          background: "rgba(30,30,46,0.9)",
                          border: "1px solid var(--glass-border)",
                          color: proj.iconColor,
                        }}
                      >
                        {proj.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{proj.name}</div>
                        <div className="text-xs" style={{ color: "var(--overlay1)" }}>{proj.lang}</div>
                      </div>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                    >
                      {proj.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed" style={{ color: "var(--subtext0)" }}>
                    {proj.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-1.5 flex-wrap">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          background: "rgba(180,190,254,0.07)",
                          color: "var(--subtext1)",
                          border: "1px solid rgba(180,190,254,0.1)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs mt-auto" style={{ color: "var(--overlay0)" }}>
                    <span>github.com/khraosgenetor</span>
                    <span className="group-hover:text-[var(--lavender)] transition-colors">↗</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
