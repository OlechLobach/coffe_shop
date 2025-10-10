import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ComboSection from "../ComboPhin";

vi.mock("../../../../assets/images/HomePage/Combo/combo1.png", () => ({ default: "combo1.png" }));
vi.mock("../../../../assets/images/HomePage/Combo/combo2.png", () => ({ default: "combo2.png" }));
vi.mock("../../../../assets/images/HomePage/Combo/combo3.png", () => ({ default: "combo3.png" }));

describe("ComboSection component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ComboSection />
      </BrowserRouter>
    );
  });

  test("renders section subtitle", () => {
    expect(screen.getByText("Your Personalized Combo")).toBeInTheDocument();
  });

  test("renders combo cards with images and names", () => {
    const cards = screen.getAllByRole("img");
    expect(cards.length).toBeGreaterThan(0); 

    cards.forEach((img) => {
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
});
