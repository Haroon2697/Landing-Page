import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Briefcase, Code, Database, Layout } from 'lucide-react';

// Animated counter component for stat numbers
const AnimatedCounter = ({ value, duration = 2 }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {value}
    </motion.span>
  );
};

// Variants for staggering animations across sections
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

export default function About() {
  return (
    <div className="text-white py-16">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-center"
        >
          About Tendtial
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl mb-16 max-w-2xl mx-auto text-center text-gray-300"
        >
Your Partner in Pioneering Tech Solutions for the Future
        </motion.p>

        {/* Stats Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { icon: <Briefcase className="w-12 h-12" />, stat: '500+', label: 'Clients Served' },
            { icon: <Globe className="w-12 h-12" />, stat: '20+', label: 'Countries Reached' },
            { icon: <Users className="w-12 h-12" />, stat: '50+', label: 'Team Members' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="border border-gray-800 p-8 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-opacity-10 hover:shadow-slate-800"
            >
              <div className="text-gray-400 mb-4">{item.icon}</div>
              <div className="text-4xl font-bold mb-2 text-white">
                <AnimatedCounter value={item.stat} />
              </div>
              <div className="text-xl text-gray-300">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="border border-gray-800 p-12 rounded-lg shadow-lg max-w-3xl mx-auto transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-opacity-10 hover:shadow-slate-800 mb-16"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: <Code className="w-8 h-8" />, label: 'Custom Websites' },
              { icon: <Database className="w-8 h-8" />, label: 'CRM Solutions' },
              { icon: <Layout className="w-8 h-8" />, label: 'Tech Consulting' },
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-blue-400 mb-2">{service.icon}</div>
                <div className="text-lg text-gray-300">{service.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="border border-gray-800 p-12 rounded-lg shadow-lg max-w-3xl mx-auto transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-opacity-10 hover:shadow-slate-800"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Our Mission</h2>
          <p className="text-lg text-center text-gray-300">
            At Tendtial, we're committed to revolutionizing the way businesses operate in the digital age. Our mission is to provide cutting-edge technological solutions, including custom websites and CRM systems, that empower organizations to streamline their operations, enhance customer relationships, and achieve sustainable growth. We combine innovation with expertise to deliver tailored solutions that meet and exceed our clients' expectations.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 text-center"
        >
          <a 
            href="#contact" 
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
}
