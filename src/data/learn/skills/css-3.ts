import type { Skill } from '@/types/index'

export const css3: Skill = {
    id: 'css-3',
    name: 'CSS',
    content: `## CSS Refresher

CSS (Cascading Style Sheets) controls the visual presentation of HTML. It describes *how* elements look — their size, color, spacing, layout, and more. The "cascading" part means multiple rules can apply to the same element, and the browser resolves conflicts using specificity and source order.

---

### How CSS is applied

\`\`\`html
<!-- External stylesheet (preferred) -->
<link rel="stylesheet" href="styles.css" />

<!-- Inline styles (avoid — hard to override and maintain) -->
<p style="color: red;">Hello</p>
\`\`\`

In an external stylesheet, rules follow this structure:

\`\`\`css
selector {
    property: value;
    property: value;
}
\`\`\`

---

### Selectors

\`\`\`css
/* Element */
p { color: #333; }

/* Class — reusable, most common */
.card { border-radius: 8px; }

/* ID — unique per page, high specificity */
#header { background: #fff; }

/* Descendant — any .label inside a .todo */
.todo .label { font-weight: bold; }

/* Direct child */
.todo > button { margin-left: auto; }

/* Pseudo-class — element state */
button:hover { opacity: 0.8; }
input:focus { outline: 2px solid #5a3a82; }
li:first-child { border-top: none; }
li:last-child { border-bottom: none; }
li:nth-child(2n) { background: #f9f9f9; }

/* Pseudo-element — virtual sub-element */
p::first-line { font-weight: bold; }
.required::after { content: ' *'; color: red; }

/* Attribute */
input[type="checkbox"] { width: 1rem; }
a[target="_blank"]::after { content: ' ↗'; }
\`\`\`

---

### The cascade and specificity

When multiple rules target the same element and property, the browser picks the winner using **specificity** — a score based on selector type:

| Selector type | Specificity |
|---------------|-------------|
| Inline style | Highest |
| ID (\`#id\`) | High |
| Class, pseudo-class, attribute | Medium |
| Element, pseudo-element | Low |

More specific rules win regardless of source order. Equal-specificity rules are resolved by whichever appears last in the stylesheet.

\`\`\`css
p { color: black; }           /* specificity: 0,0,1 */
.intro { color: blue; }       /* specificity: 0,1,0 — wins over p */
#hero { color: red; }         /* specificity: 1,0,0 — wins over .intro */
\`\`\`

Avoid \`!important\` — it breaks the cascade and makes debugging painful.

---

### The box model

Every element is a rectangular box made of four layers, from inside out:

1. **Content** — the text or child elements
2. **Padding** — space between content and border
3. **Border** — the element's edge
4. **Margin** — space outside the border, between elements

\`\`\`css
.card {
    padding: 1rem;           /* all four sides */
    padding: 0.5rem 1rem;    /* top/bottom  left/right */
    border: 1px solid #eee;
    margin-bottom: 1rem;
}
\`\`\`

By default, \`width\` and \`height\` apply to the content box only — padding and border add to the total size. Fix this globally with:

\`\`\`css
*, *::before, *::after {
    box-sizing: border-box;
}
\`\`\`

With \`border-box\`, \`width: 200px\` means the total rendered width is 200px, padding and border included.

---

### Units

| Unit | What it's relative to |
|------|----------------------|
| \`px\` | Fixed pixels |
| \`%\` | Parent element's dimension |
| \`em\` | Current element's \`font-size\` |
| \`rem\` | Root element's \`font-size\` (usually 16px) |
| \`vw\` / \`vh\` | 1% of viewport width / height |
| \`ch\` | Width of the "0" character in the current font |

Prefer \`rem\` for font sizes and spacing — it scales predictably when users change their browser's base font size. Use \`px\` for borders and fine details that shouldn't scale.

---

### Flexbox

Flexbox is the go-to tool for one-dimensional layouts (a row or a column).

\`\`\`css
.container {
    display: flex;
    flex-direction: row;        /* row (default) | column */
    justify-content: space-between; /* main axis alignment */
    align-items: center;        /* cross axis alignment */
    gap: 1rem;                  /* space between children */
    flex-wrap: wrap;            /* allow children to wrap */
}

.child {
    flex: 1;          /* grow and shrink equally, share available space */
    flex: 0 0 200px;  /* don't grow, don't shrink, fixed 200px basis */
}
\`\`\`

Key \`justify-content\` values: \`flex-start\`, \`flex-end\`, \`center\`, \`space-between\`, \`space-around\`.
Key \`align-items\` values: \`flex-start\`, \`flex-end\`, \`center\`, \`stretch\` (default), \`baseline\`.

---

### Grid

Grid is for two-dimensional layouts — rows *and* columns at the same time.

\`\`\`css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
    grid-template-columns: 200px 1fr 1fr;   /* fixed + flexible */
    gap: 1.5rem;
}

/* Place an item explicitly */
.featured {
    grid-column: 1 / 3;   /* span from line 1 to line 3 */
    grid-row: 1 / 2;
}
\`\`\`

\`fr\` is a fractional unit — \`1fr\` means "one share of the remaining space." \`repeat(auto-fill, minmax(200px, 1fr))\` creates a responsive grid that adds columns as space allows.

---

### Positioning

\`\`\`css
/* Default — follows normal document flow */
.box { position: static; }

/* Offset from its normal position, still occupies space */
.box { position: relative; top: 10px; left: 20px; }

/* Removed from flow, positioned relative to nearest non-static ancestor */
.tooltip { position: absolute; top: 0; right: 0; }

/* Stays in place as the page scrolls */
.navbar { position: fixed; top: 0; width: 100%; }

/* Like fixed, but relative to its scroll container */
.sticky-header { position: sticky; top: 0; }
\`\`\`

\`absolute\` positioning is relative to the nearest ancestor with \`position: relative\` (or \`absolute\`/\`fixed\`). If none exists, it's relative to the viewport.

---

### Typography

\`\`\`css
body {
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 1rem;       /* 16px by default */
    line-height: 1.5;      /* unitless — relative to font-size */
    color: #222;
}

h1 {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
}

p {
    max-width: 65ch;       /* ~65 characters — comfortable reading width */
}

.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
\`\`\`

---

### Colors

\`\`\`css
color: #5a3a82;              /* hex */
color: rgb(90, 58, 130);     /* rgb */
color: hsl(270, 38%, 37%);   /* hsl — often easiest to reason about */
color: oklch(45% 0.12 290);  /* oklch — perceptually uniform, modern */

/* Transparency */
color: rgb(90 58 130 / 0.5);
color: hsl(270 38% 37% / 50%);
\`\`\`

---

### Custom properties (CSS variables)

\`\`\`css
:root {
    --color-primary: #5a3a82;
    --color-text: #222;
    --spacing-md: 1rem;
    --radius: 4px;
}

.button {
    background-color: var(--color-primary);
    padding: var(--spacing-md);
    border-radius: var(--radius);
}

/* Override in a local scope */
.card {
    --spacing-md: 1.5rem;
}
\`\`\`

Custom properties cascade and inherit like any other property. They're the foundation of theming — swap values on \`:root\` and the whole UI updates.

---

### Responsive design

\`\`\`css
/* Mobile-first: base styles apply to all sizes */
.container {
    padding: 1rem;
}

/* Enhance for larger screens */
@media (min-width: 640px) {
    .container {
        padding: 2rem;
    }
}

@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
}

/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
}
\`\`\`

---

### Common gotchas

- **Margin collapse**: vertical margins between adjacent block elements merge into one. The larger margin wins. Padding and borders prevent collapse.
- **\`z-index\` only works** on elements with a \`position\` other than \`static\` (or with certain other properties like \`opacity < 1\`).
- **Percentage heights** require the parent to have an explicit height. Use \`min-height: 100vh\` on \`body\` instead of \`height: 100%\` chains.
- **Flexbox and Grid children** ignore \`float\` and \`vertical-align\` — those are for older layout models.
- **\`display: none\`** removes the element from layout entirely. \`visibility: hidden\` hides it but keeps its space. \`opacity: 0\` makes it invisible but still interactive.`,
}
