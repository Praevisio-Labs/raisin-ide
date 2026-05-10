export type Language =
    | 'typescript'
    | 'javascript'
    | 'python'
    | 'java'
    | 'html'
    | 'css'
    | 'markdown'
    | 'json'
    | 'sql'

export type Link = {
    href: string
    text: string
}

export type File = {
    name: string
    fileType: Language
    content: string
}

export type Project = {
    id: string
    name: string
    description: string
    overview: string
    instructions: string
    outcomes: string
    skills: string[]
    files: File[]
}

export type Skill = {
    id: string
    name?: string
    content: string
}

export type Aside = 'note' | 'warning' | 'tip'

export type TextSelection = {
    isActive: boolean
    content: string
    start: number
    end: number
}

export interface Persona {
    id: number
    key: 'socrates' | 'plato' | 'aristotle' | 'epictetus' | 'pliny'
    name: string
    avatar: string
    description: {
        short: string
        long: string
    }
}

export interface Model {
    name: string
    modelId: string
    description: {
        short: string
        medium: string
        long: string
    }
}
