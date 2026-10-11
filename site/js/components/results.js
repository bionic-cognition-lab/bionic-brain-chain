import { el } from "../lib/dom.js";
import { num } from "../lib/data.js";
import { columnChart, pointChart, tableToggle } from "./charts.js";
import { MILESTONES, QUESTIONS, VERSION_ORDER } from "../data/content.js";

const STRESS = ["Q2", "Q3", "Q4", "Q1", "Q5"];
const STRESS_VERSIONS = ["v8", "v9", "v9.1", "v9.2"];

export function renderResults(runs) {
  const mozart = runs
    .filter((r) => r.question_id === "Q6" && r.mode === "normal" && r.stop === "done" && num(r.grounding_pct) !== null)
    .sort((a, b) => VERSION_ORDER.indexOf(a.version) - VERSION_ORDER.indexOf(b.version));
  const mozartCats = VERSION_ORDER.slice(VERSION_ORDER.indexOf(mozart[0]?.version ?? "v3"), VERSION_ORDER.indexOf("v8") + 1).filter((v) => v !== "v8-dev");

  const draw = () => {
    columnChart(document.getElementById("chart-score"), MILESTONES.map((d) => ({ label: d.v, value: d.score, tip: `${d.note}. Measured on: ${QUESTIONS[d.q]}` })), {
      label: "Column chart of the average auto-score of one representative run per version, v0 to v8.",
      fmt: (v) => Number(v).toFixed(1), labelled: [0, 5, MILESTONES.length - 1],
    });
    pointChart(document.getElementById("chart-grounding"), mozart.map((r) => ({ cat: r.version, value: num(r.grounding_pct), tip: `Mozart question, ${r.date}` })), mozartCats, {
      label: "Grounding rate on the Mozart effect question by version.", lo: 70, hi: 100, ticks: [70, 80, 90, 100], fmt: (v) => `${v}%`, line: true,
    });
  };

  document.getElementById("table-score").replaceChildren(el("table", {}, [
    el("thead", {}, el("tr", {}, [el("th", { text: "Version" }), el("th", { class: "num", text: "Score" }), el("th", { text: "Measured on" }), el("th", { text: "Change" })])),
    el("tbody", {}, MILESTONES.map((d) => el("tr", {}, [el("td", { text: d.v }), el("td", { class: "num", text: d.score.toFixed(1) }), el("td", { text: QUESTIONS[d.q] }), el("td", { text: d.note })]))),
  ]));
  document.getElementById("table-grounding").replaceChildren(el("table", {}, [
    el("thead", {}, el("tr", {}, [el("th", { text: "Version" }), el("th", { class: "num", text: "Grounding" })])),
    el("tbody", {}, mozart.map((r) => el("tr", {}, [el("td", { text: r.version }), el("td", { class: "num", text: `${r.grounding_pct}%` })]))),
  ]));
  document.querySelectorAll(".table-toggle").forEach((b) => tableToggle(b, document.getElementById(`chart-${b.dataset.target}`), document.getElementById(`table-${b.dataset.target}`)));

  renderStressTable(document.getElementById("stress-table"), runs);
  return draw;
}

function renderStressTable(container, runs) {
  const cell = (q, v) => {
    const r = runs.find((x) => x.question_id === q && x.version === v && x.mode === "normal" && x.date === "2026-10-11");
    if (!r) return el("td", { class: "num", text: "" });
    const g = r.grounding_pct ? `${r.grounding_pct}%` : "not counted";
    return el("td", { class: "num", text: `${r.avg_score} / ${g}` });
  };
  container.replaceChildren(el("table", {}, [
    el("thead", {}, el("tr", {}, [el("th", { text: "Question" }), ...STRESS_VERSIONS.map((v) => el("th", { class: "num", text: v }))])),
    el("tbody", {}, STRESS.map((q) => el("tr", {}, [el("td", { text: QUESTIONS[q] }), ...STRESS_VERSIONS.map((v) => cell(q, v))]))),
  ]));
}
