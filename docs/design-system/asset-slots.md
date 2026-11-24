# Asset Slots

> Part of the [Commuter Game design system](../DESIGN_SYSTEM.md) (§8). Generated table built from `src/data.ts`, `src/ui-stage.ts`, `base.css`, and `stage.css` by a local script (not published) — edit the code or this hand-written guide, not the table between markers.

## Slots (23 files)

Every slot currently shows **placeholder** (`assets/` does not exist yet in the repository).

<!-- generated:asset-slots -->
| File path | Shows | Slot (`C` id, class) | Box (wireframe px) | Export 2× (px) | Aspect ratio | Portrait differs | Code line | State |
|---|---|---|---|---|---|---|---|---|
| `assets/scene-normal.png` | Scene backdrop (Normal weather) | `C4` (`.scene` > `.imgbox`) | 1476 × 760 | 2952 × 1520 | 369:190 (1.94:1) | — | `src/ui-stage.ts:134,552` | placeholder |
| `assets/scene-rainy.png` | Scene backdrop (Rainy weather) | `C4` (`.scene` > `.imgbox`) | 1476 × 760 | 2952 × 1520 | 369:190 (1.94:1) | — | `src/ui-stage.ts:552` | placeholder |
| `assets/scene-sunny.png` | Scene backdrop (Sunny weather) | `C4` (`.scene` > `.imgbox`) | 1476 × 760 | 2952 × 1520 | 369:190 (1.94:1) | — | `src/ui-stage.ts:552` | placeholder |
| `assets/weather-normal.png` | Weather icon (Normal) | `C20` (`.weather-box`) | 185 × 185 | 370 × 370 | 1:1 | — | `src/ui-stage.ts:192,553` | placeholder |
| `assets/weather-rainy.png` | Weather icon (Rainy) | `C20` (`.weather-box`) | 185 × 185 | 370 × 370 | 1:1 | — | `src/ui-stage.ts:553` | placeholder |
| `assets/weather-sunny.png` | Weather icon (Sunny) | `C20` (`.weather-box`) | 185 × 185 | 370 × 370 | 1:1 | — | `src/ui-stage.ts:553` | placeholder |
| `assets/transport-jeep.png` | Transit vehicle (Jeepney) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:570` | placeholder |
| `assets/transport-train.png` | Transit vehicle (Train (LRT/MRT)) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:570` | placeholder |
| `assets/transport-motor.png` | Transit vehicle (Motorcycle) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:570` | placeholder |
| `assets/transport-car.png` | Transit vehicle (Private Car / Ride-Hail) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:570` | placeholder |
| `assets/transport-walk.png` | Transit vehicle (Walk) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:138,570` | placeholder |
| `assets/transport-tricycle.png` | Transit vehicle (Tricycle) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:570` | placeholder |
| `assets/transport-bus.png` | Transit vehicle (Bus) | `C6` (`.vehicle`) | 300 × 190 | 600 × 380 | 30:19 (1.58:1) | — | `src/ui-stage.ts:570` | placeholder |
| `assets/character-student.png` | Commuter (Student) | `C14` (`.card-art`), `C27` (`.portrait`) | 254 × 254 (card), 260 × 260 (portrait) | 520 × 520 | 1:1 | — | `src/ui-stage.ts:89,161,202,554` | placeholder |
| `assets/character-worker.png` | Commuter (Worker) | `C14` (`.card-art`), `C27` (`.portrait`) | 254 × 254 (card), 260 × 260 (portrait) | 520 × 520 | 1:1 | — | `src/ui-stage.ts:89,161,554` | placeholder |
| `assets/character-pwd.png` | Commuter (PWD) | `C14` (`.card-art`), `C27` (`.portrait`) | 254 × 254 (card), 260 × 260 (portrait) | 520 × 520 | 1:1 | — | `src/ui-stage.ts:89,161,554` | placeholder |
| `assets/event-traffic.png` | Random event (Traffic Congestion) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:602` | placeholder |
| `assets/event-queue.png` | Random event (Station Queue) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:602` | placeholder |
| `assets/event-flood.png` | Random event (Road Obstruction / Flood) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:602` | placeholder |
| `assets/event-track-fault.png` | Random event (Track Fault / Station Power Outage) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:602` | placeholder |
| `assets/event-clear-traffic.png` | Random event (Clear Traffic Flow) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:602` | placeholder |
| `assets/event-surcharge.png` | Random event (Fare Surcharge) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:602` | placeholder |
| `assets/event.png` | Random event fallback (unmapped event) | `C24` (`.event-art`) | 160 × 160 | 320 × 320 | 1:1 | — | `src/ui-stage.ts:602` | placeholder |
| `assets/cond-work-average.png` | Condition icon (work: Average) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-work-stressful.png` | Condition icon (work: Stressful) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-work-fulfilling.png` | Condition icon (work: Fulfilling) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-work-shorter-free-days.png` | Condition icon (work: Shorter Free Days) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-work-star-performer.png` | Condition icon (work: Star Performer) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-living-rich.png` | Condition icon (living: Rich) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-living-comfortable.png` | Condition icon (living: Comfortable) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-living-poor.png` | Condition icon (living: Poor) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-family-happy.png` | Condition icon (family: Happy) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-family-strained.png` | Condition icon (family: Strained) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-family-ordinary.png` | Condition icon (family: Ordinary) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-family-provider.png` | Condition icon (family: Provider) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-family-golden-child.png` | Condition icon (family: Golden Child) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-personal-nothing-outstanding.png` | Condition icon (personal: Nothing Outstanding) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-personal-fear-of-motorcycles.png` | Condition icon (personal: Fear of Motorcycles) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
| `assets/cond-personal-motion-sickness.png` | Condition icon (personal: Motion Sickness) | `.cond-reel` > `.cond-face`, `.life-icon` | 180 × 180 (card), 62 × 62 (panel) | 360 × 360 | 1:1 | yes | `src/ui-stage.ts:94,431,492` | placeholder |
<!-- /generated:asset-slots -->

