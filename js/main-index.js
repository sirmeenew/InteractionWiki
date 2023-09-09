// Import the necessary Three.js modules
import * as THREE from 'three';

// Create a function to set up a scene with a different camera view
function setupScene(canvasId, cameraPosition) {
  const canvas = document.getElementById(canvasId);
  const renderer = new THREE.WebGLRenderer({ canvas });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

  const geometry = new THREE.BoxGeometry(4, 4, 4);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  // Set the camera position
  camera.position.set(...cameraPosition);

  // Create and add objects to the scene as needed

  // Add lights, geometry, and other elements to your scene

  // Create a render loop to continuously render the scene
  const animate = () => {
    requestAnimationFrame(animate);
    // Update animations or other dynamic elements here
    renderer.render(scene, camera);
  };

  function resizeRenderer(){
    const newWidth = canvas.clientWidth;
    const newHeight = canvas.clientHeight;

    if(canvas.width !== newWidth || canvas.height !== newHeight){
      renderer.setSize(newWidth, newHeight, false);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    }
  }

  window.addEventListener('resize', resizeRenderer);
  animate();
}


// Call the setupScene function for each canvas with its own camera view
setupScene('three-canvas-home', [0, 0, 8]);  // Example camera position for the first canvas
