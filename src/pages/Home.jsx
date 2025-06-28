import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';



import laptopImg from '../assets/PopularCategories/laptop.avif';
import computerImg from '../assets/PopularCategories/computer.avif';
import keyboardMouseImg from '../assets/PopularCategories/keyboard.avif';
import brandsVideo from '../video/brands-video.mp4';
import logo from '../assets/Daas Computers LOGO.png';
import {
  FaLaptop,
  FaDesktop,
  FaHeadphones,
  FaTools,
  FaCode, // Replacing FaSoftware (which doesn't exist)
  FaUserGraduate,
} from 'react-icons/fa';

import Home4 from '../assets/home 4.jpg'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import A from '../assets/our brand/acer.jpg';
import D from '../assets/our brand/dell-logo.png';
import h from '../assets/our brand/hp-logo.png';
import l from '../assets/our brand/lenova.png';
import Asus from '../assets/our brand/asus.jpg';

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


// Data
const timelineData = [
  { year: 2007, event: 'Founded by V.S. Kalidas in Gandhi Nagar, Vellore' },
  { year: 2010, event: 'Became Dell Exclusive Store in Vellore' },
  { year: 2013, event: 'Opened Lenovo Exclusive Store, Katpadi branch' },
  { year: 2018, event: 'Certified Epson partner, expanded repair services' },
  { year: 2024, event: 'Serving Vellore & Arani with top-tier tech solutions' },
];

const techShowcase = [
  { title: 'Latest Laptops', image: laptopImg, desc: 'Cutting-edge processors and sleek designs.' },
  { title: 'High-Performance Desktops', image: computerImg, desc: 'Built for gaming and work.' },
  { title: 'Premium Accessories', image: keyboardMouseImg, desc: 'Ergonomic and stylish gear.' },
];

// Animation Variants
const leftRightAnimation = (index) => ({
  initial: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
});
const scaleFade = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, ease: 'easeOut' },
};
const hoverEffect = { scale: 1.05, transition: { duration: 0.3 } };

// SplashScreen Component
const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 2500),
      setTimeout(() => setStep(3), 4000),
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
      }, 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 5 }}
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden bg-blue-400"
    >
      <div className="relative text-center w-full h-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="circuit-node"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
        {step >= 1 && (
          <motion.img
            src={logo}
            alt="DAAS Computers Logo"
            className="w-48 h-48 object-contain"
            variants={scaleFade}
            initial="initial"
            animate="animate"
          />
        )}
        {step >= 2 && (
          <motion.h1
            variants={leftRightAnimation(0)}
            initial="initial"
            animate="animate"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-sans mt-6 drop-shadow-lg"
          >
            DAAS Computers
          </motion.h1>
        )}
        {step >= 3 && (
          <motion.p
            variants={leftRightAnimation(1)}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white font-sans mt-3 drop-shadow-md"
          >
            Vellore & Arani's Tech Leaders Since 2007
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

// BannerSlider Component
const BannerSlider = () => {
  const { scrollYProgress } = useScroll();
  const background = useTransform(scrollYProgress, [0, 0.5, 1], ['#1e3a8a', '#3b82f6', '#bfdbfe']);

  const circuitOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const waveOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);




 

  return (
    <motion.div
      id="home"
      className="relative w-full h-[500px] md:h-[700px] overflow-hidden flex items-center justify-center"
      style={{ background }}
      variants={leftRightAnimation(0)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <motion.div className="absolute inset-0" style={{ opacity: circuitOpacity }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="circuit-node"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </motion.div>
      <motion.div className="absolute inset-0" style={{ opacity: waveOpacity }}>
        <div className="digital-wave top-1/4" />
        <div className="digital-wave top-1/2" style={{ animationDelay: '1s' }} />
        <div className="digital-wave top-3/4" style={{ animationDelay: '2s' }} />
      </motion.div>
      <video
        src={brandsVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover "
        style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 0.8]) }}
      />
      <motion.div
        className="relative text-center text-white p-4 opacity-95"
        variants={scaleFade}
        initial="initial"
        animate="animate"
      >

      </motion.div>
    </motion.div>
  );
};

