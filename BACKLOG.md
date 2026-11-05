# Commuter Game Backlog

The prioritized task list for maintenance, features, and technical debt for the Metro Manila Commuting Game.

> **How this backlog is run** (`convention/backlog`)
> - **Layout:** single file
> - **IDs:** `[#NNN]`, allocated as the highest existing number + 1, never reused
> - **Entry style:** full
> - **Writes:** by hand, one writer at a time

---

## 📋 In Progress

### [#005] Add a changelog page and define pages vs screens
- **Status**: `In Progress` | **Priority**: `P2` | **Labels**: `UI`, `Feature`, `Docs`
- **Created**: 2026-11-05
- **Depends on**: None

#### Why
Players and groupmates can't see how the game has changed. The only history is `CHANGELOG.md` in the repo. A changelog page on the live site lets anyone follow the game's development, and makes it easy to explain the development process in the capstone presentation. `CHANGELOG.md` is already written for groupmates and is served by GitHub Pages as a raw file, so the page can read it directly. Nothing has to be regenerated, and it stays the only source of truth.

This is also the site's first second page. Before more pages are added, the project needs a written definition of what a page is and what a screen is.

#### Wanted
**1. Pages vs screens definition** in `docs/conventions/pages-and-screens.md`, with a pointer from `AGENTS.md` (Rules) and `docs/CODEMAP.md`:
- **Page:** its own HTML file with its own entry module (`src/<page>.ts`) and one purpose. Moving between pages loads a new document. Every page has its own URL that can be shared.
- **Screen:** one state within a page, swapped in place without a reload and driven by that page's state machine. A page with only one screen needs no screen machinery.
- **New page or new screen?** Make a new page when the content isn't part of an existing page's flow, or needs a different layout (for example, scrolling text instead of the fixed 16:9 stage).
- **Content pages that later get screens** use the URL hash (`page.html#section`), so each screen can be linked and the browser's Back button works. The game's screens stay URL-less, because a run can't be entered halfway.
- **Pages share a look, not code:** shared fonts and palette go in `base.css`. A helper like `el()` moves to a shared module only when a second page actually needs it.
- Current pages: `index.html` (the game: title, select, turn, moving, result and ending screens) and `changelog.html` (one screen).

**2. `base.css`:** move the two `@font-face` rules and the `:root` palette and font variables out of `stage.css` into `base.css`. `index.html` and `changelog.html` both load it before their own stylesheet. The stage and the `?ui=plain` screens must look exactly as before.

**3. `changelog.html` + `src/changelog.ts` + `changelog.css`** (display only, no game rules):
- `fetch("CHANGELOG.md")`, then parse the Keep a Changelog format: `## [version] - date`, `### Category`, `- item`. Render inline `` `code` `` and `[text](url)` links. Build the DOM with `textContent` or `el()`, never `innerHTML` with changelog text.
- **Unreleased:** if `[Unreleased]` has entries, show them in a `<details>` (collapsed by default) above the latest version, labelled something like "In progress (not yet released)". If it's empty, show nothing.
- **Versions:** newest first. Each version card shows its number, its date and its categories (Added / Changed / Removed / Fixed, each with its own colour tag).
- **"View code changes" link per version:** a small, secondary link to `https://github.com/Dev-020/socsci1-game/compare/game@<previous>...game@<version>`. The oldest version (0.1.0) has no previous tag, so it links to `tree/game@0.1.0`. The Unreleased section links to `compare/game@<latest>...master`. The links are built from the parsed versions, not hard-coded.
- **Short intro** at the top, written for groupmates: what the page is, and the main stages so far (Python port → seeded runs → new stage screen → animations → character themes).
- A "← back to game" link to `./`.
- A normal scrolling page, readable on a phone held upright and on desktop. It uses the pixel fonts and palette from `base.css`, without the arcade frame.
- If the fetch fails (for example, the file was opened without a server), show a short message instead of a blank page.

**4. Link from the game:** the `v<VERSION>` footnote on the stage title screen becomes a link, `v0.x.y · changelog`, to `changelog.html`. The version line on the `?ui=plain` select screen gets the same link.

**5. `.nojekyll`:** add an empty `.nojekyll` at the repo root. GitHub Pages currently runs Jekyll, which publishes an auto-rendered `/CHANGELOG.html` and `/CHANGELOG` next to our page. `.nojekyll` makes Pages serve the files as they are. `CHANGELOG.md` is still served raw.

