// src/components/Footer.jsx
import React from 'react';
import { Facebook, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full p-6 text-center border-t border-gray-700 mt-auto">
    <div className="container mx-auto">
      <p className="mb-4 text-gray-300">
        © 2024 Tendtial. All Rights Reserved.
      </p>
  
      <div className="flex justify-center space-x-6">
        <a href="https://www.facebook.com/profile.php?id=100014309833829" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook className="w-6 h-6 text-gray-300 hover:text-blue-500 transition-colors" />
        </a>
        <a href="https://www.instagram.com/m.haroon5295" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram className="w-6 h-6 text-gray-300 hover:text-pink-500 transition-colors" />
        </a>
        <a href="https://github.com/Haroon2697" target="_blank" rel="noopener noreferrer" aria-label="Github">
          <Github className="w-6 h-6 text-gray-300 hover:text-gray-500 transition-colors" />
        </a>
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;
