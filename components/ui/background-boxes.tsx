"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({
  className,
  ...rest
}: { className?: string }) => {
  const rows = new Array(50).fill(1);
  const cols = new Array(30).fill(1);

  const colors = [
    "rgba(4,0,240,0.7)",
    "rgba(5,165,255,0.7)",
    "rgba(255,153,0,0.8)",
    "rgba(2,41,119,0.8)",
    "rgba(4,0,240,0.4)",
    "rgba(5,165,255,0.4)",
    "rgba(255,153,0,0.4)",
    "rgba(255,255,255,0.12)",
  ];

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      style={{
        transform: `translate(-20%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/2 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] z-0 ",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-16 h-8 border-l border-[rgba(255,255,255,0.05)] relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="w-16 h-8 border-r border-t border-[rgba(255,255,255,0.05)] relative"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-[rgba(255,255,255,0.06)] stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
