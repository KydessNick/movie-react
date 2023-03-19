import React from 'react'
import { Pagination } from 'antd'

import './footer.css'

// function Footer({ onSelectPage, totalMovies }) {
//   return (
//     <Pagination defaultCurrent={1} pageSize={20} showSizeChanger={false} total={totalMovies} onChange={onSelectPage} />
//   );
// }

// export default Footer;

function Footer({ totalResults, currentPage, onPaginationChange, inRated }) {
    return (
        <div className="pagination">
            {totalResults && !inRated ? (
                <Pagination
                    current={currentPage}
                    onChange={onPaginationChange}
                    total={totalResults}
                    showSizeChanger={false}
                    defaultPageSize={20}
                />
            ) : null}
        </div>
    )
}

export default Footer
