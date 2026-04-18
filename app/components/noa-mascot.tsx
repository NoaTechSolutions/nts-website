"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type NoaExpression =
  | "idle"
  | "wave"
  | "point-right"
  | "thumbs-up"
  | "celebrate"
  | "think";

interface NoaMascotProps {
  expression?: NoaExpression;
  size?: number;
  className?: string;
}

export function NoaMascot({
  expression = "idle",
  size = 120,
  className = "",
}: NoaMascotProps) {
  const [visible, setVisible] = useState(false);
  const [currentExpression, setCurrentExpression] =
    useState<NoaExpression>(expression);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentExpression(expression);
  }, [expression]);

  const imageSrc = "/noa/noa-mascot-original.png";

  return (
    <div
      className={`noa-mascot ${className} ${
        visible ? "noa-mascot-visible" : ""
      }`}
      aria-hidden="true"
    >
      <Image
        src={imageSrc}
        alt="Noa — mascota de NoaTechSolutions"
        width={size}
        height={size}
        className={`noa-mascot-image noa-expression-${currentExpression}`}
        priority={false}
      />
    </div>
  );
}
