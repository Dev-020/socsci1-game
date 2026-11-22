# Commuter Game Backlog

The prioritized task list for maintenance, features, and technical debt for the Metro Manila Commuting Game.

> **How this backlog is run** (`convention/backlog`)
> - **Layout:** single file
> - **IDs:** `[#NNN]`, allocated as the highest existing number + 1, never reused
> - **Entry style:** full
> - **Writes:** by hand, one writer at a time

---

## 📋 In Progress



## 📌 Backlog (Open Tasks)


### [#006] Add a character background & commuter profiles web page
- **Status**: `Open` | **Priority**: `P2` | **Labels**: `UI`, `Feature`, `Content`, `Docs`
- **Created**: 2026-11-14
- **Depends on**: None

#### Why
In-game character select shows only basic starting stats (money, energy, discount/penalty). Players and capstone reviewers do not see the real-world socio-economic and lived context behind each persona (Student, Worker, PWD). Adding a dedicated page grounds each persona in synthesized real-life experiences—sourced from articles, academic papers, and interviews—so the characters represent realistic demographic profiles rather than arbitrary stats.

#### Wanted
A standalone HTML page (e.g. `characters.html` with `src/characters.ts` and `characters.css`, following `docs/conventions/pages-and-screens.md` and using `base.css`) that presents detailed profiles for each in-game character:
1. Demographics and life context (age, education/occupation such as college student, upbringing, where they come from, household/living situation).
2. General commuting and travel experiences faced by each demographic in Metro Manila.
3. Citations/references to the real-life sources (website articles, papers, interviews) the synthesized profiles are drawn from.
4. Links to and from the game (e.g. from the title or character select screen, plus a `← back to game` link) and URL hash navigation if sectioned by character (`characters.html#student`, etc.).
5. Readable scrolling layout on both mobile portrait (375 px) and desktop without sideways scrolling.

#### Acceptance Criteria
- [ ] #1 Follows `docs/conventions/pages-and-screens.md` (own HTML file, entry module in `src/`, page stylesheet, and shared `base.css`).
- [ ] #2 Displays researched profiles for all three personas (`Student`, `Worker`, `PWD`) including demographics, background, travel experiences, and source references.
- [ ] #3 Supports linking from the main game and returning cleanly to `./`, with working section links if hash navigation is used.
- [ ] #4 Readable without sideways scrolling at 375 px wide and at desktop width.
- [ ] #5 `npx -p typescript tsc` compiles cleanly (and compiled `js/` output is committed), `docs/CODEMAP.md` and `docs/conventions/pages-and-screens.md` inventory are updated, and changes are noted in `CHANGELOG.md`.

#### Notes
- 2026-11-14: Waiting on the team's compiled demographic research, write-ups, and source citations from articles, papers, and interviews.

---

### [#007] Implement per-character themes across the website from finalized Canva designs
- **Status**: `Open` | **Priority**: `P2` | **Labels**: `UI`, `Design`, `Theming`
- **Created**: 2026-11-14
- **Depends on**: #002

#### Why
`#002` put the theme contract and DOM binding scaffolding in place (`src/theme.ts`, `data-character` attributes, meter modes, badge slots), but all three personas (`student`, `worker`, `pwd`) still inherit `DEFAULT_THEME` placeholders. The team has started drafting and designing distinct character themes in Canva so that each persona changes the look and feel of the entire website.

#### Wanted
Implement the finalized per-character visual themes once the team completes their Canva designs:
1. Update `CHARACTER_THEMES` in `src/theme.ts` and theme rules in `stage.css` (and shared/page stylesheets as applicable) with each character's finalized color palettes, typography/meter styles (`segmented` vs `continuous`, `bar` vs `digital`), commuter badge labels, and character/scene/transport PNG assets.
2. Ensure the selected character's theme applies consistently across the site where designed, and resets cleanly to the default theme when returning to title/select or starting a new session.
3. Keep `docs/DESIGN_SYSTEM.md` updated with the finalized character tokens and asset specs.

#### Acceptance Criteria
- [ ] #1 `Student`, `Worker`, and `PWD` each render their distinct finalized Canva palettes, meter styles, badges, and art assets.
- [ ] #2 Theme applies cleanly on character selection and resets cleanly back to `DEFAULT_THEME` on restart / return to title/select.
- [ ] #3 Layout, contrast, and asset framing work on desktop and mobile (portrait and landscape) without clipping or overflow.
- [ ] #4 `npx -p typescript tsc` compiles cleanly (and compiled `js/` output is committed), `docs/DESIGN_SYSTEM.md` reflects the final values, and changes are noted in `CHANGELOG.md`.

#### Notes
- 2026-11-14: Blocked/waiting on the team to finish drafting and finalizing the character themes in Canva.

---

### [#008] Limit transit options to 3 per turn/run and rebalance option selection & values
- **Status**: `Open` | **Priority**: `P2` | **Labels**: `Core`, `Balance`, `Rules`
- **Created**: 2026-11-14
- **Depends on**: None

#### Why
Right now `availableOptions()` in `src/game.ts` returns every transit mode that passes distance, weather, usage, and event-disable filters (up to 5+ options per turn). The team plans to cap the presented choices to **3 options** instead of showing all available modes, which changes decision tension and requires updating both the option-selection logic and gameplay balance values.

#### Wanted
1. Define and implement the 3-option selection rule (clarifying whether the 3-option cap applies per turn via deterministic seeded selection/priority or as a 3-mode loadout per run, while preserving a safe fallback such as `Walk` when needed).
2. Tweak transit stats/costs/energy/limits in `src/data.ts` and selection/filtering rules in `src/game.ts` so all three characters remain balanced and winnable under the 3-option constraint.
3. Update both `src/ui-stage.ts` (and `stage.css` swipe/card layout if needed) and `src/ui-plain.ts` if presentation assumptions (e.g. 5-card design) change.
4. Rerun the balance simulations per `AGENTS.md` and update simulation findings/docs.

