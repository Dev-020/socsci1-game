// Game balance values, based on the masterlist and wireframe values.

export interface Character {
  name: string;
  money: number;
  maxEnergy: number;
  energy: number;
  discount: boolean; // Student / PWD fares
  pwdPenalty: boolean; // Extra energy drain for mobility barriers
}

export interface TransitOption {
  key: string;
  name: string;
  distanceKm: number; // Infinity = distance is rolled each turn
  energyDrain: number;
  costDiscount: number;
  costRegular: number;
  maxUses: number | null; // null = unlimited
}

// A list of ride keys. An empty list means every ride.
export type RideList = string[];

// One option of a starting condition, such as Rainy or Motion Sickness.
// Every effect is optional; a missing effect changes nothing.
export interface ConditionOption {
  key: string;
  name: string;
  description: string; // "[work]" is shown as "school" or "work" by character
  money?: number; // flat change to starting money
  maxEnergy?: number; // flat change to max energy; every run starts full
  drainPercent?: number; // whole percent added to a ride's base drain: 30 = x1.3, -20 = x0.8
  drainFlat?: number; // added to a ride's drain after the percentage
  appliesTo?: RideList; // the rides drainPercent and drainFlat affect; missing or empty = every ride
  removes?: RideList; // rides that can't be taken for the whole run (never "walk")
}

export interface ConditionCategory {
  key: string;
  name: string;
  studentName?: string; // the category's name when playing the Student
  options: ConditionOption[];
}

export interface RandomEvent {
  name: string;
  description: string;
  energyMod: number;
  moneyMod: number;
  distanceMod: number; // Positive moves the player closer, negative sets them back
  applicableModes: RideList; // The rides this event can follow; empty = every ride
  disabledModes: RideList; // Rides unavailable for the next turn
}

export const VERSION = "0.11.0";
export const TOTAL_DISTANCE_KM = 20;
export const EVENT_PROBABILITY = 0.35;
export const OPTIONS_PER_TURN = 3; // Rides shown each turn, drawn from the ones available
export const SEED_LIMIT = 1000000;
export const SEED: number | null = null; // null = new random seed each run
export const PWD_EXTRA_DRAIN = 8;
export const PWD_PENALTY_MODES = ["walk", "jeep"];

export const CHARACTERS: Character[] = [
  {
    name: "Student",
    money: 200,
    maxEnergy: 100,
    energy: 100,
    discount: true,
    pwdPenalty: false
  },
  {
    name: "Worker",
    money: 400,
    maxEnergy: 50,
    energy: 50,
    discount: false,
    pwdPenalty: false
  },
  {
    name: "PWD",
    money: 200,
    maxEnergy: 50,
    energy: 50,
    discount: true,
    pwdPenalty: true
  }
];

export const TRANSIT: Record<string, TransitOption> = {
  jeep: {
    key: "jeep",
    name: "Jeepney",
    distanceKm: 4,
    energyDrain: 15,
    costDiscount: 12,
    costRegular: 14,
    maxUses: 3
  },
  train: {
    key: "train",
    name: "Train (LRT/MRT)",
    distanceKm: 6,
    energyDrain: 10,
    costDiscount: 9,
    costRegular: 19,
    maxUses: 2
  },
  motor: {
    key: "motor",
    name: "Motorcycle",
    distanceKm: Infinity,
    energyDrain: 5,
    costDiscount: 140,
    costRegular: 140,
    maxUses: null
  },
  car: {
    key: "car",
    name: "Private Car / Ride-Hail",
    distanceKm: Infinity,
    energyDrain: 3,
    costDiscount: 120,
    costRegular: 120,
    maxUses: null
  },
  walk: {
    key: "walk",
    name: "Walk",
    distanceKm: 2,
    energyDrain: 25,
    costDiscount: 0,
    costRegular: 0,
    maxUses: null
  },
  tricycle: {
    key: "tricycle",
    name: "Tricycle",
    distanceKm: 2,
    energyDrain: 10,
    costDiscount: 16,
    costRegular: 20,
    maxUses: 2
  },
  bus: {
    key: "bus",
    name: "Bus",
    distanceKm: 6,
    energyDrain: 12,
    costDiscount: 15,
    costRegular: 18,
    maxUses: 2
  },
};

