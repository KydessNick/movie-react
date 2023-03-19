import React from 'react'
import './loader.css'
import { Spin } from 'antd'

function Loader() {
    return <Spin size="large" tip="Loading" className="app-loader" />
}

export default Loader
