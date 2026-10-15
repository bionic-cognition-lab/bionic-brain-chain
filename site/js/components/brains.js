import { el } from "../lib/dom.js";
import { BRAINS } from "../data/brains.js";

export function renderBrains(container) {
  container.replaceChildren(...BRAINS.map((b) => el("article", { class: "panel brain", id: `brain-${b.id}` }, [
    el("h3", { text: b.name }),
    el("p", { class: "brain-meta", text: `Built ${b.built} · its own five agents` }),
    el("p", { text: b.purpose }),
    el("ol", { class: "brain-stations" }, b.stations.map((s) => el("li", {}, [
      el("span", { class: "node-step" }, [el("span", { class: "dot", style: `background: var(${s.color})` }), s.key]),
      el("span", { text: s.role }),
    ]))),
    el("p", { class: "brain-question" }, [el("strong", { text: "Tested on: " }), b.question]),
    el("div", { class: "table-view" }, el("table", {}, [
      el("thead", {}, el("tr", {}, [el("th", { text: "Run" }), el("th", { class: "num", text: "Score" }), el("th", { class: "num", text: "Grounding" }), el("th", { text: "Note" })])),
      el("tbody", {}, b.runs.map((r) => el("tr", {}, [
        el("td", { text: r.label }),
        el("td", { class: "num", text: r.score.toFixed(1) }),
        el("td", { class: "num", text: `${r.grounding}%` }),
        el("td", { text: r.note }),
      ]))),
    ])),
    b.footnote ? el("p", { class: "brain-meta", text: b.footnote }) : null,
  ])));
}
