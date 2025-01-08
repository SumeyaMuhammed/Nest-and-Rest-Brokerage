import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./header.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/useAuth"; 
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); 
  const location = useLocation();

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
    logout(); 
    navigate("/");
  };

  return (
    <header>
      <div className={classes.navbar}>
        <div className={classes.logo}>
          <a href="#">Nest & Ride</a>
        </div>

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

        <nav className={`${classes.nav} ${isMenuOpen ? classes.active : ""}`}>
          <Link
            to="/"
            className={`${classes.navLink} ${
              location.pathname === "/" ? classes.active : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={`${classes.navLink} ${
              location.pathname === "/services" ? classes.active : ""
            }`}
          >
            Services
          </Link>
          <Link
            to="/about"
            className={`${classes.navLink} ${
              location.pathname === "/about" ? classes.active : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/GetInTouch"
            className={`${classes.navLink} ${
              location.pathname === "/GetInTouch" ? classes.active : ""
            }`}
          >
            Get in Touch
          </Link>

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
