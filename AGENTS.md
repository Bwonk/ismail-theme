# ikas Code Components Project — agent instructions

This file is for coding agents that read `AGENTS.md` (Codex and others).
The full project guide is in `CLAUDE.md`, next to this file. Read it before writing code — everything in it applies to you.

## Hard rules

- **Never edit `ikas.config.json` directly** — no file write, patch or search/replace. Change it only through `ikas-component` commands (`npx ikas-component config add-component`, `add-prop`, `update-prop`, `add-enum`; `npx ikas-component config list` to inspect).
- **`projectId` and every component `id` are generated once and never change.** Do not rename them, and never copy an id shown by the editor or returned by an MCP tool into `ikas.config.json`. On a theme that installed this project as a design asset the editor reports published ids with a different prefix — that is expected, not something to fix. A component id that does not start with this project's `projectId` makes `ikas-component dev` / `publish` fail.
- **Never create or edit generated files by hand:** `types.ts`, `global-types.ts`, `src/components/index.ts`.
- **Query the MCP server before using storefront APIs.** Do not guess function signatures or type shapes.
