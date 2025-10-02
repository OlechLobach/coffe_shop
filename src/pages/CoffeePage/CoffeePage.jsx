import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { coffeeProducts } from "../../data/CoffeePage/dataCoffee";
import CustomSelect from "../../components/CustomSelect/CustomSelect"; 
import { CartContext } from "../../Context/CartContext";
import styles from "./CoffeePage.module.css";

export default function CoffeePage() {
  const { addToCart } = useContext(CartContext); // підключаємо контекст
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [filterRoast, setFilterRoast] = useState("All Roasts");
  const [sortOption, setSortOption] = useState("Default");
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredProducts = coffeeProducts
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product =>
      filterType === "All Types" ? true : product.type === filterType
    )
    .filter(product =>
      filterRoast === "All Roasts" ? true : product.roast === filterRoast
    )
    .sort((a, b) => {
      if (sortOption === "Price: Low to High") return a.price - b.price;
      if (sortOption === "Price: High to Low") return b.price - a.price;
      if (sortOption === "Rating: High to Low") return b.rating - a.rating;
      return 0;
    });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const loadMore = () => setVisibleCount(prev => prev + 9);

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
          options={["All Types", "Arabica", "Robusta", "Blend"]}
          value={filterType}
          onChange={setFilterType}
        />

        <CustomSelect
          options={["All Roasts", "Light", "Medium", "Medium-Dark", "Dark"]}
          value={filterRoast}
          onChange={setFilterRoast}
        />

        <CustomSelect
          options={[
            "Default",
            "Price: Low to High",
            "Price: High to Low",
            "Rating: High to Low",
          ]}
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
              <button
                onClick={() => addToCart(product, 1)} // додаємо у кошик
                className={styles.addToCartBtn}
              >
                Add to Cart
              </button>
              <Link to={`/coffee/${product.id}`} className={styles.detailLink}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noProducts}>
          <p>No products found.</p>
        </div>
      )}

      {visibleCount < filteredProducts.length && (
        <div className={styles.loadMoreWrapper}>
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </section>
  );
}
