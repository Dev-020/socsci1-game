// Plain screens and click handling. All game rules live in game.ts.

import { CHARACTERS, TOTAL_DISTANCE_KM, VERSION } from "./data.js";
import { Game } from "./game.js";
import type { Offer, TurnReport } from "./game.js";
import { eventEffects, peso, seedFromLink } from "./format.js";

let app: HTMLElement;

let game: Game | null = null;
let lastTurn: TurnReport | null = null;

function bar(label: string, value: string, percent: number): string {
  return `
    <div class="stat">
      <div class="stat-row"><span>${label}</span><span>${value}</span></div>
      <div class="bar"><div style="width: ${percent}%"></div></div>
    </div>`;
}

function reportHtml(): string {
  if (!lastTurn) return "";
  const { optionName, km, cost, drain, event } = lastTurn;
  const move = `
    <div class="report">
      <strong>${optionName}</strong>
      +${km.toFixed(1)} km, -${peso(cost)}, -${drain} energy
    </div>`;
  if (!event) return move;
  return `${move}
    <div class="report">
      <strong>Event: ${event.name}</strong>
      <p>${event.description}</p>
      <span class="muted">${eventEffects(event)}</span>
    </div>`;
}

function renderSelect(): void {
  const buttons = CHARACTERS.map(
    (character, index) => `
      <button data-character="${index}">
        ${character.name}
        <small>
          ${peso(character.money)} · ${character.energy} energy ·
          ${character.discount ? "Discounted fares" : "Regular fares"}
        </small>
      </button>`,
  ).join("");

  app.innerHTML = `
    <h1>Commuter Game</h1>
    <p class="muted">Travel ${TOTAL_DISTANCE_KM} km without running out of energy or money.</p>
    <h2>Select a character</h2>
    ${buttons}
    <p class="muted">v${VERSION}</p>`;
}

function offerButton(offer: Offer, index: number): string {
  const { option, km, cost, drain, affordable, usesLeft } = offer;
  const uses = usesLeft === null ? "" : ` · ${usesLeft}/${option.maxUses} uses left`;
  const price = affordable ? peso(cost) : `${peso(cost)} (can't afford)`;
  return `
    <button data-offer="${index}" ${affordable ? "" : "disabled"}>
      ${option.name}
      <small>+${km.toFixed(1)} km · ${price} · -${drain} energy${uses}</small>
    </button>`;
}

function renderPlay(current: Game): void {
  const { player, seed, weather, distanceLeft, turn, offers } = current;
  const traveled = TOTAL_DISTANCE_KM - distanceLeft;

  app.innerHTML = `
    <h1>${player.name}</h1>
    <p class="muted">Weather: ${weather.name} · Seed: ${seed}</p>
    <p>Money: ${peso(player.money)}</p>
    ${bar("Energy", `${player.energy}/${player.maxEnergy}`, (player.energy / player.maxEnergy) * 100)}
    ${bar("Distance", `${traveled.toFixed(1)}/${TOTAL_DISTANCE_KM.toFixed(1)} km`, (traveled / TOTAL_DISTANCE_KM) * 100)}
    ${reportHtml()}
    <h2>Turn ${turn}: choose your transport</h2>
    ${offers.map(offerButton).join("")}`;
}

function renderOutcome(current: Game): void {
  const { player, seed, distanceLeft, turn, outcome } = current;
  const money = `<p>Remaining money: ${peso(player.money)}</p>`;
  const energy = `<p>Remaining energy: ${player.energy}/${player.maxEnergy}</p>`;
  const distance = `<p>Distance remaining: ${distanceLeft.toFixed(1)} km</p>`;

  let body: string;
  if (outcome === "WIN") {
    body = `
      <h1>Destination reached</h1>
      <p>You have reached your destination.</p>
      ${money}${energy}
      <p>Total turns: ${turn - 1}</p>`;
  } else if (outcome === "BURNOUT") {
    body = `
      <h1>Burnout</h1>
      <p>Energy depleted. You are too tired to continue.</p>
      ${distance}`;
  } else {
    body = `
      <h1>Stranded</h1>
      <p>Not enough energy and money to reach the destination.</p>
      ${money}${energy}${distance}`;
  }

  app.innerHTML = `
    ${body}
    <p class="muted">Seed: ${seed}</p>
    ${reportHtml()}
    <button data-restart class="restart">Play again</button>`;
}

function render(): void {
  if (!game) renderSelect();
  else if (game.outcome) renderOutcome(game);
  else renderPlay(game);
}

export function startPlainUi(root: HTMLElement): void {
  app = root;
  app.addEventListener("click", (clickEvent) => {
    const button = (clickEvent.target as HTMLElement).closest("button");
    if (!button) return;

    const { character, offer, restart } = button.dataset;
    if (character !== undefined) {
      game = new Game(CHARACTERS[Number(character)], seedFromLink());
      lastTurn = null;
    } else if (offer !== undefined && game) {
      lastTurn = game.choose(game.offers[Number(offer)]);
    } else if (restart !== undefined) {
      game = null;
      lastTurn = null;
    }
    render();
  });

  render();
}
