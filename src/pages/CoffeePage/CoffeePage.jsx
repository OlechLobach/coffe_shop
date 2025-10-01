import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { coffeeProducts } from "../../data/CoffeePage/dataCoffee";
import styles from "./CoffeePage.module.css";

export default function CoffeePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterRoast, setFilterRoast] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredProducts = coffeeProducts
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => filterType === "All" ? true : product.type === filterType)
    .filter(product => filterRoast === "All" ? true : product.roast === filterRoast)
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "rating-desc") return b.rating - a.rating;
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

      {/* Пошук і фільтри */}
      <div className={styles.coffeeFilters}>
        <input
          type="text"
          placeholder="Search coffee..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Arabica">Arabica</option>
          <option value="Robusta">Robusta</option>
          <option value="Blend">Blend</option>
        </select>
        <select value={filterRoast} onChange={e => setFilterRoast(e.target.value)}>
          <option value="All">All Roasts</option>
          <option value="Light">Light</option>
          <option value="Medium">Medium</option>
          <option value="Medium-Dark">Medium-Dark</option>
          <option value="Dark">Dark</option>
        </select>
        <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
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
              <button>Add to Cart</button>
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
