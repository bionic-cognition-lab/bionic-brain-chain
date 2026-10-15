import { el } from "./lib/dom.js";
import { loadCsv } from "./lib/data.js";
import { renderStations } from "./components/stations.js";
import { renderResults } from "./components/results.js";
import { renderExplorer } from "./components/explorer.js";
import { renderBrains } from "./components/brains.js";

renderStations(document.querySelector(".station-list"));
renderBrains(document.querySelector(".brains"));

const redraws = [];
try {
  const runs = await loadCsv("runs.csv");
  redraws.push(renderResults(runs), renderExplorer(document.getElementById("explorer"), runs));
} catch (err) {
  for (const id of ["results-body", "explorer"]) {
    document.getElementById(id).replaceChildren(el("p", { class: "load-error", text: "The run data could not be loaded." }));
  }
  console.error(err);
}

const drawAll = () => redraws.forEach((fn) => fn());
drawAll();

let timer;
new ResizeObserver(() => { clearTimeout(timer); timer = setTimeout(drawAll, 120); }).observe(document.querySelector("main"));
