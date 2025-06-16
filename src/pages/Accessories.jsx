import React, { useState, useRef, useEffect } from "react";
import {
  FaMouse,
  FaDesktop,
  FaKeyboard,
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
} from "react-icons/fa";

// Local Images
import M1 from "../assets/Accessories/M1.avif";
import M2 from "../assets/Accessories/M2.avif";
import monitor1 from "../assets/Accessories/monitor1.avif";
import bag1 from "../assets/Accessories/bag1.jpg";
import bag3 from "../assets/Accessories/bag3.jpg";

const placeholderImg = "https://via.placeholder.com/300x200?text=Accessory";

const accessoryData = {
  Mice: [
    { name: "Asus Mouse", image: M1, brand: "Asus", rating: 4.2, availability: "In Stock", description: "Wireless ergonomic mouse with 1600 DPI." },
    { name: "HP Mouse", image: M2, brand: "HP", rating: 4.0, availability: "In Stock", description: "Reliable optical mouse with USB connectivity." },
    { name: "Logitech M90", image: placeholderImg, brand: "Logitech", rating: 4.1, availability: "In Stock", description: "Basic wired mouse for everyday use." },
    { name: "Dell Optical Mouse", image: placeholderImg, brand: "Dell", rating: 3.9, availability: "Out of Stock", description: "Compact design for laptop users." },
    { name: "Lenovo USB Mouse", image: placeholderImg, brand: "Lenovo", rating: 4.0, availability: "In Stock", description: "Smooth navigation with ergonomic grip." },
    { name: "Zebronics Zeb-Mouse", image: placeholderImg, brand: "Zebronics", rating: 3.8, availability: "In Stock", description: "Budget mouse with 1000 DPI sensor." },
    { name: "iBall Style 63", image: placeholderImg, brand: "iBall", rating: 4.1, availability: "In Stock", description: "Stylish and responsive mouse." },
    { name: "HP Wireless 200", image: placeholderImg, brand: "HP", rating: 4.3, availability: "In Stock", description: "Wireless mouse with nano receiver." },
    { name: "Redgear Drag", image: placeholderImg, brand: "Redgear", rating: 4.4, availability: "In Stock", description: "Gaming mouse with RGB lighting." },
    { name: "Amkette Evo", image: placeholderImg, brand: "Amkette", rating: 3.7, availability: "In Stock", description: "Compact mouse with precise tracking." },
  ],

  Monitors: [
    { name: "Samsung Monitor", image: monitor1, brand: "Samsung", rating: 4.5, availability: "In Stock", description: "24-inch FHD monitor with vibrant colors." },
    { name: "LG 22MP68", image: placeholderImg, brand: "LG", rating: 4.3, availability: "In Stock", description: "IPS panel with slim bezels." },
    { name: "Dell SE2419HR", image: placeholderImg, brand: "Dell", rating: 4.2, availability: "In Stock", description: "Full HD with ultra-wide viewing angles." },
    { name: "Acer Nitro VG240Y", image: placeholderImg, brand: "Acer", rating: 4.6, availability: "Out of Stock", description: "Gaming monitor with 75Hz refresh rate." },
    { name: "BenQ GW2480", image: placeholderImg, brand: "BenQ", rating: 4.4, availability: "In Stock", description: "Low blue light and flicker-free tech." },
    { name: "HP 22fw", image: placeholderImg, brand: "HP", rating: 4.1, availability: "In Stock", description: "Ultra-slim with AMD FreeSync." },
    { name: "ViewSonic VA2215", image: placeholderImg, brand: "ViewSonic", rating: 3.9, availability: "In Stock", description: "Basic monitor with anti-glare coating." },
    { name: "Asus VP228HE", image: placeholderImg, brand: "Asus", rating: 4.0, availability: "In Stock", description: "Gaming monitor with low input lag." },
    { name: "Lenovo D22-20", image: placeholderImg, brand: "Lenovo", rating: 4.0, availability: "In Stock", description: "Budget monitor with tilt adjustment." },
    { name: "Philips 223V5LHSB2", image: placeholderImg, brand: "Philips", rating: 3.8, availability: "Out of Stock", description: "Value monitor with HDMI input." },
  ],

  "Laptop Bags": [
    { name: "HP Bag", image: bag1, brand: "HP", rating: 4.3, availability: "Out of Stock", description: "Padded bag for 15.6\" laptops." },
    { name: "Dell Bag", image: bag3, brand: "Dell", rating: 4.0, availability: "In Stock", description: "Water-resistant backpack with laptop sleeve." },
    { name: "Lenovo Casual Bag", image: placeholderImg, brand: "Lenovo", rating: 4.2, availability: "In Stock", description: "Stylish laptop bag for everyday use." },
    { name: "Targus Classic", image: placeholderImg, brand: "Targus", rating: 4.5, availability: "In Stock", description: "Classic briefcase-style laptop bag." },
    { name: "American Tourister", image: placeholderImg, brand: "AT", rating: 4.6, availability: "In Stock", description: "Trendy backpack with compartments." },
    { name: "Skybags Urban", image: placeholderImg, brand: "Skybags", rating: 4.1, availability: "Out of Stock", description: "Urban-style laptop backpack." },
    { name: "Aristocrat Laptop Bag", image: placeholderImg, brand: "Aristocrat", rating: 3.9, availability: "In Stock", description: "Lightweight and compact design." },
    { name: "Amazon Basics Bag", image: placeholderImg, brand: "Amazon", rating: 4.2, availability: "In Stock", description: "Basic black laptop backpack." },
    { name: "Wildcraft 32L", image: placeholderImg, brand: "Wildcraft", rating: 4.3, availability: "In Stock", description: "Durable bag with organizer pocket." },
    { name: "Puma Backpack", image: placeholderImg, brand: "Puma", rating: 4.1, availability: "In Stock", description: "Sporty design with laptop protection." },
  ],

  Keyboards: [
    { name: "Logitech K120", image: placeholderImg, brand: "Logitech", rating: 4.2, availability: "In Stock", description: "Full-size keyboard with low-profile keys." },
    { name: "Dell KB216", image: placeholderImg, brand: "Dell", rating: 4.1, availability: "In Stock", description: "Spill-resistant USB keyboard." },
    { name: "HP K1500", image: placeholderImg, brand: "HP", rating: 4.0, availability: "In Stock", description: "Quiet, responsive keys and number pad." },
    { name: "Zebronics Zeb-KM2100", image: placeholderImg, brand: "Zebronics", rating: 3.9, availability: "In Stock", description: "Wired combo with multimedia keys." },
    { name: "Redragon K552", image: placeholderImg, brand: "Redragon", rating: 4.5, availability: "Out of Stock", description: "Mechanical gaming keyboard with RGB." },
    { name: "TVS Gold Keyboard", image: placeholderImg, brand: "TVS", rating: 4.4, availability: "In Stock", description: "Mechanical tactile feedback keyboard." },
    { name: "Amkette Evo Fox", image: placeholderImg, brand: "Amkette", rating: 4.3, availability: "In Stock", description: "Gaming keyboard with backlight." },
    { name: "Cosmic Byte CB-GK-02", image: placeholderImg, brand: "Cosmic Byte", rating: 4.1, availability: "In Stock", description: "Tenkeyless mechanical keyboard." },
    { name: "Lenovo 300 Keyboard", image: placeholderImg, brand: "Lenovo", rating: 4.0, availability: "In Stock", description: "Compact design, USB interface." },
    { name: "Portronics Key2-A", image: placeholderImg, brand: "Portronics", rating: 3.8, availability: "In Stock", description: "Portable keyboard with soft keys." },
  ],
};

