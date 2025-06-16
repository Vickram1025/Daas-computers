import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaSearch } from 'react-icons/fa';
import { MdEmail, MdClear } from 'react-icons/md';

const branches = [
  {
    name: "Dell Katpadi",
    address: "No.340, Chittoor Bus Stop, Opp. Bharath Petroleum Bunk, Katpadi, Vellore 632007, Tamil Nadu",
    contact: "9524889898",
    email: "velloredellstore@gmail.com"
  },
  {
    name: "Dell Vellore",
    address: "18/13, Dharmaraja Koil Street, Thotapalayam, Vellore 632004, Tamil Nadu",
    contact: "9585639898",
    email: "desvellore2018@gmail.com"
  },
  {
    name: "ASUS Exclusive Store",
    address: "No.338, Chittoor Bus Stop, Opp. Bharath Petroleum Bunk, Katpadi, Vellore 632007, Tamil Nadu",
    contact: "9087597742",
    email: "asusvellorestore@gmail.com"
  },
  {
    name: "LENOVO Exclusive Store",
    address: "No.348, Chittoor Bus Stop, Opp. Bharath Petroleum Bunk, Katpadi, Vellore 632007, Tamil Nadu",
    contact: "9943318833",
    email: "vlrlenovostore@gmail.com"
  },
  {
    name: "ACER Mall Exclusive Store",
    address: "No.342, Chittoor Bus Stop, Opp. Bharath Petroleum, Katpadi, Vellore 632007, Tamil Nadu",
    contact: "9363290026, 9842349898",
    email: "acermallvir@gmail.com"
  },
  {
    name: "Daas Computers (Dell Exclusive)",
    address: "No.340, Chittoor Bus Stop, Opp. Bharath Petroleum Bunk, Katpadi, Vellore, Tamil Nadu",
    contact: "9524889898",
    email: "velloredellstore@gmail.com"
  },
  {
    name: "LENOVO Exclusive Store (Alt Email)",
    address: "No.348, Chittoor Bus Stand, Opp. Bharath Petroleum, Katpadi, Vellore-632007",
    contact: "9943318833",
    email: "virlenovostore@gmail.com"
  },
  {
    name: "Daas Computers Arni",
    address: "No. 268, Gandhi Road, Opp. Bharath Gas, Arni - 632301, Tamil Nadu",
    contact: "—",
    email: "arnidaascomputers@gmail.com"
  }
];

const locationDataset = {
  katpadi: ['katpadi', 'vellore', 'bagayam', 'sevur', 'senur', 'tiruvalam', 'vellore institute', 'sathuvachari', 'thorapadi', 'viruthampet'],
  thotapalayam: ['thotapalayam', 'sathuvachari', 'dharapadavedu', 'vellore town', 'velapadi'],
  arani: ['arani', 'periyakulam', 'polur', 'kalambur', 'vettavalam', 'periyeri', 'vannankulam']
};

const findNearestBranch = (location) => {
  const keyword = location.toLowerCase().trim();
  if (locationDataset.katpadi.some(k => keyword.includes(k))) return branches[0];
  if (locationDataset.arani.some(k => keyword.includes(k))) return branches[7];
  return null;
};

const Showroom = () => {
  const [userLocation, setUserLocation] = useState('');
  const [nearestBranch, setNearestBranch] = useState(null);

  useEffect(() => {
    if (userLocation.trim() === '') {
      setNearestBranch(null);
    } else {
      const result = findNearestBranch(userLocation);
      setNearestBranch(result);
    }
  }, [userLocation]);

  const clearInput = () => {
    setUserLocation('');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Find Your Nearest Dass Computer Store
        </motion.h1>

        <motion.div
          className="relative flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative w-full sm:w-2/3">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
            <input
              type="text"
              placeholder="Enter your town or village (e.g., Katpadi, Arani)"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              className="pl-10 pr-12 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-md text-gray-800 placeholder-gray-400 transition-all duration-300"
              aria-label="Search for a store by town or village"
            />
            {userLocation && (
              <button
                type="button"
                onClick={clearInput}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                aria-label="Clear search input"
              >
                <MdClear size={20} />
              </button>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {nearestBranch ? (
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg text-center border border-blue-600 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-blue-600">✅ Nearest Store Found</h2>
              <p className="text-lg sm:text-xl font-medium text-blue-800">{nearestBranch.name}</p>
              <p className="text-gray-700 flex justify-center items-center gap-2 mt-2 text-sm sm:text-base">
                <FaMapMarkerAlt className="text-blue-600" /> {nearestBranch.address}
              </p>
              {nearestBranch.contact && nearestBranch.contact !== '—' && (
                <p className="mt-2 flex justify-center items-center gap-2 text-sm sm:text-base text-gray-800">
                  <FaPhoneAlt className="text-blue-600" /> {nearestBranch.contact}
                </p>
              )}
              {nearestBranch.email && (
                <p className="mt-2 flex justify-center items-center gap-2 text-sm sm:text-base text-blue-600 underline">
                  <MdEmail /> <a href={`mailto:${nearestBranch.email}`}>{nearestBranch.email}</a>
                </p>
              )}
            </motion.div>
          ) : userLocation && (
            <motion.div
              className="text-center text-red-600 font-medium mt-4 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              ❌ No store found for "<strong>{userLocation}</strong>". Try another town or browse all stores below.
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {branches.map((branch, index) => {
            const isMatched = branch.name === nearestBranch?.name;
            return (
              <motion.div
                key={index}
                className={`p-6 rounded-xl shadow-md border transition-all duration-300 ${
                  isMatched
                    ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-300'
                    : 'bg-white border-gray-200 hover:shadow-lg hover:border-blue-600'
                }`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h3 className="text-lg font-bold mb-3 text-blue-700">{branch.name}</h3>
                <p className="text-sm flex items-center gap-2 mb-2 text-gray-700">
                  <FaMapMarkerAlt className="text-blue-600" /> {branch.address}
                </p>
                {branch.contact && branch.contact !== '—' && (
                  <p className="text-sm flex items-center gap-2 mb-2 text-gray-800">
                    <FaPhoneAlt className="text-blue-600" /> <a href={`tel:${branch.contact}`}>{branch.contact}</a>
                  </p>
                )}
                {branch.email && (
                  <p className="text-sm flex items-center gap-2 text-blue-600 underline">
                    <MdEmail /> <a href={`mailto:${branch.email}`}>{branch.email}</a>
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Showroom;