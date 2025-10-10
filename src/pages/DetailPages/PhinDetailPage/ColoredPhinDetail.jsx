import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { coloredPhinProducts } from "../../../data/ColoredPhin/dataPhin";
import { CartContext } from "../../../Context/CartContext";
import styles from "./ColoredPhinDetail.module.css";

export default function ColoredPhinDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const product = coloredPhinProducts.find(item => item.id.toString() === id);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Link to="/colored-phin" className={styles.backLink}>Back to Collection</Link>
      </div>
    );
  }

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <section className={styles.detailPage}>
      <Link to="/colored-phin" className={styles.backLink}>← Back to Collection</Link>

      <div className={styles.detailContainer}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
        </div>

        <div className={styles.infoWrapper}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.color}>Color: <span>{product.color}</span></p>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.rating}>⭐ {product.rating}</p>

          <div className={styles.quantity}>
            <button onClick={decrement} className={styles.qtyButton}>-</button>
            <span className={styles.qtyNumber}>{quantity}</span>
            <button onClick={increment} className={styles.qtyButton}>+</button>
          </div>

          <button onClick={handleAddToCart} className={styles.addToCart}>Add to Cart</button>

          <div className={styles.description}>
            <h3>Description:</h3>
            <p>
              Experience premium Vietnamese brewing with our <strong>{product.color}</strong> Phin filter.
              Each capsule is made from durable aluminum and coated with a vibrant color finish,
              perfect for both aesthetics and function.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.relatedProducts}>
        <h3>Other Colors You May Like</h3>
        <div className={styles.relatedGrid}>
          {coloredPhinProducts
            .filter(p => p.id !== product.id)
            .slice(0, 4)
            .map(p => (
              <div key={p.id} className={styles.relatedCard}>
                <img src={p.image} alt={p.name} />
                <div className={styles.relatedInfo}>
                  <p className={styles.relatedName}>{p.name}</p>
                  <p className={styles.relatedPrice}>${p.price.toFixed(2)}</p>
                  <Link to={`/colored-phin/${p.id}`} className={styles.detailLink}>View Details</Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
