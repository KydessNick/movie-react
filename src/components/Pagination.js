import React from 'react'
import { Pagination } from 'antd'
function PaginationMovies({ page, pageQtty, setPage }) {
    return (
        <Pagination
            className="pagination"
            defaultPageSize={20}
            defaultCurrent={1}
            current={page}
            total={pageQtty}
            onChange={(page) => setPage(page)}
        ></Pagination>
    )
}
export default PaginationMovies
