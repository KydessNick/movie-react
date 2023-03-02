import React from 'react'
import PropTypes from 'prop-types'
import { Rate } from 'antd'
function RateStars({ id, sendRate, rating }) {
    return (
        <Rate
            count="10"
            allowHalf="true"
            onChange={(value) => {
                sendRate(value, id)
            }}
            value={rating}
        ></Rate>
    )
}
export default RateStars
RateStars.propTypes = {
    sendRate: PropTypes.func.isRequired,
    id: PropTypes.number,
    rating: PropTypes.number,
}
