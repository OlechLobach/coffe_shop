import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CoffeePage from "../CoffeePage";
import React from "react";
import { CartContext } from "../../../Context/CartContext"; 

const mockSetSearchTerm = vi.fn();
const mockSetFilters = vi.fn();
const mockSetSortOption = vi.fn();
const mockLoadMore = vi.fn();
const mockAddToCart = vi.fn();

const mockProducts = [
  { id: 1, name: "Arabica Premium", price: 10.5, rating: 4.8, image: "arabica.png" },
  { id: 2, name: "Robusta Strong", price: 8.99, rating: 4.5, image: "robusta.png" },
];

vi.mock("../../../hooks/useFilterProducts", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    searchTerm: "",
    setSearchTerm: mockSetSearchTerm,
    filters: { type: "All", roast: "All" },
    setFilters: mockSetFilters,
    sortOption: "Default",
    setSortOption: mockSetSortOption,
    visibleProducts: mockProducts,
    loadMore: mockLoadMore,
  })),
}));

vi.mock("../../../components/CustomSelect/CustomSelect", () => ({
  __esModule: true,
  default: ({ options, value, onChange }) => (
    <select
      data-testid="mock-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ),
}));

function renderWithContext() {
  return render(
    <BrowserRouter>
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <CoffeePage />
      </CartContext.Provider>
    </BrowserRouter>
  );
}

describe("CoffeePage component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    renderWithContext();
  });

  test("renders header and subtitle", () => {
    expect(screen.getByText("Our Coffee Collection")).toBeInTheDocument();
    expect(
      screen.getByText("Explore our premium selection of Vietnamese coffee.")
    ).toBeInTheDocument();
  });

  test("renders search input", () => {
    const searchInput = screen.getByPlaceholderText("Search coffee...");
    fireEvent.change(searchInput, { target: { value: "Arabica" } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith("Arabica");
  });

  test("renders filter dropdowns and can change them", () => {
    const selects = screen.getAllByTestId("mock-select");
    fireEvent.change(selects[0], { target: { value: "Arabica" } });
    expect(mockSetFilters).toHaveBeenCalledWith(expect.objectContaining({ type: "Arabica" }));

    fireEvent.change(selects[1], { target: { value: "Dark" } });
    expect(mockSetFilters).toHaveBeenCalledWith(expect.objectContaining({ roast: "Dark" }));

    fireEvent.change(selects[2], { target: { value: "Price: High to Low" } });
    expect(mockSetSortOption).toHaveBeenCalledWith("Price: High to Low");
  });

  test("renders product cards with info and buttons", () => {
    expect(screen.getByText("Arabica Premium")).toBeInTheDocument();
    expect(screen.getByText("Robusta Strong")).toBeInTheDocument();

    const addButtons = screen.getAllByText("Add to Cart");
    fireEvent.click(addButtons[0]);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0], 1);
  });

  test("renders and triggers Load More button", () => {
    const loadMoreBtn = screen.getByText("Load More");
    fireEvent.click(loadMoreBtn);
    expect(mockLoadMore).toHaveBeenCalled();
  });
});