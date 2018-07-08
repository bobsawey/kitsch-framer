"use strict";

var camera;
var scene;
var renderer;
var group;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer({canvas: document.querySelector("canvas")});

  camera = new THREE.PerspectiveCamera(70, 1, 1, 1000);
  camera.position.z = 300;
  scene = new THREE.Scene();
  
  group = new THREE.Object3D();
  scene.add(group);

  var geometry = new THREE.BoxGeometry(50, 50, 50);

  var ctx = document.createElement("canvas").getContext("2d");
  ctx.canvas.width = 128;
  ctx.canvas.height = 128;

  for (var y = 0; y < 3; ++y) {
    for (var x = 0; x < 3; ++x) {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgb(" + (x * 127) + ",192," + (y * 127) + ")"  ;
      ctx.fillRect(0, 0, 128, 128);
      ctx.fillStyle = "white";
      ctx.font = "60px sans-serif";
      ctx.fillText(x + "x" + y, 64, 64);

      var texture = new THREE.Texture(ctx.canvas);
      texture.needsUpdate = true;
      texture.flipY = true;
      var material = new THREE.MeshBasicMaterial({
        map: texture,
      });
      var mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
      mesh.position.x = (x - 1) * 100;
      mesh.position.y = (y - 1) * 100;
      
      // render to force three to init the texture
      renderer.render(scene, camera);
    }
  }
}

function resize() {
  var width = renderer.domElement.clientWidth;
  var height = renderer.domElement.clientHeight;
  if (renderer.domElement.width !== width || renderer.domElement.height !== height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

function animate() {
  resize();
  group.rotation.x += 0.005;
  group.rotation.y += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}