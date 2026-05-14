import type { Project } from '@/types/index'

export const animationPlayground: Project = {
    id: 'animation-playground',
    name: 'Animation Playground',
    description:
        'Explore motion principles by building interactive UI experiments with transitions, gestures, and staged reveals.',
    overview: `## Overview

You'll build three self-contained animation experiments on a single page: a staggered list reveal, a draggable card with physics, and a modal with an enter/exit transition. Each experiment is small enough to finish in an hour, but each one teaches a distinct concept in Framer Motion.

Animation is one of those skills that's easy to cargo-cult — copy a snippet, tweak the numbers, move on. This project is designed to break that habit. By building each experiment from a partial scaffold, you'll have to reason about *why* the animation works, not just *that* it works. The stagger experiment forces you to understand variants and parent-child propagation. The drag experiment forces you to understand motion values. The modal experiment forces you to understand \`AnimatePresence\` and exit animations.

The project is well-suited to beginners because the feedback loop is immediate and visual — you can see exactly what your code is doing, which makes it much easier to build intuition than in a purely logical domain.`,
    instructions: `## Your Exercise

The starter files give you the page layout and the three experiment shells. Each experiment has its structure in place but the animation props are missing or incomplete.

**\`StaggerList.tsx\`** renders a list of items that should animate in one by one when the component mounts. The \`motion.ul\` and \`motion.li\` elements are in place. You'll need to:
1. Define \`containerVariants\` with \`hidden\` and \`visible\` states. The \`visible\` state should include a \`staggerChildren\` transition.
2. Define \`itemVariants\` with \`hidden\` (opacity 0, shifted down) and \`visible\` (opacity 1, in place) states.
3. Apply the variants to the \`motion.ul\` and \`motion.li\` elements with \`initial\` and \`animate\` props.

**\`DraggableCard.tsx\`** renders a card the user can drag. The \`motion.div\` is in place. You'll need to:
1. Add the \`drag\` prop and \`dragConstraints\` to limit how far the card can be dragged.
2. Add \`whileDrag\` to scale the card up slightly while it's being dragged.
3. Use \`useMotionValue\` and \`useTransform\` to rotate the card based on its horizontal position — cards should tilt in the direction they're dragged.

**\`TransitionModal.tsx\`** renders a button that opens a modal. The open/close state is already wired. You'll need to:
1. Wrap the conditional modal render in \`AnimatePresence\`.
2. Add \`initial\`, \`animate\`, and \`exit\` props to the overlay and the panel — they should animate independently (overlay fades, panel scales and fades).
3. Make sure the \`key\` prop is set correctly on the animated element inside \`AnimatePresence\`.

Build in this order: \`StaggerList\` first (introduces variants), then \`DraggableCard\` (introduces motion values), then \`TransitionModal\` (introduces \`AnimatePresence\`).`,
    outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement** the three core Framer Motion patterns — variant-based orchestration, gesture-driven motion values, and \`AnimatePresence\` exit animations — from a partial scaffold without copying from documentation.
- **Understand** why Framer Motion's abstractions exist: what problem variants solve over inline animation props, why \`AnimatePresence\` is necessary for exit animations, and why motion values bypass React re-renders.
- **Recognize** these same patterns in production UIs — the stagger on a search results list, the spring on a drag-to-dismiss card, the fade on a toast notification — and know how to replicate them.`,
    skills: ['react', 'framer-motion'],
    domains: ['frontend'],
    level: 'Beginner',
    duration: '6 hrs',
    teachers: ['nietzsche', 'montessori'],
    isReleased: true,
    files: [
        {
            name: 'app/globals.css',
            fileType: 'css',
            content: `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
        },
        {
            name: 'app/page.tsx',
            fileType: 'typescript',
            content: `'use client'

import { StaggerList } from '@/components/StaggerList'
import { DraggableCard } from '@/components/DraggableCard'
import { TransitionModal } from '@/components/TransitionModal'

// Entry point — renders all three animation experiments.
// This file is complete — no TODOs.
export default function AnimationPlaygroundPage() {
    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">Animation Playground</h1>
                <p className="text-gray-600">
                    Three experiments exploring Framer Motion patterns: variants, gestures, and
                    exit animations.
                </p>

                <StaggerList />
                <DraggableCard />
                <TransitionModal />
            </div>
        </main>
    )
}
`,
        },
        {
            name: 'components/StaggerList.tsx',
            fileType: 'typescript',
            content: `'use client'

import { motion } from 'framer-motion'

const ITEMS = [
    'Design the system',
    'Write the tests',
    'Ship the feature',
    'Measure the impact',
    'Iterate',
]

// TODO: Define containerVariants.
// It needs two states: 'hidden' and 'visible'.
// The 'visible' state should have a transition with staggerChildren
// so each list item animates in with a delay after the previous one.
const containerVariants = {}

// TODO: Define itemVariants.
// 'hidden': opacity 0, shifted down by ~20px (use y: 20)
// 'visible': opacity 1, y: 0
// Add a transition to 'visible' — a short tween or spring works well.
const itemVariants = {}

export function StaggerList() {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Stagger Reveal</h2>
            {/* TODO: Add variants, initial, and animate props to motion.ul */}
            <motion.ul className="space-y-2">
                {ITEMS.map((item) => (
                    // TODO: Add variants prop to motion.li
                    // Because the parent has variants, you don't need to repeat
                    // initial/animate here — they're inherited automatically.
                    <motion.li
                        key={item}
                        className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700"
                    >
                        {item}
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    )
}
`,
        },
        {
            name: 'components/DraggableCard.tsx',
            fileType: 'typescript',
            content: `'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'

export function DraggableCard() {
    // useMotionValue creates a value that can drive animations without
    // triggering React re-renders. x tracks the card's horizontal position.
    const x = useMotionValue(0)

    // TODO: Use useTransform to map x to a rotation value.
    // When x is -150, rotate to about -15 degrees.
    // When x is 0, rotate to 0 degrees.
    // When x is 150, rotate to about 15 degrees.
    // Hint: useTransform(x, inputRange, outputRange)
    const rotate = useMotionValue(0) // replace this with useTransform

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Drag Me</h2>
            <div className="flex h-48 items-center justify-center">
                <motion.div
                    // TODO: Add drag="x" to constrain dragging to the horizontal axis.
                    // Add dragConstraints to limit the range (e.g. left: -150, right: 150).
                    // Add whileDrag={{ scale: 1.05 }} so the card grows slightly when grabbed.
                    style={{ x, rotate }}
                    className="flex h-32 w-48 cursor-grab items-center justify-center
                               rounded-xl bg-gradient-to-br from-violet-500 to-purple-700
                               text-white shadow-lg active:cursor-grabbing"
                >
                    <p className="text-sm font-medium">Drag me sideways</p>
                </motion.div>
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">
                The card tilts as you drag — that's useTransform at work.
            </p>
        </div>
    )
}
`,
        },
        {
            name: 'components/TransitionModal.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function TransitionModal() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Enter / Exit Transition</h2>
            <button
                onClick={() => setIsOpen(true)}
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
                Open modal
            </button>

            {/* TODO: Wrap the conditional render below in <AnimatePresence>.
                AnimatePresence keeps the element mounted until its exit animation
                finishes — without it, the exit animation never runs because React
                removes the element from the DOM immediately. */}

            {isOpen && (
                // The overlay — give it initial/animate/exit for a fade.
                // key="overlay" is required so AnimatePresence can track it.
                <motion.div
                    key="overlay"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setIsOpen(false)}
                    // TODO: initial={{ opacity: 0 }}, animate={{ opacity: 1 }}, exit={{ opacity: 0 }}
                >
                    {/* The panel — give it its own initial/animate/exit.
                        Stop click propagation so clicking the panel doesn't close the modal. */}
                    <motion.div
                        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                        // TODO: Animate the panel with scale + opacity.
                        // initial: opacity 0, scale 0.95
                        // animate: opacity 1, scale 1
                        // exit: opacity 0, scale 0.95
                        // Add a short transition (0.15–0.2s tween)
                    >
                        <h3 className="text-lg font-semibold">Hello from the modal</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            This modal fades and scales in — and out. The exit animation
                            only works because AnimatePresence is wrapping the render.
                        </p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}
`,
        },
    ],
}
