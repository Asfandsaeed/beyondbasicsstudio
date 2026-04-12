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
- **Fonts**: Inter (body), Playfair Display (headings) via Google Fonts
- **Color palette**: Black backgrounds, white text, blue (#1E40AF) CTAs, emerald (#10B981) accents

### API Server (`artifacts/api-server`)
- Express 5 backend
- Preview path: `/api`
