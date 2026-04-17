"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useTouchDevice } from "@/app/hooks/use-touch-device";

function OrbMesh({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isTouch = useTouchDevice();

  useFrame((state) => {
    if (!meshRef.current) return;

    if (!isTouch) {
      meshRef.current.rotation.x +=
        (mouseY * 0.5 - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y +=
        (mouseX * 0.5 - meshRef.current.rotation.y) * 0.05;
    } else {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#022977"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive="#0400f0"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

export function HeroOrb3D({ className = "" }: { className?: string }) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX((e.clientX - rect.left) / rect.width - 0.5);
    setMouseY((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div className={`hero-orb-3d ${className}`} onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#05a5ff" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#ff9900"
        />
        <OrbMesh mouseX={mouseX} mouseY={mouseY} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
