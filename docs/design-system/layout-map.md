# Stage Layout Map

> Generated copy of `stage.css` at `a161d07`, from the audit record; rebuilt when the UI audit re-runs; don't edit by hand.
> Part of the [Commuter Game design system](../DESIGN_SYSTEM.md) (§8). Coordinates are in wireframe pixels (`N * var(--px)`) on the `1920 × 1080` reference canvas.

## 1. Component Placement by Region

### Console Hardware

| Component | Box (`x, y, w × h`) | Counts from | Description | Portrait differs | `stage.css` lines |
|---|---|---|---|---|---|
| `C2` (`frame`) | `187, 120, 1536 × 820` | `stage` | Outer console bezel framing the screen with a 3D bevel shadow. | — | `:89–92` |
| `C3` (`knob`: left, right) | `28` / `1772, 470, 120 × 120` | `stage` | Left and right circular hardware dials flanking the console frame. | — | `:101–103, :133, :137` |
| `C7` (`footnote`) | `0, 985, 100% × auto` | `stage` | Centered footer line below the console frame showing changelog link or seed. | — | `:288` |

### Screen

| Component | Box (`x, y, w × h`) | Counts from | Description | Portrait differs | `stage.css` lines |
|---|---|---|---|---|---|
| `C4` (`scene`) | `222, 155, 1476 × 760` | `stage` | Recessed 16:9-framed viewport holding sky backdrop, scene art, and vehicle. | — | `:144–147` |
| `C5` (`imgbox-label` in `C4`) | `left 20, bottom 20`; turn/moving/result `right 20, bottom 345` | `C4` (`scene`) | Placeholder asset tag tucked in a corner of the scene, lifted clear of the bottom panel during gameplay. | — | `:165–166, :175–176` |
| `C6` (`vehicle`) | `80, 190, 300 × 190` | `C4` (`scene`) | Transit vehicle card driven horizontally across the scene during the moving state. | — | `:772–775` |
| `C9` (`game-title`) | `0, 300, 100% × auto` | `stage` | Full-width centered title heading on the title screen. | — | `:249` |
| `C10` (`tagline`) | `0, 440, 100% × auto` | `stage` | Full-width centered subtitle under the game title. | — | `:260` |
| `C11` (`menu-btn`) | `660, 540, 600 × auto` | `stage` | Centered Start button below the tagline on the title screen. | — | `:268–270` |
| `C13` (`select-heading`) | `280, 235, auto × auto` | `stage` | Upper-left heading prompting character choice on the select screen. | — | `:302–303` |
| `C14` (`character-card`, `.card-0`–`2`, `.card-art`) | `365` / `805` / `1245, 352, 310 × 483`; hover `translateY(-10)`; `.card-art` `254 × 254` | `stage` (`.card-art` in `C14`) | Three evenly spaced commuter selection cards holding a square portrait box and starting stats. | — | `:310–312, :327, :335–336, :346, :352, :358` |
| `C16` (`distance-label`) | `410, 150, auto × auto` | `stage` | Remaining-distance text centered above the distance progress track. | — | `:366–367` |
| `C17` (`distance-track`) | `270, 246, 545 × 20` | `stage` | Horizontal progress bar representing the route from start to destination. | — | `:375–378` |
| `C18` (`flag-end`) | `811, 192, 70 × 74` (pole `w 8`; pennant `8, 2`) | `stage` (parts in `C18`) | Destination flag anchored with its pole centered on the track's right end. | — | `:384–386, :394, :402–403, :410` |
| `C19` (`flag-now`) | `266` (initial; slides `+0..545`), `192, 70 × 74` (pole `w 8`; pennant `8, 2`) | `stage` (parts in `C19`) | Animated commuter progress flag sliding along the distance track. | — | `:384–386, :394, :402–403, :414` |
| `C20` (`weather-box`) | `1480, 182, 185 × 185` | `stage` | Square upper-right frame displaying the current weather artwork. | — | `:422–425` |
| `C21` (`options`) | `240, 280, 1220 × 300` | `stage` | Horizontal container holding up to five transit choice columns on the turn screen. | Becomes horizontal scroll-snap carousel; box unchanged. | `:433–436` |
| `C22` (`option`, `.option-pill`) | `flex 0 0 calc((100% - 64)/5) × 100%`; hover `translateY(-8)`; `.option-pill` `100% × 76` | `C21` (`.option-pill` in `C22`) | Individual transit option column with pill button and stat readout stack. | `flex 0 0 50%` (`610` wide), hover lift disabled, `.option-pill` `h 130`. | `:460, :510, :1035` |

### Bottom Panel

| Component | Box (`x, y, w × h`) | Counts from | Description | Portrait differs | `stage.css` lines |
|---|---|---|---|---|---|
| `C26` (`panel`) | `222, 595, 1476 × 320` | `stage` | Lower HUD dashboard occupying the bottom third of the viewport. | — | `:546–549` |
| `C27` (`portrait`) | `252, 625, 260 × 260` | `stage` | Square active commuter portrait frame on the left side of the bottom panel. | — | `:555–558` |
| `C28` (`player-name`) | `542, 625, auto × auto` | `stage` | Active character name heading aligned with the top of the portrait. | — | `:566–567` |
| `C29` (`commuter-badge`) | `542, 680, auto × auto` | `stage` | Optional pass/discount badge tucked directly beneath the player name. | — | `:578–579` |
| `C30` (`stat-label`: money, energy) | `542, 723` / `785, 165 × auto` | `stage` | Left-aligned money and energy labels flanking their progress bars. | — | `:596–597, :614, :620` |
| `C33` (`money-bar`) | `710, 723, 330 × 53` | `stage` | Horizontal remaining-pesos gauge aligned with the money row. | — | `:614, :639–642` |
| `C31` (`money-value`) | `1070, 723, auto × auto` | `stage` | Numeric money readout to the right of the money bar. | — | `:605, :614` |
| `C34` (`energy-bar`) | `710, 785, 330 × 53` | `stage` | Horizontal stamina gauge (10 segments or continuous) aligned with the energy row. | — | `:620, :655–657` |
| `C32` (`energy-value`) | `1070, 785, auto × auto` | `stage` | Numeric energy readout to the right of the energy bar. | — | `:605, :620` |
| `C35` (`continue-btn`) | `1375, 657, 260 × 96` | `stage` | Upper right-column panel button advancing from the result state. | — | `:690–692, :704` |
| `C36` (`return-btn`) | `1375, 772, 260 × 96` | `stage` | Lower right-column panel button undoing the last turn when allowed. | — | `:691–692, :709–710` |
| `C25` (`speech`) | `1290, 640, 390 × 160` | `stage` | Commuter thought bubble occupying the panel's right slot during the turn state. | — | `:527–530` |

