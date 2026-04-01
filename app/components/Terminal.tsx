"use client";

import { Terminal, Line } from "@khraosgenetor/terminal";

const BANNER: Line[] = [
  {
    text: "  _  ___                            _____                 _             ",
    color: "text-green-400 text-xs",
  },
  {
    text: " | |/ / |                          / ____|               | |            ",
    color: "text-green-400 text-xs",
  },
  {
    text: " | ' /| |__  _ __ __ _  ___  ___  | |  __  ___ _ __   ___| |_ ___  _ __ ",
    color: "text-green-400 text-xs",
  },
  {
    text: " |  < | '_ \\| '__/ _` |/ _ \\/ __| | | |_ |/ _ \\ '_ \\ / _ \\ __/ _ \\| '__|",
    color: "text-green-400 text-xs",
  },
  {
    text: " | . \\| | | | | | (_| | (_) \\__ \\ | |__| |  __/ | | |  __/ || (_) | |   ",
    color: "text-green-400 text-xs",
  },
  {
    text: " |_|\\_\\_| |_|_|  \\__,_|\\___/|___/  \\_____|\\___/|_| |_|\\___|\\_____/|_|   ",
    color: "text-green-400 text-xs",
  },
  { text: "", color: "" },
  { text: "  user      khraos", color: "text-zinc-400" },
  { text: "  host      khraos.in", color: "text-zinc-400" },
  { text: "  os        Arch Linux", color: "text-zinc-400" },
  { text: "  shell     fish + starship", color: "text-zinc-400" },
  { text: "  wm        Hyprland", color: "text-zinc-400" },
  { text: "  learning  K&R C, x86 Assembly", color: "text-zinc-400" },
  { text: "  projects  neolithic-age, khraos.in", color: "text-zinc-400" },
  { text: "", color: "" },
  { text: "  type 'help' for available commands.", color: "text-zinc-500" },
];

const commands = {
  whoami: () => [
    { text: "Khraos", color: "text-white" },
    { text: "Hyderabad, India", color: "text-zinc-400" },
    { text: "Into CyberSec and OSDev.", color: "text-zinc-400" },
  ],
  skills: () => [
    {
      text: "C, x86 Assembly, Java, C++, Rust, Linux, Next.js",
      color: "text-zinc-400",
    },
  ],
  projects: () => [
    {
      text: "neolithic-age — Minecraft Forge mod (Java)",
      color: "text-zinc-400",
    },
    {
      text: "khraos.in — self-hosted home server (Linux)",
      color: "text-zinc-400",
    },
  ],
  contact: () => [
    { text: "email: khraos@khraos.in", color: "text-zinc-400" },
    { text: "github: github.com/khraosgenetor", color: "text-zinc-400" },
  ],
  pwd: () => [{ text: "~/khraos", color: "text-zinc-400" }],
  "uname -a": () => [
    {
      text: "Linux khraos 6.x.0 #1 SMP x86_64 GNU/Linux",
      color: "text-zinc-400",
    },
  ],
};

export default function TerminalHome() {
  return (
    <Terminal banner={BANNER} commands={commands} prompt={"~/khraos $\u00A0"} />
  );
}
