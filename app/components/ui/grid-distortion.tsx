"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./grid-distortion.css";

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
uniform vec2 uTextureResolution;
varying vec2 vUv;

vec2 containUv(vec2 uv, vec2 containerSize, vec2 textureSize) {
  float containerRatio = containerSize.x / containerSize.y;
  float textureRatio = textureSize.x / textureSize.y;
  vec2 scaled = uv;

  if (containerRatio > textureRatio) {
    float scale = textureRatio / containerRatio;
    scaled.y = (uv.y - 0.5) * scale + 0.5;
  } else {
    float scale = containerRatio / textureRatio;
    scaled.x = (uv.x - 0.5) * scale + 0.5;
  }

  return scaled;
}

void main() {
  vec2 uv = containUv(vUv, resolution.xy, uTextureResolution);
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
}`;

type GridDistortionProps = {
  grid?: number;
  mouse?: number;
  strength?: number;
  relaxation?: number;
  imageSrc?: string;
  videoSrc?: string;
  className?: string;
};

export default function GridDistortion({
  grid = 15,
  mouse = 0.1,
  strength = 0.15,
  relaxation = 0.9,
  imageSrc,
  videoSrc,
  className = "",
}: GridDistortionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uTextureResolution: { value: new THREE.Vector2(1920, 1080) },
      uTexture: { value: null as THREE.Texture | null },
      uDataTexture: { value: null as THREE.DataTexture | null },
    };

    const textureLoader = new THREE.TextureLoader();
    let videoElement: HTMLVideoElement | null = null;

    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i += 1) {
      data[i * 4] = Math.random() * 255 - 125;
      data[i * 4 + 1] = Math.random() * 255 - 125;
    }

    const dataTexture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const containerAspect = width / height;
      rendererRef.current.setSize(width, height);
      plane.scale.set(containerAspect, 1, 1);

      const frustumHeight = 1;
      const frustumWidth = frustumHeight * containerAspect;
      cameraRef.current.left = -frustumWidth / 2;
      cameraRef.current.right = frustumWidth / 2;
      cameraRef.current.top = frustumHeight / 2;
      cameraRef.current.bottom = -frustumHeight / 2;
      cameraRef.current.updateProjectionMatrix();

      uniforms.resolution.value.set(width, height, 1, 1);
    };

    if (videoSrc) {
      videoElement = document.createElement("video");
      videoElement.src = videoSrc;
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.autoplay = true;
      videoElement.playsInline = true;
      videoElement.crossOrigin = "anonymous";
      videoElement.preload = "auto";

      const videoTexture = new THREE.VideoTexture(videoElement);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.wrapS = THREE.ClampToEdgeWrapping;
      videoTexture.wrapT = THREE.ClampToEdgeWrapping;
      uniforms.uTexture.value = videoTexture;
      uniforms.uTextureResolution.value.set(3840, 2160);

      void videoElement.play().catch(() => {
        /* autoplay may be blocked by browser policy */
      });
      handleResize();
    } else if (imageSrc) {
      textureLoader.load(imageSrc, (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        uniforms.uTexture.value = texture;
        uniforms.uTextureResolution.value.set(
          texture.image.width || 1920,
          texture.image.height || 1080
        );
        handleResize();
      });
    }

    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
      resizeObserverRef.current = resizeObserver;
    } else {
      window.addEventListener("resize", handleResize);
    }

    const mouseState = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vX: 0,
      vY: 0,
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      mouseState.vX = x - mouseState.prevX;
      mouseState.vY = y - mouseState.prevY;
      Object.assign(mouseState, { x, y, prevX: x, prevY: y });
    };

    const handleMouseLeave = () => {
      Object.assign(mouseState, {
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
        vX: 0,
        vY: 0,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    handleResize();

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;

      const textureData = dataTexture.image.data as Float32Array;
      for (let i = 0; i < size * size; i += 1) {
        textureData[i * 4] *= relaxation;
        textureData[i * 4 + 1] *= relaxation;
      }

      const gridMouseX = size * mouseState.x;
      const gridMouseY = size * mouseState.y;
      const maxDist = size * mouse;

      for (let i = 0; i < size; i += 1) {
        for (let j = 0; j < size; j += 1) {
          const distSq = (gridMouseX - i) ** 2 + (gridMouseY - j) ** 2;
          if (distSq < maxDist * maxDist) {
            const index = 4 * (i + size * j);
            const power = Math.min(maxDist / Math.sqrt(Math.max(distSq, 0.0001)), 10);
            textureData[index] += strength * 100 * mouseState.vX * power;
            textureData[index + 1] -= strength * 100 * mouseState.vY * power;
          }
        }
      }

      dataTexture.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }

      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);

      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      dataTexture.dispose();
      uniforms.uTexture.value?.dispose();
      if (videoElement) {
        videoElement.pause();
        videoElement.removeAttribute("src");
        videoElement.load();
      }
    };
  }, [grid, mouse, strength, relaxation, imageSrc, videoSrc]);

  return (
    <div
      ref={containerRef}
      className={`distortion-container ${className}`.trim()}
      style={{ width: "100%", height: "100%", minWidth: "0", minHeight: "0" }}
    />
  );
}
