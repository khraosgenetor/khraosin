"use client";

import { Terminal, Line } from "@khraosgenetor/terminal";

const BANNER: Line[] = [
  {
    text: "      /\\",
    color: "text-blue-400 text-xs",
  },
  {
    text: "     /  \\",
    color: "text-blue-400 text-xs",
  },
  {
    text: "    /\\   \\",
    color: "text-blue-400 text-xs",
  },
  {
    text: "   /  __  \\",
    color: "text-blue-400 text-xs",
  },
  {
    text: "  /  (  )  \\",
    color: "text-blue-400 text-xs",
  },
  {
    text: " / __|  |__\\\\",
    color: "text-blue-400 text-xs",
  },
  {
    text: "/.\'        \'.",
    color: "text-blue-400 text-xs",
  },
  { text: "", color: "" },
  { text: "  user      khraos", color: "text-zinc-400" },
  { text: "  host      khraos.in", color: "text-zinc-400" },
  { text: "  os        Arch Linux x86_64", color: "text-zinc-400" },
  { text: "  kernel    6.13.7-arch1-1", color: "text-zinc-400" },
  { text: "  shell     fish 3.7.1 + starship", color: "text-zinc-400" },
  { text: "  wm        Hyprland", color: "text-zinc-400" },
  { text: "  theme     Catppuccin Mocha", color: "text-zinc-400" },
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
    { text: "Systems   C, x86 Assembly, Rust", color: "text-zinc-400" },
    { text: "OOP       Java, C++", color: "text-zinc-400" },
    { text: "Web       Next.js, TypeScript", color: "text-zinc-400" },
    { text: "OS        Linux, Arch", color: "text-zinc-400" },
    { text: "Security  CyberSec, Reverse Engineering", color: "text-zinc-400" },
  ],
  projects: () => [
    { text: "neolithic-age  Minecraft Forge mod (Java)", color: "text-zinc-400" },
    { text: "khraos.in      self-hosted home server (Linux)", color: "text-zinc-400" },
  ],
  contact: () => [
    { text: "email   khraos@khraos.in", color: "text-zinc-400" },
    { text: "github  github.com/khraosgenetor", color: "text-zinc-400" },
    { text: "site    khraos.in", color: "text-zinc-400" },
  ],
  pwd: () => [{ text: "/home/khraos", color: "text-zinc-400" }],
  "uname -a": () => [
    {
      text: "Linux archlinux 6.13.7-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
      color: "text-zinc-400",
    },
  ],
  ls: () => [
    { text: "projects/  scripts/  .config/  README.md  .dotfiles/", color: "text-blue-400" },
  ],
};

export default function TerminalApp() {
  return (
    <Terminal
      banner={BANNER}
      commands={commands}
      prompt={"khraos@archlinux:~ ❯\u00A0"}
    />
  );
}