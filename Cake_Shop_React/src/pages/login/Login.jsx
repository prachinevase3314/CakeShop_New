import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SHOP_NAME } from "../../utils/constants";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
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

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle Sign In
  const handleSignIn = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically make an API call
      // For now, we'll create a mock token
      const mockToken = "authToken_" + Date.now();

      // Store the auth token in sessionStorage
      sessionStorage.setItem("authToken", mockToken);

      console.log("Login successful", { email, password });

      // Redirect to home page after successful login
      navigate("/");
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h1 className="login-title">{SHOP_NAME}</h1>
          <p className="login-subtitle">Please enter your user information.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="login-form">
          {/* Email Input */}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-input ${errors.email ? "error" : ""}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-input ${errors.password ? "error" : ""}`}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* Sign In Button */}
          <button type="submit" className="sign-in-btn">
            Sign in
          </button>
        </form>

        {/* Footer Links */}
        <div className="login-footer">
          <NavLink to="/register" className="footer-link">
            Create An Account
          </NavLink>
          <NavLink to="/reset-password" className="footer-link">
            Forgot Password
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
