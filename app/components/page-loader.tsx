"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";

const STORAGE_KEY = "nts-loaded";

// Retorna true solo después de hidratar en cliente. Durante SSR → false.
function useHasMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function PageLoader() {
  const mounted = useHasMounted();
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  });
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem(STORAGE_KEY, "1");

    const openTimer = setTimeout(() => setIsOpening(true), 2200);
    const unmountTimer = setTimeout(() => setVisible(false), 2800);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(unmountTimer);
    };
  }, [visible]);

  // Crítico: SSR nunca renderiza DOM, solo cliente tras hidratar.
  if (!mounted || !visible) return null;

  return (
    <div className={`page-loader-root ${isOpening ? "is-opening" : ""}`} aria-hidden="true">
      <div className="page-loader-half page-loader-half-top" />
      <div className="page-loader-half page-loader-half-bottom" />
      <div className="page-loader-center">
        <Image
          src="/noatechsolutions-logo-full.svg"
          alt=""
          width={280}
          height={80}
          className="page-loader-logo"
        />
        <div className="page-loader-bar-track">
          <div className="page-loader-bar-fill" />
        </div>
      </div>
    </div>
  );
}
