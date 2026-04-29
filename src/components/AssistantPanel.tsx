import { AssistantProps } from '@/types/components'

export default function AssistantPanel({ theme }: AssistantProps) {
    return (
        <>
            <div className={`bg-${theme}-page text-xs text-${theme}-font p-2`}>
                Assistant
            </div>
        </>
    )
}
