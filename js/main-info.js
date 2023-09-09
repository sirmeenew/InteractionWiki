// Import the necessary Three.js modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Create a function to set up a scene with a different camera view
function setupScene(canvasId, cameraPosition) {
  const scrollContent = document.querySelector("section-info")
  const canvas = document.getElementById(canvasId);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.rotation.set(0, Math.PI / 4, 0);

  const light = new THREE.AmbientLight(0xffffff, 10);
  scene.add(light);

  const pixelRatio = window.devicePixelRatio || 1;
  renderer.setPixelRatio(pixelRatio);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.position.set(10, 10, 1); // Adjust the light position
  scene.add(directionalLight);
  
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight2.position.set(10, 3, 3); // Adjust the light position
  scene.add(directionalLight2);

  const pointLight = new THREE.PointLight(0xffffff, 2); // Increase intensity to 2 (default is 1)
  pointLight.position.set(0, 10, 0);
  scene.add(pointLight);

  let gltfSceneControl;

  const gltfLoader = new GLTFLoader();
  gltfLoader.load('../model_3d/object.glb', (gltfScene) => {
    gltfScene.scene.scale.set(50, 50, 50);
    gltfScene.scene.rotation.set(0, 0, 0);
    scene.add(gltfScene.scene);
    gltfSceneControl = gltfScene;
    animate();
  });

  // const geometry = new THREE.BoxGeometry(4, 4, 4);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  
  // Set the camera position
  camera.position.set(...cameraPosition);

  // Create and add objects to the scene as needed

  // Add lights, geometry, and other elements to your scene

  // Create a render loop to continuously render the scene

  let modelRotationX = 0;
  let modelRotationY = 0;
  let modelRotationZ = 0;

  const animate = () => {
    gltfSceneControl.scene.rotation.x = modelRotationX;
    gltfSceneControl.scene.rotation.y = modelRotationY;
    gltfSceneControl.scene.rotation.z = modelRotationZ;
    // modelRotationX += 0.005;
    modelRotationY += 0.005;
    // modelRotationZ += 0.005;
    // Update animations or other dynamic elements here
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  // Add event listeners for mouse events
  function resizeRenderer(){
    const newWidth = canvas.clientWidth;
    const newHeight = canvas.clientHeight;

    if(canvas.width !== newWidth || canvas.height !== newHeight){
      renderer.setSize(newWidth, newHeight, false);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    }
  }

  // function animateDiagram(){

  // }

  // document.addEventListener('scroll',animateDiagram);
  window.addEventListener('resize', resizeRenderer);

}

// Call the setupScene function for each canvas with its own camera view
setupScene('three-canvas-info', [30, 5, 30]);  // Example camera position for the first canvas