#### Acceptance Criteria
- [ ] #1 Option selection in `src/game.ts` limits available choices to at most 3 options as specified, using deterministic `seededRoll()` if random selection is involved.
- [ ] #2 Balance values in `src/data.ts` (and rules in `src/game.ts`) are tuned and verified by rerunning the simulations, with updated findings recorded in the capstone docs.
- [ ] #3 Undo (`TurnSnapshot` / `undo()`) and `?ui=plain` continue to work accurately with the new option logic.
- [ ] #4 `npx -p typescript tsc` compiles cleanly (and compiled `js/` output is committed), `docs/CODEMAP.md` rules summary is updated if changed, and release notes are added to `CHANGELOG.md`.

#### Notes
- 2026-11-14: Open design question to confirm with the team before implementation: whether "limit possible options per run to 3" means 3 randomly/deterministically offered options per turn, or 3 transit modes locked in for the entire run, and which modes/values are being tweaked.

---

### [#009] Add starting character background buffs and debuffs
- **Status**: `Open` | **Priority**: `P2` | **Labels**: `Core`, `Feature`, `Balance`, `Rules`
- **Created**: 2026-11-14
- **Depends on**: None

#### Why
Per the professor's suggestion, a commuter's personal and social context (for example: happy vs. strained family background, having someone to come home to vs. living alone, or a supportive vs. stressful workplace) strongly shapes their daily commute capacity and resilience. Modeling these as starting "background" buffs/debuffs connects the game's socio-economic theme directly to gameplay mechanics.

#### Wanted
1. Define a background buff/debuff system (data model in `src/data.ts`, modifiers applied in `src/game.ts`) that assigns or lets runs start with one or more background contexts (e.g., family situation, living alone vs. with household support, workplace environment).
2. Allow background modifiers to adjust starting stats (starting money, starting/max energy) and/or per-turn transit option values (e.g., energy drain, fare cost, or recovery/resilience).
3. Surface the active background context and its effects clearly in the UI (`src/ui-stage.ts` and `src/ui-plain.ts`), including on the starting/turn/ending screens, using deterministic `seededRoll()` if rolled per run.
4. Rerun balance simulations per `AGENTS.md` to verify win/burnout/stranded rates across background combinations.

#### Acceptance Criteria
- [ ] #1 Background buff/debuff definitions live in `src/data.ts` and rule/modifier application lives in `src/game.ts` (keeping rules separate from UI).
- [ ] #2 Active background context and stat/transit effects are clearly displayed in both the stage UI and `?ui=plain`.
- [ ] #3 Seeded runs (`?seed=...`) reproduce the exact same background buffs/debuffs, and `undo()` preserves them cleanly.
- [ ] #4 Simulations are rerun across background variants and results are documented in the capstone findings.
- [ ] #5 `npx -p typescript tsc` compiles cleanly (and compiled `js/` output is committed) and changes are recorded in `CHANGELOG.md`.

---

### [#010] Redesign turn transition / result screen with contextual character comments & trivia
- **Status**: `Open` | **Priority**: `P2` | **Labels**: `UI`, `Feature`, `Content`, `Design`
- **Created**: 2026-11-14
- **Depends on**: None

#### Why
Currently, the `result` screen between turns (`showResult()` in `src/ui-stage.ts`) only displays raw numbers (`moved X km`, `paid X pesos`, `used X energy`) and any triggered event card. Adding contextual character reactions, tooltips, trivia, or fun facts tied to what just happened (the chosen transit mode, weather, and event—and optionally the character persona) makes each turn feel alive and reinforces the commuter narrative.

#### Wanted
Redesign the turn-to-turn transition (`result` screen in `src/ui-stage.ts` and `stage.css`, with presentation-only copy data) so that alongside the final subtracted amounts and event outcome, the character reacts with contextual comments, tooltips, or trivia:
1. Context-aware reactions/comments keyed by combinations of transit mode, weather, triggered event, and/or character (for example: choosing LRT during Rainy weather → *"thankfully LRT is still available"*, walking during Sunny weather → *"its so hot tho"*, hitting Fare Surcharge on a ride-hail/car → *"omg its so much more expensive"*).
2. Optional commuter fun facts, tips, or trivia presented cleanly without overflowing the fixed 16:9 stage or mobile layout.
3. Keep all comment/trivia selection purely presentational (no changes to game rules, costs, or odds in `src/game.ts` / `src/data.ts`; if multiple lines exist for a context, pick deterministically from turn/seed/state without altering gameplay rolls).

#### Acceptance Criteria
- [ ] #1 The redesigned `result` screen still clearly shows the final turn amounts (km moved, pesos paid, energy used) and any triggered random event.
- [ ] #2 Contextual character comments/tooltips/trivia appear on the `result` screen based on the turn's transit mode, weather, event, and/or persona, with sensible fallback text when no specific combination matches.
- [ ] #3 Layout fits cleanly within the console stage on both desktop and mobile (portrait and landscape) without text clipping or overflow.
- [ ] #4 Game rules, balance values, and RNG rolls in `src/game.ts` and `src/data.ts` remain untouched (no simulation changes needed).
- [ ] #5 `npx -p typescript tsc` compiles cleanly (and compiled `js/` output is committed), and changes are noted in `CHANGELOG.md`.

---

### [#014] Build a visual design-system page (local only)
- **Status**: `Open` | **Priority**: `P2` | **Labels**: `UI`, `Design`, `Docs`
- **Created**: 2026-11-20
- **Depends on**: #013

#### Why
The design system (`docs/DESIGN_SYSTEM.md`, `docs/design-system/`) describes the palette, type, spacing and components only as text, token names and hex codes. The owner and the art team need to *see* it: the real colours, the real outlines, the real components at their real sizes. A page drawn from the live tokens can't drift from the code the way a hand-written list can.

