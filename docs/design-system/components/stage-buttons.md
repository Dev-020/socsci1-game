# 7.12 Stage Buttons

> Spec 7.12 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Action triggers across stage screens—starting a run (`menu-btn`), advancing or undoing a turn result (`continue-btn`, `return-btn`), and restarting after an ending (`ending-btn`).
2. **When to use:** Use for single-purpose stage navigation/confirmation actions; use `option` (`7.7`) for transit choices and `character-card` (`7.4`) for character selection.
3. **Anatomy:**
   - **`menu-btn` (borderless display trigger):** Transparent fill, no border, padding `space.stage.10`, `color.console.frame` label at `font.size.stage.110`, `font.weight.regular`, `shadow.stage.text-lg`.
   - **`panel-btn` (`continue-btn`, `return-btn`):** Height `layout.btn.h`, border `border.width.stage.8` in `color.accent.primary`, radius `radius.stage.48`, transparent fill, `color.text.inverse` label at `font.size.stage.48`, `shadow.stage.text-outline-ink` + `shadow.stage.text-sm`.
   - **`ending-btn`:** Height `layout.btn.h`, top margin `space.stage.24`, border `border.width.stage.8` in `color.accent.primary`, radius `radius.stage.48`, fill `color.surface.panel`, `color.text.inverse` label at `font.size.stage.58`, `shadow.stage.text-outline-ink` + `shadow.stage.text-sm`.
4. **Variants:**
   - `menu-btn` (title screen), `continue-btn` (upper panel slot), `return-btn` (lower panel slot), `ending-btn` (ending modal footer).
5. **States:**
   - `default` / `hidden`: `.panel-btn` is hidden outside `result`; `.return-btn[hidden]` stays hidden when `canUndo` is false.
   - `hover` & `focus` (`:focus-visible`, shared rule; `outline: none`): `menu-btn` scales to `motion.scale.hover` (`motion.duration.fast`); `panel-btn` fills with `color.fill.hover-light`; `ending-btn` fills with `color.surface.panel-hover`.
   - `disabled`: `not-allowed` cursor.
6. **Behaviour:** Native `<button>` click handlers drive screen transitions in `startStageUi`.
7. **Accessibility:** `menu-btn` (`4.73:1` on sky-bottom), `panel-btn` (`15.38:1` halo), and `ending-btn` (`15.38:1` halo) all pass WCAG AA, and keyboard focus uses each button's hover effect without an outline box (`contrast.md`, WCAG 2.4.7).
8. **Status:** `matches` (`C11`, `C35`, `C36`, `C40`)

**Copies today:**
- `C11` (`menu-btn`): `src/ui-stage.ts:124`, `stage.css:267`
- `C35` (`continue-btn`): `src/ui-stage.ts:193`, `stage.css:704`
- `C36` (`return-btn`): `src/ui-stage.ts:195`, `stage.css:708`
- `C40` (`ending-btn`): `src/ui-stage.ts:224`, `stage.css:931`
