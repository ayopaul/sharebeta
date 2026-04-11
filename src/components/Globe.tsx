"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useMemo } from "react";
import { MeshPhongMaterial, Color } from "three";

const GlobeGL = dynamic(() => import("react-globe.gl"), { ssr: false });

const arcsData = [
  { startLat: 6.5244, startLng: 3.3792, endLat: 51.5074, endLng: -0.1278, color: ["#ff6b9d", "#c084fc"] },
  { startLat: 6.5244, startLng: 3.3792, endLat: -26.2041, endLng: 28.0473, color: ["#06b6d4", "#3b82f6"] },
  { startLat: 6.5244, startLng: 3.3792, endLat: 9.0579, endLng: 7.4951, color: ["#c084fc", "#6366f1"] },
  { startLat: 51.5074, startLng: -0.1278, endLat: -26.2041, endLng: 28.0473, color: ["#ff6b9d", "#f472b6"] },
  { startLat: 9.0579, startLng: 7.4951, endLat: 12.0022, endLng: 8.5919, color: ["#06b6d4", "#22d3ee"] },
  { startLat: 51.5074, startLng: -0.1278, endLat: 53.4808, endLng: -2.2426, color: ["#c084fc", "#a78bfa"] },
  { startLat: -26.2041, startLng: 28.0473, endLat: -33.9249, endLng: 18.4241, color: ["#06b6d4", "#3b82f6"] },
  { startLat: 4.8156, startLng: 7.0498, endLat: -29.8587, endLng: 31.0218, color: ["#ff6b9d", "#c084fc"] },
  { startLat: 6.5244, startLng: 3.3792, endLat: 7.3775, endLng: 3.947, color: ["#22d3ee", "#06b6d4"] },
  { startLat: 53.4808, startLng: -2.2426, endLat: 6.5244, endLng: 3.3792, color: ["#f472b6", "#ff6b9d"] },
  { startLat: -33.9249, startLng: 18.4241, endLat: 51.5074, endLng: -0.1278, color: ["#3b82f6", "#6366f1"] },
  { startLat: 12.0022, startLng: 8.5919, endLat: 51.5074, endLng: -0.1278, color: ["#c084fc", "#ff6b9d"] },
  { startLat: 10.5264, startLng: 7.4383, endLat: 9.0579, endLng: 7.4951, color: ["#06b6d4", "#22d3ee"] },
  { startLat: 6.4584, startLng: 7.5464, endLat: 4.8156, endLng: 7.0498, color: ["#3b82f6", "#06b6d4"] },
  { startLat: -25.7479, startLng: 28.2293, endLat: -26.2041, endLng: 28.0473, color: ["#6366f1", "#c084fc"] },
  { startLat: 52.4862, startLng: -1.8904, endLat: 6.5244, endLng: 3.3792, color: ["#ff6b9d", "#f472b6"] },
];

const pointsData = [
  { lat: 6.5244, lng: 3.3792, label: "Lagos", size: 0.14 },
  { lat: 9.0579, lng: 7.4951, label: "Abuja", size: 0.1 },
  { lat: 4.8156, lng: 7.0498, label: "Port Harcourt", size: 0.08 },
  { lat: 12.0022, lng: 8.5919, label: "Kano", size: 0.08 },
  { lat: 7.3775, lng: 3.947, label: "Ibadan", size: 0.07 },
  { lat: 10.5264, lng: 7.4383, label: "Kaduna", size: 0.07 },
  { lat: 6.4584, lng: 7.5464, label: "Enugu", size: 0.07 },
  { lat: -26.2041, lng: 28.0473, label: "Johannesburg", size: 0.12 },
  { lat: -33.9249, lng: 18.4241, label: "Cape Town", size: 0.1 },
  { lat: -29.8587, lng: 31.0218, label: "Durban", size: 0.08 },
  { lat: -25.7479, lng: 28.2293, label: "Pretoria", size: 0.07 },
  { lat: 51.5074, lng: -0.1278, label: "London", size: 0.12 },
  { lat: 53.4808, lng: -2.2426, label: "Manchester", size: 0.08 },
  { lat: 52.4862, lng: -1.8904, label: "Birmingham", size: 0.07 },
];

export default function Globe() {
  const globeRef = useRef<any>(null);
  const [countries, setCountries] = useState({ features: [] });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/countries.geojson")
      .then((r) => r.json())
      .then(setCountries)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const globe = globeRef.current;

    const configure = () => {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.9;
      globe.controls().enableZoom = false;
      globe.controls().enablePan = false;
      globe.controls().minDistance = 300;
      globe.controls().maxDistance = 300;
      globe.controls().minPolarAngle = Math.PI / 3;
      globe.controls().maxPolarAngle = (Math.PI * 2) / 3;
    };
    configure();
    setTimeout(configure, 100);
    setTimeout(configure, 500);


    globe.pointOfView({ lat: 10, lng: 10, altitude: 1.6 }, 0);

    // Enhance scene lighting
    const scene = globe.scene();
    if (scene) {
      scene.children.forEach((child: any) => {
        if (child.isDirectionalLight) {
          child.intensity = 1.5;
        }
        if (child.isAmbientLight) {
          child.intensity = 0.8;
          child.color = new Color("#4a9eff");
        }
      });
    }
  }, [mounted]);

  const globeMaterial = useMemo(() => {
    const material = new MeshPhongMaterial();
    material.color = new Color("#0a1a44");
    material.emissive = new Color("#0c2461");
    material.emissiveIntensity = 0.15;
    material.shininess = 50;
    material.transparent = true;
    material.opacity = 0.95;
    return material;
  }, []);

  if (!mounted) return <div style={{ width: "100%", height: "600px" }} />;

  return (
    <div style={{
      width: "100%",
      maxWidth: "920px",
      margin: "0 auto",
      aspectRatio: "1",
      position: "relative",
    }}>
      {/* Outer glow halo */}
      <div style={{
        position: "absolute",
        inset: "5%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(60,130,246,0.15) 0%, rgba(99,102,241,0.08) 40%, transparent 65%)",
        filter: "blur(30px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      {/* Overlay to block scroll zoom while allowing page scroll */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
      }} />
      <GlobeGL
        ref={globeRef}
        width={920}
        height={920}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl=""
        globeMaterial={globeMaterial}
        showGlobe={true}
        showAtmosphere={true}
        atmosphereColor="#4a9eff"
        atmosphereAltitude={0.2}
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.7}
        hexPolygonColor={() => "rgba(100,180,255,0.8)"}
        hexPolygonAltitude={0.008}
        arcsData={arcsData}
        arcColor={"color"}
        arcStroke={0.6}
        arcDashLength={0.9}
        arcDashGap={2}
        arcDashAnimateTime={1500}
        arcAltitudeAutoScale={0.5}
        pointsData={pointsData}
        pointColor={() => "#22d3ee"}
        pointAltitude={0.02}
        pointRadius={"size"}
        pointsMerge={true}
      />
    </div>
  );
}
