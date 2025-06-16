import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';

// Import all pages
import Home from './pages/Home';
import About from './pages/About';
import Accessories from './pages/Accessories';

import Contact from './pages/Contact';
import Showroom from './pages/Showroom';
import SearchHeader from './Components/SearchHeader';
import Footer from './Components/Footer';


const Layout = () => {
  return (
    <div className="w-full overflow-x-hidden">
      
      <Navbar />
      <SearchHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="accessories" element={<Accessories />} />
        
          <Route path="contact" element={<Contact />} />
          <Route path="showroom" element={<Showroom />} />
        </Route>
      </Routes>
  
  );
};

export default App;