# 7.2 Scene, Image Placeholder, Vehicle & Weather Box

> Spec 7.2 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Renders the recessed viewport window (`scene`), reusable asset placeholder boxes (`imgbox`), animated transit vehicle (`vehicle`), and current weather indicator (`weather-box`).
2. **When to use:** Use `scene` as the shared stage viewport across all screens; use `imgbox` whenever displaying optional `assets/*.png` art with text fallback; use `vehicle` during move animation and `weather-box` on turn screens.
3. **Anatomy:**
   - **Scene (`.scene`):** Box at `layout.screen.{x,y,w,h}`, corner radius `radius.stage.34`, `shadow.stage.scene-recess`, and sky gradient `color.scene.sky-top` to `color.scene.sky-bottom`.
   - **Image box (`.imgbox`):** Container with inherited radius and sky gradient; fallback `.imgbox-label` in `color.accent.primary` on `color.surface.placeholder`, dashed border `border.width.stage.3`, radius `radius.stage.10`, padding `space.stage.4` × `space.stage.10`, `font.size.stage.34` (`font.line-height.tight`).
   - **Vehicle (`.vehicle`):** Positioned inside `.scene` (`layout-map.md`), border `border.width.stage.7` in `color.accent.primary`, radius `radius.stage.30`.
   - **Weather box (`.weather-box`):** Positioned in upper-right scene (`layout-map.md`), border `border.width.stage.8` in `color.accent.primary`, radius `radius.stage.30`, label in `font.size.stage.30`.
4. **Variants:**
   - `C5` `.imgbox` owners: full `.scene` (label offset `space.stage.20`), `.card-art` (`C14`), `.weather-box` (`C20`), `.portrait` (`C27`), `.vehicle` (`C6`), `.event-art` (`C24`, label `font.size.stage.24`).
5. **States:**
   - `C5` `default`: shows `.imgbox-label`; `loaded`: hides `.imgbox-label` when `<img>` loads.
   - `C6` `default`: hidden; `moving`: visible and runs `drive` keyframe (`motion.duration.drive`).
6. **Behaviour:** `setImage` removes broken `<img>` elements on error so placeholder text remains visible; `vehicle` drives left-to-right across `.scene` on `moving` and triggers `finishMove` on `animationend` (with `motion.timeout.move` fallback).
7. **Accessibility:** Every `<img>` sets `alt` to the placeholder label; `.imgbox-label` (`color.accent.primary` on `color.surface.placeholder`) meets 4.5:1 over the sky gradient (`color.scene.sky-top`..`color.scene.sky-bottom`), covering scene, weather, card-art, portrait, vehicle, and event-art placeholders (`contrast.md`).
8. **Status:** `matches` (`C4`, `C5`, `C6`, `C20`)

**Copies today:**
- `C4` (`scene`): `src/ui-stage.ts:112`, `stage.css:142`
- `C5` (`imgbox`): `src/ui-stage.ts:73`, `stage.css:180`
- `C6` (`vehicle`): `src/ui-stage.ts:114`, `stage.css:771`
- `C20` (`weather-box`): `src/ui-stage.ts:161`, `stage.css:421`
