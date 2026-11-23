# 7.8 Result Boxes

> Spec 7.8 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Summarizes the completed move (`result-move`) and any triggered random event (`result-event`) inside white card overlays after the vehicle animation ends.
2. **When to use:** Shown only in `data-screen="result"`; dismissed by `continue-btn` or `return-btn`.
3. **Anatomy:**
   - **Shared card shell (`.result-box`):** Surface `color.surface.card`, text `color.accent.primary`, border `border.width.stage.7` in `color.accent.primary`, radius `radius.stage.34`, padding `space.stage.14` × `space.stage.24`.
   - **Move box (`.result-move`):** Centered text; `.result-title` in `font.size.stage.62`, `font.weight.regular`, `font.line-height.tight`, bottom margin `space.stage.8`; `.result-line` in `color.ink.primary`, `font.size.stage.52`, `font.line-height.snug`.
   - **Event box (`.result-event`):** Flex row with gap `space.stage.20`; `.event-art` (`C5` square `space.stage.160`, radius `radius.stage.24`, border `border.width.stage.5` in `color.accent.primary`); `.result-title` in `font.size.stage.42`, bottom margin `space.stage.6`; `.event-desc` (`color.ink.primary`, `font.size.stage.38`, `font.line-height.tight`, margin `space.stage.6`); `.event-effects` (`color.console.frame-dark`, `font.size.stage.38`, `font.line-height.tight`).
4. **Variants:**
   - `.result-move.with-event`: narrows and shifts left (`layout.turn-content.x`) beside `.result-event`, reducing `.result-line` to `font.size.stage.46`.
5. **States:**
   - `default`: hidden (`display: none` or `[hidden]`).
   - `selected` (`data-screen="result"` and not `[hidden]`): visible with `pop` entrance (`motion.duration.normal`, `motion.scale.pop-start` → `motion.scale.rest`).
6. **Behaviour:** Purely informational cards; user advances or undoes via `panel-btn` controls (`7.12`).
7. **Accessibility:** All text pairs (`color.accent.primary`, `color.ink.primary`, `color.console.frame-dark` on `color.surface.card`) and `color.accent.primary` border on sky pass WCAG AA (`contrast.md`).
8. **Status:** `matches` (`C23`, `C24`)

**Copies today:**
- `C23` (`result-move`): `src/ui-stage.ts:166`, `stage.css:804`
- `C24` (`result-event`): `src/ui-stage.ts:167`, `stage.css:819`
