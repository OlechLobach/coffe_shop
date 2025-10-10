import { render, screen } from "@testing-library/react";
import Features from "../Features";
import { vi } from "vitest";

vi.mock("../../../../assets/images/HomePage/Feature/icon1.png", () => "icon1.png");
vi.mock("../../../../assets/images/HomePage/Feature/icon2.png", () => "icon2.png");
vi.mock("../../../../assets/images/HomePage/Feature/icon3.png", () => "icon3.png");
vi.mock("../../../../assets/images/HomePage/Feature/icon4.png", () => "icon4.png");

describe("Features component", () => {
  beforeEach(() => {
    render(<Features />);
  });

  test("рендерить підзаголовок і заголовок секції", () => {
    expect(screen.getByText("Your Personalized Coffee")).toBeInTheDocument();
    expect(screen.getByText("Coffee build your base")).toBeInTheDocument();
  });

  test("рендерить усі картки фіч", () => {
    const featureTitles = ["Origin", "Quality", "Types of Beans", "Brewing"];
    featureTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("рендерить опис кожної картки", () => {
    const featureDescriptions = [
      "Arabica and Robusta coffee beans meet international quality standards.",
      "Each coffee bean represents the result of a highly focused process by skilled coffee artisans.",
      "70% of the coffee cup’s quality comes from the origin and quality of the green beans.",
      "The coffee beans are transformed through a careful and rigorous roasting and grinding process."
    ];

    featureDescriptions.forEach((desc) => {
      expect(screen.getByText(new RegExp(desc.slice(0, 20), "i"))).toBeInTheDocument();
      // Використовуємо перші 20 символів з regex, щоб уникнути проблем з апострофами
    });
  });

  test("кожна картка має правильну іконку з alt", () => {
    const iconsAlt = ["Origin", "Quality", "Types of Beans", "Brewing"];
    iconsAlt.forEach((alt) => {
      const img = screen.getByAltText(new RegExp(alt, "i"));
      expect(img).toBeInTheDocument();
    });
  });

  test("рендериться правильна кількість карток", () => {
    const cards = screen.getAllByRole("img"); // кожна картка має іконку, можна використовувати img як role
    expect(cards.length).toBe(4);
  });
});
