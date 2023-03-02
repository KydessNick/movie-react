const baseURL = 'https://api.themoviedb.org/3'
const keyAPI = '684674613e0eee942828e526ee2bcaff'

async function sendFetch(url) {
    try {
        const res = await fetch(url)
        return await res.json()
    } catch (error) {
        return error
    }
}
async function getRatedMoviesAPI(guestId) {
    const url = `${baseURL}/guest_session/${guestId}/rated/movies?api_key=${keyAPI}`
    const res = await sendFetch(url)
    return res
}
async function sendRateAPI(rate, movieId, guestId) {
    const res = await fetch(`${baseURL}/movie/${movieId}/rating?api_key=${keyAPI}&guest_session_id=${guestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ value: rate }),
    })
    return res
}
async function getGenresIdAPI() {
    const url = `${baseURL}/genre/movie/list?api_key=${keyAPI}&language=en-US`
    const res = await sendFetch(url)
    return res
}
async function searchMoviesAPI(page, nameMovies, guestId) {
    const url = `${baseURL}/search/movie?api_key=${keyAPI}&page=${page}&include_adult=false&query=${nameMovies}&guest_session_id=${guestId}`
    const res = await sendFetch(url)
    return res
}
async function createGuestSessionAPI() {
    const url = `${baseURL}/authentication/guest_session/new?api_key=${keyAPI}`
    const res = await fetch(url)
    return res.guest_session_id
}
export {
    baseURL,
    keyAPI,
    sendFetch,
    getRatedMoviesAPI,
    sendRateAPI,
    getGenresIdAPI,
    searchMoviesAPI,
    createGuestSessionAPI,
}
