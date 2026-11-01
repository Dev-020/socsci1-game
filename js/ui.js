// Entry point: picks the stage screens or, with ?ui=plain, the plain ones.
import { startPlainUi } from "./ui-plain.js";
import { startStageUi } from "./ui-stage.js";
const app = document.getElementById("app");
const plain = new URLSearchParams(location.search).get("ui") === "plain";
if (plain)
    document.getElementById("theme").href = "style.css";
document.body.classList.add(plain ? "ui-plain" : "ui-stage");
// The stage fills the whole screen, notch included, so only it asks for that.
if (!plain) {
    const viewport = document.querySelector('meta[name="viewport"]');
    viewport.content = "width=device-width, initial-scale=1, viewport-fit=cover";
    const color = document.createElement("meta");
    color.name = "theme-color";
    color.content = "#ffb95f";
    document.head.append(color);
}
if (plain)
    startPlainUi(app);
else
    startStageUi(app);
