import { describe, test, expect, vi, beforeEach, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CartPage from "../CartPage";
import { CartContext } from "../../../Context/CartContext";
import { useAuth } from "../../../Context/AuthContext";

vi.mock("../../../Context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../../../db/supabaseClient", () => {
  const singleMock = vi.fn().mockResolvedValue({ data: { id: 1 }, error: null });
  const selectMock = vi.fn(() => ({ single: singleMock }));
  const insertMock = vi.fn(() => ({ select: selectMock }));
  const fromMock = vi.fn(() => ({ insert: insertMock }));
  return { supabase: { from: fromMock } };
});

const mockRemove = vi.fn();
const mockUpdateQuantity = vi.fn();
const mockClearCart = vi.fn();

const mockCartItems = [
  { id: 1, name: "Arabica", price: 10, quantity: 2, image: "arabica.png", category: "Coffee" },
  { id: 2, name: "Robusta", price: 8, quantity: 1, image: "robusta.png", category: "Coffee" },
];

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

function renderCartPage(user = { id: "user1" }, cartItems = mockCartItems) {
  useAuth.mockReturnValue({ user });
  return render(
    <CartContext.Provider
      value={{
        cartItems,
        removeFromCart: mockRemove,
        updateQuantity: mockUpdateQuantity,
        totalPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        clearCart: mockClearCart,
      }}
    >
      <CartPage />
    </CartContext.Provider>
  );
}

describe("CartPage component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders header and total price", () => {
    renderCartPage();
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Total: $28.00")).toBeInTheDocument();
  });

  test("renders cart items with correct info", () => {
    renderCartPage();
    expect(screen.getByText("Arabica")).toBeInTheDocument();
    expect(screen.getByText("Robusta")).toBeInTheDocument();
    expect(screen.getAllByText("$20.00")[0]).toBeInTheDocument();
    expect(screen.getAllByText("$8.00")[0]).toBeInTheDocument();
  });

  test("calls removeFromCart when remove button clicked", () => {
    renderCartPage();
    fireEvent.click(screen.getAllByText("Remove")[0]);
    expect(mockRemove).toHaveBeenCalledWith(1);
  });

  test("calls updateQuantity when + and - buttons clicked", () => {
    renderCartPage();
    fireEvent.click(screen.getAllByText("+")[0]);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
    fireEvent.click(screen.getAllByText("-")[0]);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  test("calls clearCart when Clear Cart button clicked", () => {
    renderCartPage();
    fireEvent.click(screen.getByText("Clear Cart"));
    expect(mockClearCart).toHaveBeenCalled();
  });

  test("shows empty cart message if no items", () => {
    renderCartPage({ id: "user1" }, []);
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  test("can filter items by category", () => {
    renderCartPage();
    fireEvent.click(screen.getByText("Coffee"));
    expect(screen.getByText("Arabica")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Gift Set"));
    expect(screen.queryByText("Arabica")).toBeNull();
  });
});