#### Acceptance Criteria
- [x] #1 `docs/conventions/pages-and-screens.md` exists with the definitions above, and `AGENTS.md` and `docs/CODEMAP.md` point to it. `docs/CODEMAP.md` lists the new files.
- [ ] #2 `base.css` holds the fonts and palette. The stage title, select and turn screens, and `?ui=plain`, look unchanged.
- [x] #3 `changelog.html` at `http://localhost:8000/changelog.html` shows every version in `CHANGELOG.md` (0.1.0 → latest), newest first, with dates and categories.
- [x] #4 With an entry under `[Unreleased]`, a collapsed section appears above the latest version and opens on click. With `[Unreleased]` empty, it's hidden.
- [x] #5 Each version's "view code changes" link points to the right GitHub compare view (0.1.0 → tag tree, Unreleased → `...master`).
- [x] #6 Inline code and links in entries render correctly. No changelog text is inserted with `innerHTML`.
- [x] #7 The title-screen footnote and the plain-UI version line link to the changelog, and the page links back to the game.
- [ ] #8 Readable without sideways scrolling at 375 px wide and at desktop width.
- [x] #9 `npx -p typescript tsc` compiles cleanly, and the compiled `js/changelog.js` is committed.
- [x] #10 `.nojekyll` exists at the repo root.
- [x] #11 Released as a MINOR bump (next version after 0.8.0) with a `CHANGELOG.md` entry such as "A changelog page now shows what changed in each version. Open it from the version number on the title screen." No rules, values or rolls change, so the simulations don't need a rerun.

#### Notes
- 2026-11-05: Released in 0.9.0. Built by an Orca antigravity worker (gemini-3.8-flash), reviewed by the coordinator: `tsc` clean, every page and file returns 200 from a local server, and the parser reads all 10 versions with the right dates and compare links. #2 (stage and plain UI look unchanged) and #8 (phone and desktop widths) still need a visual check by the user before this item closes. Intro text written by the user.

---


## 📌 Backlog (Open Tasks)

### [#004] Raise the seed limit from 1 million to 1 billion
- **Status**: `Open` | **Priority**: `P3` | **Labels**: `Core`, `Randomness`
- **Created**: 2026-11-04
- **Depends on**: #003

#### Why
Since 0.8.0, every run uses one of 1,000,000 seeds (0 to 999,999). That is plenty for play, but two random games share a seed about once in every 1,200 games (50% chance), which could surprise players comparing runs. Testing on 2026-11-04 showed the `fixedSin` roll formula stays well mixed up to at least 10 billion seeds. At 1 billion, angle precision is still about 0.000002 radians.

| Seed limit | Event rate (35%) | Two in a row (12.25%) | Chi-square (70–130) | Largest correlation |
|---|---|---|---|---|
| 1 million (now) | 35.01% | 12.24% | 133 | 0.0012 |
| 1 billion | 34.89% | 12.17% | 116 | 0.0006 |

#### Wanted
Change `SEED_LIMIT` in `src/data.ts` from `1000000` to `1000000000`. `entropySeed()`, `seedFromLink()` and `randomSeed()` already read it, so no other logic changes. Seeds 0 to 999,999 keep exactly the same rolls, so old links and the existing simulation results stay valid.

Do not go above about 10 billion: the statistics start to drift, and past about 10^17 the turn and purpose terms are lost and every roll in a game is the same. Do not switch to mulberry32, because it needs bit operators.

#### Acceptance Criteria
- [ ] #1 `SEED_LIMIT` is `1000000000`, and `npx -p typescript tsc` compiles cleanly.
- [ ] #2 `?seed=999999999` is accepted, and `?seed=1000000000` starts a fresh random game.
- [ ] #3 `entropySeed()` always returns a whole number from 0 to 999,999,999.
- [ ] #4 Seeds 0 to 999,999 give the same runs as in 0.8.0 (spot-check a few seeds against `game@0.8.0`).
- [ ] #5 RNG checks rerun on seeds spread across the new range; results noted in `Game_RNG_Options.md` (seed range in "How a roll works" and the test notes).
- [ ] #6 A 9-digit seed fits in the stage footer and the ending screen on a phone held upright.
- [ ] #7 Released as a MINOR bump (next version after 0.8.0, e.g. 0.9.0), with a changelog line such as "Seeds now go from 0 to 999,999,999, so two games rarely share one."

---

## ✅ Completed

### [#003] Implement entropy-based seed generation
- **Status**: `Closed` | **Priority**: `P2` | **Labels**: `Core`, `Feature`, `Randomness`
- **Created**: 2026-11-04
- **Resolved**: 2026-11-04
- **Depends on**: None

#### Why
Currently, the game uses `Math.random()` to generate a starting seed when no manual seed is provided. While sufficient, this is a pseudo-random process. To introduce "true" randomness, we can harvest entropy from the physical world by capturing the high-resolution timing of the user's interaction with the UI.

#### Wanted
An entropy-harvesting mechanism that uses `performance.now()` during the character selection event to generate a highly unpredictable seed, while maintaining the existing priority of manual URL seeds.

#### Acceptance Criteria
- [x] #1 Implement `entropySeed()` helper in `src/format.ts`.
- [x] #2 Integrate entropy capture into `src/ui-plain.ts` and `src/ui-stage.ts`.
- [x] #3 Ensure manual seeds via `?seed=...` still override entropy generation.
- [x] #4 Verify "Undo" functionality remains intact.
- [x] #5 Update `VERSION` to `0.8.0` and update `CHANGELOG.md`.
- [x] #6 `npx -p typescript tsc` compiles cleanly.

