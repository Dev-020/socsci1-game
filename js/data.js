// Game balance values, based on the masterlist and wireframe values.
export const VERSION = "0.4.1";
export const TOTAL_DISTANCE_KM = 20;
export const EVENT_PROBABILITY = 0.35;
export const SEED = null; // null = new random seed each run
export const PWD_EXTRA_DRAIN = 8;
export const PWD_PENALTY_MODES = ["walk", "jeep"];
export const CHARACTERS = [
    { name: "Student", money: 200, maxEnergy: 100, energy: 100, discount: true, pwdPenalty: false },
    { name: "Worker", money: 400, maxEnergy: 50, energy: 50, discount: false, pwdPenalty: false },
    { name: "PWD", money: 200, maxEnergy: 50, energy: 50, discount: true, pwdPenalty: true },
];
export const TRANSIT = {
    jeep: { key: "jeep", name: "Jeepney", distanceKm: 4, energyDrain: 15, costDiscount: 12, costRegular: 14, maxUses: 3 },
    train: { key: "train", name: "Train (LRT/MRT)", distanceKm: 6, energyDrain: 10, costDiscount: 9, costRegular: 19, maxUses: 2 },
    motor: { key: "motor", name: "Motorcycle", distanceKm: Infinity, energyDrain: 5, costDiscount: 140, costRegular: 140, maxUses: null },
    car: { key: "car", name: "Private Car / Ride-Hail", distanceKm: Infinity, energyDrain: 3, costDiscount: 120, costRegular: 120, maxUses: null },
    walk: { key: "walk", name: "Walk", distanceKm: 2, energyDrain: 25, costDiscount: 0, costRegular: 0, maxUses: null },
    tricycle: { key: "tricycle", name: "Tricycle", distanceKm: 2, energyDrain: 10, costDiscount: 16, costRegular: 20, maxUses: 2 },
    bus: { key: "bus", name: "Bus", distanceKm: 6, energyDrain: 12, costDiscount: 15, costRegular: 18, maxUses: 2 },
};
export const WEATHER = [
    { name: "Normal", drainMult: 1.0 },
    { name: "Rainy", drainMult: 1.3 },
    { name: "Sunny", drainMult: 1.1 },
];
export const EVENTS = [
    {
        name: "Traffic Congestion",
        description: "Heavy traffic on the road caused additional delay and fatigue.",
        energyMod: -5,
        moneyMod: 0,
        distanceMod: -1,
        applicableModes: ["jeep", "car", "bus"],
        disabledModes: [],
    },
    {
        name: "Station Queue",
        description: "Long queue at the station ticketing/turnstile.",
        energyMod: -6,
        moneyMod: 0,
        distanceMod: 0,
        applicableModes: ["train"],
        disabledModes: [],
    },
    {
        name: "Road Obstruction / Flood",
        description: "Water or road obstruction slowed down transit. Jeepney and walking routes disrupted.",
        energyMod: -8,
        moneyMod: 0,
        distanceMod: -1,
        applicableModes: ["walk", "jeep"],
        disabledModes: ["jeep"],
    },
    {
        name: "Track Fault / Station Power Outage",
        description: "Technical issue on the rail line. Train transit temporarily halted.",
        energyMod: -5,
        moneyMod: 0,
        distanceMod: 0,
        applicableModes: ["train"],
        disabledModes: ["train"],
    },
    {
        name: "Clear Traffic Flow",
        description: "Unusually clear traffic along this stretch.",
        energyMod: 3,
        moneyMod: 0,
        distanceMod: 1,
        applicableModes: ["motor", "car", "bus"],
        disabledModes: [],
    },
    {
        name: "Fare Surcharge",
        description: "Temporary surge or additional fare adjustment.",
        energyMod: 0,
        moneyMod: -10,
        distanceMod: 0,
        applicableModes: ["car", "motor"],
        disabledModes: [],
    },
];
