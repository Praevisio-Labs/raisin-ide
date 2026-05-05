import { manrope } from '@/app/ui/fonts'
import type { SkillProps } from '@/types/components'

export default function Skill({ theme, name, content }: SkillProps) {
    return (
        <div className="flex flex-col text-lg font-semibold gap-2">
            <h1 className={`${manrope.className} text-${theme}-font-tertiary`}>
                {name}
            </h1>
            <div className="text-sm font-normal">{content}</div>
        </div>
    )
}
