import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../../api/axios.api";
import "./ResetPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      navigate("/");
    }
  }, [navigate]);

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Handle Reset
  const handleReset = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically make an API call to update password
      console.log("Password reset successful for:", email);

      api
        .post("/api/users/password-reset", {
          email,
          newPassword,
          confirmPassword,
        })
        .then(() => {
          setSubmitted(true);
          // Redirect after 3 seconds
          setTimeout(() => {
            setEmail("");
            setNewPassword("");
            setConfirmPassword("");
            setSubmitted(false);
            navigate("/login");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error resetting password:", error);
        });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        {!submitted ? (
          <>
            {/* Header */}
            <div className="forgot-password-header">
              <h1 className="forgot-password-title">Reset Password</h1>
              <p className="forgot-password-subtitle">
                Enter your email and new password to reset your account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleReset} className="forgot-password-form">
              {/* Email Input */}
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-input ${errors.email ? "error" : ""}`}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              {/* New Password Input */}
              <div className="form-group">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`form-input ${errors.newPassword ? "error" : ""}`}
                />
                {errors.newPassword && (
                  <span className="error-text">{errors.newPassword}</span>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                />
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>

              {/* Reset Button */}
              <button type="submit" className="reset-btn">
                Reset Password
              </button>
            </form>

            {/* Footer Link */}
            <div className="forgot-password-footer">
              <NavLink to="/login" className="footer-link">
                ← Back to Login
              </NavLink>
            </div>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Password Reset Successfully</h2>
            <p>Your password has been updated successfully.</p>
            <p className="redirect-text">Redirecting to login page...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
