import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Layouts
import AdminLayout from "./components/layout/AdminLayout";
import ClientLayout from "./client/layout/ClientLayout"; // Layout mới cho Client

// Import Admin Dashboard
import Dashboard from "./admin/dashboard";

// Trên cùng App.jsx
import ClientCourseList from "./client/course/CourseList";

// Import các trang Course (Admin)
import CourseList from "./admin/course/CourseList";
import CourseCreate from "./admin/course/CourseCreate";
import CourseDetail from "./admin/course/CourseDetail";
import CourseUpdate from "./admin/course/CourseUpdate";
import CourseDelete from "./admin/course/CourseDelete";

// Import các trang User (Admin)
import UserList from "./admin/user/UserList";
import UserCreate from "./admin/user/UserCreate";
import UserDetail from "./admin/user/UserDetail";
import UserUpdate from "./admin/user/UserUpdate";
import UserDelete from "./admin/user/UserDelete";

// Import các trang Order (Admin)
import OrderList from "./admin/order/OrderList";
import OrderDetail from "./admin/order/OrderDetail";

// Import các trang Client (Học viên)
import HomePage from "./client/homepage/HomePage";
import Profile from "./client/profile/Profile";

import Login from "./client/auth/Login";
import Register from "./client/auth/Register";
import AccessDenied from "./client/auth/AccessDenied";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==========================================
            1. GIAO DIỆN CLIENT (HỌC VIÊN)
            Sử dụng chung ClientLayout (Header nền tối + Footer)
        ========================================== */}
        <Route element={<ClientLayout />}>
          {/* Trang chủ mặc định khi vào web */}
          <Route path="/" element={<HomePage />} />

          {/* Trang hồ sơ cá nhân */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<ClientCourseList />} />
          {/* Ghi chú: Sau này bạn thêm route giỏ hàng, chi tiết khóa học ở đây */}
          {/* <Route path="/courses" element={<ClientCourseList />} /> */}
        </Route>

        {/* ==========================================
            2. GIAO DIỆN ADMIN (QUẢN TRỊ VIÊN)
            Sử dụng chung AdminLayout (Sidebar + Header sáng)
        ========================================== */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Trang chủ Admin */}
          <Route index element={<Dashboard />} />

          {/* Nhóm quản lý Khóa học */}
          <Route path="course">
            <Route index element={<CourseList />} />
            <Route path="create" element={<CourseCreate />} />
            <Route path=":id" element={<CourseDetail />} />
            <Route path="update/:id" element={<CourseUpdate />} />
            <Route path="delete/:id" element={<CourseDelete />} />
          </Route>

          {/* Nhóm quản lý Người dùng */}
          <Route path="user">
            <Route index element={<UserList />} />
            <Route path="create" element={<UserCreate />} />
            <Route path=":id" element={<UserDetail />} />
            <Route path="update/:id" element={<UserUpdate />} />
            <Route path="delete/:id" element={<UserDelete />} />
          </Route>

          {/* Nhóm quản lý Đơn hàng */}
          <Route path="order">
            <Route index element={<OrderList />} />
            <Route path=":id" element={<OrderDetail />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/access-deny" element={<AccessDenied />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
