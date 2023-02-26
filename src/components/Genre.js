import React from 'react'
import PropTypes from 'prop-types'
function Genre({ genres, idsArray }) {
    let genresOneMovie = []
    if (idsArray.length !== 0) {
        idsArray.map(function (item) {
            for (let obj of genres) {
                if (obj.id === item) {
                    genresOneMovie.push(obj.name)
                }
            }
        })
    }
    return genresOneMovie.map((item) => (
        <span key={item} className="card-content__genre">
            {item}
        </span>
    ))
}

export default Genre
Genre.propTypes = {
    genres: PropTypes.array,
    idsArray: PropTypes.array,
}
