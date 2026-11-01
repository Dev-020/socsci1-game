// Text helpers shared by both screens.

import { TRANSIT } from "./data.js";
import type { RandomEvent } from "./data.js";

// A link ending in ?seed=123 plays that seed. Anything else is ignored.
export function seedFromLink(): number | undefined {
  const text = new URLSearchParams(location.search).get("seed");
  const seed = Number(text);
  return text && Number.isInteger(seed) && seed >= 0 ? seed : undefined;
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
