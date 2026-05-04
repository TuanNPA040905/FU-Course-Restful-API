import React, { useState } from "react";
import api from "../../services/apiService";

const Register = () => {
  const [user, setUser] = useState({ username: "", password: "", email: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", user);
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      window.location.href = "/login";
    } catch (err) {
      alert("Đăng ký lỗi: " + err.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Đăng ký tài khoản</h2>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};
export default Register;
