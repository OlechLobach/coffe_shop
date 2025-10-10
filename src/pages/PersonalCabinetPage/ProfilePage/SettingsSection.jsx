import React, { useState } from "react";
import { supabase } from "../../../db/supabaseClient";
import { AiOutlineCheck, AiOutlineClose, AiOutlineExclamationCircle } from "react-icons/ai";
import styles from "./ProfilePage.module.css";

export default function SettingsSection() {
  const [tab, setTab] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailUpdate = async () => {
    setMessage("");
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;
      setMessage("Email updated! Check your inbox to confirm.");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handlePasswordUpdate = async () => {
    if (password !== confirm) return setMessage("Passwords do not match.");
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage("Password updated successfully!");
      setPassword("");
      setConfirm("");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.rpc("delete_user_account");
      if (error) throw error;
      await supabase.auth.signOut();
      window.location.href = "/signup";
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
    }
  };

  const renderMessageIcon = () => {
    if (message.includes("updated") || message.includes("successfully")) return <AiOutlineCheck className={styles.icon} />;
    if (message.includes("Error")) return <AiOutlineClose className={styles.icon} />;
    if (message.includes("match")) return <AiOutlineExclamationCircle className={styles.icon} />;
    return null;
  };

  return (
    <section className={styles.card}>
      <h2>Account Settings</h2>

      <div className={styles.settingsTabs}>
        <button className={tab === "email" ? styles.activeTab : ""} onClick={() => setTab("email")}>Change Email</button>
        <button className={tab === "password" ? styles.activeTab : ""} onClick={() => setTab("password")}>Change Password</button>
        <button className={tab === "danger" ? styles.activeTab : ""} onClick={() => setTab("danger")}>Danger Zone</button>
      </div>

      <div className={styles.settingsContent}>
        {tab === "email" && (
          <div>
            <input type="email" placeholder="New email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className={styles.primaryBtn} onClick={handleEmailUpdate}>Update Email</button>
          </div>
        )}

        {tab === "password" && (
          <div>
            <input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            <button className={styles.primaryBtn} onClick={handlePasswordUpdate}>Update Password</button>
          </div>
        )}

        {tab === "danger" && (
          <div>
            <p className={styles.warningText}>
              <AiOutlineExclamationCircle className={styles.icon} /> Deleting your account is irreversible. All your data will be lost.
            </p>
            <button className={styles.deleteBtn} onClick={() => setShowConfirmModal(true)}>Delete Account</button>
          </div>
        )}
      </div>

      {message && (
        <p className={styles.message}>
          {renderMessageIcon()} {message}
        </p>
      )}

      {showConfirmModal && (
        <div className={styles.modalOverlay} onClick={() => setShowConfirmModal(false)}>
          <div className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            <h3><AiOutlineExclamationCircle className={styles.icon} /> Confirm Deletion</h3>
            <p>
              Are you sure you want to delete your account? <br />
              <strong>This action cannot be undone.</strong>
            </p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button className={styles.confirmDeleteBtn} onClick={handleDeleteAccount} disabled={loading}>
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}   