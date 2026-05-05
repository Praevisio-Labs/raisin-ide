import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/stackoverflow-light.css'
import { manrope } from '@/app/ui/fonts'
import type { SkillProps } from '@/types/components'

export default function Skill({ theme, name, content }: SkillProps) {
    return (
        <div className="flex flex-col gap-2">
            <h1
                className={`${manrope.className} text-lg font-semibold text-${theme}-font-tertiary`}>
                {name}
            </h1>
            <div
                className={`
                    prose prose-sm max-w-none
                    prose-p:text-${theme}-font-secondary
                    prose-headings:text-${theme}-font-tertiary
                    prose-strong:text-${theme}-font-primary
                    prose-code:text-${theme}-accent-primary
                    prose-li:text-${theme}-font-secondary
                    prose-a:text-${theme}-accent-primary
                `}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}
