// This type may vary depending on the specific structure of the API response you are using
export interface Show {
    adult: boolean,
    backdrop_path: string,
    genre_ids: [number],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    genres?: Genre[],
    status?: string
}

export interface SearchResult {
    page: number,
    results: [Show],
    total_pages: number,
    total_results: number
}

export interface Genre {
    id: number,
    name: string
}


