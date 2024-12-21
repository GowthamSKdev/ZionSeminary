import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import logo from "./assets/logo.png";
import google from "./assets/google.png";
// import facebook from "./facebook.png";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
    navigate("/login");
  };

  // Handle Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google User:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center">
      <div className="register-card d-flex flex-column flex-md-row shadow-lg rounded">
        {/* Left Column (Form) */}
        <div className="form-container w-100 w-md-50 px-5 py-4 bg-light">
          <img
            src={logo}
            alt="Zion Seminary Portal"
            style={{ width: "80px" }}
            className="rounded mb-2"
          />
          <h4 className="text-left text-dark fw-bold mb-3">Sign In</h4>
          <p className="text-muted">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-decoration-underline fw-semibold text-primary"
            >
              Create now
            </a>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-3">
              <label className="form-label fw-semibold">E-mail</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
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
              <a className="text-decoration-underline" href="">
                Forgot Password?
              </a>
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
                onClick={handleGoogleSignIn}
                className="btn btn-white w-100 mb-3 rounded-pill border d-flex align-items-center"
              >
                <img
                  src={google}
                  alt="Google"
                  style={{ width: "30px" }}
                  className="rounded mb-0"
                />
                <span className="flex-grow-1 text-center">
                  Sign in with Google
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column (Content) */}
        <div className="content-container w-100 w-md-50 p-4 bg-primary text-white d-flex flex-column justify-content-center">
          <h2 className="fw-bold mb-4 text-center">Welcome to Zion Seminary</h2>
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
  );
}

export default Login;
