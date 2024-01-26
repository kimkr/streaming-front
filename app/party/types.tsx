export type ImageType = {
    id: number;
    filename: string;
    thumb_url: string;
    mime: string;
}

export type PartyApplicationType = {
    id: number;
    status: number;
    before_level?: number;
    after_level?: number;
    member?: {
        id: number;
        level: number;
        profile_image: ImageType;
        nickname: string;
        user: {
            id: number;
            email: string;
            is_active: boolean;
        }
        fandom: {
            id: number;
            title: string;
            image: ImageType;
            artist: {
                id: number;
                name: string;
                image: ImageType;
            }
        }
    }
}