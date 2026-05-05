import { ArrowUpIcon } from '@heroicons/react/20/solid'
import {ScrollTopProps} from '@/types/components'

export default function ScrollTop({ targetId }: ScrollTopProps) {
    return (
        <a
            href={`#${targetId}`}
            className="absolute inset-y-0 right-5 flex items-center text-xs text-slate-400 hover:text-slate-300 underline cursor-pointer transition-colors">
            <ArrowUpIcon className="h-4 w-5" />
            Back to top
        </a>
    )
}
