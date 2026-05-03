import { ModuleProps } from '@/types/components'

export default function ModuleCard({
    theme,
    name,
    description, //
}: ModuleProps) {
    return (
        <div
            className={`
                    flex flex-col gap-4 p-4
                    justify-center items-center
                    w-50 h-50 
                    text-${theme}-font-primary 
                    rounded-lg border-2 border-${theme}-accent-primary 
                    bg-${theme}-card hover:opacity-60
                    cursor-pointer
                    `}>
            <span className="text-2xl font-medium">{name}</span>
            <span className="text-md">{description}</span>
        </div>
    )
}
