import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
});
//renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const app = document.querySelector("#app");
app.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;
scene.add(camera);
 
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(-1.5, 2, 1);
const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2, 0x0000ff);
scene.add(dlHelper);
scene.add(directionalLight);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.radius = 8;

const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
// 매쉬 01
const material01 = new THREE.MeshPhysicalMaterial({ 
    color: 0xFF7F00,
    clearcoat: 1,
    clearcoatRoughness: 0.1
 });
const mesh01 = new THREE.Mesh(geometry, material01);
mesh01.position.x = -2;
scene.add(mesh01);

// 매쉬 02
const material02 = new THREE.MeshStandardMaterial({ 
    color: 0xFF7F00,
    metalness: 0.6,
    roughness: 0.4,
 });
const mesh02 = new THREE.Mesh(geometry, material02);
mesh02.position.x = -1;
scene.add(mesh02);
// 매쉬 03
const material03 = new THREE.MeshBasicMaterial({ color: 0xFF7F00 });
const mesh03 = new THREE.Mesh(geometry, material03);
mesh03.position.x = 0;
scene.add(mesh03);
// 매쉬 04
const material04 = new THREE.MeshPhongMaterial({ 
    color: 0xFF7F00,
    shininess: 60,
    specular: 0x004fff
});
const mesh04 = new THREE.Mesh(geometry, material04);
mesh04.position.x = 1;
scene.add(mesh04);
// 매쉬 05
const material05 = new THREE.MeshStandardMaterial({ color: 0xFF7F00 });
const mesh05 = new THREE.Mesh(geometry, material05);
mesh05.position.x = 2;
scene.add(mesh05);

const handleRender = (time) => {
    time *= 0.0005;
    orbitControls.update();
    renderer.render(scene, camera);
    renderer.setAnimationLoop(handleRender);

    mesh01.rotation.y += 0.01;
    mesh02.rotation.y += 0.01;
    mesh03.rotation.y += 0.01;
    mesh04.rotation.y += 0.01;
    mesh05.rotation.y += 0.01;
};

const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};

window.addEventListener("resize", handleResize);
handleRender();