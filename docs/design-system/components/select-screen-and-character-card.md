# 7.4 Select Screen & Character Card

> Spec 7.4 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Displays the character selection prompt and three commuter preset cards showing portrait art, starting pesos, and maximum energy.
2. **When to use:** Shown after Start on the title screen (`data-screen="select"`) or after Play Again on the ending screen.
3. **Anatomy:**
   - **Select heading (`.select-heading`):** `font.family.display`, `font.size.stage.46`, `font.weight.bold`, `font.line-height.heading`, `color.stat.money` with `shadow.stage.text-outline-ink` + `shadow.stage.text-xl`.
   - **Character card (`.character-card`):** `<button>` with border `border.width.stage.10`, radius `radius.stage.34`, padding `space.stage.14` × `space.stage.16`, gap `space.stage.8`, `color.text.inverse` at `font.size.stage.58`.
   - **Card parts:** `.card-name` (`font.line-height.snug`), `.card-art` (`C5` square with `radius.stage.30`, vertical margins `space.stage.4` / `space.stage.6`), `.card-stat` (`font.line-height.snug`).
4. **Variants:**
   - `.card-0` (Student): fill `color.surface.panel`, border `color.accent.primary`.
   - `.card-1` (Worker): fill `color.card.worker`, border `color.card.worker-edge`.
   - `.card-2` (PWD): fill `color.console.knob`, border `color.console.frame-dark`.
5. **States:**
   - Screen `default` (hidden) / `selected` (`data-screen="select"`, `motion.duration.normal` fade).
   - Card `hover` & `focus` (`:focus-visible`): translates up by `motion.lift.card` over `motion.duration.fast` (shared rule; `outline: none`).
   - Card `disabled`: `not-allowed` cursor (unused today).
6. **Behaviour:** Clicking a card creates a `Game` for the chosen character with a URL or entropy seed and opens `turn-screen`.
7. **Accessibility:** `select-heading` meets `9.05:1` (`4.5:1` needed) using `color.ink.primary` halo (`contrast.md`). `color.text.inverse` on the three shadowless card fills (`2.48–3.14:1`) is an accepted gap (`BACKLOG.md` Findings Register).
8. **Status:** `matches` (`C12`, `C13`, `C14`)

**Copies today:**
- `C12` (`select-screen`): `src/ui-stage.ts:133`, `stage.css:229`
- `C13` (`select-heading`): `src/ui-stage.ts:134`, `stage.css:302`
- `C14` (`character-card`): `src/ui-stage.ts:136`, `stage.css:311`
