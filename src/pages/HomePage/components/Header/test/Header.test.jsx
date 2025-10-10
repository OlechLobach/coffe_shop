import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Header from "../Header";

vi.mock("../../../../../Context/AuthContext", () => ({
  useAuth: () => ({ user: null }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({ pathname: "/" }),
  };
});

vi.mock("../../../../../assets/images/HomePage/Header/logo.png", () => ({
  default: "logo.png",
}));
vi.mock("../../../../../assets/images/HomePage/Header/cart.png", () => ({
  default: "cart.png",
}));
vi.mock("../../../../../assets/images/HomePage/Header/hero.jpg", () => ({
  default: "hero.jpg",
}));

describe("Header component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  test("renders logo and navigation links", () => {
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Phin Combo")).toBeInTheDocument();
  });

  test("renders login button when user is not logged in", () => {
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("burger menu opens and closes on click", () => {
    const burgerBtn = screen.getByRole("button");

    expect(screen.queryByText("Cart")).toBeNull();

    fireEvent.click(burgerBtn);
    expect(screen.getByText("Cart")).toBeInTheDocument();

    fireEvent.click(burgerBtn);
    expect(screen.queryByText("Cart")).toBeNull();
  });

  test("renders hero section with background image on home page", () => {
    const heroTitle = screen.getByText(/PERSONALIZED/i);
    expect(heroTitle).toBeInTheDocument();

    const heroSection = heroTitle.closest("section");
    expect(heroSection.style.backgroundImage).toContain("hero.jpg");
  });

  test("renders cart icons with alt text", () => {
    const cartDesktop = screen.getAllByAltText("cart")[0];
    expect(cartDesktop).toBeInTheDocument();

    const burgerBtn = screen.getByRole("button");
    fireEvent.click(burgerBtn);

    const cartMobile = screen.getAllByAltText("cart")[1];
    expect(cartMobile).toBeInTheDocument();
  });
});