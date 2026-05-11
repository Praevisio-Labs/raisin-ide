import { ModuleProps } from '@/types/components'
import { teachers } from '@/data/learn/teachers'
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function ModuleCard({ project, onClick }: ModuleProps) {
    const teacherId = project.teachers[0]
    const teacher = teachers.find((person) => person.id === teacherId)

    return (
        <div
            onClick={onClick}
            className={`
                    flex flex-col gap-4 p-6
                    w-full min-w-0
                    text-font-primary
                    rounded-lg border-2 border-accent-bright
                    bg-highlight hover:opacity-60
                    cursor-pointer
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
                    <h3 className="text-lg font-medium text-pretty text-gray-900">
                        {project.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-700">
                        By {teacher?.name ?? 'Unknown Teacher'}
                    </p>

                    <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
                        {project.description}
                    </p>
                </div>
            </div>

            <div className="mt-auto flex items-center gap-4 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                    <CalendarDaysIcon
                        className="size-5 text-gray-700"
                        aria-hidden="true"
                    />
                    <span>31/06/2025</span>
                </div>

                <div className="flex items-center gap-2">
                    <ClockIcon
                        className="size-5 text-gray-700"
                        aria-hidden="true"
                    />
                    <span>12 minutes</span>
                </div>
            </div>
        </div>
    )
}
