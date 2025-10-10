import React, { useEffect, useState } from "react";
import { supabase } from "../../../../db/supabaseClient";
import { FaTimes } from "react-icons/fa";
import styles from "../ProfilePage.module.css";

export default function OrderDetailsModal({ order, onClose }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [order]);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order.id);
    if (error) console.error(error);
    else setItems(data);
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
        <h2>Order #{order.id}</h2>
        <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
        <p>Status: <strong>{order.status}</strong></p>
        <p>Total: ${order.total}</p>

        <h3>Items:</h3>
        <ul className={styles.orderItemsList}>
          {items.map((item) => (
            <li key={item.id}>
              {item.product_name || "Unnamed product"} — {item.quantity} × $
              {item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
