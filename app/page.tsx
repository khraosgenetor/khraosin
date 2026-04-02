"use client";

import { useState, useCallback } from "react";
import Nav from "./components/Nav";
import HyprlandDesktop from "./components/DesktopEnvironment/ArchDesktop";

export default function Home() {
  const [activeTitle, setActiveTitle] = useState("khraos.in/");
  const [activeWorkspace, setActiveWorkspace] = useState(1);

  const handleTitleChange = useCallback((title: string) => {
    setActiveTitle(title);
  }, []);

  return (
    <>
      <Nav
        activeTitle={activeTitle}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />
      <HyprlandDesktop
        onTitleChange={handleTitleChange}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />
    </>
  );
}