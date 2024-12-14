import { useState, useEffect, useCallback, useMemo } from "react";
import debounce from "lodash/debounce";

// Custom hook for product filtering and searching
export const useProductFilter = (products) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("price-asc");

  // Memoized categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((p) => p.category));
    return Array.from(uniqueCategories).filter(Boolean);
  }, [products]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          !selectedCategory || product.category === selectedCategory;
        const matchesPrice =
          product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating":
            return (b.rating?.rate || 0) - (a.rating?.rate || 0);
          case "name":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  return {
    searchTerm,
    setSearchTerm: debouncedSearch,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    categories,
    filteredProducts,
  };
};

// Custom hook for infinite scrolling
export const useInfiniteScroll = (items, itemsPerPage = 12) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const displayedItems = useMemo(() => {
    const lastIndex = page * itemsPerPage;
    return items.slice(0, lastIndex);
  }, [items, page, itemsPerPage]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const hasMoreItems = nextPage * itemsPerPage < items.length;
    setPage(nextPage);
    setHasMore(hasMoreItems);
  }, [page, itemsPerPage, items.length]);

  return { displayedItems, hasMore, loadMore };
};

// Custom hook for analytics
export const useAnalytics = () => {
  const trackEvent = useCallback((eventName, data) => {
    // In a real app, this would send to your analytics service
    console.log(`[Analytics] ${eventName}:`, data);
  }, []);

  return { trackEvent };
};
