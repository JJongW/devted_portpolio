import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
});
renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const app = document.querySelector("#app");
app.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

// 이문장 추가하면 토스터기계 보임
let light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
//

//5 카메라 ------- 아래 문장 추가 후 render.render(scene, camera) 바꿔주자
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

let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.autoRotate = true;  //controls.autoRotate =true;  자동회전O
// -------------------------

let loader = new GLTFLoader();
loader.load('../static/scene.gltf', function(gltf){
    scene.add(gltf.scene);
    
    (function animate() {
        renderer.render(scene, camera);
        controls.update(); //animate() 함수안에 controls.update() 추가함으로써 매프레임마다 자동으로 돌아감)
        requestAnimationFrame(animate);  //그리고 프레임마다 조금씩 각도를 높여줌
    })(); //requestAnimationFrame 이거는 성능에 따라 프레임 수를 조절해서 몇 밀리초 뒤에 다음 프레임을 호출할지 결정
});

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