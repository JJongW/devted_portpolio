import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

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
camera.position.y = 0;
camera.position.x = -1;
scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);

//const material = new THREE.MeshBasicMaterial({color: 'white'});
const material = new THREE.MeshStandardMaterial({color: 'red'});
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);

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

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;

// mesh가 놓여있을 평면 mesh를 생성하고 추가하였다.
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshStandardMaterial();
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// 평면이 바닥에 놓인 형태가 아닌 수직으로 서있는 형태이므로 -90도만큼 회전시켜준다.
plane.rotation.x = -Math.PI / 2;
plane.position.y -= 0.5;
plane.receiveShadow = true;
scene.add(plane);

const handleRender = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  renderer.setAnimationLoop(handleRender);

  //mesh.position.y += 0.001;
  //mesh.rotation.y += 0.01;
};

const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};

window.addEventListener("resize", handleResize);
handleRender();