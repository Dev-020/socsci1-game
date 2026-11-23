# 7.9 Speech Bubble

> Spec 7.9 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Displays the commuter's in-character prompt thought (`"saan kaya ako sasakay..?"`) on the right side of the bottom panel while choosing transport.
2. **When to use:** Visible during `data-screen="turn"`. Replaced in the right panel slot by `continue-btn` and `return-btn` during `result`.
3. **Anatomy:**
   - **Bubble box (`.speech`):** Surface `color.surface.card`, text `color.accent.primary`, border `border.width.stage.7` in `color.accent.primary`, radius `radius.stage.34`, padding `space.stage.10` × `space.stage.20`, `font.size.stage.48`, `font.line-height.snug`, centered grid text.
4. **Variants:** None.
5. **States:**
   - `default` (`turn` and `ending` screens): visible.
   - `hidden` (`moving` and `result` screens): `display: none`.
6. **Behaviour:** Static flavor prompt; non-interactive.
7. **Accessibility:** Text (`color.accent.primary` on `color.surface.card`, `9.42:1`) and bubble border (`color.accent.primary` on `color.surface.panel`, `3.00:1`) pass WCAG AA (`contrast.md`).
8. **Status:** `matches` (`C25`)

**Copies today:**
- `C25` (`speech`): `src/ui-stage.ts:168`, `stage.css:525`
