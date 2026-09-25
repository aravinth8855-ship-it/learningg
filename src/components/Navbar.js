import React, { useState } from "react";

const Navbar = ({ page, setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (newPage) => {
    setPage(newPage);
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* BRAND */}
        <div
          className="brand"
          onClick={() => handleNavigation("dashboard")}
        >
          <span className="brand-icon">₹</span>

          <div className="brand-text">
            <h1>MoneyFlow</h1>
            <p>Personal Finance</p>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="nav-buttons desktop-nav">

          <button
            className={
              page === "dashboard"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => handleNavigation("dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={
              page === "goals"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => handleNavigation("goals")}
          >
            <span>◎</span>
            Goals
          </button>

        </nav>

        {/* RIGHT SIDE */}
        <div className="navbar-right">

          <div className="saving-status">
            <span className="status-dot"></span>
            <span>Saving Mode</span>
          </div>

          <div className="profile-circle">
            A
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

      </div>

      {/* MOBILE NAVIGATION */}
      <div
        className={
          menuOpen
            ? "mobile-nav mobile-nav-open"
            : "mobile-nav"
        }
      >

        <button
          className={
            page === "dashboard"
              ? "mobile-nav-button active"
              : "mobile-nav-button"
          }
          onClick={() => handleNavigation("dashboard")}
        >
          <span>⌂</span>
          Dashboard
        </button>

        <button
          className={
            page === "goals"
              ? "mobile-nav-button active"
              : "mobile-nav-button"
          }
          onClick={() => handleNavigation("goals")}
        >
          <span>◎</span>
          Goals
        </button>

      </div>
    </header>
  );
};

export default Navbar;