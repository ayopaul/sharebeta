"use client";

import { useEffect, useRef, useCallback } from "react";
import { Color, Scene, Fog, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, PointLight } from "three";
import ThreeGlobe from "three-globe";

export interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

interface ArcData {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

interface WorldProps {
  globeConfig: GlobeConfig;
  data: ArcData[];
}

const GLOBE_RADIUS = 100;

let numbersOfRings = [0];

function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

export function World({ globeConfig, data }: WorldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);
  const frameRef = useRef<number>(0);

  const defaultProps: GlobeConfig = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  const initGlobe = useCallback(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new Scene();
    scene.fog = new Fog(0x000000, 400, 2000);

    // Camera
    const camera = new PerspectiveCamera(50, containerRef.current.clientWidth / containerRef.current.clientHeight, 1, 1500);
    camera.position.z = 300;

    // Renderer
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLightObj = new AmbientLight(new Color(defaultProps.ambientLight), 0.6);
    scene.add(ambientLightObj);

    const dLight = new DirectionalLight(new Color(defaultProps.directionalLeftLight), 1);
    dLight.position.set(-400, 100, 400);
    scene.add(dLight);

    const dLight1 = new DirectionalLight(new Color(defaultProps.directionalTopLight), 1);
    dLight1.position.set(-200, 500, 200);
    scene.add(dLight1);

    const pLight = new PointLight(new Color(defaultProps.pointLight), 0.8);
    pLight.position.set(-200, 500, 200);
    scene.add(pLight);

    // Globe
    const globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
      .hexPolygonsData(
        // Use built-in countries data
        []
      )
      .showAtmosphere(defaultProps.showAtmosphere!)
      .atmosphereColor(defaultProps.atmosphereColor!)
      .atmosphereAltitude(defaultProps.atmosphereAltitude!)
      .hexPolygonColor(() => defaultProps.polygonColor!);

    // Globe material
    const globeMaterial = globe.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(defaultProps.globeColor);
    globeMaterial.emissive = new Color(defaultProps.emissive);
    globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity!;
    globeMaterial.shininess = defaultProps.shininess!;

    globeRef.current = globe;
    scene.add(globe);

    // Load countries data
    fetch("/countries.geojson")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((countries) => {
        globe
          .hexPolygonsData(countries.features)
          .hexPolygonResolution(3)
          .hexPolygonMargin(0.7)
          .hexPolygonColor(() => defaultProps.polygonColor!);

        // Add arcs
        globe
          .arcsData(data)
          .arcColor((d: unknown) => (d as ArcData).color)
          .arcStroke(0.5)
          .arcDashLength(defaultProps.arcLength!)
          .arcDashGap(2)
          .arcDashAnimateTime(defaultProps.arcTime!)
          .arcsTransitionDuration(1000)
          .arcDashInitialGap((d: unknown) => (d as ArcData).order);

        // Add rings at arc endpoints
        const interval = setInterval(() => {
          if (!globeRef.current) {
            clearInterval(interval);
            return;
          }
          numbersOfRings = genRandomNumbers(0, data.length, Math.floor(data.length * 0.6));
          const ringsData = data
            .filter((_, i) => numbersOfRings.includes(i))
            .map((d) => ({
              lat: d.endLat,
              lng: d.endLng,
              color: d.color,
            }));
          globeRef.current
            .ringsData(ringsData)
            .ringColor((d: unknown) => (t: number) => {
              const c = (d as { color: string }).color;
              return `${c}${Math.floor(255 * (1 - t)).toString(16).padStart(2, "0")}`;
            })
            .ringMaxRadius(defaultProps.maxRings!)
            .ringPropagationSpeed(3)
            .ringRepeatPeriod((defaultProps.arcTime! * defaultProps.arcLength!) / defaultProps.rings!);
        }, 2000);

        // Set initial rotation to face initialPosition
        if (defaultProps.initialPosition) {
          const { lat, lng } = defaultProps.initialPosition;
          globe.rotation.y = (-lng * Math.PI) / 180;
          globe.rotation.x = (lat * Math.PI) / 180;
        }
      })
      .catch((err) => console.warn("Globe: could not load countries data", err));

    // Pointer interaction
    let pointerDown = false;
    let pointerX = 0;
    let rotationSpeed = defaultProps.autoRotateSpeed || 0.5;

    renderer.domElement.style.cursor = "grab";
    renderer.domElement.addEventListener("pointerdown", (e) => {
      pointerDown = true;
      pointerX = e.clientX;
      renderer.domElement.style.cursor = "grabbing";
    });
    window.addEventListener("pointerup", () => {
      pointerDown = false;
      renderer.domElement.style.cursor = "grab";
    });
    renderer.domElement.addEventListener("pointermove", (e) => {
      if (pointerDown) {
        const delta = e.clientX - pointerX;
        globe.rotation.y += delta * 0.005;
        pointerX = e.clientX;
      }
    });

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (defaultProps.autoRotate && !pointerDown) {
        globe.rotation.y += rotationSpeed * 0.002;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      globeRef.current = null;
    };
  }, []);

  useEffect(() => {
    const cleanup = initGlobe();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initGlobe]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "600px", position: "relative" }}
    />
  );
}
