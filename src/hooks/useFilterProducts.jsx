import { useState, useMemo } from "react";

export default function useFilterProducts(initialProducts, filterOptions = {}) {
  const [filters, setFilters] = useState(() => {
    const initial = {};
    Object.keys(filterOptions).forEach(key => {
      initial[key] = "All";
    });
    return initial;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Default");
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (searchTerm) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== "All") {
        result = result.filter(item => {
          if (key === "category") return item.category === filters[key];
          return item[key] === filters[key];
        });
      }
    });

    if (sortOption === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    else if (sortOption === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    else if (sortOption === "Rating: High to Low") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [initialProducts, filters, searchTerm, sortOption]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const loadMore = () => setVisibleCount(prev => prev + 9);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortOption,
    setSortOption,
    visibleProducts,
    loadMore,
    filteredProducts
  };
}
