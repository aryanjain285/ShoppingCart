import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart } from "lucide-react";

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group h-[500px] relative"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700/50 hover:border-indigo-500/50 flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:to-indigo-500/10 transition-all duration-300 z-0" />

          {/* Image container */}
          <div className="relative w-full h-[300px] bg-white flex items-center justify-center flex-shrink-0 z-10">
            <div className="relative w-[80%] h-[80%] transform transition-transform duration-300 group-hover:scale-105">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={(e) => onToggleFavorite(product.id, e)}
              className="absolute top-4 right-4 p-2 bg-neutral-900/80 backdrop-blur-sm rounded-full hover:bg-neutral-800 transition-colors z-10 hover:scale-110 transform duration-200"
            >
              <Heart
                className={`h-5 w-5 transition-colors duration-200 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-neutral-400"
                }`}
              />
            </button>
          </div>

          {/* Content section */}
          <div className="p-4 flex flex-col flex-grow relative z-10">
            {product.category && (
              <span className="text-xs bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full w-fit mb-2 transition-colors group-hover:bg-neutral-600">
                {product.category}
              </span>
            )}

            <h2 className="text-base font-medium mb-2 line-clamp-2 text-neutral-100 group-hover:text-indigo-400 transition-colors">
              {product.title}
            </h2>

            {product.rating && (
              <div className="flex items-center text-amber-400 text-sm mb-2 transform transition-transform group-hover:scale-105">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1">{product.rating.rate}</span>
                <span className="text-neutral-400 ml-1">
                  ({product.rating.count})
                </span>
              </div>
            )}

            <div className="mt-auto flex items-center justify-between">
              <span className="text-xl font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors">
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={(e) => onAddToCart(e, product)}
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30"
              >
                <ShoppingCart className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
