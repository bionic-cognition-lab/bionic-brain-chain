import { el } from "../lib/dom.js";
import { STATIONS } from "../data/stations.js";

export function renderStations(list) {
  STATIONS.forEach((s, i) => {
    list.append(el("li", { class: "card station-card" }, [
      el("span", { class: "node-step" }, [el("span", { class: "dot", style: `background: var(${s.color})` }), `Step ${i + 1} · ${s.key}`]),
      el("h3", { text: s.name }),
      el("p", { class: "node-region", text: s.region }),
      el("p", { text: s.job }),
      el("p", { class: "station-bias" }, [el("strong", { text: "Built-in bias: " }), s.bias]),
    ]));
  });
}
