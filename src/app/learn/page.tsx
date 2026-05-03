'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { sora, ibmPlexMono, manrope } from '@/app/ui/fonts'
import ThemeSelect from '@/components/ThemeSelect'
import ModuleCard from '@/components/ModuleCard'
import { projectData, skillsData } from '@/data/modules'

export default function Page() {
    const [theme, setTheme] = useState('raisin')
    const searchParams = useSearchParams()
    const router = useRouter()
    const moduleID = searchParams.get('module')
    const project = moduleID
        ? projectData.find((proj) => proj.id === moduleID)
        : null

    const header = (
        <div className={`flex justify-between bg-${theme}-page p-2`}>
            <h1 className={`${sora.className} text-2xl`}>Raisin.IDE</h1>
            <ThemeSelect theme={theme} setTheme={setTheme} />
        </div>
    )

    return project ? (
        <main
            className={`
                flex flex-col w-full h-screen
                bg-${theme}-gap text-${theme}-font-primary 
                overflow-hidden
                `}>
            {header}
            <div className="flex-none p-2">
                <h2
                    className={`${ibmPlexMono.className} text-xl font-bold mb-4`}>
                    {project.name}
                </h2>
            </div>
            <div className="flex-1 flex flex-col gap-12 p-3">
                {project.skills.map((projectSkill, index) => {
                    const thisSkill = skillsData.find(
                        (skill) => skill.id === projectSkill,
                    )
                    return (
                        <div
                            key={index}
                            className="flex flex-col text-lg font-semibold gap-2">
                            <h1
                                className={`${manrope.className} text-${theme}-font-tertiary`}>
                                {thisSkill?.name}
                            </h1>
                            <div className="text-sm font-normal">{`<Content/>`}</div>
                        </div>
                    )
                })}
            </div>
            <button onClick={() => router.push(`/?module=${project.id}`)}>
                Start Project
            </button>
        </main>
    ) : (
        <main
            className={`flex flex-col w-full h-screen bg-${theme}-gap overflow-hidden`}>
            {header}
            <div className="flex-none p-6 overflow-auto">
                <h2
                    className={`text-${theme}-font-tertiary text-4xl font-semibold mb-4`}>
                    Project Modules
                </h2>
            </div>
            <div className="flex-1 flex justify-center items-center gap-5">
                {projectData.map((project, index) => (
                    <ModuleCard
                        key={index}
                        theme={theme}
                        name={project.name}
                        description={project.description}
                        onClick={() =>
                            router.push(`/learn/?module=${project.id}`)
                        }
                    />
                ))}
            </div>
        </main>
    )
}
