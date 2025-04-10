// This type may vary depending on the specific structure of the API response you are using
export interface Show {
    id: number;
    name: string;
    genres: string[];
    rating: {
        average: number | null;
    };
    image: {
        medium: string;
        original: string;
    } | null;
    summary: string;
}

export interface SearchResult {
    show: Show;
}
