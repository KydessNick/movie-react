async function checkGuestSessionLS() {
    let limitTime = 24 * 3600 * 1000
    if (
        !localStorage.getItem('guestSessionId') ||
        (localStorage.getItem('guestSessionId') &&
            +new Date() - Number(localStorage.getItem('guestIdTime')) > limitTime)
    ) {
        return 'notID'
    } else {
        return localStorage.getItem('guestSessionId')
    }
}
export default checkGuestSessionLS
