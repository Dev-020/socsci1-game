# 7.7 Transit Option Card & Options Row

> Spec 7.7 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Presents the turn's available transit choices (`options`) as clickable pill-and-stats columns (`option`) with desktop row and portrait swipe layouts.
2. **When to use:** Shown only during `data-screen="turn"`. Hidden in `moving`, `result`, and `ending`.
3. **Anatomy:**
   - **Options container (`.options`):** Flex row with gap `space.stage.16` (0 in portrait).
   - **Option button (`.option`):** `<button>` column with gap `space.stage.2`, `font.size.stage.46`, `font.line-height.tight`, containing `.option-pill` (`color.text.inverse` on `color.surface.panel`, border `border.width.stage.9` in `color.accent.primary`, radius `radius.stage.38`, margin-bottom `space.stage.10`, `font.size.stage.50`) and `.option-stats` stack.
   - **Stat lines (`.option-line`):** `.option-pesos` (`color.stat.money` + `color.ink.primary` outline), `.option-energy` (`color.stat.energy` + `shadow.stage.text-outline-energy-edge`), `.option-km` (`color.ink.primary`), `.option-uses` (`color.accent.primary`).
4. **Variants:**
   - `loop` (`.options.loop`): mounts `.opt-before`, `.opt-main`, `.opt-after` groups with horizontal gradient fade mask (`color.mask.opaque`) in portrait when `offers.length >= 3`.
   - `copy` (`offerButton` `copy=true`): duplicate carousel card with `aria-hidden="true"` and `tabIndex = -1`.
   - `portrait` (`breakpoint.stage.portrait`): `2`-up scroll-snap cards, padding `space.stage.62`, gap `space.stage.14`, pill height `130*--px`, border `border.width.stage.12`, radius `radius.stage.65`, `font.size.stage.88`, `space.stage.pill-gap`, inline `data-uses`, compact `.short` stats (`space.stage.18` gap, `font.size.stage.74`).
5. **States:**
   - `hidden` (`moving`/`result`/`ending`): `display: none`.
   - `hover` (enabled, desktop): translates `motion.lift.option` over `motion.duration.fast` (disabled in portrait).
   - `focus` (`:focus-visible`, enabled): shares `motion.lift.option` translate (kept in portrait too; `outline: none`).
   - `disabled` (unaffordable): pill uses `color.surface.disabled` fill, `color.border.disabled` border, `color.text.disabled` label; stat lines use `color.text.disabled` with `line-through` and no shadow.
6. **Behaviour:** Portrait swipe row suppresses clicks while touching or during `motion.delay.swipe-settle` settling and silently resets scroll position to `.opt-main`.
7. **Accessibility:** Duplicate loop cards are hidden from screen readers and keyboard focus (`aria-hidden`, `tabIndex=-1`). `.option-pesos` (`9.05:1`), `.option-energy` (`4.55:1` via `color.stat.energy-edge-deep`), `.option-km` (`14.19:1`), and `.option-uses` (`8.69:1`) pass WCAG AA; `.option-pill` (`3.14:1`) is an accepted gap and disabled pairs (`2.60:1`, `4.22:1`) are WCAG disabled-exempt (`BACKLOG.md` Findings Register, `contrast.md`).
8. **Status:** `matches` (`C21`, `C22`)

**Copies today:**
- `C21` (`options`): `src/ui-stage.ts:165`, `stage.css:435`
- `C22` (`option`): `src/ui-stage.ts:256`, `stage.css:445`
