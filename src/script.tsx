import * as THREE from 'three'
import gsap from 'gsap'

console.log("Hello, Three.js with TypeScript!");

// Set up scene
const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

scene.add(camera);

// Create object
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: "pink" });

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Set up renderer
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);