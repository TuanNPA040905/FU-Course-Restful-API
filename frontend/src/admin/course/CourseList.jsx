import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const PAGE_SIZE = 20;

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    pageSize: PAGE_SIZE,
    pages: 1,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/api/v1/courses", {
        params: { page: page - 1, pageSize: PAGE_SIZE }, // trừ 1
      });

      const json = response.data;
      console.log("API RESPONSE:", json);

      if (json.statusCode === 200) {
        const remoteMeta = json.data.meta;
        setCourses(json.data.result || []);
        setMeta({
          page: Number(remoteMeta.page),
          pageSize: Number(remoteMeta.pageSize),
          pages: Number(remoteMeta.pages),
          total: Number(remoteMeta.total),
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);

  const formatPrice = (price) => {
    if (price === 0 || price === 0.0) return "Miễn phí";

    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  const formatDate = (isoString) => {
    if (!isoString) return "—";

    return new Date(isoString).toLocaleDateString("vi-VN");
  };

  // FILTER LOCAL
  const filteredCourses = courses.filter((course) => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return true;

    return (
      (course.title || "").toLowerCase().includes(search) ||
      (course.shortName || "").toLowerCase().includes(search) ||
      (course.description || "").toLowerCase().includes(search)
    );
  });

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= meta.pages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>,
      );
    }

    return pages;
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Manage Courses</h1>

      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <Link to="/admin">Dashboard</Link>
        </li>

        <li className="breadcrumb-item active">Course</li>
      </ol>

      <div className="mt-5">
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="d-flex justify-content-between mb-3">
              <h3>
                Table Courses{" "}
                <span className="badge bg-secondary">{meta.total}</span>
              </h3>

              <Link to="/admin/course/create" className="btn btn-primary">
                Create a Course
              </Link>
            </div>

            {/* SEARCH */}
            <div className="search-filters-section mb-4 d-flex gap-3">
              <div className="search-wrapper flex-grow-1 position-relative">
                <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>

                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search by title, short name, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* KHÔNG FETCH NỮA */}
              <button
                className="btn btn-light border d-flex align-items-center gap-2"
                type="button"
              >
                <i className="fas fa-filter"></i>
                Tìm kiếm
              </button>
            </div>

            <hr />

            {/* ERROR */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* LOADING */}
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {/* TABLE */}
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th width="5%">ID</th>
                      <th width="7%">Title</th>
                      <th width="17%">Short Name</th>
                      <th width="30%">Description</th>
                      <th width="8%">Price</th>
                      <th width="5%">Semester</th>
                      <th width="5%">Active</th>
                      <th width="8%">Created At</th>
                      <th width="15%">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCourses.length === 0 ? (
                      <tr>
                        <td
                          colSpan="10"
                          className="text-center text-muted py-4"
                        >
                          Không có khóa học nào.
                        </td>
                      </tr>
                    ) : (
                      filteredCourses.map((course) => (
                        <tr key={course.id}>
                          <td>{course.id}</td>

                          <td>{course.title}</td>

                          <td>{course.shortName || "—"}</td>

                          <td
                            style={{
                              maxWidth: "250px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            title={course.description}
                          >
                            {course.description}
                          </td>

                          <td>{formatPrice(course.price)}</td>

                          <td className="text-center">{course.semester}</td>

                          <td className="text-center">
                            {course.active ? (
                              <span className="badge bg-success">ON</span>
                            ) : (
                              <span className="badge bg-secondary">OFF</span>
                            )}
                          </td>

                          <td>{formatDate(course.createdAt)}</td>

                          <td>
                            <div className="d-flex gap-1 flex-wrap">
                              <Link
                                to={`/admin/course/${course.id}`}
                                className="btn btn-success btn-sm"
                              >
                                View
                              </Link>

                              <Link
                                to={`/admin/course/update/${course.id}`}
                                className="btn btn-warning btn-sm"
                              >
                                Edit
                              </Link>

                              <Link
                                to={`/admin/course/delete/${course.id}`}
                                className="btn btn-danger btn-sm"
                              >
                                Delete
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {/* PAGINATION */}
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Trang {currentPage} / {meta.pages} — Tổng {meta.total} khóa
                    học
                  </small>

                  <nav aria-label="Page navigation">
                    <ul className="pagination mb-0">
                      {/* PREV */}
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                        >
                          &laquo;
                        </button>
                      </li>

                      {renderPagination()}

                      {/* NEXT */}
                      <li
                        className={`page-item ${
                          currentPage >= meta.pages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(meta.pages, p + 1))
                          }
                        >
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
