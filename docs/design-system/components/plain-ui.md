# 7.15 Plain UI (`?ui=plain`)

> Spec 7.15 of the [Commuter Game design system](../../DESIGN_SYSTEM.md).

1. **Purpose:** Minimal, unstyled-cabinet wireframe mode (`?ui=plain`) for testing game rules, math, and accessibility without arcade graphics or `--px` scaling.
2. **When to use:** Loaded by `src/ui.ts` when URL query `?ui=plain` is present (`style.css` replaces `stage.css`). Never mixed with stage components.
3. **Anatomy:**
   - **Layout:** `<main>` max-width `space.page.plain-max`, padding `space.page.32` × `space.page.16`, `font.family.plain`, `font.size.page.16`, `font.line-height.relaxed`, `color.plain.text` on `color.plain.bg`.
   - **Typography:** `h1` (`font.size.page.24`, bottom margin `space.page.16`), `h2` (`font.size.page.16`, margins `space.page.24` / `space.page.8`), `p` (`space.page.8` bottom margin), `.muted` (`color.plain.muted`, `font.size.page.14`).
   - **Meters (`.stat`, `.bar`):** Row space-between above a `space.page.6`-tall bar (`radius.page.4`, `color.plain.line` track, `color.plain.fill` bar).
   - **Report card (`.report`) & buttons (`button`, `.restart`):** `.report` top margin `space.page.12`, `button` bottom margin `space.page.8`, padding `space.page.12`, `border.width.page.1` in `color.plain.line`, `radius.page.8`; `.restart` adds top margin `space.page.24`.
4. **Variants:**
   - Screens: `plain-select-screen`, `plain-play-screen`, `plain-outcome-screen` (`WIN`, `BURNOUT`, `STRANDED`).
   - Color schemes: light (default) and `@media (prefers-color-scheme: dark)` (`color.plain.*.dark`).
5. **States:**
   - `button:hover:enabled`: border shifts to `color.plain.text`.
   - `button:disabled`: `opacity.disabled` (`0.5`), `not-allowed` cursor.
6. **Behaviour:** Full DOM re-render on click via `app.innerHTML`; native `<button>` and `<a href="changelog.html">` navigation.
7. **Accessibility:** Text and border pairs pass in both schemes (`color.plain.line` `#919191` light `3.02:1`, `#636363` dark `3.01:1`, `contrast.md`). Plain UI relies on browser-default focus styling (no custom `:focus-visible` rule in `style.css`).
8. **Status:** `matches` (`C41`, `C42`, `C43`, `C44`, `C45`, `C46`, `C47`, `C57`)

**Copies today:**
- `C41` (`plain-select-screen`): `src/ui-plain.ts:38`, `style.css:31`
- `C42` (`plain-play-screen`): `src/ui-plain.ts:69`, `style.css:31`
- `C43` (`plain-outcome-screen`): `src/ui-plain.ts:84`, `style.css:31`
- `C44` (`plain-bar`): `src/ui-plain.ts:13`, `style.css:56`
- `C45` (`plain-report`): `src/ui-plain.ts:21`, `style.css:77`
- `C46` (`Browser <button> (plain offer)`): `src/ui-plain.ts:58`, `style.css:88`
- `C47` (`Browser HTML elements (plain UI)`): `src/ui-plain.ts:41`, `style.css:37`
- `C57` (`restart`): `src/ui-plain.ts:113`, `style.css:111`
