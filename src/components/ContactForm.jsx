import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (formData.name.length < 5) {
      tempErrors.name = 'Name must be more than 4 characters';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Email must be a valid Gmail address (e.g., example@gmail.com)';
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:3002/api/addcontact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Form data successfully submitted');
          setIsSubmitted(true);
          
          // Reset form fields
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        } else {
          console.error('Failed to submit form data');
        }
      } catch (error) {
        console.error('Error submitting form data:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-4 my-8"
    >
      <motion.form
        onSubmit={onSubmit}
        className="border border-gray-800 p-12 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-opacity-10 hover:shadow-slate-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {/* Form fields */}
        <motion.div className="mb-4">
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
        <motion.div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-slate-500 placeholder:text-gray-500"
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        </motion.div>
        <motion.div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-slate-500 placeholder:text-gray-500"
          />
          {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
        </motion.div>
        <motion.button
          type="submit"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-400 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Submit
        </motion.button>
        
           {/* Display message after submission */}
      {isSubmitted && <p className="text-slate-500">Thanks for your message!</p>}
      </motion.form>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/table')}
          className="text-blue-500 underline hover:text-blue-400 focus:outline-none"
        >
          Show Table
        </button>
      </div>
    </motion.div>
  );
};

export default ContactForm;
