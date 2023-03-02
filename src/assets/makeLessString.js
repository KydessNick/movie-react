function makeLessString(stringAnn, stringTitle) {
    let maxLetters
    if (stringTitle.length < 15) {
        maxLetters = 130
    } else if (stringTitle.length >= 15 && stringTitle.length < 35) {
        maxLetters = 90
    } else if (stringTitle.length >= 35) {
        maxLetters = 20
    }
    if (stringAnn.length > maxLetters) {
        let regexp = /[\s.,(?!)]/g
        regexp.lastIndex = maxLetters
        regexp.exec(stringAnn)
        return stringAnn.slice(0, regexp.lastIndex) + '...'
    }
    return stringAnn
}
export default makeLessString
