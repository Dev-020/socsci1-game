// Stage screens: the console frame, scene, bottom panel and the screens inside.
// All game rules live in game.ts. Fixed elements are built once and updated,
// so CSS transitions can run.

import { CHARACTERS, TOTAL_DISTANCE_KM, VERSION } from "./data.js";
import type { Character } from "./data.js";
import { Game } from "./game.js";
import type { Offer } from "./game.js";
import { seedFromLink } from "./format.js";

type Screen = "title" | "select" | "turn" | "moving" | "result" | "ending";

const ENERGY_SEGMENTS = 10;
const SPEECH = "saan kaya ako sasakay..?";

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

  const stage = el("div", "stage");
  app.replaceChildren(stage);

  // Frame, knobs and scene stay on every screen.
  const sceneBox = placeholderImage("assets/scene-normal.png", "scene");
  const scene = el("div", "abs scene");
  scene.append(el("div", "cloud cloud-1"), el("div", "cloud cloud-2"));
  const hills = el("div", "hills");
  hills.append(el("div", "hill hill-light"), el("div", "hill hill-left"), el("div", "hill hill-right"));
  scene.append(hills, sceneBox);
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
  const speech = el("div", "abs speech", SPEECH);

  const panel = el("div", "abs panel");
  const portrait = el("div", "abs portrait");
  const portraitArt = placeholderImage("assets/character-student.png", "character");
  portrait.append(portraitArt);

  const playerName = el("h2", "abs player-name");
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
    panel,
    speech,
    portrait,
    playerName,
    el("div", "abs stat-label money-label", "money"),
    moneyBar,
    moneyValue,
    el("div", "abs stat-label energy-label", "energy"),
    energyBar,
    energyValue,
    continueButton,
    returnButton,
  );

  stage.append(titleLayer, selectLayer, turnLayer, footnote);

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

  function offerButton(offer: Offer, index: number): HTMLButtonElement {
    const { option, km, cost, drain, affordable, usesLeft } = offer;
    const button = el("button", "option");
    button.dataset.offer = String(index);
    button.disabled = !affordable;

    const art = placeholderImage(`assets/transport-${option.key}.png`, option.key);
    art.classList.add("option-art");
    button.append(
      art,
      el("span", "option-name", option.name),
      el("span", "option-line", `- ${plainNumber(km)} km`),
      el("span", `option-line${affordable ? "" : " warn"}`, `- ${plainNumber(cost, 2)} pesos`),
      el("span", "option-line", `- ${drain} energy`),
    );
    if (usesLeft !== null) button.append(el("span", "option-line", `${usesLeft}/${option.maxUses} left`));
    return button;
  }

  function showTurn(current: Game): void {
    const weather = slug(current.weather.name);
    setImage(sceneBox, `assets/scene-${weather}.png`, `scene: ${weather}`);
    setImage(weatherArt, `assets/weather-${weather}.png`, `weather: ${weather}`);
    setImage(portraitArt, characterArt(current.player), `character: ${slug(current.player.name)}`);
    playerName.textContent = displayName(current.player);
    footnote.textContent = `seed: ${current.seed}`;
    showBars(current);
    options.replaceChildren(...current.offers.map(offerButton));
    returnButton.hidden = !current.canUndo;
  }

  function render(): void {
    stage.dataset.screen = screen;
    if (screen === "title") {
      footnote.textContent = `v${VERSION}`;
    } else if (screen === "select") {
      footnote.textContent = "";
    } else if (game) {
      showTurn(game);
    }
  }

  // ----- clicks -----

  stage.addEventListener("click", (clickEvent) => {
    const button = (clickEvent.target as HTMLElement).closest("button");
    if (!button) return;

    const { start, character } = button.dataset;
    if (start !== undefined) {
      screen = "select";
    } else if (character !== undefined) {
      const chosen = CHARACTERS[Number(character)];
      game = new Game(chosen, seedFromLink());
      startMoney = chosen.money;
      screen = "turn";
    }
    // Choosing an option, Continue and Return come in the next step.
    render();
  });

  render();
}
