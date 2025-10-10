import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GiftsetSection from "../GiftsetSection";

describe("GiftsetSection component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <GiftsetSection />
      </MemoryRouter>
    );
  });

  test("рендерить subtitle і title", () => {
    expect(screen.getByText("Best Gift For Best Friend")).toBeInTheDocument();
    expect(screen.getByText("GIFTSET")).toBeInTheDocument();
  });

  test("рендерить першу картку giftset за замовчуванням", () => {
    expect(
      screen.getByText((content) =>
        content.includes('Giftset "Vietnamese Phin Combo"')
      )
    ).toBeInTheDocument();
    expect(screen.getByText("285.000")).toBeInTheDocument();
    expect(screen.getByText("Fine Robusta Blend")).toBeInTheDocument();
    expect(screen.getByText("700 - 800m")).toBeInTheDocument();
  });

  test("рендерить nav кнопки для переключення giftset", () => {
    const navButtons = screen.getAllByTestId("gift-nav-button");
    expect(navButtons.length).toBe(3); // маємо 3 кнопки
  });

  test("при кліку на nav кнопку змінюється активна картка", () => {
    const navButtons = screen.getAllByTestId("gift-nav-button");
    fireEvent.click(navButtons[1]); // клікаємо на другу кнопку

    expect(
      screen.getByText((content) =>
        content.includes('Giftset "Premium CoffeeMorning Energy Set"')
      )
    ).toBeInTheDocument();
    expect(screen.getByText("300.000")).toBeInTheDocument();
  });

  test("рендерить кнопки Buy Now і Details", () => {
    const buyButton = screen.getByText("Buy Now");
    const detailsButton = screen.getByText("Details");

    expect(buyButton.closest("a")).toHaveAttribute("href", "/Gift-set");
    expect(detailsButton.closest("a")).toHaveAttribute("href", "/gift-set");
  });
});