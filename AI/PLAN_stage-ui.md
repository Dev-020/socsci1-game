# Stage UI — Implementation Plan

> **Status:** Proposed 2026-11-01, waiting for the user's go signal | **Author:** claude-code, Opus 5.5 | **Target release:** 0.4.0

---

## 1. Goal & Problem Statement

### 1.1. Context and Problem

The game has a working engine and a plain screen. The group's Canva wireframes show a game inside a
console frame with a scene, a bottom panel and animated transport. The team's art doesn't exist yet,
so the UI has to work before it arrives.

### 1.2. Intended Outcome

- The default link shows the new stage UI, matching the wireframes as closely as the code allows.
- Missing art shows as a labelled box. Adding a PNG with the agreed filename replaces it with no code change.
- `?ui=plain` shows today's plain UI, for explaining the game system.
- `?seed=` works in both UIs and can be combined: `?ui=plain&seed=123`.
- Return undoes the last choice, for testing.
- Rules, balance values and seeded rolls don't change.

---

## 2. User Review Required

| Area | Decision | Rationale | Impact |
|---|---|---|---|
| Stack | Raw HTML, CSS and TypeScript. No new tools or packages | User's standing rule | None |
| Default link | Becomes the stage UI once pushed. Plain moves to `?ui=plain` | The stage UI is the real game | The group sees placeholders until art arrives |
| `src/game.ts` | Gains `undo()` and a saved snapshot | Return can't work without it | No rule changes. Proven by identical simulation output |
| Return | One step back, from the result screen to that turn's options. Plain UI has no Return | Recommended by the orchestrator and approved by the user | Testing feature, may be removed later |
| Turn flow | Choice, then vehicle animation, then a result screen with Continue and Return | Matches the wireframes | Each turn takes one extra click |
| Options | Up to 5 per turn | The real maximum is 5. Limiting it would change the balance | Five columns instead of the wireframes' three |
| Staffing | One continued Sonnet implementer. Opus orchestrates and reviews | User's instruction | Work happens on branch `feat/stage-ui` |
| Publishing | Nothing is pushed without the user's instruction | Pushing changes the live site | User reviews locally first |

---

## 3. Open Questions

- **[DECIDE] Phone in portrait:** a 16:9 stage is only about 219 px tall on a 390 px wide phone, which is too small for 5 options. **Recommended default:** add a "rotate your phone" note below the stage in portrait, and treat landscape as the supported phone layout.
- **[DECIDE] Speech bubble:** the wireframe shows "saan kaya ako sasakay..?" on one screen. **Recommended default:** show it on every turn screen as flavour text, since it is cheap and easy to remove.
- **[WAITING] Font and colours:** this plan uses colours sampled from the wireframes and a monospace system font until the team confirms the real font and colour codes.

---

## 4. Proposed Changes

Build order: engine, split, stage shell, screens, animation, release.

### Engine

#### [MODIFY] `src/game.ts`

Add one level of undo.

```ts
interface TurnSnapshot {
  money: number;
  energy: number;
  distanceLeft: number;
  turn: number;
  usage: Record<string, number>;
  disabled: string[];
  outcome: Outcome | null;
  offers: Offer[];
}

private snapshot: TurnSnapshot | null = null;

get canUndo(): boolean;   // true when a snapshot exists
undo(): boolean;          // restores it, clears it, returns false if none
```

- `choose()` saves the snapshot after its affordability check and before any state changes. Copy `usage` and `disabled`. A rejected choice leaves any earlier snapshot alone.
- `undo()` restores every field above. Because rolls depend on seed, turn and purpose, the restored turn has the same offers, and repeating a choice gives the same result.
- Only one level exists. A second `undo()` returns `false`.
- Nothing else in this file changes.

#### [NO CHANGE] `src/data.ts`

Only `VERSION` changes, at release.

### Splitting the two UIs

#### [NEW] `src/format.ts`

Moves the shared helpers out of `ui.ts`: `peso`, `signedPeso`, `signed`, `eventEffects` and `seedFromLink`.

#### [NEW] `src/ui-plain.ts`

Today's `ui.ts` screens, moved with their behaviour and wording unchanged. Exports `startPlainUi(app: HTMLElement)`.

#### [MODIFY] `src/ui.ts`

Becomes the small entry point:

- Reads `ui` from the link. `plain` selects the plain UI. Anything else, or nothing, selects the stage.
- Sets `<link id="theme">` to `style.css` or `stage.css`, then starts that UI.

