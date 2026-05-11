import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [strength, setStrength] = useState(0);

  // ── Handlers ──────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "password") calcStrength(value);
  };

  const calcStrength = (v) => {
    let s = 0;
    if (v.length >= 6) s++;
    if (v.length >= 10) s++;
    if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
    if (/\d/.test(v)) s++;
    if (/[^a-zA-Z0-9]/.test(v)) s++;
    setStrength(s);
  };

  const getStrengthStyle = () => {
    if (strength <= 1) return { width: "25%", background: "#f87171" };
    if (strength <= 3) return { width: "60%", background: "#f6ad55" };
    return { width: "100%", background: "#34d399" };
  };

  // ── Validation ────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = "Họ không được để trống";
    if (!formData.lastName.trim()) e.lastName = "Tên không được để trống";
    if (!formData.email.trim()) e.email = "Email không được để trống";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Email không hợp lệ";
    if (!formData.password) e.password = "Mật khẩu không được để trống";
    else if (formData.password.length < 6)
      e.password = "Mật khẩu tối thiểu 6 ký tự";
    if (!formData.confirmPassword)
      e.confirmPassword = "Vui lòng xác nhận mật khẩu";
    else if (formData.password !== formData.confirmPassword)
      e.confirmPassword = "Mật khẩu không khớp";
    if (!formData.terms) e.terms = "Bạn phải đồng ý với điều khoản";
    return e;
  };

  // ── Submit ────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const json = await res.json();
      if (res.ok && json.statusCode === 200) {
        navigate("/login");
      } else {
        setServerError(json.message || "Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch {
      setServerError("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .auth-bg {
          position: fixed; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(30,58,138,.35) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 90%, rgba(59,7,100,.3) 0%, transparent 60%),
            #070c18;
        }
        .auth-grid {
          position: fixed; inset: 0; z-index: 0; opacity: .025;
          background-image:
            linear-gradient(rgba(99,179,237,.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,.5) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .auth-page {
          position: relative; z-index: 1; min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 20px;
          font-family: 'DM Sans', sans-serif; color: #eef4ff;
        }
        .auth-card {
          width: 100%; max-width: 520px;
          background: #0f1a2e;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          box-shadow: 0 24px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.04);
          overflow: hidden;
          animation: cardIn .5s cubic-bezier(.22,.68,0,1.1) both;
        }
        @keyframes cardIn {
          from { opacity:0; transform:translateY(28px) scale(.97) }
          to   { opacity:1; transform:none }
        }
        .auth-header {
          padding: 32px 36px 24px; text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(180deg, rgba(99,179,237,.04) 0%, transparent 100%);
        }
        .auth-logo {
          text-decoration: none; display: inline-flex; align-items: center;
          font-size: 1.7rem; font-weight: 800;
          font-family: 'Bricolage Grotesque', sans-serif;
          letter-spacing: -.5px; margin-bottom: 12px;
        }
        .logo-f {
          background: linear-gradient(135deg,#63b3ed,#a78bfa);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .logo-c { color: #f6ad55; }
        .auth-header h2 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1.2rem; font-weight: 700; color: #eef4ff; margin-bottom: 4px;
        }
        .auth-header p { font-size: .82rem; color: #4b5a6e; }

        .auth-body { padding: 26px 36px 30px; }

        .auth-alert {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 14px; border-radius: 12px; margin-bottom: 18px;
          font-size: .83rem; font-weight: 500; line-height: 1.5;
          animation: alertIn .3s ease both;
        }
        @keyframes alertIn {
          from { opacity:0; transform:translateY(-8px) }
          to   { opacity:1; transform:none }
        }
        .auth-alert-error {
          background: rgba(248,113,113,0.12);
          border: 1px solid rgba(248,113,113,.22);
          color: #f87171;
        }
        .alert-close {
          margin-left: auto; background: none; border: none;
          color: inherit; cursor: pointer; opacity: .7; font-size: .9rem; padding: 0;
        }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }

        .form-group { margin-bottom: 15px; }
        .form-label {
          display: block; font-size: .73rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .05em;
          color: #4b5a6e; margin-bottom: 7px;
        }
        .form-label i { margin-right: 5px; color: #63b3ed; }

        .input-wrap { position: relative; }
        .input-ico {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          color: #4b5a6e; font-size: .78rem; pointer-events: none; transition: color .2s;
        }
        .form-input {
          width: 100%; height: 44px;
          background: #141f30;
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 0 38px 0 38px;
          color: #eef4ff; font-size: .875rem;
          font-family: 'DM Sans', sans-serif; transition: all .22s; outline: none;
        }
        .form-input::placeholder { color: #4b5a6e; }
        .form-input:focus {
          border-color: rgba(99,179,237,0.35);
          background: rgba(99,179,237,.05);
          box-shadow: 0 0 0 3px rgba(99,179,237,.1);
        }
        .form-input:focus ~ .input-ico { color: #63b3ed; }
        .form-input.is-invalid { border-color: rgba(248,113,113,.45); }
        .invalid-feedback { display: block; font-size: .75rem; color: #f87171; margin-top: 5px; padding-left: 4px; }

        .strength-bar-wrap {
          height: 4px; background: #141f30; border-radius: 4px; margin-top: 7px; overflow: hidden;
        }
        .strength-bar { height: 100%; border-radius: 4px; transition: width .35s, background .35s; }

        .eye-toggle {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: #4b5a6e;
          cursor: pointer; font-size: .82rem; padding: 4px; transition: color .18s;
        }
        .eye-toggle:hover { color: #63b3ed; }

        .form-check { display: flex; align-items: center; gap: 9px; margin-bottom: 16px; }
        .form-check-input {
          width: 16px; height: 16px; border-radius: 5px;
          border: 1.5px solid rgba(255,255,255,0.08);
          background: #141f30; cursor: pointer; accent-color: #63b3ed; flex-shrink: 0;
        }
        .form-check-label { font-size: .82rem; color: #94a3b8; cursor: pointer; }
        .form-check-label a { color: #63b3ed; text-decoration: none; }
        .form-check-label a:hover { color: #a78bfa; }

        .btn-submit {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; height: 46px;
          background: linear-gradient(135deg,#34d399,#059669);
          border: none; border-radius: 12px; color: #fff;
          font-size: .9rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: all .22s; box-shadow: 0 4px 18px rgba(52,211,153,.25);
        }
        .btn-submit:hover:not(:disabled) {
          box-shadow: 0 8px 28px rgba(52,211,153,.38); transform: translateY(-1px);
        }
        .btn-submit:disabled { opacity: .6; cursor: not-allowed; }

        .auth-footer {
          text-align: center; padding: 18px 36px;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,.015);
          font-size: .82rem; color: #4b5a6e;
        }
        .auth-footer a { color: #63b3ed; text-decoration: none; font-weight: 600; }
        .auth-footer a:hover { color: #a78bfa; }
      `}</style>

      <div className="auth-bg" />
      <div className="auth-grid" />

      <div className="auth-page">
        <div className="auth-card">
          {/* HEADER */}
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <span className="logo-f">FPTU</span>
              <span className="logo-c">Course</span>
            </Link>
            <h2>Tạo tài khoản mới</h2>
            <p>Bắt đầu hành trình học tập của bạn</p>
          </div>

          {/* BODY */}
          <div className="auth-body">
            {/* Server error */}
            {serverError && (
              <div className="auth-alert auth-alert-error">
                <i className="fas fa-exclamation-circle" />
                <span>{serverError}</span>
                <button
                  className="alert-close"
                  onClick={() => setServerError("")}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Họ + Tên */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-user" /> Họ
                  </label>
                  <div className="input-wrap">
                    <input
                      type="text"
                      name="firstName"
                      className={`form-input ${errors.firstName ? "is-invalid" : ""}`}
                      placeholder="Nguyễn"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <i className="fas fa-id-card input-ico" />
                  </div>
                  {errors.firstName && (
                    <span className="invalid-feedback">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-user" /> Tên
                  </label>
                  <div className="input-wrap">
                    <input
                      type="text"
                      name="lastName"
                      className={`form-input ${errors.lastName ? "is-invalid" : ""}`}
                      placeholder="Văn A"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <i className="fas fa-id-card input-ico" />
                  </div>
                  {errors.lastName && (
                    <span className="invalid-feedback">{errors.lastName}</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-envelope" /> Email
                </label>
                <div className="input-wrap">
                  <input
                    type="email"
                    name="email"
                    className={`form-input ${errors.email ? "is-invalid" : ""}`}
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <i className="fas fa-at input-ico" />
                </div>
                {errors.email && (
                  <span className="invalid-feedback">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-lock" /> Mật khẩu
                </label>
                <div className="input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`form-input ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Tối thiểu 6 ký tự"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <i className="fas fa-key input-ico" />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                    />
                  </button>
                </div>
                {formData.password && (
                  <div className="strength-bar-wrap">
                    <div className="strength-bar" style={getStrengthStyle()} />
                  </div>
                )}
                {errors.password && (
                  <span className="invalid-feedback">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-lock" /> Xác nhận mật khẩu
                </label>
                <div className="input-wrap">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    className={`form-input ${errors.confirmPassword ? "is-invalid" : ""}`}
                    placeholder="Nhập lại mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <i className="fas fa-shield-alt input-ico" />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowConfirm((p) => !p)}
                  >
                    <i
                      className={`fas ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="invalid-feedback">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              {/* Terms */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="terms">
                  Tôi đồng ý với <a href="#">Điều khoản dịch vụ</a>
                </label>
              </div>
              {errors.terms && (
                <span
                  className="invalid-feedback"
                  style={{
                    marginTop: "-10px",
                    marginBottom: "12px",
                    display: "block",
                  }}
                >
                  {errors.terms}
                </span>
              )}

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin" /> Đang xử lý...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus" /> Tạo tài khoản
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FOOTER */}
          <div className="auth-footer">
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