#### Wanted
One local-only HTML page under the gitignored `docs/` (for example `docs/design-system/index.html`), opened through `python -m http.server` from the repo root. It loads the real `base.css` and the game's style sheets and reads token values with `getComputedStyle`, so it updates itself when `base.css` changes:
1. **Palette:** a swatch per colour token, grouped (surfaces, text, accents, stats, status, scene), each with its name, hex value and where it's used; click to copy the token name.
2. **Contrast:** each pair from `AI/tools/contrast_pairs.txt` drawn as real text on its real background (outlines included), with its ratio and a pass / accepted-gap mark.
3. **Type, spacing, borders, radii and shadows:** each token shown at its real size, including the outline shadow tokens.
4. **Components:** the real game pieces (buttons, character cards, panel, meters, HUD, ending card, changelog cards) built with the game's own CSS classes, labelled with their component ids from `docs/COMPONENTS.md`.
5. **Art slots:** each slot from `docs/design-system/asset-slots.md` as a box at its real size and aspect ratio, with its file name and export size.
6. **Later, with #007:** a theme switcher that re-renders the page under each `[data-character]` theme.

#### Acceptance Criteria
- [ ] #1 Nothing new is committed or published: the page lives under `docs/` (gitignored) and never ships to the live site; the game's files, `js/` and `CHANGELOG.md` are unchanged by it.
- [ ] #2 Every colour token in `base.css` appears as a swatch, read from the live CSS (no hex values copied into the page).
- [ ] #3 Every contrast pair renders with the same ratio and pass/fail as `python AI/tools/contrast.py`.
- [ ] #4 Components render with the game's own classes and match the game's screenshots at the same scale.
- [ ] #5 Art slots match `asset-slots.md` box sizes and aspect ratios.
- [ ] #6 Readable at desktop width and at 375 px without sideways scrolling; `docs/DESIGN_SYSTEM.md` links to it.

#### Notes
- 2026-11-20: Owner chose local only (not on the live site). Start after #013 closes, so it shows the final colours and outlines.
- 2026-11-20: To settle in the plan: the page's script lives under `docs/` too, so it can't go through `tsc` into the committed `js/`; decide between a small plain-JS module under `docs/` (an exception to the TypeScript rule, local only) or a gitignored TS build.

---

### [#004] Raise the seed limit from 1 million to 1 billion
- **Status**: `Open` | **Priority**: `P3` | **Labels**: `Core`, `Randomness`
- **Created**: 2026-11-04
- **Depends on**: #003

#### Why
Since 0.8.0, every run uses one of 1,000,000 seeds (0 to 999,999). That is plenty for play, but two random games share a seed about once in every 1,200 games (50% chance), which could surprise players comparing runs. Testing on 2026-11-04 showed the `fixedSin` roll formula stays well mixed up to at least 10 billion seeds. At 1 billion, angle precision is still about 0.000002 radians.

| Seed limit | Event rate (35%) | Two in a row (12.25%) | Chi-square (70–130) | Largest correlation |
|---|---|---|---|---|
| 1 million (now) | 35.01% | 12.24% | 133 | 0.0012 |
| 1 billion | 34.89% | 12.17% | 116 | 0.0006 |

#### Wanted
Change `SEED_LIMIT` in `src/data.ts` from `1000000` to `1000000000`. `entropySeed()`, `seedFromLink()` and `randomSeed()` already read it, so no other logic changes. Seeds 0 to 999,999 keep exactly the same rolls, so old links and the existing simulation results stay valid.

Do not go above about 10 billion: the statistics start to drift, and past about 10^17 the turn and purpose terms are lost and every roll in a game is the same. Do not switch to mulberry32, because it needs bit operators.

#### Acceptance Criteria
- [ ] #1 `SEED_LIMIT` is `1000000000`, and `npx -p typescript tsc` compiles cleanly.
- [ ] #2 `?seed=999999999` is accepted, and `?seed=1000000000` starts a fresh random game.
- [ ] #3 `entropySeed()` always returns a whole number from 0 to 999,999,999.
- [ ] #4 Seeds 0 to 999,999 give the same runs as in 0.8.0 (spot-check a few seeds against `game@0.8.0`).
- [ ] #5 RNG checks rerun on seeds spread across the new range; results noted in `Game_RNG_Options.md` (seed range in "How a roll works" and the test notes).
- [ ] #6 A 9-digit seed fits in the stage footer and the ending screen on a phone held upright.
- [ ] #7 Released as a MINOR bump (next version after 0.8.0, e.g. 0.9.0), with a changelog line such as "Seeds now go from 0 to 999,999,999, so two games rarely share one."

---

## ✅ Completed

### [#013] Apply the design system to the code (#012 follow-up)
- **Status**: `Closed` | **Priority**: `P1` | **Labels**: `UI`, `Design`, `Accessibility`
- **Created**: 2026-11-19
- **Severity**: `Major` | **Likelihood**: `Frequent`
- **Depends on**: #012

#### Why
The P3 judged UI audit (`docs/audits/2026-11-16-bb9df24/lens-ui.md`) found 322 findings across the stage, plain UI, changelog, and `src/theme.ts`: 218 token-use (`U1`), 57 component-drift (`U3`), 6 layout near-misses (`U4`), and 41 non-exempt WCAG 2.2 AA contrast failures (`A1`, of which 22 are `Major`/`Frequent` fix-now findings).

#### Wanted
First add the approved tokens to `base.css` `:root` and apply the 19 approved token renames (`docs/design-system/decisions.md`), then work the checklist below (fix-now `P1` contrast items first, grouped by file and criterion):

**Fix-now (`P1`, `Major` + `Frequent`):**
- [x] **P1 (stage.css — A1):** F287–F291, F293–F295, F300–F313 (22 failing contrast pairs on character cards, distance HUD, option cards, panel stats/meters/buttons, and focus rings)

