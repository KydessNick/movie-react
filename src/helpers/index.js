function cutDescription(descrip) {
    const arr = descrip.split(' ', 25)

    if (descrip.length <= 120) return descrip

    return `${arr.join(' ')}...`
}

export { cutDescription }
