import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import logo from "./assets/logo.png";
import google from "./assets/google.png";
import { toast } from "react-toastify";

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

  const apiBaseUrl = process.env.REACT_APP_BASE_API;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError("");
    try {
      // Exclude confirmPassword from the payload
      const { confirmPassword, ...formData } = data;

      const response = await axios.post(
        `${apiBaseUrl}/api/users/signup`,
        formData
      );
      navigate("/login");
      // if (response.status === 200) {
      //   reset();
      // }
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      // Call the Google login endpoint
      const res = await axios.post(`${apiBaseUrl}/api/google-login`);

      // Process the response
      if (res.status === 200) {
        const { user } = res.data;

        if (user) {
          // Save user data in local storage or context
          localStorage.setItem("userData", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", "true");
          toast.success("Google Login Successful");
          toast.success("Google Login Successful");

          // Redirect user based on their role
          const userRole = user.role ? user.role.toLowerCase() : null;
          if (userRole === "admin") {
            navigate("/admin");
          } else if (userRole === "client") {
            navigate("/home");
          } else {
            toast.error("Role not recognized");
          }
        } else {
          toast.error("Failed to retrieve user details.");
        }
      } else {
        toast.error("Google Login Failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("An error occurred during Google Login.");
    }
  };

  return (
    <div className="register" style={{ height: "100%", minHeight: "100vh" }}>
      <div className="register-container d-flex justify-content-center align-items-center min-vh-100">
        <div className="register-card d-flex flex-column flex-lg-row shadow-lg rounded">
          {/* Left Column (Form) */}
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
              {/* <a
                href="/login"
                className="text-decoration-underline fw-semibold text-primary"
              >
                Sign In
              </a> */}
              <Link to={"/login"}>
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
              <div className="form-group mb-2">
                <label className="form-label fw-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group mb-2">
                <label
                  className="form-label fw-semibold"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="form-check d-flex justify-content-between mb-2">
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
                  href="/forgot-password"
                  className="text-decoration-underline"
                >
                  Forgot Password?
                </a>
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

              {/* <div className="text-center mb-3">
                <div className="d-flex align-items-center mb-3">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 fw-semibold">Or</span>
                  <hr className="flex-grow-1" />
                </div>

                <button
                  type="button"
                  className="btn btn-white w-100 mb-3 rounded-pill border d-flex align-items-center"
                  onClick={() => {
                    handleGoogleLogin()
                  }}
                >
                  <img
                    src={google}
                    alt="Google Icon"
                    className="rounded mb-0"
                    style={{ width: "30px" }}
                  />
                  <span className="flex-grow-1 text-center">
                    Sign up with Google
                  </span>
                </button>
              </div> */}
            </form>
          </div>

          {/* Right Column (Content) */}
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
