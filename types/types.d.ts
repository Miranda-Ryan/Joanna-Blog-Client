export type Category = {
    _id: string,
    title: string,
    slug: {
        current: string
    },
    image: object
}

export type PostCategory = {
    _id: string,
    title: string,
    _createdAt?: string,
    slug: {
        current: string
    },
    author: {
        name: string,
        image: string
    },
    category: {
        title: string
    },
    mainImage: string,
    body: [object],
    estimatedReadingTime: number,
    estimatedWordCount: number,
    numberOfCharacters: number
}

export type Author = {
    _id: string,
    name: string,
    slug: {
        current: string
    },
    email: string,
    linkedin: string,
    image: object,
    bio: [object]
}