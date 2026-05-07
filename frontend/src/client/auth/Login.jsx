import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/auth/login", {
        username: formData.username,
        password: formData.password,
      });
      const data = response.data.data;
      const roleName = data.user.role.name;
      localStorage.setItem("user", JSON.stringify(data.user));
      setSuccess("Đăng nhập thành công! Đang chuyển hướng...");
      setTimeout(() => {
        if (roleName === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 800);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Email hoặc mật khẩu không đúng!");
      } else {
        setError("Đã có lỗi xảy ra, vui lòng thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
                :root {
                    --bg: #070c18;
                    --bg-card: #0f1a2e;
                    --bg-el: #141f30;
                    --border: rgba(255,255,255,0.08);
                    --border-h: rgba(99,179,237,0.35);
                    --accent: #63b3ed;
                    --accent-g: rgba(99,179,237,0.12);
                    --green: #34d399;
                    --purple: #a78bfa;
                    --gold: #f6ad55;
                    --red: #f87171;
                    --red-d: rgba(248,113,113,0.12);
                    --text-1: #eef4ff;
                    --text-2: #94a3b8;
                    --text-3: #4b5a6e;
                }
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                .auth-page-wrap {
                    min-height: 100vh;
                    font-family: 'DM Sans', sans-serif;
                    background: var(--bg);
                    color: var(--text-1);
                    overflow-x: hidden;
                }
                .auth-bg {
                    position: fixed; inset: 0; z-index: 0;
                    background: radial-gradient(ellipse 80% 60% at 20% 10%, rgba(30,58,138,.35) 0%, transparent 60%),
                        radial-gradient(ellipse 60% 50% at 80% 90%, rgba(59,7,100,.3) 0%, transparent 60%),
                        var(--bg);
                }
                .auth-grid {
                    position: fixed; inset: 0; z-index: 0; opacity: .025;
                    background-image: linear-gradient(rgba(99,179,237,.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99,179,237,.5) 1px, transparent 1px);
                    background-size: 60px 60px;
                }
                .auth-page {
                    position: relative; z-index: 1; min-height: 100vh;
                    display: flex; align-items: center; justify-content: center; padding: 40px 20px;
                }
                .auth-card {
                    width: 100%; max-width: 420px;
                    background: var(--bg-card);
                    border: 1px solid var(--border);
                    border-radius: 24px;
                    box-shadow: 0 24px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.04);
                    overflow: hidden;
                    animation: cardIn .5s cubic-bezier(.22,.68,0,1.1) both;
                }
                @keyframes cardIn {
                    from { opacity:0; transform:translateY(28px) scale(.97) }
                    to { opacity:1; transform:none }
                }
                .auth-header {
                    padding: 36px 36px 28px; text-align: center;
                    border-bottom: 1px solid var(--border);
                    background: linear-gradient(180deg, rgba(99,179,237,.04) 0%, transparent 100%);
                }
                .auth-logo {
                    text-decoration: none; display: inline-flex; align-items: center;
                    font-size: 1.7rem; font-weight: 800;
                    font-family: 'Bricolage Grotesque', sans-serif;
                    letter-spacing: -.5px; margin-bottom: 14px; cursor: pointer;
                }
                .logo-f {
                    background: linear-gradient(135deg, #63b3ed, #a78bfa);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                }
                .logo-c { color: #f6ad55; }
                .auth-header h2 {
                    font-family: 'Bricolage Grotesque', sans-serif;
                    font-size: 1.2rem; font-weight: 700; color: var(--text-1); margin-bottom: 4px;
                }
                .auth-header p { font-size: .82rem; color: var(--text-3); }
                .auth-body { padding: 28px 36px 32px; }
                .auth-alert {
                    display: flex; align-items: flex-start; gap: 10px;
                    padding: 12px 14px; border-radius: 12px; margin-bottom: 18px;
                    font-size: .83rem; font-weight: 500; line-height: 1.5;
                    animation: alertIn .3s ease both;
                }
                @keyframes alertIn {
                    from { opacity:0; transform:translateY(-8px) }
                    to { opacity:1; transform:none }
                }
                .auth-alert-error {
                    background: var(--red-d); border: 1px solid rgba(248,113,113,.22); color: var(--red);
                }
                .auth-alert-success {
                    background: rgba(52,211,153,.08); border: 1px solid rgba(52,211,153,.22); color: var(--green);
                }
                .alert-close {
                    margin-left: auto; background: none; border: none;
                    color: inherit; cursor: pointer; opacity: .7; padding: 0; font-size: .9rem;
                }
                .alert-close:hover { opacity: 1; }
                .btn-google {
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                    width: 100%; padding: 11px 16px;
                    background: var(--bg-el); border: 1px solid var(--border); border-radius: 12px;
                    color: var(--text-2); font-size: .875rem; font-weight: 500;
                    font-family: 'DM Sans', sans-serif; text-decoration: none;
                    cursor: pointer; transition: all .22s;
                }
                .btn-google:hover {
                    background: rgba(255,255,255,.06); border-color: var(--border-h);
                    color: var(--text-1); box-shadow: 0 4px 20px rgba(0,0,0,.3);
                }
                .google-logo { width: 18px; height: 18px; flex-shrink: 0; }
                .auth-divider {
                    display: flex; align-items: center; gap: 12px;
                    margin: 20px 0; color: var(--text-3); font-size: .75rem;
                }
                .auth-divider::before, .auth-divider::after {
                    content: ''; flex: 1; height: 1px; background: var(--border);
                }
                .form-group { margin-bottom: 16px; }
                .form-label {
                    display: block; font-size: .75rem; font-weight: 600;
                    text-transform: uppercase; letter-spacing: .05em;
                    color: var(--text-3); margin-bottom: 7px;
                }
                .form-label i { margin-right: 5px; color: var(--accent); }
                .input-wrap { position: relative; }
                .input-ico {
                    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
                    color: var(--text-3); font-size: .78rem; pointer-events: none; transition: color .2s;
                }
                .input-wrap:focus-within .input-ico { color: var(--accent); }
                .form-input {
                    width: 100%; height: 44px; background: var(--bg-el);
                    border: 1.5px solid var(--border); border-radius: 12px;
                    padding: 0 38px 0 38px; color: var(--text-1);
                    font-size: .875rem; font-family: 'DM Sans', sans-serif;
                    transition: all .22s; outline: none;
                }
                .form-input::placeholder { color: var(--text-3); }
                .form-input:focus {
                    border-color: var(--border-h); background: rgba(99,179,237,.05);
                    box-shadow: 0 0 0 3px rgba(99,179,237,.1);
                }
                .eye-toggle {
                    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
                    background: none; border: none; color: var(--text-3);
                    cursor: pointer; font-size: .82rem; padding: 4px; transition: color .18s;
                }
                .eye-toggle:hover { color: var(--accent); }
                .form-check { display: flex; align-items: center; gap: 9px; }
                .form-check-input {
                    width: 16px; height: 16px; border-radius: 5px;
                    border: 1.5px solid var(--border); background: var(--bg-el);
                    cursor: pointer; accent-color: var(--accent); flex-shrink: 0;
                }
                .form-check-label { font-size: .82rem; color: var(--text-2); cursor: pointer; }
                .btn-submit {
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    width: 100%; height: 46px; margin-top: 20px;
                    background: linear-gradient(135deg, #6c7ef7, #a78bfa);
                    border: none; border-radius: 12px; color: #fff;
                    font-size: .9rem; font-weight: 600; font-family: 'DM Sans', sans-serif;
                    cursor: pointer; transition: all .22s;
                    box-shadow: 0 4px 18px rgba(108,126,247,.3);
                }
                .btn-submit:hover:not(:disabled) {
                    box-shadow: 0 8px 28px rgba(108,126,247,.45); transform: translateY(-1px);
                }
                .btn-submit:disabled { opacity: .7; cursor: not-allowed; }
                .btn-submit:active { transform: none; }
                .form-link {
                    color: var(--accent); text-decoration: none; font-size: .8rem; transition: color .18s;
                }
                .form-link:hover { color: var(--purple); }
                .forgot-row { text-align: right; margin-top: 6px; }
                .auth-footer {
                    text-align: center; padding: 18px 36px;
                    border-top: 1px solid var(--border);
                    background: rgba(255,255,255,.015);
                    font-size: .82rem; color: var(--text-3);
                }
                .auth-footer a {
                    color: var(--accent); text-decoration: none; font-weight: 600;
                }
                .auth-footer a:hover { color: var(--purple); }
            `}</style>

      <div className="auth-page-wrap">
        <div className="auth-bg"></div>
        <div className="auth-grid"></div>

        <div className="auth-page">
          <div className="auth-card">
            {/* Header */}
            <div className="auth-header">
              <div className="auth-logo" onClick={() => navigate("/")}>
                <span className="logo-f">FPTU</span>
                <span className="logo-c">Course</span>
              </div>
              <h2>Chào mừng trở lại!</h2>
              <p>Đăng nhập để tiếp tục học tập</p>
            </div>

            {/* Body */}
            <div className="auth-body">
              {/* Error alert */}
              {error && (
                <div className="auth-alert auth-alert-error">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{error}</span>
                  <button className="alert-close" onClick={() => setError("")}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              )}

              {/* Success alert */}
              {success && (
                <div className="auth-alert auth-alert-success">
                  <i className="fas fa-check-circle"></i>
                  <span>{success}</span>
                </div>
              )}

              {/* Google login */}
              <button
                className="btn-google"
                onClick={() => (window.location.href = "/auth/google")}
              >
                <svg
                  className="google-logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
                Đăng nhập bằng Google
              </button>

              <div className="auth-divider">
                <span>hoặc</span>
              </div>

              {/* Login form */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-envelope"></i> Email
                  </label>
                  <div className="input-wrap">
                    <i className="fas fa-user input-ico"></i>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Nhập email của bạn"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-lock"></i> Mật khẩu
                  </label>
                  <div className="input-wrap">
                    <i className="fas fa-key input-ico"></i>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="eye-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      ></i>
                    </button>
                  </div>
                  <div className="forgot-row">
                    <a href="/forgot-password" className="form-link">
                      Quên mật khẩu?
                    </a>
                  </div>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Ghi nhớ đăng nhập
                  </label>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  <i className="fas fa-sign-in-alt"></i>
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="auth-footer">
              Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
