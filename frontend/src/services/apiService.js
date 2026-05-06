import axios from "axios";

// Tạo một instance của axios với cấu hình cơ bản
const api = axios.create({
  baseURL: "http://localhost:8082/api/v1", // Đường dẫn tới Backend Spring Boot của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
