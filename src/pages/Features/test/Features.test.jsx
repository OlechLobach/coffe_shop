import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Features from "../FeaturesSection";

describe("Features component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Features />
      </MemoryRouter>
    );
  });

  test("рендерить subtitle та title", () => {
    expect(screen.getByText(/Your Personalized Coffee/i)).toBeInTheDocument();
    expect(screen.getByText(/Coffee build your base/i)).toBeInTheDocument();
  });

test("рендерить усі feature cards з правильними заголовками, описами та картинками", () => {
  const features = [
    {
      title: "Origin",
      description: "Arabica and Robusta coffee beans meet international quality standards."
    },
    {
      title: "Quality",
      description: "Each coffee bean represents the result of a highly focused process by skilled coffee artisans."
    },
    {
      title: "Types of Beans",
      description: "70% of the coffee cup’s quality comes from the origin and quality of the green beans."
    },
    {
      title: "Brewing",
      description: "The coffee beans are transformed through a careful and rigorous roasting and grinding process."
    }
  ];

  features.forEach(feature => {
    expect(screen.getByText(feature.title)).toBeInTheDocument();
    expect(screen.getByText(feature.description)).toBeInTheDocument();
    const img = screen.getByAltText(feature.title);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src"); 
  });
});

  test("рендерить кнопку Discover More з правильним маршрутом", () => {
    const link = screen.getByRole("link", { name: /Discover More/i });
    expect(link).toHaveAttribute("href", "/shop");
  });
});