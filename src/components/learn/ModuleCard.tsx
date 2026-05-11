import { ModuleProps } from '@/types/components'
import { teachers } from '@/data/learn/teachers'
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function ModuleCard({ project, onClick }: ModuleProps) {
    const teacherId = project.teachers[0]
    const teacher = teachers.find((person) => person.id === teacherId)
    const isComingSoon = project.comingSoon === true
    const cardStateClasses = isComingSoon
        ? 'opacity-70 cursor-default'
        : 'hover:opacity-60 cursor-pointer'

    return (
        <div
            onClick={isComingSoon ? undefined : onClick}
            className={`
                    flex flex-col gap-4 p-6
                    w-full min-w-0
                    text-font-primary
                    rounded-lg border-2 border-accent-muted
                    bg-input
                    ${cardStateClasses}
                    `}>
            {/* Original boilerplate from HyperUI - https://hyperui.dev/components/marketing/cards/*/}
            <div className="w-full sm:flex sm:items-start sm:justify-between sm:gap-4 lg:gap-6">
                <div className="sm:order-last sm:shrink-0">
                    <img
                        alt={`Image of ${teacher?.name ?? 'Teacher'}`}
                        src={teacher?.avatar}
                        className="size-20 rounded-full object-cover"
                    />
                </div>

                <div className="mt-4 sm:mt-0 sm:flex-1">
                    <h3 className="text-lg font-medium text-pretty text-font-apex">
                        {project.name}
                    </h3>

                    <p className="mt-1 text-sm text-font-paragraph">
                        By {teacher?.name ?? 'Unknown Teacher'}
                    </p>

                    <p className="mt-4 line-clamp-2 text-sm text-pretty text-font-paragraph">
                        {project.description}
                    </p>
                </div>
            </div>

            {isComingSoon ? (
                <div className="mt-auto flex items-center gap-2 text-xs text-font-secondary">
                    <ClockIcon
                        className="size-5 text-font-secondary"
                        aria-hidden="true"
                    />
                    <span>Coming soon...</span>
                </div>
            ) : (
                <div className="mt-auto flex items-center gap-4 text-xs text-font-secondary">
                    <div className="flex items-center gap-2">
                        <CalendarDaysIcon
                            className="size-5 text-font-secondary"
                            aria-hidden="true"
                        />
                        <span>April 21, 2026</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <ClockIcon
                            className="size-5 text-font-secondary"
                            aria-hidden="true"
                        />
                        <span>92 minutes</span>
                    </div>
                </div>
            )}
        </div>
    )
}