#### [MODIFY] `index.html`

Adds `id="theme"` to the existing stylesheet link. `style.css` stays unchanged.

### Stage UI

#### [NEW] `stage.css`

All sizes come from the 1920 × 1080 wireframes, written as percentages of the stage. Text uses `cqw` units with `container-type: inline-size` on the stage, so it scales with it.

The stage is `width: min(100vw, 177.78vh)` with `aspect-ratio: 16 / 9`, centred on the orange backdrop.

| Element | Position in the 1920 × 1080 layout |
|---|---|
| Console frame, outer edge | x 187–1733, y 120–950 |
| Screen area | x 222–1698, y 155–915 |
| Side knobs | Centres (88, 535) and (1832, 535), radius 62 |
| Bottom panel | x 222–1698, y 595–915 |
| Distance bar | x 270–815, y about 255 |
| Weather box | x 1480–1665, y 182–366 |
| Portrait box | x 250–510, y 625–885 |
| Money bar | x 710–1040, y 723–770 |
| Energy bar | x 710–1010, y 785–838, ten segments |
| Continue | x 1375–1635, y 657–753 |
| Return | x 1380–1640, y 772–868 |
| Option buttons | Up to 5 equal columns, x 240–1460, y 280–580 |

Colours as CSS variables, sampled from `1A.webp`:

| Variable | Value | Use |
|---|---|---|
| `--backdrop` | `#ffb95f` | Page background |
| `--frame` | `#f8366f` to `#feba91` | Frame gradient |
| `--frame-dark` | `#c11763` | Frame edge |
| `--knob` | `#fb6070` | Side knobs |
| `--panel` | `#a783c5` | Bottom panel |
| `--line` | `#690dbc` | Panel line, boxes, button borders |
| `--money` | `#ffb95f` | Money bar, edge `#d28222` |
| `--energy` | `#a5dc6c` | Energy bar, edge `#5c7b4a` |
| `--track` | `#f8636a` | Distance bar |
| `--flag` | `#f81834` | Flags, pole `#c89c66` |

Motion:

- Bars use `transition: width 0.6s`, and the moving flag uses `transition: left 0.6s`.
- The vehicle uses `@keyframes drive`, from `left: -25%` to `left: 110%`, over 1.4 s.
- Under `prefers-reduced-motion: reduce`, all durations are 0.

#### [NEW] `src/ui-stage.ts`

Exports `startStageUi(app: HTMLElement)`.

Fixed elements are created once and updated, so CSS transitions can run. `render()` must not rebuild the bars, flag or portrait on each turn.

```ts
type Screen = "title" | "select" | "turn" | "moving" | "result" | "ending";
```

| Screen | Shows | Buttons | Goes to |
|---|---|---|---|
| `title` | Game name, version | Start | `select` |
| `select` | Three character cards with money and energy | One per character | `turn` |
| `turn` | Scene, bars, turn number, speech bubble, options | One per offer, unaffordable ones disabled | `moving` |
| `moving` | Vehicle crossing the scene | None | `result` |
| `result` | Move summary, plus the event popup if one happened | Continue, Return | `turn` or `ending`, Return goes to `turn` |
| `ending` | Win, Burnout or Stranded popup, final stats, seed | Play again | `select` |

Rules:

- **Selecting a character:** `new Game(character, seedFromLink())`, as in the plain UI.
- **Moving:** ignore all clicks while `moving`. Move on at the vehicle's `animationend`, with a 2 s timeout as a fallback.
- **Continue:** goes to `ending` when `game.outcome` is set, otherwise to `turn`.
- **Return:** calls `game.undo()`, clears the result, and goes to `turn`. It is hidden if `game.canUndo` is false.
- **Bars:** update when the result screen appears, so they drop after the vehicle arrives. Return slides them back.
- **Missing images:** a helper `placeholderImage(src, label)` returns an `<img>`. On `error`, it swaps to a box showing the label. The scene uses a sky-blue gradient as its fallback, labelled with the weather.
- **Text:** lowercase in the wireframe style, with option text like `- 12 pesos`, `- 15 energy`, `- 4 km`. Limited options also show uses left.
- **Seed and version:** small text on the stage, seed during play and version on the title.

Asset paths are flat, matching the Minimum Asset Requirements doc: `assets/scene-normal.png`, `assets/transport-jeep.png`, `assets/character-student.png` and so on. Event filenames use this map:

