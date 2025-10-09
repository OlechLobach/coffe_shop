import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useContext(CartContext);

  const [filterType, setFilterType] = useState("All");

  const filteredItems = filterType === "All" ? cartItems : cartItems.filter(item => item.category === filterType);

  const productTypes = ["All", "Coffee", "Gift Set", "Phin Combo","Colored Phin"]; 

  const handleOrder = () => {
    alert("Order has been placed!");
  };

  return (
    <section className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <h2>Your Cart</h2>
        <h3 className={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</h3>
      </div>

      {cartItems.length > 0 && (
        <div className={styles.cartActions}>  
          <CustomSelect
            options={productTypes}
            value={filterType}
            onChange={setFilterType}
          />
          <button className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
          <button className={styles.orderBtn} onClick={handleOrder}>
            Checkout
          </button>
        </div>
      )}

      {filteredItems.length === 0 ? (
        <p className={styles.emptyCart}>Cart is empty</p>
      ) : (
        <ul className={styles.cartList}>
          {filteredItems.map(item => (
            <li key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.cartImage} />
              <div className={styles.cartInfo}>
                <p className={styles.cartName}>{item.name}</p>
                <p className={styles.cartTotalPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <div className={styles.quantityControl}>
                  <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
