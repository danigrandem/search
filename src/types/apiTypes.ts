// This type may vary depending on the specific structure of the API response you are using
export interface Show {
    id: number;
    name: string;
    summary: string;
    image?: {
        medium: string;
        original: string;
    };
    genres: string[];
    rating: {
        average: number | null;
    };
    status: string;
    premiered: string;
    network?: {
        name: string;
    };
    schedule: {
        time: string;
        days: string[];
    };
}

export interface SearchResult {
    score: number;
    show: Show;
}
