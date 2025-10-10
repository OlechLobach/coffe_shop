import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
    setErrorMessage("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await register(email, password, name);
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.tabSwitcher}>
          <button
            className={isLogin ? styles.activeTab : ""}
            onClick={() => setIsLogin(true)}
          >
            Sign in
          </button>
          <button
            className={!isLogin ? styles.activeTab : ""}
            onClick={() => setIsLogin(false)}
          >
            Sign up
          </button>
        </div>

        {isLogin ? (
          <form className={styles.form} onSubmit={handleLoginSubmit}>
            <h2>Login to your account</h2>
            <label className={styles.authFormLabel}>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className={styles.authFormInput}
              />
            </label>
            <label className={styles.authFormLabel}>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className={styles.authFormInput}
              />
            </label>
            <button type="submit" className={styles.submitBtn}>
              Login
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleRegisterSubmit}>
            <h2>Create a new account</h2>
            <label className={styles.authFormLabel}>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className={styles.authFormInput}
              />
            </label>
            <label className={styles.authFormLabel}>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className={styles.authFormInput}
              />
            </label>
            <label className={styles.authFormLabel}>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className={styles.authFormInput}
              />
            </label>
            <button type="submit" className={styles.submitBtn}>
              Register
            </button>
          </form>
        )}

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <p className={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={toggleForm}>
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
      </div>
    </section>
  );
}
