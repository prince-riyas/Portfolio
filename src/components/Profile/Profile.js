import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Profile.css';

const Profile = () => {
  // Dynamically import all images from the assets/images folder
  const importAll = (r) => r.keys().map(r);
  const imageContext = require.context('../../assets/images/', false, /\.(jpg|jpe?g|png|gif)$/);
  const images = importAll(imageContext);

  // State to track which images are loaded
  const [loadedImages, setLoadedImages] = useState({});

  // Ref for the gallery container
  const galleryRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
              img.src = src; // Load the image
              img.removeAttribute('data-src'); // Remove the data-src attribute
              setLoadedImages((prev) => ({ ...prev, [src]: true })); // Mark the image as loaded
              observer.unobserve(img); // Stop observing the image once it's loaded
            }
          }
        });
      },
      {
        rootMargin: '0px 0px 100px 0px', // Load images 100px before they come into view
      }
    );

    // Observe all images in the gallery
    const gallery = galleryRef.current;
    if (gallery) {
      const imageElements = gallery.querySelectorAll('.gallery-image[data-src]');
      imageElements.forEach((img) => observer.observe(img));
    }

    // Cleanup the observer
    return () => {
      if (gallery) {
        const imageElements = gallery.querySelectorAll('.gallery-image[data-src]');
        imageElements.forEach((img) => observer.unobserve(img));
      }
    };
  }, []);

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Gallery */}
      <div className="gallery" ref={galleryRef}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="gallery-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              data-src={image} // Use data-src for lazy loading
              alt={`Gallery item ${index}`}
              className="gallery-image"
              style={{
                opacity: loadedImages[image] ? 1 : 0, // Fade in the image once loaded
                transition: 'opacity 0.5s ease',
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Profile;