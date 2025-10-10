import React, { useState, useEffect } from "react";
import { supabase } from "../../../db/supabaseClient";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBox, FaCog, FaSignOutAlt } from "react-icons/fa";
import styles from "./ProfilePage.module.css";

import ProfileSection from "./ProfileSection";
import OrdersSection from "./OrdersSection";
import SettingsSection from "./SettingsSection";
import ProfileModal from "./Modals/ProfileModal";
import OrderDetailsModal from "./Modals/OrderDetailsModal";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return navigate("/signup");

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) console.error(error);
    else {
      setProfile(data);
      fetchOrders(user.id);
    }
    setLoading(false);
  };

  const fetchOrders = async (userId) => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setOrders(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/signup");
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Revo Coffee Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <FaSignOutAlt /> Logout
        </button>
      </header>

      <nav className={styles.navbar}>
        <button
          className={activeSection === "profile" ? styles.active : ""}
          onClick={() => setActiveSection("profile")}
        >
          <FaUser /> Profile
        </button>
        <button
          className={activeSection === "orders" ? styles.active : ""}
          onClick={() => setActiveSection("orders")}
        >
          <FaBox /> Orders
        </button>
        <button
          className={activeSection === "settings" ? styles.active : ""}
          onClick={() => setActiveSection("settings")}
        >
          <FaCog /> Settings
        </button>
      </nav>

      <main className={styles.content}>
        {activeSection === "profile" && (
          <ProfileSection
            profile={profile}
            orders={orders}
            onEdit={() => setIsProfileModalOpen(true)}
          />
        )}
        {activeSection === "orders" && (
          <OrdersSection
            orders={orders}
            onSelectOrder={(order) => {
              setSelectedOrder(order);
              setIsOrderModalOpen(true);
            }}
          />
        )}
        {activeSection === "settings" && <SettingsSection />}
      </main>

      {isProfileModalOpen && (
        <ProfileModal
          profile={profile}
          onClose={() => setIsProfileModalOpen(false)}
          onUpdated={fetchProfile}
        />
      )}

      {isOrderModalOpen && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setIsOrderModalOpen(false)}
        />
      )}
    </div>
  );
}
