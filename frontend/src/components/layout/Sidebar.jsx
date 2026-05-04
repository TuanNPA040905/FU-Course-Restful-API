import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Features</div>

            <Link className="nav-link" to="/admin">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Dashboard
            </Link>

            <Link className="nav-link" to="/admin/user">
              <div className="sb-nav-link-icon">
                <i className="fas fa-users"></i>
              </div>
              User
            </Link>

            <Link className="nav-link" to="/admin/course">
              <div className="sb-nav-link-icon">
                <i className="fas fa-book"></i>
              </div>
              Course
            </Link>

            <Link className="nav-link" to="/admin/order">
              <div className="sb-nav-link-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              Order
            </Link>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          FPTU Course
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
