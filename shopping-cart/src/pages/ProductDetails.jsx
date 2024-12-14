import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart, ChevronLeft } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams(); // Using React Router's useParams instead of Next.js params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#8b5cf6", "#a855f7"],
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-[2000px] mx-auto pt-16">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 h-[500px] bg-neutral-800 rounded-xl animate-pulse" />
            <div className="md:w-1/2 space-y-4">
              <div className="h-8 bg-neutral-800 rounded-lg w-3/4 animate-pulse" />
              <div className="h-4 bg-neutral-800 rounded-lg animate-pulse" />
              <div className="h-4 bg-neutral-800 rounded-lg animate-pulse" />
              <div className="h-4 bg-neutral-800 rounded-lg w-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[2000px] mx-auto pt-16">
        <div className="p-6">
          <div className="text-center text-neutral-300">Product not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[2000px] mx-auto pt-16">
      <div className="p-6">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-neutral-400 hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Products
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-[500px] bg-white rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-8"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-2 bg-neutral-900/80 backdrop-blur-sm rounded-full hover:bg-neutral-800 transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-neutral-400"
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {product.category && (
              <span className="text-sm bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full">
                {product.category}
              </span>
            )}

            <h1 className="text-3xl font-bold text-white mt-4 mb-2">
              {product.title}
            </h1>

            {product.rating && (
              <div className="flex items-center text-amber-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 text-lg">{product.rating.rate}</span>
                <span className="text-neutral-400 ml-2">
                  ({product.rating.count} reviews)
                </span>
              </div>
            )}

            <p className="text-neutral-300 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-neutral-400">
                Free shipping on orders over $50
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-neutral-800 rounded-lg">
                <div className="text-neutral-400 text-sm mb-1">
                  Secure Payment
                </div>
                <div className="text-white text-sm">100% Protected</div>
              </div>
              <div className="text-center p-4 bg-neutral-800 rounded-lg">
                <div className="text-neutral-400 text-sm mb-1">
                  Fast Shipping
                </div>
                <div className="text-white text-sm">2-3 Business Days</div>
              </div>
              <div className="text-center p-4 bg-neutral-800 rounded-lg">
                <div className="text-neutral-400 text-sm mb-1">
                  Easy Returns
                </div>
                <div className="text-white text-sm">30 Day Returns</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
