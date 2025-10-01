import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../HeaderSection";
import styles from "../Header.module.css";



describe("Header component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/coffee"]}>
        <Header />
      </MemoryRouter>
    );
  });

  test("рендерить логотип з посиланням на головну сторінку", () => {
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();

    const logoLink = screen.getByRole("link", { name: /logo/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  test("рендерить hero image", () => {
    const heroImage = screen.getByAltText(/hero/i);
    expect(heroImage).toBeInTheDocument();
  });

  test("рендерить іконку корзини з посиланням на /cart", () => {
    const cartLink = screen.getByRole("link", { name: /cart icon/i });
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  test("рендерить всі пункти меню", () => {
    const menuItems = [
      "Home",
      "Coffee",
      "Colored Phin",
      "Phin Combo",
      "Gift Set",
      "Contact",
    ];

    menuItems.forEach((item) => {
      const link = screen.getByRole("link", { name: item });
      expect(link).toBeInTheDocument();
    });
  });

  test("NavLink отримує active клас для активного маршруту", () => {
    const coffeeLink = screen.getByRole("link", { name: /coffee/i });
    expect(coffeeLink).toHaveClass(styles.activeMenuBtn);
  });
});