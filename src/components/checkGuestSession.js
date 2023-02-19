function checkGuestSession(setGuestId, keyAPI) {
    if (localStorage.getItem('guestSessionId') === null) {
        createGuestSession(setGuestId, keyAPI)
    } else {
        let timeId = localStorage.getItem('guestIdTime')
        let limitTime = 24 * 3600 * 1000
        if (+new Date() - timeId > limitTime) {
            createGuestSession()
        } else {
            setGuestId(localStorage.getItem('guestSessionId'))
        }
    }
}

function createGuestSession(setGuestId, keyAPI) {
    fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${keyAPI}`, {})
        .then((res) => res.json())
        .then((res) => {
            setGuestId(res.guest_session_id)
            localStorage.setItem('guestIdTime', +new Date())
            localStorage.setItem('guestSessionId', res.guest_session_id)
        })
}
export default checkGuestSession