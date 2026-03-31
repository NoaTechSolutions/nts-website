"use client";
import React from "react";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

type PortfolioProduct = {
  title: string;
  link: string;
  thumbnail: string;
};

export const HeroParallax = ({
  products,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  products: readonly PortfolioProduct[];
  title: React.ReactNode;
  subtitle: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
}) => {
  const itemsPerRow = products.length <= 8 ? 4 : 5;
  const rows = Array.from(
    { length: Math.ceil(products.length / itemsPerRow) },
    (_, index) =>
      products.slice(index * itemsPerRow, index * itemsPerRow + itemsPerRow)
  );
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const isCompactLayout = rows.length <= 2;

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2],
      isCompactLayout ? [-420, 240] : [-700, 500]
    ),
    springConfig
  );
  return (
    <div
      ref={ref}
      className={`${isCompactLayout ? "h-[220vh]" : "h-[300vh]"} py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]`}
    >
      <Header title={title} subtitle={subtitle} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        {rows.map((row, rowIndex) => {
          const isReverse = rowIndex % 2 === 0;
          const rowClassName = isReverse
            ? "flex flex-row-reverse space-x-reverse space-x-20"
            : "flex flex-row space-x-20";

          return (
            <motion.div
              key={`portfolio-row-${rowIndex + 1}`}
              className={`${rowClassName} ${rowIndex < rows.length - 1 ? "mb-20" : ""}`}
            >
              {row.map((product) => (
                <ProductCard
                  product={product}
                  translate={isReverse ? translateX : translateXReverse}
                  key={product.title}
                />
              ))}
            </motion.div>
          );
        })}
        {ctaLabel && ctaHref ? (
          <div className="mt-12 flex justify-center lg:hidden">
            <MovingBorderButton
              as="a"
              href={ctaHref}
              duration={2800}
              borderRadius="999px"
              containerClassName="button-outline-moving portfolio-parallax-cta-wrapper"
              borderClassName="button-outline-moving-border"
              className="button-outline button-outline-hero"
            >
              {ctaLabel}
            </MovingBorderButton>
          </div>
        ) : null}
      </motion.div>
      {ctaLabel && ctaHref ? (
        <div className="portfolio-parallax-footer absolute inset-x-0 bottom-14 z-30 mx-auto hidden w-full max-w-7xl px-4 lg:block">
          <div className="flex justify-end">
            <MovingBorderButton
              as="a"
              href={ctaHref}
              duration={2800}
              borderRadius="999px"
              containerClassName="button-outline-moving portfolio-parallax-cta-wrapper"
              borderClassName="button-outline-moving-border"
              className="button-outline button-outline-hero"
            >
              {ctaLabel}
            </MovingBorderButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const Header = ({
  title,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
}) => {
  return (
    <div className="portfolio-parallax-header max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h2 className="section-title portfolio-parallax-title">{title}</h2>
      <div className="section-copy portfolio-parallax-copy">{subtitle}</div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: PortfolioProduct;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product relative h-52 w-64 shrink-0 sm:h-60 sm:w-72 md:h-72 md:w-[22rem] lg:h-96 lg:w-[30rem]"
    >
      <a
        href={product.link}
        className="block h-full w-full group-hover/product:shadow-2xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="absolute inset-0 h-full w-full object-cover object-left-top"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 text-sm text-white opacity-0 group-hover/product:opacity-100 md:text-base">
        {product.title}
      </h2>
    </motion.div>
  );
};
