import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const renderArea = document.getElementById('render');
renderArea.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

let camera;
const loader = new GLTFLoader();
loader.load('assets/scene.glb', (gltf) => {
  const model = gltf.scene;
  model.traverse((object) => {
    if (object.name === 'Key_Light') {
      object.castShadow = true;
    } else if (object.isMesh && object.name !== 'Background') {
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

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
  mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
  mouseLight.position.x = mouse.x * 4;
  mouseLight.position.y = mouse.y * -4;
  scene.traverse((object) => {
    if (object.isMesh && object.name !== 'Background') {
      object.rotation.z = mouse.x / 4;
      object.rotation.x = mouse.y / 4;
    }
  });
});

const mouseLight = new THREE.PointLight(0xf6c032, 10);
mouseLight.position.set(0, 0, 5);
scene.add(mouseLight);

// ここから新しいコード

const canvas = document.querySelector('#render canvas'); // three.jsの要素が描画されるcanvasの取得
window.addEventListener('scroll', () => {
  scene.traverse((object) => {
    // forEachっぽい関数
    if (object.isMesh) {
      object.rotation.y = (window.screenTop - window.pageYOffset) / -720; // スクロール位置にあわせてy軸回転
    }
  });
  if (window.pageYOffset <= window.innerHeight) {
    // 3DCGも何も関係ない、単なるスタイル変更
    const scrollRatio = window.pageYOffset / window.innerHeight;
    canvas.style.width = `${100 - scrollRatio * 10}%`;
    canvas.style.height = `${100 - scrollRatio * 10}%`;
    canvas.style.borderRadius = `${scrollRatio * 32}px`;
  }
});
