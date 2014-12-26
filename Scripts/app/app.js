$(function () {
    //we need a sceen, camera, renderer and objects
    var sceen, camera, renderer, controls;
    // set the scene size
    var WIDTH = window.innerWidth / 2, HEIGHT = window.innerHeight / 2;
    // set some camera attributes
    var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;

    var init = function () {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        //renderer = new THREE.WebGLRenderer();
        //renderer.setSize(WIDTH, HEIGHT);

        //  renderer = new THREE.CanvasRenderer();
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xf0f0f0);
        renderer.setSize(WIDTH, HEIGHT);

        // add the camera to the scene
        scene.add(camera);

        // the camera starts at 0,0,0
        // so pull it back
        camera.position.z = 50;
        camera.position.y = 25;

        // Grid size=28, step=4
        createGrid(28, 4);

        //// each square
        //var planeW = 50; // pixels
        //var planeH = 50; // pixels 
        //var numW = 10; // how many wide (50*50 = 2500 pixels wide)
        //var numH = 10; // how many tall (50*50 = 2500 pixels tall)
        //var plane = new THREE.Mesh( new THREE.PlaneGeometry( planeW*numW, planeH*numH, planeW, planeH ), new   THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ) );
        //scene.add(plane);

        //light
        var light = new THREE.AmbientLight(0x404040); // soft white light 
        scene.add(light);

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.x = 100;
        directionalLight.position.y = 100;
        directionalLight.position.z = 10;
        directionalLight.position.normalize();
        scene.add(directionalLight);

        var container = $('#container');
        container.append(renderer.domElement);

        // controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
    };

    var createGrid = function (size, step) {
        // var size = 14, step = 1;

        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 });

        for (var i = -size; i <= size; i += step) {

            geometry.vertices.push(new THREE.Vector3(-size, 0, i));
            geometry.vertices.push(new THREE.Vector3(size, 0, i));

            geometry.vertices.push(new THREE.Vector3(i, 0, -size));
            geometry.vertices.push(new THREE.Vector3(i, 0, size));
        }

        var line = new THREE.Line(geometry, material, THREE.LinePieces);
        scene.add(line);
    };

    var addTriangle = function () {
        var triangle = new THREE.Geometry();

        triangle.vertices.push(new THREE.Vector3(1, 1, 0));
        triangle.vertices.push(new THREE.Vector3(30, 1, 0));
        triangle.vertices.push(new THREE.Vector3(30, 30, 0));

        triangle.faces.push(new THREE.Face3(0, 1, 2));

        var triangleMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
            wireframe: true
        });
        var triangleMesh = new THREE.Mesh(triangle, triangleMaterial);
        scene.add(triangleMesh);
    };

    var addCube = function () {
        var geometry = new THREE.BoxGeometry(5, 5, 5);
        var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, cubeMaterial);
        //    cube.rotation.x += 0.5; cube.rotation.y += 0.5;
        scene.add(cube);
    };

    init();
    //    addTriangle();
    addCube();

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        controls.update();
    }
    render();

});


