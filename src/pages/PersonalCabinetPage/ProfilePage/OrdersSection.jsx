import React, { useState } from "react";
import styles from "./ProfilePage.module.css";

export default function OrdersSection({ orders, onSelectOrder }) {
  const [filter, setFilter] = useState("all");

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === filter);

  return (
    <section className={styles.card}>
      <h2>My Orders</h2>

      {orders.length > 0 && (
        <div className={styles.filterBar}>
          <label>Filter:</label>
          <select
            className={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className={styles.ordersGrid}>
          {filteredOrders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <h3>Order #{order.id}</h3>
              <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
              <p>
                Status:{" "}
                <span
                  className={`${styles.status} ${
                    order.status === "completed"
                      ? styles.statusCompleted
                      : order.status === "cancelled"
                      ? styles.statusCancelled
                      : styles.statusPending
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p>Total: ${order.total}</p>
              <button
                className={styles.primaryBtn}
                onClick={() => onSelectOrder(order)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
