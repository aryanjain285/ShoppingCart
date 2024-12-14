import { Link } from "react-router-dom";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] border-b border-neutral-800">
      <div className="h-20 max-w-[2000px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-white">
          EnsignCart
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-neutral-200 hover:text-white">
            Home
          </Link>
          <Link
            to="/categories"
            className="text-sm text-neutral-200 hover:text-white"
          >
            Categories
          </Link>
          <Link
            to="/deals"
            className="text-sm text-neutral-200 hover:text-white"
          >
            Deals
          </Link>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <Link
            to="/favorites"
            className="p-2 text-neutral-200 hover:text-white"
          >
            <Heart className="w-5 h-5" />
          </Link>
          <Link to="/profile" className="p-2 text-neutral-200 hover:text-white">
            <User className="w-5 h-5" />
          </Link>
          <Link
            to="/cart"
            className="p-2 text-neutral-200 hover:text-white relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-violet-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
