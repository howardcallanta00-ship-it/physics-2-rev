import katex from 'katex';

/** Tiny hyperscript helper: h('div', {class:'x', onclick:fn}, child, ...) */
export function h(tag, props, ...children) {
  const el = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
  }
  append(el, children);
  return el;
}

export function append(el, children) {
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Render a TeX string to HTML. */
export function tex(src, display = false) {
  try {
    return katex.renderToString(src, { displayMode: display, throwOnError: false, strict: 'ignore', output: 'html' });
  } catch (e) {
    return esc(src);
  }
}

/** Rich text -> HTML string. Supports $tex$, **bold**, *italic*. */
export function richHTML(text) {
  const parts = String(text).split(/(\$[^$]+\$)/g);
  return parts
    .map((p) => {
      if (p.length > 1 && p.startsWith('$') && p.endsWith('$')) return tex(p.slice(1, -1), false);
      return esc(p).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
    })
    .join('');
}

/** Rich text -> inline span element. */
export function R(text, cls) {
  return h('span', { class: cls ? 'rich ' + cls : 'rich', html: richHTML(text) });
}

/** Display or inline math element. */
export function M(src, display = true) {
  return h(display ? 'div' : 'span', { class: display ? 'math-display' : 'math-inline', html: tex(src, display) });
}

export function icon(name, size = 20) {
  const paths = {
    home: 'm3 11 9-8 9 8M5 10v10h14V10',
    book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M9 7h6',
    cards: 'M4 6h16v12H4zM8 10h8M8 14h5',
    quiz: 'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9',
    solve: 'M5 3h14v18H5zM8 7h8M8 11h2M12 11h2M8 15h2M12 15h2',
    tools: 'M3 12h4l3-8 4 16 3-8h4',
    sigma: 'M18 5H6l6 7-6 7h12',
    list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
    moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
    sun: 'M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    check: 'M5 12l5 5 9-10',
    x: 'M6 6l12 12M18 6 6 18',
    chevR: 'm9 18 6-6-6-6',
    chevL: 'm15 18-6-6 6-6',
    flame: 'M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',
    bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z',
    bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
    play: 'M7 4v16l13-8z',
    pause: 'M7 4h4v16H7zM13 4h4v16h-4z',
    reset: 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5',
    print: 'M6 9V3h12v6M6 18H4v-7h16v7h-2M8 14h8v7H8z',
    search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-3.5-3.5',
    more: 'M5 12h.01M12 12h.01M19 12h.01',
    target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v5M12 8h.01',
    warn: 'M12 3 2 20h20zM12 10v4M12 17h.01'
  };
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', paths[name] || paths.info);
  svg.append(p);
  return svg;
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Format a number with sensible significant figures. */
export function fmt(x, sig = 3) {
  if (!isFinite(x)) return String(x);
  if (x === 0) return '0';
  const ax = Math.abs(x);
  if (ax >= 1e5 || ax < 1e-3) {
    const [m, e] = x.toExponential(sig - 1).split('e');
    return `${m}\\times10^{${parseInt(e, 10)}}`;
  }
  return String(parseFloat(x.toPrecision(sig)));
}
