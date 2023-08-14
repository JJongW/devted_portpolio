import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
camera.position.x = 300;
camera.position.y = 0;
camera.position.z = 500;
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const app = document.querySelector("#app");
app.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

// 빛
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const rectLight = new THREE.RectAreaLight(0xffffff, 1, 200, 200);
rectLight.position.set(10, 10, 1);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);

// const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.2);
// directionalLight1.position.set(1, 1, 1);
// scene.add(directionalLight1);

// const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
// directionalLight2.position.set(0.5, 2, 1);
// scene.add(directionalLight2);

const OBJloader = new OBJLoader();
const mtlLoader = new MTLLoader();
const ObjGroup = new THREE.Group();
mtlLoader.setPath('../static/iphoneEX/');
mtlLoader.load('iphone12.mtl', (mtl) => {
    mtl.preload();
    OBJloader.setMaterials(mtl);

    OBJloader.load('../static/iphoneEX/iphone12.obj', (object) => {
        ObjGroup.add(object);
        ObjGroup.position.y = -300;
        ObjGroup.scale.x = 0.1;
        ObjGroup.scale.y = 0.1;
        ObjGroup.scale.z = 0.1;
        scene.add(ObjGroup);
        },
        function (xhr) {
            const progress = (xhr.loaded / xhr.total) * 100 +'%'
            //console.log(progress);
        },
        function (error) {
            console.log('An error happened');
        }
    )
})

// let loader = new GLTFLoader(); //gltf 파일은 GLTFLoader 로 가져와야됨
// loader.load('../static/fox/scene.gltf', function(gltf){
//     scene.add(gltf.scene);
//     function animate(){
//         requestAnimationFrame(animate) //1초에 60번 실행됨.
//         //회전
//         //gltf.scene.rotation.y += 0.010;
//         renderer.render(scene, camera);  
//     }
//     animate();s
// });

const raycaster = new THREE.Raycaster();

renderer.domElement.addEventListener('mousemove', onMouseMove);

function onMouseMove(e){
    const mouse = {
        x: (e.clientX/ renderer.domElement.clientWidth) * 2 -1,
        y: -(e.clientY/ renderer.domElement.clientHeight) * 2 +1,
    }
    // console.log(mouse.x, mouse.y);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0){
        //console.log('마우스 인');
        TweenMax.to(ObjGroup.rotation, 1, {
            y: Math.PI * 2
        })
        TweenMax.to(ObjGroup.scale, 1, {
            x: 1,
            y: 1,
            z: 1,
        })
    } else {
        //console.log('마우스 아웃');
        TweenMax.to(ObjGroup.rotation, 1, {
            y: 0
        })
        TweenMax.to(ObjGroup.scale, 1, {
            x: 0.5,
            y: 0.5,
            z: 0.5,
        })
    }
}

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