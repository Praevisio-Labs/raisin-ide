import { DashboardProps } from '@/types/components'
import { projectData } from '@/data/learn/project-modules'

import Header from '@/components/Header'
import ModuleCard from '@/components/learn/ModuleCard'

export default function Dashboard({
    theme,
    setTheme,
    onClick,
}: DashboardProps) {
    const project = projectData[0]

    return (
        <main
            className={`flex flex-col w-full h-screen bg-page overflow-hidden`}>
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
            <div className="flex-1 flex justify-center items-center gap-5">
                {projectData.map((project) => (
                    <ModuleCard
                        key={project.id}
                        project={project}
                        onClick={() => onClick(project.id)}
                    />
                ))}
            </div>
        </main>
    )
}
