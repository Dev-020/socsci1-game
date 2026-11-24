# 7.18 Life Row & Condition Tooltip

> Spec 7.18 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Keeps the run's starting conditions in view during play. A third panel row shows one small icon per condition, and a tooltip gives its name, description and effects.
2. **When to use:** On the turn and result screens, in the bottom panel (`7.10`) under the money and energy rows. Weather is left out because it already has its own box (`C20`).
3. **Anatomy:**
   - **Label (`.life-label`):** a `.stat-label` (`C30`) reading "life", on row `layout.stat-life.y` (`847`).
   - **Row (`.life-row`):** spans the bar box (`layout.stat-bar.x` / `layout.stat-bar.w`) on the same row, with four icons spread evenly.
   - **Icon (`.life-icon`):** a 62 × 62 `<button>` holding a `C5` image box. It has border `border.width.stage.3` in `color.accent.primary` and radius `radius.stage.8`. The placeholder label shows the option's initials at `font.size.stage.24`.
   - **Tooltip (`.cond-tip`):** anchored at `layout.panel-col.x`, just above the panel, 620 wide.
     - fill `color.surface.panel`;
     - border `border.width.stage.4` in `color.accent.primary`;
     - radius `radius.stage.24`;
     - padding `space.stage.14` × `space.stage.20`.
     
     It holds:
     - `.cond-tip-title`: `font.size.stage.40`, `color.text.inverse` with the ink outline;
     - `.cond-tip-desc` and `.cond-tip-effects`: `font.size.stage.34`, `color.ink.primary`.
4. **Variants:** none.
5. **States:**
   - **Icon `hover` / `focus-visible`:** scales by `motion.scale.hover` over `motion.duration.fast`.
   - **Tooltip `hidden` / `shown`:** hover or focus shows it, and leaving hides it.
   - **Tooltip `pinned`:** a click or tap keeps it open until the same icon is clicked again, the player clicks anywhere else, or presses Escape.
6. **Behaviour:**
   - The row is built once per game and kept across turns.
   - The tooltip closes when the screen leaves turn and result.
7. **Accessibility:**
   - Each icon is a button with `aria-label` "category: option" and `aria-describedby` pointing at the tooltip (`role="tooltip"`), so keyboard and screen-reader users get the same text.
   - Contrast passes (see [`contrast.md`](../contrast.md)): the icon border is `3.00:1` on the panel, tooltip text is `4.91:1` and the tooltip title is `15.38:1`.
   - The plain UI lists the same conditions as text (`7.15`).
8. **Status:** `planned` (`C63`). Built in #009; the component list picks it up at its next audit.

**Copies today:**
- `src/ui-stage.ts:224` (row and tooltip), `:483` (`fillLife`), `:498` (`showTip`)
- `stage.css:793` (`.life-label`), `:798` (`.life-row`), `:807` (`.life-icon`), `:828` (`.cond-tip`)
