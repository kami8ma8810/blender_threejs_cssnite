import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const renderArea = document.getElementById("render");
renderArea.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0x3b3f40, 1);
const mouseLight = new THREE.PointLight(0xf6c032, 10);
mouseLight.position.set(0, 0, 5);
scene.add(ambientLight, mouseLight);

let camera;
const loader = new GLTFLoader();
loader.load("assets/scene.glb", (gltf) => {
  const model = gltf.scene;
  model.traverse((object) => {
    if (object.name === "Key_Light") {
      object.castShadow = true;
      object.shadow.mapSize.width = 1024;
      object.shadow.mapSize.height = 1024;
      object.shadow.bias = -0.001;
    } else if (object.isMesh && object.name !== "Background") {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
  scene.add(model);
  camera = gltf.cameras[0];
  render();
});

const mouse = new THREE.Vector2();
const windowHalf = new THREE.Vector2(
  window.innerWidth / 2,
  window.innerHeight / 2
);

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
  mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
  mouseLight.position.x = mouse.x * 4;
  mouseLight.position.y = mouse.y * -4;
  scene.traverse((object) => {
    if (object.isMesh && object.name !== "Background") {
      object.rotation.z = mouse.x / 4;
      object.rotation.x = mouse.y / 4;
    }
  });
});

const canvas = document.querySelector("#render canvas");
window.addEventListener("scroll", () => {
  scene.traverse((object) => {
    if (object.isMesh) {
      object.rotation.y = (window.screenTop - window.pageYOffset) / -720;
    }
  });
  if (window.pageYOffset <= window.innerHeight) {
    const scrollRatio = window.pageYOffset / window.innerHeight;
    canvas.style.width = `${100 - scrollRatio * 10}%`;
    canvas.style.height = `${100 - scrollRatio * 10}%`;
    canvas.style.borderRadius = `${scrollRatio * 32}px`;
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  windowHalf.x = window.innerWidth / 2;
  windowHalf.y = window.innerHeight / 2;
  render();
});

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
