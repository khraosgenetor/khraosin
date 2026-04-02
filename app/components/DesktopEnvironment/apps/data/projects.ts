export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  stack: string[];
  link?: string;
  repo?: string;
  status: "active" | "archived" | "wip";
}

export const projects: Project[] = [
  {
    slug: "khraos-in",
    name: "khraos.in",
    description: "Self-hosted personal site and home server.",
    longDescription:
      "Personal portfolio site built with Next.js and Tailwind CSS, running on a self-hosted Linux server. Features an interactive terminal homepage, custom npm packages, and dynamic routing.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Linux"],
    link: "https://khraos.in",
    repo: "https://github.com/khraosgenetor/khraos.in",
    status: "active",
  },
  {
    slug: "neolithic-age",
    name: "neolithic-age",
    description: "Minecraft Forge mod adding a Neolithic era.",
    longDescription:
      "A Minecraft Forge mod written in Java that introduces a Neolithic Age to the game, with new blocks, tools, and progression mechanics.",
    stack: ["Java", "Minecraft Forge"],
    repo: "https://github.com/khraosgenetor/neolithic-age",
    status: "archived",
  },
  // Add more projects here
];