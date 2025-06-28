import React, { useState, useMemo } from 'react';
import {
  FaStar,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
} from 'react-icons/fa';
import accessoryData from '../data/accessoryData';

const Accessories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([
    'Mice',
    'Monitors',
    'Keyboards',
    'Laptop Bags',
  ]);

  const allItems = useMemo(() => Object.values(accessoryData).flat(), []);

  const uniqueBrands = useMemo(() => {
    const allowedBrands = ['Dell', 'Asus', 'Acer', 'HP', 'Lenovo'];
    return allowedBrands.filter((brand) =>
      allItems.some((item) => item.brand.toLowerCase() === brand.toLowerCase())
    );
  }, [allItems]);

  const filteredItems = useMemo(() => {
    let items = selectedCategories.flatMap((cat) => accessoryData[cat] || []);

    if (selectedBrand) {
      items = items.filter(
        (item) => item.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter((item) =>
        item.name.toLowerCase().startsWith(q)
      );
    }

    return items;
  }, [selectedCategories, selectedBrand, searchQuery]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrand('');
    setSelectedCategories(['Mice', 'Monitors', 'Keyboards', 'Laptop Bags']);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
        Shop Computer Accessories
      </h1>

      {/* Search + Filter Row */}
      <div className="flex items-center justify-between w-full max-w-4xl mb-6 gap-4">
        {/* Search Bar */}
        <div className="flex items-center border px-3 py-2 rounded bg-white shadow w-full">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedBrand('');
            }}
            placeholder="Search accessories..."
            className="ml-2 w-full outline-none bg-transparent text-sm"
          />
        </div>

        {/* Filter Button (Non-functional now because panel is always shown) */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow whitespace-nowrap cursor-not-allowed opacity-60"
        >
          <FaFilter />
          Filter
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex w-full max-w-7xl gap-6">
        {/* Product Cards */}
        <main className="w-full lg:w-4/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredItems.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 italic">
                No items found.
              </p>
            ) : (
              filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-xl shadow hover:shadow-md transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) =>
                      (e.target.src =
                        'https://via.placeholder.com/300x200?text=Accessory')
                    }
                    className="w-full h-36 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">
                    {item.name}
                  </h3>
                  <p
                    className="text-xs text-gray-500 cursor-pointer"
                    onClick={() => setSelectedBrand(item.brand)}
                  >
                    Brand: {item.brand}
                  </p>
                  <p className="text-xs text-yellow-600 flex items-center gap-1">
                    <FaStar className="text-yellow-500" /> {item.rating}
                  </p>
                  <p
                    className={`text-xs font-medium flex items-center gap-1 ${
                      item.availability === 'In Stock'
                        ? 'text-green-600'
                        : 'text-red-500'
                    }`}
                  >
                    {item.availability === 'In Stock' ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )}
                    {item.availability}
                  </p>
                </div>
              ))
            )}
          </div>
        </main>

        {/* Sticky Filter Panel */}
        <aside className="w-1/5 hidden lg:block sticky top-24 h-fit">
          <div className="bg-white p-4 rounded-xl shadow relative">
            <h3 className="font-semibold text-gray-800 mb-2">Select Brand</h3>
            <div className="space-y-2 mb-4">
              {uniqueBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-sm cursor-pointer text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrand === brand}
                    onChange={() =>
                      setSelectedBrand((prev) =>
                        prev === brand ? '' : brand
                      )
                    }
                  />
                  {brand}
                </label>
              ))}
            </div>

            <h3 className="font-semibold text-gray-800 mb-2">Select Categories</h3>
            <div className="space-y-2 mb-4">
              {Object.keys(accessoryData).map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-sm cursor-pointer text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>

            <button
              onClick={clearAllFilters}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg text-sm mt-2 hover:bg-red-600 transition"
            >
              Clear All Filters
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Accessories;
