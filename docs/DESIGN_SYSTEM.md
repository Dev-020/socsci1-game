# Design System — Commuter Game

> **Follows:** `convention/design-system` 0.1.0, split with `docs/design-system/` (§10, 2026-11-19) from scoped re-audit `2026-11-22-a161d07`. Tokens, outlines, focus behaviour, and near-miss alignments applied in `a161d07` (#013); the accepted contrast gaps are listed in §9.

**Read this first, then only what the task needs:**

| For | Read |
|---|---|
| Current values | [`base.css`](../base.css) `:root` |
| Component look & rules | [`design-system/components/`](design-system/components/) (§7) |
| Component code locations | [`docs/components.json`](components.json) / [`docs/COMPONENTS.md`](COMPONENTS.md) |
| Stage boxes & alignments | [`design-system/layout-map.md`](design-system/layout-map.md) |
| Flow, swipe, new parts | [`design-system/patterns.md`](design-system/patterns.md) |
| Art asset slots & sizes | [`design-system/asset-slots.md`](design-system/asset-slots.md) (generated) |
| Decisions & approvals | [`design-system/decisions.md`](design-system/decisions.md) |
| Contrast ratios | [`design-system/contrast.md`](design-system/contrast.md) (generated) |

## 1. Header

| Field | Value |
|---|---|
| Owner | SOCSCI1 capstone group; approver: Dev (adapts Canva designs for web; deliberate differences go in the decision log, not drift). |
| Source of truth | `base.css` `:root` for values; this doc and `docs/design-system/` for roles, rules and specs. Canva is an input, imported by the approver. |
| Token file | `base.css` (CSS custom properties) |
| Platforms | `web (HTML, CSS, TypeScript)` |
| Started from | `existing code` (re-audited at `a161d07`) |
| Status | `active` |
| Code cited at | `a161d07` |
| Last reviewed | 2026-11-22 |

**Naming rule.** Names are platform-neutral, lowercase, dot-separated: `category.role[.variant][.state]`. CSS replaces dots with hyphens with a `--` prefix (`color.text.primary` ↔ `--color-text-primary`).

## 2. Principles

1. **Arcade cabinet around a 16:9 canvas.** Stage UI fits 1920 × 1080, scaling via `--px: calc(100cqw / 1920)` inside safe areas (`patterns.md`). Wins over viewport tweaks, except the portrait swipe row.
2. **One place for each value.** Visual values live in `base.css` `:root`, separate from rules (`src/game.ts`), balance (`src/data.ts`), and display (`src/ui*.ts`).
3. **Two size scales, never mixed.** Stage UI uses `N * var(--px)` (`*.stage.*`); standalone pages (`changelog.css`, `style.css`) use `px`/`rem` (`*.page.*`). Wins over forcing cabinet sizing onto pages.
4. **Plain mode stays unstyled chrome.** `?ui=plain` uses system type and light/dark tokens for rules testing. Wins over stage parity.
5. **Readable contrast & visible focus.** Text and meaningful borders meet WCAG 2.2 AA (outlined stage text uses high-contrast halos per WCAG note 5), keyboard focus uses each button's hover effect without clipping boxes, and color never stands alone.

## 3. Tokens: colour, typography and spacing

**Tiers.** Two tiers only: primitives (`neutral.white`, `neutral.black`) and semantic tokens; no component tier. Values live only in `base.css`.

<!-- generated:token-names -->
| Family | Names |
|---|---|
| `neutral.*` | white, black |
| `color.surface.*` | backdrop, backdrop-glow, panel, panel-hover, card, disabled, placeholder, scrim, code, subtle, subtle-hover |
| `color.console.*` | frame (`#d90058`), frame-light, frame-dark, knob |
| `color.scene.*` | sky-top, sky-bottom |
| `color.accent.*` | primary (`#6500b6`) |
| `color.ink.*` | primary |
| `color.text.*` | inverse, footnote (`#804400`), muted, disabled |
| `color.link.*` | subtle, hover |
| `color.border.*` | disabled, subtle |
| `color.mask.*` | opaque |
| `color.fill.*` | meter-track, hover-light, badge |
| `color.shadow.*` | frame-glow |
| `color.card.*` | worker, worker-edge |
| `color.stat.*` | money, money-edge, money-edge-deep (`#7b4700`), energy, energy-edge, energy-edge-deep (`#415e2f`) |
| `color.track.*` | bar (`#e24e58`), pole (`#a57a45`) |
| `color.status.*` | danger (`#ed002d`), win (`#2f8800`), added.{bg,text,border}, changed.{bg,text,border}, fixed.{bg,text,border}, removed.{bg,text,border} |
| `color.plain.*` | text, muted, line (`#919191`), bg, fill (plus `.dark` overrides; line-dark `#636363`) |
| `font.family.*` | body, display, plain, mono |
| `font.weight.*` | regular, bold |
| `font.letter-spacing.*` | tight |
| `font.line-height.*` | tight, snug, heading, body, relaxed, stage.{47, 50, 53} |
| `font.size.stage.*` | 24, 30, 34, 38, 40, 42, 46, 48, 50, 52, 58, 62, 74, 78, 88, 110 |
| `font.size.page.*` | 11, 12, 14, 16, 18, 20, 22, 24, 26 |
| `space.stage.*` | 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 34, 40, 54, 62, 160, pill-gap |
| `space.page.*` | 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 48, plain-max, changelog-max |
| `radius.stage.*` | 8, 10, 16, 24, 30, 34, 38, 44, 48, 62, 65 |
| `radius.page.*` | 4, 8, 12 |
| `border.width.stage.*` | 3, 4, 5, 7, 8, 9, 10, 12 |
| `border.width.page.*` | 1, 2, 3 |
| `shadow.stage.*` | text-sm, text-outline-ink, text-outline-ink-thin, text-outline-money-edge, text-outline-energy-edge, text-md, text-lg, text-xl, frame-bevel, frame-glow, knob-bevel, scene-recess |
| `shadow.page.*` | card |
| `breakpoint.*` | page.mobile (`480px`), stage.portrait (`700px`) |
| `motion.*` | duration.{fast,normal,slow,none,drive}, delay.swipe-settle, timeout.move, lift.{card,option}, scale.{hover,pop-start,rest} |
| `opacity.*` | disabled, visible |
| `layout.*` | screen.{x,y,w,h}, panel-col.x, panel-row-top.y, stat-bar.{x,w}, stat-money.y, stat-energy.y, btn.h, turn-content.x |
<!-- /generated:token-names -->

## 4. Tokens: other

Radius, border, shadow, breakpoint (`700px` portrait; `480px` mobile), opacity, and shared `layout.*` tokens appear in §3. One-off stage coordinates live in [`layout-map.md`](design-system/layout-map.md) without tokens; stacking uses DOM order (no `z-index` tokens).

## 5. Themes

**Rule:** Themes override semantic tokens only and carry their own WCAG AA contrast checks.
- **Stage default:** `base.css` + `DEFAULT_THEME` (`src/theme.ts:16-21`), holding `id`, `name`, `energyBarStyle`, and `moneyDisplayStyle` (colour overrides live in `stage.css:10-23` `[data-character]` CSS custom properties).
- **Plain UI:** Light (`style.css:1-3`) and `@media (prefers-color-scheme: dark)` (`style.css:5-13`) using `color.plain.*` tokens.
- **Student, Worker, PWD:** `Not yet defined (waiting on #007)` (`src/theme.ts:24-40`, `stage.css:10-23`).
- **`CharacterTheme` (`src/theme.ts:8-14`):** `id`, `name`, `energyBarStyle` (`segmented`/`continuous`), `moneyDisplayStyle` (`bar`/`digital`), `badgeLabel?`.

**Adding a theme:** (1) add `CHARACTERS` entry (`src/data.ts`); (2) register in `CHARACTER_THEMES` (`src/theme.ts`); (3) add `.stage[data-character="<slug>"]` overrides in `stage.css`; (4) supply `assets/character-<slug>.png`.

## 6. Motion

| What moves | Tokens | Where |
|---|---|---|
| Hover & focus lift / scale | `motion.duration.fast`, `motion.lift.{card,option}`, `motion.scale.hover` | `stage.css:278,325,458` |
| Layer fade & modal pop | `motion.duration.normal`, `motion.scale.{pop-start,rest}`, `opacity.visible` | `stage.css:959-990` |
| Flag, money, energy bars | `motion.duration.slow` | `stage.css:416,652,674` |
| Vehicle drive & fallback | `motion.duration.drive`, `motion.timeout.move` | `stage.css:980`, `src/ui-stage.ts:18` |
| Portrait swipe settle | `motion.delay.swipe-settle` | `src/ui-stage.ts:19` |

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` sets `transition-duration: 0s !important` and `animation-duration: 0s !important` (`stage.css:733-738`).

## 7. Components

All 58 components (`C1`–`C58`) match their specs (`2026-11-22-a161d07`). Button states: `hover` and `focus` (`:focus-visible` shares the button's hover effect with `outline: none` at `stage.css:81-83`; portrait `.option:not(:disabled):focus-visible` keeps its lift), `disabled` (`not-allowed`, `stage.css:77-79`).

| § | Spec | `C` IDs |
|---|---|---|
| 7.1 | [Console shell](design-system/components/console-shell.md) | C1–C3 |
| 7.2 | [Scene & weather](design-system/components/scene.md) | C4–C6, C20 |
| 7.3 | [Title screen](design-system/components/title-screen.md) | C8–C10 |
| 7.4 | [Select & cards](design-system/components/select-screen-and-character-card.md) | C12–C14 |
| 7.5 | [Turn screen](design-system/components/turn-screen.md) | C15 |
| 7.6 | [Distance track](design-system/components/distance-track.md) | C16–C19 |
| 7.7 | [Transit options](design-system/components/transit-option-card.md) | C21, C22 |
| 7.8 | [Result boxes](design-system/components/result-boxes.md) | C23, C24 |
| 7.9 | [Speech bubble](design-system/components/speech-bubble.md) | C25 |
| 7.10 | [Bottom panel](design-system/components/bottom-panel.md) | C26–C30 |
| 7.11 | [Meters](design-system/components/meters.md) | C31–C34 |
| 7.12 | [Stage buttons](design-system/components/stage-buttons.md) | C11, C35, C36, C40 |
| 7.13 | [Ending screen](design-system/components/ending-screen.md) | C37–C39 |
| 7.14 | [Footnote](design-system/components/footnote.md) | C7, C58 |
| 7.15 | [Plain UI](design-system/components/plain-ui.md) | C41–C47, C57 |
| 7.16 | [Changelog page](design-system/components/changelog-page.md) | C48–C56 |

## 8. Patterns

- [`layout-map.md`](design-system/layout-map.md): stage boxes (`a161d07`), layout tokens, resolved near-misses (`U4 = 0`).
- [`patterns.md`](design-system/patterns.md): `--px` scaling, safe areas, flow, swipe row, `.imgbox`, adding components.
- [`asset-slots.md`](design-system/asset-slots.md): 23 art slots, 2× PNG sizes, transparency, scene safe area (approved 2026-11-21).

## 9. Accessibility

WCAG 2.2 AA: 4.5:1 text (3:1 headings `font.size.stage >= 48` or `font.size.page >= 24px`); 3:1 UI edges; 2.4.7 focus visible via hover effect (no outline box); reduced motion honored; color never alone. Outlined text uses its halo as ground (`contrast.md`, 91 pairs).

**Remaining failing pairs (12 of 91 in `contrast.md`; all accepted or exempt):**

| Group | Failing pairs (`ratio` / `needs`) | Status |
|---|---|---|
| `panel-text` (5) | `color.text.inverse` on `.card-0` (`3.14`), `.card-1` (`2.48`), `.card-2` (`3.00`), `.option-pill` (`3.14`), `.unreleased-badge` (`3.14` vs `4.5`) | Accepted by owner 2026-11-21 |
| `meters` (5) | `.money-bar` border (`1.04`), `.money-fill` (`2.14`), `.energy-seg` border (`1.53`), `.energy-seg` fill (`2.26`), continuous `.energy-bar` border (`1.53` vs `3.0`) | Accepted by owner 2026-11-21 |
| `disabled` (2) | `.option:disabled .option-pill` (`2.60`), `.option:disabled .option-line` (`4.22` vs `4.5`) | WCAG 1.4.3 disabled-control exempt |

## 10. Changes and decision log

Owner approves changes; retired tokens are deleted or `deprecated`. Log: [`decisions.md`](design-system/decisions.md). Exceptions: one-off coords (`layout-map.md`), viewport bounds (`100dvh`, `177.78vh`).
