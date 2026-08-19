<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

- **Next.js 16.3.1** (React 19) — not the version in your training data
- **Prisma** with MariaDB adapter (`@prisma/adapter-mariadb`) — client output at `generated/prisma`, NOT `node_modules/.prisma`
- **better-auth** — email/password auth via `src/lib/auth.ts`, API route at `src/app/api/auth/[...all]/route.ts`
- **shadcn/ui** — style: `radix-rhea`, icons: `lucide`. New components via `npx shadcn add <name>`
- **Zustand** — client cart state in `src/lib/cart-store.ts`, persisted to localStorage under key `skill-cart`
- **Zod v4** + react-hook-form for validation
- **Tailwind CSS v4** — config-free, uses `@import "tailwindcss"` in `src/app/globals.css`

## Setup

```bash
npm install
npx prisma generate   # outputs to generated/prisma — MUST run after install or schema changes
cp .env.example .env  # configure DATABASE_URL before prisma generate
npm run dev
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint (next core-web-vitals + typescript) |

**No `typecheck` or `test` script exists.** Run `npx tsc --noEmit` for type checking.

## Architecture

- **Route groups**: `(auth)` for login/signup, `(front)` for public-facing pages
- **Prisma client import**: `from "../../generated/prisma/client"` (not the usual `@prisma/client`)
- **Prisma singleton**: `src/lib/prisma.ts` — uses MariaDB adapter, global instance pattern for dev hot-reload
- **Auth**: better-auth with Prisma adapter (`mysql` provider), configured in `src/lib/auth.ts`
- **Path alias**: `@/*` maps to `./src/*`

## Gotchas

- `prisma generate` output goes to `generated/prisma`, not the default. The Prisma client import path in `src/lib/prisma.ts` reflects this.
- The MariaDB adapter is used even though the Prisma schema provider is `mysql` — the adapter handles the actual connection.
- `AGENTS.md` auto-generation: The `<!-- BEGIN:nextjs-agent-rules -->` block is re-created by `next dev`. Keep it; only the content you add below matters.
- No `.env.example` found — check `.env` for required vars (`DATABASE_URL` at minimum).
