"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="win-sunken-panel flex items-center px-2 gap-1 text-xs"
      style={{ height: "22px", minWidth: "48px" }}
    >
      <span style={{ color: "var(--foreground)", fontFamily: "inherit" }}>
        {time}
      </span>
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [startOpen, setStartOpen] = useState(false);

  return (
    <>
      {/* Start Menu Popup */}
      {startOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setStartOpen(false)}
          />
          <div
            className="fixed bottom-10 left-0 z-50 win-raised flex"
            style={{ width: "200px" }}
          >
            {/* Left colored strip */}
            <div
              className="flex items-end pb-2 px-1"
              style={{
                width: "24px",
                background: "linear-gradient(to top, #1B5EA3, #0A246A)",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: "10px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  opacity: 0.7,
                }}
              >
                khraos
              </span>
            </div>
            {/* Menu items */}
            <div className="flex-1 py-1" style={{ background: "var(--win-gray)" }}>
              <Link
                href="/about"
                onClick={() => setStartOpen(false)}
                className="flex items-center gap-2 px-2 py-1 hover:bg-[var(--win-selected)] hover:text-[var(--win-selected-text)] text-xs"
                style={{ color: "var(--foreground)", textDecoration: "none" }}
              >
                <span>📄</span> About
              </Link>
              <Link
                href="/projects"
                onClick={() => setStartOpen(false)}
                className="flex items-center gap-2 px-2 py-1 hover:bg-[var(--win-selected)] hover:text-[var(--win-selected-text)] text-xs"
                style={{ color: "var(--foreground)", textDecoration: "none" }}
              >
                <span>📁</span> Projects
              </Link>
              <div
                style={{
                  borderTop: "1px solid var(--win-shadow)",
                  borderBottom: "1px solid var(--win-highlight)",
                  margin: "4px 0",
                }}
              />
              <div className="flex items-center gap-2 px-2 py-1 text-xs text-zinc-500">
                <span>🖥️</span> khraos.in
              </div>
            </div>
          </div>
        </>
      )}

      {/* Taskbar */}
      <nav
        className="win-raised fixed bottom-0 left-0 right-0 z-30 flex items-center gap-1 px-1"
        style={{ height: "38px" }}
      >
        {/* Start Button */}
        <button
          className="win-button flex items-center gap-1 font-bold"
          style={{ height: "28px", padding: "0 8px", fontSize: "11px" }}
          onClick={() => setStartOpen((v) => !v)}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #E8A000, #B06000)",
              borderRadius: "50%",
              width: "14px",
              height: "14px",
              display: "inline-block",
              marginRight: "2px",
              flexShrink: 0,
            }}
          />
          Start
        </button>

        {/* Divider */}
        <div
          className="win-sunken-panel mx-1"
          style={{ width: "2px", height: "28px" }}
        />

        {/* Quick Launch */}
        <Link
          href="/"
          className="win-button"
          style={{
            height: "28px",
            fontSize: "10px",
            textDecoration: "none",
            color: "var(--foreground)",
          }}
          title="Home"
        >
          🖥️
        </Link>

        {/* Active Window Buttons */}
        <div className="flex-1 flex gap-1 overflow-hidden">
          <div
            className="win-sunken-panel flex items-center px-2 gap-1 text-xs truncate"
            style={{
              height: "28px",
              minWidth: "120px",
              maxWidth: "200px",
              background: "var(--win-gray)",
              fontWeight: pathname === "/" ? "bold" : "normal",
            }}
          >
            <span>💻</span>
            <span className="truncate">
              {pathname === "/" ? "Terminal - khraos" : pathname.replace("/", "")}
            </span>
          </div>
        </div>

        {/* System Tray */}
        <div
          className="win-sunken-panel flex items-center gap-2 px-2"
          style={{ height: "28px" }}
        >
          <span style={{ fontSize: "13px" }}>🔊</span>
          <span style={{ fontSize: "13px" }}>🌐</span>
          <Clock />
        </div>
      </nav>
    </>
  );
}
