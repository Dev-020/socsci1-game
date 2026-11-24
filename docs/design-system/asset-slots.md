# Asset Slots

> Part of the [Commuter Game design system](../DESIGN_SYSTEM.md) (§8). Generated table built from `src/data.ts`, `src/ui-stage.ts`, `base.css`, and `stage.css` by a local script (not published) — edit the code or this hand-written guide, not the table between markers.

## Folders

Art is grouped by kind. Inside each folder, files keep their full prefixed names, so no two files share a name and a file still makes sense on its own.

```text
assets/
  scenes/       scene-<weather>.png           backdrops, one per weather
  characters/   character-<character>.png     select card and bottom-panel portrait
  transport/    transport-<ride>.png          the vehicle on the turn screen
  events/       event-<event>.png, event.png  random events, plus the fallback
  conditions/
    weather/    cond-weather-<option>.png     also the weather box during a run
    work/       cond-work-<option>.png        "school" for the Student, same file
    living/     cond-living-<option>.png
    family/     cond-family-<option>.png
    personal/   cond-personal-<option>.png
```

Every starting condition follows one pattern: `assets/conditions/<category>/cond-<category>-<option>.png`, all lowercase with hyphens.

## Slots (39 files)

A slot shows **placeholder** until its file is in `assets/`. The State column says which files are in.

