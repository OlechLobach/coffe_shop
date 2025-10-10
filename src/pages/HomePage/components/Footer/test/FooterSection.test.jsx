import { render, screen } from "@testing-library/react";
import Footer from "../FooterSection";

describe("Footer component", () => {
  test("рендерить футер з текстом © Revo Coffee Vietnam - 2018", () => {
    render(<Footer />);
    const footerText = screen.getByText("© Revo Coffee Vietnam - 2018");
    expect(footerText).toBeInTheDocument();
  });
});
