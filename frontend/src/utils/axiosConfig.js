import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8082",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      (originalRequest.url?.includes("/api/v1/refresh") ||
        originalRequest.url?.includes("/auth/logout"))
    ) {
      localStorage.removeItem("user");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axiosInstance.get("/api/v1/refresh"); // ← sửa path
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
