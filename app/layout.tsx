import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "khraos — CyberSec & OSDev",
  description: "Khraos: Hyderabad-based hacker into CyberSec and OSDev. C, x86 Assembly, Rust, Linux, Hyprland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono`} style={{ overflow: "hidden" }}>
        <Nav />
        <main style={{ height: "100vh", overflow: "hidden" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
