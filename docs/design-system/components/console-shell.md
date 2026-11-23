# 7.1 Console Shell

> Spec 7.1 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Establishes the 16:9 arcade cabinet shell—scaled stage container, beveled outer bezel, and decorative side dials—that frames every screen of the stage UI.
2. **When to use:** Always present as the persistent outer chrome of the stage UI (`index.html`). Do not use in plain mode (`?ui=plain`) or on the changelog page.
3. **Anatomy:**
   - **Stage root (`.stage`):** 16:9 container scaled by `--px`, base text in `color.text.inverse` and `font.family.body`, centered inside the safe-area viewport over `color.surface.backdrop` and `color.surface.backdrop-glow`.
   - **Outer bezel (`.frame`):** Beveled cabinet body with horizontal gradient `color.console.frame` to `color.console.frame-light`, corner radius `radius.stage.62`, `shadow.stage.frame-bevel`, and `shadow.stage.frame-glow`.
   - **Hardware knobs (`.knob`):** Left and right circular dials using the bezel gradient, `shadow.stage.knob-bevel`, inner recess `color.console.frame-dark`, and front cap `color.console.knob`.
4. **Variants:**
   - `C1` character theme variants (`student`, `worker`, `pwd`), `energy-segmented` / `energy-continuous`, and `has-badge` via `data-*` attributes on `.stage`.
   - `C3` lateral placement variants: `knob-left` and `knob-right`.
5. **States:**
   - `C1` screen states (`title`, `select`, `turn`, `moving`, `result`, `ending`) driven by `data-screen` to show the active `.layer`.
   - `C2` and `C3` are static chrome with no interactive states.
6. **Behaviour:** Scales fluidly with viewport width and `100dvh` height constraint; user text selection is disabled on `.stage`.
7. **Accessibility:** Purely decorative chrome (`C2`, `C3`); non-interactive, holds no focus, and carries no contrast-critical text.
8. **Status:** `matches` (`C1`, `C2`, `C3`)

**Copies today:**
- `C1` (`stage`): `src/ui-stage.ts:107`, `stage.css:51`
- `C2` (`frame`): `src/ui-stage.ts:118`, `stage.css:87`
- `C3` (`knob`): `src/ui-stage.ts:118`, `stage.css:100`
