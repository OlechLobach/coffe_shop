import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Features from "../FeaturesSection";

vi.mock("../../../../assets/images/HomePage/Feature/icon1.png", () => ({ default: "icon1.png" }));
vi.mock("../../../../assets/images/HomePage/Feature/icon2.png", () => ({ default: "icon2.png" }));
vi.mock("../../../../assets/images/HomePage/Feature/icon3.png", () => ({ default: "icon3.png" }));
vi.mock("../../../../assets/images/HomePage/Feature/icon4.png", () => ({ default: "icon4.png" }));

describe("Features component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Features />
      </BrowserRouter>
    );
  });

  test("renders section titles", () => {
    expect(screen.getByText("Your Personalized Coffee")).toBeInTheDocument();
    expect(screen.getByText("Coffee build your base")).toBeInTheDocument();
  });

  test("renders all feature cards", () => {
    const cards = screen.getAllByRole("img"); 
    expect(cards.length).toBe(4);
  });

  test("renders feature card titles and descriptions", () => {
    expect(screen.getByText("Origin")).toBeInTheDocument();
    expect(screen.getByText("Quality")).toBeInTheDocument();
    expect(screen.getByText("Types of Beans")).toBeInTheDocument();
    expect(screen.getByText("Brewing")).toBeInTheDocument();

    expect(screen.getByText(/Arabica and Robusta coffee beans/i)).toBeInTheDocument();
    expect(screen.getByText(/Each coffee bean represents/i)).toBeInTheDocument();
    expect(screen.getByText(/70% of the coffee cup’s quality/i)).toBeInTheDocument();
    expect(screen.getByText(/The coffee beans are transformed/i)).toBeInTheDocument();
  });

  test("feature icons have correct alt text", () => {
    expect(screen.getByAltText("Origin")).toBeInTheDocument();
    expect(screen.getByAltText("Quality")).toBeInTheDocument();
    expect(screen.getByAltText("Types of Beans")).toBeInTheDocument();
    expect(screen.getByAltText("Brewing")).toBeInTheDocument();
  });
});
