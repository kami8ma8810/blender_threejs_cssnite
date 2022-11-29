import * as THREE from "three"; // three.jsの読み込み

const renderer = new THREE.WebGLRenderer(); // レンダラー = 画面を描画するためのシステム
renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーが描画する大きさを指示している

const renderArea = document.getElementById("render"); // HTML内の、idがrenderの要素を取得
renderArea.appendChild(renderer.domElement); // 上で取得した要素に、three.jsの出力先であるcanvas要素を追加する

const scene = new THREE.Scene(); // シーン = 要素を配置するステージのようなイメージ
scene.background = new THREE.Color(0xeeeeee); // ステージの背景色

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); // パースのついたカメラ。他にも種類がある
camera.position.set(2, 3, 5); // カメラの位置。XYZで座標を指定する
camera.lookAt(new THREE.Vector3(0, 0, 0)); // カメラの向き。今回は原点に向けている

const render = () => {
  renderer.render(scene, camera); // レンダラーにシーンとカメラを渡し、描画している
};

render();
