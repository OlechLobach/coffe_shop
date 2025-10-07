import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { giftSetProducts } from "../../../data/GiftSet/dataGiftSets";
import { CartContext } from "../../../Context/CartContext";
import styles from "./GiftSetDetailPage.module.css";

export default function GiftSetDetailPage() {
  const { id } = useParams();
  const product = giftSetProducts.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Link to="/gift-set" className={styles.backLink}>Back to Gift Sets</Link>
      </div>
    );
  }

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = () => addToCart(product, quantity);

  const relatedProducts = giftSetProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <section className={styles.detailPage}>
      <Link to="/gift-set" className={styles.backLink}>← Back to Gift Sets</Link>

      <div className={styles.detailContainer}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
        </div>

        <div className={styles.infoWrapper}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.rating}>Rating: {product.rating} ⭐</p>

          <div className={styles.quantity}>
            <button onClick={decrement} className={styles.qtyButton}>-</button>
            <span className={styles.qtyNumber}>{quantity}</span>
            <button onClick={increment} className={styles.qtyButton}>+</button>
          </div>

          <button className={styles.addToCart} onClick={handleAddToCart}>Add to Cart</button>

          <div className={styles.description}>
            <h3>Description:</h3>
            <p>{product.description}</p>
          </div>

          <div className={styles.additionalInfo}>
            <h4>Included Items:</h4>
            <ul>
              {product.items.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className={styles.relatedProducts}>
          <h3>Related Gift Sets</h3>
          <div className={styles.relatedGrid}>
            {relatedProducts.map(p => (
              <div key={p.id} className={styles.relatedCard}>
                <img src={p.image} alt={p.name} />
                <div className={styles.relatedInfo}>
                  <p className={styles.relatedName}>{p.name}</p>
                  <p className={styles.relatedPrice}>${p.price.toFixed(2)}</p>
                  <Link to={`/gift-set/${p.id}`} className={styles.detailLink}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
