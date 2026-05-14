import { sora, outfit } from '@/app/ui/fonts'
import { ProjectProps } from '@/types/components'
import { skillsData } from '@/data/learn/skills'
import { scrollMask } from '@/app/ui/styles'

import Header from '@/components/Header'
import Skill from '@/components/learn/Skill'
import Markdown from '@/components/Markdown'
import Aside from '@/components/Aside'
import ScrollTop from '@/components/ScrollTop'

export default function Project({
    theme,
    setTheme,
    project,
    onClick,
}: ProjectProps) {
    return (
        <main
            className={`
                flex flex-col w-full h-screen
                bg-page text-font-primary
                overflow-hidden
                `}>
            <Header
                theme={theme}
                setTheme={setTheme}
                path={'/learn'}
                linkText="Modules"
            />
            <div className="flex-none text-center pt-4">
                <h2 className={`${sora.className} text-xl font-bold mb-4`}>
                    {project.name}
                </h2>
            </div>
            <div
                className="flex-1 flex flex-col gap-12 p-3 overflow-y-auto"
                style={scrollMask}>
                <div id="project-overview">
                    <Markdown content={project.overview} />
                </div>
                <Aside
                    type="note"
                    content="The sections below are refreshers on each skill this project uses. If you're already comfortable, feel free to skip ahead."
                    link={{
                        href: '#exercise-instructions',
                        text: 'Jump to exercise instructions',
                    }}
                />
                {project.skills.map((projectSkill) => {
                    const thisSkill = skillsData.find(
                        (skill) => skill.id === projectSkill,
                    )
                    if (!thisSkill) return null
                    return (
                        <Skill
                            key={thisSkill.id}
                            content={thisSkill.content}
                        />
                    )
                })}
                <div id="exercise-instructions">
                    <Markdown content={project.instructions} />
                </div>
                <div className="relative flex justify-center mb-6">
                    <div
                        className={`bg-panel rounded-xl py-[3px] px-[4px] border border-page`}>
                        <button
                            onClick={onClick}
                            className={`
                                border border-accent-bright
                                text-accent-bright
                                ${outfit.className} text-sm
                                px-8 py-3 rounded-lg
                                hover:bg-accent-bright hover:text-header
                                cursor-pointer
                                `}>
                            Start Project
                        </button>
                    </div>
                    <ScrollTop targetId="project-overview" />
                </div>
            </div>
        </main>
    )
}
