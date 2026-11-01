// Entry point: picks the stage screens or, with ?ui=plain, the plain ones.
import { startPlainUi } from "./ui-plain.js";
import { startStageUi } from "./ui-stage.js";
const app = document.getElementById("app");
const plain = new URLSearchParams(location.search).get("ui") === "plain";
if (!plain)
    document.getElementById("theme").href = "stage.css";
document.body.classList.add(plain ? "ui-plain" : "ui-stage");
if (plain)
    startPlainUi(app);
else
    startStageUi(app);
