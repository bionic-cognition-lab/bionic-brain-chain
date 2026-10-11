import { svg, svgText } from "../lib/dom.js";
import { showTip, hideTip } from "../lib/tooltip.js";

// Shared mark specs: columns <= 24px with a 4px rounded top, 2px lines,
// 8px markers with a 2px surface ring, hairline grid, one y axis.

function frame(container, W, H, label) {
  const root = svg("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": label });
  container.replaceChildren(root);
  return root;
}

function yAxis(root, { ticks, y, left, right, fmt }) {
  ticks.forEach((t, i) => {
    root.append(svg("line", { class: i === 0 ? "baseline" : "grid", x1: left, x2: right, y1: y(t), y2: y(t) }));
    root.append(svgText({ x: left - 8, y: y(t) + 4, "text-anchor": "end" }, fmt(t)));
  });
}

function bindHover(target, onEnter) {
  const leave = () => { target.closest("g")?.classList.remove("is-hover"); hideTip(); };
  target.addEventListener("mouseenter", onEnter);
  target.addEventListener("focus", onEnter);
  target.addEventListener("mouseleave", leave);
  target.addEventListener("blur", leave);
}

export function columnChart(container, items, { label, yMax = 4, ticks = [0, 1, 2, 3, 4], fmt = String, labelled = [] }) {
  const W = Math.max(320, container.clientWidth), H = 260;
  const m = { top: 24, right: 8, bottom: 32, left: 32 };
  const iw = W - m.left - m.right, ih = H - m.top - m.bottom;
  const y = (v) => m.top + ih - (v / yMax) * ih;
  const band = iw / items.length, barW = Math.min(24, band * 0.6), r = 4;
  const root = frame(container, W, H, label);
  yAxis(root, { ticks, y, left: m.left, right: W - m.right, fmt });

  items.forEach((d, i) => {
    const cx = m.left + band * i + band / 2, x0 = cx - barW / 2, top = y(d.value), base = y(0);
    const g = svg("g", {});
    const hit = svg("rect", { class: "hit", x: m.left + band * i, y: m.top, width: band, height: ih, tabindex: "0", role: "img", "aria-label": `${d.label}: ${fmt(d.value)}. ${d.tip}` });
    g.append(hit, svg("path", { class: "bar", d: `M${x0},${base} V${top + r} Q${x0},${top} ${x0 + r},${top} H${x0 + barW - r} Q${x0 + barW},${top} ${x0 + barW},${top + r} V${base} Z` }));
    g.append(svgText({ x: cx, y: H - m.bottom + 18, "text-anchor": "middle" }, d.label));
    if (labelled.includes(i)) g.append(svgText({ class: "label-strong", x: cx, y: top - 8, "text-anchor": "middle" }, fmt(d.value)));
    bindHover(hit, () => {
      g.classList.add("is-hover");
      const b = hit.getBoundingClientRect();
      showTip(b.left + b.width / 2, g.querySelector(".bar").getBoundingClientRect().top, `${d.label} · ${fmt(d.value)}`, d.tip);
    });
    root.append(g);
  });
}

// Points on an ordered categorical axis; categories without a point stay visible as gaps.
export function pointChart(container, points, categories, { label, lo = 0, hi = 4, ticks, fmt = String, line = false, height = 240, endLabel = true }) {
  const W = Math.max(280, container.clientWidth), H = height;
  const m = { top: 20, right: endLabel ? 40 : 16, bottom: 30, left: 36 };
  const iw = W - m.left - m.right, ih = H - m.top - m.bottom;
  const y = (v) => m.top + ih - ((v - lo) / (hi - lo)) * ih;
  const step = categories.length > 1 ? iw / (categories.length - 1) : 0;
  const x = (cat) => m.left + (categories.length > 1 ? step * categories.indexOf(cat) : iw / 2);
  const root = frame(container, W, H, label);
  yAxis(root, { ticks: ticks ?? [lo, (lo + hi) / 2, hi], y, left: m.left, right: W - m.right, fmt });
  categories.forEach((c) => root.append(svgText({ x: x(c), y: H - m.bottom + 18, "text-anchor": "middle" }, c)));

  // Runs at the same category are spread slightly so both stay visible.
  const seen = {};
  const placed = points.map((p) => {
    const k = seen[p.cat] = (seen[p.cat] ?? -1) + 1;
    const dup = points.filter((q) => q.cat === p.cat).length;
    return { ...p, px: x(p.cat) + (dup > 1 ? (k - (dup - 1) / 2) * 10 : 0), py: y(p.value) };
  });

  if (line && placed.length > 1) {
    const d = placed.map((p, i) => `${i ? "L" : "M"}${p.px},${p.py}`).join(" ");
    root.append(svg("path", { class: "area", d: `${d} L${placed.at(-1).px},${y(lo)} L${placed[0].px},${y(lo)} Z` }));
    root.append(svg("path", { class: "line", d }));
  }
  placed.forEach((p) => {
    const g = svg("g", {});
    const hit = svg("circle", { class: "hit", cx: p.px, cy: p.py, r: 12, tabindex: "0", role: "img", "aria-label": `${p.cat}: ${fmt(p.value)}. ${p.tip}` });
    g.append(svg("circle", { class: "marker", cx: p.px, cy: p.py, r: 4 }), hit);
    bindHover(hit, () => {
      const b = hit.getBoundingClientRect();
      showTip(b.left + b.width / 2, b.top + 4, `${p.cat} · ${fmt(p.value)}`, p.tip);
    });
    root.append(g);
  });
  if (endLabel && placed.length) {
    const last = placed.at(-1);
    root.append(svgText({ class: "label-strong", x: last.px + 10, y: last.py + 4 }, fmt(last.value)));
  }
}

export function tableToggle(button, chart, table) {
  button.addEventListener("click", () => {
    const showTable = table.hidden;
    table.hidden = !showTable;
    chart.hidden = showTable;
    button.setAttribute("aria-pressed", String(showTable));
    button.textContent = showTable ? "Show chart" : "Show table";
  });
}
