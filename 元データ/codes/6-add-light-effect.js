import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const renderArea = document.getElementById("render");
renderArea.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

let camera;
const loader = new GLTFLoader();
loader.load("assets/scene.glb", (gltf) => {
  const model = gltf.scene;
  model.traverse((object) => {
    if (object.name === "Key_Light") {
      object.castShadow = true;
    } else if (object.isMesh && object.name !== "Background") {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
  scene.add(model);
  camera = gltf.cameras[0];
  render();
});

renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const ambientLight = new THREE.AmbientLight(0x3b3f40, 1);
scene.add(ambientLight);

renderer.shadowMap.enabled = true;

const mouse = new THREE.Vector2();
const windowHalf = new THREE.Vector2(
  window.innerWidth / 2,
  window.innerHeight / 2
);

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
  mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
  mouseLight.position.x = mouse.x * 4; // マウスの位置にあわせてmouseLightの位置を変更
  mouseLight.position.y = mouse.y * -4; // マウスの位置にあわせてmouseLightの位置を変更
  scene.traverse((object) => {
    if (object.isMesh && object.name !== "Background") {
      object.rotation.z = mouse.x / 4;
      object.rotation.x = mouse.y / 4;
    }
  });
});

// ここから新しいコード

const mouseLight = new THREE.PointLight(0xf6c032, 10); // マウス操作にあわせて動かすライトを定義
mouseLight.position.set(0, 0, 5); // 初期位置を定義
scene.add(mouseLight);
