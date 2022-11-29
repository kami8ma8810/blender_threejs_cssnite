import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const renderArea = document.getElementById("render");
renderArea.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const render = () => {
  renderer.render(scene, camera);
};

let camera;
const loader = new GLTFLoader();
loader.load("assets/scene.glb", (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  camera = gltf.cameras[0];
  render();
});

// ここから新しいコード

renderer.physicallyCorrectLights = true; // 物理ベースのライティング計算になる設定
renderer.outputEncoding = THREE.sRGBEncoding; // sRGBに適したエンコードになる設定
renderer.toneMapping = THREE.ACESFilmicToneMapping; // ダイナミックレンジの違いを上手く表現するための設定

const ambientLight = new THREE.AmbientLight(0x3b3f40, 1); // 環境光
scene.add(ambientLight);
