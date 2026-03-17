"use client";

import { motion, useSpring } from "framer-motion";
import React, { useState, useEffect, useMemo } from "react";

function Star({
  mousePosition,
  containerRef,
  initialTop,
  initialLeft,
  size,
  duration,
  delay,
}: {
  mousePosition: { x: number | null; y: number | null };
  containerRef: React.RefObject<HTMLDivElement | null>;
  initialTop: string;
  initialLeft: string;
  size: number;
  duration: number;
  delay: number;
}) {
  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    if (
      !containerRef.current ||
      mousePosition.x === null ||
      mousePosition.y === null
    ) {
      springX.set(0);
      springY.set(0);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const starX =
      containerRect.left +
      (parseFloat(initialLeft) / 100) * containerRect.width;
    const starY =
      containerRect.top +
      (parseFloat(initialTop) / 100) * containerRect.height;

    const deltaX = mousePosition.x - starX;
    const deltaY = mousePosition.y - starY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const radius = 600;

    if (distance < radius) {
      const force = 1 - distance / radius;
      const pullX = deltaX * force * 0.5;
      const pullY = deltaY * force * 0.5;
      springX.set(pullX);
      springY.set(pullY);
    } else {
      springX.set(0);
      springY.set(0);
    }
  }, [mousePosition, initialTop, initialLeft, containerRef, springX, springY]);

  return (
    <motion.div
      className="absolute bg-foreground/60 rounded-full"
      style={{
        top: initialTop,
        left: initialLeft,
        width: `${size}px`,
        height: `${size}px`,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
      }}
    />
  );
}

// Pre-generate random values to avoid hydration mismatch
function generateStarData(count: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    // Use seeded-like deterministic values based on index
    const seed1 = ((i * 2654435761) >>> 0) / 4294967296;
    const seed2 = ((i * 2246822519) >>> 0) / 4294967296;
    const seed3 = ((i * 3266489917) >>> 0) / 4294967296;
    const seed4 = ((i * 668265263) >>> 0) / 4294967296;
    stars.push({
      top: `${seed1 * 100}%`,
      left: `${seed2 * 100}%`,
      size: 0.8 + seed3 * 1.4,
      duration: 3 + seed3 * 4,
      delay: seed4 * 5,
    });
  }
  return stars;
}

export function InteractiveStarfield({
  mousePosition,
  containerRef,
}: {
  mousePosition: { x: number | null; y: number | null };
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [mounted, setMounted] = useState(false);
  const starData = useMemo(() => generateStarData(50), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {starData.map((star, i) => (
        <Star
          key={`star-${i}`}
          mousePosition={mousePosition}
          containerRef={containerRef}
          initialTop={star.top}
          initialLeft={star.left}
          size={star.size}
          duration={star.duration}
          delay={star.delay}
        />
      ))}
    </div>
  );
}
