import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { giftSetProducts } from "../../data/GiftSet/dataGiftSets";
import { CartContext } from "../../Context/CartContext";
import styles from "./GiftSetPage.module.css";

export default function GiftSetPage() {
  const { addToCart } = useContext(CartContext);

  return (
    <section className={styles.giftPage}>
      <div className={styles.giftHeader}>
        <h1>Our Gift Sets</h1>
        <p>Perfectly curated coffee gift sets for every occasion.</p>
      </div>

      <div className={styles.giftGrid}>
        {giftSetProducts.map(product => (
          <div key={product.id} className={styles.giftCard}>
            <img src={product.image} alt={product.name} className={styles.img} />
            <div className={styles.desc}>
              <h3>{product.name}</h3>
              <p className={styles.price}>${product.price.toFixed(2)}</p>
              <p className={styles.rating}>Rating: {product.rating} ⭐</p>
              <ul className={styles.itemsList}>
                {product.items.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
            <div className={styles.buttonRow}>
              <button onClick={() => addToCart(product, 1)}>Add to Cart</button>
              <Link to={`/gift-set/${product.id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
