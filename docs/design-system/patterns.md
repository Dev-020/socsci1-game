# Patterns

> Part of the [Commuter Game design system](../DESIGN_SYSTEM.md) (§8). Stage layout boxes live in [`layout-map.md`](layout-map.md).

## 1. Stage Scaling & Safe Areas (`--px`)

All stage coordinates, type sizes, borders, shadows, and radii derive from a **1920 × 1080** reference canvas via `--px: calc(100cqw / 1920)` on `.stage` (`container-type: inline-size; aspect-ratio: 16 / 9`, `stage.css:51-58`).
- `#app` fills the visible viewport (`position: fixed; inset: 0`), centers `.stage` with CSS Grid, and pads by `env(safe-area-inset-*, 0px)` (`stage.css:39-47`; `index.html` viewport updated to `viewport-fit=cover` in `src/ui.ts:15`).
- `.stage` bounds width with `min(100%, 177.78vh)` and `min(100%, calc((100dvh - safe-top - safe-bottom) * 1.7778))` so mobile browser chrome never crops the cabinet (`stage.css:55-57`).

## 2. Screen Flow

The stage mounts all six screens inside `.stage` and toggles visibility via `data-screen` (`src/ui-stage.ts:450`, `stage.css:228-235`):

```text
title ──[Start]──▶ select ──[Character card]──▶ turn
                      ▲                           │
                      │                    [Transit option]
                 [Play again]                     ▼
                      │                        moving
                   ending ◀──[Continue (end)]── result ──[Continue (active)]──▶ turn
                                                  │
                                          [Return (canUndo)]
                                                  └───────────────────────────▶ turn
```

- **State persistence:** Fixed DOM nodes (`money-fill`, `energy-bar`, `flag-now`, `panel`) stay mounted so CSS `width` and `left` transitions (`motion.duration.slow`) animate across turns.
- **Input lock during `moving`:** Button clicks are ignored while `screen === "moving"` (`src/ui-stage.ts:504`). `animationend` (`drive`, `motion.duration.drive`) or `motion.timeout.move` (`2000ms`) advances to `result`.
- **Plain UI (`?ui=plain`):** Uses a 3-screen flow (`plain-select-screen` → `plain-play-screen` → `plain-outcome-screen`) with no `moving` animation and full `innerHTML` re-renders (`src/ui-plain.ts:116-120`).

## 3. Portrait Swipe Row (`@media (orientation: portrait) and (max-width: 700px)`)

On narrow portrait phones (`breakpoint.stage.portrait`), five side-by-side transit cards do not fit cleanly, so `.options` converts into a 2-card-visible horizontal scroll-snap carousel (`stage.css:994-1077`, `src/ui-stage.ts:286-375`):

- **Infinite loop groups:** When `offers.length >= 3`, `fillOptions` mounts three identical groups (`opt-before`, `opt-main`, `opt-after`, `src/ui-stage.ts:361-371`). Duplicate cards in `before` and `after` receive `aria-hidden="true"` and `tabIndex = -1` so keyboard and screen-reader navigation stays single-pass.
- **Scroll settle reset:** After `scrollend` or `motion.delay.swipe-settle` (`120ms`) with no active touch, if `scrollLeft` lands in `opt-before` or `opt-after`, it jumps by ±`groupWidth()` back into `opt-main`. Clicks are ignored while `touchMoved` or `settling` is true (`src/ui-stage.ts:519`).
- **2-or-fewer offers:** `.options:not(.loop)` centers the cards without scrolling (`stage.css:1009-1012`).
- **Compact labels:** `.full` labels and `.option-uses` hide; `.short` abbreviations (`- 12p` → `12p`, `15e`, `4km`) show in a horizontal `.option-stats` row, and `.option-pill::after` renders `data-uses` inline (`stage.css:1056-1073`).

## 4. Placeholder-Art Pattern (`.imgbox`)

Every optional art slot (`scene`, `card-art`, `weather-box`, `portrait`, `vehicle`, `event-art`) uses `placeholderImage(src, label)` (`src/ui-stage.ts:73-78`, `stage.css:180-217`):
- Builds `.imgbox` with a fallback `.imgbox-label` pill (`color.accent.primary` on `color.surface.placeholder`, dashed `border.width.stage.3` border) and an `<img>` with `alt = label` and `object-fit: contain`.
- On `load`, `.imgbox.loaded` hides `.imgbox-label`; on `error` (when the `assets/**/*.png` file is absent; folders in [`asset-slots.md`](asset-slots.md)), the `<img>` removes itself so no broken-image icon appears and the placeholder label remains readable.
- Inside `.scene`, `.imgbox-label` tucks into the bottom-left corner on `title`/`select`/`ending` and lifts to the upper-right above `.panel` during `turn`/`moving`/`result` (`stage.css:161-176`).

## 5. Adding a Component

New UI parts—such as tooltips, fun facts, or the #010 trivia and comment panel—start on the design system before any CSS or TypeScript is written:

1. **Write its spec first** in `docs/design-system/components/`, copying the 8-part structure of an existing spec (status `specified`).
2. **Use tokens only**, adding any new token to `base.css` (`:root` or `.stage`), and [`decisions.md`](decisions.md).
3. **Add a planned entry** under `## Planned` in [`docs/COMPONENTS.md`](../COMPONENTS.md) (`status: planned`).
4. **Check contrast pairs:** every new foreground/background pair must reach WCAG AA (`4.5:1` for text, `3.0:1` for borders and fills) and be added to [`contrast.md`](contrast.md).
5. **Re-audit to graduate:** the next UI audit turns the planned entry into a `built` entry.

*(For character themes in #007, do not duplicate CSS rules—override semantic tokens in the `[data-character]` block only.)*
