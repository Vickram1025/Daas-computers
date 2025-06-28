// src/data/accessoryData.js

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

export default accessoryData;
