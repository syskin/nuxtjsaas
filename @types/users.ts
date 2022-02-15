export type UserInformation = {
    email?: string
    lastModified?: number
    created?: number
    sub?: string
    subscription?: string
    status?: string
    period?: {
        start: number
        end: number
    }
    active_plan?: string
    isSubscribed?: boolean
}

export type UserInformationToCheck = {
    email: string
    sub: string
}

export type CheckProperties = {
    sub: string
    email: string
}