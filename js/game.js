// Game engine: resource calculations, event rolls, and win/loss conditions.
// Contains no page or display code.
import { CONDITIONS, EVENTS, EVENT_PROBABILITY, OPTIONS_PER_TURN, PWD_EXTRA_DRAIN, PWD_PENALTY_MODES, SEED, SEED_LIMIT, TOTAL_DISTANCE_KM, TRANSIT, } from "./data.js";
// What each roll decides. Every turn has one fixed roll per purpose, so a
// player's choices cannot change the rolls that come later.
// Purpose 6 is taken by the simulation bots' choices. Purpose 1 picks the
// starting conditions; it was the weather roll before 0.12.0, and weather is
// still the first category, so every seed keeps its weather.
const Roll = { conditions: 1, motorKm: 2, carKm: 3, eventChance: 4, eventPick: 5, offerPick: 7 };
// Taylor series for sin(x), with a fixed number of terms. Unlike Math.sin,
// it uses only arithmetic that gives the same result in every browser.
function fixedSin(x) {
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
export function seededRoll(seed, turn, purpose) {
    const x = fixedSin(seed * 12.9898 + turn * 78.233 + purpose * 41.843) * 43758.5453;
    return x - Math.floor(x);
}
function randomSeed() {
    return Math.floor(Math.random() * SEED_LIMIT);
}
function randomInt(min, max, roll) {
    return min + Math.floor(roll * (max - min + 1));
}
function pick(items, roll) {
    return items[Math.floor(roll * items.length)];
}
// Every set of `size` items, each listed once and in the items' own order.
// Exported so the offer check can confirm the sets.
export function setsOf(items, size) {
    if (size === 0)
        return [[]];
    const sets = [];
    for (let first = 0; first <= items.length - size; first++) {
        for (const rest of setsOf(items.slice(first + 1), size - 1)) {
            sets.push([items[first], ...rest]);
        }
    }
    return sets;
}
// Every combination that takes one item from each list, in the lists' own order.
// Exported so the conditions check can confirm the list.
export function combinations(lists) {
    if (lists.length === 0)
        return [[]];
    const result = [];
    for (const first of lists[0]) {
        for (const rest of combinations(lists.slice(1)))
            result.push([first, ...rest]);
    }
    return result;
}
// True when a ride list covers the ride. An empty or missing list covers every ride.
export function ridesInclude(list, key) {
    return !list || list.length === 0 || list.includes(key);
}
// Every combination of starting conditions, built once: one option per category.
const CONDITION_SETS = combinations(CONDITIONS.map((category) => category.options));
export function fare(option, km, discount) {
    const distance = Math.min(option.distanceKm, km);
    if (option.key === "motor") {
        // 50 for the 1st km, +10/km up to the 10th km, +20/km beyond the 10th km
        if (distance <= 1)
            return 50;
        if (distance <= 10)
            return 50 + (distance - 1) * 10;
        return 140 + (distance - 10) * 20;
    }
    if (option.key === "car") {
        // 60 for the 1st km, +15/km after
        return distance <= 1 ? 60 : 60 + (distance - 1) * 15;
    }
    return discount ? option.costDiscount : option.costRegular;
}
// A ride's energy cost: trunc(base x (1 + the percentages added together)) plus
// every flat change, never below 0. Only the base is multiplied. Percentages are
// whole numbers, so adding them is exact (1.15 + 1.1 in decimals is not).
export function energyDrain(option, character, conditions) {
    let percent = 0;
    let flat = character.pwdPenalty && PWD_PENALTY_MODES.includes(option.key) ? PWD_EXTRA_DRAIN : 0;
    for (const condition of conditions) {
        if (!ridesInclude(condition.appliesTo, option.key))
            continue;
        percent += condition.drainPercent ?? 0;
        flat += condition.drainFlat ?? 0;
    }
    return Math.max(0, Math.trunc((option.energyDrain * (100 + percent)) / 100) + flat);
}
export class Game {
    constructor(character, seed = SEED ?? randomSeed()) {
        this.distanceLeft = TOTAL_DISTANCE_KM;
        this.turn = 1;
        this.outcome = null;
        this.offers = [];
        this.usage = {};
        this.disabled = [];
        this.removed = [];
        this.snapshot = null;
        this.player = { ...character };
        this.seed = seed;
        // One roll picks one combination out of every combination of options.
        const picked = pick(CONDITION_SETS, this.roll(Roll.conditions));
        this.conditions = picked.map((option, index) => ({ category: CONDITIONS[index], option }));
        let money = character.money;
        let maxEnergy = character.maxEnergy;
        for (const option of picked) {
            money += option.money ?? 0;
            maxEnergy += option.maxEnergy ?? 0;
            this.removed.push(...(option.removes ?? []));
        }
        this.player.money = Math.max(0, money);
        this.player.maxEnergy = Math.max(1, maxEnergy);
        this.player.energy = this.player.maxEnergy; // every run starts full
        this.advance();
    }
    // The weather option. Weather is always the first category.
    get weather() {
        return this.conditions[0].option;
    }
    get conditionOptions() {
        return this.conditions.map((picked) => picked.option);
    }
    // True when one choice can be taken back.
    get canUndo() {
        return this.snapshot !== null;
    }
    // Takes back the last choice. Returns false if there is nothing to undo.
    undo() {
        const saved = this.snapshot;
        if (!saved)
            return false;
        this.player.money = saved.money;
        this.player.energy = saved.energy;
        this.distanceLeft = saved.distanceLeft;
        this.turn = saved.turn;
        this.usage = { ...saved.usage };
        this.disabled = [...saved.disabled];
        this.outcome = saved.outcome;
        this.offers = saved.offers;
        this.snapshot = null;
        return true;
    }
    // Applies the chosen offer. Returns null if the player cannot afford it.
    choose(offer) {
        if (!offer.affordable)
            return null;
        this.snapshot = {
            money: this.player.money,
            energy: this.player.energy,
            distanceLeft: this.distanceLeft,
            turn: this.turn,
            usage: { ...this.usage },
            disabled: [...this.disabled],
            outcome: this.outcome,
            offers: this.offers,
        };
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
    roll(purpose) {
        return seededRoll(this.seed, this.turn, purpose);
    }
    advance() {
        this.outcome = this.checkOutcome();
        this.offers = this.outcome ? [] : this.buildOffers(this.offeredOptions());
    }
    usesOf(option) {
        return this.usage[option.key] ?? 0;
    }
    availableOptions() {
        const candidates = [TRANSIT.walk, TRANSIT.jeep];
        if (this.distanceLeft > 2)
            candidates.push(TRANSIT.car);
        if (this.distanceLeft > 6)
            candidates.push(TRANSIT.train);
        if (this.distanceLeft <= 4)
            candidates.push(TRANSIT.tricycle);
        candidates.push(TRANSIT.motor);
        const options = candidates.filter((option) => (option.maxUses === null || this.usesOf(option) < option.maxUses) &&
            !this.disabled.includes(option.key) &&
            !this.removed.includes(option.key));
        return options.length > 0 ? options : [TRANSIT.walk];
    }
    // The rides shown this turn: one set of OPTIONS_PER_TURN, drawn with equal
    // chance from every such set of the available rides. One roll picks the
    // whole set, and each set keeps the rides in their usual order.
    offeredOptions() {
        const pool = this.availableOptions();
        if (pool.length <= OPTIONS_PER_TURN)
            return pool;
        return pick(setsOf(pool, OPTIONS_PER_TURN), this.roll(Roll.offerPick));
    }
    buildOffers(shown) {
        const kmLeft = Math.max(1, Math.trunc(this.distanceLeft));
        const rolled = {
            motor: randomInt(1, kmLeft, this.roll(Roll.motorKm)),
            car: randomInt(1, kmLeft, this.roll(Roll.carKm)),
        };
        const offerFor = (option) => {
            const km = rolled[option.key] ?? Math.min(option.distanceKm, this.distanceLeft);
            const cost = fare(option, km, this.player.discount);
            return {
                option,
                km,
                cost,
                drain: energyDrain(option, this.player, this.conditionOptions),
                affordable: this.player.money >= cost,
                usesLeft: option.maxUses === null ? null : option.maxUses - this.usesOf(option),
            };
        };
        const offers = shown.map(offerFor);
        // Walk is added as a last card only when none of the shown rides can be paid for.
        const noneAffordable = offers.every((offer) => !offer.affordable);
        const walkShown = offers.some((offer) => offer.option.key === "walk");
        if (noneAffordable && !walkShown)
            offers.push(offerFor(TRANSIT.walk));
        return offers;
    }
    rollEvent(option) {
        if (this.roll(Roll.eventChance) >= EVENT_PROBABILITY)
            return null;
        const matching = EVENTS.filter((event) => ridesInclude(event.applicableModes, option.key));
        if (matching.length === 0)
            return null;
        const event = pick(matching, this.roll(Roll.eventPick));
        const { player } = this;
        player.energy = Math.max(0, Math.min(player.maxEnergy, player.energy + event.energyMod));
        player.money = Math.max(0, player.money + event.moneyMod);
        this.distanceLeft = Math.max(0, this.distanceLeft - event.distanceMod);
        this.disabled.push(...event.disabledModes);
        return event;
    }
    checkOutcome() {
        if (this.distanceLeft <= 0)
            return "WIN";
        if (this.player.energy <= 0)
            return "BURNOUT";
        // Stranded: cannot afford any available ride and cannot walk the rest of the way.
        // This checks every available ride, not only the ones shown this turn: the
        // shown rides are drawn again next turn, so a ride you can afford may come up.
        const walk = TRANSIT.walk;
        const walkLegs = Math.ceil(this.distanceLeft / walk.distanceKm);
        const walkDrainNeeded = (walkLegs - 1) * energyDrain(walk, this.player, this.conditionOptions);
        const cheapestFare = Math.min(...this.availableOptions()
            .filter((option) => option.key !== "walk")
            .map((option) => fare(option, 1, this.player.discount)));
        if (this.player.money < cheapestFare && this.player.energy <= walkDrainNeeded) {
            return "STRANDED";
        }
        return null;
    }
}
