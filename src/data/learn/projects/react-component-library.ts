import type { Project } from '@/types/index'

export const reactComponentLibrary: Project = {
    id: 'react-component-library',
    name: 'TypeScript UI Kit',
    description:
        'Build a set of typed, reusable React components — buttons, inputs, modals — with consistent props and Tailwind styling.',
    overview: `## Overview

You'll build a small but production-quality UI kit: a \`Button\`, a controlled \`TextInput\`, and a \`Modal\` — three components that appear in virtually every web app and that expose the full range of component design decisions.

The goal isn't to build a lot of components. It's to build three components well enough that you understand the decisions behind every component library you'll ever use: how props are typed, how variants are expressed, how accessibility is handled, and how a component stays flexible without becoming a configuration nightmare.

This project is specifically well-suited to learning because the components are small enough to hold in your head completely, but rich enough to surface real tradeoffs. A \`Button\` with variants, sizes, loading state, and an icon slot is a surprisingly deep exercise. By the time you've built all three, you'll read third-party component library source code with recognition instead of confusion.`,
    instructions: `## Your Exercise

The starter files give you the component shells and a demo page to render them in.

**\`Button.tsx\`** has the prop type defined and the base JSX structure in place. The \`variant\` and \`size\` props are declared but not wired to any classes. You'll need to:
1. Implement the \`variantClasses\` and \`sizeClasses\` lookup maps and apply them to the button's \`className\`.
2. Add a \`loading\` prop — when true, show a spinner (a simple animated \`<span>\` is fine) and disable the button.
3. Add an \`icon\` prop (\`React.ReactNode\`) that renders to the left of the label when provided.

**\`TextInput.tsx\`** is a controlled input wrapper. The \`value\` and \`onChange\` wiring is done. You'll need to:
1. Add \`label\`, \`error\`, and \`hint\` props and render them in the right positions around the \`<input>\`.
2. Wire the \`error\` prop to change the input's border color and render the error message below.
3. Make sure the \`<label>\` and \`<input>\` are properly associated (matching \`htmlFor\` / \`id\`).

**\`Modal.tsx\`** has the overlay and panel structure but no open/close behavior. You'll need to:
1. Accept an \`isOpen\` prop and conditionally render the modal.
2. Close the modal when the overlay (not the panel) is clicked — think about how to stop the click from propagating.
3. Close the modal when the Escape key is pressed — this requires a \`useEffect\` with a keyboard event listener.

**\`page.tsx\`** is the demo page. It imports all three components and renders them with various prop combinations so you can see them working. Read it first — it tells you exactly what props each component needs to support.

Build in this order: \`Button\` first (simplest), then \`TextInput\`, then \`Modal\`. After each component, check the demo page to confirm it renders correctly before moving on.`,
    outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement** typed React components with variant props, controlled inputs, and portal-based overlays — the three patterns that cover the majority of UI kit components.
- **Understand** why component libraries make the design decisions they do: prop naming conventions, the separation of visual variants from semantic meaning, and why accessibility attributes aren't optional.
- **Recognize** the same patterns in third-party libraries like shadcn/ui, Radix, and Headless UI — and read their source code with enough context to extend or debug them.`,
    skills: ['react', 'typescript', 'tailwind'],
    domains: ['frontend'],
    level: 'Intermediate',
    duration: '8 hrs',
    teachers: ['montessori'],
    isReleased: true,
    files: [
        {
            name: 'lib/cn.ts',
            fileType: 'typescript',
            content: `// Utility for conditionally joining class names.
// TODO: Implement a function that takes any number of arguments,
// filters out falsy values (false, null, undefined, ''),
// and joins the remaining strings with spaces.
//
// Example usage:
//   cn('base-class', isActive && 'active', 'another-class')
//   → 'base-class active another-class' (if isActive is true)
//   → 'base-class another-class' (if isActive is false)

export function cn(...inputs: (string | boolean | null | undefined)[]): string {
    // TODO: implement
    return ''
}
`,
        },
        {
            name: 'app/page.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Modal } from '@/components/Modal'

// Demo page — complete, no TODOs. This file shows you exactly what props
// each component needs to support. Read it first before implementing the components.
export default function DemoPage() {
    const [inputValue, setInputValue] = useState('')
    const [inputError, setInputError] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl space-y-12">
                <h1 className="text-3xl font-bold text-gray-900">UI Kit Demo</h1>

                {/* Button variants */}
                <section>
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Buttons</h2>
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                            <Button label="Primary" variant="primary" />
                            <Button label="Secondary" variant="secondary" />
                            <Button label="Ghost" variant="ghost" />
                            <Button label="Destructive" variant="destructive" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button label="Small" size="sm" />
                            <Button label="Medium" size="md" />
                            <Button label="Large" size="lg" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button label="Loading" loading />
                            <Button label="Disabled" disabled />
                            <Button
                                label="With icon"
                                icon={<span>→</span>}
                                variant="primary"
                            />
                        </div>
                    </div>
                </section>

                {/* Text inputs */}
                <section>
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Text Inputs</h2>
                    <div className="max-w-md space-y-4">
                        <TextInput
                            value={inputValue}
                            onChange={setInputValue}
                            label="Email"
                            placeholder="you@example.com"
                            type="email"
                        />
                        <TextInput
                            value={inputValue}
                            onChange={setInputValue}
                            label="Password"
                            type="password"
                            hint="At least 8 characters"
                        />
                        <TextInput
                            value={inputValue}
                            onChange={(v) => {
                                setInputValue(v)
                                setInputError(v.length < 3 ? 'Too short' : '')
                            }}
                            label="Username"
                            error={inputError}
                        />
                        <TextInput
                            value=""
                            onChange={() => {}}
                            label="Disabled"
                            disabled
                        />
                    </div>
                </section>

                {/* Modal */}
                <section>
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Modal</h2>
                    <Button
                        label="Open modal"
                        onClick={() => setIsModalOpen(true)}
                        variant="primary"
                    />
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Example Modal"
                    >
                        <p className="text-sm text-gray-600">
                            This modal should close when you click the overlay, click the X
                            button, or press Escape.
                        </p>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button
                                label="Cancel"
                                variant="ghost"
                                onClick={() => setIsModalOpen(false)}
                            />
                            <Button
                                label="Confirm"
                                variant="primary"
                                onClick={() => setIsModalOpen(false)}
                            />
                        </div>
                    </Modal>
                </section>
            </div>
        </main>
    )
}
`,
        },
        {
            name: 'components/Button.tsx',
            fileType: 'typescript',
            content: `'use client'

import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = {
    label: string
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
    disabled?: boolean
    icon?: React.ReactNode
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
}

// TODO: Define variantClasses — a map from ButtonVariant to a Tailwind class string.
// Each variant should have distinct background, text, and hover colors.
// Example shape: const variantClasses: Record<ButtonVariant, string> = { primary: '...', ... }

// TODO: Define sizeClasses — a map from ButtonSize to padding and text-size classes.

export function Button({
    label,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon,
    onClick,
    type = 'button',
}: ButtonProps) {
    const isDisabled = disabled || loading

    // TODO: Combine variantClasses[variant], sizeClasses[size], and base classes
    // into a single className string. Include a disabled:opacity-50 class for
    // the disabled state.
    const className = 'inline-flex items-center gap-2 rounded font-medium transition-colors'

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={className}
        >
            {/* TODO: Render a loading spinner when loading is true.
                A simple <span> with an animate-spin border class works well.
                When not loading, render the icon prop if provided. */}
            {label}
        </button>
    )
}
`,
        },
        {
            name: 'components/TextInput.tsx',
            fileType: 'typescript',
            content: `'use client'

import React, { useId } from 'react'

type TextInputProps = {
    value: string
    onChange: (value: string) => void
    label?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    type?: 'text' | 'email' | 'password' | 'search'
}

export function TextInput({
    value,
    onChange,
    label,
    placeholder,
    hint,
    error,
    disabled = false,
    type = 'text',
}: TextInputProps) {
    // useId generates a stable unique ID for associating label and input.
    // This is important for accessibility — screen readers use the association
    // to announce the label when the input is focused.
    const id = useId()

    // TODO: Build the input's border className. It should use a red border
    // when error is truthy, and a normal gray border otherwise.
    const inputClassName = [
        'w-full rounded border px-3 py-2 text-sm outline-none transition-colors',
        'focus:ring-2',
        disabled ? 'cursor-not-allowed opacity-50' : '',
        // TODO: add conditional error/normal border classes here
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div className="flex flex-col gap-1">
            {/* TODO: Render the label element if the label prop is provided.
                Use htmlFor={id} to associate it with the input below. */}

            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClassName}
                aria-invalid={!!error}
                aria-describedby={error ? \`\${id}-error\` : hint ? \`\${id}-hint\` : undefined}
            />

            {/* TODO: Render the error message if error is truthy.
                Give it id={\`\${id}-error\`} so aria-describedby works.
                Render the hint if hint is truthy and there's no error.
                Give it id={\`\${id}-hint\`}. */}
        </div>
    )
}
`,
        },
        {
            name: 'components/Modal.tsx',
            fileType: 'typescript',
            content: `'use client'

import React, { useEffect } from 'react'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    // TODO: Add a useEffect that listens for the Escape key and calls onClose.
    // Remember to clean up the event listener when the component unmounts
    // or when isOpen changes.

    // TODO: Return null when isOpen is false so the modal isn't in the DOM.

    return (
        // The overlay — clicking it should close the modal.
        // The onClick here will fire for clicks on the overlay AND the panel
        // (because of event bubbling). You'll need to stop propagation on
        // the panel's onClick to prevent the panel click from closing the modal.
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* The panel — clicks here should NOT close the modal */}
            <div
                className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
                onClick={/* TODO: stop propagation */ undefined}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 id="modal-title" className="text-lg font-semibold">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
`,
        },
    ],
}
