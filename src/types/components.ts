import { Link, File, Project, Skill, Aside, TextSelection } from './index'
import { type UIMessage } from 'ai'

export interface HeaderProps {
    theme: string
    setTheme: (theme: string) => void
    path: string
    linkText: string
}

export interface FileTreeProps {
    theme: string
    files: File[]
    selected: File
    onSelect: (file: File) => void
}

export interface EditorProps {
    theme: string
    file: File
    onCursorChange?: (line: number) => void
    onHighlightChange?: (data: TextSelection) => void
    onContentChange?: (content: string) => void
}

export interface AssistantPanelProps {
    theme: string
    file: File
    cursorLine: number
    fileContent: string
}

export interface AgentContextDisplayProps {
    theme: string
    file: File
    textSelection: TextSelection
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

export interface LoadingIndicatorProps {
    theme: string
    show: boolean
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
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
}

export interface AsideProps {
    type: Aside
    content: string
    link?: Link
}

export interface ScrollTopProps {
    targetId: string
}

export interface StreamingResponseProps {
    messages: UIMessage[]
    fileName?: string
    fileContent?: string
    cursorLine?: number
}
