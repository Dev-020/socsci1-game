// Stage screens: the console frame, scene, bottom panel and the screens inside.
// All game rules live in game.ts. Fixed elements are built once and updated,
// so CSS transitions can run.

import { CHARACTERS, TOTAL_DISTANCE_KM, VERSION } from "./data.js";
import type { Character, ConditionOption } from "./data.js";
import { Game } from "./game.js";
import type { Offer, PickedCondition, TurnReport } from "./game.js";
import { categoryName, conditionEffects, eventEffects, fillWork, seedFromLink, entropySeed } from "./format.js";
import { getCharacterTheme } from "./theme.js";

type Screen = "title" | "select" | "conditions" | "turn" | "moving" | "result" | "ending";

const ENERGY_SEGMENTS = 10;
const SPEECH = "saan kaya ako sasakay..?";

// If the vehicle's animationend never fires, move on after this long.
const MOVE_TIMEOUT_MS = 2000; // motion.timeout.move
const SWIPE_SETTLE_MS = 120; // motion.delay.swipe-settle

const EVENT_ART: Record<string, string> = {
  "Traffic Congestion": "event-traffic",
  "Station Queue": "event-queue",
  "Road Obstruction / Flood": "event-flood",
  "Track Fault / Station Power Outage": "event-track-fault",
  "Clear Traffic Flow": "event-clear-traffic",
  "Fare Surcharge": "event-surcharge",
};

const ENDINGS = {
  WIN: { title: "destination reached", text: "you have reached your destination.", css: "win" },
  BURNOUT: { title: "burnout", text: "energy depleted. you are too tired to continue.", css: "lose" },
  STRANDED: { title: "stranded", text: "not enough energy and money to reach the destination.", css: "lose" },
};

// Phones held upright get the swipe row of options.
function portraitPhoneQuery(): string {
  const bp = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint-stage-portrait").trim();
  return `(orientation: portrait) and (max-width: ${bp})`;
}

// ---------- small helpers ----------

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className = "",
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Points an image box at a picture. If the file is missing, the box keeps
// showing its label instead.
function setImage(box: HTMLElement, src: string, label: string): void {
  box.classList.remove("loaded");
  box.querySelector("img")?.remove();
  const text = box.querySelector(".imgbox-label");
  if (text) text.textContent = label;

  const img = document.createElement("img");
  img.alt = label;
  img.addEventListener("load", () => box.classList.add("loaded"));
  img.addEventListener("error", () => img.remove());
  img.src = src;
  box.append(img);
}

// A box that shows the picture at src, or a labelled placeholder until the
// file exists.
function placeholderImage(src: string, label: string): HTMLElement {
  const box = el("div", "imgbox");
  box.append(el("span", "imgbox-label"));
  setImage(box, src, label);
  return box;
}

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function displayName(character: Character): string {
  return character.name === "PWD" ? "PWD student" : character.name.toLowerCase();
}

function characterArt(character: Character): string {
  return `assets/characters/character-${slug(character.name)}.png`;
}

// Every starting condition, weather included: assets/conditions/<category>/cond-<category>-<option>.png.
function conditionArt(categoryKey: string, option: ConditionOption): string {
  return `assets/conditions/${categoryKey}/cond-${categoryKey}-${option.key}.png`;
}

// "Motion Sickness" -> "MS": a short placeholder label for the small icons.
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

// A time token such as "0.9s" or "120ms", in milliseconds.
function cssTimeMs(token: string): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  return value.endsWith("ms") ? parseFloat(value) : parseFloat(value) * 1000;
}

// A plain number token, such as a rate.
function cssNumber(token: string): number {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(token));
}

// A scroll area that overflows can be reached with Tab so the keyboard can
// scroll it; one that fits adds no Tab stop. Checks every visible area in root.
function syncScrollFocus(root: ParentNode): void {
  for (const box of root.querySelectorAll<HTMLElement>(".stage-scroll")) {
    if (box.offsetParent !== null && box.scrollHeight > box.clientHeight) box.tabIndex = 0;
    else box.removeAttribute("tabindex");
  }
}

