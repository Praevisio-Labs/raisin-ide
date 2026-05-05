import { Link, File, Project, Skill, Aside } from './index'

export interface HeaderProps {
    theme: string
    setTheme: (theme: string) => void
    path: string
    linkText: string
}

export interface FileTreeProps {
    files: File[]
    selected: File
    onSelect: (file: File) => void
    theme: string
}

export interface EditorProps {
    file: File
    theme: string
}

export interface AssistantProps {
    theme: string
}

export interface ThemeProps {
    theme: string
    setTheme: (theme: string) => void
}

export interface LogoProps {
    className?: string
    style?: React.CSSProperties
}

export interface FileIconProps {
    fileType: string
}

export interface TypingIndicatorProps {
    theme: string
}

export interface ModuleProps {
    theme: string
    id?: string
    name?: string
    description?: string
    skills?: string[]
    files?: File[]
    onClick: () => void
}

export interface DashboardProps {
    theme: string
    setTheme: (theme: string) => void
    onClick: (id: string) => void
}

export interface ProjectProps {
    theme: string
    setTheme: (theme: string) => void
    project: Project
    onClick: () => void
}

export interface SkillProps {
    theme: string
    name?: string
    content: string
}

export interface MarkdownProps {
    theme: string
    content: string
}

export interface AsideProps {
    type: Aside
    content: string
    link?: Link
}

export interface ScrollTopProps {
    targetId: string
}
