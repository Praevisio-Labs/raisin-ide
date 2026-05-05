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

export type File = {
    name: string
    fileType: Language
    content: string
}

export type Project = {
    id: string
    name: string
    description: string
    skills: string[]
    files: File[]
}

export type Skill = {
    id: string
    name: string
    content: string
}
