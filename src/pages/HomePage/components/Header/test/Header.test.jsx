import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Header from "../HeaderDesctope";
import { useAuth } from "../../../../../Context/AuthContext";
import styles from "../Header.module.css";

// Мокаємо контекст авторизації через Vitest
vi.mock("../../../../../Context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("Header component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("рендерить логотип з посиланням на головну сторінку", () => {
    useAuth.mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  test("рендерить hero image на головній сторінці", () => {
    useAuth.mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    const heroImage = screen.getByAltText("hero");
    expect(heroImage).toBeInTheDocument();
  });

  test("рендерить всі пункти меню", () => {
    useAuth.mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={["/coffee"]}>
        <Header />
      </MemoryRouter>
    );

    const menuItems = [
      "Home",
      "Coffee",
      "Colored Phin",
      "Phin Combo",
      "Gift Set",
      "Contact",
    ];

    menuItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("показує Login, якщо користувач не авторизований", () => {
    useAuth.mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    const loginLink = screen.getByText("Login");
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest("a")).toHaveAttribute("href", "/signup");
  });

  test("показує Profile, якщо користувач авторизований", () => {
    useAuth.mockReturnValue({ user: { name: "Test" } });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
});
