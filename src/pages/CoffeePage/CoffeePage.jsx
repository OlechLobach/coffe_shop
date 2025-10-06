import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { coffeeProducts } from "../../data/CoffeePage/dataCoffee";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { CartContext } from "../../Context/CartContext";
import useFilterProducts from "../../hooks/useFilterProducts";
import styles from "./CoffeePage.module.css";

export default function CoffeePage() {
  const { addToCart } = useContext(CartContext);

  const {
    searchTerm, setSearchTerm,
    filters, setFilters,
    sortOption, setSortOption,
    visibleProducts, loadMore
  } = useFilterProducts(coffeeProducts, {
    type: ["All", "Arabica", "Robusta", "Blend"],
    roast: ["All", "Light", "Medium", "Medium-Dark", "Dark"]
  });

  return (
    <section className={styles.coffeePage}>
      <div className={styles.coffeeHeader}>
        <h1>Our Coffee Selection</h1>
        <p>Discover our finest coffee blends and beans.</p>
      </div>

      <div className={styles.coffeeFilters}>
        <input
          type="text"
          placeholder="Search coffee..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <CustomSelect
          options={filters.type ? ["All", "Arabica", "Robusta", "Blend"] : []}
          value={filters.type}
          onChange={value => setFilters({ ...filters, type: value })}
        />
        <CustomSelect
          options={filters.roast ? ["All", "Light", "Medium", "Medium-Dark", "Dark"] : []}
          value={filters.roast}
          onChange={value => setFilters({ ...filters, roast: value })}
        />
        <CustomSelect
          options={["Default", "Price: Low to High", "Price: High to Low", "Rating: High to Low"]}
          value={sortOption}
          onChange={setSortOption}
        />
      </div>

      {visibleProducts.length > 0 ? (
        <div className={styles.coffeeGrid}>
          {visibleProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image} alt={product.name} className={styles.img}/>
              <div className={styles.desc}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                <p className={styles.rating}>Rating: {product.rating} ⭐</p>
              </div>
              <button onClick={() => addToCart(product, 1)} className={styles.addToCartBtn}>
                Add to Cart
              </button>
              <Link to={`/coffee/${product.id}`} className={styles.detailLink}>
                View Details
              </Link>
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
