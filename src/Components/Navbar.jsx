import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Showroom', path: '/showroom' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const desktopFadeVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 shadow-md select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

       

          {/* Centered Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navLinks.map((item, i) => (
              <motion.div
                key={item.path}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={desktopFadeVariant}
              >
                <Link
                  to={item.path}
                  className={`font-medium px-2 py-1 rounded-md outline-none transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-yellow-300 border-b-2 border-yellow-300'
                      : 'text-white hover:text-yellow-300'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded p-1"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-blue-600 px-4 pb-4 space-y-2"
          >
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block font-medium px-3 py-2 w-28 rounded-md transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-yellow-300 border-b-2 border-yellow-300'
                      : 'text-white hover:text-yellow-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
