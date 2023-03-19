import React from 'react'
import { Alert } from 'antd'

import './errorAlert.css'

function ErrorAlert({ description }) {
    return <Alert className="error-message" message="ERROR" description={description} type="error" showIcon />
}

export default ErrorAlert
