import { el } from "./dom.js";

const node = document.getElementById("tooltip");

export function showTip(x, y, head, body, color = "var(--s1)") {
  node.replaceChildren(
    el("div", { class: "tt-head" }, [el("span", { class: "dot", style: `background: ${color}` }), head]),
    el("div", { class: "tt-body", text: body }),
  );
  node.hidden = false;
  const w = node.offsetWidth, h = node.offsetHeight;
  node.style.left = `${Math.min(Math.max(8, x - w / 2), window.innerWidth - w - 8)}px`;
  node.style.top = `${y - h - 12 < 8 ? y + 16 : y - h - 12}px`;
}

export function hideTip() {
  node.hidden = true;
}
