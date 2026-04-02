interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-4">
        {/* Pagination controls */}
        <nav aria-label="Page navigation">
          <ul className="pagination mb-0">
            {/* Previous Button */}
            <li
              className={`page-item ${
                Number(currentPage) === 1 ? 'disabled' : ''
              }`}
            >
              <button
                className="page-link"
                disabled={Number(currentPage) === 1}
                onClick={() => onPageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {/* Page Numbers */}
            {totalPages > 0 &&
              [...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = Number(currentPage) === pageNum;
                return (
                  <li
                    key={pageNum}
                    className={`page-item ${isCurrent ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => onPageChange(pageNum)}
                      disabled={isCurrent}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              })}

            {/* Next Button */}
            <li
              className={`page-item ${
                Number(currentPage) >= totalPages || !totalPages
                  ? 'disabled'
                  : ''
              }`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={Number(currentPage) >= totalPages || !totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

        {/* Page Size Selector */}
        <div className="d-flex align-items-center">
          <label
            className="me-2 text-secondary"
            style={{ whiteSpace: 'nowrap' }}
          >
            Results per page:
          </label>
          <select
            className="form-select form-select-sm"
            style={{ width: 'auto' }}
            value={pageSize}
            onChange={(p) => {
              onPageSizeChange(Number(p.target.value));
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Pagination;
