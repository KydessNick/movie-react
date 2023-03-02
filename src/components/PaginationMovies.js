import React from 'react'
import { Pagination } from 'antd'
import PropTypes from 'prop-types'

function PaginationMovies({ page, pageQtty, setPage }) {
    return (
        <Pagination
            className="pagination"
            defaultPageSize={20}
            defaultCurrent={1}
            current={page}
            total={pageQtty * 20}
            onChange={(page) => setPage(page)}
        ></Pagination>
    )
}
export default PaginationMovies
PaginationMovies.propTypes = {
    page: PropTypes.number,
    pageQtty: PropTypes.number,
    setPage: PropTypes.func.isRequired,
}
