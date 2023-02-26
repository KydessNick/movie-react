import createGuestSession from './/createGuestSession'
function checkGuestSession(setGuestId, keyAPI) {
    if (localStorage.getItem('guestSessionId') === null) {
        createGuestSession(setGuestId, keyAPI)
    } else {
        let timeId = localStorage.getItem('guestIdTime')
        let limitTime = 24 * 3600 * 1000
        if (+new Date() - timeId > limitTime) {
            createGuestSession(setGuestId, keyAPI)
        } else {
            setGuestId(localStorage.getItem('guestSessionId'))
        }
    }
}

export default checkGuestSession
