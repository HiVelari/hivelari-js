# CLAUDE.md

## Commands

### Build

- Build all packages: `pnpm build`
- Build specific package: `pnpm --filter <package-name> build` (e.g. `pnpm --filter @hivelari/sdk build`)

### Type Check & Test

- Type-check all packages: `pnpm check-types`
- Run all tests: `pnpm test`
- Run tests in watch mode: `pnpm --filter @hivelari/sdk run test:watch` (if configured, or `pnpm --filter @hivelari/sdk exec vitest`)

### Lint & Format

- Lint workspace using Biome: `pnpm lint`
- Format workspace using Biome: `pnpm format`

### Playground & Sandbox Execution

- Run local SimAPI sandbox server: `pnpm --filter @hivelari/sandbox run serve` (Runs Hono server on port 3001)
- Run playground API server: `pnpm --filter hivelari-playground run server` (Runs Express server on port 3000)
- Run playground Vite web client GUI: `pnpm --filter hivelari-playground run gui` (Runs Vite client on port 5173)

---

## Workspace Structure

- `packages/sdk`: Server-only TypeScript SDK client for the Velari API.
- `packages/sandbox`: Mock API sandbox server using `@simapi/simapi` & `Hono` to replicate real endpoints.
- `apps/playground`: Developer playground app comprising a Vite frontend GUI and an Express proxy backend to experiment with the SDK against local/live APIs.

---

## Code Guidelines & Style

### Imports & Aliases

- In `@hivelari/sdk`, use the `@/` path alias pointing to `src/` directory (e.g. `import { ... } from '@/types/commerce';`).
- Do not use relative directory walking (e.g. `../../types`) inside `packages/sdk/src`.

### Server-Only & Environments

- The SDK is **server-only**. Keep `import 'server-only';` at the top of client modules.
- The SDK environment configuration requires `VELARI_SPACE_ID`, `VELARI_PUBLIC_KEY`, and `VELARI_SECRET_KEY` env variables via Zod validation.
- The SDK does **not** feature an internal test/faking mode. Toggling client targets is achieved by changing the env variables (e.g. `VELARI_API_URL` to the sandbox `http://localhost:3001`) and reinstantiating the client.

### Testing

- Place test files next to the source files they test with `.test.ts` extension (e.g. `src/resources/commerce/Product.test.ts`).
- Avoid giant monolithic test files. Keep assertions focused, small, and clear.
