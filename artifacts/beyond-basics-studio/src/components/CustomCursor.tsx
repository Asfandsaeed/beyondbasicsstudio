import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Hide native cursor on desktop
    const style = document.createElement("style");
    style.id = "cursor-hide";
    style.textContent = `
      @media (pointer: fine) {
        *, *::before, *::after { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);
    const onDown   = () => setClicking(true);
    const onUp     = () => setClicking(false);
    const onHover  = (e: MouseEvent) => {
      const t = e.target as Element;
      setHovering(!!t.closest("a, button, [role='button'], label, select, input, textarea"));
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousemove", onHover);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    // rAF loop — lag the ring behind the dot
    const animate = () => {
      const speed = 0.1;
      ring.current.x += (pos.current.x - ring.current.x) * speed;
      ring.current.y += (pos.current.y - ring.current.y) * speed;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousemove", onHover);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
      document.getElementById("cursor-hide")?.remove();
    };
  }, []);

  // Skip on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // Sizing states
  const dotSize  = clicking ? 6  : 10;
  const ringSize = clicking ? 28 : hovering ? 52 : 40;

  // White cursor + mix-blend-mode:difference
  // → appears dark on light sections, light on dark sections automatically
  const cursorColor = "#ffffff";

  return (
    <>
      {/* Precise dot — no lag */}
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         `${dotSize}px`,
          height:        `${dotSize}px`,
          borderRadius:  "50%",
          backgroundColor: cursorColor,
          pointerEvents: "none",
          zIndex:        99999,
          marginLeft:    `-${dotSize / 2}px`,
          marginTop:     `-${dotSize / 2}px`,
          opacity:       visible ? 1 : 0,
          mixBlendMode:  "difference",
          transition:    "opacity 0.25s ease, width 0.18s ease, height 0.18s ease, margin 0.18s ease",
          willChange:    "transform",
        }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         `${ringSize}px`,
          height:        `${ringSize}px`,
          borderRadius:  "50%",
          border:        `1.5px solid ${cursorColor}`,
          backgroundColor: "transparent",
          pointerEvents: "none",
          zIndex:        99998,
          marginLeft:    `-${ringSize / 2}px`,
          marginTop:     `-${ringSize / 2}px`,
          opacity:       visible ? (hovering ? 0.75 : 0.45) : 0,
          mixBlendMode:  "difference",
          transition:    "opacity 0.25s ease, width 0.22s ease, height 0.22s ease, margin 0.22s ease",
          willChange:    "transform",
        }}
      />
    </>
  );
}
