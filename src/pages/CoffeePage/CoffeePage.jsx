import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { coffeeProducts } from "../../data/CoffeePage/dataCoffee";
import { CartContext } from "../../Context/CartContext";
import useFilterProducts from "../../hooks/useFilterProducts";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import styles from "./CoffeePage.module.css";

export default function CoffeePage() {
  const { addToCart } = useContext(CartContext);

  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortOption,
    setSortOption,
    visibleProducts,
    loadMore
  } = useFilterProducts(coffeeProducts, {
    type: ["All", "Arabica", "Robusta", "Blend"],
    roast: ["All", "Light", "Medium", "Medium-Dark", "Dark"]
  });

  return (
    <section className={styles.phinPage}>
      <div className={styles.phinHeader}>
        <h1>Our Coffee Collection</h1>
        <p>Explore our premium selection of Vietnamese coffee.</p>
      </div>

      <div className={styles.phinFilters}>
        <div className={styles.filterItem}>
          <input
            type="text"
            placeholder="Search coffee..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterItem}>
          <CustomSelect
            options={["All", "Arabica", "Robusta", "Blend"]}
            value={filters.type}
            onChange={value => setFilters({ ...filters, type: value })}
          />
        </div>

        <div className={styles.filterItem}>
          <CustomSelect
            options={["All", "Light", "Medium", "Medium-Dark", "Dark"]}
            value={filters.roast}
            onChange={value => setFilters({ ...filters, roast: value })}
          />
        </div>

        <div className={styles.filterItem}>
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
              <img src={product.image} alt={product.name} className={styles.img} />
              <div className={styles.desc}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                <p className={styles.rating}>⭐ {product.rating.toFixed(1)}</p>
              </div>
              <div className={styles.buttonRow}>
                <button onClick={() => addToCart(product, 1)}>Add to Cart</button>
                <Link to={`/coffee/${product.id}`}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noProducts}><p>No products found.</p></div>
      )}

      {visibleProducts.length < coffeeProducts.length && (
        <div className={styles.loadMoreWrapper}>
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </section>
  );
}
