import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import logo from "./assets/logo.png";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams(); // Extract token from URL
  // const history = useHistory();
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_BASE_API;
  // Function to handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/users/reset-password/${token}`,
        {
          newPassword,
        }
      );

      // Success message
      setMessage(response.data.message);
      setError("");

      // Redirect to login page after success
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Wait for 3 seconds before redirecting
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      setMessage("");
    }
  };

  return (
    <>
      <div
        className="register position-relative"
        style={{ height: "100%", minHeight: "100dvh" }}>
        <div className="register-container d-flex justify-content-center align-items-center">
          <div className="register-card d-flex flex-column flex-md-row shadow-lg rounded">
            {/* Left Column (Form) */}
            <div className="form-container d-flex flex-column w-100 w-md-50 px-5 py-4 bg-light">
              <img
                src={logo}
                alt="Zion Seminary Portal"
                className="rounded mb-2"
                style={{ width: "80px" }}
              />
              <h4 className="text-left text-dark fw-bold mb-3">
                Reset Password
              </h4>
              {/* <p className="text-muted">
                Don't have an account?{" "}
                <Link to={"/"}>
                  <p className="text-decoration-underline fw-semibold text-primary">
                    Create Now
                  </p>
                </Link>
              </p> */}
              <div className="reset-password-container">
                {/* <h2>Reset Password</h2> */}

                <form onSubmit={handleResetPassword}>
                
                  <div className="form-group mb-3">
                    <label htmlFor="form-label fw-semibold">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="form-label fw-semibold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="reset-password-btn btn btn-primary w-100 mb-3 rounded-pill ">
                    Reset Password
                  </button>
                </form>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
              </div>
              {/* <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-3">
                      <label className="form-label fw-semibold">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email Id"
                        {...register("email", { required: true })}
                      />
                    </div>
      
                    <div className="form-group mb-3">
                      <label className="form-label fw-semibold">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        {...register("password", { required: true })}
                      />
                    </div>
      
                    <div className="form-check d-flex justify-content-between mb-3">
                      <div>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMe"
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
                      <a
                        className="text-decoration-underline"
                        onClick={() => navigate(`/forgotPassword`)}
                        style={{ cursor: "pointer" }}>
                        Forgot Password?
                      </a>
                    </div>
      
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mb-3 rounded-pill">
                      Sign In
                    </button>
      
                    <div className="text-center mb-3">
                      <div className="d-flex align-items-center mb-3">
                        <hr className="flex-grow-1" />
                        <span className="mx-2 fw-semibold">Or</span>
                        <hr className="flex-grow-1" />
                      </div>
      
                      <button
                        type="button"
                        className="btn btn-white w-100 mb-3 rounded-pill border d-flex align-items-center"
                        onClick={handleGoogleSignIn}
                        disabled={isSigningIn}>
                        <img
                          src={google}
                          alt="Google"
                          className="rounded mb-0"
                          style={{ width: "30px" }}
                        />
                        <span className="flex-grow-1 text-center">
                          {isSigningIn ? "Signing in..." : "Sign in with Google"}
                        </span>
                      </button>
                    </div>
                  </form> */}
            </div>

            {/* Right Column (Content) */}
            <div className="content-container w-100 w-md-50 p-4 bg-primary text-white d-flex flex-column justify-content-center">
              <h2 className="fw-bold mb-4 text-center">
                Welcome to Zion Seminary
              </h2>
              <p className="mb-4 text-center">
                Zion Seminary's{" "}
                <strong>Education Management System (EMS)</strong> offers:
              </p>

              <ul className="list-unstyled">
                <li className="d-flex mb-1">
                  <i
                    className="bi bi-check-circle-fill me-3"
                    style={{ fontSize: "1.5rem", color: "#ffd800" }}></i>
                  <span>
                    Comprehensive tools for administrators to manage data
                    efficiently.
                  </span>
                </li>
                <li className="d-flex mb-1">
                  <i
                    className="bi bi-check-circle-fill me-3"
                    style={{ fontSize: "1.5rem", color: "#ffd800" }}></i>
                  <span>
                    Enhanced teaching tools for educators to simplify course
                    management.
                  </span>
                </li>
                <li className="d-flex mb-1">
                  <i
                    className="bi bi-check-circle-fill me-3"
                    style={{ fontSize: "1.5rem", color: "#ffd800" }}></i>
                  <span>
                    User-friendly interface for students to track their
                    progress.
                  </span>
                </li>
                <li className="d-flex mb-1">
                  <i
                    className="bi bi-check-circle-fill me-3"
                    style={{ fontSize: "1.5rem", color: "#ffd800" }}></i>
                  <span>
                    Seamless integration of academic and administrative
                    workflows.
                  </span>
                </li>
              </ul>

              <p className="mt-4 text-center">
                Join us today and transform your educational experience with
                Zion Seminary!
              </p>
            </div>

            {/* Forgot Password Popup */}
            {/* {showForgotPassword && (
                  <div className="popup-overlay position-absolute top-50 start-50 translate-middle-x translate-middle-y bg-light p-2 rounded-2 z-2 ">
                    <div className="popup-content">
                      <h4>Forgot Password</h4>
                      <p>Enter your email to receive a password reset link.</p>
                      <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Enter your email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                      />
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-secondary me-2" onClick={() => setShowForgotPassword(false)}>
                          Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleForgotPassword}>
                          Send Reset Link
                        </button>
                      </div>
                    </div>
                  </div>
                )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
