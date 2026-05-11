import { type UIMessage } from 'ai'
import {
    Link,
    File,
    Project,
    Skill,
    Aside,
    TextSelection,
    Persona,
    Model,
} from './index'

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
}

export interface EditorProps {
    theme: string
    file: File
    onCursorChange?: (line: number) => void
    onHighlightChange?: (data: TextSelection) => void
    onContentChange?: (content: string) => void
}

export interface AssistantPanelProps {
    file: File
    cursorLine: number
    fileContent: string
    textSelection: TextSelection
    isContextHidden: boolean
    setIsContextHidden: (value: boolean) => void
}

export interface PersonaDisplayProps {
    selectedPersona: Persona
}

export interface ChatDisplayProps {
    messages: UIMessage[]
    status: string
}

export interface ChatInputProps {
    status: string
    input: string
    setInput: (value: string) => void
    sendMessage: (message: { text: string }, options: { body: any }) => void
    file: File
    fileContent: string
    cursorLine: number
    textSelection: TextSelection
    isContextHidden: boolean
    setIsContextHidden: (value: boolean) => void
    selectedPersona: Persona
    selectedModel: Model
    setSelectedModel: (value: Model) => void
}

export interface ContextSelectProps {
    file: File
    textSelection: TextSelection
    isContextHidden: boolean
    setIsContextHidden: (value: boolean) => void
}

export interface PersonaSelectProps {
    selectedPersona: Persona
    setSelectedPersona: (value: Persona) => void
}

export interface ModelSelectProps {
    selectedModel: Model
    setSelectedModel: (value: Model) => void
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
    show: boolean
}

export interface ModuleProps {
    project: Project
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
    name?: string
    content: string
}

export interface MarkdownProps {
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
    selectedPersona: Persona
}
