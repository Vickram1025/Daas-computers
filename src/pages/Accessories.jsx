import React, { useState, useEffect, useMemo } from 'react';
import {
  FaStar,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
  FaTimes,
} from 'react-icons/fa';
import axios from 'axios';

const Accessories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    axios
      .get('https://daascomputers.onrender.com/api/product/all')
      .then((res) => {
        const updated = res.data.data.map((item) => ({
          ...item,
          name: item.productName,
          brand: item.brandName?.trim(),
          image: item.imageBase64,
          availability: 'In Stock',
        }));
        setData(updated);
      })
      .catch((err) => console.error('API Error:', err))
      .finally(() => setLoading(false));
  }, []);

  const uniqueBrands = useMemo(() => {
    const allowedBrands = ['Dell', 'Asus', 'Acer', 'HP', 'Lenovo'];
    return allowedBrands.filter((brand) =>
      data.some((item) => item.brand?.toLowerCase() === brand.toLowerCase())
    );
  }, [data]);

  const filteredItems = useMemo(() => {
    let items = [...data];

    if (selectedCategories.length > 0) {
      items = items.filter((item) =>
        selectedCategories.some((cat) =>
          item.name.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    if (selectedBrand) {
      const selected = selectedBrand.trim().toLowerCase();
      items = items.filter(
        (item) => item.brand?.trim().toLowerCase() === selected
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      items = items.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
    }

    return items;
  }, [data, selectedCategories, selectedBrand, searchQuery]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrand('');
    setSelectedCategories([]);
    setSearchQuery('');
  };

  const FilterPanel = ({ close }) => (
    <div className="bg-white p-4 rounded-xl shadow relative h-fit max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 text-lg">Filters</h3>
        {close && (
          <button onClick={close} className="text-gray-600 hover:text-red-500">
            <FaTimes />
          </button>
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 text-sm">Select Brand</h4>
        <div className="space-y-2">
          {uniqueBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedBrand === brand}
                onChange={() =>
                  setSelectedBrand((prev) => (prev === brand ? '' : brand))
                }
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 text-sm">Select Categories</h4>
        <div className="space-y-2">
          {['Mice', 'Monitors', 'Keyboards', 'Laptop Bags'].map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          clearAllFilters();
          if (close) close();
        }}
        className="w-full bg-red-500 text-white py-2 rounded-lg text-sm mt-2 hover:bg-red-600"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-100 p-4 sm:p-6 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4 text-center">
        Shop Computer Accessories
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl mb-6 gap-4">
        <div className="flex items-center border px-3 py-2 rounded bg-white shadow w-full">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search accessories..."
            className="ml-2 w-full outline-none bg-transparent text-sm"
          />
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow lg:hidden"
          onClick={() => setShowMobileFilter(true)}
        >
          <FaFilter />
          Filter
        </button>
      </div>

      {/* Filter drawer for mobile/tablet */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-4 z-50 relative">
            <FilterPanel close={() => setShowMobileFilter(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6">
        {/* Product Grid */}
        <main className="w-full lg:w-4/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              <p className="col-span-full text-center text-blue-600 font-medium">
                Loading...
              </p>
            ) : filteredItems.length === 0 ? (
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

        {/* Filter Sidebar for large screens */}
        <aside className="w-full lg:w-1/5 hidden lg:block sticky top-24 h-fit">
          <FilterPanel />
        </aside>
      </div>
    </div>
  );
};

export default Accessories;
