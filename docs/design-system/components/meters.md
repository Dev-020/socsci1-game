# 7.11 Money & Energy Meters

> Spec 7.11 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Displays the commuter's remaining pesos (`money-bar`, `money-value`) and stamina (`energy-bar`, `energy-value`) inside the bottom panel.
2. **When to use:** Always shown inside `bottom-panel` during gameplay. Plain mode uses `plain-bar` (`7.15`) instead.
3. **Anatomy:**
   - **Shared grid:** Both bars align at `layout.stat-bar.{x,w}`; money row at `layout.stat-money.y`, energy row at `layout.stat-energy.y`.
   - **Money bar (`.money-bar`):** Border `border.width.stage.4` in `color.stat.money-edge`, track fill `color.fill.meter-track`; inner `.money-fill` in `color.stat.money`.
   - **Energy bar (`.energy-bar`):** 10 `.energy-seg` cells with gap `space.stage.6`; each cell has border `border.width.stage.3` in `color.stat.energy-edge`, track `color.fill.meter-track`, and inner fill in `color.stat.energy`.
   - **Numeric readouts (`.stat-value`):** `font.size.stage.62`, `font.weight.regular`; `.money-value` uses `color.stat.money`, `font.line-height.stage.53`, and `shadow.stage.text-outline-money-edge` (`color.stat.money-edge-deep`); `.energy-value` uses `color.stat.energy`, `font.line-height.stage.53`, and `shadow.stage.text-outline-energy-edge` (`color.stat.energy-edge-deep`).
4. **Variants:**
   - `segmented` (`energyBarStyle: "segmented"`): default 10 discrete bordered segments.
   - `continuous` (`data-energy-style="continuous"`): collapses segment gaps/borders and applies `border.width.stage.4` in `color.stat.energy-edge` plus `radius.stage.8` to `.energy-bar`.
5. **States:** Fill widths transition over `motion.duration.slow` (`0s` under reduced motion).
6. **Behaviour:** `showBars` sets inline percentage widths (`player.money / startMoney` and per-segment energy fraction) and updates text readouts.
7. **Accessibility:** Numeric readouts pair with visual bars and pass `4.5:1` via `-deep` edge halos (`.money-value` `4.50:1`, `.energy-value` `4.55:1`). The 5 bar/border pairs against `color.surface.panel` (`1.04–2.26:1`) are accepted gaps (`DESIGN_SYSTEM.md` §9, `contrast.md`).
8. **Status:** `matches` (`C31`, `C32`, `C33`, `C34`)

**Copies today:**
- `C31` (`money-value`): `src/ui-stage.ts:180`, `stage.css:612`
- `C32` (`energy-value`): `src/ui-stage.ts:191`, `stage.css:618`
- `C33` (`money-bar`): `src/ui-stage.ts:178`, `stage.css:639`
- `C34` (`energy-bar`): `src/ui-stage.ts:182`, `stage.css:655`