## Export Rules

- **Format:** PNG (`.png`).
- **Resolution:** Export at **2× the wireframe box size** (listed in the table's `Export 2×` column) so artwork stays crisp on high-DPI displays.
- **Fit & letterboxing:** Every `<img>` uses `object-fit: contain` (`stage.css:194`). Artwork whose aspect ratio does not match its slot is scaled to fit inside the box without cropping, leaving empty letterbox space around the shorter dimension. Match the table's aspect ratio.

## Transparency & Layering

- **What shows behind loaded art today:** `.imgbox` renders a sky gradient (`linear-gradient(var(--color-scene-sky-top), var(--color-scene-sky-bottom))`, `stage.css:186`), and `.scene` renders the same sky gradient (`stage.css:151`) with `.scene > .imgbox { background: none; }` (`stage.css:158`).
- **Transparent vs opaque PNGs:**
  - **Vehicles (`C6`), characters (`C14`/`C27`), and weather (`C20`):** Use **transparent PNGs** so the sky gradient (or card/slot background) shows cleanly around silhouettes.
  - **Scenes (`C4`):** Use **opaque PNGs** so the scene artwork replaces the empty sky gradient across the `1476 × 760` viewport.
  - **Events (`C24`):** Either transparent (lets the sky-tinted `.imgbox` show behind the icon) or opaque square illustrations (`320 × 320` at 2×) work inside the `160 × 160` card slot.

## Scene Safe Area & Reuse Notes

- **Bottom panel overlap on scenes:** `.scene` spans `y = 155..915` (`1476 × 760`), and `.panel` (`stage.css:544-552`) covers `y = 595..915` during `turn`, `moving`, and `result` screens — the **lower `320` wireframe px** of the scene. Keep focal buildings, road horizon, and key scenery in the upper `440` wireframe px (`y = 155..595` relative to stage, or the top 58% of the `1476 × 760` canvas) so the HUD never hides important artwork.
- **Character art reuse:** Each character file (`assets/character-{student,worker,pwd}.png`) is reused in two square slots: `254 × 254` on the select screen card (`C14` `.card-art`, `stage.css:337-339`) and `260 × 260` in the bottom panel (`C27` `.portrait`, `stage.css:556-557`). Export at `520 × 520` (2× the larger `260 × 260` slot).

## Placeholder-Only Styles & Dropping Art In

- **Placeholder-only styles:** The `.imgbox-label` pill (`color.surface.placeholder` translucent fill, dashed `border.width.stage.3` border in `color.accent.primary`, text label; `stage.css:197-213`) is strictly a placeholder fallback. When an image loads, `.imgbox.loaded .imgbox-label` hides it (`display: none !important;`, `stage.css:215-217`).
- **Adding art needs no code change:** Drop the `.png` files into `assets/` using the exact paths in the table above. While a file is missing, `setImage` (`src/ui-stage.ts:57-71`) removes the broken `<img>` on `error` so the placeholder label stays readable without a browser broken-image icon.
