import React from "react";
import styles from "./ProfilePage.module.css";

export default function ProfileSection({ profile, orders, onEdit }) {
  const totalOrders = orders.length;
  const totalAmount = orders
    .reduce((acc, o) => acc + parseFloat(o.total), 0)
    .toFixed(2);
  const lastOrderDate = orders[0]?.created_at
    ? new Date(orders[0].created_at).toLocaleDateString()
    : "-";

  return (
    <section className={styles.card}>
      <h2>Hello, {profile.full_name || "User"}!</h2>
      <div className={styles.profileContainer}>
        {profile.avatar_url ? (
          <img
            key={profile.avatar_url}
            src={profile.avatar_url}
            alt="Avatar"
            className={styles.avatar}
          />
        ) : (
          <div className={styles.noAvatar}>No Avatar</div>
        )}
        <div className={styles.profileInfo}>
          <p><strong>Full Name:</strong> {profile.full_name || "-"}</p>
          <p><strong>Phone:</strong> {profile.phone || "-"}</p>
          <p><strong>Email:</strong> {profile.email || "-"}</p>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h3>{totalOrders}</h3>
          <p>Total Orders</p>
        </div>
        <div className={styles.statCard}>
          <h3>${totalAmount}</h3>
          <p>Total Spent</p>
        </div>
        <div className={styles.statCard}>
          <h3>{lastOrderDate}</h3>
          <p>Last Order</p>
        </div>
      </div>

      <button className={styles.primaryBtn} onClick={onEdit}>
        Update Profile
      </button>
    </section>
  );
}
