import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import styles from "./Header.module.css";
import logo from "../../../../assets/images/HomePage/Header/logo.png";
import cartIcon from "../../../../assets/images/HomePage/Header/cart.png";
import heroImage from "../../../../assets/images/HomePage/Header/hero.jpg";

function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/coffee", label: "Coffee" },
    { path: "/colored-phin", label: "Colored Phin" },
    { path: "/phin-combo", label: "Phin Combo" },
    { path: "/gift-set", label: "Gift Set" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={styles.header}>
        <div className={styles.container}>
          {/* LOGO */}
          <NavLink to="/" className={styles.logoLink}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </NavLink>

          {/* NAVIGATION */}
          <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
            <ul className={styles.menu}>
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? styles.active : styles.link
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {/* Auth button */}
              <li>
                <NavLink
                  to={user ? "/profile" : "/signup"}
                  className={styles.authBtn}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user ? "Profile" : "Login"}
                </NavLink>
              </li>

              {/* Cart inside burger (mobile) */}
              <li className={styles.mobileCart}>
                <NavLink
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className={styles.cartMobileLink}
                >
                  <img
                    src={cartIcon}
                    alt="cart"
                    className={styles.cartIconMobile}
                  />
                  <span>Cart</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* RIGHT SIDE (for desktop) */}
          <div className={styles.right}>
            <NavLink to="/cart" className={styles.cartDesktop}>
              <img src={cartIcon} alt="cart" className={styles.cartIcon} />
            </NavLink>

            <button
              className={`${styles.burgerBtn} ${
                isMenuOpen ? styles.burgerOpen : ""
              }`}
              onClick={toggleMenu}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION (only on Home Page) ===== */}
      {location.pathname === "/" && (
        <section
          className={styles.hero}
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>
              YOUR <span className={styles.heroBold}>PERSONALIZED</span> COFFEE
            </h1>
          </div>
        </section>
      )}
    </>
  );
}

export default Header;