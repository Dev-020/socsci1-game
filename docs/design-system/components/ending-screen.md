# 7.13 Ending Screen

> Spec 7.13 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Displays the run outcome (`WIN`, `BURNOUT`, or `STRANDED`) in a centered modal over a dimmed scene scrim with final stats and a restart trigger.
2. **When to use:** Shown when `game.outcome` is set and the user advances past the final result screen (`data-screen="ending"`).
3. **Anatomy:**
   - **Scrim (`.ending-scrim`):** Box at `layout.screen.{x,y,w,h}`, radius `radius.stage.34`, fill `color.surface.scrim`.
   - **Modal box (`.ending-box`):** Surface `color.surface.card`, text `color.accent.primary`, border `border.width.stage.9` in `color.accent.primary`, radius `radius.stage.44`, padding `space.stage.34` × `space.stage.40`.
   - **Parts:** `.ending-title` (`font.family.display`, `font.size.stage.40`, `font.weight.regular`, `font.line-height.body`, margin `space.stage.18`, `color.status.win`, `shadow.stage.text-md`), `.ending-text` (`color.ink.primary`, `font.size.stage.52`, `font.line-height.tight`, margin `space.stage.18`), `.ending-stats .result-line` (`color.ink.primary`, `font.size.stage.50`), and `ending-btn` (`7.12`).
4. **Variants:**
   - `win` (`data-result="win"`): `.ending-title` uses `color.status.win`.
   - `lose` (`data-result="lose"`, `BURNOUT` / `STRANDED`): `.ending-title` uses `color.status.danger`.
5. **States:**
   - `default`: hidden (`display: none` on `.layer-ending`).
   - `selected` (`data-screen="ending"`): layer fades in and `.ending-box` plays `pop` (`motion.duration.normal`, `motion.scale.pop-start` → `motion.scale.rest`).
6. **Behaviour:** Clicking `ending-btn` resets the run and returns to `select-screen`.
7. **Accessibility:** `color.ink.primary` body text (`15.38:1`), `ending-title` `win` (`4.52:1`) and `lose` (`4.53:1`), and `ending-btn` (`15.38:1` halo) all pass WCAG AA (`contrast.md`).
8. **Status:** `matches` (`C37`, `C38`, `C39`)

**Copies today:**
- `C37` (`ending-screen`): `src/ui-stage.ts:219`, `stage.css:234`
- `C38` (`ending-scrim`): `src/ui-stage.ts:227`, `stage.css:883`
- `C39` (`ending-box`): `src/ui-stage.ts:220`, `stage.css:892`
