<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

- **Next.js 16.3.1** (React 19) — not the version in your training data
- **Prisma 7** (`prisma-client` generator) with MariaDB adapter (`@prisma/adapter-mariadb`) — client output at `generated/prisma` (gitignored), NOT `node_modules/.prisma`
- **better-auth** — email/password auth via `src/lib/auth.ts`, API route at `src/app/api/auth/[...all]/route.ts`
- **shadcn/ui** — style: `radix-rhea`, new components via `npx shadcn add <name>`. NOTE: shadcn UI primitives import icons from `@remixicon/react`, not lucide
- **Zustand** — client cart state in `src/lib/cart-store.ts`, persisted to localStorage under key `skill-cart`
- **Zod v4** + react-hook-form for validation
- **Tailwind CSS v4** — config-free, uses `@import "tailwindcss"` in `src/app/globals.css`

## Setup

```bash
npm install
npx prisma generate   # outputs to generated/prisma — MUST run after install or schema changes
npm run dev
```

- Env vars: `.env` is gitignored — copy `.env.example` to `.env` and fill in. Used vars: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, plus Resend keys (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) for the contact form. `prisma.config.ts` reads `DATABASE_URL` via dotenv.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint (next core-web-vitals + typescript) |

**No `typecheck` or `test` script exists.** Run `npx tsc --noEmit` for type checking.

## Architecture

- **Route groups**: `(auth)` for login/signup, `(front)` for public-facing pages (incl. product/course/cart/about/contact)
- **Prisma client import**: relative path `../../generated/prisma/client` (no `@/` alias into generated code)
- **Prisma singleton**: `src/lib/prisma.ts` — MariaDB adapter, global instance pattern for dev hot-reload
- **Auth**: better-auth with Prisma adapter (`mysql` provider), configured in `src/lib/auth.ts`; client side in `src/lib/auth-client.ts`
- **Path alias**: `@/*` maps to `./src/*`
- **Data**: `(front)/course` and `about` pages fetch from external API `https://api.codingthailand.com` (server-side `fetch`)
- **Docker**: multi-stage build in `Dockerfile` using Next standalone output; runs `npx prisma generate` before `next build`

## Gotchas

- **No Prisma migrations** — `prisma/migrations/` does not exist. DB setup is manual: run `docs/create_table_ecommerce.sql` + `docs/insert_data_ecom_example_50_products.sql` against the MariaDB container from `docs/install_mariadb_with_docker.txt`. The better-auth tables (`User`/`Session`/`Account`/`Verification`) exist only in `prisma/schema.prisma` — use `prisma db push` or create them manually.
- `prisma generate` output goes to `generated/prisma`, not the default. The Prisma client import path in `src/lib/prisma.ts` reflects this.
- The MariaDB adapter is used even though the Prisma schema provider is `mysql` — the adapter handles the actual connection.
- `next.config.ts` sets `cacheComponents: true` and an `images.remotePatterns` allowlist (`www.fffuel.co`, `api.codingthailand.com`) — new remote image hosts must be added there.
- `AGENTS.md` auto-generation: The `<!-- BEGIN:nextjs-agent-rules -->` block is re-created by `next dev`. Keep it; only the content you add below matters.
- `CLAUDE.md` just references this file (`@AGENTS.md`).
