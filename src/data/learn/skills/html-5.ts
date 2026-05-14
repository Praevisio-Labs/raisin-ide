import type { Skill } from '@/types/index'

export const html5: Skill = {
    id: 'html-5',
    name: 'HTML',
    content: `## HTML Refresher

HTML (HyperText Markup Language) is the skeleton of every web page. It describes *structure* — not style or behavior. Browsers parse your HTML into a tree of objects called the **DOM** (Document Object Model), which CSS and JavaScript then read and manipulate.

---

### Document structure

Every HTML file starts with a doctype declaration and a root \`<html>\` element containing two children: \`<head>\` and \`<body>\`.

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Page Title</title>
  </head>
  <body>
    <!-- visible content goes here -->
  </body>
</html>
\`\`\`

- \`<!DOCTYPE html>\` tells the browser to use modern HTML5 parsing rules.
- \`<head>\` holds metadata — things the browser needs but the user doesn't see directly.
- \`<body>\` holds everything that renders on screen.

---

### Elements and attributes

An **element** is an opening tag, optional content, and a closing tag:

\`\`\`html
<p class="intro">Hello, world.</p>
\`\`\`

**Attributes** live inside the opening tag as \`name="value"\` pairs. Common ones:

| Attribute | Purpose |
|-----------|---------|
| \`id\` | Unique identifier — used by CSS and JS to target one element |
| \`class\` | One or more space-separated labels for styling groups of elements |
| \`href\` | Destination URL on \`<a>\` tags |
| \`src\` | Resource URL on \`<img>\`, \`<script>\`, etc. |
| \`type\` | Subtype hint on \`<input>\`, \`<button>\`, \`<script>\` |

Some elements are **void** (self-closing) — they have no content and no closing tag:

\`\`\`html
<input type="text" placeholder="Enter text" />
<img src="photo.jpg" alt="A description" />
<br />
\`\`\`

---

### Semantic elements

Semantic tags communicate *meaning* to browsers, search engines, and screen readers — not just visual layout.

\`\`\`html
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <article>
    <h1>Post Title</h1>
    <p>First paragraph...</p>
  </article>
</main>

<footer>© 2026</footer>
\`\`\`

Prefer semantic elements over generic \`<div>\` and \`<span>\` whenever the element has a clear role. Key ones to know:

- \`<header>\`, \`<footer>\`, \`<main>\`, \`<nav>\`, \`<aside>\` — page regions
- \`<article>\`, \`<section>\` — self-contained or thematic content blocks
- \`<h1>\`–\`<h6>\` — headings in descending importance (use only one \`<h1>\` per page)
- \`<p>\`, \`<ul>\`, \`<ol>\`, \`<li>\` — text and lists
- \`<button>\` — interactive controls (not \`<div onclick>\`)
- \`<label>\` — associates text with a form field

---

### Forms

Forms collect user input and submit it somewhere.

\`\`\`html
<form id="signup" action="/register" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required />

  <button type="submit">Sign up</button>
</form>
\`\`\`

Key points:

- Pair every \`<input>\` with a \`<label>\` using matching \`for\` / \`id\` values — this is required for accessibility.
- The \`name\` attribute is what gets sent to the server (or read by \`FormData\` in JS).
- \`type="email"\`, \`type="number"\`, etc. give the browser built-in validation and the right mobile keyboard.
- \`required\`, \`minlength\`, \`pattern\` add declarative validation without JavaScript.
- A \`<button type="submit">\` inside a \`<form>\` submits it; \`type="button"\` does not.

---

### Linking resources

\`\`\`html
<!-- stylesheet -->
<link rel="stylesheet" href="styles.css" />

<!-- script — defer keeps it from blocking HTML parsing -->
<script src="app.js" defer></script>

<!-- inline script (avoid for anything non-trivial) -->
<script>
  console.log('hello')
</script>
\`\`\`

Use \`defer\` on external scripts so the browser doesn't pause parsing while it downloads and executes them. \`async\` is an alternative but executes as soon as the file loads, which can cause ordering issues.

---

### Accessibility basics

- Always set \`lang\` on \`<html>\` so screen readers use the right pronunciation.
- Every \`<img>\` needs an \`alt\` attribute — describe the image, or use \`alt=""\` for decorative images.
- Use heading levels in order (\`<h1>\` → \`<h2>\` → \`<h3>\`) — don't skip levels for visual sizing.
- Interactive elements (\`<button>\`, \`<a>\`, \`<input>\`) are keyboard-focusable by default. Don't replace them with \`<div>\` + click handlers.

---

### Quick reference

\`\`\`html
<!-- Headings -->
<h1>Main title</h1>
<h2>Section title</h2>

<!-- Paragraph & inline text -->
<p>Some text with <strong>bold</strong> and <em>italic</em>.</p>

<!-- Link -->
<a href="https://example.com" target="_blank" rel="noopener">Visit</a>

<!-- Image -->
<img src="photo.jpg" alt="Descriptive text" width="400" />

<!-- Unordered list -->
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>

<!-- Ordered list -->
<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>

<!-- Generic containers -->
<div class="card">block-level wrapper</div>
<span class="highlight">inline wrapper</span>
\`\`\``,
}
