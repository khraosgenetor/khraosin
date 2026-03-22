"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between p-4 border-b border-solid border-zinc-200 dark:border-zinc-700">
        <Link href="/" className="text-sm font-medium text-zinc-950 dark:text-zinc-50 font-mono">
            <span className="text-zinc-400">&gt; </span>khraos<span className="text-green-400">_</span>
        </Link>
        <div className="flex gap-6">
        <Link href="/about" className={`text-sm font-medium ${pathname === "/about" ? "text-green-400" : "text-zinc-400"}`}>
            about
        </Link>
        <Link href="/projects" className={`text-sm font-medium ${pathname === "/projects" ? "text-green-400" : "text-zinc-400"}`}>
            projects
        </Link>
      </div>
    </nav>
  ) 
}