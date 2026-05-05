import type { SkillProps } from '@/types/components'
import Markdown from '@/components/Markdown'

export default function Skill({ theme, content }: SkillProps) {
    return (
        <div className="flex flex-col gap-2">
            <Markdown theme={theme} content={content} />
        </div>
    )
}