| Event | Filename |
|---|---|
| Traffic Congestion | `event-traffic.png` |
| Station Queue | `event-queue.png` |
| Road Obstruction / Flood | `event-flood.png` |
| Track Fault / Station Power Outage | `event-track-fault.png` |
| Clear Traffic Flow | `event-clear-traffic.png` |
| Fare Surcharge | `event-surcharge.png` |

The `assets/` folder isn't created until the first real file exists. Until then, every image shows its placeholder, and the browser logs harmless 404s.

### Release

#### [MODIFY] `CHANGELOG.md`, `src/data.ts`, `AI/ACTIVE_CONTEXT/`

Set `VERSION` to `0.4.0`, add the changelog entry, tag `game@0.4.0`, and update the active context.

---

## 5. Implementation Steps

Branch `feat/stage-ui` from `master`. One continued Sonnet implementer, one commit per step. `npx -p typescript tsc` must pass before every commit. Commit messages follow `warehouse/commits.md`.

| Step | Work | Done when |
|---|---|---|
| S1 | Add `undo()` to `game.ts` | Undo checks and the simulation comparison pass |
| S2 | Split into `format.ts`, `ui-plain.ts` and the `ui.ts` entry. Add `?ui=` switching | `?ui=plain` behaves as it does today |
| S3 | Stage shell: `stage.css`, frame, panel, bars, boxes, placeholders, title and select screens | Screens match the wireframe layout |
| S4 | Turn, moving, result and ending screens, with Continue and Return | Full games play to all three endings |
| S5 | Transitions, vehicle animation, reduced motion and the portrait note | Browser checks pass |
| S6 | Release 0.4.0 on the branch | Orchestrator's final checks pass. Merge happens only after the user reviews |

The implementer doesn't change balance values, simulation scripts, `warehouse/` or `style.css`, and never pushes. It stops and reports if the plan and the code disagree.

---

## 6. Rejected Alternatives & Tradeoffs

| Alternative | Why rejected |
|---|---|
| Keep rebuilding the screen with `innerHTML` | CSS transitions can't run on elements that are replaced |
| Limit each turn to 3 options | Changes the balance and invalidates the simulations |
| Canvas or a game framework | Breaks the raw HTML and CSS rule, and is far more than this game needs |
| Duplicate the game in a second page for plain mode | Two copies of the UI entry would drift apart |
| Multi-step undo | One step covers testing and keeps the engine change small |

---

## 7. Verification Plan

### 7.1. Automated Checks

Run by the orchestrator, using scripts kept outside the project.

- [ ] `npx -p typescript tsc` passes with no errors.
- [ ] **Simulations unchanged:** `dist.mjs` and `picks.mjs` output is byte-identical to the current seeded output.
- [ ] **Undo:** for 60,000 seeded states, undo restores every field, repeating the choice gives an identical result, and a second undo returns `false`.
- [ ] **Undo at the end:** undo works after a winning or losing choice and clears the outcome.
- [ ] **Plain UI:** 150 games at `?ui=plain` reach all three endings with no page errors.
- [ ] **Stage UI:** 150 games with reduced motion reach all three endings, with no errors except the expected missing-image 404s.
- [ ] **Seeds:** a full run on `?seed=123` repeats exactly in both UIs, and invalid seeds fall back to random.
- [ ] **Return:** in the browser, Return restores the same options and bars, and the same choice gives the same result.
- [ ] **Placeholder swap:** adding a test PNG replaces its box, then the test file is removed.
- [ ] **Clicks during movement:** rapid clicks can't make a second choice.
- [ ] **Layout:** screenshots at 1280 × 720 and 844 × 390 are checked against the wireframes.

### 7.2. Manual Verification & Live Gates

| After | Check | Covers | Next step waits? |
|---|---|---|---|
| S3 | The user views the stage locally | Whether the layout matches the Canva look | Yes: S4 |
| S6 | The user plays both UIs locally | Feel, timing and the plain view | Yes: merge and any push |

---

## 8. Rollback & Safe Recovery Plan

1. **Failure indicators:** simulation output differs, a game can't finish, or the layout breaks.
2. **During the build:** the work is on `feat/stage-ui`, so `master` and the live site aren't touched.
3. **After a merge or push:** `git revert` the merge commit, recompile, and push when the user asks. `?ui=plain` also stays available if only the stage UI has a problem.
