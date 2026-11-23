# 7.16 Changelog Page

> Spec 7.16 of the [Commuter Game design system](../../DESIGN_SYSTEM.md).

1. **Purpose:** Responsive document (`changelog.html`) fetching `CHANGELOG.md` to render release cards, category tags, and a collapsible Unreleased card.
2. **When to use:** Linked from stage footnote and plain select screen (`changelog.html`). Uses `base.css` + `changelog.css` only.
3. **Anatomy:**
   - **Page:** `space.page.changelog-max`, padding `space.page.24`/`16`/`48`, `color.ink.primary` on `color.surface.backdrop`, `font.family.body`, `font.size.page.20`, `font.line-height.body`. `.page-title`: `font.family.display`, `font.size.page.26`, `font.line-height.heading`, `font.letter-spacing.tight`.
   - **Links:** `back-link` (`font.size.page.22`, `color.ink.primary`), `compare-link` (`font.size.page.18`, `color.link.subtle`), `item-link` (`color.accent.primary`), underlined (`space.page.4`).
   - **Cards:** `color.surface.card`, `border.width.page.3` (`color.ink.primary`; `color.console.frame` on error), `radius.page.12`, `shadow.page.card`, padding `space.page.20`. `.card-header`: dashed `border.width.page.2` `color.border.subtle`; `.version-number` (`font.family.display`, `font.size.page.18`), `.version-date` (`color.text.muted`). Unreleased summary: `color.surface.subtle`, `font.size.page.22`, `font.weight.regular`; `.unreleased-badge` (`color.surface.panel`, `color.text.inverse`, `font.family.display`, `font.size.page.12`, `radius.page.4`).
   - **Tags & code:** `.category-tag` (`font.family.display`, `font.size.page.11`, `radius.page.4`, `border.width.page.1`) in `color.status.{added,changed,fixed,removed}.*`; `.code-inline` (`color.surface.code`, `color.border.subtle`, `font.family.mono`, `font.size.page.16`, `radius.page.4`).
4. **Variants:** `tag-{added,changed,fixed,removed}`; below `breakpoint.page.mobile` (`480px`), header stacks and type scales down (`font.size.page.16–20`).
5. **States:** `loading`, `error`, `hover`/`focus` on links (`color.accent.primary` / `color.link.hover`), `hover` on `unreleased-summary` (`color.surface.subtle-hover`), `selected` (`[open]` on `unreleased-card`).
6. **Behaviour:** Fetches `CHANGELOG.md` and builds safe DOM nodes (`renderRichText`).
7. **Accessibility:** All pairs pass (`>= 4.5:1` / `>= 3.0:1`, including `.error-card` border at `3.02:1`), except `.unreleased-badge` (`3.14:1` vs `4.5:1`), accepted by the owner 2026-11-21 (`DESIGN_SYSTEM.md` §9, `contrast.md`).
8. **Status:** `matches` (`C48`, `C49`, `C50`, `C51`, `C52`, `C53`, `C54`, `C55`, `C56`)

**Copies today:**
- `C48` (`changelog-page`): `src/changelog.ts:241`, `changelog.css:18`
- `C49` (`back-link`): `changelog.html:14`, `changelog.css:31`
- `C50` (`version-card`): `src/changelog.ts:181`, `changelog.css:73`
- `C51` (`unreleased-card`): `src/changelog.ts:213`, `changelog.css:128`
- `C52` (`category-block`): `src/changelog.ts:164`, `changelog.css:190`
- `C53` (`code-inline`): `src/changelog.ts:44`, `changelog.css:249`
- `C54` (`item-link`): `src/changelog.ts:49`, `changelog.css:259`
- `C55` (`error-card`): `src/changelog.ts:262`, `changelog.css:277`
- `C56` (`compare-link`): `src/changelog.ts:198`, `changelog.css:113`
