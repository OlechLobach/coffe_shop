import React, { useState, useEffect } from "react";
import { supabase } from "../../../db/supabaseClient";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/signup");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) setError(error.message);
    else {
      setProfile(data);
      setFullName(data.full_name || "");
      setPhone(data.phone || "");
      setAvatarUrl(data.avatar_url || "");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if (!profile) return;

    let avatar_path = avatarUrl;

    if (avatarFile) {
      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `${profile.id}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, { upsert: true });

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      avatar_path = data.publicUrl;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone, avatar_url: avatar_path })
      .eq("id", profile.id);

    if (updateError) setError(updateError.message);
    else alert("Profile updated!");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/signup");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.profilePage}>
      <h2>Personal Cabinet</h2>

      <div className={styles.avatarContainer}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className={styles.avatar} />
        ) : (
          <div className={styles.noAvatar}>No Avatar</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files[0])}
        />
      </div>

      <label>
        Full Name
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </label>

      <label>
        Phone (optional)
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <button onClick={handleUpdate}>Update Profile</button>
      <button onClick={handleLogout} style={{ backgroundColor: "red", marginTop: "10px" }}>
        Log Out
      </button>
    </div>
  );
}