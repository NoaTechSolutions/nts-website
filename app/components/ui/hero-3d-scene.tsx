"use client";

// ─────────────────────────────────────────────────────────────
// Escena 3D del hero de Diseño Web (React Three Fiber).
// Blob distorsionado on-brand que FLOTA y REACCIONA al cursor + un satélite.
// Iluminación con luces (navy/sky/amber) — SIN Environment preset (que baja
// HDR de un CDN externo, prohibido por la regla self-hosted del proyecto).
// Se carga lazy y SOLO en desktop (ver el gate en diseno-web-hero.tsx).
// ─────────────────────────────────────────────────────────────

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";

function Scene() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    // Parallax suave siguiendo el cursor (lerp hacia el objetivo).
    const targetY = state.pointer.x * 0.6;
    const targetX = -state.pointer.y * 0.4;
    g.rotation.y += (targetY - g.rotation.y) * 0.04;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
  });

  return (
    <group ref={group}>
      {/* Blob principal */}
      <Float speed={1.5} rotationIntensity={0.7} floatIntensity={1.3}>
        <mesh scale={2.1}>
          <icosahedronGeometry args={[1, 20]} />
          <MeshDistortMaterial
            color="#0a63d6"
            emissive="#022977"
            emissiveIntensity={0.4}
            roughness={0.18}
            metalness={0.45}
            distort={0.38}
            speed={1.6}
          />
        </mesh>
      </Float>

      {/* Satélite (acento sky) */}
      <Float speed={2.3} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2.5, 1.5, -1]} scale={0.55}>
          <icosahedronGeometry args={[1, 6]} />
          <MeshDistortMaterial
            color="#05a5ff"
            emissive="#05a5ff"
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.2}
            distort={0.5}
            speed={2.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-5, -2, -2]} intensity={1.4} color="#05a5ff" />
      <pointLight position={[4, -3, 2]} intensity={0.8} color="#ff9900" />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
