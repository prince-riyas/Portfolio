import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground'; // Import the ParticleBackground component
import './Portfolio.css';


const Portfolio = () => {
  const projects = [
    { id: 1, title: 'Hostel Rent Application ' },
    { id: 2, title: 'Expense and Budget tracking tool' },
    { id: 3, title: 'Real Time Violence Detection' },
    { id: 4, title: 'Energy Consumption Prediction' },
    { id: 5, title: 'Synthetic Data Generation' }
  ];

  return (
    <div className="portfolio">
      <ParticleBackground /> {/* Add the ParticleBackground component here */}
      <div className="projects">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="project-title">{project.title}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;