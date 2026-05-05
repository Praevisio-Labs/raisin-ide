import {
    InformationCircleIcon,
    ExclamationTriangleIcon,
    LightBulbIcon,
} from '@heroicons/react/24/outline'
import type { Aside } from '@/types/index'
import { AsideProps } from '@/types/components'

function styleLookup(type: Aside) {
    if (type === 'warning') {
        return {
            border: 'border-amber-400',
            bg: 'bg-amber-950/30',
            label: 'Warning',
            labelColor: 'text-amber-300',
            Icon: ExclamationTriangleIcon,
        }
    }
    if (type === 'tip') {
        return {
            border: 'border-emerald-400',
            bg: 'bg-emerald-950/30',
            label: 'Tip',
            labelColor: 'text-emerald-300',
            Icon: LightBulbIcon,
        }
    }
    return {
        border: 'border-blue-400',
        bg: 'bg-blue-950/30',
        label: 'Note',
        labelColor: 'text-blue-300',
        Icon: InformationCircleIcon,
    }
}

export default function Aside({ type, content, link }: AsideProps) {
    const { border, bg, label, labelColor, Icon } = styleLookup(type)

    return (
        <aside
            className={`
                flex gap-3 px-4 py-3 my-2
                rounded-r-sm border-l-2
                ${border} ${bg}
            `}>
            <Icon className={`flex-none w-4 h-4 mt-0.5 ${labelColor}`} />
            <div className="flex flex-col gap-1 text-sm">
                <span
                    className={`font-semibold text-xs uppercase tracking-wide ${labelColor}`}>
                    {label}
                </span>
                <p className="text-slate-300 leading-relaxed">{content}</p>
                {link && (
                    <a
                        href={link.href}
                        className="underline cursor-pointer text-slate-300">
                        {link.text}
                    </a>
                )}
            </div>
        </aside>
    )
}
