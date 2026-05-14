import { DashboardProps } from '@/types/components'
import { projectData } from '@/data/learn/projects'

import Header from '@/components/Header'
import ModuleCard from '@/components/learn/ModuleCard'

export default function Dashboard({
    theme,
    setTheme,
    onClick,
}: DashboardProps) {
    return (
        <main
            className={`flex flex-col w-full h-screen bg-panel overflow-hidden`}>
            <Header
                theme={theme}
                setTheme={setTheme}
                path={'/'}
                linkText="Editor"
            />
            <div className="flex-none p-6 overflow-auto">
                <h2
                    className={`text-font-tertiary text-4xl font-semibold mb-4`}>
                    Project Modules
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {projectData.map((project) => (
                        <ModuleCard
                            key={project.id}
                            project={project}
                            onClick={() => onClick(project.id)}
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}
