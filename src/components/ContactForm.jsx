import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("mwpegena");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    
    if (formData.name.length < 2) {
      tempErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Email is not valid';
    }

    if (formData.message.length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() && state.succeeded === false) {
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Animate from the top
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-4 my-8"
    >
      <motion.form
        onSubmit={onSubmit}
        className="border border-gray-800 p-12 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-opacity-10 hover:shadow-slate-800"
        initial={{ opacity: 0, y: -30 }} // Animate from the top
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <label className="block text-sm font-medium mb-1 text-white">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-slate-500 placeholder:text-gray-500"
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <label className="block text-sm font-medium mb-1 text-white">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-slate-500 placeholder:text-gray-500"
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <label className="block text-sm font-medium mb-1 text-white">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-slate-500 placeholder:text-gray-500"
          />
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
          />
          {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
        </motion.div>

        <motion.button
          type="submit"
          disabled={state.submitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          transition={{ duration: 0.3 }}
        >
          Submit
        </motion.button>

        {state.succeeded && <p className="text-slate-500">Thanks for your message!</p>}
      </motion.form>
    </motion.div>
  );
};

export default ContactForm;
