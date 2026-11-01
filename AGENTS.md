# Commuter Game

A Metro Manila commuting game for the SOCSCI1 capstone. It is a school project, so keep everything simple.

Live site: https://dev-020.github.io/socsci1-game/

Design documents and simulation findings live outside this repo, in
`C:/GitBash/Obsidian/COLLEGE/Semesters/2026-2027_1st-Sem/SOCSCI1/capstone`.

## Start here

Read `AI/ACTIVE_CONTEXT/ACTIVE_CONTEXT.md` first. It says what is in progress.

## Rules

- **Plan first:** show the user the implementation plan and wait for approval before building anything non-trivial.
- **Stack:** raw HTML, CSS and TypeScript only. Don't add Vite, frameworks, npm packages or other tools unless the user asks.
- **Rules stay separate from display:** game rules go in `src/game.ts`, balance values in `src/data.ts`, and display code in `src/ui.ts`.
- **Don't change the odds silently:** any change to rules, values or random rolls needs the simulations rerun.
- **Pushing:** push only when the user asks, because a push to `master` publishes to the live site.

## Commands

Compile `src/` into `js/`. The compiled `js/` folder is committed because GitHub Pages serves it.

```bash
npx -p typescript tsc
```

Test locally at `http://localhost:8000`. Opening `index.html` directly won't work, because the game uses ES modules.

```bash
python -m http.server
```

## Versions and changelog

- The game uses Semantic Versioning, following `warehouse/versioning.md`. While the version is `0.x.y`, bump MINOR for features and PATCH for fixes.
- Record changes in `CHANGELOG.md`, following `warehouse/changelog.md`.
- For a release, update `VERSION` in `src/data.ts`, move `[Unreleased]` into a dated heading, and tag it `game@<version>`.

## Warehouse

`warehouse/` holds synced copies. Never edit them here.

- Operating rules: `warehouse/agent-protocol.md`
- Working memory and active context: `warehouse/working-memory.md`, `warehouse/active-context.md`
- Commit messages: `warehouse/commits.md`
