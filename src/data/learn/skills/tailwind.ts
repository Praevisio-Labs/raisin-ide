import type { Skill } from '@/types/index'

export const tailwind: Skill = {
    id: 'tailwind',
    name: 'Tailwind CSS',
    content: `## Tailwind CSS Refresher

Tailwind is a utility-first CSS framework. Instead of writing custom CSS classes, you compose styles directly in your markup using small, single-purpose utility classes. There's no stylesheet to maintain — Tailwind scans your files at build time and generates only the CSS you actually use.

---

### How it works

\`\`\`tsx
// Traditional approach — write a class, then style it in CSS
<button class="btn-primary">Save</button>

// Tailwind approach — compose utilities directly
<button class="px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-800">
    Save
</button>
\`\`\`

The tradeoff: HTML gets more verbose, but you never context-switch to a stylesheet, and there are no naming decisions to make.

---

### Spacing and sizing

Tailwind uses a numeric scale where each step is \`4px\` (by default \`1 = 4px\`, \`2 = 8px\`, \`4 = 16px\`, etc.).

\`\`\`html
<!-- Padding -->
<div class="p-4">        <!-- padding: 1rem on all sides -->
<div class="px-4 py-2">  <!-- horizontal: 1rem, vertical: 0.5rem -->
<div class="pt-2 pb-4">  <!-- top: 0.5rem, bottom: 1rem -->

<!-- Margin -->
<div class="m-4">
<div class="mx-auto">    <!-- center horizontally -->
<div class="mt-8 mb-4">

<!-- Width and height -->
<div class="w-full">     <!-- width: 100% -->
<div class="w-64">       <!-- width: 16rem -->
<div class="w-1/2">      <!-- width: 50% -->
<div class="max-w-xl">   <!-- max-width: 36rem -->
<div class="h-screen">   <!-- height: 100vh -->
\`\`\`

---

### Typography

\`\`\`html
<p class="text-sm">       <!-- font-size: 0.875rem -->
<p class="text-base">     <!-- font-size: 1rem -->
<p class="text-xl">       <!-- font-size: 1.25rem -->
<p class="text-3xl">      <!-- font-size: 1.875rem -->

<p class="font-normal">   <!-- font-weight: 400 -->
<p class="font-medium">   <!-- font-weight: 500 -->
<p class="font-semibold"> <!-- font-weight: 600 -->
<p class="font-bold">     <!-- font-weight: 700 -->

<p class="leading-tight"> <!-- line-height: 1.25 -->
<p class="leading-relaxed"><!-- line-height: 1.625 -->

<p class="tracking-tight"><!-- letter-spacing: -0.025em -->
<p class="tracking-wide"> <!-- letter-spacing: 0.025em -->

<p class="text-center">
<p class="uppercase">
<p class="truncate">      <!-- overflow: hidden + text-overflow: ellipsis -->
\`\`\`

---

### Colors

Tailwind ships a full color palette. Each color has shades from \`50\` (lightest) to \`950\` (darkest).

\`\`\`html
<!-- Text color -->
<p class="text-gray-700">
<p class="text-violet-600">

<!-- Background color -->
<div class="bg-white">
<div class="bg-slate-100">
<div class="bg-violet-700">

<!-- Border color -->
<div class="border border-gray-200">
<div class="border-2 border-violet-500">

<!-- Opacity modifier — works on any color utility -->
<div class="bg-black/50">   <!-- background: rgb(0 0 0 / 0.5) -->
<p class="text-gray-900/80">
\`\`\`

---

### Flexbox and Grid

\`\`\`html
<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap">
<div class="flex-1">         <!-- flex: 1 1 0% -->
<div class="shrink-0">       <!-- flex-shrink: 0 -->

<!-- Grid -->
<div class="grid grid-cols-3 gap-6">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<div class="col-span-2">     <!-- grid-column: span 2 -->
\`\`\`

---

### Borders and shadows

\`\`\`html
<div class="border">              <!-- 1px solid border -->
<div class="border-2">            <!-- 2px solid border -->
<div class="border-t">            <!-- top border only -->
<div class="rounded">             <!-- border-radius: 0.25rem -->
<div class="rounded-lg">          <!-- border-radius: 0.5rem -->
<div class="rounded-full">        <!-- border-radius: 9999px — pill/circle -->

<div class="shadow">              <!-- small box shadow -->
<div class="shadow-md">
<div class="shadow-lg">
<div class="shadow-none">
\`\`\`

---

### Responsive design

Tailwind is mobile-first. Unprefixed utilities apply at all screen sizes. Prefix with a breakpoint to apply at that size and above:

| Prefix | Min-width |
|--------|-----------|
| \`sm:\` | 640px |
| \`md:\` | 768px |
| \`lg:\` | 1024px |
| \`xl:\` | 1280px |
| \`2xl:\` | 1536px |

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div class="hidden md:block">   <!-- hidden on mobile, visible on md+ -->
<div class="block md:hidden">   <!-- visible on mobile, hidden on md+ -->
\`\`\`

---

### State variants

\`\`\`html
<!-- Hover, focus, active -->
<button class="bg-violet-700 hover:bg-violet-800 active:bg-violet-900">
<input class="border focus:outline-none focus:ring-2 focus:ring-violet-500">

<!-- Focus-visible — keyboard focus only, not mouse click -->
<button class="focus-visible:ring-2 focus-visible:ring-violet-500">

<!-- Disabled -->
<button class="disabled:opacity-50 disabled:cursor-not-allowed">

<!-- Group hover — style a child when the parent is hovered -->
<div class="group">
    <p class="text-gray-500 group-hover:text-gray-900">...</p>
</div>

<!-- Dark mode -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
\`\`\`

---

### Arbitrary values

When the built-in scale doesn't have what you need, use square bracket notation to drop in any value:

\`\`\`html
<div class="w-[340px]">
<div class="top-[117px]">
<div class="bg-[#5a3a82]">
<div class="grid-cols-[1fr_2fr_1fr]">
<p class="text-[13px] leading-[1.4]">
\`\`\`

---

### The \`@apply\` directive

If you need to reuse a combination of utilities in CSS (e.g. for a component library or third-party HTML you can't control), use \`@apply\` in your stylesheet:

\`\`\`css
.btn-primary {
    @apply px-4 py-2 bg-violet-700 text-white rounded font-medium hover:bg-violet-800;
}
\`\`\`

Use this sparingly — it defeats some of the benefits of utility-first. Prefer extracting a React/HTML component instead.

---

### Customizing the theme

Extend or override Tailwind's defaults in \`tailwind.config.ts\`:

\`\`\`ts
import type { Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#5a3a82',
                    light: '#7c5aa8',
                    dark: '#3d2659',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
} satisfies Config
\`\`\`

Custom values become first-class utilities: \`bg-brand\`, \`text-brand-light\`, \`font-sans\`, \`rounded-4xl\`.

---

### Common gotchas

- **Dynamic class names don't work.** Tailwind scans source files for complete class strings at build time. \`\`text-\${color}-500\`\` won't be included in the output — always use full class names like \`text-red-500\`.
- **Specificity is flat.** All utilities have the same specificity (one class), so source order in the generated stylesheet determines which wins when two utilities conflict. Use a single utility per property per element.
- **\`prose\` for rich text.** The \`@tailwindcss/typography\` plugin adds a \`prose\` class that styles raw HTML (from a CMS or markdown renderer) without you having to target every element manually.
- **Don't purge \`node_modules\`.** The \`content\` array in your config should point to your source files only — scanning \`node_modules\` slows the build significantly.`,
}
