import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Accessories from './pages/Accessories';
import Contact from './pages/Contact';
import Showroom from './pages/Showroom';
import NotFound from './pages/NotFound'; // 404 Page

const Layout = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow pt-20 md:pt-[82px]">
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
        <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
      </Route>
    </Routes>
  );
};

export default App;
