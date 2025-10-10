import React, { useState } from "react";
import { supabase } from "../../../../db/supabaseClient";
import { FaTimes, FaCamera } from "react-icons/fa";
import styles from "../ProfilePage.module.css";

export default function ProfileModal({ profile, onClose, onUpdated }) {
  const [fullName, setFullName] = useState(profile.full_name || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated.");

      let newAvatar = avatarUrl;

      if (avatarFile) {
        const ext = avatarFile.name.split(".").pop();
        const filePath = `${user.id}/avatar.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, { upsert: true });
        if (uploadError) throw uploadError;

        const { data: publicData } = await supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);
        newAvatar = publicData.publicUrl;
      }

      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName, phone, avatar_url: newAvatar })
        .eq("id", user.id);

      if (error) throw error;

      onUpdated();
      onClose();
    } catch (err) {
      alert("❌ Update failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Update Profile</h2>

        <div className={styles.avatarContainer}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className={styles.avatar} />
          ) : (
            <div className={styles.noAvatar}>No Avatar</div>
          )}

          <label className={styles.changeAvatarBtn}>
            <FaCamera />
            <span>Change Avatar</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setAvatarFile(file);
                  setAvatarUrl(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button
          className={styles.primaryBtn}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}