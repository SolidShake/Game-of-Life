window.onload = function() {
  var scene, camera, render;

  container = document.createElement('div');
  document.body.appendChild(container);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,2000); //перспективная проекция
  camera.position.x = 100;
  camera.position.y = 100;
  camera.position.z = 600;

  function initSquare() {
    var material = new THREE.LineBasicMaterial({
  	color: 0x000000
    });

    for(var i = 0; i <= 200; i = i + 10) {
      var line_geometry = new THREE.Geometry();
      line_geometry.vertices.push(new THREE.Vector3(i,0,0));
      line_geometry.vertices.push(new THREE.Vector3(i,200,0));

      var line = new THREE.Line(line_geometry, material);

      scene.add(line);
    }

    for(var i = 0; i <= 200; i = i + 10) {
      var line_geometry = new THREE.Geometry();
      line_geometry.vertices.push(new THREE.Vector3(0,i,0));
      line_geometry.vertices.push(new THREE.Vector3(200,i,0));

      var line = new THREE.Line(line_geometry, material);

      scene.add(line);
    }
  }
  initSquare();

  function createCoub(x,y) {
    var cube_geometry = new THREE.BoxGeometry(10,10,0);
    var cube_texture = new THREE.MeshBasicMaterial({color: 0x0000ff});
    var cube = new THREE.Mesh(cube_geometry,cube_texture);
    cube.position.x = x + 5;
    cube.position.y = y + 5;
    cube.position.z = 0;

    scene.add(cube);
  }

  function removeCoubs() {
    scene.children.forEach(function(object){
      scene.remove(object);
    });
  }

  var sideSize = 10;

  function randomGen() {
    for(var i = 0; i < 20 * sideSize; i = i + sideSize) {
      for(var j = 0; j < 20 * sideSize; j = j + sideSize) {
        if(Math.random() >= 0.5) {
          createCoub(i, j);
        }
      }
    }
  }
  randomGen();

  render = new THREE.WebGLRenderer({ alpha: true }); // рендер белого фона
  render.setSize(window.innerWidth,window.innerHeight);
  container.appendChild(render.domElement);

  animation();

  function animation() {
    requestAnimationFrame(animation);
    //randomGen();
    //initSquare();
    //removeCoubs();
    render.render(scene,camera);
  }
}
