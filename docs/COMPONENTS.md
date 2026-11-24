---
type: component-list
audit-id: 2026-11-22-a161d07
commit: a161d07
record: "local only (docs/audits/2026-11-22-a161d07/), not published"
date: 2026-11-22
design-system: { path: "docs/DESIGN_SYSTEM.md", last-reviewed: 2026-11-22 }
built-by: "a local generator script (not published)"
---

# socsci1-game components

Built from audit `2026-11-22-a161d07` at commit `a161d07` (58 built components across `stage.css`, `style.css`, and `changelog.css`, plus 5 planned components). Full structured fields (`uses`, `variants`, `states`, `props`, `raw-values`) live in [`docs/components.json`](components.json).

**How to look one up:**
```sh
grep -n '"id": "C12"' docs/components.json
```

**To check freshness:**
```sh
git diff --name-only a161d07..HEAD -- src/ index.html changelog.html stage.css style.css changelog.css base.css
```

**Raw values:** none left outside `base.css` tokens (`U1 = 0` in audit `2026-11-22-a161d07` at `a161d07`).

## Built

<!-- generated:index -->
| Id | Name | Kind | Path | Status | Spec |
|---|---|---|---|---|---|
| C48 | `changelog-page` | screen | `src/changelog.ts` | matches | [changelog-page.md](design-system/components/changelog-page.md) |
| C37 | `ending-screen` | screen | `src/ui-stage.ts` | matches | [ending-screen.md](design-system/components/ending-screen.md) |
| C43 | `plain-outcome-screen` | screen | `src/ui-plain.ts` | matches | [plain-ui.md](design-system/components/plain-ui.md) |
| C42 | `plain-play-screen` | screen | `src/ui-plain.ts` | matches | [plain-ui.md](design-system/components/plain-ui.md) |
| C41 | `plain-select-screen` | screen | `src/ui-plain.ts` | matches | [plain-ui.md](design-system/components/plain-ui.md) |
| C12 | `select-screen` | screen | `src/ui-stage.ts` | matches | [select-screen-and-character-card.md](design-system/components/select-screen-and-character-card.md) |
| C8 | `title-screen` | screen | `src/ui-stage.ts` | matches | [title-screen.md](design-system/components/title-screen.md) |
| C15 | `turn-screen` | screen | `src/ui-stage.ts` | matches | [turn-screen.md](design-system/components/turn-screen.md) |
| C52 | `category-block` | composite | `src/changelog.ts` | matches | [changelog-page.md](design-system/components/changelog-page.md) |
| C14 | `character-card` | composite | `src/ui-stage.ts` | matches | [select-screen-and-character-card.md](design-system/components/select-screen-and-character-card.md) |
| C39 | `ending-box` | composite | `src/ui-stage.ts` | matches | [ending-screen.md](design-system/components/ending-screen.md) |
| C55 | `error-card` | composite | `src/changelog.ts` | matches | [changelog-page.md](design-system/components/changelog-page.md) |
| C22 | `option` | composite | `src/ui-stage.ts` | matches | [transit-option-card.md](design-system/components/transit-option-card.md) |
| C21 | `options` | composite | `src/ui-stage.ts` | matches | [transit-option-card.md](design-system/components/transit-option-card.md) |
| C27 | `portrait` | composite | `src/ui-stage.ts` | matches | [bottom-panel.md](design-system/components/bottom-panel.md) |
| C24 | `result-event` | composite | `src/ui-stage.ts` | matches | [result-boxes.md](design-system/components/result-boxes.md) |
| C23 | `result-move` | composite | `src/ui-stage.ts` | matches | [result-boxes.md](design-system/components/result-boxes.md) |
| C4 | `scene` | composite | `src/ui-stage.ts` | matches | [scene.md](design-system/components/scene.md) |
| C1 | `stage` | composite | `src/ui-stage.ts` | matches | [console-shell.md](design-system/components/console-shell.md) |
| C51 | `unreleased-card` | composite | `src/changelog.ts` | matches | [changelog-page.md](design-system/components/changelog-page.md) |
| C6 | `vehicle` | composite | `src/ui-stage.ts` | matches | [scene.md](design-system/components/scene.md) |
| C50 | `version-card` | composite | `src/changelog.ts` | matches | [changelog-page.md](design-system/components/changelog-page.md) |
| C20 | `weather-box` | composite | `src/ui-stage.ts` | matches | [scene.md](design-system/components/scene.md) |
| C49 | `back-link` | primitive | `changelog.html` | matches | [changelog-page.md](design-system/components/changelog-page.md) |
| C58 | `Browser <a> (stage footnote)` | primitive | — | matches | [footnote.md](design-system/components/footnote.md) |
| C46 | `Browser <button> (plain offer)` | primitive | — | matches | [plain-ui.md](design-system/components/plain-ui.md) |
| C47 | `Browser HTML elements (button, a, h1, h2, p — plain UI)` | primitive | — | matches | [plain-ui.md](design-system/components/plain-ui.md) |
| C53 | `code-inline` | primitive | `src/changelog.ts` | matches | [changelog-page.md](design-system/components/changelog-page.md) |
| C29 | `commuter-badge` | primitive | `src/ui-stage.ts` | matches | [bottom-panel.md](design-system/components/bottom-panel.md) |
| C56 | `compare-link` | primitive | `src/changelog.ts` | matches | [changelog-page.md](design-system/components/changelog-page.md) |
| C35 | `continue-btn` | primitive | `src/ui-stage.ts` | matches | [stage-buttons.md](design-system/components/stage-buttons.md) |
| C16 | `distance-label` | primitive | `src/ui-stage.ts` | matches | [distance-track.md](design-system/components/distance-track.md) |
| C17 | `distance-track` | primitive | `src/ui-stage.ts` | matches | [distance-track.md](design-system/components/distance-track.md) |
| C40 | `ending-btn` | primitive | `src/ui-stage.ts` | matches | [stage-buttons.md](design-system/components/stage-buttons.md) |
| C38 | `ending-scrim` | primitive | `src/ui-stage.ts` | matches | [ending-screen.md](design-system/components/ending-screen.md) |
| C34 | `energy-bar` | primitive | `src/ui-stage.ts` | matches | [meters.md](design-system/components/meters.md) |
| C32 | `energy-value` | primitive | `src/ui-stage.ts` | matches | [meters.md](design-system/components/meters.md) |
| C18 | `flag-end` | primitive | `src/ui-stage.ts` | matches | [distance-track.md](design-system/components/distance-track.md) |
| C19 | `flag-now` | primitive | `src/ui-stage.ts` | matches | [distance-track.md](design-system/components/distance-track.md) |
| C7 | `footnote` | primitive | `src/ui-stage.ts` | matches | [footnote.md](design-system/components/footnote.md) |
| C2 | `frame` | primitive | `src/ui-stage.ts` | matches | [console-shell.md](design-system/components/console-shell.md) |
| C9 | `game-title` | primitive | `src/ui-stage.ts` | matches | [title-screen.md](design-system/components/title-screen.md) |
| C5 | `imgbox` | primitive | `src/ui-stage.ts` | matches | [scene.md](design-system/components/scene.md) |
| C54 | `item-link` | primitive | `src/changelog.ts` | matches | [changelog-page.md](design-system/components/changelog-page.md) |
| C3 | `knob` | primitive | `src/ui-stage.ts` | matches | [console-shell.md](design-system/components/console-shell.md) |
| C11 | `menu-btn` | primitive | `src/ui-stage.ts` | matches | [stage-buttons.md](design-system/components/stage-buttons.md) |
| C33 | `money-bar` | primitive | `src/ui-stage.ts` | matches | [meters.md](design-system/components/meters.md) |
| C31 | `money-value` | primitive | `src/ui-stage.ts` | matches | [meters.md](design-system/components/meters.md) |
| C26 | `panel` | primitive | `src/ui-stage.ts` | matches | [bottom-panel.md](design-system/components/bottom-panel.md) |
| C44 | `plain-bar` | primitive | `src/ui-plain.ts` | matches | [plain-ui.md](design-system/components/plain-ui.md) |
| C45 | `plain-report` | primitive | `src/ui-plain.ts` | matches | [plain-ui.md](design-system/components/plain-ui.md) |
| C28 | `player-name` | primitive | `src/ui-stage.ts` | matches | [bottom-panel.md](design-system/components/bottom-panel.md) |
| C57 | `restart` | primitive | `src/ui-plain.ts` | matches | [plain-ui.md](design-system/components/plain-ui.md) |
| C36 | `return-btn` | primitive | `src/ui-stage.ts` | matches | [stage-buttons.md](design-system/components/stage-buttons.md) |
| C13 | `select-heading` | primitive | `src/ui-stage.ts` | matches | [select-screen-and-character-card.md](design-system/components/select-screen-and-character-card.md) |
| C25 | `speech` | primitive | `src/ui-stage.ts` | matches | [speech-bubble.md](design-system/components/speech-bubble.md) |
| C30 | `stat-label` | primitive | `src/ui-stage.ts` | matches | [bottom-panel.md](design-system/components/bottom-panel.md) |
| C10 | `tagline` | primitive | `src/ui-stage.ts` | matches | [title-screen.md](design-system/components/title-screen.md) |
<!-- /generated:index -->

