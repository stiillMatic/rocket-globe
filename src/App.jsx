import Stars from "./components/Stars/Stars";
import { useEffect, useState } from "react";
import GlobeBackground from "./components/GlobeBackground/GlobeBackground";

const FONT_DISPLAY = "'Orbitron', sans-serif";
const FONT_BODY = "'Space Grotesk', system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

function App() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const threshold = window.innerHeight * 0.3;
          setStage(window.scrollY > threshold ? 1 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ minHeight: "200vh", background: "#000000", overflow: "hidden" }}>
      <Stars />
      <GlobeBackground scrollProgress={stage} />

      {/* SpaceX 风格 — 顶部暗角 */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "25vh",
        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 3,
      }} />

      {/* SpaceX 风格 — 底部大面积渐变（关键） */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "55vh",
        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 50%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 3,
      }} />

      {/* 顶部 HUD 条 */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: "1.8rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: FONT_MONO,
        fontSize: "0.7rem",
        letterSpacing: "0.25em",
        color: "rgba(255,255,255,0.6)",
        pointerEvents: "none",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#ffffff",
          }} />
          ROCKET WATCH PCC
        </span>
        <span>LIVE</span>
      </div>

      {/* 第一屏 */}
      <section style={{
        position: "relative",
        zIndex: 5,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        color: "white",
        fontFamily: FONT_BODY,
        textAlign: "left",
        padding: "0 3rem 8rem 3rem",
        pointerEvents: "none",
      }}>
        {/* 小标签 */}
        <div style={{
          opacity: stage === 0 ? 0.7 : 0,
          transition: "opacity 0.6s ease",
          marginBottom: "1.5rem",
          fontFamily: FONT_MONO,
          fontSize: "0.7rem",
          letterSpacing: "0.4em",
          color: "#ffffff",
          textTransform: "uppercase",
        }}>
          Mission · Starlink Group 15-18
        </div>

        {/* 主标题 — SpaceX 风格纯白 */}
        <h1 style={{
          fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
          margin: 0,
          color: "#ffffff",
          opacity: stage === 0 ? 1 : 0,
          transition: "opacity 0.6s ease",
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          lineHeight: 1.1,
          maxWidth: "900px",
        }}>
          See tonight's rocket launch<br />
          from campus.
        </h1>

        {/* 副标题 */}
        <p style={{
          fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
          opacity: stage === 0 ? 0.75 : 0,
          marginTop: "1.5rem",
          transition: "opacity 0.6s ease",
          fontFamily: FONT_BODY,
          fontWeight: 400,
          letterSpacing: "0.02em",
          maxWidth: "500px",
          lineHeight: 1.6,
          color: "#ffffff",
        }}>
          A Falcon 9 lifts off from Vandenberg SFB tonight at 9:02 PM Pacific. We'll tell you exactly when and where to look.
        </p>

        {/* SpaceX 风格描边按钮 */}
        <div style={{
          display: "flex",
          gap: "1rem",
          marginTop: "2.5rem",
          opacity: stage === 0 ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: "auto",
        }}>
          <SpaceXButton primary>WATCH LIVE</SpaceXButton>
          <SpaceXButton>LEARN MORE</SpaceXButton>
        </div>
      </section>

      {/* Scroll indicator */}
      <div style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: stage === 0 ? 0.5 : 0,
        transition: "opacity 0.6s ease",
        fontFamily: FONT_MONO,
        fontSize: "0.65rem",
        letterSpacing: "0.4em",
        color: "#ffffff",
        zIndex: 10,
        pointerEvents: "none",
      }}>
        ↓ SCROLL
      </div>

      {/* 第二屏 */}
      <section style={{
        position: "relative",
        zIndex: 5,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        color: "white",
        fontFamily: FONT_BODY,
        padding: "0 3rem 8rem 3rem",
        textAlign: "left",
        opacity: stage,
        transition: "opacity 0.6s ease",
        pointerEvents: stage ? "auto" : "none",
      }}>
        <div style={{
          marginBottom: "1.5rem",
          fontFamily: FONT_MONO,
          fontSize: "0.7rem",
          letterSpacing: "0.4em",
          color: "#ffffff",
          opacity: 0.7,
          textTransform: "uppercase",
        }}>
          10 Sites · 1 Planet
        </div>

        <h2 style={{
          fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
          color: "#ffffff",
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 1.1,
          maxWidth: "800px",
        }}>
          Launches happen worldwide.
        </h2>

        <p style={{
          fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
          opacity: 0.75,
          maxWidth: "550px",
          marginTop: "1.5rem",
          fontFamily: FONT_BODY,
          lineHeight: 1.6,
          color: "#ffffff",
        }}>
          From Vandenberg to Baikonur, Wenchang to Kourou — but tonight, the one you can see is 235 km up the coast.
        </p>
      </section>
    </div>
  );
}

function SpaceXButton({ children, primary }) {
  return (
    <a
      href="#"
      style={{
        padding: "0.9rem 2rem",
        border: `1px solid ${primary ? "#ffffff" : "rgba(255,255,255,0.4)"}`,
        background: primary ? "rgba(255,255,255,0.95)" : "transparent",
        color: primary ? "#000000" : "#ffffff",
        textDecoration: "none",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.75rem",
        letterSpacing: "0.3em",
        fontWeight: 700,
        textTransform: "uppercase",
        transition: "all 0.2s ease",
        display: "inline-block",
      }}
      onMouseEnter={(e) => {
        if (primary) {
          e.target.style.background = "transparent";
          e.target.style.color = "#ffffff";
        } else {
          e.target.style.borderColor = "#ffffff";
        }
      }}
      onMouseLeave={(e) => {
        if (primary) {
          e.target.style.background = "rgba(255,255,255,0.95)";
          e.target.style.color = "#000000";
        } else {
          e.target.style.borderColor = "rgba(255,255,255,0.4)";
        }
      }}
    >
      {children}
    </a>
  );
}

export default App;