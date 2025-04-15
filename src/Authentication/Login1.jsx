import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import logo from "./assets/logo.png";
import google from "./assets/google.png";
import { toast } from "react-toastify";
import axios from "axios";

// Firebase imports
import {
  auth,
  googleProvider,
  signInWithPopup,
} from "../Admin/firebase/firebase";

// API base URL from environment variables
const apiBaseUrl = process.env.REACT_APP_BASE_API;

function Login() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${apiBaseUrl}/api/users/login`, data);
      const { user } = res.data;
      const findUser = await axios.get(`${apiBaseUrl}/api/users/${user.id}`);
      const CurrentUser = findUser.data.user;

      if (CurrentUser) {
        setUserdata(CurrentUser);
        localStorage.setItem("userdata", JSON.stringify(CurrentUser));
        localStorage.setItem("isloggedin", true);
        toast.success("Login Successful");

        const userRole = CurrentUser.role
          ? CurrentUser.role.toLowerCase()
          : null;
        const hasDetails = CurrentUser.details;

        if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "client") {
          if (hasDetails === true) {
            navigate("/waitAuth", { state: { userId: CurrentUser._id } });
          } else {
            navigate("/elf", { state: { userId: CurrentUser._id } });
          }
        } else {
          toast.error("Role not recognized");
        }
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Invalid username or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    if (isSigningIn) return;

    setIsSigningIn(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const response = await axios.post(`${apiBaseUrl}/api/users/auth/google`, {
        token,
      });

      const { user } = response.data;
      if (user) {
        const findUser = await axios.get(`${apiBaseUrl}/api/users/${user.id}`);
        const CurrentUser = findUser.data.user;
        localStorage.setItem("userdata", JSON.stringify(CurrentUser));
        localStorage.setItem("isloggedin", true);
        toast.success("Google Login Successful");

        const userRole = CurrentUser.role
          ? CurrentUser.role.toLowerCase()
          : null;
        const hasDetails = CurrentUser.details;

        if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "client") {
          if (hasDetails === true) {
            navigate("/waitAuth", { state: { userId: CurrentUser._id } });
          } else {
            navigate("/elf", { state: { userId: CurrentUser._id } });
          }
        } else {
          toast.error("Role not recognized");
        }
      } else {
        toast.error("Failed to retrieve user details.");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In Failed. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div
      className="register position-relative"
      style={{ height: "100%", minHeight: "100dvh" }}
    >
      <div className="register-container d-flex justify-content-center align-items-center">
        <div className="register-card d-flex flex-column flex-md-row shadow-lg rounded">
          {/* Left Column */}
          <div className="form-container d-flex flex-column w-100 w-md-50 px-5 py-4 bg-light">
            <img
              src={logo}
              alt="Zion Seminary Portal"
              className="rounded mb-2"
              style={{ width: "80px" }}
            />
            <h4 className="text-left text-dark fw-bold mb-3">Sign In</h4>
            <p className="text-muted">
              Don't have an account?{" "}
              <Link to={"/"}>
                <p className="text-decoration-underline fw-semibold text-primary">
                  Create Now
                </p>
              </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">E-mail or Username</label>
                <input
                  // type="email"
                  type="text"
                // type={"email" || "text"}


                  className="form-control"
                  placeholder="Enter email Id or Username"
                  {...register("email", { required: true })}
                />
              </div>

              {/* Password with visibility toggle */}
              <div className="form-group mb-3 position-relative">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Password"
                  {...register("password", { required: true })}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "70%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6c757d",
                    zIndex: 10,
                  }}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-slash-fill"></i>
                  ) : (
                    <i className="bi bi-eye-fill"></i>
                  )}
                </span>
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
                <span
                  className="text-decoration-underline"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/forgotPassword`)}
                >
                  Forgot Password?
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3 rounded-pill"
              >
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
                  disabled={isSigningIn}
                >
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
            </form>
          </div>

          {/* Right Column */}
          <div className="content-container w-100 w-md-50 p-4 bg-primary text-white d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-4 text-center">
              Welcome to Zion Seminary
            </h2>
            <p className="mb-4 text-center">
              Zion Seminary's <strong>Education Management System (EMS)</strong>{" "}
              offers:
            </p>

            <ul className="list-unstyled">
              <li className="d-flex mb-1">
                <i
                  className="bi bi-check-circle-fill me-3"
                  style={{ fontSize: "1.5rem", color: "#ffd800" }}
                ></i>
                <span>
                  Comprehensive tools for administrators to manage data
                  efficiently.
                </span>
              </li>
              <li className="d-flex mb-1">
                <i
                  className="bi bi-check-circle-fill me-3"
                  style={{ fontSize: "1.5rem", color: "#ffd800" }}
                ></i>
                <span>
                  Enhanced teaching tools for educators to simplify course
                  management.
                </span>
              </li>
              <li className="d-flex mb-1">
                <i
                  className="bi bi-check-circle-fill me-3"
                  style={{ fontSize: "1.5rem", color: "#ffd800" }}
                ></i>
                <span>
                  User-friendly interface for students to track their progress.
                </span>
              </li>
              <li className="d-flex mb-1">
                <i
                  className="bi bi-check-circle-fill me-3"
                  style={{ fontSize: "1.5rem", color: "#ffd800" }}
                ></i>
                <span>
                  Seamless integration of academic and administrative workflows.
                </span>
              </li>
            </ul>

            <p className="mt-4 text-center">
              Join us today and transform your educational experience with Zion
              Seminary!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
