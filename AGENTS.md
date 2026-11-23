<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# togetherwe

Next.js 16.4 App Router + React 19 + TypeScript + Tailwind v4 + shadcn/ui. Fresh scaffold: only the default `src/app/page.tsx` exists; there is no data layer, API route, or auth yet.

## Commands

- `npm run dev` — dev server on :3000 (Turbopack). Also generates the route types that typechecking depends on.
- `npm run build` — production build; runs its own TypeScript pass.
- `npm run lint` — runs the ESLint CLI with `eslint.config.mjs`. There is no `next lint` in Next 16 and no `lint:fix` script.
- `npx tsc --noEmit` — typecheck only (no script defined for it).
- No test runner, no CI workflows, no pre-commit hooks. Don't invent a test command; verify with lint → typecheck → build.

## Setup that is not the shadcn/Next default

- **Tailwind v4 has no config file and no PostCSS config.** CSS is compiled by the `@tailwindcss/turbopack` loader rule in `next.config.ts`. Theme tokens, `@theme inline`, and the `.dark` variables all live in `src/app/globals.css` — edit there, not in a `tailwind.config.*` or `postcss.config.*` you create.
- `globals.css` imports `shadcn/tailwind.css`, so the `shadcn` package is a **runtime dependency**. Don't move it to devDependencies or prune it.
- `src/lib/utils.ts` is just `export { cn } from "cn"`. Class merging uses the `cn` package (drop-in for clsx + tailwind-merge), not `clsx`/`tailwind-merge`. `cn` requires Node 22+.
- UI primitives are **Base UI** (`@base-ui/react/*`), not Radix. Composition uses the `render` prop (there is no `asChild`), and `className`/`style` may be functions of component state. Version-matched docs: `node_modules/@base-ui/react/docs/`.
- Add components with the locally installed CLI — `npx shadcn add <name>` — which follows `components.json` (`style: base-nova`, output `src/components/ui`). Don't hand-write components from Radix-based shadcn examples.
- Path alias `@/*` → `src/*`. App Router lives in `src/app`.
- Geist Sans is exposed as `--font-geist-sans` in `layout.tsx`, but `globals.css` maps `--font-sans` to `var(--font-sans)`, so the `font-sans` utility does not currently resolve to Geist. Fix the mapping in `globals.css` if typography looks wrong.

## Next.js 16 behaviors that bite here

- `cacheComponents: true` + `partialPrefetching: true` are enabled. Dynamic data (`cookies()`, `headers()`, `searchParams`, `Date.now()`, uncached `fetch`) must sit under `<Suspense>` or inside `"use cache"`. Route segment exports `dynamic`, `revalidate`, `fetchCache`, and `runtime` now error — use `use cache` + `cacheLife`/`cacheTag` instead (`node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`).
- Middleware is now `proxy.ts` (root or `src/`, next to `app`); `middleware.ts` is deprecated.
- Turbopack is the bundler for both `dev` and `build`. Configure it via the `turbopack` key in `next.config.ts`; webpack config is ignored.
- Route props are global generated types: `LayoutProps<"/">`, `PageProps<"/path">`. They come from `.next/dev/types` via the gitignored, auto-generated `next-env.d.ts` — don't edit either file; run `npm run dev` (or build) if route types are missing.
- Before using unfamiliar APIs, read the bundled docs at `node_modules/next/dist/docs/`; they match the installed version, unlike training data.

## AGENTS.md contains managed blocks

- The `nextjs-agent-rules` block above is rewritten by `next dev`; keep it verbatim and commit it.
- `experimental.agentFeedback: true` means `next dev` (with telemetry on) may append a `nextjs-agent-feedback` block instructing you to run `npx --no-install next internal agent-feedback-instructions` before your final response. Follow it rather than deleting it.
