import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContext";
import "./App.css";
import Header from "./pages/HomePage/components/Header/HeaderDesctope.jsx";
import Footer from "./pages/HomePage/components/Footer/FooterSection";
import Home from "./pages/HomePage";
import CoffeePage from "./pages/CoffeePage/CoffeePage";
import CoffeeDetail from "./pages/DetailPages/DetailPagesCoffee/CoffeeDetail.jsx";
import Cart from "./pages/CartPage/CartPage";
import ColoredPhinPage from "./pages/ColoredPhinPage/ColoredPhin";
import ColoredPhinDetail from "./pages/DetailPages/PhinDetailPage/ColoredPhinDetail.jsx";
import GiftSetPage from "./pages/GiftSetPage/GiftSetPage.jsx";
import GiftSetDetailPage from "./pages/DetailPages/GiftSetDetailPage/GiftSetDetailPage.jsx";
import PhinComboPage from "./pages/PhinComboPage/PhinComboPage.jsx";
import PhinComboDetail from "./pages/DetailPages/PhinComboDetailPage/PhinComboDetail.jsx";
import AuthPage from "./pages/PersonalCabinetPage/AuthPage/AuthPage.jsx";
import ProfilePage from "./pages/PersonalCabinetPage/ProfilePage/ProfilePage.jsx";
import ContactPage from "./pages/Contact/ContactPage.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="appWrapper">
            <Header />
            <main className="contentWrapper">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gift-set" element={<GiftSetPage />} />
                <Route path="/gift-set/:id" element={<GiftSetDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/coffee" element={<CoffeePage />} />
                <Route path="/coffee/:id" element={<CoffeeDetail />} />
                <Route path="/colored-phin" element={<ColoredPhinPage />} />
                <Route path="/colored-phin/:id" element={<ColoredPhinDetail />} />
                <Route path="/phin-combo" element={<PhinComboPage />} />
                <Route path="/phin-combo/:id" element={<PhinComboDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signup" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
