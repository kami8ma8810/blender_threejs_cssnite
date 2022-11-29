import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const renderArea = document.getElementById("render");
renderArea.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const render = () => {
  requestAnimationFrame(render); // アニメーションする際に必要な設定
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

// ここから新しいコード

const mouse = new THREE.Vector2(); // マウスの座標を格納するための定義
const windowHalf = new THREE.Vector2(
  window.innerWidth / 2,
  window.innerHeight / 2
); // マウスの座標を-1から1の間にマッピングするための定数

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX - windowHalf.x) / windowHalf.x; // x座標が-1から1にマッピングされる
  mouse.y = (event.clientY - windowHalf.y) / windowHalf.y; // y座標が-1から1にマッピングされる
  scene.traverse((object) => { // forEachっぽい関数
    if (object.isMesh && object.name !== "Background") {
      object.rotation.z = mouse.x / 4; // マウスのx座標にあわせてz軸回転
      object.rotation.x = mouse.y / 4; // マウスのy座標にあわせてx軸回転
    }
  });
});
