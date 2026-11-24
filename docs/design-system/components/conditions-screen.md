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
     - **`.cond-body`:** a stage scroll area (`7.19`) under the icon window that holds the name, description and effects. It fills the rest of the card, and its text scrolls inside the card when it is too long to fit.
     - **`.cond-name`:** `font.size.stage.46`, `color.text.inverse` with `shadow.stage.text-outline-ink` + `shadow.stage.text-sm`.
     - **`.cond-desc` and `.cond-effects`:** `font.size.stage.30`, `color.ink.primary`. The effects line sits at the bottom of the card when the text fits.
4. **Variants:**
   - Phone held upright (`breakpoint.stage.portrait`): the row becomes a swipe row with two cards in view. The icons are 220 × 220, the category and effects text use `font.size.stage.50` and the name uses `font.size.stage.74`. The description is hidden.
   - Icons: every option, weather included, uses `assets/conditions/<category>/cond-<category>-<option>.png` (see [`asset-slots.md`](../asset-slots.md)). The weather icons are also the weather box art (`C20`).
5. **States:**
   - **Cards `holding`:** for `motion.delay.reel-hold` (`0.2s`) after the screen opens, every card stands still.
   - **Cards `spinning`:** all the cards start rolling together. Each strip loops through its category's options, easing up to full speed over `motion.duration.reel-spin-up` (`0.8s`) and then rolling at about `motion.rate.reel` (`7`) icons per second. The name, description and effects are hidden.
   - **Card `stopping`:** `motion.duration.reel-spin` (`3s`) after rolling starts, the leftmost card eases to a stop over `motion.duration.reel-stop` (`1.2s`). Each card to its right starts stopping `motion.delay.reel-stagger` (`0.6s`) later, so they stop one by one from left to right. Each reel's speed is adjusted slightly so it lands exactly on the rolled option.
   - **Card `stopped` (`.stopped`):** the strip rests on the rolled icon. The text fades in over `motion.duration.normal`.
   - **Screen `revealed` (`.revealed`):** all cards have stopped, so the start button fades in.
6. **Behaviour:**
   - The game picks the conditions when it is created, so the spin is only for show.
   - A click anywhere on the stage during the spin stops every card at once.
   - With `prefers-reduced-motion: reduce`, the cards show stopped straight away.
   - The reels are moved by a `requestAnimationFrame` loop, with each position worked out from the time since the screen opened. A slow frame therefore never puts a reel out of step.
   - If frames stop coming (a hidden tab, say), a timer reveals everything after the full reel time plus 500 ms.
   - The start button opens `turn-screen`.
7. **Accessibility:** all text pairs pass (see [`contrast.md`](../contrast.md)):
   - `color.ink.primary` on `color.surface.panel` is `4.91:1` (`4.5:1` needed);
   - `.cond-name` on its ink halo is `15.38:1`;
   - the card and reel borders are `8.69:1` on the sky and `3.00:1` on the panel (`3.0:1` needed).
   
   The rolled values also show as text, so the icons never carry meaning alone. A card whose text overflows becomes keyboard-focusable so it can be scrolled (`7.19`).
8. **Status:** `planned` (`C62`). Built in #009; the component list picks it up at its next audit.

**Copies today:**
- `src/ui-stage.ts:191` (layer), `:441` (`conditionCard`), `:470` (`placeStrip`), `:493` (`showConditions`)
- `stage.css:370` (`.begin-btn`), `:379` (`.cond-row`), `:389` (`.cond-card`), `:435` (`.cond-body`)