**Remaining findings by file and criterion:**
- [x] **stage.css (U1):** F1, F7, F11, F13–F16, F20–F23, F25–F26, F38, F44, F46, F49–F54, F57–F61, F63, F68, F77, F79–F102, F106–F108, F112, F114, F116–F117, F119–F121, F123, F127–F128, F130–F131, F133–F134, F140–F141, F144–F145, F148–F151, F153, F155–F158, F160–F161, F163–F169, F171–F172, F174–F176, F179–F184, F186–F192, F195, F197–F203, F205–F210, F214–F217 — migrate 129 raw style values to approved tokens
- [x] **stage.css (U3):** F219–F258 — align 40 drifting components with their design-system specs
- [x] **stage.css (U4):** F276–F281 — resolve 6 layout near-misses (`layout-map.md` §3)
- [x] **stage.css (A1):** F282–F286, F292, F296–F299, F314–F318 — resolve 15 `Minor`/`Occasional` contrast failures
- [x] **style.css (U1):** F2–F3, F5, F12, F19, F29, F33, F37, F56, F66–F67, F71, F74, F104, F109–F111, F126, F138–F139, F152, F170, F177, F193, F213 — migrate 25 raw style values to approved tokens
- [x] **style.css (U3):** F259–F265, F275 — align 8 drifting components with their design-system specs
- [x] **style.css (A1):** F319–F320 — resolve 2 `Minor`/`Occasional` contrast failures
- [x] **changelog.css (U1):** F4, F6, F8–F10, F17–F18, F24, F27–F28, F30–F32, F34–F35, F39, F41–F42, F45, F47–F48, F55, F62, F64–F65, F69–F70, F72–F73, F75–F76, F78, F103, F105, F113, F115, F118, F122, F124–F125, F129, F132, F135–F137, F142–F143, F146–F147, F154, F159, F162, F173, F178, F185, F194, F196, F204 — migrate 58 raw style values to approved tokens
- [x] **changelog.css (U3):** F266–F274 — align 9 drifting components with their design-system specs
- [x] **changelog.css (A1):** F321–F322 — resolve 2 `Minor`/`Occasional` contrast failures
- [x] **src/ui-stage.ts (U1):** F211–F212 — migrate 2 raw style values to approved tokens
- [x] **src/ui.ts (U1):** F43 — migrate 1 raw style value to approved tokens
- [x] **src/theme.ts (U1):** F36, F40, F218 — replace 7 hand-copied palette hexes in `DEFAULT_THEME.accentPalette` with `base.css` token references

#### Acceptance Criteria
- [x] #1 No raw style value remains outside the design system's listed exceptions (`docs/DESIGN_SYSTEM.md` §10).
- [x] #2 `python AI/tools/contrast.py --check` exits 0 with all 41 non-exempt failing pairs resolved, or each remaining pair approved by the owner as an accepted gap. (28 fixed, 10 accepted in the Findings Register, and the 3 focus-ring pairs removed with the focus box. The 2 disabled-exempt pairs, outside the 41, are noted there too.)
- [x] #3 Simulations are rerun only if game rules change (they should not change for this styling/accessibility pass).
- [x] #4 The UI audit re-runs in judged mode and `docs/components.json` / `docs/COMPONENTS.md` are rebuilt (`python AI/tools/build_components.py --check` exits 0).

