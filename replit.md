# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Beyond Basics Studio (`artifacts/beyond-basics-studio`)
- **Type**: React + Vite SPA
- **Preview path**: `/` (root)
- **Description**: Full marketing website for a Google Business Profile (GBP) management agency
- **Pages**: Home, Services, Case Studies, About, Contact
- **Key features**:
  - Animated hero with glowing map pin particles
  - Pricing tiers: Basic ($200/mo), Growth ($500/mo), Premium ($1,000/mo)
  - Lead capture modal with react-hook-form
  - Scroll-triggered animations via framer-motion
  - Marquee client/partner logos
  - Full feature comparison table
  - FAQ accordion on contact page
  - Dark/light alternating sections
  - Fixed navbar with transparent→solid scroll effect
- **Design**: source.paris-inspired — Parisian minimal, editorial, luxury
- **Fonts**: DM Serif Display (display headings) + Inter (body/UI) via Google Fonts
- **Color palette**:
  - `--sp-white: #F7F4F0` — warm off-white page background
  - `--sp-cream: #EDE9E2` — alternating sections
  - `--sp-ink: #0D0D0D` — full-bleed dark hero/footer sections
  - `--sp-black: #111111` — primary text
  - `--sp-gray: #888888` — secondary/muted text
  - `--sp-rule: #E0DDD8` — 1px hairline dividers
- **Sections**: alternating `section-light` / `section-cream` / `section-dark` with hairline rule dividers
- **Buttons**: `.btn-black`, `.btn-white`, `.btn-outline`, `.btn-outline-white` — uppercase, tracked, no border radius
- **Labels**: `.label` — 0.69rem, uppercase, tracked small caps in gray
- **Layout**: `--radius: 0rem`, max-w-7xl, px-6 lg:px-12, generous py-24 lg:py-32 vertical rhythm

### API Server (`artifacts/api-server`)
- Express 5 backend
- Preview path: `/api`
