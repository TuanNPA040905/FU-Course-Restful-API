import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CourseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    short_describe: "",
    describe_details: "",
    price: "",
    active: "1",
    semester: "1",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Giả lập load dữ liệu cũ khi vừa vào trang
  useEffect(() => {
    // Fake data: Lấy thông tin khóa học cũ gán vào form
    const oldData = {
      title: "C01",
      short_describe: "ReactJS Basic",
      describe_details: "Học React từ số 0",
      price: "1500000",
      active: "1",
      semester: "2",
      image: "old-image.jpg",
    };
    setFormData(oldData);
    if (oldData.image) setImagePreview(`/images/product/${oldData.image}`); // Hiển thị ảnh cũ
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cập nhật khóa học ID:", id, formData);
    alert("Cập nhật thành công!");
    navigate("/admin/course");
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Products</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/admin/course">Product</Link>
        </li>
        <li className="breadcrumb-item active">Update</li>
      </ol>

      <div className="mt-5 row">
        <div className="col-md-8 mx-auto">
          <h3>Update a product</h3>
          <hr />

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title (Code):</label>
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
              <label className="form-label">Short description:</label>
              <input
                type="text"
                className="form-control"
                name="short_describe"
                value={formData.short_describe}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Detail description:</label>
              <textarea
                className="form-control"
                name="describe_details"
                rows="5"
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
              <label className="form-label">Semester:</label>
              <select
                className="form-select"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
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
              <label className="form-label">Image:</label>
              <input
                className="form-control"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
              />
            </div>

            {imagePreview && (
              <div className="col-12">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxHeight: "250px", borderRadius: "8px" }}
                />
              </div>
            )}

            <div className="col-12 mt-4 mb-5">
              <button type="submit" className="btn btn-warning px-4 text-white">
                Update Course
              </button>
              <Link to="/admin/course" className="btn btn-secondary ms-2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseUpdate;
