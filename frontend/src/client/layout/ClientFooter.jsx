import React from "react";
import { Link } from "react-router-dom";
import "./ClientLayout.css";

const ClientFooter = () => {
  return (
    <footer className="fptu-footer">
      <div className="fptu-footer-blob fptu-footer-blob-1"></div>
      <div className="fptu-footer-blob fptu-footer-blob-2"></div>

      <div className="fptu-footer-inner">
        <div className="fptu-footer-top">
          <div className="fptu-footer-brand">
            <Link to="/" className="fptu-footer-logo">
              <span className="fptu-fl-fptu">FPTU</span>
              <span className="fptu-fl-course">Course</span>
            </Link>
            <p className="fptu-footer-tagline">
              Nền tảng học tập trực tuyến dành cho sinh viên FPT University —
              chất lượng là ưu tiên hàng đầu.
            </p>
            <div className="fptu-footer-socials">
              <a href="#" className="fptu-social-btn">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="fptu-social-btn">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="fptu-social-btn">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="fptu-footer-col">
            <h4 className="fptu-footer-col-title">Khám phá</h4>
            <ul className="fptu-footer-links">
              <li>
                <Link to="/" className="fptu-footer-link">
                  <i className="fas fa-home"></i> Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/courses" className="fptu-footer-link">
                  <i className="fas fa-graduation-cap"></i> Khóa học
                </Link>
              </li>
            </ul>
          </div>

          <div className="fptu-footer-col">
            <h4 className="fptu-footer-col-title">Tài khoản</h4>
            <ul className="fptu-footer-links">
              <li>
                <Link to="/profile" className="fptu-footer-link">
                  <i className="fas fa-user-cog"></i> Hồ sơ của tôi
                </Link>
              </li>
              <li>
                <Link to="/cart" className="fptu-footer-link">
                  <i className="fas fa-shopping-bag"></i> Giỏ hàng
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="fptu-footer-divider"></div>
        <div className="fptu-footer-bottom">
          <div className="fptu-footer-copy">
            <i className="fas fa-copyright"></i>{" "}
            <span>2026 TuanNPA — All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter;
