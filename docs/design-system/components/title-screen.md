# 7.3 Title Screen

> Spec 7.3 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Opening screen presenting the game title, premise tagline, and Start trigger inside the arcade viewport.
2. **When to use:** Initial entry screen (`data-screen="title"`). Transitions to the character select screen (`7.4`).
3. **Anatomy:**
   - **Title layer (`.layer-title`):** Full-stage overlay over `.scene`.
   - **Game title (`.game-title`):** Uppercase `font.family.display` at `font.size.stage.78`, `font.weight.bold`, `font.line-height.heading`, `color.stat.money` with `shadow.stage.text-outline-ink` + `shadow.stage.text-xl`.
   - **Tagline (`.tagline`):** Subtitle copy in `font.family.body` at `font.size.stage.52`, `color.text.inverse` with `shadow.stage.text-outline-ink-thin` + `shadow.stage.text-md`.
   - **Start action:** `menu-btn` (`C11`, see [`stage-buttons.md`](stage-buttons.md)).
4. **Variants:** None.
5. **States:**
   - `default`: hidden (`display: none` on `.layer`).
   - `selected` (`data-screen="title"`): visible with `fade` animation (`motion.duration.normal`).
6. **Behaviour:** Clicking `menu-btn` switches `data-screen` to `select`; footnote (`7.14`) displays the changelog link on this screen only.
7. **Accessibility:** `game-title` (`9.05:1` vs `3.0:1`) and `tagline` (`15.38:1` vs `4.5:1`) pass WCAG AA using `color.ink.primary` halos (`contrast.md`).
8. **Status:** `matches` (`C8`, `C9`, `C10`)

**Copies today:**
- `C8` (`title-screen`): `src/ui-stage.ts:123`, `stage.css:228`
- `C9` (`game-title`): `src/ui-stage.ts:127`, `stage.css:245`
- `C10` (`tagline`): `src/ui-stage.ts:128`, `stage.css:257`
