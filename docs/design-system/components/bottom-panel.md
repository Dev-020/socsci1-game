# 7.10 Bottom Panel

> Spec 7.10 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Operational commuter dashboard anchored across the lower third of the viewport, holding the character portrait, name, optional pass badge, stat labels, meters (`7.11`), and turn controls (`7.9`, `7.12`).
2. **When to use:** Persistent across all `turn-screen` sub-states (`turn`, `moving`, `result`) and visible underneath the ending scrim.
3. **Anatomy:**
   - **Panel bar (`.panel`):** Width `layout.screen.w` at `layout.screen.x`, fill `color.surface.panel`, top border `border.width.stage.10` in `color.accent.primary`, bottom corner radii `radius.stage.34`.
   - **Portrait (`.portrait`):** Square `C5` frame at `y = layout.panel-row-top.y`, border `border.width.stage.9` in `color.accent.primary`, radius `radius.stage.30`.
   - **Player name (`.player-name`):** Heading at `layout.panel-col.x`, `layout.panel-row-top.y`, `color.text.inverse`, `font.size.stage.62`, `font.weight.regular`, `font.line-height.stage.50`, `shadow.stage.text-sm`.
   - **Commuter badge (`.commuter-badge`):** Optional pill at `layout.panel-col.x`, padding `space.stage.2` × `space.stage.12`, fill `color.fill.badge`, border `border.width.stage.3` in `color.accent.primary`, radius `radius.stage.16`, `color.text.inverse`, `font.size.stage.34`, `font.line-height.tight`, `shadow.stage.text-outline-ink` + `shadow.stage.text-sm`.
   - **Stat labels (`.stat-label`):** Aligned at `layout.panel-col.x` and `layout.stat-money.y` / `layout.stat-energy.y`, `color.text.inverse`, `font.size.stage.58`, `font.line-height.stage.47` / `font.line-height.stage.53`, `shadow.stage.text-outline-ink` + `shadow.stage.text-sm`.
4. **Variants:** `has-badge` on `.stage` (`data-has-badge="true"`) reveals `.commuter-badge`; character theme overrides `color.surface.panel` and `color.accent.primary`.
5. **States:** `.commuter-badge` is `default` (`display: none`) or `selected` (`display: block` when `data-has-badge="true"`).
6. **Behaviour:** `render` binds `theme.badgeLabel`, character portrait art, and character display name on turn entry.
7. **Accessibility:** `player-name` (`h2 >= 48`) passes `3:1` (`3.14:1`); `stat-label` and `commuter-badge` meet `15.38:1` (`4.5:1` needed) using `color.ink.primary` halo (`contrast.md`).
8. **Status:** `matches` (`C26`, `C27`, `C28`, `C29`, `C30`)

**Copies today:**
- `C26` (`panel`): `src/ui-stage.ts:170`, `stage.css:544`
- `C27` (`portrait`): `src/ui-stage.ts:171`, `stage.css:554`
- `C28` (`player-name`): `src/ui-stage.ts:175`, `stage.css:564`
- `C29` (`commuter-badge`): `src/ui-stage.ts:176`, `stage.css:575`
- `C30` (`stat-label`): `src/ui-stage.ts:208`, `stage.css:594`
