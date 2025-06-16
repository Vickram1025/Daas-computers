import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/Daas Computers LOGO.png';
import { FaFacebook } from 'react-icons/fa';
import { FaSquareInstagram } from 'react-icons/fa6';

const brandText = 'Daas Computers'.split('');

const SearchHeader = () => {
  return (
    <header className="bg-white shadow-md md:shadow-[0_4px_8px_rgba(0,0,0,0.2)] pt-20 sm:pt-10 md:pt-20 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mt-1 md:mt-2 md:flex-row md:items-center md:justify-between gap-6 sm:gap-5 sm:mt-9">

          {/* Logo + Brand */}
          <Link to="/" className="flex items-center justify-center md:justify-start space-x-2">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 text-center sm:text-left"
            >
              <img
                src={logo}
                alt="Daas Computers logo"
                className="w-20 h-16 sm:w-24 sm:h-20 object-fill"
              />
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 tracking-wide flex flex-wrap"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.3,
                    },
                  },
                }}
              >
                {brandText.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>
          </Link>


          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex space-x-4 mt-4 md:mt-0 justify-center md:justify-end md:mr-0 sm:mr-10 mr-4 animate-bounce"
          >
            <a
              href="https://www.facebook.com/share/1YjDfMJq8b/"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full bg-white border border-gray-300 shadow-md hover:border-blue-500 transition duration-300 w-12 h-12 flex items-center justify-center hover:scale-105"
            >
              <FaFacebook
                size={28}
                className="text-blue-600 group-hover:text-blue-700 transition duration-300"
              />
            </a>
            <a
              href="https://www.instagram.com/daascomputer?igsh=dGd6NDlhMGlpM2Fm"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full bg-white border border-gray-300 shadow-md hover:border-pink-500 transition duration-300 w-12 h-12 flex items-center justify-center hover:scale-105"
            >
              <FaSquareInstagram
                size={28}
                className="text-pink-600 group-hover:text-pink-700 transition duration-300"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;
