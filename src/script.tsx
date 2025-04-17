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
const colors = []

const steps = 2000;
for (let i = 0; i < steps; i++) {
  const t = (i / steps) * 24 * Math.PI;
  const r = Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin((2 * t - Math.PI) / 24), 5);
  const x = r * Math.sin(t);
  const y = r * Math.cos(t);
  const z = Math.sin(2 * t) * 0.5;

  pointsLeft.push(x, y, z);
  pointsRight.push(-x, y, z);
  const pct = i / steps;
  const rCol = 1 - pct;
  const gCol = 0.2;
  const bCol = pct;
  colors.push(rCol, gCol, bCol);

}

const verticesLeft = new Float32Array(pointsLeft);
const verticesRight = new Float32Array(pointsRight);
const colorAttr = new Float32Array(colors);

geometryLeft.setAttribute( "position", new THREE.BufferAttribute(verticesLeft, 3));
geometryRight.setAttribute( "position", new THREE.BufferAttribute(verticesRight, 3));
geometryLeft.setAttribute( "color", new THREE.BufferAttribute(colorAttr, 3));
geometryRight.setAttribute( "color", new THREE.BufferAttribute(colorAttr, 3));

const materialButterfly = new THREE.PointsMaterial({ vertexColors: true, size: 0.01,});

const wingLeft = new THREE.Points(geometryLeft, materialButterfly);
const wingRight = new THREE.Line(geometryRight, materialButterfly);

const butterfly = new THREE.Group();
butterfly.add(wingLeft);
butterfly.add(wingRight);
scene.add(butterfly);

// Camera with mouse control
const cursor = {
    x: 0,
    y: 0,
}

window.addEventListener("mousemove", (event) => {
    cursor.x = (event.clientX / window.innerWidth) * 2 - 1;
    cursor.y = -(event.clientY / window.innerHeight) * 2 + 1;
});


// Set up renderer
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas : canvas });

renderer.setSize(window.innerWidth, window.innerHeight);


// Animation
//let previousTime = performance.now(); 

function animation() {
    //Time 
    //const currentTime = performance.now()
    //const deltaTime = ( currentTime - previousTime ) / 1000; // Convert to seconds
    //previousTime = currentTime;

    gsap.to(butterfly.rotation, {
        y: "+=" + Math.PI * 2,
        duration: 5,
        ease: "none",
        repeat: -1,
    })

    // Update butterfly rotation
    //butterfly.rotation.y += 0.5 * deltaTime;

    // Render
    renderer.render(scene, camera);

    requestAnimationFrame(animation);
}
animation();