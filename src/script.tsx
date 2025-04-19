import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

console.log("Hello, Three.js with TypeScript!");

// ----- Setup Scene -----
const scene = new THREE.Scene();

// ----- Setup Canvas -----
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// ----- Setup Axes Helper -----
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// ----- Create Object -----
function createButterflyGeometry(steps: number) {
    const pointsLeft: number[] = [];
    const pointsRight: number[] = [];
    const colors: number[] = [] 

    for (let i = 0; i < steps; i++) {
        const t = (i / steps) * 24 * Math.PI;
        const r = Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin((2 * t - Math.PI) / 24), 5);
        
        // Butterfly curve formula
        const x = r * Math.sin(t);
        const y = r * Math.cos(t);
        const z = Math.sin(2 * t) * 0.5;

        pointsLeft.push(x, y, z);
        pointsRight.push(-x, y, z);

        // Color gradient based on position
        const pct = i / steps;

        const color = new THREE.Color();
        color.setHSL(0.85 - 0.5 * pct, 1 - pct, pct);
        colors.push(color.r, color.g, color.b);
    }

    const verticesLeft = new Float32Array(pointsLeft);
    const verticesRight = new Float32Array(pointsRight);
    const colorAttr = new Float32Array(colors);

    const attributeLeft = new THREE.BufferAttribute(verticesLeft, 3);
    const attributeRight = new THREE.BufferAttribute(verticesRight, 3);
    const colorAttribute = new THREE.BufferAttribute(colorAttr, 3);

    const geometryLeft = new THREE.BufferGeometry();
    const geometryRight = new THREE.BufferGeometry();

    geometryLeft.setAttribute("position", attributeLeft);
    geometryRight.setAttribute("position", attributeRight);
    geometryLeft.setAttribute("color", colorAttribute);
    geometryRight.setAttribute("color", colorAttribute);
    
    return { geometryLeft, geometryRight };
}

const { geometryLeft, geometryRight } = createButterflyGeometry(2000);

const materialButterfly = new THREE.PointsMaterial({ vertexColors: true, size: 0.01 });

const wingLeft = new THREE.Points(geometryLeft, materialButterfly);
const wingRight = new THREE.Line(geometryRight, materialButterfly);

const butterfly = new THREE.Group();
butterfly.add(wingLeft, wingRight);
scene.add(butterfly);

// ----- Setup Camera -----
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(0, 0, 5);
scene.add(camera);

// ----- Controls -----
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;

// ----- Setup Renderer -----
const renderer = new THREE.WebGLRenderer({ canvas : canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// ----- Animation -----
gsap.to(butterfly.rotation, {
    y: "+=" + Math.PI * 2,
    duration: 10,
    ease: "none",
    repeat: -1,
})

/*
gsap.to(butterfly.position, {
    z: -10,
    duration: 5,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
})*/

// ----- Render Loop -----
function animation() {
    // Update controls
    controls.update();

    // Renderer
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}
animation();