'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="p-4 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl sm:text-3xl font-bold text-gray-100">
              Trendtial
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                Home
              </a>
              <a href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                About
              </a>
              <a href="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                Contact
              </a>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-200">
              Home
            </a>
            <a href="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-200">
              About
            </a>
            <a href="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-200">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
