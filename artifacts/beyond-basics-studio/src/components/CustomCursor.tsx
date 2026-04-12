import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Hide default cursor on desktop only
    const style = document.createElement("style");
    style.id = "cursor-hide";
    style.textContent = `
      @media (pointer: fine) {
        *, *::before, *::after { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    }

    function onLeave() { setVisible(false); }
    function onEnter() { setVisible(true); }
    function onDown() { setClicking(true); }
    function onUp() { setClicking(false); }

    function checkHover(e: MouseEvent) {
      const target = e.target as Element;
      const isInteractive = target.closest("a, button, [role='button'], label, select, input, textarea");
      setHovering(!!isInteractive);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousemove", checkHover);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    // Animation loop for the trailing ring
    function animate() {
      const speed = 0.115;
      ring.current.x += (pos.current.x - ring.current.x) * speed;
      ring.current.y += (pos.current.y - ring.current.y) * speed;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    }
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
      document.getElementById("cursor-hide")?.remove();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const dotSize = clicking ? 3 : 5;
  const ringSize = hovering ? 40 : clicking ? 22 : 30;

  return (
    <>
      {/* Inner dot — precise, no lag */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: "50%",
          backgroundColor: "var(--sp-black)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-100px, -100px)",
          marginLeft: `-${dotSize / 2}px`,
          marginTop: `-${dotSize / 2}px`,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease, width 0.15s ease, height 0.15s ease, background-color 0.2s ease, margin 0.15s ease",
          mixBlendMode: "difference",
        }}
      />

      {/* Outer ring — lagging, interpolated */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderRadius: "50%",
          border: "1px solid var(--sp-black)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-100px, -100px)",
          marginLeft: `-${ringSize / 2}px`,
          marginTop: `-${ringSize / 2}px`,
          opacity: visible ? (hovering ? 0.5 : 0.25) : 0,
          transition: "opacity 0.3s ease, width 0.25s ease, height 0.25s ease, margin 0.25s ease",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
