// Game engine: resource calculations, event rolls, and win/loss conditions.
// Contains no page or display code.
import { EVENTS, EVENT_PROBABILITY, PWD_EXTRA_DRAIN, PWD_PENALTY_MODES, TOTAL_DISTANCE_KM, TRANSIT, WEATHER, } from "./data.js";
function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
function pick(items) {
    return items[Math.floor(Math.random() * items.length)];
}
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
export function energyDrain(option, character, weather) {
    const penalty = character.pwdPenalty && PWD_PENALTY_MODES.includes(option.key) ? PWD_EXTRA_DRAIN : 0;
    return Math.trunc((option.energyDrain + penalty) * weather.drainMult);
}
export class Game {
    constructor(character) {
        this.weather = pick(WEATHER);
        this.distanceLeft = TOTAL_DISTANCE_KM;
        this.turn = 1;
        this.outcome = null;
        this.offers = [];
        this.usage = {};
        this.disabled = [];
        this.player = { ...character };
        this.advance();
    }
    // Applies the chosen offer. Returns null if the player cannot afford it.
    choose(offer) {
        if (!offer.affordable)
            return null;
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
    advance() {
        this.outcome = this.checkOutcome();
        this.offers = this.outcome ? [] : this.buildOffers();
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
        if (this.weather.name !== "Rainy")
            candidates.push(TRANSIT.motor);
        const options = candidates.filter((option) => (option.maxUses === null || this.usesOf(option) < option.maxUses) &&
            !this.disabled.includes(option.key));
        return options.length > 0 ? options : [TRANSIT.walk];
    }
    buildOffers() {
        const kmLeft = Math.max(1, Math.trunc(this.distanceLeft));
        const rolled = {
            motor: randomInt(1, kmLeft),
            car: randomInt(1, kmLeft),
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
    rollEvent(option) {
        if (Math.random() >= EVENT_PROBABILITY)
            return null;
        const matching = EVENTS.filter((event) => event.applicableModes.length === 0 || event.applicableModes.includes(option.key));
        if (matching.length === 0)
            return null;
        const event = pick(matching);
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
        // Stranded: cannot afford any ride and cannot walk the rest of the way.
        const walk = TRANSIT.walk;
        const walkLegs = Math.ceil(this.distanceLeft / walk.distanceKm);
        const walkDrainNeeded = (walkLegs - 1) * energyDrain(walk, this.player, this.weather);
        const cheapestFare = Math.min(...this.availableOptions()
            .filter((option) => option.key !== "walk")
            .map((option) => fare(option, 1, this.player.discount)));
        if (this.player.money < cheapestFare && this.player.energy <= walkDrainNeeded) {
            return "STRANDED";
        }
        return null;
    }
}
