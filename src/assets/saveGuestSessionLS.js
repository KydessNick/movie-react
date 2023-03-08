function saveGuestSessionLS(id) {
    localStorage.setItem('guestIdTime', +new Date())
    localStorage.setItem('guestSessionId', id)
}
export default saveGuestSessionLS
