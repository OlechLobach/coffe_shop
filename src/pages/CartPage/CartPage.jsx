import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import { supabase } from "../../db/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleCheckout = async () => {
    if (!user) return toast.error("Please log in to place an order.");
    if (cartItems.length === 0) return toast.error("Your cart is empty!");

    setLoading(true);
    try {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({ user_id: user.id, total: totalPrice, status: "pending" })
        .select()
        .single();

      if (orderError) throw orderError;

      const itemsToInsert = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      toast.success("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error(err);
      toast.error("Error placing order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = cartItems.filter(item => filter === "All" || item.category === filter);

  return (
    <section className={styles.cartContainer}>
      {/* Тости по центру зверху */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'Nunito, sans-serif',
            fontWeight: '600',
            fontSize: '16px',
            padding: '12px 20px',
            borderRadius: '10px',
            background: '#C7A17A',
            color: '#fff',
          },
        }}
      />

      <div className={styles.cartHeader}>
        <h2>Your Cart</h2>
        <h3 className={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</h3>
      </div>

      <div className={styles.cartActions}>
        <button className={styles.clearBtn} onClick={clearCart}>Clear Cart</button>
        <button className={styles.orderBtn} onClick={handleCheckout} disabled={loading}>
          {loading ? "Placing Order..." : "Checkout"}
        </button>
      </div>

      <div className={styles.filters}>
        {["All", "Coffee", "FinCombo", "Colored Phin", "Gift Set"].map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty</p>
      ) : (
        <ul className={styles.cartList}>
          {filteredItems.map(item => (
            <li key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.cartImage} />
              <div className={styles.cartInfo}>
                <p className={styles.cartName}>{item.name}</p>
                <p className={styles.cartTotalPrice}>${(item.price * item.quantity).toFixed(2)}</p>

                <div className={styles.quantityControl}>
                  <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