// Services Component
const Services = () => {
  const { scrollYProgress } = useScroll();
  const background = useTransform(scrollYProgress, [0, 0.5, 1], ['#bfdbfe', '#93c5fd', '#60a5fa']);
  const services = [
    {
      title: 'Laptop Sales',
      desc: 'Wide range of laptops with the latest technology.',
      icon: <FaLaptop className="text-blue-600 text-3xl" />,
    },
    {
      title: 'Desktop Solutions',
      desc: 'Custom-built PCs tailored to your needs.',
      icon: <FaDesktop className="text-blue-600 text-3xl" />,
    },
    {
      title: 'Accessories',
      desc: 'High-quality peripherals to boost productivity.',
      icon: <FaHeadphones className="text-blue-600 text-3xl" />,
    },
    {
      title: 'Repairs & Support',
      desc: 'Quick and reliable repair and tech support.',
      icon: <FaTools className="text-blue-600 text-3xl" />,
    },
    {
      title: 'Software Solutions',
      desc: 'Installation, setup, and custom software services.',
      icon: <FaCode className="text-blue-600 text-3xl" />, // Corrected icon
    },
    {
      title: 'Student-Friendly Services',
      desc: 'Affordable pricing and seasonal discounts for school, college, and university students.',
      icon: <FaUserGraduate className="text-blue-600 text-3xl" />,
    },
  ];

  return (
    <motion.section
      id="services"
      className="py-12 sm:py-16 md:py-20 text-center min-h-[100vh] md:min-h-[120vh] bg-blue-100"
      style={{ background }}
      variants={leftRightAnimation(0)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <motion.h2
        variants={scaleFade}
        initial="initial"
        animate="animate"
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-8 md:mb-12 drop-shadow-md"
      >
        Our Exceptional Services
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-sm sm:max-w-xl md:max-w-4xl lg:max-w-6xl mx-auto px-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={{
              initial: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
              animate: (i) => ({
                opacity: 1,
                x: 0,
                transition: { delay: i * 0.1, duration: 0.8 },
              }),
            }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            whileHover={hoverEffect}
            className="p-4 md:p-6 bg-white rounded-xl shadow-lg"
          >
            <div className="mb-2">{service.icon}</div>
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2 md:mb-4">
              {service.title}
            </h3>
            <p className="text-gray-800 text-sm sm:text-base md:text-lg">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// Timeline Component
const Timeline = () => {
  return (
    <motion.section
      variants={scaleFade}
      initial="initial"
      animate="animate"
      style={{backgroundImage:`url(${Home4})`,
         backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',     // Ensures full coverage
    backgroundPosition: 'center', // Centers image nicely
    width: '100vw',               // Full screen width
    height: '1050px',     
    padding:'10px'         
     
    
    
    }}
     
    >
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-5 drop-shadow">
        Our Journey
      </h2>

      {/* Corrected syntax for motion.VerticalTimeline */}
      <motion.div
        variants={scaleFade} // Applying scaleFade to the wrapper around VerticalTimeline
        initial="initial"
        whileInView="animate" // Use whileInView for scroll-triggered animation
        viewport={{ once: true, amount: 0.2 }}
      >
        <VerticalTimeline>
          {timelineData.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              date={item.year.toString()}
              iconStyle={{
                background: '#3b82f6', // Tailwind blue-600
                color: '#fff',
              }}
              contentStyle={{
                background: '#fff',
                borderTop: '4px solid #3b82f6',
              }}
              contentArrowStyle={{ borderRight: '7px solid #3b82f6' }}
              icon={item.icon}
            >
              <h3 className="text-xl font-semibold text-blue-800">Year {item.year}</h3>
              <p className="text-gray-700 mt-2">{item.event}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </motion.div>
    </motion.section>
  );
};

// PopularCategories Component
const PopularCategories = () => {
  const { scrollYProgress } = useScroll();
  const background = useTransform(scrollYProgress, [0, 0.5, 1], ['#bfdbfe', '#93c5fd', '#60a5fa']);
  const categories = [
    { title: 'Laptops', image: laptopImg },
    { title: 'Desktops', image: computerImg },
    { title: 'Accessories', image: keyboardMouseImg },
    { title: 'Gaming Gear', image: keyboardMouseImg },
  ];

  return (
    <motion.section
      id="products"
      className="py-7 sm:py-10 md:py-16 flex items-center justify-center min-h-[90vh] md:min-h-[100vh] bg-blue-100 relative text-center"
      style={{ background }}
      variants={leftRightAnimation(0)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
       <motion.h2
          variants={scaleFade}
          initial="initial"
          animate="animate"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-8 md:mb-12 absolute top-16 right-[400px] "
        >
          Popular Categories
        </motion.h2>
      <div className="w-full max-w-sm sm:max-w-xl md:max-w-4xl lg:max-w-6xl px-4 flex flex-col items-center justify-start  mt-7">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={{
                initial: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                animate: (i) => ({
                  opacity: 1,
                  x: 0,
                  transition: { delay: i * 0.1, duration: 0.8 },
                }),
              }}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              whileHover={hoverEffect}
              className="p-4 md:p-16 bg-white rounded-xl shadow-lg text-center cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-2 md:mb-4 object-contain"
                
              />
              <h3 className="text-lg sm:text-xl font-bold text-blue-900">{category.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// TechShowcase Component
const TechShowcase = () => {
  const { scrollYProgress } = useScroll();
  const background = useTransform(scrollYProgress, [0, 0.5, 1], ['#bfdbfe', '#93c5fd', '#60a5fa']);

  return (
    <motion.section
      id="showcase"
      className="py-2 sm:py-3 md:py-6 text-center min-h-[90vh] md:min-h-[100vh] bg-blue-100"
      style={{ background }}
      variants={leftRightAnimation(1)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <motion.h2
        variants={scaleFade}
        initial="initial"
        animate="animate"
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-8 md:mb-12 drop-shadow-md"
      >
        Tech Showcase
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-sm sm:max-w-xl md:max-w-4xl lg:max-w-6xl mx-auto px-4">
        {techShowcase.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={{
              initial: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
              animate: (i) => ({
                opacity: 1,
                x: 0,
                transition: { delay: i * 0.1, duration: 0.8 },
              }),
            }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            whileHover={hoverEffect}
            className="p-4 md:p-6 bg-white rounded-xl shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-2 md:mb-4 object-contain"
              loading="lazy"
            />
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1 md:mb-2">
              {item.title}
            </h3>
            <p className="text-gray-800 text-sm sm:text-base md:text-lg">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
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

    const fadeRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
};



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
    <section className="py-14 sm:py-20 bg-blue-300 w-full" aria-label="Our Brands Section">
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
              <a href={branch.path} target="_blank" rel="noopener noreferrer">
                <div className="bg-white flex items-center justify-center h-40 sm:h-44 rounded-xl shadow-md cursor-pointer">
                  <img
                    src={branch.img}
                    alt={`Logo of ${branch.path.split('.')[1]}`}
                    className="max-h-28 w-auto object-contain p-4"
                    loading="lazy"
                  />
                </div>
              </a>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};




















// CallToAction Component
const CallToAction = () => {
  const { scrollYProgress } = useScroll();
  const background = useTransform(scrollYProgress, [0, 0.5, 1], ['#bfdbfe', '#93c5fd', '#60a5fa']);

  return (
    <motion.section
      id="cta"
      className="py-12 sm:py-16 md:py-10 text-center min-h-[60vh] md:min-h-[80vh] flex items-center justify-center bg-blue-100"
      style={{ background }}
      variants={leftRightAnimation(0)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <motion.div
        variants={scaleFade}
        initial="initial"
        animate="animate"
        className="max-w-xs sm:max-w-md md:max-w-3xl px-4"
      >
        <motion.h2
          variants={leftRightAnimation(0)}
          initial="initial"
          animate="animate"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-4 md:mb-6 drop-shadow-xl"
        >
          Elevate Your Tech Experience Today!
        </motion.h2>
        <motion.p
          variants={leftRightAnimation(1)}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="text-gray-800 text-base sm:text-lg md:text-xl mb-6 md:mb-8 drop-shadow-md"
        >
          Visit our store in Gandhi Nagar, Vellore, or shop online for the latest technology.
        </motion.p>

       
        <a href="/accessories">


        <motion.button
          variants={scaleFade}
          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-xl font-bold text-white
                     bg-gradient-to-r from-blue-600 to-blue-700
                     hover:from-blue-700 hover:to-blue-800
                     rounded-lg shadow-lg transition-all duration-300 ease-in-out"
        >
          Shop Now
        </motion.button>

       </a>


      </motion.div>
    </motion.section>
  );
};














// Home Component
const Home = () => {
  return (
    <div className="relative min-h-[300vh] overflow-x-hidden bg-blue-100">
      <style jsx>{`
        .circuit-node {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #60a5fa;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
          animation: circuitPulse 3s infinite;
        }
        .digital-wave {
          position: absolute;
          width: 100%;
          height: 4px;
          background: linear-gradient(to right, transparent, #60a5fa, transparent);
          animation: digitalWave 4s infinite ease-in-out;
        }
        @keyframes circuitPulse {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }
        @keyframes digitalWave {
          0% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
        }
      `}</style>

      <SplashScreen />
      <BannerSlider />
      <Services />
      <Timeline />
      <PopularCategories />
      <TechShowcase />
      <BranchSlider/>
      <CallToAction />
    </div>
  );
};

export default Home;