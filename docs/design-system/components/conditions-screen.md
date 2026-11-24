# 7.17 Conditions Screen & Condition Card

> Spec 7.17 of the [Commuter Game design system](../../DESIGN_SYSTEM.md). Layout boxes: [`layout-map.md`](../layout-map.md).

1. **Purpose:** Shows the five starting conditions the game rolled for this run (weather, school or workplace, living situation, family, personal), one card each, with a short slot-machine reveal.
2. **When to use:** Shown after a character card is picked (`data-screen="conditions"`), before the first turn.
3. **Anatomy:**
   - **Heading:** reuses `.select-heading` (`7.4`) with the text "today's conditions!".
   - **Start button (`.begin-btn`):** a `.panel-btn` (`7.12`) at the top of the screen area, labelled "start >>". It is hidden until every card has stopped.
   - **Card row (`.cond-row`):** a flex row across `layout.screen.x` / `layout.screen.w`, with gap and side padding `space.stage.24`.
   - **Condition card (`.cond-card`):** the `.card-0` look from `7.4`:
     - fill `color.surface.panel`;
     - border `border.width.stage.10` in `color.accent.primary`;
     - radius `radius.stage.34`;
     - padding `space.stage.14` × `space.stage.16`, gap `space.stage.8`.
     
     It is a `<div>`, not a button, because the card is not a choice.
   - **Card parts:**
     - **`.cond-category`:** `font.size.stage.30`, `color.ink.primary`, one line.
     - **`.cond-reel`:** a 180 × 180 icon window with border `border.width.stage.4` in `color.accent.primary` and radius `radius.stage.24`.
     - **`.cond-strip`:** the strip of `.cond-face` icons inside the window (each a `C5` image box).
     - **`.cond-name`:** `font.size.stage.46`, `color.text.inverse` with `shadow.stage.text-outline-ink` + `shadow.stage.text-sm`.
     - **`.cond-desc` and `.cond-effects`:** `font.size.stage.30`, `color.ink.primary`. The effects line sits at the bottom of the card.
4. **Variants:**
   - Phone held upright (`breakpoint.stage.portrait`): the row becomes a swipe row with two cards in view. The icons are 220 × 220, the category and effects text use `font.size.stage.50` and the name uses `font.size.stage.74`. The description is hidden.
   - Icons: weather uses its `weather-*.png` art (`C20`); every other option uses `assets/cond-<category>-<option>.png` (see [`asset-slots.md`](../asset-slots.md)).
5. **States:**
   - **Card `spinning`:** the strip slides through every option of its category and lands on the rolled one. It runs over `motion.duration.reel`, and each card starts `motion.delay.reel-stagger` after the one on its left. The name, description and effects are hidden.
   - **Card `stopped` (`.stopped`):** the strip rests on the rolled icon. The text fades in over `motion.duration.normal`.
   - **Screen `revealed` (`.revealed`):** all cards have stopped, so the start button fades in.
6. **Behaviour:**
   - The game picks the conditions when it is created, so the spin is only for show.
   - A click anywhere on the stage during the spin stops every card at once.
   - With `prefers-reduced-motion: reduce`, the cards show stopped straight away.
   - If an `animationend` never arrives (a hidden tab, say), a timer reveals everything after the full reel time plus 500 ms.
   - The start button opens `turn-screen`.
7. **Accessibility:** all text pairs pass (see [`contrast.md`](../contrast.md)):
   - `color.ink.primary` on `color.surface.panel` is `4.91:1` (`4.5:1` needed);
   - `.cond-name` on its ink halo is `15.38:1`;
   - the card and reel borders are `8.69:1` on the sky and `3.00:1` on the panel (`3.0:1` needed).
   
   The rolled values also show as text, so the icons never carry meaning alone.
8. **Status:** `planned` (`C62`). Built in #009; the component list picks it up at its next audit.

**Copies today:**
- `src/ui-stage.ts:173` (layer), `:421` (`conditionCard`), `:462` (`showConditions`)
- `stage.css:370` (`.begin-btn`), `:379` (`.cond-row`), `:389` (`.cond-card`), `:1128` (`@keyframes reel`)
