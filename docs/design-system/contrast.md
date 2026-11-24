# Contrast Pairs

> Part of the [Commuter Game design system](../DESIGN_SYSTEM.md) (§9).
> Generated from [`base.css`](../../base.css) (`:root`) and a list of foreground/background pairs by a local script (not published). Don't edit the table by hand: change `base.css` and regenerate it.
> Text shadows and outlines are ignored in WCAG contrast ratios. Translucent fills (`rgba(...)`) are composited over their adjacent opaque ground. Failing pairs are listed in `DESIGN_SYSTEM.md` §9 as proposed findings for P3.

<!-- generated:contrast -->
| Foreground | Background | Source | Ratio | Needs | Pass | Where |
|---|---|---|---|---|---|---|
| `--color-stat-money` | `--color-ink-primary` | base.css | 9.05:1 | 3.0:1 | yes | `stage.css:253` (.game-title (halo as ground)) |
| `--color-text-inverse` | `--color-ink-primary` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:265` (.tagline (halo as ground)) |
| `--color-console-frame` | `--color-scene-sky-bottom` | base.css | 4.73:1 | 4.5:1 | yes | `stage.css:275` (.menu-btn (button; shadow ignored)) |
| `--color-text-footnote` | `--color-surface-backdrop` | base.css | 4.50:1 | 4.5:1 | yes | `stage.css:292` (.footnote and changelog link on backdrop) |
| `--color-stat-money` | `--color-ink-primary` | base.css | 9.05:1 | 4.5:1 | yes | `stage.css:308` (.select-heading (halo as ground)) |
| `--color-text-inverse` | `--color-surface-panel` | base.css | 3.14:1 | 4.5:1 | **no** | `stage.css:320` (.card-0 (Student) text) |
| `--color-accent-primary` | `--color-scene-sky-bottom` | base.css | 8.69:1 | 3.0:1 | yes | `stage.css:316` (.card-0 (Student) border on sky) |
| `--color-text-inverse` | `--color-card-worker` | base.css | 2.48:1 | 4.5:1 | **no** | `stage.css:320` (.card-1 (Worker) text) |
| `--color-card-worker-edge` | `--color-scene-sky-bottom` | base.css | 4.44:1 | 3.0:1 | yes | `stage.css:316` (.card-1 (Worker) border on sky) |
| `--color-text-inverse` | `--color-console-knob` | base.css | 3.00:1 | 4.5:1 | **no** | `stage.css:320` (.card-2 (PWD) text) |
| `--color-console-frame-dark` | `--color-scene-sky-bottom` | base.css | 5.43:1 | 3.0:1 | yes | `stage.css:316` (.card-2 (PWD) border on sky) |
| `--color-text-inverse` | `--color-ink-primary` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:512` (.distance-label (halo as ground)) |
| `--color-console-frame-dark` | `--color-scene-sky-top` | base.css | 4.61:1 | 3.0:1 | yes | `stage.css:522` (.distance-track border on sky) |
| `--color-track-bar` | `--color-scene-sky-top` | base.css | 3.01:1 | 3.0:1 | yes | `stage.css:521` (.distance-track fill on sky) |
| `--color-accent-primary` | `--color-scene-sky-top` | base.css | 7.39:1 | 3.0:1 | yes | `stage.css:565` (.weather-box border on sky) |
| `--color-accent-primary` | `--color-surface-placeholder over --color-scene-sky-top` | base.css | 8.45:1 | 4.5:1 | yes | `stage.css:208` (.imgbox-label on sky-top (scene, weather, card-art, portrait, vehicle, event-art)) |
| `--color-accent-primary` | `--color-surface-placeholder over --color-scene-sky-bottom` | base.css | 9.10:1 | 4.5:1 | yes | `stage.css:208` (.imgbox-label on sky-bottom (scene, weather, card-art, portrait, vehicle, event-art)) |
| `--color-accent-primary` | `--color-surface-placeholder over --color-scene-sky-top` | base.css | 8.45:1 | 3.0:1 | yes | `stage.css:205` (.imgbox-label dashed border on sky-top) |
| `--color-accent-primary` | `--color-surface-placeholder over --color-scene-sky-bottom` | base.css | 9.10:1 | 3.0:1 | yes | `stage.css:205` (.imgbox-label dashed border on sky-bottom) |
| `--color-track-pole` | `--color-scene-sky-top` | base.css | 3.01:1 | 3.0:1 | yes | `stage.css:538` (.flag::before pole on sky) |
| `--color-status-danger` | `--color-scene-sky-top` | base.css | 3.55:1 | 3.0:1 | yes | `stage.css:546` (.flag::after pennant on sky) |
| `--color-text-inverse` | `--color-surface-panel` | base.css | 3.14:1 | 4.5:1 | **no** | `stage.css:607` (.option-pill label) |
| `--color-accent-primary` | `--color-scene-sky-bottom` | base.css | 8.69:1 | 3.0:1 | yes | `stage.css:604` (.option-pill border on sky) |
| `--color-stat-money` | `--color-ink-primary` | base.css | 9.05:1 | 4.5:1 | yes | `stage.css:623` (.option-pesos (halo as ground)) |
| `--color-stat-energy` | `--color-stat-energy-edge-deep` | base.css | 4.55:1 | 4.5:1 | yes | `stage.css:633` (.option-energy (halo as ground, deep shade)) |
| `--color-ink-primary` | `--color-scene-sky-bottom` | base.css | 14.19:1 | 4.5:1 | yes | `stage.css:637` (.option-km on sky) |
| `--color-accent-primary` | `--color-scene-sky-bottom` | base.css | 8.69:1 | 4.5:1 | yes | `stage.css:642` (.option-uses on sky) |
| `--color-text-disabled` | `--color-surface-disabled` | base.css | 2.60:1 | 4.5:1 | **no** | `stage.css:655` (.option:disabled .option-pill text (WCAG disabled exempt)) |
| `--color-border-disabled` | `--color-scene-sky-bottom` | base.css | 3.54:1 | 3.0:1 | yes | `stage.css:654` (.option:disabled .option-pill border (WCAG disabled exempt)) |
| `--color-text-disabled` | `--color-scene-sky-bottom` | base.css | 4.22:1 | 4.5:1 | **no** | `stage.css:659` (.option:disabled .option-line on sky (WCAG disabled exempt)) |
| `--color-accent-primary` | `--color-surface-card` | base.css | 9.42:1 | 4.5:1 | yes | `stage.css:672` (.speech text) |
| `--color-accent-primary` | `--color-surface-panel` | base.css | 3.00:1 | 3.0:1 | yes | `stage.css:669` (.speech border on panel) |
| `--color-accent-primary` | `--color-scene-sky-bottom` | base.css | 8.69:1 | 3.0:1 | yes | `stage.css:689` (.panel top border against sky-bottom) |
| `--color-accent-primary` | `--color-surface-panel` | base.css | 3.00:1 | 3.0:1 | yes | `stage.css:689` (.panel top border against panel) |
| `--color-text-inverse` | `--color-surface-panel` | base.css | 3.14:1 | 3.0:1 | yes | `stage.css:709` (.player-name (h2 >= 48*--px)) |
| `--color-accent-primary` | `--color-surface-panel` | base.css | 3.00:1 | 3.0:1 | yes | `stage.css:719` (.commuter-badge border on panel) |
| `--color-text-inverse` | `--color-ink-primary` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:725` (.commuter-badge text (halo as ground)) |
| `--color-text-inverse` | `--color-ink-primary` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:739` (.stat-label (halo as ground)) |
| `--color-stat-money` | `--color-stat-money-edge-deep` | base.css | 4.50:1 | 4.5:1 | yes | `stage.css:770` (.money-value readout (halo as ground)) |
| `--color-stat-energy` | `--color-stat-energy-edge-deep` | base.css | 4.55:1 | 4.5:1 | yes | `stage.css:775` (.energy-value readout (halo as ground)) |
| `--color-stat-money-edge` | `--color-surface-panel` | base.css | 1.04:1 | 3.0:1 | **no** | `stage.css:782` (.money-bar border on panel) |
| `--color-stat-money` | `--color-fill-meter-track over --color-surface-panel` | base.css | 2.14:1 | 3.0:1 | **no** | `stage.css:790` (.money-fill on meter track) |
| `--color-stat-energy-edge` | `--color-surface-panel` | base.css | 1.53:1 | 3.0:1 | **no** | `stage.css:804` (.energy-seg border on panel) |
| `--color-stat-energy` | `--color-fill-meter-track over --color-surface-panel` | base.css | 2.26:1 | 3.0:1 | **no** | `stage.css:812` (.energy-seg fill on meter track) |
| `--color-stat-energy-edge` | `--color-surface-panel` | base.css | 1.53:1 | 3.0:1 | **no** | `stage.css:819` (continuous .energy-bar outer border on panel) |
| `--color-text-inverse` | `--color-ink-primary` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:907` (.panel-btn label (halo as ground)) |
| `--color-text-inverse` | `--color-ink-primary` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:922` (.panel-btn:hover label (halo as ground)) |
| `--color-accent-primary` | `--color-surface-panel` | base.css | 3.00:1 | 3.0:1 | yes | `stage.css:901` (.panel-btn and .portrait border on panel) |
| `--color-accent-primary` | `--color-scene-sky-top` | base.css | 7.39:1 | 3.0:1 | yes | `stage.css:985` (.vehicle border on sky-top) |
| `--color-accent-primary` | `--color-scene-sky-bottom` | base.css | 8.69:1 | 3.0:1 | yes | `stage.css:985` (.vehicle border on sky-bottom) |
| `--color-accent-primary` | `--color-surface-card` | base.css | 9.42:1 | 3.0:1 | yes | `stage.css:1064` (.event-art border on result-event card) |
| `--color-accent-primary` | `--color-surface-card` | base.css | 9.42:1 | 3.0:1 | yes | `stage.css:1038` (.result-move .result-title (h3 >= 48*--px)) |
| `--color-accent-primary` | `--color-surface-card` | base.css | 9.42:1 | 4.5:1 | yes | `stage.css:1046` (.result-event .result-title (h3 < 48*--px)) |
| `--color-ink-primary` | `--color-surface-card` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:1056` (.result-line and .event-desc) |
| `--color-console-frame-dark` | `--color-surface-card` | base.css | 5.88:1 | 4.5:1 | yes | `stage.css:1084` (.event-effects) |
| `--color-accent-primary` | `--color-scene-sky-bottom` | base.css | 8.69:1 | 3.0:1 | yes | `stage.css:1000` (.result-box border on sky) |
| `--color-status-win` | `--color-surface-card` | base.css | 4.52:1 | 4.5:1 | yes | `stage.css:1122` (.ending-title win (h2 < 48*--px)) |
| `--color-status-danger` | `--color-surface-card` | base.css | 4.53:1 | 4.5:1 | yes | `stage.css:1127` (.ending-title lose (h2 < 48*--px)) |
| `--color-ink-primary` | `--color-surface-card` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:1134` (.ending-text and .ending-stats) |
| `--color-accent-primary` | `--color-surface-scrim over --color-scene-sky-bottom` | base.css | 3.19:1 | 3.0:1 | yes | `stage.css:1104` (.ending-box border on scrim) |
| `--color-text-inverse` | `--color-ink-primary` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:1158` (.ending-btn label (halo as ground)) |
| `--color-text-inverse` | `--color-ink-primary` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:1163` (.ending-btn:hover label (halo as ground)) |
| `--color-ink-primary` | `--color-surface-panel` | base.css | 4.91:1 | 4.5:1 | yes | `stage.css:407` (.cond-category on condition card (#009)) |
| `--color-text-inverse` | `--color-ink-primary` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:448` (.cond-name (halo as ground) (#009)) |
| `--color-ink-primary` | `--color-surface-panel` | base.css | 4.91:1 | 4.5:1 | yes | `stage.css:457` (.cond-desc and .cond-effects on condition card (#009)) |
| `--color-accent-primary` | `--color-scene-sky-bottom` | base.css | 8.69:1 | 3.0:1 | yes | `stage.css:392` (.cond-card border on sky (#009)) |
| `--color-accent-primary` | `--color-surface-panel` | base.css | 3.00:1 | 3.0:1 | yes | `stage.css:414` (.cond-reel border on condition card (#009)) |
| `--color-accent-primary` | `--color-surface-panel` | base.css | 3.00:1 | 3.0:1 | yes | `stage.css:849` (.life-icon border on panel (#009)) |
| `--color-accent-primary` | `--color-scene-sky-bottom` | base.css | 8.69:1 | 3.0:1 | yes | `stage.css:871` (.cond-tip border on sky (#009)) |
| `--color-ink-primary` | `--color-surface-panel` | base.css | 4.91:1 | 4.5:1 | yes | `stage.css:874` (.cond-tip text (#009)) |
| `--color-text-inverse` | `--color-ink-primary` | base.css | 15.38:1 | 4.5:1 | yes | `stage.css:886` (.cond-tip-title (halo as ground) (#009)) |
| `--color-accent-primary` | `--color-surface-panel` | base.css | 3.00:1 | 3.0:1 | yes | `stage.css:495` (.stage-scroll thumb on condition card (#009)) |
| `--color-plain-text` | `--color-plain-bg` | base.css | 16.33:1 | 4.5:1 | yes | `style.css:27` (plain light body and h1/h2 text) |
| `--color-plain-muted` | `--color-plain-bg` | base.css | 5.11:1 | 4.5:1 | yes | `style.css:52` (plain light .muted and button small text) |
| `--color-plain-line` | `--color-plain-bg` | base.css | 3.02:1 | 3.0:1 | yes | `style.css:93` (plain light button and .report border) |
| `--color-plain-text` | `--color-plain-bg` | base.css | 16.33:1 | 3.0:1 | yes | `style.css:103` (plain light button:hover:enabled border) |
| `--color-plain-fill` | `--color-plain-line` | base.css | 5.41:1 | 3.0:1 | yes | `style.css:74` (plain light .bar fill on track) |
| `--color-plain-text-dark` | `--color-plain-bg-dark` | base.css | 15.32:1 | 4.5:1 | yes | `style.css:12` (plain dark body and h1/h2 text) |
| `--color-plain-muted-dark` | `--color-plain-bg-dark` | base.css | 6.43:1 | 4.5:1 | yes | `style.css:13` (plain dark .muted and button small text) |
| `--color-plain-line-dark` | `--color-plain-bg-dark` | base.css | 3.01:1 | 3.0:1 | yes | `style.css:14` (plain dark button and .report border) |
| `--color-plain-text-dark` | `--color-plain-bg-dark` | base.css | 15.32:1 | 3.0:1 | yes | `style.css:103` (plain dark button:hover:enabled border) |
| `--color-plain-fill-dark` | `--color-plain-line-dark` | base.css | 5.09:1 | 3.0:1 | yes | `style.css:16` (plain dark .bar fill on track) |
| `--color-ink-primary` | `--color-surface-backdrop` | base.css | 9.05:1 | 3.0:1 | yes | `changelog.css:54` (.page-title (h1 >= 24px)) |
| `--color-ink-primary` | `--color-surface-backdrop` | base.css | 9.05:1 | 4.5:1 | yes | `changelog.css:11` (changelog body, .back-link, .page-intro, .loading-text) |
| `--color-accent-primary` | `--color-surface-backdrop` | base.css | 5.54:1 | 4.5:1 | yes | `changelog.css:42` (.back-link:hover and focus-visible) |
| `--color-ink-primary` | `--color-surface-backdrop` | base.css | 9.05:1 | 3.0:1 | yes | `changelog.css:75` (.version-card border on backdrop) |
| `--color-ink-primary` | `--color-surface-card` | base.css | 15.38:1 | 4.5:1 | yes | `changelog.css:104` (.version-number (h2 < 24px) and .item text) |
| `--color-text-muted` | `--color-surface-card` | base.css | 6.31:1 | 4.5:1 | yes | `changelog.css:110` (.version-date text) |
| `--color-link-subtle` | `--color-surface-card` | base.css | 7.74:1 | 4.5:1 | yes | `changelog.css:116` (.compare-link resting) |
| `--color-accent-primary` | `--color-surface-card` | base.css | 9.42:1 | 4.5:1 | yes | `changelog.css:260` (.item-link resting and .compare-link:hover) |
| `--color-link-hover` | `--color-surface-card` | base.css | 12.37:1 | 4.5:1 | yes | `changelog.css:267` (.item-link:hover and focus-visible) |
| `--color-ink-primary` | `--color-surface-subtle` | base.css | 14.54:1 | 4.5:1 | yes | `changelog.css:143` (.unreleased-summary text) |
| `--color-ink-primary` | `--color-surface-subtle-hover` | base.css | 13.51:1 | 4.5:1 | yes | `changelog.css:147` (.unreleased-summary:hover text) |
| `--color-text-inverse` | `--color-surface-panel` | base.css | 3.14:1 | 4.5:1 | **no** | `changelog.css:164` (.unreleased-badge text) |
| `--color-status-added-text` | `--color-status-added-bg` | base.css | 7.23:1 | 4.5:1 | yes | `changelog.css:211` (.tag-added text) |
| `--color-status-changed-text` | `--color-status-changed-bg` | base.css | 5.57:1 | 4.5:1 | yes | `changelog.css:217` (.tag-changed text) |
| `--color-status-fixed-text` | `--color-status-fixed-bg` | base.css | 9.13:1 | 4.5:1 | yes | `changelog.css:223` (.tag-fixed text) |
| `--color-status-removed-text` | `--color-status-removed-bg` | base.css | 7.45:1 | 4.5:1 | yes | `changelog.css:229` (.tag-removed text) |
| `--color-ink-primary` | `--color-surface-code` | base.css | 13.31:1 | 4.5:1 | yes | `changelog.css:256` (.code-inline text) |
| `--color-console-frame-dark` | `--color-surface-card` | base.css | 5.88:1 | 4.5:1 | yes | `changelog.css:289` (.error-title (h2 < 24px)) |
| `--color-console-frame` | `--color-surface-backdrop` | base.css | 3.02:1 | 3.0:1 | yes | `changelog.css:279` (.error-card border on backdrop) |
<!-- /generated:contrast -->

## Excluded as decorative

The following `changelog.css` dividers and tinted borders are excluded from the table because WCAG 1.4.11 does not require 3:1 contrast for decorative dividers or borders where background fills and text already identify the component:
- `changelog.css:87, 175` (`#d5d3e0` / `color.border.subtle` dashed `.card-header` and `.unreleased-card[open]` dividers)
- `changelog.css:212, 218, 224, 230` (`#c2e8a6`, `#fedba5`, `#d3cfee`, `#fec1c7` category tag borders; tags carry filled backgrounds)
- `changelog.css:251` (`#dcd7ed` / `color.border.subtle` `.code-inline` border; carries `color.surface.code` fill)
