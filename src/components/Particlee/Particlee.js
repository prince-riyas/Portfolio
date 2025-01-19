import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import './Particlee.css';

const Particlee = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const container = containerRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.02); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Bright white light
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);


    // Camera
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(5, 2, 8);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    // Draco Loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/js/libs/draco/gltf/'); // Path to Draco decoder files

    // GLTF Loader
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // Animation mixer
    let mixer;

    // Load the GLTF model
    loader.load(
      '/models/gltf/LittlestTokyo.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);

        // Set up animations
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    // Clock for animations
    const clock = new THREE.Clock();

    // Animation loop
    const animate = () => {
      const delta = clock.getDelta();

      if (mixer) mixer.update(delta);

      controls.update();
      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resizing
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="particlee-container" />;
};

export default Particlee;