<!-- generated:asset-slots -->
| File path | Shows | Slot (`C` id, class) | Box (wireframe px) | Export 2× (px) | Aspect ratio | Portrait differs | Code line | State |
|---|---|---|---|---|---|---|---|---|
| `assets/scenes/scene-normal.png` | Scene backdrop (Normal weather) | `C4` (`.scene` > `.imgbox`) | 1476 × 760 | 2952 × 1520 | 369:190 (1.94:1) | — | `src/ui-stage.ts:161,641` | placeholder |
| `assets/scenes/scene-rainy.png` | Scene backdrop (Rainy weather) | `C4` (`.scene` > `.imgbox`) | 1476 × 760 | 2952 × 1520 | 369:190 (1.94:1) | — | `src/ui-stage.ts:641` | placeholder |
| `assets/scenes/scene-sunny.png` | Scene backdrop (Sunny weather) | `C4` (`.scene` > `.imgbox`) | 1476 × 760 | 2952 × 1520 | 369:190 (1.94:1) | — | `src/ui-stage.ts:641` | placeholder |
| `assets/conditions/weather/cond-weather-normal.png` | Condition icon (weather: Normal) | `C20` (`.weather-box`), `.cond-reel` > `.cond-face` | 185 × 185 (weather box), 180 × 180 (card) | 370 × 370 | 1:1 | yes | `src/ui-stage.ts:94,219,642,464` | present |
| `assets/conditions/weather/cond-weather-rainy.png` | Condition icon (weather: Rainy) | `C20` (`.weather-box`), `.cond-reel` > `.cond-face` | 185 × 185 (weather box), 180 × 180 (card) | 370 × 370 | 1:1 | yes | `src/ui-stage.ts:94,219,642,464` | present |
| `assets/conditions/weather/cond-weather-sunny.png` | Condition icon (weather: Sunny) | `C20` (`.weather-box`), `.cond-reel` > `.cond-face` | 185 × 185 (weather box), 180 × 180 (card) | 370 × 370 | 1:1 | yes | `src/ui-stage.ts:94,219,642,464` | present |
| `assets/transport/transport-jeep.png` | Transit vehicle (Jeepney) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:659` | placeholder |
| `assets/transport/transport-train.png` | Transit vehicle (Train (LRT/MRT)) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:659` | placeholder |
| `assets/transport/transport-motor.png` | Transit vehicle (Motorcycle) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:659` | placeholder |
| `assets/transport/transport-car.png` | Transit vehicle (Private Car / Ride-Hail) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:659` | placeholder |
| `assets/transport/transport-walk.png` | Transit vehicle (Walk) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:165,659` | placeholder |
| `assets/transport/transport-tricycle.png` | Transit vehicle (Tricycle) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:659` | placeholder |
| `assets/transport/transport-bus.png` | Transit vehicle (Bus) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:659` | placeholder |
| `assets/characters/character-student.png` | Commuter (Student) | `C14` (`.card-art`), `C27` (`.portrait`) | 254 × 254 (card), 260 × 260 (portrait) | 520 × 520 | 1:1 | — | `src/ui-stage.ts:89,188,229,643` | placeholder |
| `assets/characters/character-worker.png` | Commuter (Worker) | `C14` (`.card-art`), `C27` (`.portrait`) | 254 × 254 (card), 260 × 260 (portrait) | 520 × 520 | 1:1 | — | `src/ui-stage.ts:89,188,643` | placeholder |
| `assets/characters/character-pwd.png` | Commuter (PWD) | `C14` (`.card-art`), `C27` (`.portrait`) | 254 × 254 (card), 260 × 260 (portrait) | 520 × 520 | 1:1 | — | `src/ui-stage.ts:89,188,643` | placeholder |
| `assets/events/event-traffic.png` | Random event (Traffic Congestion) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:691` | placeholder |
| `assets/events/event-queue.png` | Random event (Station Queue) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:691` | placeholder |
| `assets/events/event-flood.png` | Random event (Road Obstruction / Flood) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:691` | placeholder |
| `assets/events/event-track-fault.png` | Random event (Track Fault / Station Power Outage) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:691` | placeholder |
| `assets/events/event-clear-traffic.png` | Random event (Clear Traffic Flow) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:691` | placeholder |
| `assets/events/event-surcharge.png` | Random event (Fare Surcharge) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:691` | placeholder |
| `assets/events/event.png` | Random event fallback (unmapped event) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:691` | placeholder |
| `assets/conditions/work/cond-work-average.png` | Condition icon (work: Average) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/work/cond-work-stressful.png` | Condition icon (work: Stressful) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/work/cond-work-fulfilling.png` | Condition icon (work: Fulfilling) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/work/cond-work-shorter-free-days.png` | Condition icon (work: Shorter Free Days) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/work/cond-work-star-performer.png` | Condition icon (work: Star Performer) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/living/cond-living-rich.png` | Condition icon (living: Rich) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/living/cond-living-comfortable.png` | Condition icon (living: Comfortable) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/living/cond-living-poor.png` | Condition icon (living: Poor) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/family/cond-family-happy.png` | Condition icon (family: Happy) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/family/cond-family-strained.png` | Condition icon (family: Strained) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/family/cond-family-ordinary.png` | Condition icon (family: Ordinary) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/family/cond-family-provider.png` | Condition icon (family: Provider) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/family/cond-family-golden-child.png` | Condition icon (family: Golden Child) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/personal/cond-personal-nothing-outstanding.png` | Condition icon (personal: Nothing Outstanding) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/personal/cond-personal-fear-of-motorcycles.png` | Condition icon (personal: Fear of Motorcycles) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
| `assets/conditions/personal/cond-personal-motion-sickness.png` | Condition icon (personal: Motion Sickness) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,464,578` | present |
<!-- /generated:asset-slots -->

## Export Rules

- **Format:** PNG (`.png`).
- **Resolution:** Export at **2× the wireframe box size** (listed in the table's `Export 2×` column) so artwork stays crisp on high-DPI displays.
- **Fit & letterboxing:** Every `<img>` uses `object-fit: contain` (`stage.css:194`). Artwork whose aspect ratio does not match its slot is scaled to fit inside the box without cropping, leaving empty letterbox space around the shorter dimension. Match the table's aspect ratio.

## Transparency & Layering

- **What shows behind loaded art today:** `.imgbox` renders a sky gradient (`linear-gradient(var(--color-scene-sky-top), var(--color-scene-sky-bottom))`, `stage.css:186`), and `.scene` renders the same sky gradient (`stage.css:151`) with `.scene > .imgbox { background: none; }` (`stage.css:158`).
- **Transparent vs opaque PNGs:**
  - **Vehicles (`C6`), characters (`C14`/`C27`), and condition icons (weather `C20`, `.cond-reel`, `.life-icon`):** Use **transparent PNGs** so the sky gradient (or card/slot background) shows cleanly around silhouettes.
  - **Scenes (`C4`):** Use **opaque PNGs** so the scene artwork replaces the empty sky gradient across the `1476 × 760` viewport.
  - **Events (`C24`):** Either transparent (lets the sky-tinted `.imgbox` show behind the icon) or opaque square illustrations (`320 × 320` at 2×) work inside the `160 × 160` card slot.

## Scene Safe Area & Reuse Notes

- **Bottom panel overlap on scenes:** `.scene` spans `y = 155..915` (`1476 × 760`), and `.panel` (`stage.css:683-691`) covers `y = 595..915` during `turn`, `moving`, and `result` screens — the **lower `320` wireframe px** of the scene. Keep focal buildings, road horizon, and key scenery in the upper `440` wireframe px (`y = 155..595` relative to stage, or the top 58% of the `1476 × 760` canvas) so the HUD never hides important artwork.
- **Character art reuse:** Each character file (`assets/characters/character-{student,worker,pwd}.png`) is reused in two square slots: `254 × 254` on the select screen card (`C14` `.card-art`, `stage.css:338-340`) and `260 × 260` in the bottom panel (`C27` `.portrait`, `stage.css:693-697`). Export at `520 × 520` (2× the larger `260 × 260` slot).

## Placeholder-Only Styles & Dropping Art In

- **Placeholder-only styles:** The `.imgbox-label` pill (`color.surface.placeholder` translucent fill, dashed `border.width.stage.3` border in `color.accent.primary`, text label; `stage.css:197-213`) is strictly a placeholder fallback. When an image loads, `.imgbox.loaded .imgbox-label` hides it (`display: none !important;`, `stage.css:215-217`).
- **Condition icon reuse:** Each condition icon shows at `180 × 180` on the conditions card and, except weather, at `62 × 62` in the bottom panel's life row, so keep the drawing bold enough to read small. Weather icons also fill the `185 × 185` weather box during a run. A larger square export (for example `512 × 512`) is fine: every image is scaled down to fit its box.
- **Adding art needs no code change:** Drop the `.png` files into the folders above using the exact paths in the table. While a file is missing, `setImage` (`src/ui-stage.ts:57-69`) removes the broken `<img>` on `error` so the placeholder label stays readable without a browser broken-image icon.
