import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import ContactPage from './pages/Contact/ContactPage';
import CoffeePage from './pages/CoffeePage/CoffeePage';
import Header from './pages/HomePage/components/Header/HeaderSection';
import Footer from './pages/HomePage/components/Footer/FooterSection';


function App() {
  return (
    <Router>
      <Header /> {/* Підвантажується на всіх сторінках */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/coffee" element={<CoffeePage/>} />
      </Routes>

      <Footer /> {/* Підвантажується на всіх сторінках */}
    </Router>
  );
}

export default App;