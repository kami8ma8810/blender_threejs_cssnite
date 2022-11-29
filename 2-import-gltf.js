import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // gLTFファイルを使うために必要

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const renderArea = document.getElementById('render');
renderArea.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const render = () => {
  renderer.render(scene, camera);
};

// カメラとライトとキューブを削除

// ここから新しいコード

let camera; // 後から上書きする都合上、let
const loader = new GLTFLoader(); // gLTFファイルを使うために必要
loader.load(
  'assets/scene.glb', // gLTFファイルへのパス
  (gltf) => {
    const model = gltf.scene; // gltf.sceneにBlenderで作ったシーンがすべて入っている
    scene.add(model); // Threeのシーンにモデルを追加
    camera = gltf.cameras[0]; // gltf.camerasにBlenderで定義したカメラが配列で入っている
    render();
  }
);
