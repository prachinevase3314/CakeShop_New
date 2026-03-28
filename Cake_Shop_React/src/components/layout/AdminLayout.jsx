import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaList,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import { SHOP_NAME } from "../../utils/constants";
import Navbar from "../navbar";
import "./AdminLayout.scss";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Products", icon: <FaBox />, path: "/admin/products" },
    { name: "Categories", icon: <FaList />, path: "/admin/categories" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/admin/orders" },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <div className="sidebar-header">
            <h2>{SHOP_NAME}</h2>
          </div>

          <nav className="sidebar-nav">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    end
                  >
                    <span className="icon">{item.icon}</span>
                    <span className="text">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-footer">
            <p>© 2025 {SHOP_NAME} Admin</p>
          </div>
        </aside>

        {/* Main Content */}
        <div className="admin-main">
          <header className="admin-header">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>
            <h1>Admin Dashboard</h1>
          </header>

          <main className="admin-content">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
