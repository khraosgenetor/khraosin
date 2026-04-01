import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khraos — Cybersecurity & OSDev",
  description: "Khraos: Hyderabad-based hacker into CyberSec and OSDev. C, x86 Assembly, Rust, Linux.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable}`}>
        <Nav />
        <main style={{ height: "100vh", overflow: "hidden" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
