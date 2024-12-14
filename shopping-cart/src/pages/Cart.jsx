import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-[2000px] mx-auto pt-16">
      <div className="p-6">
        <Link
          to="/"
          className="inline-flex items-center text-neutral-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400 text-lg mb-6">Your cart is empty</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-600 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-grow">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 pb-6 border-b border-neutral-800"
                >
                  <div className="relative w-24 h-24 bg-white rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <h2 className="text-lg font-medium text-white truncate">
                      {item.title}
                    </h2>
                    <p className="text-sm text-neutral-400 mb-2">
                      Unit Price: ${item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center bg-neutral-800 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                          className="p-2 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-medium text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-400 transition-colors p-2"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              className="w-full lg:w-96 bg-neutral-800 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: cart.length * 0.1 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-neutral-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-neutral-400">
                    Free shipping on orders over $50
                  </p>
                )}
                <div className="pt-4 border-t border-neutral-700">
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-indigo-500 text-white px-6 py-4 rounded-xl font-medium hover:bg-indigo-600 transition-colors">
                Proceed to Checkout
              </button>

              <div className="mt-6 grid grid-cols-2 gap-4 text-center text-sm">
                <div className="p-3 bg-neutral-700/50 rounded-lg">
                  <p className="text-neutral-400">Secure Payment</p>
                </div>
                <div className="p-3 bg-neutral-700/50 rounded-lg">
                  <p className="text-neutral-400">30-Day Returns</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
