import React from 'react';
import { MapPin, PhoneCall, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

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

const ContactDetails = () => (
  <motion.div
    className="bg-gray-100 py-12 px-6 text-center rounded-lg shadow-md"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.3 }}
    variants={fadeInUp}
  >
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Reach Out to Dass Computer</h2>
    <p className="text-gray-500 mb-10 text-sm">
      We're here to help. Call or message us for any service or product inquiries.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {[
        {
          icon: <MapPin className="text-blue-600 w-8 h-8" />,
          title: 'Head Office',
          desc: 'No.34B, GPH Road, Katpadi, Vellore, Tamil Nadu – 632001, India',
        },
        {
          icon: <PhoneCall className="text-blue-600 w-8 h-8" />,
          title: 'Call Us',
          desc: '+91 987 654 3210',
        },
        {
          icon: <Mail className="text-blue-600 w-8 h-8" />,
          title: 'Email',
          desc: 'support@dasscomputer.in',
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center text-center"
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
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Contact = () => (
  <div className="bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
      <ContactDetails />

      <motion.div
        className="bg-white shadow rounded-lg p-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInUp}
        custom={1}
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-2">Send Us a Message</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Have a question or need help? Fill out the form and we’ll get back to you as soon as possible.
        </p>
        <form className="space-y-6">
          {[
            { label: 'Full Name *', type: 'text', id: 'name', required: true },
            { label: 'Email Address *', type: 'email', id: 'email', required: true },
            { label: 'Phone Number', type: 'tel', id: 'phone', required: false },
          ].map((field, i) => (
            <div className="relative z-0 w-full group" key={i}>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                placeholder=" "
                required={field.required}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor={field.id}
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                {field.label}
              </label>
            </div>
          ))}

          <div className="relative z-0 w-full group">
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Message *
            </label>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        className="w-full h-[450px] rounded-lg shadow overflow-hidden md:col-span-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
        custom={2}
      >
        <iframe
          title="Dass Computer Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.5228585028454!2d79.12765947585185!3d12.963335387344451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad38c9e99e7631%3A0x66be0e316a478b6d!2sKatpadi%2C%20Vellore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1717729446161!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </div>
  </div>
);

export default Contact;