const categoryIcons = {
  Mice: <FaMouse />,
  Monitors: <FaDesktop />,
  Keyboards: <FaKeyboard />,
  "Laptop Bags": <FaBriefcase />,
};

const MAX_ITEMS = 30;
const INITIAL_VISIBLE = 16;

const Accessories = () => {
  const categories = Object.keys(accessoryData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const gridRef = useRef(null);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const currentItems = accessoryData[activeCategory] || [];
  const totalItems = [
    ...currentItems,
    ...Array.from({ length: MAX_ITEMS - currentItems.length }, () => null),
  ];

  const visibleItems = totalItems.slice(0, visibleCount);
  const canShowMore = visibleCount < MAX_ITEMS;

  useEffect(() => {
    if (gridRef.current && visibleCount > INITIAL_VISIBLE) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [visibleCount]);

  return (
    <div className="min-h-screen bg-blue-100 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl p-5 sm:text-4xl md:text-5xl  font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Shop Computer Accessories
        </h1>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 flex items-center gap-2 rounded-full text-sm font-medium shadow-sm transition 
                ${activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-50"
                }`}
            >
              <span className="text-lg">{categoryIcons[category]}</span>
              {category}
            </button>
          ))}
        </div>

        {/* Grid Display */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {visibleItems.map((item, index) =>
            item ? (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => (e.target.src = placeholderImg)}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-base font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-1">Brand: {item.brand}</p>
                <p className="text-sm text-yellow-600 flex items-center gap-1">
                  <FaStar className="text-yellow-500" /> {item.rating}
                </p>
                <p className={`text-sm font-medium flex items-center gap-1 mb-2 ${item.availability === "In Stock" ? "text-green-600" : "text-red-500"}`}>
                  {item.availability === "In Stock" ? <FaCheckCircle /> : <FaTimesCircle />}
                  {item.availability}
                </p>
                <p className="text-xs text-gray-600 italic">{item.description}</p>
              </div>
            ) : (
              <div
                key={index}
                className="bg-white p-4 rounded-xl border-dashed border-2 border-gray-300 text-gray-400 flex items-center justify-center text-sm h-52 text-center italic"
              >
                Coming Soon
              </div>
            )
          )}
        </div>

        {/* Show More Button */}
        {canShowMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 10, MAX_ITEMS))}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accessories;
