import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductOverviewPage from './components/ProductOverviewPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDetailsPage from './components/ProductDetailsPage';
import { TranslationProvider, useLanguage } from './components/TranslationContext'; // Import the custom hook
import LanguageSelector from './components/LanguageSelector';
import Bikepage from './components/Filter/bike/bikepage';
import Scooterpage from './components/Filter/Scooter/Scooterpage';
import FilterPage from './components/Filter/Filterpage';
import NewsletterSignup from './components/NewsletterSignup';

function App() {
  return (
    <TranslationProvider> {/* Wrap the entire application with TranslationProvider */}
      <AppContent />
    </TranslationProvider>
  );
}

function AppContent() {
  const [language, setLanguage] = useState("de");

  
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductOverviewPage />} />
        <Route path="/v1/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/v1/products/:categoryType/:productId" element={<ProductDetailsPage />} />
        <Route path="/v1/products/bike" element={<Bikepage />} />
        <Route path="/v1/products/scooter" element={<Scooterpage />} />
        <Route path="/filter" element={<FilterPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;