#### Notes
- 2026-11-19: Plan `AI/PLAN_013_apply-design-system.md` (P1 move the code onto tokens, P2 the owner's choices: contrast options, near-misses, an asset-slot list for the placeholder art, P3 apply and re-audit). Work on branch `013-apply-design-system`.
- 2026-11-19: P1 done: all approved tokens in `base.css` (stage-sized tokens in a `.stage` block, because a `:root` token can't see `.stage`'s `--px`), the 19 renames applied, raw values replaced, and no hex values left in `src/theme.ts`. Style snapshots before and after show only the approved merges (1,100 settled diffs, all traced). Contrast ratios unchanged. Review `AI/REVIEW_013_P1.md`, 2 findings fixed, 1 deferred to P3.
- 2026-11-21: The owner rejected the first P2 contrast options (they swapped colours to navy). P2b redo: same hue, lightness only, plus outlines in each text's own shadow colour (WCAG 2.2 Understanding 1.4.3 note 5). Review `AI/REVIEW_013_P2b.md`, 4 findings fixed. The owner picked the recommended options, asked for thinner outlines on the tagline and distance label, and replaced the white focus box with each button's hover effect (WCAG 2.4.7 needs only a visible change).
- 2026-11-22: P3 part A (`a161d07`) applied the choices and the 6 near-miss alignments; review `AI/REVIEW_013_P3A.md`, 2 findings fixed; the owner approved all 20 screens. Part B: re-audit `docs/audits/2026-11-22-a161d07/`, component list rebuilt, design-system docs, Findings Register, changelog; review `AI/REVIEW_013_P3B.md`, 5 findings fixed. The owner approved closing #013.

#### Outcome (2026-11-22)
The code now runs on the design system. `base.css` holds every approved token, the style sheets use them, and `src/theme.ts` copies no colours. Contrast: 28 of the 41 failing pairs are fixed by outlines in each text's own shadow colour and slightly deeper shades of the same hues, 10 are accepted by the owner (in the Findings Register, with the 2 disabled-exempt pairs), and the 3 focus-ring pairs went away with the focus box: keyboard focus now shows each button's hover effect. The 6 layout near-misses are aligned. The re-audit at `a161d07` finds U1 = 0 and U4 = 0, all 58 components `matches`, and every #013 finding resolved or recorded. Rules, balance and odds are unchanged.

---

### [#012] Run UI audit and align docs/DESIGN_SYSTEM.md & docs/COMPONENTS.md with warehouse conventions
- **Status**: `Closed` | **Priority**: `P2` | **Labels**: `UI`, `Docs`, `Design`
- **Created**: 2026-11-16
- **Resolved**: 2026-11-19
- **Depends on**: #011

#### Why
The repository now pulls `convention/design-system`, `convention/ui-component-list`, and `protocol/audit-lens-ui`. Currently:
- `docs/DESIGN_SYSTEM.md` predates `convention/design-system` (missing the required header/source-of-truth contract for the Canva import workflow, WCAG 2.2 AA contrast table, and decision log), omits `changelog.html`/`changelog.css` styles, and lists character theme overrides that are still placeholders in `src/theme.ts` and `stage.css`.
- There is no `docs/COMPONENTS.md` inventory yet (`convention/ui-component-list`).

#### Wanted
1. Run `protocol/audit-lens-ui` (as a scoped re-audit extending the codemap audit record, or a new audit record in `docs/audits/`) covering `stage.css`, `style.css`, `changelog.css`, `base.css`, `src/ui-stage.ts`, `src/ui-plain.ts`, `src/changelog.ts`, and `src/theme.ts`.
2. Realign `docs/DESIGN_SYSTEM.md` with `convention/design-system` and `template/design-system` (recording the repo/Canva source-of-truth workflow, accurate token status, accessibility contrast checks, and decision log, without prematurely locking in unfinalized Canva character palettes).
3. Create `docs/COMPONENTS.md` from the UI lens results per `convention/ui-component-list`, covering Built components (`stage`, `changelog`, `plain`) and Planned components (`#006`, `#007`, `#010`), plus raw hard-coded value mapping.
4. Triage any UI drift/raw-value findings into `BACKLOG.md` per `protocol/issue-triage`.

#### Acceptance Criteria
- [x] #1 Audit record in `docs/audits/` includes `lens-ui.md` with verified `path:line` evidence for all UI components and raw style values.
- [x] #2 `docs/DESIGN_SYSTEM.md` follows `convention/design-system` §4 section order, names the single source of truth, reflects actual code status, and includes §8 accessibility contrast checks and §10 decision log.
- [x] #3 `docs/COMPONENTS.md` follows `convention/ui-component-list` §7 ("Done when") and accurately maps Built vs. Planned components and statuses.
- [x] #4 Any findings from the UI lens are triaged into `BACKLOG.md` and linked back in `lens-ui.md`.

#### Notes
- 2026-11-19: Plan written at `AI/PLAN_012_design-system-audit.md`. It reorders the work: P1 an inventory UI lens, P2 the design system rewrite, P3 a judged lens with `COMPONENTS.md`, triage into one follow-up item (#013) and a codemap rebuild. The user approved P1 only, and will review its output before P2 because the files may need splitting so agents can read them cheaply. Brief: `AI/BRIEF_012_P1.md`.
- 2026-11-19: P1 done (UI lens in inventory mode: 58 components, 286 raw values, 116 placement rows; review `AI/REVIEW_012_P1.md`, 6 findings fixed). The plan's P2 and P3 now follow Shadow Cursor's split layout (a short core, one file per spec, `components.json` plus a short index), citing warehouse tickets `ISS-20261116-design-system-document-split-rules-from-data-a-sho`, `ISS-20261116-component-list-keep-the-generated-data-in-json-wit` and `ISS-20261115-design-system-convention-covers-only-one-document`. The user approved P2. Brief: `AI/BRIEF_012_P2.md`.
- 2026-11-19: P2 done: core `docs/DESIGN_SYSTEM.md`, 16 specs and topic files in `docs/design-system/`, `ds-mapping.md`, `AI/tools/contrast.py`. Review `AI/REVIEW_012_P2.md`, 6 findings fixed. Proposals await the owner: 184 tokens (12 layout), 19 renames, 6 near-misses, 41 failing contrast pairs.
- 2026-11-19: The owner approved the P2 proposals (recorded in `docs/design-system/decisions.md`) and P3. Brief: `AI/BRIEF_012_P3.md`.
- 2026-11-19: P3 done: judged lens (322 findings, all into #013, 22 fix-now contrast pairs), `docs/components.json` and `docs/COMPONENTS.md` (built by `AI/tools/build_components.py`), codemap rebuilt. Review `AI/REVIEW_012_P3.md`, 5 findings fixed. The user approved closing #012.

#### Outcome (2026-11-19)
The UI audit, design system and component list now follow the warehouse conventions. `lens-ui.md` in `docs/audits/2026-11-16-bb9df24/` judges 58 components and 286 raw values against the design system, with 322 findings. `docs/DESIGN_SYSTEM.md` is a short core with `docs/design-system/` beside it (16 specs, the stage layout map, patterns, the decision log with the owner's approvals, and a contrast table generated by `AI/tools/contrast.py`), following Shadow Cursor's split layout as a recorded deviation. `docs/components.json` and `docs/COMPONENTS.md` hold 58 built and 3 planned components, built by `AI/tools/build_components.py`. Every finding is triaged into #013, with 22 contrast failures marked fix-now. `docs/CODEMAP.md` was rebuilt. No code or style changed.

---

### [#011] Audit codebase structure and rebuild docs/CODEMAP.md per warehouse architecture/codemap
- **Status**: `Closed` | **Priority**: `P2` | **Labels**: `Docs`, `Architecture`
- **Created**: 2026-11-16
- **Resolved**: 2026-11-19 (first closed 2026-11-17; reopened 2026-11-19)
- **Depends on**: None

#### Why
The repository now pulls `architecture/codemap`, `protocol/codemap-upkeep`, `protocol/codebase-audit`, `convention/audit-record`, and `protocol/audit-lens-structure` from the warehouse. The existing `docs/CODEMAP.md` was written by hand before these conventions existed and is not backed by an audit record in `docs/audits/`.

#### Wanted
1. Run a light full audit (`protocol/codebase-audit` + `protocol/audit-lens-structure`) pinned to the current commit, saving `00_AUDIT.md`, `core.md`, and `lens-structure.md` under `docs/audits/<date>-<commit>/`.
2. Rebuild `docs/CODEMAP.md` strictly from that audit record per `architecture/codemap` (commit-pinned header, L0/L1/L3 tables with evidence `path:line`, Mermaid diagrams, structure marks, and `Not shown` section) while keeping useful developer quick-lookup notes if helpful or separated cleanly.
3. Follow `protocol/codemap-upkeep` (`phase-end` default) for future updates.

#### Acceptance Criteria
- [x] #1 Audit record `docs/audits/2026-11-16-bb9df24/` (`00_AUDIT.md`, `core.md`, `lens-structure.md`) exists, is pinned to commit `bb9df24`, and has empty `evidence-missing`.
- [x] #2 `docs/CODEMAP.md` is rebuilt from `docs/audits/2026-11-16-bb9df24/` and satisfies `architecture/codemap` §6 ("Done when").
- [x] #3 Every unit and interaction in `docs/CODEMAP.md` matches the audit record with verified `path:line` evidence.

#### Notes
- 2026-11-16: Warehouse documents pulled into `warehouse/` and light structure audit started at commit `bb9df24`.
- 2026-11-17: Rebuilt `docs/CODEMAP.md` from `docs/audits/2026-11-16-bb9df24/` and moved the narrative lifecycle diagrams, formulas, and developer quick-lookup notes to `docs/DEV_GUIDE.md`.
- 2026-11-19: **Reopened.** A review by Claude Code (Opus 5.5) found that the codemap does not fully meet `architecture/codemap` §2 rule 1 ("the map never states a fact the record doesn't hold"), so criteria #2 and #3 were unticked:
  - `core.md` has no relations to the outside things X1–X7. The L0 link types (`reads`, `calls`, `sends`, `configures`, `depends-on`) were written into the map without any record behind them.
  - `src/format.ts` sits in `engine`, which is described as "pure", but it reads `location.search` (`src/format.ts:8`) and `performance.now()` (`src/format.ts:15`), and its own header calls it screen helpers (`src/format.ts:1`).
  - `base.css` sits in `game-ui`, which creates a false `changelog-page → game-ui` link at L1 (`changelog.html:8`).
  - Small issues: two gaps share the id `G1` (core and structure lens), the 0/0 `python-prototype` carries a ★, and `tsconfig.json` is both in `scope.include` and outside thing X4.
  - The user decided: move `src/format.ts` to `game-ui`, and add a `shared-styles` subsystem for `base.css`. The corrections go into the existing record `docs/audits/2026-11-16-bb9df24/` (the code is still at `bb9df24`), and then the map is rebuilt. Staffing: Hydrogen implementer (medium reasoning) and a separate Hydrogen reviewer (high reasoning), with Claude Code verifying. Brief: `AI/BRIEF_011_codemap-redo.md`. The pre-redo record and map are backed up in `AI/archive/2026-11-19-pre-011-redo/`.

- 2026-11-19: **Closed again.** Hydrogen implementer (medium) corrected the record and rebuilt the map (`AI/REPORT_011_codemap-redo.md`, stops 1–3). A Hydrogen review at high effort (`AI/REVIEW_011_codemap-redo_high.md`) found 2 Minor and 2 Nitpick issues (V1 boundary subgraphs missing from the L1 diagram, V2 `AGENTS.md:19` cited instead of `:18`, V3 X5 evidence incomplete, V4 heading name), and all were fixed. A first review ran at medium effort by mistake (`AI/REVIEW_011_codemap-redo.md`) and found only V1. Claude Code (Opus 5.5) verified every stop against the files. Every change is listed under Corrections in `docs/audits/2026-11-16-bb9df24/00_AUDIT.md`.

#### Outcome (2026-11-19)
`docs/CODEMAP.md` is rebuilt in full from the corrected record `docs/audits/2026-11-16-bb9df24/`: 5 subsystems (with `src/format.ts` moved to `game-ui` and the new `shared-styles` holding `base.css`), relations R21–R35 to outside things behind every L0 link, recounted central units, unique gap ids G1–G3, and boundary subgraphs on L1. It meets `architecture/codemap` §6.

#### Outcome (2026-11-17, superseded by the 2026-11-19 reopen)
`docs/CODEMAP.md` is now generated from the verified audit record at `docs/audits/2026-11-16-bb9df24/` (L0, L1, L3 tables, Mermaid diagrams, structure marks, and `Not shown` gaps), and developer reference notes live in `docs/DEV_GUIDE.md`.

---

### [#005] Add a changelog page and define pages vs screens
- **Status**: `Closed` | **Priority**: `P2` | **Labels**: `UI`, `Feature`, `Docs`
- **Created**: 2026-11-05
- **Resolved**: 2026-11-05
- **Depends on**: None

#### Why
Players and groupmates can't see how the game has changed. The only history is `CHANGELOG.md` in the repo. A changelog page on the live site lets anyone follow the game's development, and makes it easy to explain the development process in the capstone presentation. `CHANGELOG.md` is already written for groupmates and is served by GitHub Pages as a raw file, so the page can read it directly. Nothing has to be regenerated, and it stays the only source of truth.

This is also the site's first second page. Before more pages are added, the project needs a written definition of what a page is and what a screen is.

#### Wanted
**1. Pages vs screens definition** in `docs/conventions/pages-and-screens.md`, with a pointer from `AGENTS.md` (Rules) and `docs/CODEMAP.md`:
- **Page:** its own HTML file with its own entry module (`src/<page>.ts`) and one purpose. Moving between pages loads a new document. Every page has its own URL that can be shared.
- **Screen:** one state within a page, swapped in place without a reload and driven by that page's state machine. A page with only one screen needs no screen machinery.
- **New page or new screen?** Make a new page when the content isn't part of an existing page's flow, or needs a different layout (for example, scrolling text instead of the fixed 16:9 stage).
- **Content pages that later get screens** use the URL hash (`page.html#section`), so each screen can be linked and the browser's Back button works. The game's screens stay URL-less, because a run can't be entered halfway.
- **Pages share a look, not code:** shared fonts and palette go in `base.css`. A helper like `el()` moves to a shared module only when a second page actually needs it.
- Current pages: `index.html` (the game: title, select, turn, moving, result and ending screens) and `changelog.html` (one screen).

**2. `base.css`:** move the two `@font-face` rules and the `:root` palette and font variables out of `stage.css` into `base.css`. `index.html` and `changelog.html` both load it before their own stylesheet. The stage and the `?ui=plain` screens must look exactly as before.

**3. `changelog.html` + `src/changelog.ts` + `changelog.css`** (display only, no game rules):
- `fetch("CHANGELOG.md")`, then parse the Keep a Changelog format: `## [version] - date`, `### Category`, `- item`. Render inline `` `code` `` and `[text](url)` links. Build the DOM with `textContent` or `el()`, never `innerHTML` with changelog text.
- **Unreleased:** if `[Unreleased]` has entries, show them in a `<details>` (collapsed by default) above the latest version, labelled something like "In progress (not yet released)". If it's empty, show nothing.
- **Versions:** newest first. Each version card shows its number, its date and its categories (Added / Changed / Removed / Fixed, each with its own colour tag).
- **"View code changes" link per version:** a small, secondary link to `https://github.com/Dev-020/socsci1-game/compare/game@<previous>...game@<version>`. The oldest version (0.1.0) has no previous tag, so it links to `tree/game@0.1.0`. The Unreleased section links to `compare/game@<latest>...master`. The links are built from the parsed versions, not hard-coded.
- **Short intro** at the top, written for groupmates: what the page is, and the main stages so far (Python port → seeded runs → new stage screen → animations → character themes).
- A "← back to game" link to `./`.
- A normal scrolling page, readable on a phone held upright and on desktop. It uses the pixel fonts and palette from `base.css`, without the arcade frame.
- If the fetch fails (for example, the file was opened without a server), show a short message instead of a blank page.

**4. Link from the game:** the `v<VERSION>` footnote on the stage title screen becomes a link, `v0.x.y · changelog`, to `changelog.html`. The version line on the `?ui=plain` select screen gets the same link.

**5. `.nojekyll`:** add an empty `.nojekyll` at the repo root. GitHub Pages currently runs Jekyll, which publishes an auto-rendered `/CHANGELOG.html` and `/CHANGELOG` next to our page. `.nojekyll` makes Pages serve the files as they are. `CHANGELOG.md` is still served raw.

#### Acceptance Criteria
- [x] #1 `docs/conventions/pages-and-screens.md` exists with the definitions above, and `AGENTS.md` and `docs/CODEMAP.md` point to it. `docs/CODEMAP.md` lists the new files.
- [x] #2 `base.css` holds the fonts and palette. The stage title, select and turn screens, and `?ui=plain`, look unchanged.
- [x] #3 `changelog.html` at `http://localhost:8000/changelog.html` shows every version in `CHANGELOG.md` (0.1.0 → latest), newest first, with dates and categories.
- [x] #4 With an entry under `[Unreleased]`, a collapsed section appears above the latest version and opens on click. With `[Unreleased]` empty, it's hidden.
- [x] #5 Each version's "view code changes" link points to the right GitHub compare view (0.1.0 → tag tree, Unreleased → `...master`).
- [x] #6 Inline code and links in entries render correctly. No changelog text is inserted with `innerHTML`.
- [x] #7 The title-screen footnote and the plain-UI version line link to the changelog, and the page links back to the game.
- [x] #8 Readable without sideways scrolling at 375 px wide and at desktop width.
- [x] #9 `npx -p typescript tsc` compiles cleanly, and the compiled `js/changelog.js` is committed.
- [x] #10 `.nojekyll` exists at the repo root.
- [x] #11 Released as a MINOR bump (next version after 0.8.0) with a `CHANGELOG.md` entry such as "A changelog page now shows what changed in each version. Open it from the version number on the title screen." No rules, values or rolls change, so the simulations don't need a rerun.

#### Notes
- 2026-11-05: Released in 0.9.0. Built by an Orca antigravity worker (gemini-3.8-flash), reviewed by the coordinator: `tsc` clean, every page and file returns 200 from a local server, and the parser reads all 10 versions with the right dates and compare links. #2 (stage and plain UI look unchanged) and #8 (phone and desktop widths) still need a visual check by the user before this item closes. Intro text written by the user.
- 2026-11-05: The user checked the page on phone and desktop and confirmed the stage and plain UI look unchanged (#2, #8). The 0.9.1 patch limited changelog links to web addresses and merged the duplicate category rendering.

#### Outcome
The changelog page (`changelog.html`, `src/changelog.ts`, `changelog.css`) reads `CHANGELOG.md` directly, with a collapsed Unreleased section and "view code changes" links between release tags. It ships in 0.9.0 and 0.9.1. Pages and screens are defined in `docs/conventions/pages-and-screens.md`, and shared fonts and palette live in `base.css`.

### [#003] Implement entropy-based seed generation
- **Status**: `Closed` | **Priority**: `P2` | **Labels**: `Core`, `Feature`, `Randomness`
- **Created**: 2026-11-04
- **Resolved**: 2026-11-04
- **Depends on**: None

#### Why
Currently, the game uses `Math.random()` to generate a starting seed when no manual seed is provided. While sufficient, this is a pseudo-random process. To introduce "true" randomness, we can harvest entropy from the physical world by capturing the high-resolution timing of the user's interaction with the UI.

#### Wanted
An entropy-harvesting mechanism that uses `performance.now()` during the character selection event to generate a highly unpredictable seed, while maintaining the existing priority of manual URL seeds.

#### Acceptance Criteria
- [x] #1 Implement `entropySeed()` helper in `src/format.ts`.
- [x] #2 Integrate entropy capture into `src/ui-plain.ts` and `src/ui-stage.ts`.
- [x] #3 Ensure manual seeds via `?seed=...` still override entropy generation.
- [x] #4 Verify "Undo" functionality remains intact.
- [x] #5 Update `VERSION` to `0.8.0` and update `CHANGELOG.md`.
- [x] #6 `npx -p typescript tsc` compiles cleanly.

#### Outcome
Implemented entropy harvesting via `performance.now()`, `Date.now()`, and `Math.random()` to provide unique seeds for every run. Enforced a seed limit of 0-999,999 to prevent float precision issues. Updated the RNG formula to use a 41.843 multiplier for better purpose separation.

### [#002] Implement character-specific themes and UI layouts (Student, Worker, PWD)
- **Status**: `Closed` | **Priority**: `P2` | **Labels**: `UI`, `Feature`, `Theming`
- **Created**: 2026-11-03
- **Resolved**: 2026-11-03
- **Depends on**: #001

#### Why
Currently, all gameplay screens use a shared lavender/purple panel and pink console frame regardless of which commuter persona is selected. Each persona represents a distinct social and physical commuter reality (Student, Corporate Worker, PWD). Their UI should visually reflect their distinct identity, including tailored console/panel color schemes, bespoke meter representations (e.g. discrete notebook blocks for Student vs. continuous corporate gauge for Worker), and unique commuter pass/badge flairs.

#### Wanted
Character-specific theming driven by the active persona during gameplay (`data-character="student"`, `data-character="worker"`, `data-character="pwd"`), altering:
1. Outer cabinet bezel, knobs, and bottom panel colors.
2. Bespoke energy and money meter renderings (segmented blocks vs continuous fluid gauges).
3. Optional character-specific commuter flair (e.g. School Pass, Corporate RFID, Priority ID).
4. Reverting cleanly to neutral default styling upon game restart or returning to title/select.

#### Acceptance Criteria
- [x] #1 Selecting a character dynamically binds their theme to the active stage UI.
- [x] #2 Character theme scaffolding and overrides defined in `stage.css` and `src/theme.ts`.
- [x] #3 Continuous vs segmented meter mode support added to `stage.css`.
- [x] #4 Commuter badge slot wired into the stage HUD and theme contract.
- [x] #5 Returning to Title or Character Select clears character-specific styles back to the default theme.
- [x] #6 `npx -p typescript tsc` compiles cleanly with zero errors.

#### Outcome
Implemented theme binding infrastructure in [`src/theme.ts`](file:///C:/GitBash/Automation/socsci1-game/src/theme.ts), [`src/ui-stage.ts`](file:///C:/GitBash/Automation/socsci1-game/src/ui-stage.ts), and [`stage.css`](file:///C:/GitBash/Automation/socsci1-game/stage.css). Characters dynamically bind dataset attributes on the stage and body, supporting character palettes, continuous energy gauges, and commuter badges, while safely preserving existing baseline visuals until the team finalizes their art.

---

### [#001] Establish design system, core tokens, and default theme template
- **Status**: `Closed` | **Priority**: `P2` | **Labels**: `UI`, `Design`, `Theming`
- **Created**: 2026-11-03
- **Resolved**: 2026-11-03

#### Why
The stage UI currently relies on sampled wireframe colors hardcoded directly into `stage.css` without formal design tokens, component specifications, or a theme contract. Adding new character identities or modifying layouts requires ad-hoc CSS tweaks and carries high regression risk. Establishing a baseline design system with a clean default template will standardize UI components and provide an easy "copy-and-customize" blueprint for any present or future character.

#### Wanted
1. A documented set of core design tokens (spatial `--px` unit, neutral console frame, base color palette, typography hierarchy, and standard drop-shadows).
2. Standardized component blueprints (action buttons, option pills, speech bubbles, popups, and HUD slots).
3. A `DEFAULT_THEME` contract and template (in TypeScript and CSS) specifying fallback layouts and meter rendering modes that any character theme can inherit from.

#### Acceptance Criteria
- [x] #1 Core design tokens (spatial unit, base palettes, typography, shadows) are formally defined and documented in `docs/DESIGN_SYSTEM.md`.
- [x] #2 Standard component blueprints (buttons, pills, dialogs, dashboard slots) are specified in `docs/DESIGN_SYSTEM.md`.
- [x] #3 A `DEFAULT_THEME` template is created in code/CSS with clear extension points for character overrides (`src/theme.ts`).
- [x] #4 `npx -p typescript tsc` compiles cleanly with zero errors.

#### Outcome
Authored [`docs/DESIGN_SYSTEM.md`](file:///C:/GitBash/Automation/socsci1-game/docs/DESIGN_SYSTEM.md) detailing the complete design tokens, component kit, and character theme contract. Implemented TypeScript theme models and default theme templates in [`src/theme.ts`](file:///C:/GitBash/Automation/socsci1-game/src/theme.ts), compiling cleanly to `js/theme.js`.

---

## 🧊 Icebox (Not Doing / Rejected)

---

## 🔎 Findings Register

### Known Gaps Accepted Deliberately

- **Panel text (5 shadowless pairs) — accepted by the owner 2026-11-21 (#013):** `.card-0` Student (`--color-text-inverse` on `--color-surface-panel`, `3.14:1` vs `4.5:1`), `.card-1` Worker (`--color-text-inverse` on `--color-card-worker`, `2.48:1` vs `4.5:1`), `.card-2` PWD (`--color-text-inverse` on `--color-console-knob`, `3.00:1` vs `4.5:1`), `.option-pill` label (`--color-text-inverse` on `--color-surface-panel`, `3.14:1` vs `4.5:1`), and `.unreleased-badge` text (`--color-text-inverse` on `--color-surface-panel`, `3.14:1` vs `4.5:1`). Kept without outlines to preserve the pill/card surface look; already-shadowed panel text (`.stat-label`, `.commuter-badge`, `.panel-btn`, `.ending-btn`) received navy outlines.
- **Meter bars & borders (5 pairs) — accepted by the owner 2026-11-21 (#013):** `.money-bar` border (`--color-stat-money-edge` on `--color-surface-panel`, `1.04:1` vs `3.0:1`), `.money-fill` (`--color-stat-money` on `--color-fill-meter-track` over `--color-surface-panel`, `2.14:1` vs `3.0:1`), `.energy-seg` border (`--color-stat-energy-edge` on `--color-surface-panel`, `1.53:1` vs `3.0:1`), `.energy-seg` fill (`--color-stat-energy` on `--color-fill-meter-track` over `--color-surface-panel`, `2.26:1` vs `3.0:1`), and continuous `.energy-bar` outer border (`--color-stat-energy-edge` on `--color-surface-panel`, `1.53:1` vs `3.0:1`). Kept unchanged to preserve meter colours alongside numeric readouts (`.money-value`, `.energy-value`), which use `-deep` edge outlines at `4.50:1` and `4.55:1`.
- **Disabled transit options (2 pairs) — WCAG disabled-control exempt (#013):** `.option:disabled .option-pill` text (`--color-text-disabled` on `--color-surface-disabled`, `2.60:1` vs `4.5:1`) and `.option:disabled .option-line` on sky (`--color-text-disabled` on `--color-scene-sky-bottom`, `4.22:1` vs `4.5:1`). Exempt under WCAG 2.2 SC 1.4.3 (inactive UI components) and accepted by the owner 2026-11-21.
