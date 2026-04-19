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
 * Injects the pre-generated content.json as an inline
 * <script type="application/json" id="__bbs_content__"> into the HTML.
 *
 * JS-capable LLMs (and any script) can access the full site data via:
 *   JSON.parse(document.getElementById('__bbs_content__').textContent)
 *
 * The file is written by scripts/generate-content.ts which runs as prebuild.
 * In dev mode (no file present) the injection is silently skipped.
 */
function injectBBSContent(): Plugin {
  return {
    name: "inject-bbs-content",
    apply: "build",
    transformIndexHtml(html: string): string {
      const contentPath = path.resolve(import.meta.dirname, "public", "content.json");
      if (!fs.existsSync(contentPath)) return html;
      const raw = fs.readFileSync(contentPath, "utf8");
      // Inline just after <head> (before first <meta>)
      const inlineScript = `<script type="application/json" id="__bbs_content__">${raw}</script>`;
      return html.replace("</head>", `  ${inlineScript}\n</head>`);
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
    injectBBSContent(),
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