#### Outcome
Implemented entropy harvesting via `performance.now()`, `Date.now()`, and `Math.random()` to provide unique seeds for every run. Enforced a seed limit of 0-999,999 to prevent float precision issues. Updated the RNG formula to use a 41.843 multiplier for better purpose separation.

### [#002] Implement character-specific themes and UI layouts (Student, Worker, PWD)
- **Status**: `Closed` | **Priority**: `P2` | **Labels**: `UI`, `Feature`, `Theming`
- **Created**: 2026-11-03
- **Resolved**: 2026-11-03
- **Depends on**: #001

#### Why
Currently, all gameplay screens use a shared lavender/purple panel and pink console frame regardless of which commuter persona is selected. Each persona represents a distinct social and physical commuter reality (Student, Corporate Worker, PWD). Their UI should visually reflect their distinct identity, including tailored console/panel color schemes, bespoke meter representations (e.g. discrete notebook blocks for Student vs. continuous corporate gauge for Worker), and unique commuter pass/badge flairs.

#### Wanted
Character-specific theming driven by the active persona during gameplay (`data-character="student"`, `data-character="worker"`, `data-character="pwd"`), altering:
1. Outer cabinet bezel, knobs, and bottom panel colors.
2. Bespoke energy and money meter renderings (segmented blocks vs continuous fluid gauges).
3. Optional character-specific commuter flair (e.g. School Pass, Corporate RFID, Priority ID).
4. Reverting cleanly to neutral default styling upon game restart or returning to title/select.

#### Acceptance Criteria
- [x] #1 Selecting a character dynamically binds their theme to the active stage UI.
- [x] #2 Character theme scaffolding and overrides defined in `stage.css` and `src/theme.ts`.
- [x] #3 Continuous vs segmented meter mode support added to `stage.css`.
- [x] #4 Commuter badge slot wired into the stage HUD and theme contract.
- [x] #5 Returning to Title or Character Select clears character-specific styles back to the default theme.
- [x] #6 `npx -p typescript tsc` compiles cleanly with zero errors.

#### Outcome
Implemented theme binding infrastructure in [`src/theme.ts`](file:///C:/GitBash/Automation/socsci1-game/src/theme.ts), [`src/ui-stage.ts`](file:///C:/GitBash/Automation/socsci1-game/src/ui-stage.ts), and [`stage.css`](file:///C:/GitBash/Automation/socsci1-game/stage.css). Characters dynamically bind dataset attributes on the stage and body, supporting character palettes, continuous energy gauges, and commuter badges, while safely preserving existing baseline visuals until the team finalizes their art.

---

### [#001] Establish design system, core tokens, and default theme template
- **Status**: `Closed` | **Priority**: `P2` | **Labels**: `UI`, `Design`, `Theming`
- **Created**: 2026-11-03
- **Resolved**: 2026-11-03

#### Why
The stage UI currently relies on sampled wireframe colors hardcoded directly into `stage.css` without formal design tokens, component specifications, or a theme contract. Adding new character identities or modifying layouts requires ad-hoc CSS tweaks and carries high regression risk. Establishing a baseline design system with a clean default template will standardize UI components and provide an easy "copy-and-customize" blueprint for any present or future character.

#### Wanted
1. A documented set of core design tokens (spatial `--px` unit, neutral console frame, base color palette, typography hierarchy, and standard drop-shadows).
2. Standardized component blueprints (action buttons, option pills, speech bubbles, popups, and HUD slots).
3. A `DEFAULT_THEME` contract and template (in TypeScript and CSS) specifying fallback layouts and meter rendering modes that any character theme can inherit from.

#### Acceptance Criteria
- [x] #1 Core design tokens (spatial unit, base palettes, typography, shadows) are formally defined and documented in `docs/DESIGN_SYSTEM.md`.
- [x] #2 Standard component blueprints (buttons, pills, dialogs, dashboard slots) are specified in `docs/DESIGN_SYSTEM.md`.
- [x] #3 A `DEFAULT_THEME` template is created in code/CSS with clear extension points for character overrides (`src/theme.ts`).
- [x] #4 `npx -p typescript tsc` compiles cleanly with zero errors.

#### Outcome
Authored [`docs/DESIGN_SYSTEM.md`](file:///C:/GitBash/Automation/socsci1-game/docs/DESIGN_SYSTEM.md) detailing the complete design tokens, component kit, and character theme contract. Implemented TypeScript theme models and default theme templates in [`src/theme.ts`](file:///C:/GitBash/Automation/socsci1-game/src/theme.ts), compiling cleanly to `js/theme.js`.

---

## 🧊 Icebox (Not Doing / Rejected)

---

## 🔎 Findings Register
