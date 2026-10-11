import { el } from "../lib/dom.js";
import { num } from "../lib/data.js";
import { pointChart } from "./charts.js";
import { QUESTIONS, VERSION_ORDER } from "../data/content.js";

const byVersion = (a, b) => VERSION_ORDER.indexOf(a.version) - VERSION_ORDER.indexOf(b.version) || `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`);

export function renderExplorer(container, runs) {
  const questions = [...new Set(runs.map((r) => r.question_id))].sort((a, b) => Object.keys(QUESTIONS).indexOf(a) - Object.keys(QUESTIONS).indexOf(b));
  const versions = VERSION_ORDER.filter((v) => runs.some((r) => r.version === v));
  const state = { question: "all", version: "all" };

  const select = (labelText, options, key) => {
    const s = el("select", {}, [el("option", { value: "all", text: "All" }), ...options.map(([v, t]) => el("option", { value: v, text: t }))]);
    s.addEventListener("change", () => { state[key] = s.value; update(); });
    return el("label", {}, [labelText, s]);
  };
  const filters = el("div", { class: "filters" }, [
    select("Question", questions.map((q) => [q, QUESTIONS[q] ?? q]), "question"),
    select("Version", versions.map((v) => [v, v]), "version"),
  ]);
  const count = el("p", { class: "section-lede", style: "margin: 0 0 12px" });
  const multiples = el("div", { class: "multiples" });
  const table = el("div", { class: "table-scroll" });
  container.replaceChildren(filters, count, multiples, table);

  const filtered = () => runs.filter((r) => (state.question === "all" || r.question_id === state.question) && (state.version === "all" || r.version === state.version)).sort(byVersion);

  const drawCharts = () => {
    multiples.replaceChildren();
    const rows = filtered().filter((r) => num(r.avg_score) !== null);
    const qs = [...new Set(rows.map((r) => r.question_id))];
    qs.forEach((q) => {
      const qRows = rows.filter((r) => r.question_id === q);
      const cats = VERSION_ORDER.filter((v) => qRows.some((r) => r.version === v));
      const chart = el("div", { class: "chart" });
      multiples.append(el("div", { class: "multiple" }, [
        el("h3", { text: QUESTIONS[q] ?? q }),
        el("p", { text: `${qRows.length} scored run${qRows.length === 1 ? "" : "s"} · average score, 0 to 4` }),
        chart,
      ]));
      pointChart(chart, qRows.map((r) => ({ cat: r.version, value: num(r.avg_score), tip: `${r.date} · grounding ${r.grounding_pct ? r.grounding_pct + "%" : "not counted"}` })), cats, {
        label: `Average score per run for ${QUESTIONS[q] ?? q}`, lo: 0, hi: 4, ticks: [0, 2, 4], fmt: (v) => Number(v).toFixed(1), height: 170, endLabel: false,
      });
    });
  };

  const update = () => {
    const rows = filtered();
    count.textContent = `${rows.length} of ${runs.length} recorded runs. Each point is one run; runs without an auto-score (for example deadEnd runs in v0) appear only in the table.`;
    table.replaceChildren(el("table", { class: "data-table" }, [
      el("thead", {}, el("tr", {}, ["Date", "Version", "Question", "Mode", "Stop", "Score", "Grounding"].map((h, i) => el("th", { class: i >= 5 ? "num" : null, text: h })))),
      el("tbody", {}, rows.map((r) => el("tr", {}, [
        el("td", { text: r.date }),
        el("td", { text: r.version }),
        el("td", { text: QUESTIONS[r.question_id] ?? r.question_id }),
        el("td", { text: r.mode }),
        el("td", { text: r.stop }),
        el("td", { class: "num", text: r.avg_score || "–" }),
        el("td", { class: "num", text: r.grounding_pct ? `${r.grounding_pct}%` : "–" }),
      ]))),
    ]));
    drawCharts();
  };

  update();
  return drawCharts;
}
