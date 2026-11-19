// Theme definitions, visual contracts, and default theme templates.
// All layout variations and meter modes for character personas are declared here;
// colour overrides live in CSS custom properties on [data-character].
export const DEFAULT_THEME = {
    id: "default",
    name: "Arcade Console",
    energyBarStyle: "segmented",
    moneyDisplayStyle: "bar",
};
// All characters currently use the baseline default values until the team finalizes their themes.
export const CHARACTER_THEMES = {
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
export function getCharacterTheme(slug) {
    return CHARACTER_THEMES[slug] ?? DEFAULT_THEME;
}
