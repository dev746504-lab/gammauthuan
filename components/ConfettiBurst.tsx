"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const COLORS = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA", "#F472B6"];

type Particle = {
  id: number;
  x: number;
  delay: number;
  rotate: number;
  color: string;
  width: number;
  height: number;
};

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.15,
    rotate: 180 + Math.random() * 360,
    color: COLORS[i % COLORS.length],
    width: 6 + Math.random() * 5,
    height: 10 + Math.random() * 6,
  }));
}

type ConfettiBurstProps = {
  count?: number;
};

export default function ConfettiBurst({ count = 18 }: ConfettiBurstProps) {
  const [particles] = useState<Particle[]>(() => createParticles(count));

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.x}%`,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: 260, opacity: 0, rotate: p.rotate }}
          transition={{ duration: 0.9, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
