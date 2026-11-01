# Canva-style UI: active context

_Updated 2026-11-02 by claude-code, Opus 5.5._

## Now

- **Status:** stage UI released and live. Waiting on the group's art and final colours.
- **Last release:** 0.6.1.

## Decisions

- **Return button:** keep it for testing. It undoes the last choice and restores that turn. It may be removed in a final version.
- **Options per turn:** design for up to 5, the game's real maximum. Limiting it to 3 would change the balance.
- **Plain version:** a link option such as `?ui=plain` keeps today's plain UI for explaining the game system.
- **Assets:** PNG only, using the filenames in the group's Minimum Asset Requirements doc.
- **Built in code:** frame, panels, buttons, cards, popups, bars, flags, title text and all live text.
- **Phone in portrait:** options become a swipe row that loops forever in both directions.
- **Speech bubble:** shown on every turn screen.
- **Rules untouched:** `src/game.ts` and `src/data.ts` keep their rules, so the simulation results stay valid.

## Plan

The full plan is `AI/PLAN_stage-ui.md`. Use a Sonnet implementer on branch `feat/stage-ui` after the user gives the go signal.

## Open questions

- Font and colour codes (waiting on: the team). Use sampled colours and a temporary font until then.

## Watch out

- Only push when the user asks, because it replaces what the group sees.
