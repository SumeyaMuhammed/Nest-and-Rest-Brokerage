import { useState } from "react";
import "./MenuBar.css";

const MenuBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="menu-bar">
      <div className="logo">
        <a href="/">MySite</a>
      </div>
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      > 
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>
      <nav className={`menu-links ${menuOpen ? "active" : ""}`}>
        <a href="/" className="menu-item">
          Home
        </a>
        <a href="/about" className="menu-item">
          About
        </a>
        <a href="/services" className="menu-item">
          Services
        </a>
        <a href="/contact" className="menu-item">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default MenuBar;
