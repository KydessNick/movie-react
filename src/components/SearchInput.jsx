import React from "react"
import {Input}  from 'antd'
function SearchInput({nameMovies, setNameMovies}){
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