export type TCharBasic = {
    id: number
    name: string
}

export type TCharCard = TCharBasic & TThumbnail

export type TThumbnail = {
    thumbnail: {
        path: string
        extension: string
    }
}

export type TCharDetail = TCharCard & {
    description: string
}

export type TComicInfo = TThumbnail & {
    id: number
    title: string
    year: number
}

export type TCharIdParam = {
    id: string
}
