const SVG_NS = "http://www.w3.org/2000/svg";

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c !== undefined && c !== null) node.append(c);
  }
  return node;
}

export function svg(tag, attrs = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

export function svgText(attrs, text) {
  const node = svg("text", attrs);
  node.textContent = text;
  return node;
}