### Overlays

| Component | Box (`x, y, w × h`) | Counts from | Description | Portrait differs | `stage.css` lines |
|---|---|---|---|---|---|
| `C23` (`result-move`, `.with-event`) | `520, 280, 660 × 300`; `.with-event` `240, 280, 350 × 300` | `stage` | Turn movement summary card centered in the scene, shifting left when an event fires. | — | `:791–792, :805–806, :811–812` |
| `C24` (`result-event`, `.event-art`) | `620, 280, 840 × 300`; `.event-art` `160 × 160` | `stage` (`.event-art` in `C24`) | Random event popup paired beside `.result-move.with-event` with a square art slot. | — | `:791–792, :820–821, :854–855` |
| `C38` (`ending-scrim`) | `222, 155, 1476 × 760` | `stage` | Translucent scrim covering the full scene viewport behind the ending modal. | — | `:882–885` |
| `C39` (`ending-box`) | `500, 190, 920 × 690` | `stage` | Centered ending summary modal displaying win/loss title, outcome copy, and stats. | — | `:891–894` |
| `C40` (`ending-btn`) | `auto, flow, 420 × 96` | `C39` (`ending-box`) | Play-again pill button centered in flow at the bottom of the ending modal. | — | `:931–932` |

---

## 2. Shared Boxes & Edges (Layout Tokens)

Every box or edge shared by more than one component uses a `layout.*` token in `base.css` `.stage` (approved 2026-11-19). One-off coordinates remain documented in §1 without tokens.

| Token | Value (`* var(--px)`) | Shared by |
|---|---|---|
| `layout.screen.x` | `222` | `C4` (`scene`), `C38` (`ending-scrim`), `C26` (`panel`) |
| `layout.screen.y` | `155` | `C4` (`scene`), `C38` (`ending-scrim`) |
| `layout.screen.w` | `1476` | `C4` (`scene`), `C38` (`ending-scrim`), `C26` (`panel`) |
| `layout.screen.h` | `760` | `C4` (`scene`), `C38` (`ending-scrim`) |
| `layout.panel-col.x` | `542` | `C28` (`player-name`), `C29` (`commuter-badge`), `C30` (`stat-label`) |
| `layout.panel-row-top.y` | `625` | `C27` (`portrait`), `C28` (`player-name`) |
| `layout.stat-bar.x` | `710` | `C33` (`money-bar`), `C34` (`energy-bar`) |
| `layout.stat-bar.w` | `330` | `C33` (`money-bar`), `C34` (`energy-bar`) |
| `layout.stat-money.y` | `723` | `C30` (`.money-label`), `C33` (`money-bar`), `C31` (`money-value`) |
| `layout.stat-energy.y` | `785` | `C30` (`.energy-label`), `C34` (`energy-bar`), `C32` (`energy-value`) |
| `layout.btn.h` | `96` | `C35`/`C36` (`.panel-btn`), `C40` (`ending-btn`) |
| `layout.turn-content.x` | `240` | `C21` (`options`), `C23` (`.result-move.with-event`) |

*(Note: `260` appears on both `C27` `.portrait` `w × h` and `C35`/`C36` `.panel-btn` `w`; these are unrelated dimensions rather than a shared layout edge, so no shared token is proposed.)*

---

## 3. Near-Misses (Resolved in #013; `U4 = 0`)

All 6 wireframe-pixel near-misses from the `bb9df24` audit were aligned in `a161d07` (`U4 = 0` at `a161d07`):

1. **`continue-btn` vs `return-btn` left edge:** `.return-btn` aligned to `left: calc(1375 * var(--px))` (`stage.css:710`), matching `.panel-btn` (`stage.css:691`).
2. **`money-bar` vs `energy-bar` height:** `.money-bar` aligned to `height: calc(53 * var(--px))` (`stage.css:642`), and `.money-label, .money-value` aligned to `line-height: var(--font-line-height-stage-53)` (`stage.css:622–627`).
3. **`weather-box` aspect ratio:** `.weather-box` aligned to `185 × 185` (`stage.css:424–425`).
4. **`options` vs `result-box` vertical bounds:** `.result-box` aligned to `top: calc(280 * var(--px))` and `height: calc(300 * var(--px))` (`stage.css:791–792`), matching `.options` (`stage.css:437,439`).
5. **`knob` vs `frame` vertical center:** `.knob` aligned to `top: calc(470 * var(--px))` (`stage.css:101`), centering it at `y = 530` with `.frame` (`stage.css:89,91`).
6. **`portrait` left vs top/bottom panel margin:** `.portrait` aligned to `left: calc(252 * var(--px))` (`stage.css:555`), giving a uniform `30 * var(--px)` margin on left, top, and bottom inside `.panel`.
