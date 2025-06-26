import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import laptopImg from '../assets/PopularCategories/laptop.avif';
import computerImg from '../assets/PopularCategories/computer.avif';
import keyboardMouseImg from '../assets/PopularCategories/keyboard.avif';

import A from '../assets/our brand/acer.jpg';
import D from '../assets/our brand/dell-logo.png';
import h from '../assets/our brand/hp-logo.png';
import l from '../assets/our brand/lenova.png';
import Asus from '../assets/our brand/asus.jpg';
import brandsvideo from '../video/brands-video.mp4';

const fadeRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
};

const BannerSlider = () => {
  return (
    <div className="relative w-full h-[220px] sm:h-[350px]   md:h-[450px] lg:h-[600px] overflow-hidden">
      <video
        src={brandsvideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
};

const PopularCategories = () => {
  const categories = [
    { title: 'Laptop', image: laptopImg },
    { title: 'Desktop', image: computerImg },
    { title: 'Accessories', image: keyboardMouseImg },
  ];

  return (
    <section className="w-full py-10 sm:py-14 md:py-20 bg-white" aria-label="Popular Categories">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-[#f67216] to-indigo-600 text-transparent bg-clip-text mb-10">
          Popular Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl text-center shadow-md cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 mx-auto mb-4 object-contain"
                loading="lazy"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{category.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BranchSlider = () => {
  const branches = [
    { id: 1, img: D, path: 'https://www.dell.com/en-in' },
    { id: 2, img: A, path: 'https://www.acer.com/in-en/' },
    { id: 3, img: Asus, path: 'https://www.asus.com/in/' },
    { id: 4, img: l, path: 'https://www.lenovo.com/in/en/d/deals/' },
    { id: 5, img: h, path: 'https://www.hp.com/in-en/shop/' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-14 sm:py-20 bg-blue-50 w-full" aria-label="Our Brands Section">
      <div className="w-full max-w-7xl px-4 mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-[#f67216] to-indigo-600 text-transparent bg-clip-text mb-6">
          Our Brands
        </h2>
        <p className="text-gray-600 text-center text-base sm:text-lg max-w-2xl mx-auto mb-10">
          Explore the most trusted computer brands we proudly offer.
        </p>
        <Slider {...settings}>
          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              variants={fadeRight}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, delay: index * 0.05 }}
              className="p-3"
              whileHover={{ scale: 1.05 }}
            >
             
                <div className="bg-white flex items-center justify-center h-40 sm:h-44 rounded-xl shadow-md cursor-pointer">
                  <img
                    src={branch.img}
                    alt={`Logo of ${branch.path.split('.')[1]}`}
                    className="max-h-28 w-auto object-contain p-4"
                    loading="lazy"
                  />
                </div>
           
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <main className="bg-blue-100 w-full overflow-x-hidden">
      <BannerSlider />
      <PopularCategories />
      <BranchSlider />
    </main>
  );
};

export default Home;
