import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ClientLayout.css";

const ClientHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Giả lập trạng thái đăng nhập (Bạn có thể đổi thành null để test trạng thái chưa đăng nhập)
  const [user, setUser] = useState({
    fullName: "Học viên FPT",
    avatar: "https://via.placeholder.com/150",
    role: "USER",
  });
  const cartCount = 2; // Giả lập số lượng trong giỏ hàng

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/courses?name=${searchTerm}`);
  };

  return (
    <div className={`fptu-nav-wrapper ${scrolled ? "scrolled" : ""}`}>
      <div className="container-fluid px-0">
        <nav className="navbar navbar-dark navbar-expand-xl fptu-navbar">
          <div className="fptu-nav-inner container px-4">
            {/* Logo */}
            <Link to="/" className="navbar-brand fptu-logo-link">
              <span className="fptu-brand-fptu">FPTU</span>
              <span className="fptu-brand-course">Course</span>
            </Link>

            <button
              className="navbar-toggler fptu-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fptu-toggler-bar"></span>
              <span className="fptu-toggler-bar"></span>
              <span className="fptu-toggler-bar"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav fptu-nav-links ms-4 me-3">
                <Link to="/" className="nav-item nav-link fptu-nav-link">
                  <i className="fas fa-home"></i> Trang Chủ
                </Link>
                <Link to="/courses" className="nav-item nav-link fptu-nav-link">
                  <i className="fas fa-graduation-cap"></i> Khóa Học
                </Link>
              </div>

              {/* Search */}
              <div className="fptu-search-wrap mx-auto">
                <form onSubmit={handleSearch} className="fptu-search-form">
                  <div className="fptu-search-inner">
                    <i className="fas fa-search fptu-search-ico"></i>
                    <input
                      type="text"
                      className="fptu-search-input"
                      placeholder="Tìm kiếm khóa học..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="fptu-search-btn">
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Actions */}
              <div className="d-flex align-items-center gap-2 ms-3 fptu-right">
                {user ? (
                  <>
                    <Link
                      to="/cart"
                      className="fptu-icon-btn position-relative"
                    >
                      <i className="fas fa-shopping-bag"></i>
                      {cartCount > 0 && (
                        <span className="fptu-cart-badge">{cartCount}</span>
                      )}
                    </Link>

                    <div className="dropdown">
                      <button
                        className="fptu-avatar-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <div className="fptu-avatar-ring">
                          <img
                            src={user.avatar}
                            className="fptu-avatar-img"
                            alt="Avatar"
                          />
                        </div>
                        <i className="fas fa-chevron-down fptu-caret ms-1"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end fptu-dropdown-menu p-2">
                        <li className="fptu-dropdown-user">
                          <img
                            src={user.avatar}
                            className="fptu-dd-avatar"
                            alt="Avatar"
                          />
                          <div className="fptu-dd-name">{user.fullName}</div>
                        </li>
                        <li>
                          <hr className="fptu-dd-divider" />
                        </li>
                        <li>
                          <Link
                            className="dropdown-item fptu-dd-item"
                            to="/profile"
                          >
                            <i className="fas fa-user-cog"></i> Quản lý tài
                            khoản
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item fptu-dd-item"
                            to="/my-course"
                          >
                            <i className="fas fa-book-open"></i> Khóa học của
                            tôi
                          </Link>
                        </li>
                        {user.role === "ADMIN" && (
                          <li>
                            <Link
                              className="dropdown-item fptu-dd-item"
                              to="/admin"
                            >
                              <i className="fas fa-shield-alt"></i> Trang Admin
                            </Link>
                          </li>
                        )}
                        <li>
                          <hr className="fptu-dd-divider" />
                        </li>
                        <li>
                          <button
                            className="dropdown-item fptu-dd-item fptu-logout"
                            onClick={() => alert("Đăng xuất")}
                          >
                            <i className="fas fa-sign-out-alt"></i> Đăng xuất
                          </button>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link to="/login" className="fptu-login-btn">
                    <i className="fas fa-sign-in-alt"></i> Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ClientHeader;
