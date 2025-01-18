import * as THREE from 'three'
import gsap from 'gsap'

console.log("Hello, Three.js with TypeScript!");

// Set up scene
const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 5;
camera.lookAt(new THREE.Vector3(0, 1, 0))

scene.add(camera);

// Axes helper
const axesHelper = new THREE.AxesHelper(2);

scene.add(axesHelper);

// Create object
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: "pink" });

const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 2;
mesh.position.y = 1;

mesh.scale.set(0.2, -0.5, 2)

mesh.rotation.reorder("YXZ")
mesh.rotation.y = Math.PI*0.25
mesh.rotation.x = Math.PI*0.25

scene.add(mesh);

// Set up renderer
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);