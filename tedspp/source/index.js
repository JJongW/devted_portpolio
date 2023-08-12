import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const app = document.querySelector("#app");
app.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
camera.position.z = 5;
camera.position.y = 2;
scene.add(camera);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;

// 매쉬 01
const geometry01 = new THREE.BoxGeometry(1, 1, 1);
const material01 = new THREE.MeshStandardMaterial({ color: "green" });
const mesh01 = new THREE.Mesh(geometry01, material01);
mesh01.position.x = -3;
mesh01.castShadow = true;
mesh01.receiveShadow = true;
scene.add(mesh01);

// 매쉬 02
const geometry02 = new THREE.ConeGeometry(1, 1, 6.6);
const material02 = new THREE.MeshStandardMaterial({ color: "red" });
const mesh02 = new THREE.Mesh(geometry02, material02);
mesh02.position.x = 0;
mesh02.castShadow = true;
mesh02.receiveShadow = true;
scene.add(mesh02);

// const ambientLight = new THREE.AmbientLight();
// ambientLight.intensity = 0.4;
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight();
// 약간 우측 앞쪽에서 조명이 발사되도록 위치를 조정해준다.
directionalLight.position.set(3, 3, 3);
directionalLight.lookAt(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 60;
scene.add(directionalLight);

// mesh가 놓여있을 평면 mesh를 생성하고 추가하였다.
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshStandardMaterial();
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// 평면이 바닥에 놓인 형태가 아닌 수직으로 서있는 형태이므로 -90도만큼 회전시켜준다.
plane.rotation.x = -Math.PI / 2;
plane.position.y -= 0.5;
plane.receiveShadow = true;
scene.add(plane);

const handleRender = (time) => {
    time *= 0.0005;
  orbitControls.update();
  renderer.render(scene, camera);
  renderer.setAnimationLoop(handleRender);
  mesh01.rotation.x = time;
  mesh01.rotation.y = time;
  mesh02.rotation.x = time;
  mesh02.rotation.y = time;
};

const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};

window.addEventListener("resize", handleResize);
handleRender();