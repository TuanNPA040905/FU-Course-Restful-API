import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CourseCreate = () => {
  const navigate = useNavigate(); // Dùng để chuyển trang sau khi submit thành công

  // Quản lý trạng thái cho toàn bộ form
  const [formData, setFormData] = useState({
    title: "",
    short_describe: "",
    describe_details: "",
    price: "",
    active: "1",
    semester: "",
  });

  // Quản lý trạng thái riêng cho ảnh và xem trước ảnh
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Hàm xử lý khi người dùng gõ vào các ô input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Hàm xử lý riêng cho việc chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Tạo URL tạm thời để hiển thị ảnh ngay lập tức mà không cần jQuery
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Hàm xử lý khi bấm nút Create
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang

    // Ở đây bạn sẽ dùng axios hoặc fetch để gửi formData và imageFile lên Backend (Node.js)
    console.log("Dữ liệu chuẩn bị gửi:", formData);
    console.log("File ảnh:", imageFile);

    alert("Thêm khóa học thành công (Giả lập)!");
    navigate("/admin/course"); // Trở về trang danh sách
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Manage Course</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/admin/course">Courses</Link>
        </li>
        <li className="breadcrumb-item active">Create</li>
      </ol>

      <div className="mt-5">
        <div className="row">
          <div className="col-md-8 col-12 mx-auto">
            <h3>Create a course</h3>
            <hr />

            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Short describe:</label>
                <input
                  type="text"
                  className="form-control"
                  name="short_describe"
                  value={formData.short_describe}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Details:</label>
                <textarea
                  className="form-control"
                  name="describe_details"
                  rows="4"
                  value={formData.describe_details}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-6">
                <label className="form-label">Price:</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Active:</label>
                <select
                  className="form-select"
                  name="active"
                  value={formData.active}
                  onChange={handleChange}
                >
                  <option value="1">ON</option>
                  <option value="0">OFF</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Semester:</label>
                <input
                  type="number"
                  className="form-control"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="imageFile" className="form-label">
                  Avatar:
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="imageFile"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImageChange}
                />
              </div>

              {/* Khu vực hiển thị ảnh xem trước */}
              {imagePreview && (
                <div className="col-12">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxHeight: "250px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              <div className="col-12 mt-4 mb-5">
                <button type="submit" className="btn btn-primary px-4">
                  Create Course
                </button>
                <Link to="/admin/course" className="btn btn-secondary ms-2">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;
