import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "./assets/logo.png";

const apiBaseUrl = process.env.REACT_APP_BASE_API;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotEmail, setForgotEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle forgot password
  const handleForgotPassword = async (event) => {
    event.preventDefault(); // Prevent page reload

    if (!forgotEmail) {
      toast.error("Please enter your email.");
      return;
    }

    setIsLoading(true); // Set loading state
    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/users/forgot-password`,
        { email: forgotEmail }
      );

      if (response.status === 200) {
        toast.success("Password reset link sent to your email.");
        setForgotEmail(""); // Reset input field
      }
    } catch (error) {
      console.error("Error sending reset link: ", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to send password reset link. Please try again."
      );
    } finally {
      setIsLoading(false); // Reset loading state
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

              <div className="reset-password-container">
                <form onSubmit={handleForgotPassword}>
                  <div className="form-group mb-3">
                    <label
                      htmlFor="forgotEmail"
                      className="form-label fw-semibold mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      id="forgotEmail"
                      name="forgotEmail"
                      className="form-control mt-3"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-end w-100 gap-5">
                    <button
                      className="btn btn-secondary w-100 mb-3 rounded-pill"
                      onClick={() => navigate("/login")}
                      type="button">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="reset-password-btn btn btn-primary w-100 mb-3 rounded-pill"
                      disabled={isLoading}>
                      {isLoading ? "Sending..." : "Reset Password"}
                    </button>
                  </div>
                </form>
              </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
