import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductsCarousel from "../ProductsSection";

vi.mock("../../../../assets/images/HomePage/CoffeeSection/product1.png", () => ({ default: "product1.png" }));
vi.mock("../../../../assets/images/HomePage/CoffeeSection/product2.png", () => ({ default: "product2.png" }));
vi.mock("../../../../assets/images/HomePage/CoffeeSection/product3.png", () => ({ default: "product3.png" }));

describe("ProductsCarousel component", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1920 });

    render(
      <BrowserRouter>
        <ProductsCarousel />
      </BrowserRouter>
    );
  });

  test("renders section subtitle and title", () => {
    expect(screen.getByText("Choose Your Favorite")).toBeInTheDocument();
    expect(screen.getByText("Perfect Taste, Just Right")).toBeInTheDocument();
  });

  test("renders product cards with images and alt text", () => {
    const imgs = screen.getAllByRole("img");
    expect(imgs.length).toBeGreaterThan(0);
    imgs.forEach((img) => {
      expect(img).toBeInTheDocument();
      expect(img.alt).not.toBe("");
    });
  });

  test("renders Buy Now and Details buttons", () => {
    const buyButtons = screen.getAllByText("Buy Now");
    const detailButtons = screen.getAllByText("Details");
    expect(buyButtons.length).toBeGreaterThan(0);
    expect(detailButtons.length).toBeGreaterThan(0);
  });

  test("next and prev buttons exist and clickable on desktop", () => {
    const nextBtn = screen.getByTestId("next-button");
    const prevBtn = screen.getByTestId("prev-button");

    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn).toBeInTheDocument();

    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);
  });
});
