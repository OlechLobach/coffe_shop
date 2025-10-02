import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { coffeeProducts } from "../../data/CoffeePage/dataCoffee";
import { CartContext } from "../../Context/CartContext";
import styles from "./CoffeeDetail.module.css";

export default function CoffeeDetail() {
  const { id } = useParams();
  const product = coffeeProducts.find(p => p.id.toString() === id);

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Link to="/coffee" className={styles.backLink}>Back to Coffee Page</Link>
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
      <Link to="/coffee" className={styles.backLink}>← Back to Coffee Selection</Link>

      <div className={styles.detailContainer}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
        </div>

        <div className={styles.infoWrapper}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.type}>Type: {product.type}</p>
          <p className={styles.roast}>Roast: {product.roast}</p>
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
            <h4>Additional Info:</h4>
            <p>Origin: {product.origin || "Various"}</p>
            <p>Recommended brewing: {product.brewing || "Any preferred method"}</p>
          </div>
        </div>
      </div>

      <div className={styles.relatedProducts}>
        <h3>Related Coffees</h3>
        <div className={styles.relatedGrid}>
          {coffeeProducts
            .filter(p => p.id !== product.id)
            .slice(0, 4)
            .map(p => (
              <div key={p.id} className={styles.relatedCard}>
                <img src={p.image} alt={p.name} />
                <div className={styles.relatedInfo}>
                  <p className={styles.relatedName}>{p.name}</p>
                  <p className={styles.relatedPrice}>${p.price.toFixed(2)}</p>
                  <Link to={`/coffee/${p.id}`} className={styles.detailLink}>View Details</Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
