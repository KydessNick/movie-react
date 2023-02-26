import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
function SearchInput({ nameMovies, setNameMovies }) {
    return (
        <Input
            className="search-input"
            type="text"
            onChange={(event) => {
                setNameMovies(event.target.value)
            }}
            value={nameMovies}
            placeholder="Type to search..."
        />
    )
}
export default SearchInput
SearchInput.propTypes = {
    nameMovies: PropTypes.string,
    setNameMovies: PropTypes.func.isRequired,
}
