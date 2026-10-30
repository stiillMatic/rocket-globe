import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { LAUNCH_SITES, VANDENBERG_TO_PASADENA, PASADENA } from "./launchSites";
import "./globe.css";

const ALWAYS_LABELED = ["Vandenberg SFB", "Cape Canaveral", "Baikonur Cosmodrome", "Wenchang"];

// 每个基地的标签方向偏移（手动微调）
const LABEL_OFFSETS = {
  "Vandenberg SFB":        { dir: "left",  dx: -16, dy: -20 },
  "Pasadena":              { dir: "right", dx: 16,  dy: 20 },
  "Cape Canaveral":        { dir: "right", dx: 16,  dy: 0 },
  "Baikonur Cosmodrome":   { dir: "right", dx: 16,  dy: -10 },
  "Wenchang":              { dir: "right", dx: 16,  dy: 10 },
};

export default function GlobeBackground({ scrollProgress = 0 }) {
  const globeRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let frame;
    const animate = () => {
      setPulse((Math.sin(Date.now() / 400) + 1) / 2);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = scrollProgress > 0.5;
    controls.autoRotateSpeed = 0.4;
    controls.enableZoom = false;

    const startLat = 34.4;
    const startLng = -119.3;
    const startAlt = 1.1;

    const endLat = 20;
    const endLng = -80;
    const endAlt = 2.5;

    const lat = startLat + (endLat - startLat) * scrollProgress;
    const lng = startLng + (endLng - startLng) * scrollProgress;
    const altitude = startAlt + (endAlt - startAlt) * scrollProgress;

    globeRef.current.pointOfView({ lat, lng, altitude }, 1200);
  }, [scrollProgress]);

  const allPoints = [
    ...LAUNCH_SITES,
    { name: "Pasadena", country: "YOU", lat: PASADENA.lat, lng: PASADENA.lng, isYou: true },
  ];

  const labeledPoints = allPoints.filter(
    (d) => ALWAYS_LABELED.includes(d.name) || d.isYou
  );

  return (
    <div className="globe-background">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        rendererConfig={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="/earth-8k.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#ffffff"
        atmosphereAltitude={0.15}

        pointsData={allPoints}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d) => {
          if (d.highlight || d.isYou) return "#ffffff";
          return "rgba(255,255,255,0.5)";
        }}
        pointAltitude={0.005}
        pointRadius={(d) => {
          if (d.isYou) return 0.2 + pulse * 0.25;
          if (d.highlight) return 0.3 + pulse * 0.4;
          return 0.15;
        }}
        pointLabel={(d) =>
          `<div class="globe-tooltip"><b>${d.name}</b><br/><span>${d.country}</span></div>`
        }

        htmlElementsData={labeledPoints}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.02}
        htmlElement={(d) => {
          const el = document.createElement("div");
          const isYou = d.isYou;
          const isHighlight = d.highlight;
          const offset = LABEL_OFFSETS[d.name] || { dir: "right", dx: 16, dy: 0 };
          const isLeft = offset.dir === "left";

          el.innerHTML = `
            <div style="
              display: flex;
              align-items: center;
              gap: 10px;
              flex-direction: ${isLeft ? "row-reverse" : "row"};
              transform: translate(${offset.dx}px, ${offset.dy}px);
              pointer-events: none;
              white-space: nowrap;
            ">
              <div style="
                width: 24px;
                height: 1px;
                background: ${isHighlight || isYou ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)"};
              "></div>
              <div style="
                font-family: 'JetBrains Mono', monospace;
                font-size: 10px;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                color: ${isHighlight || isYou ? "#ffffff" : "rgba(255,255,255,0.65)"};
                text-shadow: ${isHighlight || isYou ? "0 0 10px rgba(255,255,255,0.5)" : "none"};
                font-weight: ${isHighlight || isYou ? 700 : 400};
                padding: 2px 0;
              ">
                ${d.name}${isYou ? `<span style="opacity:0.5; margin-left:8px;">· YOU</span>` : ""}
              </div>
            </div>
          `;
          return el;
        }}

        arcsData={VANDENBERG_TO_PASADENA}
        arcColor={() => "#ffffff"}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}
        arcAltitude={0.15}
      />
    </div>
  );
}