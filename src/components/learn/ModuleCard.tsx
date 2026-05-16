import { RocketLaunchIcon, ClockIcon } from '@heroicons/react/24/outline'
import { ModuleProps } from '@/types/components'
import { domainLabels, skillLabels, projectIcons } from '@/data/lookups'

export default function ModuleCard({ project, onClick }: ModuleProps) {
    const isComingSoon = project.isReleased === false
    const cardStateClasses = isComingSoon
        ? 'opacity-70 cursor-default'
        : 'hover:opacity-60 cursor-pointer'
    const ProjectIcon = projectIcons[project.id] ?? RocketLaunchIcon

    return (
        <div
            onClick={isComingSoon ? undefined : onClick}
            className={`
                    flex flex-col gap-4 p-6
                    w-full min-w-0
                    rounded-lg border-1 border-accent-muted
                    bg-panel
                    text-font-paragraph
                    ${cardStateClasses}
                    `}>
            <div className="flex items-start md:gap-8">
                <div className="hidden md:flex size-14 shrink-0 items-center justify-center rounded-xl border-1 border-accent-bright bg-accent-contra">
                    <ProjectIcon className="size-6 text-font-primary" />
                </div>

                <div className="flex-1 min-w-0">
                    {/* Mobile: icon + level/duration cluster, justify-between */}
                    <div className="flex md:hidden items-center justify-between">
                        <div className="size-10 shrink-0 flex items-center justify-center rounded-xl border-1 border-accent-bright bg-accent-contra">
                            <ProjectIcon className="size-4 text-font-primary" />
                        </div>
                        <div className="flex items-center gap-3">
                            <strong className="rounded-sm border border-accent-muted px-3 py-1.5 text-[10px] font-medium text-font-secondary">
                                {project.level}
                            </strong>
                            <div className="flex items-center gap-1 text-font-secondary">
                                <ClockIcon
                                    className="size-4"
                                    aria-hidden="true"
                                />
                                <span className="text-xs font-medium">
                                    {project.duration}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop: level + duration spread across full width */}
                    <div className="hidden md:flex items-center justify-between">
                        <strong className="rounded-sm border border-accent-muted px-3 py-1.5 text-xs font-medium text-font-secondary">
                            {project.level}
                        </strong>
                        <div className="flex items-center gap-1 text-font-secondary">
                            <ClockIcon className="size-4" aria-hidden="true" />
                            <span className="text-xs font-medium">
                                {project.duration}
                            </span>
                        </div>
                    </div>

                    <h3 className="mt-4 text-lg font-medium text-font-apex md:text-xl">
                        {project.name}
                    </h3>

                    <p className="mt-1 line-clamp-3 text-sm text-pretty text-font-paragraph">
                        {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1">
                        {project.domains.map((domain) => (
                            <span
                                key={domain}
                                className="rounded-full border border-accent-muted px-2.5 py-0.5 text-xs whitespace-nowrap text-font-secondary">
                                {domainLabels[domain] ?? domain}
                            </span>
                        ))}
                        {project.skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full border border-accent-muted px-2.5 py-0.5 text-xs whitespace-nowrap text-font-secondary">
                                {skillLabels[skill] ?? skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
