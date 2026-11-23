# 7.6 Distance Track & Flags

> Spec 7.6 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Displays remaining kilometers to the destination as both a text readout and a linear track with start-to-end progress flags.
2. **When to use:** Displayed at the top-left of the turn screen throughout gameplay (`turn`, `moving`, `result`).
3. **Anatomy:**
   - **Distance label (`.distance-label`):** Single-line readout (`white-space: nowrap`) in `color.text.inverse`, `font.size.stage.48`, `shadow.stage.text-outline-ink-thin` + `shadow.stage.text-sm`.
   - **Distance track (`.distance-track`):** Horizontal bar filled with `color.track.bar` and border `border.width.stage.4` in `color.console.frame-dark`.
   - **Flags (`.flag`, `.flag-end`, `.flag-now`):** CSS-drawn pole (`::before`, `color.track.pole`) and triangular pennant (`::after`, `space.stage.18` / `space.stage.54` in `color.status.danger`).
4. **Variants:**
   - `flag-end`: static destination flag at track end.
   - `flag-now`: dynamic progress flag whose `left` offset interpolates with `distanceLeft`.
5. **States:** `flag-now` smoothly transitions `left` over `motion.duration.slow` (`0s` under reduced motion).
6. **Behaviour:** `showBars` updates `distanceLabel` text and computes `flagNow.style.left` from traveled distance fraction.
7. **Accessibility:** `distance-label` meets `15.38:1` (`4.5:1` needed) using `color.ink.primary` thin halo; `color.track.bar` (`3.01:1`), `color.track.pole` (`3.01:1`), and `color.status.danger` pennant (`3.55:1`) all pass `3:1` against sky-top (`contrast.md`). Numeric distance label accompanies the visual bar (not color-only).
8. **Status:** `matches` (`C16`, `C17`, `C18`, `C19`)

**Copies today:**
- `C16` (`distance-label`): `src/ui-stage.ts:152`, `stage.css:368`
- `C17` (`distance-track`): `src/ui-stage.ts:156`, `stage.css:377`
- `C18` (`flag-end`): `src/ui-stage.ts:157`, `stage.css:412`
- `C19` (`flag-now`): `src/ui-stage.ts:153`, `stage.css:416`
