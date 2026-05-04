import React from "react";
import { Outlet } from "react-router-dom";
import ClientHeader from "./ClientHeader";
import ClientFooter from "./ClientFooter";

const ClientLayout = () => {
  return (
    <div className="client-wrapper">
      {/* Thanh điều hướng phía trên */}
      <ClientHeader />

      {/* Nội dung chính sẽ thay đổi (Trang chủ, Profile, Khóa học...) */}
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      {/* Chân trang */}
      <ClientFooter />
    </div>
  );
};

export default ClientLayout;
