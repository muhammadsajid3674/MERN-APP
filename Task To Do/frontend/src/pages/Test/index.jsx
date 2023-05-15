import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const infoStyle = {
  position: "absolute",
  top: "10px",
  width: "100 %",
  textAlign: "center",
  zIndex: "100",
  display: "block",
}

const ThreeJS = () => {
  // const renderer = new THREE.WebGL1Renderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement)

  // const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  // camera.position.set(0, 0, 100);
  // camera.lookAt(0, 0, 0)

  // const scene = new THREE.Scene();

  // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

  // const points = [];
  // points.push(new THREE.Vector3(-10, 0, 0));
  // points.push(new THREE.Vector3(0, 10, 0));
  // points.push(new THREE.Vector3(10, 0, 0));

  //cube
  // const geometry = new THREE.BoxGeometry(2, 2, 2);
  // const cube = new THREE.Mesh(geometry, material);

  // const geometry = new THREE.BufferGeometry().setFromPoints(points);
  // const line = new THREE.Line(geometry, material)

  // scene.add(line);
  // renderer.render(scene, camera);
  // camera.position.z = 5;

  // function animate() {
  //   requestAnimationFrame(animate);
  //   renderer.render(scene, camera);
  // }
  // if (WebGL.isWebGLAvailable()) {
  //   animate()
  // } else {
  //   const warning = WebGL.getWebGLErrorMessage();
  //   document.getElementById("root").appendChild(warning);
  // }
  return (
    <div id='info' style={infoStyle}>Description</div>
  )
}

export default ThreeJS