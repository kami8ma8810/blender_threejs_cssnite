import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const renderArea = document.getElementById('render');
renderArea.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 3, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const render = () => {
  renderer.render(scene, camera);
};

// ここから新しいコード

const geometry = new THREE.BoxGeometry(1, 1, 1); // ジオメトリー = 形状
const material = new THREE.MeshPhysicalMaterial({
  color: 0x55c500,
  transmission: 1,
  reflectivity: 1,
}); // マテリアル = 素材
const cube = new THREE.Mesh(geometry, material); // メッシュ = いわゆる3Dのオブジェクト。
scene.add(cube); // シーンにキューブを追加

const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // 無限遠から照らすライト。他にも種類がある
directionalLight.position.set(-5, 5, 5); // ライトの位置指定
scene.add(directionalLight); // シーンにライトを追加

// ここまで新しいコード

render();
