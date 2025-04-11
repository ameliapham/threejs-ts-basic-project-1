import * as THREE from 'three'
import gsap from 'gsap'

console.log("Hello, Three.js with TypeScript!");

// Set up scene
const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 5;

scene.add(camera);

// Axes helper
const axesHelper = new THREE.AxesHelper(2);

scene.add(axesHelper);


// Create object
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: "pink" });

const mesh1 = new THREE.Mesh(geometry, material);
mesh1.position.x = 2;
mesh1.position.y = 1;

mesh1.scale.set(0.2, -0.5, 2)

mesh1.rotation.reorder("YXZ")
mesh1.rotation.y = Math.PI*0.25
mesh1.rotation.x = Math.PI*0.25

scene.add(mesh1);


const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 5),
    new THREE.MeshBasicMaterial({ color: "blue" })
)

const mesh3 = new THREE.Mesh(
    new THREE.CircleGeometry(0.5, 105),
    new THREE.MeshBasicMaterial({ color: "green" })
)

// Create group object
const group = new THREE.Group();

scene.add(group);

group.add(mesh1);
group.add(mesh2);
group.add(mesh3);

// Set up renderer
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);