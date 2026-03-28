import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { SHOP_NAME } from "../../utils/constants";
import { logoutAction } from "../../utils/commonUtils";
import "./index.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Helper for active styling
  const navClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    logoutAction();
    setIsProfileMenuOpen(false);
    navigate("/login");
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="navbar flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <div className="navbar-logo nav-links">
        <NavLink to="/">{SHOP_NAME}</NavLink>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
        <NavLink to="/shop" className={navClass}>
          Shop
        </NavLink>
        <NavLink to="/about" className={navClass}>
          About Us
        </NavLink>
        <NavLink to="/cart" className={navClass}>
          <FaCartPlus size={20} />
        </NavLink>
        <NavLink to="/contactUs" className={navClass}>
          Contact Us
        </NavLink>

        {/* Profile Icon with Dropdown Menu */}
        <div className="profile-menu-container">
          <button
            className="profile-icon-btn"
            onClick={toggleProfileMenu}
            aria-label="Profile menu"
          >
            <FaRegCircleUser size={28} strokeWidth={1.5} />
          </button>

          {isProfileMenuOpen && (
            <div className="profile-dropdown-menu">
              <NavLink
                to="/profile"
                className="dropdown-item"
                onClick={closeProfileMenu}
              >
                Profile
              </NavLink>

              {isAdmin && (
                <NavLink
                  to="/admin"
                  className="dropdown-item"
                  onClick={closeProfileMenu}
                >
                  Admin
                </NavLink>
              )}

              <button
                className="dropdown-item logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
