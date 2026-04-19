import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

function mountApp() {
  createRoot(document.getElementById("root")!).render(<App />);
}

// In production, the build plugin converts Vite's <link rel="stylesheet"> to
// <link rel="preload" as="style" onload="this.rel='stylesheet'"> so the CSS
// is non-render-blocking (the static shell in index.html paints immediately).
//
// We wait for that async CSS to apply before mounting React, so the app never
// renders with Tailwind classes but no stylesheet (FOUC).
const asyncCSS = document.querySelector<HTMLLinkElement>('link[as="style"]');

if (asyncCSS && !asyncCSS.sheet) {
  // CSS is still loading — wait for it
  const proceed = () => mountApp();
  asyncCSS.addEventListener("load", proceed, { once: true });
  asyncCSS.addEventListener("error", proceed, { once: true });
  // Safety fallback: mount after 2s regardless (handles edge cases / network errors)
  setTimeout(proceed, 2000);
} else {
  // CSS already applied (cached visit) or dev mode (no preload link) — mount immediately
  mountApp();
}
