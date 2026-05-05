import { sora, outfit } from '@/app/ui/fonts'
import { ProjectProps } from '@/types/components'
import { skillsData } from '@/data/skill-modules'
import { scrollMask } from '@/app/ui/styles'

import Header from '@/app/ui/Header'
import Skill from '@/app/ui/learn/Skill'
import Markdown from '@/app/ui/Markdown'
import Aside from '@/app/ui/Aside'

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
                bg-${theme}-gap text-${theme}-font-primary 
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
                    <Markdown theme={theme} content={project.overview} />
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
                            theme={theme}
                            content={thisSkill.content}
                        />
                    )
                })}
                <div id="exercise-instructions">
                    <Markdown theme={theme} content={project.instructions} />
                </div>
                <div className="relative flex justify-center mb-6">
                    <div
                        className={`bg-${theme}-panel rounded-xl py-[3px] px-[4px] border border-${theme}-gap`}>
                        <button
                            onClick={onClick}
                            className={`
                                border border-${theme}-accent-primary
                                text-${theme}-accent-primary
                                ${outfit.className} text-sm
                                px-8 py-3 rounded-lg
                                hover:bg-${theme}-accent-primary hover:text-${theme}-page
                                cursor-pointer
                                `}>
                            Start Project
                        </button>
                    </div>
                    <a
                        href="#project-overview"
                        className="absolute inset-y-0 right-10 flex items-center text-xs text-slate-400 underline cursor-pointer">
                        Back to top
                    </a>
                </div>
            </div>
        </main>
    )
}
