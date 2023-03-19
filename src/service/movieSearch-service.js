export default class MovieSearchService {
    _apiKey = 'bee52013d4ed1a3a78e3f039c819f496'

    _apiBaseUrl = 'https://api.themoviedb.org/3/'

    // _apiBasePop = 'https://api.themoviedb.org/3/movie/popular'

    // async getMovies(query, page = 1){
    //     const res = await fetch(`${this._apiBase}?api_key=${this._apiKey}&query=${query}&page=${page}`)
    //     if(!res.ok){
    //         return new Error(`Server id unavailable`)
    //     }
    //     return res.json()
    // }

    async getResource(url) {
        const res = await fetch(`${this._apiBaseUrl}${url}`)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return res.json()
    }

    createNewGuestSession() {
        return this.getResource(`/authentication/guest_session/new?api_key=${this._apiKey}`)
    }

    getPopularMovies() {
        return this.getResource(`movie/popular?api_key=${this._apiKey}`)
    }

    getSearchedMovies(searchValue, page = 1) {
        return this.getResource(`search/movie?api_key=${this._apiKey}&query=${searchValue}&page=${page}`)
    }

    async guestRatedMovie(value, movieId, guestSessionId) {
        const res = await fetch(
            `${this._apiBaseUrl}/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestSessionId}`,
            {
                headers: {
                    Accept: 'applicaton/json',
                    'Content-type': 'applicaton/json',
                },
                method: 'POST',
                body: JSON.stringify({ value }),
            }
        )

        if (!res.ok) {
            throw new Error('Smth has gone wrong during fetch the guest rating movie')
        }
        return res.json()
    }

    getRatedMovies(guestSessionId) {
        return this.getResource(
            `guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&sort_by=created_at.asc`
        )
    }

    getAllGenres() {
        return this.getResource(`genre/movie/list?api_key=${this._apiKey}`)
    }
}
