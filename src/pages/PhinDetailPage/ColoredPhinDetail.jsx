import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { coloredPhinProducts } from "../../data/ColoredPhin/dataPhin";
import { CartContext } from "../../Context/CartContext";
import styles from "./ColoredPhinDetail.module.css";

export default function ColoredPhinDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const product = coloredPhinProducts.find(item => item.id === Number(id));

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Link to="/colored" className={styles.backBtn}>
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <section className={styles.detailPage}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} className={styles.image} />
        </div>

        <div className={styles.infoWrapper}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.color}>Color: <span>{product.color}</span></p>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.rating}>⭐ {product.rating} / 5</p>

          <p className={styles.description}>
            Experience premium Vietnamese brewing with our <strong>{product.color}</strong> Phin filter.
            Each capsule is made from durable aluminum and coated with a vibrant color finish,
            perfect for both aesthetics and function. Ideal for traditional or modern coffee lovers.
          </p>

          <div className={styles.actions}>
            <button onClick={() => addToCart(product, 1)} className={styles.addToCart}>
              Add to Cart
            </button>
            <Link to="/colored-phin" className={styles.backLink}>
              Back to Collection
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.suggestions}>
        <h2>Other Colors You May Like</h2>
        <div className={styles.grid}>
          {coloredPhinProducts
            .filter(p => p.id !== product.id)
            .slice(0, 3)
            .map(item => (
              <Link key={item.id} to={`/colored-phin/${item.id}`} className={styles.card}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
