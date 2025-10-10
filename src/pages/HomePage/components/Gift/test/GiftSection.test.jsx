import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import GiftsetSection from "../GiftSet";

vi.mock("../../../../../assets/images/HomePage/Gift/giftset1Img.png", () => ({
  default: "giftset1Img.png",
}));
vi.mock("../../../../../assets/images/HomePage/Gift/giftset2Img.png", () => ({
  default: "giftset2Img.png",
}));
vi.mock("../../../../../assets/images/HomePage/Gift/giftSet3Img.png", () => ({
  default: "giftSet3Img.png",
}));
vi.mock("../../../../../assets/images/HomePage/Gift/mountain.png", () => ({
  default: "mountain.png",
}));
vi.mock("../../../../../assets/images/HomePage/Gift/iconCoffee.png", () => ({
  default: "iconCoffee.png",
}));

describe("GiftsetSection component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <GiftsetSection />
      </BrowserRouter>
    );
  });

  test("renders subtitle and title", () => {
    expect(screen.getByText("Best Gift For Best Friend")).toBeInTheDocument();
    expect(screen.getByText("GIFTSET")).toBeInTheDocument();
  });

  test("renders the default active giftset", () => {
    expect(screen.getByAltText('Giftset "Vietnamese Phin Combo"')).toBeInTheDocument();
    expect(screen.getByText("285.000")).toBeInTheDocument();
    expect(screen.getByText('Giftset "Vietnamese Phin Combo"')).toBeInTheDocument();
    expect(screen.getByText("A wonderful gift for true coffee enthusiasts...")).toBeInTheDocument();
    expect(screen.getByAltText("Coffee")).toBeInTheDocument();
    expect(screen.getByAltText("Altitude")).toBeInTheDocument();
  });

  test("renders Buy Now and Details buttons", () => {
    expect(screen.getByText("Buy Now")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  test("can switch giftset when clicking navigation buttons", () => {
    const navButtons = screen.getAllByTestId("gift-nav-button");

    expect(navButtons[0].className).toContain("active");
    expect(screen.getByAltText('Giftset "Vietnamese Phin Combo"')).toBeInTheDocument();

    fireEvent.click(navButtons[1]);
    expect(navButtons[1].className).toContain("active");
    expect(screen.getByAltText('Giftset "Premium CoffeeMorning Energy Set"')).toBeInTheDocument();

    fireEvent.click(navButtons[2]);
    expect(navButtons[2].className).toContain("active");
    expect(screen.getByAltText('Giftset "Artisan Coffee Pack"')).toBeInTheDocument();
  });
});