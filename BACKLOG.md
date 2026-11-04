# Commuter Game Backlog

The prioritized task list for maintenance, features, and technical debt for the Metro Manila Commuting Game.

> **How this backlog is run** (`convention/backlog`)
> - **Layout:** single file
> - **IDs:** `[#NNN]`, allocated as the highest existing number + 1, never reused
> - **Entry style:** full
> - **Writes:** by hand, one writer at a time

---

## 📋 In Progress

---


## 📌 Backlog (Open Tasks)

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
