//script based on "webgl_objects_update" from official docs of THREE.js

window.onload = function() {

    var container;
    var camera, scene, renderer;

    var sideSize = 15;
    var sideLen = 30;

    function matrixArray(rows, colomns) {

      var arr = [];
      for(var i = 0; i < colomns; i++) {
          arr[i] = [];
          for(var j = 0; j < rows; j++) {
              arr[i][j] = 0;
          }
      }
      return arr;
      
    }

    var objectNewGeometry = matrixArray(sideLen, sideLen);
    var tempArr = matrixArray(sideLen, sideLen);

    init();
    createTestConfig();
    animate();

    function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        //camera = new THREE.OrthographicCamera((window.innerWidth/-2), (window.innerWidth/2), (window.innerHeight / -2), (window.innerHeight / 2), 1, 1000 );
        camera.position.z = 600;

        scene = new THREE.Scene();

        var N = sideSize * sideLen;

        for ( var i = 0; i < N; i = i + sideSize ) {
            for ( var j = 0; j < N; j = j + sideSize ) {

                var object = createObject(createMultiMaterial(0));
                object.position.set( i - N/2, j - N/2, 0 );
                scene.add( object );
                objectNewGeometry[i/sideSize][j/sideSize] = object;

            }
        }

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        window.addEventListener( 'resize', onWindowResize, true );
    }

    function createObject( material ) {

        var geometry = createGeometry();
        return new THREE.Mesh( geometry, material );

    }

    function createGeometry() {

        var geometry = new THREE.BoxGeometry( 10, 10, 10 );
        return geometry;

    }

    function createMultiMaterial(status) {

        var materials;
        if (status == 0) materials = new THREE.MeshBasicMaterial({color: 0xffffff});
        else materials = new THREE.MeshBasicMaterial({color: 0xff0000});

        return materials;

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

        setTimeout( animate, 1000 );

        render();

    }

    function checkStatus(i, j) {

        var alive = 0;

        // 3 == white == dead
        // если у мертвой клетки ровно 3 соседа — она становится живой
        // если у живой клетки 2 или 3 живые соседки, она остается живой
        // иначе она умирает от "одиночества" или "перенаселения"

        if(tempArr[i][j] == 3) {

            if(tempArr[i-1][j+1] !== 3) alive++;
            if(tempArr[i][j+1]   !== 3) alive++;
            if(tempArr[i+1][j+1] !== 3) alive++;
            if(tempArr[i-1][j]   !== 3) alive++;
            if(tempArr[i+1][j]   !== 3) alive++;
            if(tempArr[i-1][j-1] !== 3) alive++;
            if(tempArr[i][j-1]   !== 3) alive++;
            if(tempArr[i+1][j-1] !== 3) alive++;

            if(alive == 3) objectNewGeometry[i][j].material = createMultiMaterial(1);

        } else {

            if(tempArr[i-1][j+1] !== 3) alive++;
            if(tempArr[i][j+1]   !== 3) alive++;
            if(tempArr[i+1][j+1] !== 3) alive++;
            if(tempArr[i-1][j]   !== 3) alive++;
            if(tempArr[i+1][j]   !== 3) alive++;
            if(tempArr[i-1][j-1] !== 3) alive++;
            if(tempArr[i][j-1]   !== 3) alive++;
            if(tempArr[i+1][j-1] !== 3) alive++;

            if(alive < 2 || alive > 3) objectNewGeometry[i][j].material = createMultiMaterial(0);

        }

    }

    function createTestConfig() {

        // classic pattern "glider" (планер)
        objectNewGeometry[10][10].material = createMultiMaterial(1);
        objectNewGeometry[11][10].material = createMultiMaterial(1);
        objectNewGeometry[12][10].material = createMultiMaterial(1);
        objectNewGeometry[12][11].material = createMultiMaterial(1);
        objectNewGeometry[11][12].material = createMultiMaterial(1);

    }

    function render() {


        //create array of colors
        for ( var i = 0; i < sideLen; i++) {
            for ( var j = 0; j < sideLen; j++) {

                var outputR = objectNewGeometry[i][j].material.color['r'];
                var outputG = objectNewGeometry[i][j].material.color['g'];
                var outputB = objectNewGeometry[i][j].material.color['b'];

                var output = outputR + outputG + outputB;

                tempArr[i][j] = output;

            }
        }

        renderer.render( scene, camera );

        for ( var i = 1; i < sideLen - 1; i++) {
            for ( var j = 1; j < sideLen - 1; j++) {
                checkStatus(i, j);
            }
        }

    }
}
