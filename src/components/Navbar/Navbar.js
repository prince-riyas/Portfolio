import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/profile' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: '3D', path: '/particlee' },
  ];

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul>
        {navItems.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to={item.path}>{item.name}</Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navbar;