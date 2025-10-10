import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { coloredPhinProducts } from "../../data/ColoredPhin/dataPhin";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { CartContext } from "../../Context/CartContext";
import useFilterProducts from "../../hooks/useFilterProducts";
import styles from "./ColoredPhin.module.css";

export default function ColoredPhinPage() {
  const { addToCart } = useContext(CartContext);

  const {
    searchTerm, setSearchTerm,
    sortOption, setSortOption,
    visibleProducts, loadMore
  } = useFilterProducts(coloredPhinProducts, {
    color: ["All", "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Cyan", "Black", "White", "Silver", "Gold"]
  });

  return (
    <section className={styles.phinPage}>
      <div className={styles.phinHeader}>
        <h1>Colored Phin Selection</h1>
        <p>Explore our premium Vietnamese coffee filters.</p>
      </div>

      <div className={styles.filtersRow}>
        <input
          type="text"
          placeholder="Search filters..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.customSelectWrapper}>
          <CustomSelect
            options={["Default", "Price: Low to High", "Price: High to Low", "Rating: High to Low"]}
            value={sortOption}
            onChange={setSortOption}
          />
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <div className={styles.phinGrid}>
          {visibleProducts.map(product => (
            <div key={product.id} className={styles.phinCard}>
              <img src={product.image} alt={product.name} className={styles.img}/>
              <div className={styles.desc}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                <p className={styles.rating}>Rating: {product.rating} ⭐</p>
              </div>
              <div className={styles.buttonRow}>
                <button onClick={() => addToCart(product, 1)}>Add to Cart</button>
                <Link to={`/colored-phin/${product.id}`}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noProducts}><p>No products found.</p></div>
      )}

      {visibleProducts.length < coloredPhinProducts.length && (
        <div className={styles.loadMoreWrapper}>
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </section>
  );
}
