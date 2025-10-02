import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import ContactPage from './pages/Contact/ContactPage';
import CoffeePage from './pages/CoffeePage/CoffeePage';
import Header from './pages/HomePage/components/Header/HeaderSection';
import Footer from './pages/HomePage/components/Footer/FooterSection';
import CoffeeDetail from './pages/DetailPagesCoffee/CoffeeDetail';
import Cart from './pages/CartPage/CartPage';
import { CartProvider } from './Context/CartContext';


function App() {
  return (
    <CartProvider>
    <Router>
      <Header /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/coffee" element={<CoffeePage/>} />
         <Route path="/coffee/:id" element={<CoffeeDetail />} />
         <Route path="/cart" element={<Cart/>} />
      </Routes>

      <Footer /> 
    </Router>
    </CartProvider>
  );
}

export default App;