// Text helpers shared by both screens.

import { SEED_LIMIT, TRANSIT } from "./data.js";
import type { Character, ConditionCategory, ConditionOption, RandomEvent, RideList } from "./data.js";

// A link ending in ?seed=123 plays that seed. Anything else is ignored.
export function seedFromLink(): number | undefined {
  const text = new URLSearchParams(location.search).get("seed");
  const seed = Number(text);
  return text && Number.isInteger(seed) && seed >= 0 && seed < SEED_LIMIT ? seed : undefined;
}

// Makes a seed from 0 to 999,999 from the time of the click, the clock and
// Math.random(). Plain arithmetic only, so the formula can be shown on a slide.
export function entropySeed(time: number = performance.now()): number {
  const elapsedMicros = Math.floor(time * 1000);
  const wallClock = Date.now() % SEED_LIMIT;
  const jitter = Math.floor(Math.random() * SEED_LIMIT);
  return (elapsedMicros * 1009 + wallClock * 9176 + jitter) % SEED_LIMIT;
}

export function peso(amount: number): string {
  return `₱${amount.toFixed(2)}`;
}

export function signedPeso(amount: number): string {
  return `${amount < 0 ? "-" : "+"}${peso(Math.abs(amount))}`;
}

export function signed(amount: number, decimals = 0): string {
  return `${amount > 0 ? "+" : ""}${amount.toFixed(decimals)}`;
}

export function eventEffects(event: RandomEvent): string {
  const effects: string[] = [];
  if (event.energyMod !== 0) effects.push(`${signed(event.energyMod)} energy`);
  if (event.moneyMod !== 0) effects.push(signedPeso(event.moneyMod));
  if (event.distanceMod !== 0) effects.push(`${signed(event.distanceMod, 1)} km progress`);
  if (event.disabledModes.length > 0) {
    const names = event.disabledModes.map((key) => TRANSIT[key].name).join(", ");
    effects.push(`${names} unavailable next turn`);
  }
  return effects.join(", ");
}

// ---------- starting conditions ----------

// The rides that count as vehicles: every ride a run can use except Walk.
const VEHICLES = ["jeep", "train", "tricycle", "car", "motor"];

function ridesText(list: RideList): string {
  const sameAsVehicles = list.length === VEHICLES.length && VEHICLES.every((key) => list.includes(key));
  return sameAsVehicles ? "vehicle ride" : `${list.join(" or ")} ride`;
}

// For example "+₱50.00, +10 max energy, +15% energy per ride, +10 energy per vehicle ride, no jeep".
export function conditionEffects(option: ConditionOption): string {
  const effects: string[] = [];
  const rides = option.appliesTo && option.appliesTo.length > 0 ? ridesText(option.appliesTo) : "ride";
  if (option.money) effects.push(signedPeso(option.money));
  if (option.maxEnergy) effects.push(`${signed(option.maxEnergy)} max energy`);
  if (option.drainPercent) effects.push(`${signed(option.drainPercent)}% energy per ${rides}`);
  if (option.drainFlat) effects.push(`${signed(option.drainFlat)} energy per ${rides}`);
  for (const key of option.removes ?? []) effects.push(`no ${key}`);
  return effects.length > 0 ? effects.join(", ") : "no effect";
}

// Descriptions say "[work]": school for the Student, work for everyone else.
export function fillWork(text: string, character: Character): string {
  return text.replace(/\[work\]/g, character.name === "Student" ? "school" : "work");
}

export function categoryName(category: ConditionCategory, character: Character): string {
  return character.name === "Student" && category.studentName ? category.studentName : category.name;
}
