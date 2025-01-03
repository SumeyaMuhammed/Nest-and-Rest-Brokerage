// src/components/Header.jsx
import { useState, useEffect } from "react";
import classes from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/useAuth"; // import the context

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Get auth state and logout function
  const navigate = useNavigate(); // Navigate after logout

  // Collapse menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout(); // Log the user out
    navigate("/login"); // Redirect to login page
  };

  return (
    <header>
      <div className={classes.navbar}>
        {/* Logo */}
        <div className={classes.logo}>
          <a href="#">Nest & Ride</a>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={classes.hamburger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <FaTimes size={24} color="white" />
          ) : (
            <FaBars size={24} color="white" />
          )}
        </button>

        {/* Navigation Links */}
        <nav className={`${classes.nav} ${isMenuOpen ? classes.active : ""}`}>
          <Link to="/" className={classes.navLink}>
            Home
          </Link>
          <Link to="/services" className={classes.navLink}>
            Services
          </Link>
          <Link to="/about" className={classes.navLink}>
            About
          </Link>
          <Link to="/contact" className={classes.navLink}>
            Get in Touch
          </Link>

          {/* Conditionally render Sign Up or Log Out */}
          {!isAuthenticated ? (
            <Link to="/register">
              <button className={classes.signup}>Sign Up</button>
            </Link>
          ) : (
            <button className={classes.signup} onClick={handleLogout}>
              Log Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
