// Game engine: resource calculations, event rolls, and win/loss conditions.
// Contains no page or display code.

import {
  EVENTS,
  EVENT_PROBABILITY,
  PWD_EXTRA_DRAIN,
  PWD_PENALTY_MODES,
  SEED,
  TOTAL_DISTANCE_KM,
  TRANSIT,
  WEATHER,
} from "./data.js";
import type { Character, RandomEvent, TransitOption, Weather } from "./data.js";

export type Outcome = "WIN" | "BURNOUT" | "STRANDED";

export interface Offer {
  option: TransitOption;
  km: number;
  cost: number;
  drain: number;
  affordable: boolean;
  usesLeft: number | null;
}

export interface TurnReport {
  optionName: string;
  km: number;
  cost: number;
  drain: number;
  event: RandomEvent | null;
}

// What each roll decides. Every turn has one fixed roll per purpose, so a
// player's choices cannot change the rolls that come later.
const Roll = { weather: 1, motorKm: 2, carKm: 3, eventChance: 4, eventPick: 5 };

// Taylor series for sin(x), with a fixed number of terms. Unlike Math.sin,
// it uses only arithmetic that gives the same result in every browser.
function fixedSin(x: number): number {
  x = x % (2 * Math.PI);
  let term = x;
  let sum = x;
  for (let n = 1; n <= 10; n++) {
    term *= -(x * x) / ((2 * n) * (2 * n + 1));
    sum += term;
  }
  return sum;
}

// Returns a number from 0 up to (but not including) 1.
export function seededRoll(seed: number, turn: number, purpose: number): number {
  const x = fixedSin(seed * 12.9898 + turn * 78.233 + purpose * 37.719) * 43758.5453;
  return x - Math.floor(x);
}

function randomSeed(): number {
  return Math.floor(Math.random() * 2000000000);
}

function randomInt(min: number, max: number, roll: number): number {
  return min + Math.floor(roll * (max - min + 1));
}

function pick<T>(items: T[], roll: number): T {
  return items[Math.floor(roll * items.length)];
}

export function fare(option: TransitOption, km: number, discount: boolean): number {
  const distance = Math.min(option.distanceKm, km);

  if (option.key === "motor") {
    // 50 for the 1st km, +10/km up to the 10th km, +20/km beyond the 10th km
    if (distance <= 1) return 50;
    if (distance <= 10) return 50 + (distance - 1) * 10;
    return 140 + (distance - 10) * 20;
  }
  if (option.key === "car") {
    // 60 for the 1st km, +15/km after
    return distance <= 1 ? 60 : 60 + (distance - 1) * 15;
  }
  return discount ? option.costDiscount : option.costRegular;
}

export function energyDrain(option: TransitOption, character: Character, weather: Weather): number {
  const penalty = character.pwdPenalty && PWD_PENALTY_MODES.includes(option.key) ? PWD_EXTRA_DRAIN : 0;
  return Math.trunc((option.energyDrain + penalty) * weather.drainMult);
}

export class Game {
  readonly player: Character;
  readonly seed: number;
  readonly weather: Weather;
  distanceLeft = TOTAL_DISTANCE_KM;
  turn = 1;
  outcome: Outcome | null = null;
  offers: Offer[] = [];

  private usage: Record<string, number> = {};
  private disabled: string[] = [];

  constructor(character: Character, seed: number = SEED ?? randomSeed()) {
    this.player = { ...character };
    this.seed = seed;
    this.weather = pick(WEATHER, this.roll(Roll.weather));
    this.advance();
  }

  // Applies the chosen offer. Returns null if the player cannot afford it.
  choose(offer: Offer): TurnReport | null {
    if (!offer.affordable) return null;

    const { option, km, cost, drain } = offer;
    this.player.money -= cost;
    this.player.energy = Math.max(0, this.player.energy - drain);
    this.distanceLeft = Math.max(0, this.distanceLeft - km);
    this.usage[option.key] = this.usesOf(option) + 1;

    // Last turn's restrictions end here, before a new event can add its own.
    this.disabled = [];
    const event = this.distanceLeft > 0 ? this.rollEvent(option) : null;

    this.turn += 1;
    this.advance();
    return { optionName: option.name, km, cost, drain, event };
  }

  private roll(purpose: number): number {
    return seededRoll(this.seed, this.turn, purpose);
  }

  private advance(): void {
    this.outcome = this.checkOutcome();
    this.offers = this.outcome ? [] : this.buildOffers();
  }

  private usesOf(option: TransitOption): number {
    return this.usage[option.key] ?? 0;
  }

  private availableOptions(): TransitOption[] {
    const candidates = [TRANSIT.walk, TRANSIT.jeep];
    if (this.distanceLeft > 2) candidates.push(TRANSIT.car);
    if (this.distanceLeft > 6) candidates.push(TRANSIT.train);
    if (this.distanceLeft <= 4) candidates.push(TRANSIT.tricycle);
    if (this.weather.name !== "Rainy") candidates.push(TRANSIT.motor);

    const options = candidates.filter(
      (option) =>
        (option.maxUses === null || this.usesOf(option) < option.maxUses) &&
        !this.disabled.includes(option.key),
    );
    return options.length > 0 ? options : [TRANSIT.walk];
  }

  private buildOffers(): Offer[] {
    const kmLeft = Math.max(1, Math.trunc(this.distanceLeft));
    const rolled: Record<string, number> = {
      motor: randomInt(1, kmLeft, this.roll(Roll.motorKm)),
      car: randomInt(1, kmLeft, this.roll(Roll.carKm)),
    };

    return this.availableOptions().map((option) => {
      const km = rolled[option.key] ?? Math.min(option.distanceKm, this.distanceLeft);
      const cost = fare(option, km, this.player.discount);
      return {
        option,
        km,
        cost,
        drain: energyDrain(option, this.player, this.weather),
        affordable: this.player.money >= cost,
        usesLeft: option.maxUses === null ? null : option.maxUses - this.usesOf(option),
      };
    });
  }

  private rollEvent(option: TransitOption): RandomEvent | null {
    if (this.roll(Roll.eventChance) >= EVENT_PROBABILITY) return null;

    const matching = EVENTS.filter(
      (event) => event.applicableModes.length === 0 || event.applicableModes.includes(option.key),
    );
    if (matching.length === 0) return null;

    const event = pick(matching, this.roll(Roll.eventPick));
    const { player } = this;
    player.energy = Math.max(0, Math.min(player.maxEnergy, player.energy + event.energyMod));
    player.money = Math.max(0, player.money + event.moneyMod);
    this.distanceLeft = Math.max(0, this.distanceLeft - event.distanceMod);
    this.disabled.push(...event.disabledModes);
    return event;
  }

  private checkOutcome(): Outcome | null {
    if (this.distanceLeft <= 0) return "WIN";
    if (this.player.energy <= 0) return "BURNOUT";

    // Stranded: cannot afford any ride and cannot walk the rest of the way.
    const walk = TRANSIT.walk;
    const walkLegs = Math.ceil(this.distanceLeft / walk.distanceKm);
    const walkDrainNeeded = (walkLegs - 1) * energyDrain(walk, this.player, this.weather);
    const cheapestFare = Math.min(
      ...this.availableOptions()
        .filter((option) => option.key !== "walk")
        .map((option) => fare(option, 1, this.player.discount)),
    );

    if (this.player.money < cheapestFare && this.player.energy <= walkDrainNeeded) {
      return "STRANDED";
    }
    return null;
  }
}
