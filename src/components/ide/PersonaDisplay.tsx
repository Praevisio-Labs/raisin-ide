import { PersonaDisplayProps } from '@/types/components'

export default function PersonaDisplay({
    selectedPersona,
}: PersonaDisplayProps) {
    return (
        <div className="w-full flex justify-center p-0 md:p-2">
            <span
                className={`italic text-[10px] text-font-paragraph opacity-60`}>
                {selectedPersona.description.long}
            </span>
        </div>
    )
}
