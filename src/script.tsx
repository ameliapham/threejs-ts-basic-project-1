import * as THREE from "three";
import gsap from "gsap";


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
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "pink" });

const mesh1 = new THREE.Mesh(geometry, material);
mesh1.position.x = 2;
mesh1.position.y = 1;

mesh1.scale.set(0.2, -0.5, 2);

mesh1.rotation.reorder("YXZ");
mesh1.rotation.y = Math.PI * 0.25;
mesh1.rotation.x = Math.PI * 0.25;

const mesh2 = new THREE.Mesh(
  new THREE.ConeGeometry(0.5, 1, 5),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
// Create group object
const group = new THREE.Group();
group.add(mesh1);
group.add(mesh2);
//scene.add(group);

// Create a butterfly with buffer geometry
const geometryLeft = new THREE.BufferGeometry();
const geometryRight = new THREE.BufferGeometry();
const pointsLeft = [];
const pointsRight = [];

const steps = 500;
for (let i = 0; i < steps; i++) {
  const t = (i / steps) * 24 * Math.PI;
  const r = Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin((2 * t - Math.PI) / 24), 5);
  const x = r * Math.sin(t);
  const y = r * Math.cos(t);
  const z = Math.sin(2 * t) * 0.5;

  pointsLeft.push(x, y, z);
  pointsRight.push(-x, y, z);
}

const verticesLeft = new Float32Array(pointsLeft);
const verticesRight = new Float32Array(pointsRight);
geometryLeft.setAttribute( "position", new THREE.BufferAttribute(verticesLeft, 3));
geometryRight.setAttribute( "position", new THREE.BufferAttribute(verticesRight, 3));

const materialButterfly = new THREE.PointsMaterial({ color: 0xff66cc, size: 0.05,});

const wingLeft = new THREE.Points(geometryLeft, materialButterfly);
const wingRight = new THREE.Line(geometryRight, materialButterfly);

const butterfly = new THREE.Group();
butterfly.add(wingLeft);
butterfly.add(wingRight);
scene.add(butterfly);




// Set up renderer
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas : canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);
