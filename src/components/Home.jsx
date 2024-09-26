import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Globe, Users, Zap, Briefcase } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import AnimatedCounter from './AnimatedCounter';

const Home = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const features = [
    { icon: <Globe className="w-12 h-12 text-blue-400" />, title: 'Global Reach', description: 'Connect with customers worldwide' },
    { icon: <Zap className="w-12 h-12 text-blue-400" />, title: 'Lightning Fast', description: 'Optimized for speed and efficiency' },
    { icon: <Users className="w-12 h-12 text-blue-400" />, title: 'Team Collaboration', description: 'Work seamlessly with your team' },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="mt-10 py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold mb-4"
          >
            Welcome to Our Amazing Product
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl mb-8 max-w-2xl mx-auto text-center text-gray-300"
          >
            Discover how we can transform your business today.
          </motion.p>
          <motion.button
            aria-label="Get Started"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
          >
            <a href="/contact">Get Started</a>
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 1.5 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.3 }}
                className="border border-gray-800 p-8 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-opacity-10 hover:shadow-slate-800"
              >
                <div className="text-blue-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Our Achievements</h2>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: <Briefcase className="w-12 h-12" />, stat: 500, label: 'Clients Served' },
              { icon: <Globe className="w-12 h-12" />, stat: 20, label: 'Countries Reached' },
              { icon: <Users className="w-12 h-12" />, stat: 50, label: 'Team Members' },
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
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">About Trendtial</h2>
          <motion.div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="border border-gray-800 p-8 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-opacity-10 hover:shadow-slate-800"
            >
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-300">
                To empower businesses through innovative software solutions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="border border-gray-800 p-8 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-opacity-10 hover:shadow-slate-800"
            >
              <h3 className="text-xl font-semibold mb-2">Our Services</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>Custom Software Development</li>
                <li>Website Building & Design</li>
                <li>CRM System Development</li>
                <li>Consulting & Support</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="border border-gray-800 p-8 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-opacity-10 hover:shadow-slate-800"
            >
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <p className="text-gray-300">
                Integrity, Innovation, and Customer Success drive everything we do.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold mb-8"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.button
            aria-label="Contact Us"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
          >
            <a href="/contact">Contact Us</a>
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Home;
