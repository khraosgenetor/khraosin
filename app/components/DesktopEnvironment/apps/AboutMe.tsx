"use client";

interface AboutMeProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  maximized: boolean;
}

const skills = {
  Systems: ["C", "x86 Assembly", "Rust"],
  OOP: ["Java", "C++"],
  Web: ["Next.js", "TypeScript", "Tailwind CSS"],
  OS: ["Arch Linux", "Linux"],
  Security: ["CyberSec", "Reverse Engineering"],
};

export default function AboutMe({ onClose, onMinimize, onMaximize, maximized }: AboutMeProps) {
  const modalStyle = maximized
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
        height: "calc(100% - 60px)",
        maxWidth: "1100px",
        borderRadius: "8px",
        border: "1px solid var(--glass-border)",
      };

  if (maximized) {
    return (
      <div
        className="fixed z-30 flex flex-col overflow-hidden font-mono"
        style={{
          top: "40px",
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(17, 17, 27, 0.97)",
        }}
      >
        <TitleBar onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} />
        <Content />
        <StatusBar />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center font-mono"
      style={{
        top: "40px",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          background: "rgba(17, 17, 27, 0.97)",
          ...modalStyle,
        }}
      >
        <TitleBar onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} />
        <Content />
        <StatusBar />
      </div>
    </div>
  );
}

function TitleBar({
  onClose,
  onMinimize,
  onMaximize,
}: {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}) {
  return (
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
        className="absolute left-1/2 -translate-x-1/2 text-xs font-mono select-none"
        style={{ color: "var(--subtext0)" }}
      >
        ~/about.md
      </span>
      <span className="text-xs font-mono" style={{ color: "var(--overlay1)" }}>
        markdown
      </span>
    </div>
  );
}

function Content() {
  return (
    <div className="flex-1 overflow-y-auto p-8 md:p-16">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        <div className="flex flex-col gap-2">
          <div className="text-xs" style={{ color: "var(--overlay1)" }}># whoami</div>
          <div className="text-3xl font-bold" style={{ color: "var(--mauve)" }}>Khraos</div>
          <div className="text-sm" style={{ color: "var(--subtext0)" }}>Hyderabad, India</div>
          <div className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text)" }}>
            Grade 12 student with a focus on CyberSec and OSDev. I build things
            at the systems level — low-level C, x86 assembly, and Linux internals.
            Also do web work when needed. Self-host everything I can.
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--surface0)" }} />

        <div className="flex flex-col gap-4">
          <div className="text-xs" style={{ color: "var(--overlay1)" }}>## skills</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="flex gap-3 text-sm">
                <span style={{ color: "var(--blue)", minWidth: "80px", flexShrink: 0 }}>
                  {cat}
                </span>
                <span style={{ color: "var(--text)" }}>{items.join(", ")}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--surface0)" }} />

        <div className="flex flex-col gap-4">
          <div className="text-xs" style={{ color: "var(--overlay1)" }}>## setup</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              ["os", "Arch Linux x86_64"],
              ["wm", "Hyprland"],
              ["editor", "Neovim + VS Code"],
              ["shell", "fish + starship"],
              ["font", "JetBrains Mono"],
              ["theme", "Catppuccin Mocha"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3 text-sm">
                <span style={{ color: "var(--lavender)", minWidth: "60px" }}>{k}</span>
                <span style={{ color: "var(--text)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--surface0)" }} />

        <div className="flex flex-col gap-4">
          <div className="text-xs" style={{ color: "var(--overlay1)" }}>## learning</div>
          <div className="flex flex-col gap-2 text-sm">
            {[
              "K&R C — all exercises",
              "x86 Assembly — Kip Irvine",
              "Hacking: The Art of Exploitation",
              "Linux internals → GDB → Reverse Engineering",
            ].map((item) => (
              <div key={item} className="flex gap-2">
                <span style={{ color: "var(--green)" }}>→</span>
                <span style={{ color: "var(--text)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--surface0)" }} />

        <div className="flex flex-col gap-4">
          <div className="text-xs" style={{ color: "var(--overlay1)" }}>## contact</div>
          <div className="flex flex-col gap-2 text-sm">
            {[
              ["email", "khraos@khraos.in"],
              ["github", "github.com/khraosgenetor"],
              ["site", "khraos.in"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <span style={{ color: "var(--lavender)", minWidth: "60px" }}>{k}</span>
                <span style={{ color: "var(--blue)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function StatusBar() {
  return (
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
      <span style={{ color: "var(--overlay1)" }}>about.md</span>
      <span style={{ color: "var(--lavender)" }}>khraos.in</span>
    </div>
  );
}