import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { SearchBar } from "../components/SearchBar";
import { ProductCard } from "../components/ProductCard";

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId, e) => {
    e.preventDefault();
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ).filter(Boolean);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesFavorites = !showFavorites || favorites.includes(product.id);
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  if (loading) {
    return (
      <div className="max-w-[2000px] mx-auto pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-neutral-800/50 rounded-xl p-4 animate-pulse h-[420px]"
            >
              <div className="h-64 w-full bg-neutral-700/50 rounded-lg mb-4"></div>
              <div className="h-4 w-3/4 bg-neutral-700/50 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-neutral-700/50 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[2000px] mx-auto pt-20">
      {/* Search and Filters */}
      <div className="p-6 border-b border-neutral-800">
        <div className="flex flex-wrap gap-4 items-center">
          <SearchBar onSearch={debouncedSearch} />

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors flex items-center gap-2 text-neutral-100"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>

          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-6 py-3 rounded-xl transition-colors flex items-center gap-2 ${
              showFavorites
                ? "bg-indigo-500 text-white"
                : "bg-neutral-800 hover:bg-neutral-700 text-neutral-100"
            }`}
          >
            <Heart className={`h-5 w-5 ${showFavorites ? "fill-white" : ""}`} />
            {showFavorites ? "Show All" : "Favorites"}
          </button>
        </div>

        {/* Categories */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === category ? "" : category
                      )
                    }
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-indigo-500 text-white"
                        : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Grid */}
      <div className="p-6">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
