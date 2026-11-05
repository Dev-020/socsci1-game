// Stage screens: the console frame, scene, bottom panel and the screens inside.
// All game rules live in game.ts. Fixed elements are built once and updated,
// so CSS transitions can run.

import { CHARACTERS, TOTAL_DISTANCE_KM, VERSION } from "./data.js";
import type { Character } from "./data.js";
import { Game } from "./game.js";
import type { Offer, TurnReport } from "./game.js";
import { eventEffects, seedFromLink, entropySeed } from "./format.js";
import { getCharacterTheme } from "./theme.js";

type Screen = "title" | "select" | "turn" | "moving" | "result" | "ending";

const ENERGY_SEGMENTS = 10;
const SPEECH = "saan kaya ako sasakay..?";

// If the vehicle's animationend never fires, move on after this long.
const MOVE_TIMEOUT_MS = 2000;

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
const PORTRAIT_PHONE = "(orientation: portrait) and (max-width: 700px)";

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
  return `assets/character-${slug(character.name)}.png`;
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

  const stage = el("div", "stage");
  app.replaceChildren(stage);

  // Frame, knobs and scene stay on every screen.
  const sceneBox = placeholderImage("assets/scene-normal.png", "scene");
  const scene = el("div", "abs scene");
  scene.append(sceneBox);
  const vehicle = el("div", "vehicle");
  const vehicleArt = placeholderImage("assets/transport-walk.png", "vehicle");
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
  const weatherArt = placeholderImage("assets/weather-normal.png", "weather");
  weatherBox.append(weatherArt);

  const options = el("div", "abs options");
  const resultMove = el("div", "abs result-box result-move");
  const resultEvent = el("div", "abs result-box result-event");
  const speech = el("div", "abs speech", SPEECH);

  const panel = el("div", "abs panel");
  const portrait = el("div", "abs portrait");
  const portraitArt = placeholderImage("assets/character-student.png", "character");
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
    continueButton,
    returnButton,
  );

  // ----- ending -----
  const endingLayer = el("div", "layer layer-ending");
  const endingBox = el("div", "abs ending-box");
  const endingTitle = el("h2", "ending-title");
  const endingText = el("p", "ending-text");
  const endingStats = el("div", "ending-stats");
  const againButton = el("button", "ending-btn", "play again");
  againButton.dataset.restart = "";
  endingBox.append(endingTitle, endingText, endingStats, againButton);
  endingLayer.append(el("div", "abs ending-scrim"), endingBox);

  stage.append(titleLayer, selectLayer, turnLayer, endingLayer, footnote);

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

  const portraitQuery = window.matchMedia(PORTRAIT_PHONE);
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
    settleTimer = window.setTimeout(settle, 120);
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

  // Turning the phone changes every width, so start again from main.
  portraitQuery.addEventListener("change", () => {
    window.requestAnimationFrame(resetLoop);
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

  function showTurn(current: Game): void {
    const weather = slug(current.weather.name);
    setImage(sceneBox, `assets/scene-${weather}.png`, `scene: ${weather}`);
    setImage(weatherArt, `assets/weather-${weather}.png`, `weather: ${weather}`);
    setImage(portraitArt, characterArt(current.player), `character: ${slug(current.player.name)}`);
    playerName.textContent = displayName(current.player);
    footnote.textContent = `seed: ${current.seed}`;
    showBars(current);
    fillOptions(current);
  }

  // ----- moving, result, ending -----

  function line(text: string): HTMLElement {
    return el("p", "result-line", text);
  }

  function showMoving(): void {
    if (!chosen) return;
    setImage(vehicleArt, `assets/transport-${chosen.option.key}.png`, chosen.option.key);
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
      const art = placeholderImage(`assets/${EVENT_ART[event.name] ?? "event"}.png`, EVENT_ART[event.name] ?? "event");
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
    endingStats.replaceChildren(...rows.map(line));
    footnote.textContent = `seed: ${seed}`;
  }

  function render(): void {
    stage.dataset.screen = screen;
    const metaTheme = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (screen === "title") {
      delete stage.dataset.character;
      delete stage.dataset.energyStyle;
      delete stage.dataset.moneyStyle;
      delete stage.dataset.hasBadge;
      delete document.body.dataset.character;
      if (metaTheme) metaTheme.content = "#ffb95f";
      const link = el("a", "", `v${VERSION} · changelog`);
      link.href = "changelog.html";
      footnote.replaceChildren(link);
    } else if (screen === "select") {
      delete stage.dataset.character;
      delete stage.dataset.energyStyle;
      delete stage.dataset.moneyStyle;
      delete stage.dataset.hasBadge;
      delete document.body.dataset.character;
      if (metaTheme) metaTheme.content = "#ffb95f";
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
      if (metaTheme && theme.accentPalette.backdrop) {
        metaTheme.content = theme.accentPalette.backdrop;
      }
      if (screen === "turn") showTurn(game);
      else if (screen === "moving") showMoving();
      else if (screen === "result") showResult(game);
      else showEnding(game);
    }
  }

  // ----- clicks -----

  stage.addEventListener("click", (clickEvent) => {
    const button = (clickEvent.target as HTMLElement).closest("button");
    if (!button || screen === "moving") return; // no clicks while the vehicle moves

    const { start, character, offer, restart } = button.dataset;
    if (start !== undefined) {
      screen = "select";
    } else if (character !== undefined) {
      const picked = CHARACTERS[Number(character)];
      const seed = seedFromLink() ?? entropySeed(performance.now());
      game = new Game(picked, seed);
      startMoney = picked.money;
      lastTurn = null;
      chosen = null;
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
