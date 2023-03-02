import { createGuestSessionAPI } from '../movieAPIservices/servicesFunctions'
async function checkGuestSessionLS() {
    let limitTime = 24 * 3600 * 1000
    if (
        localStorage.getItem('guestSessionId') === null ||
        (localStorage.getItem('guestSessionId') !== null &&
            +new Date() - Number(localStorage.getItem('guestIdTime')) > limitTime)
    ) {
        let guestId = await createGuestSessionAPI()
        localStorage.setItem('guestIdTime', +new Date())
        localStorage.setItem('guestSessionId', guestId)
        return localStorage.getItem('guestSessionId')
    } else {
        return localStorage.getItem('guestSessionId')
    }
}

export default checkGuestSessionLS
