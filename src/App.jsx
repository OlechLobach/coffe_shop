import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import ContactPage from './pages/Contact/ContactPage';
import CoffeePage from './pages/CoffeePage/CoffeePage';
import Header from './pages/HomePage/components/Header/HeaderSection';
import Footer from './pages/HomePage/components/Footer/FooterSection';
import CoffeeDetail from './pages/DetailPages/DetailPagesCoffee/CoffeeDetail.jsx';
import Cart from './pages/CartPage/CartPage';
import { CartProvider } from './Context/CartContext';
import ColoredPhinPage from './pages/ColoredPhinPage/ColoredPhin';
import GiftSetPage from './pages/GiftSetPage/GiftSetPage.jsx';
import ColoredPhinDetail from './pages/DetailPages/PhinDetailPage/ColoredPhinDetail.jsx';
import PhinComboPage from './pages/PhinComboPage/PhinComboPage.jsx';
import PhinComboDetail from './pages/DetailPages/PhinComboDetailPage/PhinComboDetail.jsx';
import GiftSetDetailPage from './pages/DetailPages/GiftSetDetailPage/GiftSetDetailPage.jsx';


function App() {
  return (
    <CartProvider>
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gift-set" element={<GiftSetPage/>}/>
        <Route path="/gift-set/:id" element={<GiftSetDetailPage/>}/>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/coffee" element={<CoffeePage/>} />
        <Route path="/coffee/:id" element={<CoffeeDetail />} />
        <Route path="/colored-phin" element={<ColoredPhinPage/>}/>
        <Route path="/colored-phin/:id" element={<ColoredPhinDetail/>}/>
        <Route path="/phin-combo" element={<PhinComboPage/>}/>
        <Route path="/phin-combo/:id" element={<PhinComboDetail/>}/>
        <Route path="/cart" element={<Cart/>} />
      </Routes>
      <Footer /> 
    </Router>
    </CartProvider>
  );
}

export default App;