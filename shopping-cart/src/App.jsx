import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
            <Header />
            <main className="flex-1 mt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route
                  path="/categories"
                  element={<div>Categories Page</div>}
                />
                <Route path="/deals" element={<div>Deals Page</div>} />
                <Route path="/favorites" element={<div>Favorites Page</div>} />
                <Route path="/cart" element={<Cart></Cart>} />
                <Route path="/profile" element={<div>Profile Page</div>} />
              </Routes>
            </main>
          </div>
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
