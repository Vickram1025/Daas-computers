import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ChatPopup from './togglePopup';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, amount: 0.2 },
};

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          {/* Company Info */}
          <motion.div {...fadeUp}>
            <h3 className="text-xl font-bold mb-4">Daas Computers</h3>
            <p className="text-sm text-white/90 leading-relaxed mb-4">
              Daas Computers is a trusted provider of reliable laptop and desktop solutions.
              Based in Katpadi, near Aazhlaiyam College, we’ve proudly served the tech needs
              of our community for over 15 years.
            </p>

            <div className="flex space-x-4 mt-3">
              <a
                href="https://www.facebook.com/share/1YjDfMJq8b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/daascomputer?igsh=dGd6NDlhMGlpM2Fm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>

          {/* Information Links */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-xl font-bold mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/showroom" className="hover:underline">Showroom</Link></li>
              <li><Link to="/accessories" className="hover:underline">Accessories</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.4 }}>
            <h3 className="text-xl font-bold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link to="/accessories" className="hover:underline">Laptops</Link></li>
              <li><Link to="/accessories" className="hover:underline">Desktops</Link></li>
              <li><Link to="/accessories" className="hover:underline">Accessories</Link></li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-10 border-t border-white/20 pt-4 text-center text-sm text-white/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Daas Computers. All rights reserved.
        </motion.div>
      </div>

      {/* Chat Popup Component */}
      <ChatPopup />
    </footer>
  );
};

export default Footer;
