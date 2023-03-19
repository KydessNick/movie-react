import React, { useState } from 'react'
import { Input } from 'antd'

import './header.css'

const { Search } = Input

function Header({ onSearchChange }) {
    return (
        <Search
            onChange={onSearchChange}
            allowClear
            placeholder="Type to search"
            style={{
                width: 938,
                padding: 36,
            }}
        />
    )
}

export default Header
