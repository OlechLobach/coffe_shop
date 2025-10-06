import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { phinComboProducts } from "../../data/PhinComboPage/dataPhinCombo";
import { CartContext } from "../../Context/CartContext";
import useFilterProducts from "../../hooks/useFilterProducts";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import styles from "./PhinComboPage.module.css";

export default function PhinComboPage() {
  const { addToCart } = useContext(CartContext);

  const {
    searchTerm, setSearchTerm,
    sortOption, setSortOption,
    visibleProducts, loadMore
  } = useFilterProducts(phinComboProducts, {
    comboType: ["All", "Classic", "Premium", "Gift", "Special"]
  });

  return (
    <section className={styles.comboPage}>
      <div className={styles.comboHeader}>
        <h1>Phin Combo Collection</h1>
        <p>Discover our curated Vietnamese coffee combo sets.</p>
      </div>

      <div className={styles.comboFilters}>
        <CustomSelect
          options={["Default", "Price: Low to High", "Price: High to Low", "Rating: High to Low"]}
          value={sortOption}
          onChange={setSortOption}
        />
        <input
          type="text"
          placeholder="Search combos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {visibleProducts.length > 0 ? (
        <div className={styles.comboGrid}>
          {visibleProducts.map((product) => (
            <div key={product.id} className={styles.comboCard}>
              <img src={product.image} alt={product.name} className={styles.img} />
              <div className={styles.desc}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                <p className={styles.rating}>⭐ {product.rating}</p>
              </div>
              <div className={styles.actions}>
                <button onClick={() => addToCart(product, 1)} className={styles.addToCartBtn}>
                  Add to Cart
                </button>
                <Link to={`/phincombo/${product.id}`} className={styles.detailLink}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noProducts}><p>No combos found.</p></div>
      )}

      {visibleProducts.length < phinComboProducts.length && (
        <div className={styles.loadMoreWrapper}>
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </section>
  );
}
