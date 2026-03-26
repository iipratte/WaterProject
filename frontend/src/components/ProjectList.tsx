import { useEffect, useState } from 'react';
import { type Project } from '../types/Project';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/api/Water/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${
          selectedCategories.length > 0 ? `&${categoryParams}` : ''
        }`
      );
      const data = await response.json();
      setProjects(data.projects);
      setTotalItems(data.totalNumProjects);
      setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
    };

    fetchProjects();
  }, [pageSize, pageNum, totalItems, selectedCategories]);

  return (
    <>
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Project Type:</strong> {p.projectType}
              </li>
              <li>
                <strong>Regional Program:</strong> {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact:</strong> {p.projectImpact} individuals served
              </li>
              <li>
                <strong>Project Phase:</strong> {p.projectPhase}
              </li>
              <li>
                <strong>Project Status:</strong> {p.projectFunctionalityStatus}
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donate/${p.projectName}/${p.projectId}`)
              }
            >
              Donate
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-between align-items-center my-4">
        {/* Pagination controls */}
        <nav aria-label="Page navigation">
          <ul className="pagination mb-0">
            {/* Previous Button */}
            <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPageNum(pageNum - 1)}
              >
                Previous
              </button>
            </li>

            {/* Page Numbers */}
            {totalPages > 0 &&
              [...Array(totalPages)].map((_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${pageNum === i + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPageNum(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

            {/* Next Button */}
            <li
              className={`page-item ${
                pageNum === totalPages ? 'disabled' : ''
              }`}
            >
              <button
                className="page-link"
                onClick={() => setPageNum(pageNum + 1)}
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
            onChange={(p) => setPageSize(Number(p.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default ProjectList;
