import React, { useState } from 'react';
import { MapPin, PhoneCall, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.2,
    },
  }),
};

const ContactDetails = () => {
  const contactItems = [
    {
      icon: <MapPin className="text-blue-600 w-8 h-8" />,
      title: 'Head Office',
      desc: 'No.16-4, 9th East Main Road, Near Auxilium College Roundtana, Opp. TMB Bank, Gandhi Nagar, Vellore – 632006, Tamil Nadu, India',
      link: 'https://maps.app.goo.gl/hsu9jkJd9vwGvoYC7',
    },
    {
      icon: <PhoneCall className="text-blue-600 w-8 h-8" />,
      title: 'Call Us',
      desc: '+91 984 234 9898',
      link: 'tel:+919842349898',
    },
    {
      icon: <Mail className="text-blue-600 w-8 h-8" />,
      title: 'Email',
      desc: 'daascomputers@gmail.com',
      link: 'mailto:daascomputers@gmail.com?subject=Support%20Request&body=Hi%20Dass%20Computer%2C%0A%0AI%20need%20assistance%20with...',
    },
  ];

  return (
    <motion.div
      className="bg-white shadow rounded-lg text-center h-full flex flex-col items-center p-3 justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeInUp}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Reach Out to Daas Computer</h2>
      <p className="text-gray-500 mb-10 text-sm">
        We're here to help. Call or message us for any service or product inquiries.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {contactItems.map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            target={item.link.startsWith("http") ? "_blank" : undefined}
            rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-200"
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="border-2 border-blue-600 rounded-full p-4 mb-4">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-1 px-4">{item.desc}</p>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await axios.post(
        "https://daascomputers.onrender.com/api/customers/contact",
        formData
      );

      toast.success("Dass Computers received your message!");
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(`Failed to send message: ${msg}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen px-2 sm:px-4 py-1">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5 items-">
        {/* Left Card - Contact Details */}
        <ContactDetails />

        {/* Right Card - Form */}
        <motion.div
          className="bg-white shadow rounded-lg p-2 h-full flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={1}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-2 text-center">Send Us a Message</h2>
          <p className="text-gray-600 mb-6 text-sm text-center">
            Have a question or need help? Fill out the form and we’ll get back to you as soon as possible.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Phone Number"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <motion.button
              type="submit"
              disabled={isSending}
              whileHover={{ scale: isSending ? 1 : 1.05 }}
              whileTap={{ scale: isSending ? 1 : 0.95 }}
              className={`${
                isSending
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold px-6 py-2 rounded transition`}
            >
              {isSending ? "Processing..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
