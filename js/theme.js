// Theme definitions, visual contracts, and default theme templates.
// All layout variations, meter modes, and color tokens for character personas are declared here.
export const DEFAULT_THEME = {
    id: "default",
    name: "Arcade Console",
    energyBarStyle: "segmented",
    moneyDisplayStyle: "bar",
    accentPalette: {
        panel: "#a783c5",
        line: "#690dbc",
        frame: "#f8366f",
        frameLight: "#feba91",
        frameDark: "#c11763",
        knob: "#fb6070",
        backdrop: "#ffb95f",
    },
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
