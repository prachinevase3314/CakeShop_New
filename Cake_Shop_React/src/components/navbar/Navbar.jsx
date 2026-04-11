import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { SHOP_NAME } from "../../utils/constants";
import { isUserAdmin, logoutAction } from "../../utils/commonUtils";
import "./index.scss";

const CART_KEY = "cartItems";

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;
  const isAdmin = isUserAdmin();

  const getCartCount = () => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      const items = stored ? JSON.parse(stored) : [];
      return items.reduce((count, item) => count + (item.quantity || 1), 0);
    } catch (error) {
      return 0;
    }
  };

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

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
      <div className="navbar-logo nav-links">
        <NavLink to="/">{SHOP_NAME}</NavLink>
      </div>

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
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </NavLink>
        <NavLink to="/contactUs" className={navClass}>
          Contact Us
        </NavLink>

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
