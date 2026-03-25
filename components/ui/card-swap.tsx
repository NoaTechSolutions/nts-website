"use client";

import React, {
  Children,
  cloneElement,
  createRef,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import gsap from "gsap";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  customClass?: string;
};

export const Card = forwardRef(function Card(
  { customClass, className, ...rest }: CardProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={`card ${customClass ?? ""} ${className ?? ""}`.trim()}
    />
  );
});

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const getSlotVisuals = (slotIndex: number) => ({
  scale: Math.max(1 - slotIndex * 0.06, 0.82),
  opacity: Math.max(1 - slotIndex * 0.18, 0.3),
  rotateZ: slotIndex * 1.2,
});

const placeNow = (
  el: HTMLDivElement,
  slot: ReturnType<typeof makeSlot>,
  skew: number,
  slotIndex: number,
) => {
  const visuals = getSlotVisuals(slotIndex);
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    scale: visuals.scale,
    opacity: visuals.opacity,
    rotateZ: visuals.rotateZ,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
};

type CardSwapProps = {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "elastic" | "smooth";
  activeIndex?: number;
  children: ReactNode;
};

export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  activeIndex,
  children,
}: CardSwapProps) {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(() => childArr.map(() => createRef<HTMLDivElement>()), [childArr]);

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(
          r.current,
          makeSlot(i, cardDistance, verticalDistance, total),
          skewAmount,
          i,
        );
      }
    });
  }, [refs, cardDistance, verticalDistance, skewAmount]);

  useEffect(() => {
    if (activeIndex === undefined) return;

    const total = refs.length;
    const previousOrder = order.current;
    const rotated = Array.from({ length: total }, (_, i) => (activeIndex + i) % total);
    const previousFront = previousOrder[0];
    order.current = rotated;

    const timeline = gsap.timeline({ defaults: { overwrite: true } });

    rotated.forEach((cardIndex, slotIndex) => {
      const el = refs[cardIndex].current;
      if (!el) return;

      const slot = makeSlot(slotIndex, cardDistance, verticalDistance, total);
      const visuals = getSlotVisuals(slotIndex);
      const isLeavingFront = cardIndex === previousFront && slotIndex === total - 1;

      if (isLeavingFront) {
        timeline.to(
          el,
          {
            y: slot.y + 88,
            scale: 0.9,
            opacity: 0.22,
            rotateZ: visuals.rotateZ + 5,
            duration: 0.2,
            ease: "power2.in",
          },
          0,
        );
      }

      timeline.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          zIndex: slot.zIndex,
          skewY: skewAmount,
          scale: visuals.scale,
          opacity: visuals.opacity,
          rotateZ: visuals.rotateZ,
          duration: slotIndex === 0 ? 0.56 : 0.62,
          ease: slotIndex === 0 ? "power3.out" : "power2.out",
        },
        isLeavingFront ? 0.12 : slotIndex * 0.045,
      );
    });
  }, [activeIndex, refs, cardDistance, verticalDistance, skewAmount]);

  useEffect(() => {
    if (activeIndex !== undefined) {
      return;
    }

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return",
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      if (!node) return () => clearInterval(intervalRef.current);

      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };

      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };

      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);

      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [
    activeIndex,
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    refs,
    config.durDrop,
    config.durMove,
    config.durReturn,
    config.ease,
    config.promoteOverlap,
    config.returnDelay,
  ]);

  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) {
      return child;
    }

    const typedChild = child as ReactElement<{
      style?: CSSProperties;
      onClick?: (event: MouseEvent<HTMLElement>) => void;
      ref?: Ref<HTMLDivElement>;
    }>;

    return cloneElement(typedChild, {
      key: i,
      ref: refs[i],
      style: { width, height, ...(typedChild.props.style ?? {}) },
      onClick: (e: MouseEvent<HTMLElement>) => {
        typedChild.props.onClick?.(e);
        onCardClick?.(i);
      },
    });
  });

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
}
