import React, { useContext, useState } from "react";
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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  // const [forgotEmail, setForgotEmail] = useState("");
  const [userdata, setUserdata] = useState(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // Handle form submission
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
        console.log(CurrentUser);

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
            navigate("/elf", {
              state: { userId: CurrentUser._id },
            });
          }
        } else {
          toast.error("Role not recognized");
        }
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
      toast.error("An error occurred while logging in. Please try again.");
    }
  };

  // Handle Google Sign-In
  // const handleGoogleSignIn = async () => {
  //   if (isSigningIn) return; // Prevent duplicate sign-in attempts

  //   setIsSigningIn(true);

  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const token = await result.user.getIdToken();
  //     console.log("Google Sign-In Success:", result.user);

  //     // Send the token to the backend
  //     const response = await axios.post(`${apiBaseUrl}/api/users/auth/google`, { token });
  //     console.log(response);

  //     if (response.status === 200) {
  //       const { user } = response.data;
  //       if (user) {
  //         localStorage.setItem("userdata", JSON.stringify(user));
  //         localStorage.setItem("isloggedin", true);
  //         toast.success("Google Login Successful");

  //         const userRole = user.role
  //           // ? user.role.toLowerCase() : null;
  //         if (userRole === "admin") {
  //           navigate("/admin");
  //         } else if (userRole === "client") {
  //           navigate(hasDetails ? "/elf" : "/waitAuth", {state:{userId:user.id}});
  //         } else {
  //           toast.error("Role not recognized");
  //         }
  //       } else {
  //         toast.error("Failed to retrieve user details.");
  //       }
  //     } else {
  //       toast.error("Google Login Failed. Please try again.");
  //     }
  //   } catch (error) {
  //     toast.error("Google Sign-In Failed:", error);
  //   } finally {
  //     setIsSigningIn(false); // Reset flag after sign-in completes
  //   }
  // };

  const handleGoogleSignIn = async () => {
    if (isSigningIn) return; // Prevent duplicate sign-in attempts

    setIsSigningIn(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken(); // Get Firebase authentication token
      console.log("Google Sign-In Success:", result.user);

      // Send the token to the backend
      const response = await axios.post(`${apiBaseUrl}/api/users/auth/google`, {
        token,
      });

      // Process the backend response
      const { user } = response.data;
      if (user) {
        const findUser = await axios.get(`${apiBaseUrl}/api/users/${user.id}`);
        const CurrentUser = findUser.data.user;
        localStorage.setItem("userdata", JSON.stringify(CurrentUser));
        localStorage.setItem("isloggedin", true);
        toast.success("Google Login Successful");

        // Determine the user role and navigate accordingly
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
            navigate("/elf", {
              state: { userId: CurrentUser._id },
            });
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
      setIsSigningIn(false); // Reset the signing-in flag
    }
  };

  // // Handle forgot password
  // const handleForgotPassword = async () => {
  //   if (!forgotEmail) {
  //     toast.error("Please enter your email.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(`${apiBaseUrl}/api/users/forgot-password`, { email: forgotEmail });
  //     if (response.status === 200) {
  //       toast.success("Password reset link sent to your email.");
  //       setShowForgotPassword(false);
  //       setForgotEmail("");
  //     }
  //   } catch (error) {
  //     console.error("Error sending reset link: ", error);
  //     toast.error("Failed to send password reset link. Please try again.");
  //   }
  // };

  return (
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
                <label className="form-label fw-semibold">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email Id"
                  {...register("email", { required: true })}
                />
              </div>
              {/* <div className="form-group mb-3">
                <label className="form-label fw-semibold">E-mail</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email Id Or User name"
                  {...register("email", { required: true })}
                />
              </div> */}

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
            </form>
          </div>

          {/* Right Column (Content) */}
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
                  User-friendly interface for students to track their progress.
                </span>
              </li>
              <li className="d-flex mb-1">
                <i
                  className="bi bi-check-circle-fill me-3"
                  style={{ fontSize: "1.5rem", color: "#ffd800" }}></i>
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
  );
}

export default Login;
