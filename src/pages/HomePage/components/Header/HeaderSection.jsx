import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../../../assets/images/HomePage/Header/logo.png";
import cartIcon from "../../../../assets/images/HomePage/Header/cart.png";
import heroImage from "../../../../assets/images/HomePage/Header/hero.jpg";

function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={isHome ? styles.header : styles.defaultHeader}>
      {isHome ? (
        <div className={styles.container}>
          <div className={styles.left}>
            <NavLink to="/" className={styles.logoLink}>
              <img src={logo} alt="Logo" className={styles.logo} />
            </NavLink>
            <h2 className={styles.slogan}>
              YOUR <span className={styles.bold}>PERSONALIZED</span> COFFEE
            </h2>
          </div>
          <div className={styles.centre}>
            <img src={heroImage} alt="hero" className={styles.heroImage} />
          </div>
          <div className={styles.right}>
            <nav className={styles.navBar}>
                  <NavLink to="/cart" className={styles.defaultCart}>
                    <img src={cartIcon} alt="cart icon" className={styles.cartIcon} />
                  </NavLink>
              <ul className={styles.menu}>
                <li>

                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? styles.activeMenuBtn : styles.menuBtn
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink  
                    to="/coffee"
                    className={({ isActive }) =>
                      isActive ? styles.activeMenuBtn : styles.menuBtn
                    }
                  >
                    Coffee
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/colored-phin"
                    className={({ isActive }) =>
                      isActive ? styles.activeMenuBtn : styles.menuBtn
                    }
                  >
                    Colored Phin
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/phin-combo"
                    className={({ isActive }) =>
                      isActive ? styles.activeMenuBtn : styles.menuBtn
                    }
                  >
                    Phin Combo
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/gift-set"
                    className={({ isActive }) =>
                      isActive ? styles.activeMenuBtn : styles.menuBtn
                    }
                  >
                    Gift Set
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? styles.activeMenuBtn : styles.menuBtn
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <div className={styles.defaultContainer}>
          <NavLink to="/" className={styles.defaultLogoLink}>
          <img src={logo} alt="LOGO REVO COFFEE" className={styles.defaultLogo}/>
          </NavLink>
          <div className={styles.defaultLink}>
            <nav className={styles.defaultNavBar}>
              <ul className={styles.defaultMenu}>
                <li className={styles.defaultMenuItems}>
                  <NavLink to="/" className={styles.defaultMenuLink}>Home</NavLink>
                </li>
                <li className={styles.defaultMenuItems}>
                  <NavLink to="/Coffee" className={styles.defaultMenuLink}>Coffee</NavLink>
                </li>
                <li className={styles.defaultMenuItems}>
                  <NavLink to="colored-phin" className={styles.defaultMenuLink}>Colored Phin</NavLink>
                </li>
                <li className={styles.defaultMenuItems}>
                  <NavLink to="/phin-combo" className={styles.defaultMenuLink}>Phin Combo</NavLink>
                </li>
                <li className={styles.defaultMenuItems}>
                  <NavLink to="/gift-set" className={styles.defaultMenuLink}>Gift Set</NavLink>
                </li>
                <li className={styles.defaultMenuItems}>
                  <NavLink to="/contact" className={styles.defaultMenuLink}>Contact</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <NavLink to="/cart" className={styles.defaultCart}>
                <img src={cartIcon} alt="cart icon" className={styles.defaultCartIcon} />
          </NavLink>
        </div>

      )}
    </header>
  );
}

export default Header;
