import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

/**
 * Injects the pre-generated noscript-content.html as a <noscript> block
 * at the end of <body>. Invisible to regular visitors (JS is always on),
 * but fully readable by any non-JS fetcher: LLM crawlers, curl, search bots.
 *
 * The file is built by scripts/generate-content.ts (runs as prebuild).
 * Contains: navigation links, all page text, all customer story summaries,
 * all article sections, team, pricing, FAQ, and contact info.
 */
function injectNoscriptContent(): Plugin {
  return {
    name: "inject-noscript-content",
    apply: "build",
    transformIndexHtml(html: string): string {
      const p = path.resolve(import.meta.dirname, "public", "noscript-content.html");
      if (!fs.existsSync(p)) return html;
      const content = fs.readFileSync(p, "utf8");
      // Inject BEFORE <div id="root"> so the content appears early in the byte
      // stream. Even if a fetcher truncates a large response, the nav links and
      // key sections are visible before the JS React shell.
      return html.replace(
        '<div id="root">',
        `<noscript id="bbs-crawler-noscript">\n${content}\n</noscript>\n<div id="root">`,
      );
    },
  };
}

/**
 * Converts Vite's render-blocking <link rel="stylesheet"> to a non-blocking
 * preload link with onload fallback. This lets the static HTML shell paint
 * immediately without waiting for the 110KB CSS bundle to download.
 *
 * React (main.tsx) waits for the CSS to apply before mounting, preventing
 * any flash of unstyled content.
 */
function asyncStylesheetPlugin(): Plugin {
  return {
    name: "async-stylesheet",
    apply: "build",
    transformIndexHtml(html: string): string {
      return html.replace(
        /(<link rel="stylesheet" crossorigin href="([^"]+\.css)"[^>]*>)/g,
        (fullTag) => {
          // Strip trailing > or /> then re-add with onload
          const base = fullTag.replace(/\s*\/?>$/, "");
          const asyncTag = base
            .replace('rel="stylesheet"', 'rel="preload" as="style"')
            + ` onload="this.rel='stylesheet'">`;
          return `${asyncTag}\n    <noscript>${fullTag}</noscript>`;
        },
      );
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    injectNoscriptContent(),
    asyncStylesheetPlugin(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-motion";
          }
          if (id.includes("node_modules/@tanstack")) {
            return "vendor-query";
          }
          if (id.includes("node_modules/@studio-freight/lenis")) {
            return "vendor-lenis";
          }
          if (id.includes("node_modules/wouter")) {
            return "vendor-router";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
          if (
            id.includes("node_modules/react-hook-form") ||
            id.includes("node_modules/@formspree") ||
            id.includes("node_modules/@hookform")
          ) {
            return "vendor-forms";
          }
        },
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
