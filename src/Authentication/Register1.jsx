import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import logo from "./assets/logo.png";
import google from "./assets/google.png";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const apiBaseUrl = process.env.REACT_APP_BASE_API;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError("");
    try {
      const { confirmPassword, ...formData } = data;
      const response = await axios.post(
        `${apiBaseUrl}/api/users/signup`,
        formData
      );
      navigate("/login");
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register" style={{ height: "100%", minHeight: "100vh" }}>
      <div className="register-container d-flex justify-content-center align-items-center min-vh-100">
        <div className="register-card d-flex flex-column flex-lg-row shadow-lg rounded">
          {/* Left Side - Form */}
          <div className="form-container d-flex flex-column w-100 w-lg-50 px-4 py-4 bg-light">
            <img
              src={logo}
              alt="Logo"
              className="rounded mb-2"
              style={{ width: "80px" }}
            />
            <h4 className="text-left text-dark fw-bold mb-3">Sign Up</h4>
            <p className="text-muted">
              Already have an account?{" "}
              <Link to="/login">
                <p className="text-decoration-underline fw-semibold text-primary">
                  Sign In
                </p>
              </Link>
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Username */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "Username can only contain letters and numbers",
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-danger">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-group mb-2">
                <label className="form-label fw-semibold" htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="form-group mb-2 position-relative">
                <label className="form-label fw-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control pe-5"
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "38px",
                    cursor: "pointer",
                    color: "#555",
                  }}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </span>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group mb-2 position-relative">
                <label
                  className="form-label fw-semibold"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control pe-5"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "38px",
                    cursor: "pointer",
                    color: "#555",
                  }}
                >
                  <i
                    className={`bi ${
                      showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </span>
                {errors.confirmPassword && (
                  <p className="text-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 mb-3 rounded-pill"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>

              {serverError && (
                <p className="text-danger text-center">{serverError}</p>
              )}
            </form>
          </div>

          {/* Right Side - Info */}
          <div className="content-container w-100 w-lg-50 p-4 bg-primary text-white d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-4 text-center">Welcome to Our Portal</h2>
            <p className="mb-4 text-center">
              Our platform offers tools for efficient management, enhanced
              learning, and seamless collaboration.
            </p>
            <ul className="list-unstyled">
              <li className="d-flex mb-1">
                <i
                  className="bi bi-check-circle-fill me-3"
                  style={{ fontSize: "1.5rem", color: "#ffd800" }}
                ></i>
                <span>Streamlined management tools for administrators.</span>
              </li>
              <li className="d-flex mb-1">
                <i
                  className="bi bi-check-circle-fill me-3"
                  style={{ fontSize: "1.5rem", color: "#ffd800" }}
                ></i>
                <span>Comprehensive tools for students and educators.</span>
              </li>
            </ul>
            <p className="mt-4 text-center">
              Join us today and experience the difference!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
