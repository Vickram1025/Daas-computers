import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle, Laptop, BadgePercent,
  ShieldCheck, Headset, Flag, Eye
} from 'lucide-react';

const fadeLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1 },
  viewport: { once: false, amount: 0.3 },
};

const fadeRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1 },
  viewport: { once: false, amount: 0.3 },
};

const About = () => {
  return (
    <div className="bg-blue-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Page Title */}
        <motion.h1
          {...fadeLeft}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          About Dass Computer Stores
        </motion.h1>

        {/* Mission & Vision Cards */}
        <section className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div {...fadeLeft} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <Flag className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To deliver reliable, high-performance laptops at affordable prices, making technology accessible to everyone.
              </p>
            </motion.div>

            <motion.div {...fadeRight} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <Eye className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and innovative laptop store, known for quality service and empowering users with the tools they need to succeed.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">Why Choose Dass Computer Store?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { Icon: Laptop, title: "Wide Laptop Range", desc: "A diverse range of laptops tailored to fit every need and budget." },
              { Icon: BadgePercent, title: "Affordable Pricing", desc: "Great deals, frequent discounts, and competitive prices." },
              { Icon: ShieldCheck, title: "Genuine Products", desc: "100% original products with official company warranty." },
              { Icon: Headset, title: "Support & Service", desc: "Friendly guidance and reliable after-sales support you can trust." },
              { Icon: CheckCircle, title: "Trusted by Many", desc: "A proven track record of happy customers and positive reviews." },
              { Icon: ShieldCheck, title: "Direct Dealing", desc: "No middlemen involved — you deal directly with our team for honest pricing and clear communication." },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...(i % 2 === 0 ? fadeLeft : fadeRight)}
                className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="text-blue-500 w-10 h-10 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Thank You Note */}
        <motion.section {...fadeLeft} className="text-center space-y-4 px-2 sm:px-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Thank you for choosing <span className="font-semibold text-blue-600">Dass Computer Store</span>. We're here to help you find the perfect laptop with confidence and ease.
          </p>
          <p className="text-sm text-gray-500 italic">
            *Please note: We do not provide delivery services. All purchases are available for in-store pickup only.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
