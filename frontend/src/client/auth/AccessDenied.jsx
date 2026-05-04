import React from "react";

const AccessDenied = () => {
  return (
    <div className="error-page">
      <div className="err-content">
        <h1>403</h1>
        <p>Bạn không có quyền truy cập trang này.</p>
        <a href="/login" className="btn-primary">
          Về trang Đăng nhập
        </a>
        <a href="/" className="btn-secondary">
          Về trang chủ
        </a>
      </div>
    </div>
  );
};
export default AccessDenied;
