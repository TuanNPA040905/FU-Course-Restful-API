import React, { useState } from "react";
import api from "../../services/apiService"; // Dùng file apiService đã thiết lập JWT Interceptor

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", formData);
      // Giả sử server trả về { token: "..." }
      localStorage.setItem("token", response.data.token);
      window.location.href = "/"; // Chuyển về trang chủ sau khi đăng nhập
    } catch (error) {
      alert("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Đăng nhập</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};
export default Login;
