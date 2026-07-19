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

  const imageSrc = "/noa/noa-mascot-original.webp";

  const expressions: NoaExpression[] = ["wave", "thumbs-up", "celebrate"];

  const handleClick = () => {
    const random =
      expressions[Math.floor(Math.random() * expressions.length)];
    setCurrentExpression(random);
    setTimeout(() => {
      setCurrentExpression("idle");
    }, 2000);
  };

  return (
    <div
      className={`noa-mascot ${className} ${
        visible ? "noa-mascot-visible" : ""
      }`}
      onClick={handleClick}
      role="button"
      aria-label="Saludar a Noa"
      tabIndex={0}
    >
      <Image
        src={imageSrc}
        alt="Noa — mascota de NoaTechSolutions"
        width={size}
        height={size}
        style={{ width: "auto", height: "auto" }}
        className={`noa-mascot-image noa-expression-${currentExpression}`}
        priority={false}
      />
    </div>
  );
}
