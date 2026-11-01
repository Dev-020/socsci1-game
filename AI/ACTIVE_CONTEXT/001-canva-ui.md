# Canva-style UI: active context

_Updated 2026-11-01 by claude-code, Opus 5.5._

## Now

- **Status:** plan written, waiting for the user's approval. Nothing is built yet.
- **Last release:** 0.3.0 (plain UI).

## Decisions

- **Return button:** keep it for testing. It may be removed in a final version.
- **Options per turn:** design for up to 5, the game's real maximum. Limiting it to 3 would change the balance.
- **Plain version:** a link option such as `?ui=plain` keeps today's plain UI for explaining the game system.
- **Assets:** PNG only, using the filenames in the group's Minimum Asset Requirements doc.
- **Built in code:** frame, panels, buttons, cards, popups, bars, flags, title text and all live text.
- **Rules untouched:** `src/game.ts` and `src/data.ts` keep their rules, so the simulation results stay valid.

## Plan

1. Add the fixed 16:9 stage and console frame.
2. Rewrite `src/ui.ts` for the title, character select, journey, event popup and three ending screens.
3. Show a labelled box wherever an image file is missing.
4. Slide the money bar, energy bar and distance flag to new values.
5. After each choice, run the vehicle across the scene, show any event, then start the next turn.
6. Add `?ui=plain`, keeping the current plain screens.
7. Test both UIs in a browser at phone and laptop size, and confirm a `?seed=` run still repeats exactly.

Tutorial, Credits and the optional clouds, rain and walking animations come after this.

## Open questions

- What does Return do in the Canva UI? It needs a defined behaviour before it's built, because the engine has no undo (waiting on: the user).
- Font and colour codes (waiting on: the team). Use sampled colours and a temporary font until then.

## Watch out

- Only push when the user asks, because it replaces what the group sees.
