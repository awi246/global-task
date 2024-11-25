import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaHome, 
  FaInfoCircle, 
  FaServicestack, 
  FaEnvelope, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa';
import Logo from '../../public/assets/Global Square.jpeg'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary p-4 flex justify-between items-center relative shadow-md">
      {/* Logo and Brand Name */}
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image 
            src={Logo} 
            alt="Logo" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
          <span className="ml-2 text-white font-semibold text-lg">GLOBAL SQUARE</span>
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link 
          href="/" 
          className="flex items-center text-white hover:text-accent transition-colors duration-300"
        >
          <FaHome className="mr-2" />
          Home
        </Link>
        <Link 
          href="/" 
          className="flex items-center text-white hover:text-accent transition-colors duration-300"
        >
          <FaInfoCircle className="mr-2" />
          About
        </Link>
        <Link 
          href="/" 
          className="flex items-center text-white hover:text-accent transition-colors duration-300"
        >
          <FaServicestack className="mr-2" />
          Services
        </Link>
        <Link 
          href="/" 
          className="flex items-center text-white hover:text-accent transition-colors duration-300"
        >
          <FaEnvelope className="mr-2" />
          Contact
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <div
        className={`absolute top-16 left-0 w-full bg-primary text-white flex flex-col items-center space-y-4 py-4 md:hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-5 pointer-events-none'
        }`}
      >
        <Link 
          href="/" 
          className="flex items-center text-white hover:text-accent transition-colors duration-300"
        >
          <FaHome className="mr-2" />
          Home
        </Link>
        <Link 
          href="/" 
          className="flex items-center text-white hover:text-accent transition-colors duration-300"
        >
          <FaInfoCircle className="mr-2" />
          About
        </Link>
        <Link 
          href="/" 
          className="flex items-center text-white hover:text-accent transition-colors duration-300"
        >
          <FaServicestack className="mr-2" />
          Services
        </Link>
        <Link 
          href="/" 
          className="flex items-center text-white hover:text-accent transition-colors duration-300"
        >
          <FaEnvelope className="mr-2" />
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
