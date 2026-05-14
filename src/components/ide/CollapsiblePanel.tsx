'use client'

import { CollapsiblePanelProps } from '@/types/components'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function CollapsiblePanel({
    title,
    children,
    isOpen,
    onToggle,
    className = '',
}: CollapsiblePanelProps) {
    return (
        <section className={`flex flex-col ${className}`}>
            <button
                type="button"
                onClick={onToggle}
                className="flex h-9 w-full items-center justify-between bg-header px-2 text-[10px] uppercase tracking-wider text-font-apex md:hidden">
                <span>{title}</span>
                <ChevronDownIcon
                    className={`size-4 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            <div
                className={`
                    ${isOpen ? 'flex' : 'hidden'}
                    flex-1 min-h-0 
                    md:flex md:h-full
                    max-md:[&>*:first-child]:hidden
                    flex-col 
                `}>
                {children}
            </div>
        </section>
    )
}
