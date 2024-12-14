import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import CartPage from "../pages/Cart";
import "@testing-library/jest-dom";

// Mock canvas-confetti to avoid actual canvas calls
jest.mock("canvas-confetti", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock product data
const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  image: "test-image.jpg",
  quantity: 1,
};

// Custom render function
const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <CartProvider>{ui}</CartProvider>
    </BrowserRouter>
  );
};

// Utility function to set localStorage cart
const setCart = (items) => localStorage.setItem("cart", JSON.stringify(items));

describe("CartPage", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  /** 🛒 Test 1: Empty Cart */
  test("displays empty cart message and allows navigation to home page", () => {
    renderWithProviders(<CartPage />);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();

    const startShoppingButton = screen.getByText("Start Shopping");
    fireEvent.click(startShoppingButton);

    expect(window.location.pathname).toBe("/");
  });

  /** 🛒 Test 2: Cart with Items */
  test("displays product details and calculates totals", () => {
    setCart([mockProduct]);
    renderWithProviders(<CartPage />);

    // Check product details
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();

    // Check only for the unit price inside the product section, not total
    const productContainer = screen.getByText(mockProduct.title).closest("div");
    expect(
      within(productContainer).getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();

    // Check if shipping is displayed as "Free"
    const orderSummary = screen.getByText("Order Summary").closest("div");
    expect(within(orderSummary).getByText("Free")).toBeInTheDocument();
  });

  /** 🛒 Test 3: Update Quantity */
  test("updates quantity and total when clicking increase/decrease buttons", async () => {
    setCart([mockProduct]);
    renderWithProviders(<CartPage />);

    const increaseButton = screen.getByLabelText("Increase quantity");
    fireEvent.click(increaseButton);

    await waitFor(() => {
      expect(screen.getAllByText("2")).toHaveLength(1);
    });

    const total = (mockProduct.price * 2).toFixed(2);

    await waitFor(() => {
      expect(screen.getAllByText(`$${total}`)).toHaveLength(1);
    });

    const decreaseButton = screen.getByLabelText("Decrease quantity");
    fireEvent.click(decreaseButton);

    await waitFor(() => {
      expect(screen.getAllByText("1")).toHaveLength(1);
    });

    await waitFor(() => {
      expect(
        screen.getAllByText(`$${mockProduct.price.toFixed(2)}`)
      ).toHaveLength(1);
    });
  });

  /** 🛒 Test 4: Remove Item */
  test("removes item and shows empty cart message", async () => {
    setCart([mockProduct]);
    renderWithProviders(<CartPage />);

    const removeButton = screen.getByLabelText("Remove item");
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });
  });

  /** 🛒 Test 5: Error Handling */
  test("handles corrupt localStorage data gracefully", () => {
    localStorage.setItem("cart", "invalid-json");
    renderWithProviders(<CartPage />);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });
});
