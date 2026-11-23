# 7.14 Stage Footnote

> Spec 7.14 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Renders the subtle bottom-margin strip below the console frame showing either the changelog navigation link on the title screen or the active deterministic run seed during gameplay and endings.
2. **When to use:** Persistent container on `.stage`; displays content on `title`, `turn`, `moving`, `result`, and `ending` (blank on `select`).
3. **Anatomy:**
   - **Footnote bar (`.footnote`):** Centered line below `.frame` (`layout-map.md`), text `color.text.footnote`, `font.size.stage.42`.
   - **Changelog link (`.footnote a`):** Inherits `color.text.footnote` and `font.size.stage.42`, underlined (`text-decoration: underline`).
4. **Variants:**
   - Title screen: holds `<a>` pointing to `changelog.html` (`v<VERSION> · changelog`).
   - Gameplay/Ending screens: holds plain text `seed: <seed>`.
   - Select screen: empty string.
5. **States:** Static text and native `<a>` link; no custom hover or focus rules beyond browser link defaults.
6. **Behaviour:** Clicking the title-screen link navigates to `changelog.html`.
7. **Accessibility:** `color.text.footnote` (`#804400`) on `color.surface.backdrop` (`#ffb95f`) measures `4.50:1`, meeting the `4.5:1` requirement for `42*--px` text (`contrast.md`).
8. **Status:** `matches` (`C7`, `C58`)

**Copies today:**
- `C7` (`footnote`): `src/ui-stage.ts:120`, `stage.css:286`
- `C58` (`Browser <a> (stage footnote)`): `src/ui-stage.ts:463`, `stage.css:294`
