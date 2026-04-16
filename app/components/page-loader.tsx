"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const STORAGE_KEY = "nts-loaded";

export function PageLoader() {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  });
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (!shouldRender) return;
    sessionStorage.setItem(STORAGE_KEY, "1");

    const openTimer = setTimeout(() => setIsOpening(true), 2200);
    const unmountTimer = setTimeout(() => setShouldRender(false), 2800);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(unmountTimer);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

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