// Starting conditions. Each run gets one option from every category, picked
// once at the start. Weather must stay first: the game reads it as the weather.
// Designed in the capstone doc Game_Starting_Conditions.md; keep the two in step.
export const CONDITIONS: ConditionCategory[] = [
  {
    key: "weather",
    name: "Weather",
    options: [
      { key: "normal", name: "Normal", description: "It's a regular day." },
      {
        key: "rainy",
        name: "Rainy",
        description: "Rain makes every trip harder, and motorcycle taxis stop running.",
        drainPercent: 30,
        removes: ["motor"],
      },
      { key: "sunny", name: "Sunny", description: "The heat wears you down a little faster.", drainPercent: 10 },
    ],
  },
  {
    key: "work",
    name: "Workplace",
    studentName: "School",
    options: [
      { key: "average", name: "Average", description: "Nothing about your [work] is too bad or too good." },
      { key: "stressful", name: "Stressful", description: "You dread going to [work] every day.", drainPercent: 15 },
      { key: "fulfilling", name: "Fulfilling", description: "You look forward to going to [work] every day.", drainPercent: -20 },
      {
        key: "shorter-free-days",
        name: "Shorter Free Days",
        description: "You never have enough time to recover before your responsibilities come back.",
        drainFlat: 5,
      },
      {
        key: "star-performer",
        name: "Star Performer",
        description: "You're highly valued at [work].",
        money: 20,
        maxEnergy: 10,
        drainPercent: 10,
      },
    ],
  },
  {
    key: "living",
    name: "Living Situation",
    options: [
      {
        key: "rich",
        name: "Rich",
        description: "You live a lavish lifestyle and are financially secure.",
        money: 50,
        maxEnergy: 10,
      },
      { key: "comfortable", name: "Comfortable", description: "You get by comfortably on a stable, modest income." },
      { key: "poor", name: "Poor", description: "You struggle to afford basic goods.", money: -25, maxEnergy: -15 },
    ],
  },
  {
    key: "family",
    name: "Family",
    options: [
      {
        key: "happy",
        name: "Happy",
        description: "You have a healthy relationship with your family.",
        maxEnergy: 15,
        drainPercent: -15,
      },
      {
        key: "strained",
        name: "Strained",
        description: "You have an unhealthy relationship with your family.",
        maxEnergy: -10,
        drainPercent: 15,
      },
      { key: "ordinary", name: "Ordinary", description: "You have an ordinary relationship with your family." },
      {
        key: "provider",
        name: "Provider",
        description: "You're the main provider, or one of the main providers, for your family.",
        money: 30,
        drainFlat: 7,
      },
      {
        key: "golden-child",
        name: "Golden Child",
        description: "You're the family favourite, and everyone expects great things from you.",
        money: 50,
        maxEnergy: 20,
        drainPercent: 20,
      },
    ],
  },
  {
    key: "personal",
    name: "Personal",
    options: [
      { key: "nothing-outstanding", name: "Nothing Outstanding", description: "Nothing about you makes commuting harder." },
      {
        key: "fear-of-motorcycles",
        name: "Fear of Motorcycles",
        description: "You're deathly afraid of riding motorcycles.",
        removes: ["motor"],
      },
      {
        key: "motion-sickness",
        name: "Motion Sickness",
        description: "You feel sick riding inside vehicles.",
        drainFlat: 10,
        appliesTo: ["jeep", "train", "tricycle", "car", "motor"],
        removes: ["jeep"],
      },
    ],
  },
];

// Walk is the ride of last resort, so no condition may remove it.
for (const category of CONDITIONS) {
  for (const option of category.options) {
    if (option.removes?.includes("walk")) {
      throw new Error(`Condition "${option.name}" may not remove Walk`);
    }
  }
}

export const EVENTS: RandomEvent[] = [
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
