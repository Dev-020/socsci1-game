# 7.19 Stage Scroll Area

> Spec 7.19 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** A box on the stage whose content scrolls up and down inside it when it is too long to fit, with a thin scrollbar that matches the game's look. It keeps long text inside its card instead of spilling over the screen border.
2. **When to use:** Any fixed-size stage box whose text can be longer than the box. Today that is the condition card's text (`.cond-body`, `7.17`). Don't use it for the portrait swipe rows (`.options`, `.cond-row`): those scroll sideways and hide their scrollbar on purpose.
3. **Anatomy:**
   - **Box (`.stage-scroll`):** `overflow-y: auto`, `overflow-x: hidden`, `overscroll-behavior: contain`, so a scroll that reaches the end doesn't move the page. The box takes its size from its parent's layout (for example `flex: 1 1 auto; min-height: 0` in a flex column).
   - **Scrollbar (Chrome, Edge, Safari):** width `size.stage.scrollbar` (`10 * --px`), so it scales with the stage. Track `transparent`. Thumb `color.accent.primary` with radius `radius.stage.8`.
   - **Scrollbar (Firefox):** browsers without `::-webkit-scrollbar` get `scrollbar-width: thin` and `scrollbar-color: color.accent.primary transparent`. Firefox can't size it to the stage, so it stays the system's thin width.
4. **Variants:** none.
5. **States:**
   - **`fits`:** the content fits, so no scrollbar shows.
   - **`overflowing`:** the content is taller than the box, so the scrollbar shows and the box scrolls by wheel, touch, or keyboard.
6. **Behaviour:**
   - The browser does the scrolling; no script is needed to scroll.
   - The code that fills the box makes it reachable by keyboard (`tabIndex = 0`) only when it overflows, so boxes that fit don't add extra Tab stops (`src/ui-stage.ts`, `stopReel`).
7. **Accessibility:**
   - The thumb is `3.00:1` on `color.surface.panel` (`3.0:1` needed, see [`contrast.md`](../contrast.md)).
   - A box that overflows is focusable, so keyboard users can scroll it with the arrow keys (WCAG 2.1.1).
   - The scrollbar stays visible rather than hidden, so players can see there is more to read.
8. **Status:** `planned` (`C64`). Built in #009; the component list picks it up at its next audit.

**Copies today:**
- `stage.css:477` (`.stage-scroll`), `:483` (scrollbar), `:491` (thumb), `:496` (Firefox)
- `src/ui-stage.ts:458` (`.cond-body`)
