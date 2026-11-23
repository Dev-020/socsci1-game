# 7.5 Turn Screen

> Spec 7.5 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Hosts the active gameplay loop—distance track, weather box, transit options, vehicle transit animation, result overlays, and bottom HUD panel—across three sub-states.
2. **When to use:** Active once a character is selected (`data-screen="turn"`, `"moving"`, or `"result"`), and remains visible behind the ending scrim on `"ending"`.
3. **Anatomy:**
   - **Turn layer (`.layer-turn`):** Full-stage container over `.scene` holding `distance-label`, `distance-track`, `flag-end`, `flag-now` (`7.6`), `weather-box` (`7.2`), `options` (`7.7`), `result-move` / `result-event` (`7.8`), `bottom-panel` (`7.10`), `meters` (`7.11`), and `panel-btn` controls (`7.12`).
   - Uses no extra surface tokens of its own; child components supply all visual styling.
4. **Variants:** None.
5. **States:**
   - `default`: hidden (`display: none`).
   - `turn` (`data-screen="turn"`): shows `options` and `speech`; hides `vehicle`, `result-box`, and `panel-btn`.
   - `moving` (`data-screen="moving"`): hides `options` and `speech`; shows animated `vehicle` inside `.scene`; ignores button clicks.
   - `result` (`data-screen="result"`): hides `options` and `speech`; shows `result-move`, optional `result-event`, `continue-btn`, and conditional `return-btn`.
   - `ending` (`data-screen="ending"`): remains visible underneath `.layer-ending` while hiding `options`.
6. **Behaviour:** Choosing an affordable option transitions `turn` → `moving` → `result`; `continue-btn` advances to `turn` or `ending`; `return-btn` undoes one turn back to `turn`.
7. **Accessibility:** Delegates contrast, focus, and keyboard interaction to child specs (`7.6`–`7.12`). Input clicks are gated while `moving` is active.
8. **Status:** `matches` (`C15`)

**Copies today:**
- `C15` (`turn-screen`): `src/ui-stage.ts:150`, `stage.css:230–233`
