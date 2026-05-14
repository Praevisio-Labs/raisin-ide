import type { Skill } from '@/types/index'

export const framerMotion: Skill = {
    id: 'framer-motion',
    name: 'Framer Motion',
    content: `## Framer Motion Refresher

Framer Motion is a React animation library. It replaces CSS transitions and keyframes with a declarative API — you describe the animated state you want, and the library handles the interpolation, easing, and timing. It also handles gestures, layout animations, and exit animations that are genuinely difficult to do with CSS alone.

---

### Setup

\`\`\`bash
npm install framer-motion
\`\`\`

---

### The \`motion\` component

The core primitive is the \`motion\` component. It's a drop-in replacement for any HTML or SVG element — \`motion.div\`, \`motion.button\`, \`motion.svg\`, etc. — with extra animation props.

\`\`\`tsx
import { motion } from 'framer-motion'

// Animate from opacity 0 to 1 on mount
function FadeIn() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            Hello
        </motion.div>
    )
}
\`\`\`

The three props you'll use constantly:

| Prop | What it does |
|------|-------------|
| \`initial\` | The starting state (before the animation runs) |
| \`animate\` | The target state to animate to |
| \`transition\` | Controls duration, easing, delay, type |

---

### Transitions

\`\`\`tsx
// Spring physics (default for most properties)
<motion.div
    animate={{ x: 100 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
/>

// Tween (CSS-style, time-based)
<motion.div
    animate={{ opacity: 1 }}
    transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
/>

// Delay
<motion.div
    animate={{ y: 0 }}
    initial={{ y: 20 }}
    transition={{ delay: 0.2, duration: 0.4 }}
/>
\`\`\`

Spring is the default for transforms (x, y, scale, rotate). Tween is the default for opacity and color. You can override either.

---

### Exit animations with \`AnimatePresence\`

CSS can't animate elements as they're removed from the DOM — by the time you apply a class, the element is already gone. \`AnimatePresence\` solves this by keeping the element mounted until its exit animation finishes.

\`\`\`tsx
import { motion, AnimatePresence } from 'framer-motion'

function Modal({ isOpen }: { isOpen: boolean }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="modal"
                >
                    Modal content
                </motion.div>
            )}
        </AnimatePresence>
    )
}
\`\`\`

Rules:
- \`AnimatePresence\` must wrap the conditional render, not the \`motion\` component itself.
- Each child needs a stable \`key\` prop so Framer Motion can track it.
- The \`exit\` prop defines what the element animates to before unmounting.

---

### Variants

Variants let you define named animation states and coordinate animations across a component tree. Instead of repeating animation values, you define them once and reference them by name.

\`\`\`tsx
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,  // delay each child by 0.1s
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

function AnimatedList({ items }: { items: string[] }) {
    return (
        <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {items.map(item => (
                <motion.li key={item} variants={itemVariants}>
                    {item}
                </motion.li>
            ))}
        </motion.ul>
    )
}
\`\`\`

When a parent has \`variants\`, children that also have \`variants\` automatically inherit the \`initial\` and \`animate\` state names — you don't need to repeat them on every child.

---

### Gestures

\`\`\`tsx
// Hover and tap
<motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
    Click me
</motion.button>

// Drag
<motion.div
    drag
    dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
    whileDrag={{ scale: 1.1 }}
    className="draggable"
/>
\`\`\`

---

### Layout animations

Add \`layout\` to a \`motion\` component and it will automatically animate whenever its size or position changes — no manual calculation needed.

\`\`\`tsx
function ExpandableCard({ isExpanded }: { isExpanded: boolean }) {
    return (
        <motion.div layout className={isExpanded ? 'card card--expanded' : 'card'}>
            <motion.h2 layout="position">Title</motion.h2>
            {isExpanded && <p>Extra content that changes the card height.</p>}
        </motion.div>
    )
}
\`\`\`

\`layout="position"\` on the heading tells it to animate its position but not its size — useful for text that shouldn't stretch during the transition.

---

### \`useAnimation\` and programmatic control

When you need to trigger animations imperatively (not just on mount or state change):

\`\`\`tsx
import { motion, useAnimation } from 'framer-motion'

function ShakeOnError() {
    const controls = useAnimation()

    async function handleSubmit() {
        const isValid = validate()
        if (!isValid) {
            await controls.start({
                x: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.4 },
            })
        }
    }

    return (
        <motion.form animate={controls} onSubmit={handleSubmit}>
            {/* ... */}
        </motion.form>
    )
}
\`\`\`

---

### \`useMotionValue\` and \`useTransform\`

For animations driven by scroll position, pointer position, or other continuous values:

\`\`\`tsx
import { motion, useMotionValue, useTransform } from 'framer-motion'

function RotateOnDrag() {
    const x = useMotionValue(0)
    // Map x from [-200, 200] to [-45deg, 45deg]
    const rotate = useTransform(x, [-200, 200], [-45, 45])

    return (
        <motion.div
            drag="x"
            style={{ x, rotate }}
            className="card"
        />
    )
}
\`\`\`

---

### Common gotchas

- **\`AnimatePresence\` needs a \`key\`** — without a stable key, Framer Motion can't tell when an element has been replaced vs. updated, and exit animations won't fire.
- **Don't animate layout properties with \`animate\`** — animating \`width\`, \`height\`, \`top\`, \`left\` with \`animate\` is slow (triggers layout recalculation). Use \`layout\` prop instead, or animate \`scaleX\`/\`scaleY\` for size changes.
- **Spring vs. tween for opacity** — springs don't work well for opacity (they can overshoot past 1 or below 0). Use \`type: 'tween'\` for opacity transitions.
- **Performance** — Framer Motion animates on the main thread by default. For high-frequency animations (scroll-driven, drag), use \`useMotionValue\` + \`style\` prop instead of \`animate\` to bypass React re-renders entirely.
- **Server components** — \`motion\` components are client-only. In Next.js App Router, any file using Framer Motion needs the \`'use client'\` directive.`,
}
