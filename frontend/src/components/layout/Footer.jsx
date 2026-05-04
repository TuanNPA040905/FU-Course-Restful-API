import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">Copyright &copy; FPTU Courses</div>
          <div>
            <a
              href="https://www.facebook.com/tuan.nguyen.536751/"
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>
            &middot;
            <a
              href="https://www.facebook.com/tuan.nguyen.536751/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
