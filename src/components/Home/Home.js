import React, { useState, useEffect, useRef } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { motion, useAnimation } from 'framer-motion';
import './Home.css';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();
  const [subtitle, setSubtitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const subtitleRef = useRef(null); // Ref to track the subtitle element

  const texts = ['A Creative Developer','AI enthusiast','Python Full Stack Developer']; // Add more texts as needed

  // Initialize particles
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate text based on scroll position
  useEffect(() => {
    if (scrollY > 50) {
      controls.start({ opacity: 0, y: -100 }); // Fade out and move up
    } else {
      controls.start({ opacity: 1, y: 0 }); // Reset to original position
    }
  }, [scrollY, controls]);

  // Typewriter effect for subtitle
  useEffect(() => {
    const handleType = () => {
      const currentText = texts[loopNum % texts.length];
      const updatedText = isDeleting
        ? currentText.substring(0, subtitle.length - 1)
        : currentText.substring(0, subtitle.length + 1);

      setSubtitle(updatedText);

      if (!isDeleting && updatedText === currentText) {
        // Pause at the end of typing
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === '') {
        // Switch to the next text after deleting
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setTypingSpeed(isDeleting ? 75 : 150); // Adjust typing and deleting speed
    };

    const timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [subtitle, isDeleting, loopNum, texts, typingSpeed]);

  // Update cursor position based on subtitle length
  useEffect(() => {
    if (subtitleRef.current) {
      const textWidth = subtitleRef.current.scrollWidth; // Get the width of the text
      subtitleRef.current.style.setProperty('--cursor-position', `${textWidth}px`); // Update cursor position
    }
  }, [subtitle]);

  return (
    <div className="home">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: '#121212', // Dark background
            },
          },
          fpsLimit: 60, // Frame rate limit
          interactivity: {
            events: {
              onClick: {
                enable: true, // Enable click interaction
                mode: 'push', // Add particles on click
              },
              onHover: {
                enable: true, // Enable hover interaction
                mode: 'repulse', // Repel particles on hover
              },
            },
            modes: {
              push: {
                quantity: 4, // Number of particles to add on click
              },
              repulse: {
                distance: 200, // Distance to repel particles
                duration: 0.4, // Duration of the repulsion effect
              },
            },
          },
          particles: {
            color: {
              value: '#FFFFFF', // Particle color (accent color)
            },
            links: {
              color: '#FFFFFF', // Link color between particles
              distance: 150, // Maximum distance between linked particles
              enable: true, // Enable links between particles
              opacity: 0.5, // Link opacity
              width: 1, // Link width
            },
            collisions: {
              enable: true, // Enable particle collisions
            },
            move: {
              direction: 'none', // Random movement direction
              enable: true, // Enable particle movement
              outModes: {
                default: 'bounce', // Particles bounce off the edges
              },
              random: false, // Disable random movement
              speed: 2, // Movement speed
              straight: false, // Disable straight-line movement
            },
            number: {
              density: {
                enable: true, // Enable density-based particle distribution
                area: 800, // Area for density calculation
              },
              value: 80, // Total number of particles
            },
            opacity: {
              value: 0.5, // Particle opacity
            },
            shape: {
              type: 'circle', // Particle shape
            },
            size: {
              value: { min: 1, max: 5 }, // Particle size range
            },
          },
          detectRetina: true, // Optimize for retina displays
        }}
      />

      {/* Centered Text */}
      <motion.div
        className="text-container"
        initial={{ opacity: 0, y: 50 }} // Start slightly below and invisible
        animate={controls} // Controlled by scroll
        transition={{ duration: 0.5 }} // Smooth transition
      >
        <h1 className="text">Hi, I'm Prince</h1>
        <h2 className="subtitle" ref={subtitleRef}>
          {subtitle}
          <span className="cursor"></span> {/* Moving cursor */}
        </h2>
      </motion.div>
    </div>
  );
};

export default Home;