// One condition reel while it spins: its strip, how many icons it cycles
// through, the icon it must land on, when it starts to stop and how fast it goes.
interface Reel {
  card: HTMLElement;
  strip: HTMLElement;
  faces: number;
  target: number;
  stopAt: number; // ms after the rolling starts
  speed: number; // icons per ms at full speed
}

// 18, 18.5 and so on, without a trailing .0
function plainNumber(value: number, decimals = 1): string {
  return String(+value.toFixed(decimals));
}

// ---------- the stage ----------

export function startStageUi(app: HTMLElement): void {
  let screen: Screen = "title";
  let game: Game | null = null;
  let startMoney = 1;
  let chosen: Offer | null = null;
  let lastTurn: TurnReport | null = null;
  let moveTimer = 0;
  let revealTimer = 0;
  let reelFrame = 0;
  let reels: Reel[] = [];
  let lifeFor: Game | null = null; // the game the life icons were built for
  let pinnedTip: HTMLElement | null = null; // the life icon whose tooltip was opened by a click or tap

  const stage = el("div", "stage");
  app.replaceChildren(stage);

  // Frame, knobs and scene stay on every screen.
  const sceneBox = placeholderImage("assets/scenes/scene-normal.png", "scene");
  const scene = el("div", "abs scene");
  scene.append(sceneBox);
  const vehicle = el("div", "vehicle");
  const vehicleArt = placeholderImage("assets/transport/transport-walk.png", "vehicle");
  vehicle.append(vehicleArt);
  scene.append(vehicle);
  stage.append(el("div", "abs frame"), el("div", "abs knob knob-left"), el("div", "abs knob knob-right"), scene);

  const footnote = el("div", "abs footnote");

  // ----- title -----
  const titleLayer = el("div", "layer layer-title");
  const startButton = el("button", "abs menu-btn pixel-text", "start");
  startButton.dataset.start = "";
  titleLayer.append(
    el("h1", "abs pixel-text game-title", "commuter game"),
    el("p", "abs tagline", `travel ${TOTAL_DISTANCE_KM} km without running out of energy or money`),
    startButton,
  );

  // ----- select -----
  const selectLayer = el("div", "layer layer-select");
  selectLayer.append(el("h2", "abs pixel-text select-heading", "select character!"));
  CHARACTERS.forEach((character, index) => {
    const card = el("button", `abs character-card card-${index}`);
    card.dataset.character = String(index);
    const art = placeholderImage(characterArt(character), `character: ${slug(character.name)}`);
    art.classList.add("card-art");
    card.append(
      el("span", "card-name", displayName(character)),
      art,
      el("span", "card-stat", `money: ${character.money}`),
      el("span", "card-stat", `energy: ${character.maxEnergy}`),
    );
    selectLayer.append(card);
  });

  // ----- conditions -----
  const conditionsLayer = el("div", "layer layer-conditions");
  const beginButton = el("button", "abs panel-btn begin-btn", "start >>");
  beginButton.dataset.begin = "";
  const conditionRow = el("div", "abs cond-row");
  conditionsLayer.append(el("h2", "abs pixel-text select-heading", "today's conditions!"), beginButton, conditionRow);

  // ----- turn -----
  const turnLayer = el("div", "layer layer-turn");

  const distanceLabel = el("div", "abs distance-label");
  const flagNow = el("div", "abs flag flag-now");
  turnLayer.append(
    distanceLabel,
    el("div", "abs distance-track"),
    el("div", "abs flag flag-end"),
    flagNow,
  );

  const weatherBox = el("div", "abs weather-box");
  const weatherArt = placeholderImage("assets/conditions/weather/cond-weather-normal.png", "weather");
  weatherBox.append(weatherArt);

  const options = el("div", "abs options");
  const resultMove = el("div", "abs result-box result-move");
  const resultEvent = el("div", "abs result-box result-event");
  const speech = el("div", "abs speech", SPEECH);

  const panel = el("div", "abs panel");
  const portrait = el("div", "abs portrait");
  const portraitArt = placeholderImage("assets/characters/character-student.png", "character");
  portrait.append(portraitArt);

  const playerName = el("h2", "abs player-name");
  const commuterBadge = el("span", "abs commuter-badge");
  const moneyFill = el("div", "money-fill");
  const moneyBar = el("div", "abs money-bar");
  moneyBar.append(moneyFill);
  const moneyValue = el("div", "abs stat-value money-value");

  const energyBar = el("div", "abs energy-bar");
  const energyFills: HTMLElement[] = [];
  for (let i = 0; i < ENERGY_SEGMENTS; i++) {
    const seg = el("div", "energy-seg");
    const fill = el("div");
    seg.append(fill);
    energyBar.append(seg);
    energyFills.push(fill);
  }
  const energyValue = el("div", "abs stat-value energy-value");

  // The third panel row: one icon per starting condition except weather, which has its own box.
  const lifeRow = el("div", "abs life-row");
  const conditionTip = el("div", "abs cond-tip");
  conditionTip.id = "cond-tip";
  conditionTip.setAttribute("role", "tooltip");
  conditionTip.hidden = true;

  const continueButton = el("button", "abs panel-btn continue-btn", "continue >>");
  continueButton.dataset.continue = "";
  const returnButton = el("button", "abs panel-btn return-btn", "<< return");
  returnButton.dataset.return = "";

  turnLayer.append(
    weatherBox,
    options,
    resultMove,
    resultEvent,
    panel,
    speech,
    portrait,
    playerName,
    commuterBadge,
    el("div", "abs stat-label money-label", "money"),
    moneyBar,
    moneyValue,
    el("div", "abs stat-label energy-label", "energy"),
    energyBar,
    energyValue,
    el("div", "abs stat-label life-label", "life"),
    lifeRow,
    conditionTip,
    continueButton,
    returnButton,
  );

  // ----- ending -----
  const endingLayer = el("div", "layer layer-ending");
  const endingBox = el("div", "abs ending-box");
  const endingTitle = el("h2", "ending-title");
  const endingText = el("p", "ending-text");
  const endingStats = el("div", "ending-stats stage-scroll");
  const againButton = el("button", "ending-btn", "play again");
  againButton.dataset.restart = "";
  endingBox.append(endingTitle, endingText, endingStats, againButton);
  endingLayer.append(el("div", "abs ending-scrim"), endingBox);

  stage.append(titleLayer, selectLayer, conditionsLayer, turnLayer, endingLayer, footnote);

  // ----- updating what is on screen -----

  function showBars(current: Game): void {
    const { player, distanceLeft } = current;
    moneyFill.style.width = `${Math.max(0, Math.min(1, player.money / startMoney)) * 100}%`;
    moneyValue.textContent = String(player.money);

    const filled = (player.energy / player.maxEnergy) * ENERGY_SEGMENTS;
    energyFills.forEach((fill, i) => {
      fill.style.width = `${Math.max(0, Math.min(1, filled - i)) * 100}%`;
    });
    energyValue.textContent = String(player.energy);

    const traveled = (TOTAL_DISTANCE_KM - distanceLeft) / TOTAL_DISTANCE_KM;
    flagNow.style.left = `calc((266 + ${traveled} * 545) * var(--px))`;
    distanceLabel.textContent = `distance left: ${plainNumber(distanceLeft)} km`;
  }

  // A line of stats: the full words, and a short form for the phone row.
  function statLine(cls: string, full: string, short: string): HTMLElement {
    const line = el("span", `option-line ${cls}`);
    line.append(el("span", "full", full), el("span", "short", short));
    return line;
  }

  function offerButton(offer: Offer, index: number, copy: boolean): HTMLButtonElement {
    const { option, km, cost, drain, affordable, usesLeft } = offer;
    const button = el("button", "option");
    button.dataset.offer = String(index);
    button.disabled = !affordable;
    if (copy) {
      // The extra copies are only for looping, so keyboards and readers skip them.
      button.setAttribute("aria-hidden", "true");
      button.tabIndex = -1;
    }

    const pill = el("span", "option-pill", option.key);
    if (usesLeft !== null) pill.dataset.uses = `${usesLeft}/${option.maxUses}`;
    const pesos = plainNumber(cost, 2);
    const stats = el("span", "option-stats");
    stats.append(
      statLine("option-pesos", `- ${pesos} pesos`, `${pesos}p`),
      statLine("option-energy", `- ${drain} energy`, `${drain}e`),
      statLine("option-km", `- ${plainNumber(km)} km`, `${plainNumber(km)}km`),
    );
    button.append(pill, stats);
    if (usesLeft !== null) button.append(el("span", "option-line option-uses", `${usesLeft}/${option.maxUses} left`));
    return button;
  }

  // ----- the looping swipe row (phones held upright) -----
  // Three identical groups of cards: before, main and after. After a swipe
  // settles in before or after, the row jumps one group's width to the same
  // picture in main, so it can be swiped forever in either direction.

  const portraitQuery = window.matchMedia(portraitPhoneQuery());
  let touching = false;
  let touchMoved = false;
  let touchStart = { x: 0, y: 0 };
  let settling = false;
  let settleTimer = 0;

  function looping(): boolean {
    return options.classList.contains("loop") && portraitQuery.matches;
  }

  // Measured each time, because turning the phone changes it.
  function groupWidth(): number {
    const first = options.querySelector(".opt-before .option") as HTMLElement | null;
    const second = options.querySelector(".opt-main .option") as HTMLElement | null;
    return first && second ? second.offsetLeft - first.offsetLeft : 0;
  }

  function resetLoop(): void {
    if (looping()) options.scrollLeft = groupWidth();
    settling = false;
  }

  function settle(): void {
    window.clearTimeout(settleTimer);
    if (touching) return; // never move the row during a swipe
    if (looping()) {
      const width = groupWidth();
      const x = options.scrollLeft;
      if (width > 0 && x < width - 1) options.scrollLeft = x + width;
      else if (width > 0 && x >= 2 * width - 1) options.scrollLeft = x - width;
    }
    settling = false;
  }

  function settleSoon(): void {
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(settle, SWIPE_SETTLE_MS);
  }

  options.addEventListener("scroll", () => {
    if (!looping()) return;
    settling = true;
    settleSoon();
  });
  options.addEventListener("scrollend", settle);
  options.addEventListener(
    "touchstart",
    (touchEvent) => {
      touching = true;
      touchMoved = false;
      touchStart = { x: touchEvent.touches[0].clientX, y: touchEvent.touches[0].clientY };
    },
    { passive: true },
  );
  options.addEventListener(
    "touchmove",
    (touchEvent) => {
      const t = touchEvent.touches[0];
      if (Math.abs(t.clientX - touchStart.x) > 10 || Math.abs(t.clientY - touchStart.y) > 10) touchMoved = true;
    },
    { passive: true },
  );
  const touchEnded = (): void => {
    touching = false;
    if (looping()) settleSoon();
  };
  options.addEventListener("touchend", touchEnded);
  options.addEventListener("touchcancel", touchEnded);

  // Turning the phone changes every width, so start again from main, and
  // check again which scroll areas overflow.
  portraitQuery.addEventListener("change", () => {
    window.requestAnimationFrame(() => {
      resetLoop();
      for (const card of conditionRow.querySelectorAll(".cond-card.stopped")) syncScrollFocus(card);
      syncScrollFocus(endingBox);
    });
  });

  function fillOptions(current: Game): void {
    const count = current.offers.length;
    const loop = count >= 3; // with 1 or 2 cards both fit, so no scrolling
    options.classList.toggle("loop", loop);
    const names = loop ? ["before", "main", "after"] : ["main"];
    options.replaceChildren(
      ...names.map((name) => {
        const group = el("div", `opt-group opt-${name}`);
        group.append(...current.offers.map((offer, i) => offerButton(offer, i, name !== "main")));
        return group;
      }),
    );
    options.scrollLeft = 0;
    resetLoop();
  }

  // ----- the conditions screen and its reveal -----
  // Each card's icon window holds a strip of its category's icons. The cards
  // hold still, then all start rolling together, then stop one by one from the
  // left, each landing on its rolled option. The game has already picked the
  // conditions; the spin is only for show.

  function conditionCard(picked: PickedCondition, character: Character): HTMLElement {
    const { category, option } = picked;
    const card = el("div", "cond-card");

    // The options, then the first one again, so the strip can wrap around without a jump.
    const faces = [...category.options, category.options[0]];
    const strip = el("div", "cond-strip");
    strip.style.setProperty("--reel-faces", String(faces.length));
    for (const face of faces) {
      const art = placeholderImage(conditionArt(category.key, face), face.name.toLowerCase());
      art.classList.add("cond-face");
      strip.append(art);
    }
    const reel = el("div", "cond-reel");
    reel.append(strip);

    // The text scrolls inside the card when it is too long to fit.
    const body = el("div", "cond-body stage-scroll");
    body.append(
      el("span", "cond-name", option.name.toLowerCase()),
      el("p", "cond-desc", fillWork(option.description, character)),
      el("p", "cond-effects", conditionEffects(option)),
    );

    card.append(el("span", "cond-category", categoryName(category, character).toLowerCase()), reel, body);
    return card;
  }

  // Moves a strip so `position` icons have rolled past (wrapping around).
  function placeStrip(reel: Reel, position: number): void {
    const shown = ((position % reel.faces) + reel.faces) % reel.faces;
    reel.strip.style.transform = `translateY(${(-shown / (reel.faces + 1)) * 100}%)`;
  }

  function stopReel(reel: Reel): void {
    if (reel.card.classList.contains("stopped")) return;
    placeStrip(reel, reel.target);
    reel.card.classList.add("stopped");
    syncScrollFocus(reel.card); // a long text scrolls, so let the keyboard reach it
    if (reels.every((r) => r.card.classList.contains("stopped"))) {
      window.clearTimeout(revealTimer);
      window.cancelAnimationFrame(reelFrame);
      conditionsLayer.classList.add("revealed");
    }
  }

  function revealAll(): void {
    reels.forEach(stopReel);
  }

  function showConditions(current: Game): void {
    window.clearTimeout(revealTimer);
    window.cancelAnimationFrame(reelFrame);
    conditionsLayer.classList.remove("revealed");
    const cards = current.conditions.map((picked) => conditionCard(picked, current.player));
    conditionRow.replaceChildren(...cards);
    conditionRow.scrollLeft = 0;
    footnote.textContent = `seed: ${current.seed}`;

    const hold = cssTimeMs("--motion-delay-reel-hold");
    const spinUp = cssTimeMs("--motion-duration-reel-spin-up");
    const spin = Math.max(spinUp, cssTimeMs("--motion-duration-reel-spin"));
    const slowDown = cssTimeMs("--motion-duration-reel-stop");
    const stagger = cssTimeMs("--motion-delay-reel-stagger");
    const rate = cssNumber("--motion-rate-reel") / 1000; // icons per ms

    reels = current.conditions.map(({ category, option }, i) => {
      const faces = category.options.length;
      const target = category.options.findIndex((o) => o.key === option.key);
      const stopAt = spin + i * stagger;
      // Distance rolled at speed v: v × (spin-up / 2 + cruising + slow-down / 2).
      // Round it up to land on the target, then set the speed to match.
      const time = stopAt - spinUp / 2 + slowDown / 2;
      const nominal = rate * time;
      const distance = target + faces * Math.ceil((nominal - target) / faces);
      const reel: Reel = { card: cards[i], strip: cards[i].querySelector<HTMLElement>(".cond-strip")!, faces, target, stopAt, speed: distance / time };
      placeStrip(reel, 0);
      return reel;
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return;
    }

    // Icons rolled after t ms of rolling: speeds up evenly, cruises, then slows evenly to a stop.
    const rolled = (reel: Reel, t: number): number => {
      const v = reel.speed;
      if (t <= 0) return 0;
      if (t < spinUp) return (v * t * t) / (2 * spinUp);
      if (t < reel.stopAt) return v * (spinUp / 2 + t - spinUp);
      const u = Math.min(t - reel.stopAt, slowDown);
      return v * (spinUp / 2 + reel.stopAt - spinUp + u - (u * u) / (2 * slowDown));
    };

    const started = performance.now() + hold;
    const frame = (now: number): void => {
      const t = now - started;
      for (const reel of reels) {
        if (reel.card.classList.contains("stopped")) continue;
        if (t >= reel.stopAt + slowDown) stopReel(reel);
        else placeStrip(reel, rolled(reel, t));
      }
      if (!conditionsLayer.classList.contains("revealed")) reelFrame = window.requestAnimationFrame(frame);
    };
    reelFrame = window.requestAnimationFrame(frame);

    // If frames stop coming (a hidden tab, say), show everything anyway.
    const total = hold + spin + stagger * (reels.length - 1) + slowDown;
    revealTimer = window.setTimeout(revealAll, total + 500);
  }

  // ----- the life row and its tooltip -----

  function fillLife(current: Game): void {
    lifeFor = current;
    hideTip();
    lifeRow.replaceChildren(
      ...current.conditions.slice(1).map((picked, i) => {
        const button = el("button", "life-icon");
        button.dataset.life = String(i + 1);
        button.setAttribute("aria-label", `${categoryName(picked.category, current.player)}: ${picked.option.name}`);
        button.setAttribute("aria-describedby", "cond-tip");
        button.append(placeholderImage(conditionArt(picked.category.key, picked.option), initials(picked.option.name)));
        return button;
      }),
    );
  }

  function showTip(button: HTMLElement): void {
    if (!game || (screen !== "turn" && screen !== "result")) return;
    const { category, option } = game.conditions[Number(button.dataset.life)];
    conditionTip.replaceChildren(
      el("h3", "cond-tip-title", `${categoryName(category, game.player).toLowerCase()}: ${option.name.toLowerCase()}`),
      el("p", "cond-tip-desc", fillWork(option.description, game.player)),
      el("p", "cond-tip-effects", conditionEffects(option)),
    );
    conditionTip.hidden = false;
  }

  function hideTip(): void {
    pinnedTip = null;
    conditionTip.hidden = true;
  }

  const lifeIconOf = (target: EventTarget | null): HTMLElement | null =>
    target instanceof Element ? (target.closest(".life-icon") as HTMLElement | null) : null;

  lifeRow.addEventListener("pointerover", (pointerEvent) => {
    const icon = lifeIconOf(pointerEvent.target);
    if (icon && !pinnedTip) showTip(icon);
  });
  lifeRow.addEventListener("pointerout", (pointerEvent) => {
    if (!pinnedTip && !lifeIconOf(pointerEvent.relatedTarget)) conditionTip.hidden = true;
  });
  lifeRow.addEventListener("focusin", (focusEvent) => {
    const icon = lifeIconOf(focusEvent.target);
    if (!icon) return;
    // Tabbing to another icon moves a pinned tooltip with the focus.
    if (pinnedTip && pinnedTip !== icon) pinnedTip = null;
    showTip(icon);
  });
  lifeRow.addEventListener("focusout", () => {
    if (!pinnedTip) conditionTip.hidden = true;
  });
  // A click or tap keeps the tooltip open; a second one on the same icon closes it.
  lifeRow.addEventListener("click", (clickEvent) => {
    const icon = lifeIconOf(clickEvent.target);
    if (!icon || (screen !== "turn" && screen !== "result")) return;
    if (pinnedTip === icon) {
      hideTip();
    } else {
      pinnedTip = icon;
      showTip(icon);
    }
  });
  document.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.key === "Escape") hideTip();
  });
  // A click or tap anywhere else, on or off the stage, closes a pinned tooltip.
  document.addEventListener("click", (clickEvent) => {
    if (pinnedTip && !lifeIconOf(clickEvent.target)) hideTip();
  });

  function showTurn(current: Game): void {
    const weather = slug(current.weather.name);
    setImage(sceneBox, `assets/scenes/scene-${weather}.png`, `scene: ${weather}`);
    setImage(weatherArt, conditionArt("weather", current.weather), `weather: ${weather}`);
    setImage(portraitArt, characterArt(current.player), `character: ${slug(current.player.name)}`);
    playerName.textContent = displayName(current.player);
    footnote.textContent = `seed: ${current.seed}`;
    if (lifeFor !== current) fillLife(current);
    showBars(current);
    fillOptions(current);
  }

  // ----- moving, result, ending -----

  function line(text: string): HTMLElement {
    return el("p", "result-line", text);
  }

  function showMoving(): void {
    if (!chosen) return;
    setImage(vehicleArt, `assets/transport/transport-${chosen.option.key}.png`, chosen.option.key);
    window.clearTimeout(moveTimer);
    moveTimer = window.setTimeout(finishMove, MOVE_TIMEOUT_MS);
  }

  function finishMove(): void {
    window.clearTimeout(moveTimer);
    if (screen !== "moving") return;
    screen = "result";
    render();
  }

  function showResult(current: Game): void {
    showBars(current);
    returnButton.hidden = !current.canUndo;

    resultMove.replaceChildren();
    resultEvent.replaceChildren();
    resultEvent.hidden = true;
    resultMove.classList.remove("with-event");
    if (!lastTurn || !chosen) return;

    const { km, cost, drain, event } = lastTurn;
    resultMove.append(
      el("h3", "result-title", chosen.option.key),
      line(`moved ${plainNumber(km)} km`),
      line(`paid ${plainNumber(cost, 2)} pesos`),
      line(`used ${drain} energy`),
    );
    if (event) {
      resultMove.classList.add("with-event");
      resultEvent.hidden = false;
      const art = placeholderImage(`assets/events/${EVENT_ART[event.name] ?? "event"}.png`, EVENT_ART[event.name] ?? "event");
      art.classList.add("event-art");
      const text = el("div", "event-text");
      text.append(el("h3", "result-title", event.name), el("p", "event-desc", event.description), el("p", "event-effects", eventEffects(event)));
      resultEvent.append(art, text);
    }
  }

  function showEnding(current: Game): void {
    const { player, seed, distanceLeft, turn, outcome } = current;
    if (!outcome) return;
    const ending = ENDINGS[outcome];
    endingBox.dataset.result = ending.css;
    endingTitle.textContent = ending.title;
    endingText.textContent = ending.text;
    const rows = [
      `money left: ${player.money}`,
      `energy left: ${player.energy}/${player.maxEnergy}`,
    ];
    if (outcome !== "WIN") rows.push(`distance left: ${plainNumber(distanceLeft)} km`);
    rows.push(`turns: ${turn - 1}`, `seed: ${seed}`);
    rows.push(`conditions: ${current.conditions.map((picked) => picked.option.name.toLowerCase()).join(", ")}`);
    endingStats.replaceChildren(...rows.map(line));
    endingStats.scrollTop = 0;
    syncScrollFocus(endingBox);
    footnote.textContent = `seed: ${seed}`;
  }

  function render(): void {
    stage.dataset.screen = screen;
    if (screen !== "turn" && screen !== "result") hideTip();
    // Nothing behind the ending box can be reached, and the life icons rest while the vehicle moves.
    turnLayer.inert = screen === "ending";
    lifeRow.inert = screen === "moving";
    const metaTheme = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    const syncThemeColor = (): void => {
      if (!metaTheme) return;
      metaTheme.content = getComputedStyle(document.body).getPropertyValue("--color-surface-backdrop").trim();
    };
    if (screen === "title") {
      delete stage.dataset.character;
      delete stage.dataset.energyStyle;
      delete stage.dataset.moneyStyle;
      delete stage.dataset.hasBadge;
      delete document.body.dataset.character;
      syncThemeColor();
      const link = el("a", "", `v${VERSION} · changelog`);
      link.href = "changelog.html";
      footnote.replaceChildren(link);
    } else if (screen === "select") {
      delete stage.dataset.character;
      delete stage.dataset.energyStyle;
      delete stage.dataset.moneyStyle;
      delete stage.dataset.hasBadge;
      delete document.body.dataset.character;
      syncThemeColor();
      footnote.textContent = "";
    } else if (game) {
      const charSlug = slug(game.player.name);
      const theme = getCharacterTheme(charSlug);
      stage.dataset.character = charSlug;
      document.body.dataset.character = charSlug;
      stage.dataset.energyStyle = theme.energyBarStyle;
      stage.dataset.moneyStyle = theme.moneyDisplayStyle;
      if (theme.badgeLabel) {
        commuterBadge.textContent = theme.badgeLabel;
        stage.dataset.hasBadge = "true";
      } else {
        commuterBadge.textContent = "";
        delete stage.dataset.hasBadge;
      }
      syncThemeColor();
      if (screen === "conditions") showConditions(game);
      else if (screen === "turn") showTurn(game);
      else if (screen === "moving") showMoving();
      else if (screen === "result") showResult(game);
      else showEnding(game);
    }
  }

  // ----- clicks -----

  stage.addEventListener("click", (clickEvent) => {
    // A click while the conditions spin skips to the end.
    if (screen === "conditions" && !conditionsLayer.classList.contains("revealed")) {
      revealAll();
      return;
    }
    const button = (clickEvent.target as HTMLElement).closest("button");
    if (!button || screen === "moving") return; // no clicks while the vehicle moves

    const { start, character, begin, offer, restart } = button.dataset;
    if (start !== undefined) {
      screen = "select";
    } else if (character !== undefined) {
      const picked = CHARACTERS[Number(character)];
      const seed = seedFromLink() ?? entropySeed(performance.now());
      game = new Game(picked, seed);
      startMoney = game.player.money; // after the starting conditions
      lastTurn = null;
      chosen = null;
      screen = "conditions";
    } else if (begin !== undefined && game && screen === "conditions") {
      screen = "turn";
    } else if (offer !== undefined && game && screen === "turn") {
      // A swipe, or a row still settling, is not a choice.
      if (looping() && (touchMoved || settling)) return;
      const picked = game.offers[Number(offer)];
      const report = game.choose(picked);
      if (!report) return;
      chosen = picked;
      lastTurn = report;
      screen = "moving";
    } else if (button.dataset.continue !== undefined && game && screen === "result") {
      screen = game.outcome ? "ending" : "turn";
    } else if (button.dataset.return !== undefined && game && screen === "result") {
      if (!game.undo()) return;
      lastTurn = null;
      chosen = null;
      screen = "turn";
    } else if (restart !== undefined) {
      game = null;
      lastTurn = null;
      chosen = null;
      screen = "select";
    } else {
      return;
    }
    render();
  });

  // The vehicle finishing its drive ends the move.
  vehicle.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "drive") finishMove();
  });

  render();
}
