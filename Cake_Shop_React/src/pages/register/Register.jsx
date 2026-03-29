import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../../api/axios.api";
import "./Register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle registration
  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      api
        .post("/api/users/register", formData)
        .then((response) => {
          const { user, authToken } = response.data;
          setUserData(user);
          sessionStorage.setItem("authToken", authToken);
          navigate("/");
          console.log("Registration successful", response.data);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header */}
        <div className="register-header">
          <h1 className="register-title">Registration Form</h1>
          <p className="register-subtitle">
            Please enter your user information.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="register-form">
          {/* first name Input */}
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-input ${errors.firstName ? "error" : ""}`}
            />
            {errors.firstName && (
              <span className="error-text">{errors.firstName}</span>
            )}
          </div>

          {/* last name Input */}
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={`form-input ${errors.lastName ? "error" : ""}`}
            />
            {errors.lastName && (
              <span className="error-text">{errors.lastName}</span>
            )}
          </div>

          {/* Email Input */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "error" : ""}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? "error" : ""}`}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? "error" : ""}`}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Phone Input */}
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${errors.phone ? "error" : ""}`}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          {/* Address Input */}
          <div className="form-group">
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className={`form-input textarea ${errors.address ? "error" : ""}`}
              rows="3"
            />
            {errors.address && (
              <span className="error-text">{errors.address}</span>
            )}
          </div>

          {/* Register Button */}
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        {/* Footer Link */}
        <div className="register-footer">
          <span>Already member? </span>
          <NavLink to="/login" className="footer-link">
            Login Here
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
