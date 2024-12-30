"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    const loadPreline = async () => {
      await import("preline/preline");
      window.HSStaticMethods.autoInit();
    };
    loadPreline();
  }, [path]);

  return null;
}
