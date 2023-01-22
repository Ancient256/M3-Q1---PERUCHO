const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0, 1000 );

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera( cameraWidth / -2, cameraWidth / 2, cameraHeight / 2, cameraHeight / -2, 0, 1000 );

camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 500, 300);
scene.add(directionalLight); 

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

//-Room-// 
function createWall(){

	const wall = new THREE.Mesh( 
		new THREE.BoxGeometry(100, 20, 4),  
		new THREE.MeshLambertMaterial({color: "#AA4A44"}) );
	return wall;

}

function createRoom(){

    const room = new THREE.Group();
    
    const rightWall = createWall();
	rightWall.position.set(0, 3.6, -50)
	room.add(rightWall);

    const leftWall = createWall();
	leftWall.rotation.y = 17.28;
	leftWall.position.set(-47.9, 3.6);
	room.add(leftWall);
    
    const floor = new THREE.Mesh( 
		new THREE.PlaneGeometry( 100, 100, 1, 1 ), 
		new THREE.MeshLambertMaterial( { color: "#757471" } ) 
	);
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = 11;
	floor.position.y= -6.5;
	room.add(floor);

	return room;

}
const room = createRoom();
scene.add(room); 






//Car//
function getCarFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 64, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);
  
    return new THREE.CanvasTexture(canvas);
  }

function getCarSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);
  
    return new THREE.CanvasTexture(canvas);
  }

function createWheels() {
    const geometry = new THREE.BoxBufferGeometry(5, 6, 20);
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
  }
  
  function createCar() {
    const car = new THREE.Group();
    
    const backWheel = createWheels();
    backWheel.position.y = 10;
    backWheel.position.x = -9;
    car.add(backWheel);

    const frontWheel = createWheels();
    frontWheel.position.y = 10;  
    frontWheel.position.x = 10;
    car.add(frontWheel);
  
    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry(30, 6, 17),
      new THREE.MeshLambertMaterial({ color: "#751005" })
    );
    main.position.y = 12;
    car.add(main);

    const carFrontTexture = getCarFrontTexture();

    const carBackTexture = getCarFrontTexture();

    const carRightSideTexture = getCarSideTexture();
  
    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
    carLeftSideTexture.rotation = Math.PI;
    carLeftSideTexture.flipY = false;

    const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(14, 5, 15), [
        new THREE.MeshLambertMaterial({ map: carFrontTexture }),
        new THREE.MeshLambertMaterial({ map: carBackTexture }),
        new THREE.MeshLambertMaterial({ color: 0xffffff }), 
        new THREE.MeshLambertMaterial({ color: 0xffffff }), 
        new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
    ]);
    cabin.position.x = 1;
    cabin.position.y = 17;
    car.add(cabin);
  
    return car;
  }
  
  const car = createCar();
  car.rotation.y = -17.29;
  car.position.set(-15, 0, -15);
  scene.add(car);
  
//Durabox//
function createDesk(){

	const desk = new THREE.Group();
	const frame = new THREE.Mesh(
		new THREE.BoxBufferGeometry(7, 8, 10),
		new THREE.MeshLambertMaterial({ color: "#1d5420" })
	);
	desk.add(frame);

	const knob = new THREE.Mesh(new THREE.BoxBufferGeometry(0.5, 0.5, 2),
	new THREE.MeshLambertMaterial({ color: 0xffffff })
	);
	desk.add(knob);
	knob.position.y = 1.6;
	knob.position.x = 4.6;
	
	return desk;
}
//Box Pos//
const desk = createDesk();
desk.position.set(-42, -4.5, 17);
scene.add(desk);




//T Box//
function createTool(){

	const tool = new THREE.Mesh(
		new THREE.BoxBufferGeometry(15, 12, 6),
		new THREE.MeshLambertMaterial({color: "#B80606" })
	);
	return tool;
}

function createToolPlace(){

	const toolPlace = new THREE.Mesh();

	const tool1 = createTool();
	tool1.position.set(-1, -1, 47);
	toolPlace.add(tool1);

	
	return toolPlace; 
}

const toolPlace = createToolPlace();
scene.add(toolPlace);
  
//Render Scene
renderer.render(scene, camera);