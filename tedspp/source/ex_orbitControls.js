import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
});
renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const app = document.querySelector("#app");
app.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(
  120,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 1.8;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.minDistance = 2;
orbitControls.maxDistance = 4;
orbitControls.maxPolarAngle = 2;
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;

const geometry1 = new THREE.IcosahedronGeometry(0.5, 0);
const material01 = new THREE.MeshStandardMaterial({ 
    color: 0x39d4df
 });
const mesh01 = new THREE.Mesh(geometry1, material01);
mesh01.position.y = 0.5;
mesh01.position.set(0.5, 0.5, 0);
scene.add(mesh01);
mesh01.castShadow = true;
mesh01.receiveShadow = true;

const geometry2 = new THREE.IcosahedronGeometry(0.5, 0);
const material02 = new THREE.MeshStandardMaterial({ 
    color: 0x004fff
 });
const mesh02 = new THREE.Mesh(geometry2, material02);
mesh02.position.set(-0.5, 1.2, 0.5);
scene.add(mesh02);
mesh02.castShadow = true;

let loader = new GLTFLoader();
loader.load("./static/scene.gltf", function(gltf){           // 안에 내부 설계를 했으니 이제 뚜껑으로 덮어줘야한다   그런 비슷한 존재 
    scene.add(gltf.scene);
      
    (function animate() {
        renderer.render(scene, camera);
        controls.update();                //animate() 함수안에 controls.update() 추가함으로써 매프레임마다 자동으로 돌아감)
        requestAnimationFrame(animate);             //그리고 프레임마다 조금씩 각도를 높여줌
    })(); //requestAnimationFrame              // 이거는 성능에 따라 프레임 수를 조절해서 몇 밀리초 뒤에 다음 프레임을 호출할지 결정
  });

const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.2;
scene.add(plane);
plane.receiveShadow = true;

// 빛
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

const handleRender = () => {
    orbitControls.update();
    renderer.render(scene, camera);
    renderer.setAnimationLoop(handleRender);
};

const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
};

window.addEventListener("resize", handleResize);
handleRender();