## Planned

### C59 character-profiles-page
```yaml
name: character-profiles-page
kind: screen
purpose: "Standalone HTML page (characters.html) presenting researched socio-economic profiles, commuting experiences, and citations for Student, Worker, and PWD"
spec: null
status: planned
backlog: "#006"
```

### C60 character-theme-variants
```yaml
name: character-theme-variants
kind: composite
purpose: "Finalized per-character visual themes (student, worker, pwd) overriding semantic palette tokens, meter modes, badges, and art assets across the site"
spec: null
status: planned
backlog: "#007"
```

### C61 result-reaction-panel
```yaml
name: result-reaction-panel
kind: composite
purpose: "Contextual character reaction comments, tooltips, or commuter trivia displayed on the turn result screen"
spec: null
status: planned
backlog: "#010"
```

### C62 conditions-screen
```yaml
name: conditions-screen
kind: screen
purpose: "Today's conditions screen: five condition cards (weather, school or workplace, living situation, family, personal) with a slot-machine reveal before the first turn"
spec: "design-system/components/conditions-screen.md"
status: planned
backlog: "#009"
```

### C63 life-row
```yaml
name: life-row
kind: composite
purpose: "Third bottom-panel row with one icon per starting condition (weather excluded) and a hover, focus or tap tooltip giving its description and effects"
spec: "design-system/components/life-row.md"
status: planned
backlog: "#009"
```

## Removed

None.

## Not shown

- **G4 (`src/ui-stage.ts` runtime style mutations):** Dynamic runtime `style` mutations (`flagNow.style.left` at `src/ui-stage.ts:245`, `moneyFill.style.width` at `:235`, `energySegs[i].style.width` at `:241`, and `options.scrollLeft` at `:312-357`) compute layout percentages and scroll offsets at runtime; not tokenizable CSS values.
- **G5 (`style.css` dark-mode token overrides):** Runtime media query `@media (prefers-color-scheme: dark)` (`style.css:5-13`) switches `--color-plain-*` aliases at browser paint time.
- **G6 (Compiled `js/` directory):** `js/` is `tsc` build output from `src/` and excluded from unit analysis per scope.
- **G7 (CSS `linear-gradient` angle literals):** `90deg` gradient direction in `stage.css:93,105` is geometric angle syntax rather than a design token.
