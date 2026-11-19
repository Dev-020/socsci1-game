// Theme definitions, visual contracts, and default theme templates.
// All layout variations and meter modes for character personas are declared here;
// colour overrides live in CSS custom properties on [data-character].

export type EnergyBarStyle = "segmented" | "continuous";
export type MoneyDisplayStyle = "bar" | "digital";

export interface CharacterTheme {
  id: string;                      // Unique slug (e.g. "student", "worker", "pwd")
  name: string;                    // Display name
  energyBarStyle: EnergyBarStyle;  // "segmented" (10 discrete blocks) or "continuous" (fluid gauge)
  moneyDisplayStyle: MoneyDisplayStyle;
  badgeLabel?: string;             // Optional commuter ID badge flair (e.g. "School Pass", "Corporate RFID")
}

export const DEFAULT_THEME: CharacterTheme = {
  id: "default",
  name: "Arcade Console",
  energyBarStyle: "segmented",
  moneyDisplayStyle: "bar",
};

// All characters currently use the baseline default values until the team finalizes their themes.
export const CHARACTER_THEMES: Record<string, CharacterTheme> = {
  student: {
    ...DEFAULT_THEME,
    id: "student",
    name: "Student",
  },
  worker: {
    ...DEFAULT_THEME,
    id: "worker",
    name: "Worker",
  },
  pwd: {
    ...DEFAULT_THEME,
    id: "pwd",
    name: "PWD",
  },
};

export function getCharacterTheme(slug: string): CharacterTheme {
  return CHARACTER_THEMES[slug] ?? DEFAULT_THEME;
}
