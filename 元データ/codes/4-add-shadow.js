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
  // ここから新しいコード
  model.traverse((object) => { // forEachっぽい関数
    if (object.name === "Key_Light") { // Blenderで指定した名前で条件を組める
      object.castShadow = true; // 影を落とすかどうか
    } else if (object.isMesh && object.name !== "Background") { // isMesh = メッシュ、つまりいわゆる普通のオブジェクトかどうかの判定
      object.castShadow = true;
      object.receiveShadow = true; // 影を受けるかどうか
    }
  });
  // ここまで新しいコード
  scene.add(model);
  camera = gltf.cameras[0];
  render();
});

renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const ambientLight = new THREE.AmbientLight(0x3b3f40, 1);
scene.add(ambientLight);

renderer.shadowMap.enabled = true; // レンダラー全体で影を有効にする
