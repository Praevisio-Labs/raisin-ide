import { File } from './index'

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
