# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ecc-universal** is a Claude Code plugin — a curated collection of production-ready agents, skills, hooks, commands, rules, and MCP configurations for AI-assisted software development. Requires Node 18+; uses Yarn 4 (set in `packageManager` in `package.json`).

## Commands

```bash
# Run full test suite (CI validators + unit tests)
npm test

# Run unit tests only (skips CI validators)
node tests/run-all.js

# Run individual test files
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js

# Lint (ESLint + markdownlint)
npm run lint

# Code coverage (80% threshold required)
npm run coverage

# Check catalog is in sync with skills/
npm run catalog:check

# Regenerate catalog
npm run catalog:sync

# Validate harness adapter compliance
npm run harness:adapters
npm run harness:audit

# Launch Python dashboard
npm run dashboard
```

`npm test` runs these CI checks in order: unicode safety, agent schema validation, command validation, rule validation, skill validation, hook validation, install manifest validation, personal-path leak check, catalog sync check, then the unit test suite.

## Architecture

The repo ships content consumed by multiple AI coding harnesses. Core content lives in dedicated directories; harness-specific distribution mirrors are auto-generated and should not be edited directly.

### Core content directories (edit these)

- **`agents/`** — Subagent definitions: Markdown with YAML frontmatter (`name`, `description`, `tools`, `model`). Invoked via the Task tool. Model tiers: `haiku` (simple tasks), `sonnet` (coding), `opus` (complex reasoning).
- **`skills/`** — Knowledge modules with YAML frontmatter (`name`, `description`, `origin: ECC`). Must include a `## When to Activate` section for auto-triggering. Soft cap 500 lines, hard cap 800. Curated skills live here; generated/imported skills go under `~/.claude/skills/`. See `docs/SKILL-PLACEMENT-POLICY.md`.
- **`commands/`** — User-invoked slash commands (`/tdd`, `/plan`, `/e2e`, `/code-review`, `/build-fix`, `/learn`, `/skill-create`, etc.) as Markdown with a `description` frontmatter field.
- **`hooks/`** — `hooks.json` with `PreToolUse`, `PostToolUse`, `SessionStart`, `Stop` trigger matchers and command/notification hooks.
- **`rules/`** — Always-applied guidelines injected into every session.
- **`mcp-configs/`** — MCP server configuration stubs (Context7, etc.).

### Supporting directories

- **`scripts/`** — Cross-platform Node.js utilities: `ecc.js` (CLI entry point, published as the `ecc` binary), install/repair/status/audit scripts, hook utilities under `scripts/hooks/`, shared libraries under `scripts/lib/`.
- **`scripts/ci/`** — Validators run by `npm test`: `validate-agents.js`, `validate-skills.js`, `validate-hooks.js`, `validate-commands.js`, `validate-rules.js`, `validate-install-manifests.js`, `validate-no-personal-paths.js`, `check-unicode-safety.js`.
- **`tests/`** — Unit tests for scripts and utilities (`node tests/run-all.js`).
- **`schemas/`** — JSON Schema definitions for agents, skills, hooks, and commands.
- **`manifests/`** — Install manifests controlling which files are deployed per harness.
- **`contexts/`** — Shared context files loaded at session start.
- **`legacy-command-shims/`** — Backwards-compatibility shims for renamed commands.
- **`ecc2/`** — Rust CLI rewrite (work in progress; independent `Cargo.toml`).

### Harness distribution mirrors (auto-generated — do not edit directly)

| Directory | Harness |
|-----------|----------|
| `.claude-plugin/` | Claude Code plugin loader |
| `.codex/` | OpenAI Codex |
| `.codex-plugin/` | Codex plugin system |
| `.cursor/` | Cursor IDE |
| `.gemini/` | Gemini CLI |
| `.opencode/` | OpenCode |
| `.qwen/` | Qwen |

When adding a skill that should be available in Cursor or Codex, also add it under `.cursor/skills/` or `.agents/skills/` respectively and reference it in `agents/openai.yaml`. See `CONTRIBUTING.md` for the cross-harness sync process.

## Conventions

**Commit format** (enforced by commitlint): `type(scope): subject` where type is one of `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`. Header max 100 chars, sentence/start/pascal/upper-case subject is rejected.

**File naming**: lowercase with hyphens (`python-reviewer.md`, `tdd-workflow.md`). Skill directory name must exactly match its `name` frontmatter field.

**Frontmatter `description`**: use an inline string or folded scalar (`>`). Never use a literal block (`|`, `|-`, `|+`) — internal newlines break catalog renderers.

**Package manager detection**: npm, pnpm, yarn, bun — configurable via `CLAUDE_PACKAGE_MANAGER` env var or project config. Detection logic lives in `scripts/lib/package-manager.js`.

## Skills

Use the following skills when working on related files:

| File(s) | Skill |
|---------|-------|
| `README.md` | `/readme` |
| `.github/workflows/*.yml` | `/ci-workflow` |

When spawning subagents, always pass conventions from the respective skill into the agent's prompt.
